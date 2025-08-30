import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { TrustBadge } from "@/components/TrustBadge";
import { StatsCard } from "@/components/StatsCard";
import { 
  Shield, 
  Users, 
  Globe, 
  CheckCircle, 
  Star, 
  ArrowRight,
  Briefcase,
  DollarSign,
  TrendingUp,
  Award,
  Heart,
  Zap
} from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { user } = useAuth();
  const { profile, loading } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      if (!profile?.user_type) {
        // New user needs to select user type
        navigate('/onboarding');
      } else {
        // Existing user goes to dashboard
        navigate('/dashboard');
      }
    }
  }, [user, profile, loading, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              🚀 Launching in Nigeria - Join the Beta
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Building Unbreakable 
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent block">
                Trust
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Connect with verified freelancers and clients across Africa. 
              Where trust meets talent, and every collaboration is secured.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-trust text-lg px-8 py-6"
                onClick={() => navigate('/auth')}
              >
                I'm a Freelancer
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 text-lg px-8 py-6"
                onClick={() => navigate('/auth')}
              >
                I'm a Client
                <Briefcase className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>Verified Profiles</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                <span>Escrow Protection</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <span>AI-Powered Matching</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Verification Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trust Verification Tiers
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our multi-layered verification system ensures every interaction is secure, 
              from basic checks to deep background verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                level: "bronze" as const,
                title: "Bronze Verified",
                features: ["Email & Phone", "Basic OAuth", "Device Check"],
                price: "Free"
              },
              {
                level: "silver" as const,
                title: "Silver Verified", 
                features: ["Government ID", "Live Selfie", "IP Verification"],
                price: "$10"
              },
              {
                level: "gold" as const,
                title: "Gold Verified",
                features: ["Payment Method", "Background Check", "Biometrics"],
                price: "$25"
              },
              {
                level: "platinum" as const,
                title: "Platinum Verified",
                features: ["Deep Background", "Peer Vouching", "Video Interview"],
                price: "$50"
              }
            ].map((tier) => (
              <Card key={tier.level} className="shadow-card hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <TrustBadge level={tier.level} size="lg" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{tier.title}</h3>
                  <div className="text-2xl font-bold mb-4 text-primary">{tier.price}</div>
                  <ul className="space-y-2 mb-6">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-success" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant="outline">
                    Get Verified
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Stats */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Thousands Across Africa
            </h2>
            <p className="text-xl text-muted-foreground">
              Join a growing community of verified professionals and successful businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Verified Freelancers"
              value="12,450+"
              description="Across 15 countries"
              icon={Users}
            />
            <StatsCard
              title="Successful Projects"
              value="8,900+"
              description="Completed with 96% success rate"
              icon={Briefcase}
            />
            <StatsCard
              title="Total Earnings"
              value="$2.4M+"
              description="Paid out to freelancers"
              icon={DollarSign}
            />
            <StatsCard
              title="Trust Score Average"
              value="94/100"
              description="Platform-wide rating"
              icon={Award}
            />
          </div>
        </div>
      </section>

      {/* Demo Dashboards */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Experience the Platform
            </h2>
            <p className="text-xl text-muted-foreground">
              Explore our intuitive dashboards designed for each user type.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-card hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-trust rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Freelancer Dashboard</h3>
                <p className="text-muted-foreground mb-4">
                  Manage projects, track earnings, and build your reputation.
                </p>
                <Button className="w-full" onClick={() => navigate('/auth')}>
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-trust rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Client Dashboard</h3>
                <p className="text-muted-foreground mb-4">
                  Post jobs, manage projects, and find trusted talent.
                </p>
                <Button className="w-full" onClick={() => navigate('/auth')}>
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-trust rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Admin Panel</h3>
                <p className="text-muted-foreground mb-4">
                  Platform oversight, verification queue, and analytics.
                </p>
                <Button 
                  className="w-full" 
                  onClick={() => window.open('/admin-secret-access-portal-xyz', '_blank')}
                >
                  Admin Access
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
