import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { 
  Shield, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Ban,
  Flag
} from 'lucide-react';

interface User {
  id: string;
  email: string;
  full_name: string;
  trust_level: string;
  trust_score: number;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
}

interface FraudSignal {
  id: string;
  user_id: string;
  signal_type: string;
  risk_score: number;
  details: any;
  is_resolved: boolean;
  created_at: string;
  user?: User;
}

export function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [fraudSignals, setFraudSignals] = useState<FraudSignal[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUsers();
    loadFraudSignals();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (data) setUsers(data);
    setLoading(false);
  };

  const loadFraudSignals = async () => {
    const { data, error } = await supabase
      .from('fraud_signals')
      .select(`
        *,
        profiles:user_id (
          email,
          full_name,
          trust_level
        )
      `)
      .eq('is_resolved', false)
      .order('created_at', { ascending: false });

    if (data) setFraudSignals(data);
  };

  const handleUserAction = async (userId: string, action: 'ban' | 'flag' | 'verify') => {
    const { error } = await supabase
      .from('admin_actions')
      .insert({
        admin_id: (await supabase.auth.getUser()).data.user?.id,
        target_user_id: userId,
        action_type: action,
        reason: `Admin ${action} action`,
        details: { timestamp: new Date().toISOString() }
      });

    if (!error) {
      // Update user status based on action
      if (action === 'ban') {
        await supabase
          .from('profiles')
          .update({ is_active: false })
          .eq('user_id', userId);
      }
      loadUsers();
    }
  };

  const resolveFraudSignal = async (signalId: string) => {
    const { error } = await supabase
      .from('fraud_signals')
      .update({ is_resolved: true })
      .eq('id', signalId);

    if (!error) {
      loadFraudSignals();
    }
  };

  const filteredUsers = users.filter(user =>
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-muted-foreground">Monitor users, verify accounts, and manage platform security</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Users</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u.is_verified).length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fraud Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fraudSignals.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Banned Users</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => !u.is_active).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="fraud">Fraud Detection</TabsTrigger>
          <TabsTrigger value="verification">Verification Queue</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Monitor and manage user accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-trust rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{user.full_name || user.email}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={user.trust_level === 'platinum' ? 'default' : 'secondary'}>
                            {user.trust_level}
                          </Badge>
                          {user.is_verified && (
                            <Badge variant="outline" className="text-success">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                          {!user.is_active && (
                            <Badge variant="destructive">
                              <XCircle className="w-3 h-3 mr-1" />
                              Banned
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUserAction(user.id, 'flag')}
                      >
                        <Flag className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUserAction(user.id, 'ban')}
                        className="text-destructive"
                      >
                        <Ban className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fraud" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fraud Detection Alerts</CardTitle>
              <CardDescription>Review and resolve fraud signals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fraudSignals.map((signal) => (
                  <Alert key={signal.id} className="border-warning">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">
                            {signal.signal_type} - Risk Score: {signal.risk_score}
                          </div>
                          <div className="text-sm">
                            User: {signal.user?.email} ({signal.user?.full_name})
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => resolveFraudSignal(signal.id)}
                        >
                          Resolve
                        </Button>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
                {fraudSignals.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No active fraud signals
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Verification Queue</CardTitle>
              <CardDescription>Review pending verification requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                No pending verifications
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}