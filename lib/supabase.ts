import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create client with fallback for development
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// Database types for TypeScript
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      grants: {
        Row: {
          id: string;
          title: string;
          description: string;
          amount: string;
          deadline: string;
          eligibility: string[];
          state: string;
          category: string;
          url: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          amount: string;
          deadline: string;
          eligibility: string[];
          state: string;
          category: string;
          url: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          amount?: string;
          deadline?: string;
          eligibility?: string[];
          state?: string;
          category?: string;
          url?: string;
          created_at?: string;
        };
      };
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
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description: string;
          completed?: boolean;
          priority: 'low' | 'medium' | 'high';
          due_date: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string;
          completed?: boolean;
          priority?: 'low' | 'medium' | 'high';
          due_date?: string;
          created_at?: string;
        };
      };
      events: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          date: string;
          time: string;
          description: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          date: string;
          time: string;
          description: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          date?: string;
          time?: string;
          description?: string;
          created_at?: string;
        };
      };
      applications: {
        Row: {
          id: string;
          user_id: string;
          grant_name: string;
          amount: string;
          status: 'draft' | 'submitted' | 'under-review' | 'approved' | 'rejected';
          submitted_date: string;
          deadline: string;
          notes: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          grant_name: string;
          amount: string;
          status: 'draft' | 'submitted' | 'under-review' | 'approved' | 'rejected';
          submitted_date: string;
          deadline: string;
          notes: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          grant_name?: string;
          amount?: string;
          status?: 'draft' | 'submitted' | 'under-review' | 'approved' | 'rejected';
          submitted_date?: string;
          deadline?: string;
          notes?: string;
          created_at?: string;
        };
      };
    };
  };
} 