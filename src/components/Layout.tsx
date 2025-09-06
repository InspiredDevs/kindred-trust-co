import { ReactNode } from "react";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";

interface LayoutProps {
  children: ReactNode;
  showNavigation?: boolean;
  showFooter?: boolean;
}

export function Layout({ children, showNavigation = true, showFooter = true }: LayoutProps) {
  const { user } = useAuth();
  const { profile } = useProfile();

  return (
    <div className="min-h-screen flex flex-col">
      {showNavigation && (
        <Navigation 
          userType={profile?.user_type as "freelancer" | "client" | "admin" | null}
          trustLevel={profile?.trust_level as "bronze" | "silver" | "gold" | "platinum"}
        />
      )}
      
      <main className="flex-1">
        {children}
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
}