import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrustBadge } from './TrustBadge';
import { 
  Shield, 
  Phone, 
  Mail, 
  CreditCard, 
  FileText, 
  Github, 
  Figma, 
  Wallet,
  CheckCircle,
  Clock,
  AlertCircle,
  Upload
} from 'lucide-react';

interface VerificationFlowProps {
  currentLevel: 'bronze' | 'silver' | 'gold' | 'platinum';
  onLevelComplete: (level: 'bronze' | 'silver' | 'gold' | 'platinum') => void;
}

export function VerificationFlow({ currentLevel, onLevelComplete }: VerificationFlowProps) {
  const [activeStep, setActiveStep] = useState<string>('');

  const verificationSteps = {
    bronze: [
      { id: 'email', icon: Mail, title: 'Email Verification', status: 'completed' as const },
      { id: 'phone', icon: Phone, title: 'Phone Verification', status: 'pending' as const },
      { id: 'github', icon: Github, title: 'GitHub OAuth', status: 'pending' as const },
    ],
    silver: [
      { id: 'government_id', icon: FileText, title: 'Government ID', status: 'pending' as const },
      { id: 'live_selfie', icon: Shield, title: 'Live Selfie', status: 'pending' as const },
    ],
    gold: [
      { id: 'payment', icon: CreditCard, title: 'Payment Method', status: 'pending' as const },
      { id: 'wallet', icon: Wallet, title: 'Solana Wallet', status: 'pending' as const },
    ],
    platinum: [
      { id: 'background', icon: FileText, title: 'Background Check', status: 'pending' as const },
      { id: 'video_interview', icon: Shield, title: 'Video Interview', status: 'pending' as const },
    ]
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const handleGitHubVerification = async () => {
    // GitHub account age and activity verification
    setActiveStep('github');
    // Simulate verification process
    setTimeout(() => {
      setActiveStep('');
      // Check account age (> 3 months) and recent activity
    }, 2000);
  };

  const handleFigmaVerification = async () => {
    // Figma account verification
    setActiveStep('figma');
    // Similar checks for Figma
    setTimeout(() => {
      setActiveStep('');
    }, 2000);
  };

  const renderVerificationStep = (step: any, level: string) => {
    const Icon = step.icon;
    return (
      <Card key={step.id} className="transition-all hover:shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5" />
              <div>
                <h4 className="font-medium">{step.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {step.id === 'github' && 'Account must be 3+ months old with recent activity'}
                  {step.id === 'figma' && 'Verify professional Figma account'}
                  {step.id === 'wallet' && 'Connect Solana wallet for escrow'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(step.status)}
              {step.status === 'pending' && (
                <Button 
                  size="sm" 
                  onClick={() => {
                    if (step.id === 'github') handleGitHubVerification();
                    if (step.id === 'figma') handleFigmaVerification();
                  }}
                  disabled={activeStep === step.id}
                >
                  {activeStep === step.id ? 'Verifying...' : 'Verify'}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <TrustBadge level={currentLevel} size="lg" />
        <h2 className="text-2xl font-bold mt-4">Verification Progress</h2>
        <p className="text-muted-foreground">
          Complete each step to unlock higher trust levels and better opportunities
        </p>
      </div>

      {(['bronze', 'silver', 'gold', 'platinum'] as const).map((level) => (
        <Card key={level} className={currentLevel === level ? 'ring-2 ring-primary' : ''}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <TrustBadge level={level} size="sm" />
                  {level.charAt(0).toUpperCase() + level.slice(1)} Verification
                </CardTitle>
                <CardDescription>
                  {level === 'bronze' && 'Basic identity and OAuth verification'}
                  {level === 'silver' && 'Government ID and biometric verification'}
                  {level === 'gold' && 'Financial and blockchain verification'}
                  {level === 'platinum' && 'Deep background and peer verification'}
                </CardDescription>
              </div>
              {currentLevel === level && (
                <Badge variant="outline">Current</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {verificationSteps[level].map((step) => renderVerificationStep(step, level))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}