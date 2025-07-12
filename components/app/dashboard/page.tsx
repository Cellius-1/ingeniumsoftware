'use client';
import { useAuth } from '@/contexts/AuthContext';
import DashboardStats from '@/components/dashboard/DashboardStats';
import RecentTasks from '@/components/dashboard/RecentTasks';
import UpcomingEvents from '@/components/dashboard/UpcomingEvents';
import FundingProgress from '@/components/dashboard/FundingProgress';
import Link from 'next/link';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return (
      <section className="container">
        <div style={{
          backgroundColor: 'var(--dark-secondary)',
          padding: '3rem 2rem',
          borderRadius: 'var(--border-radius)',
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Welcome to InGenium
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Please log in to access your dashboard and manage your business tools.
          </p>
          <Link href="/sign-in" className="cta-button" style={{ margin: 0 }}>
            Sign In
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container">
      <h1 style={{ 
        fontSize: '2rem', 
        fontWeight: '700', 
        color: 'var(--text-primary)', 
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        Dashboard
      </h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '2fr 1fr', 
        gap: '2rem',
        alignItems: 'start'
      }}>
        <div>
          <DashboardStats />
          <RecentTasks />
        </div>
        <div>
          <UpcomingEvents />
          <FundingProgress />
        </div>
      </div>
    </section>
  );
}
