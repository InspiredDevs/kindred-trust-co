import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfile } from "@/hooks/useProfile";
import { Shield, Eye, Lock, UserCheck } from "lucide-react";

const Privacy = () => {
  const { profile } = useProfile();

  return (
    <div className="min-h-screen bg-background">
      <Navigation userType={profile?.user_type as any} trustLevel={profile?.trust_level as any} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground">
            Last updated: January 2025
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Our Commitment to Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p>
                At Inspired Devs, we are committed to protecting your privacy and personal information. 
                This Privacy Policy explains how we collect, use, and safeguard your data when you use our platform.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Personal Information</h4>
                  <ul className="list-disc list-inside text-muted-foreground">
                    <li>Name, email address, and contact information</li>
                    <li>Profile information and professional details</li>
                    <li>Payment and billing information</li>
                    <li>Identity verification documents</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold">Usage Information</h4>
                  <ul className="list-disc list-inside text-muted-foreground">
                    <li>Platform activity and interactions</li>
                    <li>Device and browser information</li>
                    <li>IP address and location data</li>
                    <li>Cookies and tracking technologies</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="w-5 h-5" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Provide and improve our platform services</li>
                <li>Verify your identity and maintain platform security</li>
                <li>Process payments and transactions</li>
                <li>Communicate important updates and notifications</li>
                <li>Prevent fraud and ensure platform safety</li>
                <li>Comply with legal obligations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p>
                We implement industry-standard security measures to protect your personal information, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>SSL encryption for data transmission</li>
                <li>Secure data storage with regular backups</li>
                <li>Access controls and authentication systems</li>
                <li>Regular security audits and monitoring</li>
                <li>Compliance with international data protection standards</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="prose prose-slate max-w-none">
              <h3 className="font-semibold mb-4">Your Rights</h3>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Access and update your personal information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability and export</li>
                <li>Object to certain data processing activities</li>
              </ul>
              
              <h3 className="font-semibold mb-4 mt-8">Contact Us</h3>
              <p>
                If you have questions about this Privacy Policy or our data practices, 
                please contact us at privacy@inspireddevs.com or through our support center.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Privacy;