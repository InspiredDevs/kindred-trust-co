import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useJobs } from "@/hooks/useJobs";
import { 
  Search, 
  MapPin, 
  Clock, 
  DollarSign,
  Filter,
  Briefcase,
  Star
} from "lucide-react";

const Jobs = () => {
  const { jobs, loading, error } = useJobs();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-48 bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-destructive">Error: {error}</div>
      </div>
    );
  }

  return (
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
                        ₦{job.budget.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(job.created_at).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className={`inline-block w-2 h-2 rounded-full ${
                          job.status === 'open' ? 'bg-success' : 'bg-muted'
                        }`} />
                        {job.status}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="ml-4">
                    {job.status}
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
                    <Badge variant="outline" className="text-xs">
                      Verified
                    </Badge>
                  </div>
                  <Button disabled={job.status !== 'open'} className="bg-gradient-hero text-white">
                    {job.status === 'open' ? 'Submit Proposal' : 'Not Available'}
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
  );
};

export default Jobs;