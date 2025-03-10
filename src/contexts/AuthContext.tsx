import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../lib/store';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useAuthStore();

  const fetchUser = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        throw error;
      }

      if (data) {
        setUser(data as User);
        localStorage.setItem('user', JSON.stringify(data));
      } else {
        await supabase.auth.signOut();
        setUser(null);
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      await supabase.auth.signOut();
      setUser(null);
      localStorage.removeItem('user');
    }
  };

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // Check localStorage first
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        // Verify session with Supabase
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user && mounted) {
          // If we have a session, fetch fresh user data
          await fetchUser(session.user.id);
        } else if (!session && mounted) {
          // No valid session, clear user state
          setUser(null);
          localStorage.removeItem('user');
        }

        // Set loading to false before setting up the listener
        if (mounted) {
          setLoading(false);
        }

        // Set up the auth state change listener
        await setupAuthStateChangeListener();
      } catch (error) {
        console.error('Error initializing auth:', error);
        setUser(null);
        localStorage.removeItem('user');
        setLoading(false);
      }
    };

    const setupAuthStateChangeListener = async () => {
      if (mounted) {
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
          if (mounted) {
            if (session?.user) {
              await fetchUser(session.user.id);
            } else {
              setUser(null);
              localStorage.removeItem('user');
            }
          }
        });

        return () => {
          mounted = false;
          subscription.unsubscribe();
        };
      }
    };

    initializeAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }
      console.log(data);
      if (data.user) {
        await fetchUser(data.user.id);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setLoading(true);
      const {
        data: { user: authUser },
        error: signUpError,
      } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        throw signUpError;
      }

      if (!authUser?.id) {
        throw new Error('Failed to create user account');
      }

      const { error: profileError } = await supabase
        .from('users')
        .insert([
          {
            id: authUser.id,
            email: email,
            full_name: fullName,
            subscription_tier: 'free',
          },
        ])
        .select()
        .single();

      if (profileError) {
        await supabase.auth.signOut();
        throw profileError;
      }

      await fetchUser(authUser.id);
    } catch (error: any) {
      if (error.message === 'User already registered') {
        throw new Error(
          'This email is already registered. Please sign in instead.'
        );
      }
      await supabase.auth.signOut();
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error signing out:', error);
      setUser(null);
      localStorage.removeItem('user');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
