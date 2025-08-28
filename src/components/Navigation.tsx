import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  Users, 
  Briefcase, 
  Shield, 
  Bell,
  Search,
  MessageSquare,
  Settings
} from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  userType?: "freelancer" | "client" | "admin" | null;
  trustLevel?: "bronze" | "silver" | "gold" | "platinum";
}

export function Navigation({ userType, trustLevel }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = {
    freelancer: [
      { label: "Find Work", icon: Search, href: "/jobs" },
      { label: "My Proposals", icon: Briefcase, href: "/proposals" },
      { label: "Messages", icon: MessageSquare, href: "/messages" },
      { label: "Profile", icon: Users, href: "/profile" },
    ],
    client: [
      { label: "Post Job", icon: Briefcase, href: "/post-job" },
      { label: "Find Talent", icon: Users, href: "/talent" },
      { label: "My Jobs", icon: Search, href: "/my-jobs" },
      { label: "Messages", icon: MessageSquare, href: "/messages" },
    ],
    admin: [
      { label: "Dashboard", icon: Shield, href: "/admin" },
      { label: "Verifications", icon: Users, href: "/admin/verifications" },
      { label: "Disputes", icon: MessageSquare, href: "/admin/disputes" },
      { label: "Reports", icon: Briefcase, href: "/admin/reports" },
    ],
  };

  const currentNav = userType ? navigationItems[userType] : [];

  return (
    <nav className="border-b bg-card shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-trust rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-trust bg-clip-text text-transparent">
              Inspired Devs
            </span>
            {trustLevel && (
              <Badge variant="outline" className="ml-2 text-xs">
                {trustLevel.charAt(0).toUpperCase() + trustLevel.slice(1)} Verified
              </Badge>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {currentNav.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.href}
                  variant="ghost"
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {userType && (
              <>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-primary text-xs">
                    3
                  </Badge>
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="w-5 h-5" />
                </Button>
              </>
            )}
            
            {!userType && (
              <div className="flex items-center gap-2">
                <Button variant="ghost">Sign In</Button>
                <Button className="bg-gradient-hero text-white shadow-trust">
                  Get Started
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col space-y-2">
              {currentNav.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.href}
                    variant="ghost"
                    className="justify-start gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}