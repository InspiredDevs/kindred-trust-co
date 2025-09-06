import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Job {
  id: string;
  title: string;
  description: string;
  budget: number;
  skills: string[];
  client_id: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
  client_name?: string;
}

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // For now, return mock data since we don't have jobs table yet
      const mockJobs: Job[] = [
        {
          id: '1',
          title: 'React Developer for E-commerce Site',
          description: 'Looking for an experienced React developer to build a modern e-commerce platform with payment integration.',
          budget: 25000,
          skills: ['React', 'TypeScript', 'Tailwind CSS', 'Stripe'],
          client_id: 'client1',
          status: 'open',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          client_name: 'Tech Solutions Ltd'
        },
        {
          id: '2',
          title: 'Mobile App UI/UX Design',
          description: 'Need a talented designer to create modern, user-friendly mobile app designs for a fintech application.',
          budget: 15000,
          skills: ['Figma', 'UI/UX Design', 'Mobile Design', 'Prototyping'],
          client_id: 'client2',
          status: 'open',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          client_name: 'FinTech Innovations'
        },
        {
          id: '3',
          title: 'WordPress Website Development',
          description: 'Develop a professional WordPress website with custom theme and plugin integration for a consulting firm.',
          budget: 18000,
          skills: ['WordPress', 'PHP', 'CSS', 'MySQL'],
          client_id: 'client3',
          status: 'open',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          client_name: 'Business Consultants Inc'
        }
      ];
      
      setJobs(mockJobs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserJobs = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Mock user's jobs
      const mockUserJobs: Job[] = [
        {
          id: '4',
          title: 'Website Redesign Project',
          description: 'Complete redesign of company website with modern look and feel.',
          budget: 20000,
          skills: ['React', 'Design', 'SEO'],
          client_id: user.id,
          status: 'in_progress',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          client_name: 'My Company'
        }
      ];
      
      setJobs(mockUserJobs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return {
    jobs,
    loading,
    error,
    fetchJobs,
    fetchUserJobs,
    refetch: fetchJobs
  };
}