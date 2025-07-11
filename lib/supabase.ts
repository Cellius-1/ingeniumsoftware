import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if Supabase is properly configured
if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your_supabase_project_url_here') {
  console.warn('⚠️ Supabase environment variables not configured - using mock data');
}

// Use proper Supabase project URL (not database URL)
export const supabase = createClient(
  supabaseUrl || 'https://iuwlutggsmptfluuhzmn.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1d2x1dGdnc21wdGZsdXVoem1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwOTEwMDgsImV4cCI6MjA2NzY2NzAwOH0.hDaeYVgvjPAfY6DwY5gJeB1G1fy3xSeHKuEMOKwxxtI'
);

export type Database = {
  public: {
    Tables: {
      tasks: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string;
          completed: boolean;
          priority: 'low' | 'medium' | 'high';
          due_date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          title: string;
          description?: string;
          completed?: boolean;
          priority?: 'low' | 'medium' | 'high';
          due_date?: string;
        };
        Update: {
          title?: string;
          description?: string;
          completed?: boolean;
          priority?: 'low' | 'medium' | 'high';
          due_date?: string;
        };
      };
      grants: {
        Row: {
          id: string;
          title: string;
          description: string;
          amount: string;
          deadline: string;
          state: string;
          category: string;
          url?: string;
          eligibility?: string[];
          created_at: string;
        };
        Insert: {
          title: string;
          description: string;
          amount: string;
          deadline: string;
          state: string;
          category: string;
          url?: string;
          eligibility?: string[];
        };
        Update: {
          title?: string;
          description?: string;
          amount?: string;
          deadline?: string;
          state?: string;
          category?: string;
          url?: string;
          eligibility?: string[];
        };
      };
    };
  };
};