import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useProfile } from "@/hooks/useProfile";
import { 
  Search, 
  MapPin, 
  Clock, 
  DollarSign,
  Filter,
  Briefcase,
  Star
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  description: string;
  budget: string;
  location: string;
  posted_at: string;
  skills: string[];
  client_name: string;
  client_rating: number;
  proposals_count: number;
}

const Jobs = () => {
  const { profile } = useProfile();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock job data - replace with actual API call
  useEffect(() => {
    const mockJobs: Job[] = [
      {
        id: "1",
        title: "Full-Stack Developer for E-commerce Platform",
        description: "Looking for an experienced developer to build a modern e-commerce platform with React and Node.js. Must have experience with payment integration and responsive design.",
        budget: "$2,000 - $5,000",
        location: "Nigeria",
        posted_at: "2 hours ago",
        skills: ["React", "Node.js", "MongoDB", "Payment Integration"],
        client_name: "TechCorp Africa",
        client_rating: 4.8,
        proposals_count: 12
      },
      {
        id: "2",
        title: "Mobile App UI/UX Designer",
        description: "Need a talented designer to create mobile app mockups for a fintech startup. Experience with African market preferences preferred.",
        budget: "$800 - $1,500",
        location: "Kenya",
        posted_at: "5 hours ago",
        skills: ["Figma", "Mobile Design", "Fintech", "User Research"],
        client_name: "FinStart Solutions",
        client_rating: 4.5,
        proposals_count: 8
      },
      {
        id: "3",
        title: "Digital Marketing Specialist",
        description: "Looking for a marketing expert to handle social media campaigns and content creation for our African expansion.",
        budget: "$500 - $1,000",
        location: "South Africa",
        posted_at: "1 day ago",
        skills: ["Social Media", "Content Creation", "SEO", "Analytics"],
        client_name: "Growth Marketing Ltd",
        client_rating: 4.9,
        proposals_count: 15
      }
    ];

    setTimeout(() => {
      setJobs(mockJobs);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
          <h1 className="text-3xl font-bold mb-4">Find Work</h1>
          <p className="text-muted-foreground">
            Discover opportunities from verified clients across Africa
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs by title or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="shadow-card hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {job.budget}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.posted_at}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="ml-4">
                    {job.proposals_count} proposals
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{job.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{job.client_name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm">{job.client_rating}</span>
                    </div>
                  </div>
                  <Button className="bg-gradient-hero text-white">
                    Submit Proposal
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters
              </p>
            </CardContent>
          </Card>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Jobs;