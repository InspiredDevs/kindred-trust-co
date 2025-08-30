import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useProfile } from '@/hooks/useProfile';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, Briefcase, ArrowRight, Loader2 } from 'lucide-react';

const UserTypeSelection = () => {
  const [selectedType, setSelectedType] = useState<'freelancer' | 'client' | null>(null);
  const [loading, setLoading] = useState(false);
  const { updateProfile } = useProfile();
  const navigate = useNavigate();

  const handleTypeSelection = async (userType: 'freelancer' | 'client') => {
    setSelectedType(userType);
    setLoading(true);

    try {
      await updateProfile({ user_type: userType });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating user type:', error);
    } finally {
      setLoading(false);
    }
  };

  const userTypes = [
    {
      type: 'freelancer' as const,
      title: 'I\'m a Freelancer',
      description: 'I want to offer my services and find work opportunities',
      icon: Users,
      features: [
        'Create a professional profile',
        'Bid on projects',
        'Build your reputation',
        'Get verified and increase trust'
      ],
      color: 'bg-gradient-to-br from-blue-500 to-cyan-500'
    },
    {
      type: 'client' as const,
      title: 'I\'m a Client',
      description: 'I want to hire talented freelancers for my projects',
      icon: Briefcase,
      features: [
        'Post job opportunities',
        'Find verified talent',
        'Manage projects securely',
        'Access escrow protection'
      ],
      color: 'bg-gradient-to-br from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-trust rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-trust bg-clip-text text-transparent">
              Inspired Devs
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome to the Platform!</h1>
          <p className="text-muted-foreground">
            Tell us how you'd like to use Inspired Devs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userTypes.map((userType) => {
            const Icon = userType.icon;
            const isSelected = selectedType === userType.type;
            
            return (
              <Card 
                key={userType.type}
                className={`shadow-card hover:shadow-glow transition-all duration-300 cursor-pointer border-2 ${
                  isSelected ? 'border-primary' : 'border-transparent'
                }`}
                onClick={() => !loading && handleTypeSelection(userType.type)}
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${userType.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{userType.title}</CardTitle>
                  <CardDescription>{userType.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {userType.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    disabled={loading}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTypeSelection(userType.type);
                    }}
                  >
                    {loading && selectedType === userType.type ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <ArrowRight className="w-4 h-4 mr-2" />
                    )}
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            You can always change this later in your profile settings
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection;