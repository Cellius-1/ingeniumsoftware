import { supabase } from './supabase';
import type { Database } from './supabase';

type Task = Database['public']['Tables']['tasks']['Row'];
type TaskInsert = Database['public']['Tables']['tasks']['Insert'];
type TaskUpdate = Database['public']['Tables']['tasks']['Update'];

type Grant = Database['public']['Tables']['grants']['Row'];

// Mock data for development when Supabase is not configured
const mockTasks: Task[] = [
  {
    id: '1',
    user_id: 'mock-user',
    title: 'Complete project proposal',
    description: 'Write and submit the Q1 project proposal',
    completed: false,
    priority: 'high',
    due_date: '2024-02-15',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    user_id: 'mock-user',
    title: 'Review budget allocations',
    description: 'Review and approve budget for new initiatives',
    completed: true,
    priority: 'medium',
    due_date: '2024-02-10',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

const mockGrants: Grant[] = [
  {
    id: '1',
    title: 'Small Business Innovation Research (SBIR)',
    description: 'Federal funding program supporting small businesses engaged in research and development with commercialization potential.',
    amount: '$50,000 - $1,500,000',
    deadline: '2024-03-15',
    state: 'National',
    category: 'Technology',
    url: 'https://www.sbir.gov',
    eligibility: [
      'Small business with fewer than 500 employees',
      'US-based company',
      'Research & development focus',
      'Commercialization potential'
    ],
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'California Clean Energy Fund',
    description: 'State funding for clean energy innovations and sustainable technology startups.',
    amount: '$25,000 - $500,000',
    deadline: '2024-04-30',
    state: 'California',
    category: 'Environment',
    url: 'https://www.cacleanenergy.org',
    eligibility: [
      'California-based business',
      'Clean energy focus',
      'Early-stage company',
      'Environmental impact potential'
    ],
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    title: 'Texas Economic Development Grant',
    description: 'Supporting Texas businesses with job creation and economic development initiatives.',
    amount: '$10,000 - $250,000',
    deadline: '2024-05-15',
    state: 'Texas',
    category: 'Small Business',
    url: 'https://www.texasedc.org',
    eligibility: [
      'Texas-based business',
      'Job creation commitment',
      'Economic development impact',
      'Local community benefit'
    ],
    created_at: '2024-01-01T00:00:00Z'
  }
];

// Check if Supabase is properly configured
const isSupabaseConfigured = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  return url && 
         key &&
         url !== 'your_supabase_project_url_here' &&
         url.startsWith('https://') &&
         url.includes('.supabase.co');
};

// Task Service
export const taskService = {
  async getTasks(userId: string): Promise<Task[]> {
    if (!isSupabaseConfigured()) {
      console.warn('Using mock task data - Supabase not configured');
      return mockTasks.filter(task => task.user_id === userId || task.user_id === 'mock-user');
    }

    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return mockTasks;
    }
  },

  async createTask(task: TaskInsert): Promise<Task> {
    if (!isSupabaseConfigured()) {
      console.warn('Using mock task creation - Supabase not configured');
      const newTask: Task = {
        id: Date.now().toString(),
        ...task,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        completed: task.completed || false,
        description: task.description || '',
        priority: task.priority || 'medium',
        due_date: task.due_date || ''
      };
      mockTasks.unshift(newTask);
      return newTask;
    }

    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([task])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  async updateTask(id: string, updates: TaskUpdate): Promise<Task> {
    if (!isSupabaseConfigured()) {
      console.warn('Using mock task update - Supabase not configured');
      const taskIndex = mockTasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        mockTasks[taskIndex] = {
          ...mockTasks[taskIndex],
          ...updates,
          updated_at: new Date().toISOString()
        };
        return mockTasks[taskIndex];
      }
      throw new Error('Task not found');
    }

    try {
      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  async deleteTask(id: string): Promise<void> {
    if (!isSupabaseConfigured()) {
      console.warn('Using mock task deletion - Supabase not configured');
      const taskIndex = mockTasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        mockTasks.splice(taskIndex, 1);
      }
      return;
    }

    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
};

// Grant Service
export const grantService = {
  async getGrants(filters?: {
    state?: string;
    category?: string;
    search?: string;
  }): Promise<Grant[]> {
    if (!isSupabaseConfigured()) {
      console.warn('Using mock grant data - Supabase not configured');
      let filteredGrants = [...mockGrants];

      if (filters?.state) {
        filteredGrants = filteredGrants.filter(grant => 
          grant.state === filters.state || grant.state === 'National'
        );
      }

      if (filters?.category) {
        filteredGrants = filteredGrants.filter(grant => 
          grant.category === filters.category
        );
      }

      if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        filteredGrants = filteredGrants.filter(grant =>
          grant.title.toLowerCase().includes(searchLower) ||
          grant.description.toLowerCase().includes(searchLower)
        );
      }

      return filteredGrants;
    }

    try {
      let query = supabase.from('grants').select('*');

      if (filters?.state) {
        query = query.or(`state.eq.${filters.state},state.eq.National`);
      }

      if (filters?.category) {
        query = query.eq('category', filters.category);
      }

      if (filters?.search) {
        query = query.or(
          `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
        );
      }

      const { data, error } = await query.order('deadline', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching grants:', error);
      return mockGrants;
    }
  }
};