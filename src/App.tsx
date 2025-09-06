import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import UserTypeSelection from "./pages/UserTypeSelection";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Proposals from "./pages/Proposals";
import PostJob from "./pages/PostJob";
import Talent from "./pages/Talent";
import MyJobs from "./pages/MyJobs";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAccess from "./pages/AdminAccess";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="inspired-devs-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route 
                path="/onboarding" 
                element={
                  <Layout>
                    <ProtectedRoute>
                      <UserTypeSelection />
                    </ProtectedRoute>
                  </Layout>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <Layout>
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  </Layout>
                } 
              />
              <Route 
                path="/jobs" 
                element={
                  <Layout>
                    <ProtectedRoute>
                      <Jobs />
                    </ProtectedRoute>
                  </Layout>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <Layout>
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  </Layout>
                } 
              />
              <Route 
                path="/messages" 
                element={
                  <Layout>
                    <ProtectedRoute>
                      <Messages />
                    </ProtectedRoute>
                  </Layout>
                } 
              />
              <Route 
                path="/admin-secret-access-portal-xyz" 
                element={
                  <Layout showNavigation={false} showFooter={false}>
                    <AdminAccess />
                  </Layout>
                } 
              />
              <Route 
                path="/proposals" 
                element={
                  <Layout>
                    <ProtectedRoute>
                      <Proposals />
                    </ProtectedRoute>
                  </Layout>
                } 
              />
              <Route 
                path="/post-job" 
                element={
                  <Layout>
                    <ProtectedRoute>
                      <PostJob />
                    </ProtectedRoute>
                  </Layout>
                } 
              />
              <Route 
                path="/talent" 
                element={
                  <Layout>
                    <ProtectedRoute>
                      <Talent />
                    </ProtectedRoute>
                  </Layout>
                } 
              />
              <Route 
                path="/my-jobs" 
                element={
                  <Layout>
                    <ProtectedRoute>
                      <MyJobs />
                    </ProtectedRoute>
                  </Layout>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <Layout>
                    <ProtectedRoute requireAdmin>
                      <AdminDashboard />
                    </ProtectedRoute>
                  </Layout>
                } 
              />
              <Route 
                path="/privacy" 
                element={
                  <Layout>
                    <Privacy />
                  </Layout>
                } 
              />
              <Route 
                path="/terms" 
                element={
                  <Layout>
                    <Terms />
                  </Layout>
                } 
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route 
                path="*" 
                element={
                  <Layout>
                    <NotFound />
                  </Layout>
                } 
              />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
