import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProfile } from "@/hooks/useProfile";
import { 
  Clock, 
  DollarSign,
  FileText,
  MessageSquare,
  CheckCircle,
  XCircle
} from "lucide-react";

interface Proposal {
  id: string;
  job_title: string;
  client_name: string;
  budget: string;
  submitted_at: string;
  status: "pending" | "accepted" | "rejected" | "withdrawn";
  cover_letter: string;
  proposed_rate: string;
}

const Proposals = () => {
  const { profile } = useProfile();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock proposals data - replace with actual API call
    const mockProposals: Proposal[] = [
      {
        id: "1",
        job_title: "Full-Stack Developer for E-commerce Platform",
        client_name: "TechCorp Africa",
        budget: "$2,000 - $5,000",
        submitted_at: "2 days ago",
        status: "pending",
        cover_letter: "I have extensive experience in building e-commerce platforms...",
        proposed_rate: "$45/hour"
      },
      {
        id: "2",
        job_title: "React Frontend Developer",
        client_name: "StartupXYZ",
        budget: "$1,200 - $2,500",
        submitted_at: "1 week ago",
        status: "accepted",
        cover_letter: "I specialize in React development and have built similar applications...",
        proposed_rate: "$40/hour"
      },
      {
        id: "3",
        job_title: "Mobile App Development",
        client_name: "FinStart Solutions",
        budget: "$3,000 - $6,000",
        submitted_at: "2 weeks ago",
        status: "rejected",
        cover_letter: "I have 5+ years of experience in mobile app development...",
        proposed_rate: "$50/hour"
      }
    ];

    setTimeout(() => {
      setProposals(mockProposals);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status: Proposal["status"]) => {
    const variants = {
      pending: { variant: "secondary" as const, icon: Clock, text: "Pending" },
      accepted: { variant: "default" as const, icon: CheckCircle, text: "Accepted" },
      rejected: { variant: "destructive" as const, icon: XCircle, text: "Rejected" },
      withdrawn: { variant: "outline" as const, icon: XCircle, text: "Withdrawn" }
    };
    
    const config = variants[status];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {config.text}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation userType={profile?.user_type as any} trustLevel={profile?.trust_level as any} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-48 bg-muted" />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation userType={profile?.user_type as any} trustLevel={profile?.trust_level as any} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">My Proposals</h1>
          <p className="text-muted-foreground">
            Track your job applications and their status
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{proposals.length}</div>
              <div className="text-sm text-muted-foreground">Total Proposals</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">
                {proposals.filter(p => p.status === "pending").length}
              </div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">
                {proposals.filter(p => p.status === "accepted").length}
              </div>
              <div className="text-sm text-muted-foreground">Accepted</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-destructive">
                {proposals.filter(p => p.status === "rejected").length}
              </div>
              <div className="text-sm text-muted-foreground">Rejected</div>
            </CardContent>
          </Card>
        </div>

        {/* Proposals List */}
        <div className="space-y-6">
          {proposals.map((proposal) => (
            <Card key={proposal.id} className="shadow-card hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{proposal.job_title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="font-medium">{proposal.client_name}</span>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {proposal.budget}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {proposal.submitted_at}
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(proposal.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4" />
                      <span className="font-medium">Cover Letter</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {proposal.cover_letter.substring(0, 150)}...
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Proposed Rate: </span>
                      <span className="font-medium">{proposal.proposed_rate}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message Client
                      </Button>
                      {proposal.status === "pending" && (
                        <Button variant="destructive" size="sm">
                          Withdraw
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {proposals.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No proposals yet</h3>
              <p className="text-muted-foreground mb-4">
                Start applying to jobs to see your proposals here
              </p>
              <Button className="bg-gradient-hero text-white">
                Browse Jobs
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Proposals;