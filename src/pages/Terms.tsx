import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfile } from "@/hooks/useProfile";
import { FileText, Scale, AlertTriangle, Users } from "lucide-react";

const Terms = () => {
  const { profile } = useProfile();

  return (
    <div className="min-h-screen bg-background">
      <Navigation userType={profile?.user_type as any} trustLevel={profile?.trust_level as any} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-muted-foreground">
            Last updated: January 2025
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Agreement to Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p>
                By accessing and using Inspired Devs, you agree to be bound by these Terms of Service 
                and all applicable laws and regulations. If you do not agree with any of these terms, 
                you are prohibited from using this platform.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Platform Usage
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Eligibility</h4>
                  <ul className="list-disc list-inside text-muted-foreground">
                    <li>You must be at least 18 years old</li>
                    <li>Provide accurate and complete information</li>
                    <li>Maintain the security of your account</li>
                    <li>Comply with all applicable laws and regulations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold">Prohibited Activities</h4>
                  <ul className="list-disc list-inside text-muted-foreground">
                    <li>Fraudulent or deceptive practices</li>
                    <li>Harassment or abuse of other users</li>
                    <li>Violation of intellectual property rights</li>
                    <li>Attempting to circumvent platform security</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="w-5 h-5" />
                Freelancer and Client Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Freelancers</h4>
                  <ul className="list-disc list-inside text-muted-foreground">
                    <li>Deliver work as agreed upon with clients</li>
                    <li>Maintain professional communication</li>
                    <li>Complete identity verification when required</li>
                    <li>Pay applicable platform fees</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold">Clients</h4>
                  <ul className="list-disc list-inside text-muted-foreground">
                    <li>Provide clear project requirements</li>
                    <li>Make timely payments for completed work</li>
                    <li>Treat freelancers with respect and professionalism</li>
                    <li>Use the platform's payment systems</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Limitation of Liability
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p>
                Inspired Devs acts as a platform connecting freelancers and clients. We do not guarantee 
                the quality of work performed or the reliability of users. Our liability is limited to 
                the platform fees paid in the preceding 12 months.
              </p>
              <div className="bg-muted p-4 rounded-lg mt-4">
                <p className="text-sm">
                  <strong>Dispute Resolution:</strong> Any disputes should first be resolved through our 
                  platform's dispute resolution process. Unresolved disputes will be subject to binding 
                  arbitration under Nigerian law.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="prose prose-slate max-w-none">
              <h3 className="font-semibold mb-4">Platform Fees</h3>
              <p>
                Inspired Devs charges service fees for successful transactions. Current fee structures 
                are available in your account dashboard and may be updated with 30 days notice.
              </p>
              
              <h3 className="font-semibold mb-4 mt-8">Intellectual Property</h3>
              <p>
                Work created through our platform belongs to the hiring client unless otherwise agreed. 
                The Inspired Devs platform, including all content and trademarks, remains our property.
              </p>
              
              <h3 className="font-semibold mb-4 mt-8">Modifications</h3>
              <p>
                We reserve the right to modify these terms at any time. Continued use of the platform 
                after changes constitutes acceptance of the new terms.
              </p>

              <h3 className="font-semibold mb-4 mt-8">Contact Information</h3>
              <p>
                For questions about these Terms of Service, contact us at legal@inspireddevs.com 
                or through our support center.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Terms;