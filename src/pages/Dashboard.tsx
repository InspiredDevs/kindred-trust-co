import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrustBadge, TrustScore } from "@/components/TrustBadge";
import { StatsCard } from "@/components/StatsCard";
import { 
  Users, 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  Clock,
  Star,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Plus
} from "lucide-react";

interface DashboardProps {
  userType: "freelancer" | "client" | "admin";
}

export default function Dashboard({ userType }: DashboardProps) {
  if (userType === "freelancer") {
    return <FreelancerDashboard />;
  } else if (userType === "client") {
    return <ClientDashboard />;
  } else {
    return <AdminDashboard />;
  }
}

function FreelancerDashboard() {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Alex!</h1>
            <p className="text-muted-foreground">Ready to build something amazing today?</p>
          </div>
          <div className="flex items-center gap-4">
            <TrustScore score={87} />
            <TrustBadge level="gold" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Active Proposals"
            value={12}
            description="3 pending responses"
            icon={Briefcase}
            trend={{ value: 15, isPositive: true }}
          />
          <StatsCard
            title="Total Earnings"
            value="$4,250"
            description="This month"
            icon={DollarSign}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Success Rate"
            value="94%"
            description="Project completion"
            icon={TrendingUp}
            trend={{ value: 2, isPositive: true }}
          />
          <StatsCard
            title="Response Time"
            value="2.4h"
            description="Average response"
            icon={Clock}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Jobs */}
          <Card className="lg:col-span-2 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recommended Jobs</CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "Full-Stack React Developer",
                  client: "TechCorp Africa",
                  budget: "$2,500 - $4,000",
                  skills: ["React", "Node.js", "TypeScript"],
                  posted: "2 hours ago",
                  verified: true
                },
                {
                  title: "Mobile App UI/UX Design",
                  client: "StartupLagos",
                  budget: "$1,200 - $2,000",
                  skills: ["Figma", "Mobile Design", "Prototyping"],
                  posted: "5 hours ago",
                  verified: true
                },
                {
                  title: "E-commerce Backend API",
                  client: "ShopNaija",
                  budget: "$3,000 - $5,000",
                  skills: ["Python", "Django", "PostgreSQL"],
                  posted: "1 day ago",
                  verified: false
                }
              ].map((job, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{job.title}</h3>
                    {job.verified && <Shield className="w-4 h-4 text-accent" />}
                  </div>
                  <p className="text-muted-foreground mb-2">{job.client}</p>
                  <p className="font-medium text-primary mb-3">{job.budget}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{job.posted}</span>
                    <Button size="sm">Apply Now</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Verification Progress */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Verification Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span className="text-sm">Email & Phone Verified</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span className="text-sm">Government ID Verified</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span className="text-sm">Payment Method Verified</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-warning" />
                    <span className="text-sm">Peer Vouching Pending</span>
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  Upgrade to Platinum
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Update Portfolio
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Star className="w-4 h-4 mr-2" />
                  Request Testimonial
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Join Community
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClientDashboard() {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Client Dashboard</h1>
            <p className="text-muted-foreground">Manage your projects and find trusted talent</p>
          </div>
          <Button className="bg-gradient-hero text-white shadow-trust">
            <Plus className="w-4 h-4 mr-2" />
            Post New Job
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Active Projects"
            value={8}
            description="In progress"
            icon={Briefcase}
          />
          <StatsCard
            title="Budget Spent"
            value="$12,400"
            description="This quarter"
            icon={DollarSign}
          />
          <StatsCard
            title="Success Rate"
            value="96%"
            description="Project completion"
            icon={TrendingUp}
          />
          <StatsCard
            title="Saved Freelancers"
            value={24}
            description="In your network"
            icon={Users}
          />
        </div>

        {/* Active Projects */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "E-commerce Platform Development",
                  freelancer: "Sarah Johnson",
                  trustLevel: "platinum" as const,
                  progress: 75,
                  budget: "$4,500",
                  deadline: "Dec 15, 2024"
                },
                {
                  title: "Mobile App UI Redesign",
                  freelancer: "Mike Chen",
                  trustLevel: "gold" as const,
                  progress: 45,
                  budget: "$2,200",
                  deadline: "Dec 22, 2024"
                }
              ].map((project, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{project.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-muted-foreground">by {project.freelancer}</span>
                        <TrustBadge level={project.trustLevel} size="sm" showText={false} />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{project.budget}</p>
                      <p className="text-sm text-muted-foreground">{project.deadline}</p>
                    </div>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-gradient-trust h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-muted-foreground">{project.progress}% complete</span>
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform oversight and management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Users"
            value="12,450"
            description="All verified users"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Pending Verifications"
            value={34}
            description="Requires review"
            icon={Shield}
            className="border-warning"
          />
          <StatsCard
            title="Active Disputes"
            value={7}
            description="Open cases"
            icon={AlertTriangle}
            className="border-destructive"
          />
          <StatsCard
            title="Platform Revenue"
            value="$45,230"
            description="This month"
            icon={DollarSign}
            trend={{ value: 18, isPositive: true }}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Verification Queue</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "John Doe", type: "Gold Verification", time: "2 hours ago" },
                { name: "Jane Smith", type: "Platinum Review", time: "4 hours ago" },
                { name: "Mike Johnson", type: "Document Review", time: "6 hours ago" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{item.time}</p>
                    <Button size="sm">Review</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { message: "Fraud detection flagged 3 accounts", severity: "high", time: "1 hour ago" },
                { message: "Payment dispute escalated", severity: "medium", time: "3 hours ago" },
                { message: "System backup completed", severity: "low", time: "5 hours ago" }
              ].map((alert, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded">
                  <div className={`w-2 h-2 rounded-full ${
                    alert.severity === 'high' ? 'bg-destructive' :
                    alert.severity === 'medium' ? 'bg-warning' : 'bg-success'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}