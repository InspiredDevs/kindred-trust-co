import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProfile } from "@/hooks/useProfile";
import { 
  Users, 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  TrendingUp,
  Eye,
  UserCheck
} from "lucide-react";

interface AdminStats {
  total_users: number;
  verified_users: number;
  pending_verifications: number;
  fraud_alerts: number;
  active_jobs: number;
  platform_revenue: number;
}

interface PendingVerification {
  id: string;
  user_name: string;
  user_email: string;
  verification_type: string;
  submitted_at: string;
  risk_score: number;
}

const AdminDashboard = () => {
  const { profile } = useProfile();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [pendingVerifications, setPendingVerifications] = useState<PendingVerification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock admin data - replace with actual API calls
    const mockStats: AdminStats = {
      total_users: 2847,
      verified_users: 1653,
      pending_verifications: 23,
      fraud_alerts: 7,
      active_jobs: 156,
      platform_revenue: 84650
    };

    const mockPendingVerifications: PendingVerification[] = [
      {
        id: "1",
        user_name: "John Doe",
        user_email: "john@example.com",
        verification_type: "identity",
        submitted_at: "2 hours ago",
        risk_score: 15
      },
      {
        id: "2",
        user_name: "Jane Smith",
        user_email: "jane@example.com",
        verification_type: "business",
        submitted_at: "4 hours ago",
        risk_score: 85
      },
      {
        id: "3",
        user_name: "Mike Johnson",
        user_email: "mike@example.com",
        verification_type: "identity",
        submitted_at: "1 day ago",
        risk_score: 35
      }
    ];

    setTimeout(() => {
      setStats(mockStats);
      setPendingVerifications(mockPendingVerifications);
      setLoading(false);
    }, 1000);
  }, []);

  const getRiskBadge = (score: number) => {
    if (score < 30) return <Badge className="bg-success text-white">Low Risk</Badge>;
    if (score < 70) return <Badge variant="secondary">Medium Risk</Badge>;
    return <Badge variant="destructive">High Risk</Badge>;
  };

  if (loading || !stats) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation userType="admin" trustLevel={profile?.trust_level as any} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="h-32 bg-muted" />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation userType="admin" trustLevel={profile?.trust_level as any} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor platform activity and manage users
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Users"
            value={stats.total_users.toLocaleString()}
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Verified Users"
            value={stats.verified_users.toLocaleString()}
            icon={CheckCircle}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Pending Verifications"
            value={stats.pending_verifications.toString()}
            icon={Shield}
            trend={{ value: 2, isPositive: false }}
          />
          <StatsCard
            title="Fraud Alerts"
            value={stats.fraud_alerts.toString()}
            icon={AlertTriangle}
            trend={{ value: 1, isPositive: true }}
          />
          <StatsCard
            title="Active Jobs"
            value={stats.active_jobs.toString()}
            icon={TrendingUp}
            trend={{ value: 15, isPositive: true }}
          />
          <StatsCard
            title="Platform Revenue"
            value={`$${stats.platform_revenue.toLocaleString()}`}
            icon={TrendingUp}
            trend={{ value: 23, isPositive: true }}
          />
        </div>

        {/* Pending Verifications */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Pending Verifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingVerifications.map((verification) => (
                <div
                  key={verification.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium">{verification.user_name}</h4>
                      <Badge variant="outline">
                        {verification.verification_type}
                      </Badge>
                      {getRiskBadge(verification.risk_score)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {verification.user_email} • Submitted {verification.submitted_at}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Review
                    </Button>
                    <Button size="sm" className="bg-gradient-hero text-white">
                      <UserCheck className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="cursor-pointer hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">User Management</h3>
              <p className="text-sm text-muted-foreground">
                Manage user accounts and permissions
              </p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Shield className="w-8 h-8 text-accent mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Verifications</h3>
              <p className="text-sm text-muted-foreground">
                Review pending verifications
              </p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="w-8 h-8 text-warning mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Fraud Detection</h3>
              <p className="text-sm text-muted-foreground">
                Monitor suspicious activities
              </p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-success mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Platform performance metrics
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;