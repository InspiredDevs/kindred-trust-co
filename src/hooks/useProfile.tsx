import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  user_id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  user_type: string | null;
  trust_level: string | null;
  is_verified: boolean | null;
  trust_score: number | null;
  is_active: boolean | null;
  verification_status: any;
  created_at: string | null;
  updated_at: string | null;
}

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // First try to get existing profile
        let { data: existingProfile, error: fetchError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (fetchError) {
          console.error('Error fetching profile:', fetchError);
          setError(fetchError.message);
          return;
        }

        // If no profile exists, create one
        if (!existingProfile) {
          const { data: newProfile, error: insertError } = await supabase
            .from('profiles')
            .insert({
              user_id: user.id,
              email: user.email,
              full_name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0],
              avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture,
            })
            .select()
            .single();

          if (insertError) {
            console.error('Error creating profile:', insertError);
            setError(insertError.message);
            return;
          }

          setProfile(newProfile);
        } else {
          setProfile(existingProfile);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user]);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user || !profile) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating profile:', error);
        setError(error.message);
        return;
      }

      setProfile(data);
    } catch (err) {
      console.error('Unexpected error updating profile:', err);
      setError('An unexpected error occurred while updating');
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
  };
}