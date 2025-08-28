import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';
import { Shield, AlertCircle, Loader2, Key } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AdminAccess = () => {
  const [adminCode, setAdminCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAdminAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Secret admin access code
    const ADMIN_ACCESS_CODE = 'INSPIREDDEVS2024ADMIN';
    
    if (adminCode !== ADMIN_ACCESS_CODE) {
      setError('Invalid admin access code');
      return;
    }
    
    if (!user) {
      setError('You must be logged in to access admin panel');
      return;
    }
    
    setLoading(true);
    setError('');
    
    // Add a small delay for security theater
    setTimeout(() => {
      navigate('/admin');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-trust rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-trust bg-clip-text text-transparent">
              Inspired Devs
            </span>
          </Link>
        </div>

        <Card className="shadow-glow border-warning">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-warning to-destructive rounded-full flex items-center justify-center mx-auto mb-4">
              <Key className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-warning">Admin Access Portal</CardTitle>
            <CardDescription>
              Restricted area - authorized personnel only
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdminAccess} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-code">Admin Access Code</Label>
                <Input
                  id="admin-code"
                  type="password"
                  placeholder="Enter admin access code"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  required
                  className="border-warning focus:ring-warning"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-warning to-destructive hover:from-warning/90 hover:to-destructive/90" 
                disabled={loading}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Shield className="w-4 h-4 mr-2" />}
                {loading ? 'Verifying Access...' : 'Access Admin Panel'}
              </Button>
            </form>

            {error && (
              <Alert className="mt-4" variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="font-medium text-sm mb-2">Security Notice:</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• All admin actions are logged and monitored</li>
                <li>• IP address and device fingerprinting active</li>
                <li>• Unauthorized access attempts will be reported</li>
                <li>• Session expires after 2 hours of inactivity</li>
              </ul>
            </div>

            <div className="mt-4 text-center">
              <Link 
                to="/" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to main site
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>Admin Code Hint: Platform name + year + role (all caps)</p>
        </div>
      </div>
    </div>
  );
};

export default AdminAccess;