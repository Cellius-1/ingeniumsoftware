'use client';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await logout();
    router.push('/');
  };

  if (!user) {
    return (
      <section className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Not signed in</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Please <a href="/sign-in" style={{ color: '#8a7bff', textDecoration: 'underline' }}>sign in</a> to access your account.
        </p>
      </section>
    );
  }

  return (
    <section className="container" style={{ maxWidth: 480, margin: '4rem auto', background: 'var(--dark-secondary)', borderRadius: 'var(--border-radius)', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', padding: '2.5rem 2rem', textAlign: 'center' }}>
      <h1 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '2rem', marginBottom: '1.5rem' }}>
        My Account
      </h1>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Signed in as</div>
        <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1.2rem' }}>{user.email}</div>
      </div>
      <button
        className="cta-button"
        style={{ width: '100%', background: '#ff3b30', color: 'white', marginBottom: '1.5rem' }}
        onClick={handleSignOut}
        disabled={loading}
      >
        {loading ? 'Signing Out...' : 'Sign Out'}
      </button>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '2rem' }}>
        <strong>Account management features coming soon!</strong>
      </div>
    </section>
  );
} 