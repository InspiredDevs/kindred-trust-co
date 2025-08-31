import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProfile } from "@/hooks/useProfile";
import { 
  Search, 
  MapPin, 
  Star, 
  DollarSign,
  Filter,
  Users,
  Briefcase,
  MessageSquare
} from "lucide-react";

interface Freelancer {
  id: string;
  name: string;
  title: string;
  bio: string;
  hourly_rate: string;
  location: string;
  rating: number;
  reviews_count: number;
  skills: string[];
  avatar_url?: string;
  trust_level: "bronze" | "silver" | "gold" | "platinum";
  jobs_completed: number;
  response_time: string;
}

const Talent = () => {
  const { profile } = useProfile();
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Mock freelancers data - replace with actual API call
    const mockFreelancers: Freelancer[] = [
      {
        id: "1",
        name: "Amara Okafor",
        title: "Full-Stack Developer",
        bio: "Experienced developer specializing in React, Node.js, and cloud solutions. Built 50+ web applications.",
        hourly_rate: "$45/hour",
        location: "Lagos, Nigeria",
        rating: 4.9,
        reviews_count: 127,
        skills: ["React", "Node.js", "TypeScript", "AWS", "MongoDB"],
        trust_level: "gold",
        jobs_completed: 89,
        response_time: "2 hours"
      },
      {
        id: "2",
        name: "Kwame Asante",
        title: "Mobile App Developer",
        bio: "Native iOS and Android developer with expertise in Flutter and React Native. 5+ years experience.",
        hourly_rate: "$55/hour",
        location: "Accra, Ghana",
        rating: 4.8,
        reviews_count: 94,
        skills: ["Flutter", "React Native", "iOS", "Android", "Firebase"],
        trust_level: "platinum",
        jobs_completed: 156,
        response_time: "1 hour"
      },
      {
        id: "3",
        name: "Zara Kone",
        title: "UI/UX Designer",
        bio: "Creative designer focused on user-centered design for fintech and e-commerce platforms.",
        hourly_rate: "$40/hour",
        location: "Dakar, Senegal",
        rating: 4.7,
        reviews_count: 68,
        skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Design Systems"],
        trust_level: "silver",
        jobs_completed: 42,
        response_time: "4 hours"
      }
    ];

    setTimeout(() => {
      setFreelancers(mockFreelancers);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredFreelancers = freelancers.filter(freelancer =>
    freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    freelancer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    freelancer.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getTrustBadgeColor = (level: string) => {
    const colors = {
      bronze: "bg-gradient-to-r from-amber-600 to-amber-800",
      silver: "bg-gradient-to-r from-slate-400 to-slate-600",
      gold: "bg-gradient-to-r from-yellow-400 to-yellow-600",
      platinum: "bg-gradient-to-r from-purple-400 to-purple-600"
    };
    return colors[level as keyof typeof colors] || colors.bronze;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation userType={profile?.user_type as any} trustLevel={profile?.trust_level as any} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-64 bg-muted" />
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
          <h1 className="text-3xl font-bold mb-4">Find Talent</h1>
          <p className="text-muted-foreground">
            Discover verified freelancers across Africa
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, skills, or specialty..."
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

        {/* Freelancers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredFreelancers.map((freelancer) => (
            <Card key={freelancer.id} className="shadow-card hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={freelancer.avatar_url} alt={freelancer.name} />
                    <AvatarFallback className="bg-gradient-trust text-white text-lg">
                      {freelancer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-xl">{freelancer.name}</CardTitle>
                      <Badge className={`${getTrustBadgeColor(freelancer.trust_level)} text-white text-xs`}>
                        {freelancer.trust_level.charAt(0).toUpperCase() + freelancer.trust_level.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-primary font-medium mb-2">{freelancer.title}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{freelancer.rating}</span>
                        <span>({freelancer.reviews_count} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {freelancer.location}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
                  {freelancer.bio}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {freelancer.skills.slice(0, 4).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {freelancer.skills.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{freelancer.skills.length - 4} more
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground">
                      <DollarSign className="w-3 h-3" />
                      <span className="font-medium">{freelancer.hourly_rate}</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground">
                      <Briefcase className="w-3 h-3" />
                      <span className="font-medium">{freelancer.jobs_completed} jobs</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-muted-foreground">
                      <span className="font-medium">{freelancer.response_time}</span>
                      <div className="text-xs">response</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-gradient-hero text-white">
                    Hire Now
                  </Button>
                  <Button variant="outline" size="icon">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFreelancers.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No freelancers found</h3>
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

export default Talent;