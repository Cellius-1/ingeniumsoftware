# Supabase Integration Setup Guide

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - Name: `ingenium-software`
   - Database Password: (generate a strong password)
   - Region: Choose closest to your users
5. Click "Create new project"
6. Wait for project to be created (2-3 minutes)

## Step 2: Get Project Credentials

1. In your Supabase dashboard, go to Settings → API
2. Copy the following values:
   - Project URL
   - Anon (public) key

## Step 3: Set Environment Variables

Create a `.env.local` file in your project root with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## Step 4: Set Up Database Schema

1. In your Supabase dashboard, go to SQL Editor
2. Copy the contents of `supabase-schema.sql`
3. Paste and run the SQL in the editor
4. This will create all necessary tables and policies

## Step 5: Configure Authentication

1. Go to Authentication → Settings in your Supabase dashboard
2. Configure your site URL (e.g., `http://localhost:3000` for development)
3. Add redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/dashboard`

## Step 6: Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to your app
3. Try to register/login - this should now work with real Supabase auth
4. Test creating tasks - they should persist in the database

## Step 7: Update Other Components

The following components need to be updated to use Supabase:

### Calendar Component
- Update `components/business-hub/Calendar.tsx` to use `eventService`
- Replace mock events with real database calls

### Grant Finder
- Update `components/funding/GrantFinder.tsx` to use `grantService`
- Replace mock grants with real database queries

### Application Tracker
- Update `components/funding/ApplicationTracker.tsx` to use `applicationService`
- Replace mock applications with real database calls

### Dashboard Stats
- Update dashboard components to pull real data from Supabase
- Create aggregation queries for statistics

## Step 8: Add Error Handling

Add proper error handling to all components:

```typescript
try {
  const data = await serviceFunction();
  // Handle success
} catch (error) {
  console.error('Error:', error);
  // Show user-friendly error message
}
```

## Step 9: Add Loading States

All components should show loading states while fetching data:

```typescript
const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadData = async () => {
    setLoading(true);
    try {
      const data = await serviceFunction();
      setData(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  loadData();
}, []);
```

## Step 10: Security Considerations

1. **Row Level Security (RLS)**: Already configured in the schema
2. **Environment Variables**: Never commit `.env.local` to version control
3. **API Keys**: Use anon key for client-side, service role key only for server-side
4. **Input Validation**: Validate all user inputs before sending to database

## Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables"**
   - Check that `.env.local` exists and has correct values
   - Restart your development server after adding env vars

2. **"Invalid JWT" errors**
   - Check that your Supabase URL and key are correct
   - Ensure you're using the anon key, not the service role key

3. **"Policy violation" errors**
   - Check that RLS policies are correctly set up
   - Ensure user is authenticated before making requests

4. **"Table doesn't exist" errors**
   - Run the SQL schema in Supabase SQL Editor
   - Check that all tables were created successfully

### Debugging Tips:

1. Check browser console for errors
2. Use Supabase dashboard to inspect data
3. Test queries in Supabase SQL Editor
4. Check Network tab in browser dev tools

## Next Steps

After completing this setup:

1. Update remaining components to use Supabase
2. Add real-time subscriptions for live updates
3. Implement file uploads using Supabase Storage
4. Add email notifications using Supabase Edge Functions
5. Set up automated backups and monitoring 