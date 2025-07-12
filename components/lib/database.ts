import { supabase } from './supabase';
import type { Database } from './supabase';

type Tables = Database['public']['Tables'];

// Helper function to check if Supabase is properly configured
const isSupabaseConfigured = () => {
  return process.env.NEXT_PUBLIC_SUPABASE_URL && 
         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
         process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_project_url_here';
};

// Task functions
export const taskService = {
  async getTasks(userId: string) {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured - returning empty array');
      return [];
    }

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
    return data || [];
  },

  async createTask(task: Tables['tasks']['Insert']) {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured - task not saved');
      return null;
    }

    const { data, error } = await supabase
      .from('tasks')
      .insert(task)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating task:', error);
      throw error;
    }
    return data;
  },

  async updateTask(id: string, updates: Partial<Tables['tasks']['Update']>) {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured - task not updated');
      return null;
    }

    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating task:', error);
      throw error;
    }
    return data;
  },

  async deleteTask(id: string) {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured - task not deleted');
      return;
    }

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
};

// Event functions
export const eventService = {
  async getEvents(userId: string) {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured - returning empty array');
      return [];
    }

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: true });
    
    if (error) {
      console.error('Error fetching events:', error);
      return [];
    }
    return data || [];
  },

  async createEvent(event: Tables['events']['Insert']) {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured - event not saved');
      return null;
    }

    const { data, error } = await supabase
      .from('events')
      .insert(event)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating event:', error);
      throw error;
    }
    return data;
  },

  async updateEvent(id: string, updates: Partial<Tables['events']['Update']>) {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured - event not updated');
      return null;
    }

    const { data, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating event:', error);
      throw error;
    }
    return data;
  },

  async deleteEvent(id: string) {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured - event not deleted');
      return;
    }

    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }
};

// Grant functions
export const grantService = {
  async getGrants(filters?: {
    state?: string;
    category?: string;
    search?: string;
  }) {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured - returning sample grants');
      // Return sample data for development
      return [
        {
          id: '1',
          title: 'Small Business Innovation Research (SBIR)',
          description: 'Federal funding program for small businesses to engage in Research and Development with the potential for commercialization.',
          amount: '$50,000 - $1,500,000',
          deadline: '2024-03-15',
          eligibility: ['Small business with <500 employees', 'US-based company', 'R&D focus'],
          state: 'National',
          category: 'Technology',
          url: 'https://www.sbir.gov',
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          title: 'State Small Business Credit Initiative',
          description: 'Program designed to strengthen state programs that support lending to small businesses.',
          amount: '$10,000 - $500,000',
          deadline: '2024-04-30',
          eligibility: ['Small business', 'State-specific requirements', 'Good credit history'],
          state: 'Various States',
          category: 'Small Business',
          url: 'https://www.treasury.gov/sbci',
          created_at: new Date().toISOString()
        }
      ];
    }

    let query = supabase.from('grants').select('*');
    
    if (filters?.state) {
      query = query.eq('state', filters.state);
    }
    
    if (filters?.category) {
      query = query.eq('category', filters.category);
    }
    
    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching grants:', error);
      return [];
    }
    return data || [];
  },

  async createGrant(grant: Tables['grants']['Insert']) {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured - grant not saved');
      return null;
    }

    const { data, error } = await supabase
      .from('grants')
      .insert(grant)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating grant:', error);
      throw error;
    }
    return data;
  },

  async updateGrant(id: string, updates: Partial<Tables['grants']['Update']>) {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured - grant not updated');
      return null;
    }

    const { data, error } = await supabase
      .from('grants')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating grant:', error);
      throw error;
    }
    return data;
  },

  async deleteGrant(id: string) {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured - grant not deleted');
      return;
    }

    const { error } = await supabase
      .from('grants')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting grant:', error);
      throw error;
    }
  }
};

// Application functions
export const applicationService = {
  async getApplications(userId: string) {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured - returning empty array');
      return [];
    }

    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching applications:', error);
      return [];
    }
    return data || [];
  },

  async createApplication(application: Tables['applications']['Insert']) {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured - application not saved');
      return null;
    }

    const { data, error } = await supabase
      .from('applications')
      .insert(application)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating application:', error);
      throw error;
    }
    return data;
  },

  async updateApplication(id: string, updates: Partial<Tables['applications']['Update']>) {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured - application not updated');
      return null;
    }

    const { data, error } = await supabase
      .from('applications')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating application:', error);
      throw error;
    }
    return data;
  },

  async deleteApplication(id: string) {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured - application not deleted');
      return;
    }

    const { error } = await supabase
      .from('applications')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting application:', error);
      throw error;
    }
  }
}; 