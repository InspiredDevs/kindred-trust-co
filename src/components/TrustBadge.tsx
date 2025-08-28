import { Badge } from "@/components/ui/badge";
import { Shield, Star, CheckCircle, Award } from "lucide-react";
import { cn } from "@/lib/utils";

export type TrustLevel = "bronze" | "silver" | "gold" | "platinum";

interface TrustBadgeProps {
  level: TrustLevel;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const trustConfig = {
  bronze: {
    label: "Bronze Verified",
    description: "Email + Phone + Basic Checks",
    icon: CheckCircle,
    color: "bg-trust-bronze text-white",
  },
  silver: {
    label: "Silver Verified", 
    description: "Government ID + Liveness Check",
    icon: Shield,
    color: "bg-trust-silver text-white",
  },
  gold: {
    label: "Gold Verified",
    description: "Payment + Background Verified",
    icon: Star,
    color: "bg-trust-gold text-white",
  },
  platinum: {
    label: "Platinum Verified",
    description: "Deep Verification + Peer Vouched",
    icon: Award,
    color: "bg-trust-platinum text-white",
  },
};

export function TrustBadge({ level, size = "md", showText = true, className }: TrustBadgeProps) {
  const config = trustConfig[level];
  const Icon = config.icon;
  
  const sizeClasses = {
    sm: "h-4 w-4 text-xs",
    md: "h-5 w-5 text-sm", 
    lg: "h-6 w-6 text-base",
  };

  return (
    <Badge 
      className={cn(
        "flex items-center gap-1.5 font-medium shadow-sm",
        config.color,
        sizeClasses[size],
        className
      )}
      title={config.description}
    >
      <Icon className={cn("shrink-0", sizeClasses[size].split(" ")[0])} />
      {showText && <span>{config.label}</span>}
    </Badge>
  );
}

export function TrustScore({ score, className }: { score: number; className?: string }) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-trust-platinum";
    if (score >= 75) return "text-trust-gold";
    if (score >= 60) return "text-trust-silver";
    return "text-trust-bronze";
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="text-2xl font-bold">
        <span className={getScoreColor(score)}>{score}</span>
        <span className="text-muted-foreground text-lg">/100</span>
      </div>
      <div className="text-sm text-muted-foreground">Trust Score</div>
    </div>
  );
}