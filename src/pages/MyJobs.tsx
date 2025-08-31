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
  Users,
  MessageSquare,
  Settings,
  Eye,
  Plus
} from "lucide-react";
import { Link } from "react-router-dom";

interface Job {
  id: string;
  title: string;
  description: string;
  budget: string;
  posted_at: string;
  status: "active" | "paused" | "completed" | "cancelled";
  proposals_count: number;
  hired_count: number;
  skills: string[];
}

const MyJobs = () => {
  const { profile } = useProfile();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock jobs data - replace with actual API call
    const mockJobs: Job[] = [
      {
        id: "1",
        title: "Full-Stack Developer for E-commerce Platform",
        description: "Looking for an experienced developer to build a modern e-commerce platform with React and Node.js...",
        budget: "$2,000 - $5,000",
        posted_at: "3 days ago",
        status: "active",
        proposals_count: 15,
        hired_count: 0,
        skills: ["React", "Node.js", "MongoDB", "Payment Integration"]
      },
      {
        id: "2",
        title: "Mobile App UI/UX Design",
        description: "Need a talented designer to create mobile app mockups for a fintech startup...",
        budget: "$800 - $1,500",
        posted_at: "1 week ago",
        status: "active",
        proposals_count: 8,
        hired_count: 1,
        skills: ["Figma", "Mobile Design", "Fintech", "User Research"]
      },
      {
        id: "3",
        title: "WordPress Website Development",
        description: "Create a professional WordPress website for our consulting business...",
        budget: "$500 - $1,200",
        posted_at: "2 weeks ago",
        status: "completed",
        proposals_count: 23,
        hired_count: 1,
        skills: ["WordPress", "PHP", "SEO", "Responsive Design"]
      }
    ];

    setTimeout(() => {
      setJobs(mockJobs);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status: Job["status"]) => {
    const variants = {
      active: { variant: "default" as const, text: "Active" },
      paused: { variant: "secondary" as const, text: "Paused" },
      completed: { variant: "outline" as const, text: "Completed" },
      cancelled: { variant: "destructive" as const, text: "Cancelled" }
    };
    
    const config = variants[status];
    return (
      <Badge variant={config.variant}>
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
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-4">My Jobs</h1>
            <p className="text-muted-foreground">
              Manage your posted jobs and track applications
            </p>
          </div>
          <Link to="/post-job">
            <Button className="bg-gradient-hero text-white">
              <Plus className="w-4 h-4 mr-2" />
              Post New Job
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{jobs.length}</div>
              <div className="text-sm text-muted-foreground">Total Jobs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">
                {jobs.filter(j => j.status === "active").length}
              </div>
              <div className="text-sm text-muted-foreground">Active</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">
                {jobs.reduce((sum, job) => sum + job.proposals_count, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Proposals</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">
                {jobs.reduce((sum, job) => sum + job.hired_count, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Hired</div>
            </CardContent>
          </Card>
        </div>

        {/* Jobs List */}
        <div className="space-y-6">
          {jobs.map((job) => (
            <Card key={job.id} className="shadow-card hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      {getStatusBadge(job.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {job.budget}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Posted {job.posted_at}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {job.proposals_count} proposals
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {job.description.substring(0, 150)}...
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4 text-sm">
                    {job.hired_count > 0 && (
                      <span className="text-success font-medium">
                        {job.hired_count} freelancer{job.hired_count > 1 ? 's' : ''} hired
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Messages ({job.proposals_count})
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {jobs.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No jobs posted yet</h3>
              <p className="text-muted-foreground mb-4">
                Start by posting your first job to find talented freelancers
              </p>
              <Link to="/post-job">
                <Button className="bg-gradient-hero text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Post Your First Job
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default MyJobs;