'use client';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const { user, login, register, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [action, setAction] = useState<'login' | 'register'>('login');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleAuth = async () => {
    setError(null);
    setMessage(null);
    try {
      if (action === 'login') {
        await login(email, password);
        setMessage('Login successful! Redirecting...');
        setTimeout(() => router.push('/dashboard'), 1200);
      } else {
        await register(email, password);
        setMessage('Registration successful! Please check your email for confirmation.');
      }
    } catch (error: any) {
      setError(error.message || 'Authentication failed');
    }
  };

  return (
    <div className="container">
      <div className="auth-test-page">
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to InGenium</h1>
            <p className="hero-subtitle">Sign in or create an account to access your dashboard and business tools.</p>
          </div>
        </section>

        <section className="auth-section">
          <div className="auth-card">
            <div className="auth-header">
              <h2>{action === 'login' ? 'Sign In' : 'Create Account'}</h2>
              {loading && <div className="loading-spinner">Loading...</div>}
            </div>
            {!loading && user ? (
              <div className="auth-success">
                <div className="success-icon">✅</div>
                <div className="user-info">
                  <h3>Successfully Logged In</h3>
                  <p className="user-email">{user.email}</p>
                  <p className="user-id">User ID: {user.id}</p>
                </div>
              </div>
            ) : !loading && (
              <div className="auth-form">
                {error && (
                  <div className="error-message">
                    <div className="error-icon">⚠️</div>
                    <div className="error-content">
                      <h4>Authentication Error</h4>
                      <p>{error}</p>
                    </div>
                  </div>
                )}
                {message && (
                  <div className="success-message">
                    <div className="success-icon">✅</div>
                    <div className="message-content">
                      <h4>Success!</h4>
                      <p>{message}</p>
                      {action === 'register' && (
                        <div className="email-notice">
                          <p><strong>📧 Check your email!</strong></p>
                          <p>We've sent you a confirmation link. Click it to verify your account, then come back to sign in.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <form onSubmit={e => { e.preventDefault(); handleAuth(); }} className="auth-form-content">
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <div className="auth-tabs">
                    <button
                      type="button"
                      className={`tab-btn ${action === 'login' ? 'active' : ''}`}
                      onClick={() => setAction('login')}
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      className={`tab-btn ${action === 'register' ? 'active' : ''}`}
                      onClick={() => setAction('register')}
                    >
                      Create Account
                    </button>
                  </div>
                  <button type="submit" className="auth-submit-btn" disabled={loading}>
                    {loading ? 'Processing...' : action === 'login' ? 'Sign In' : 'Create Account'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </section>
      </div>
      <style jsx>{`
        .auth-test-page {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem 0;
        }
        .hero {
          text-align: center;
          margin-bottom: 3rem;
        }
        .hero-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          background: linear-gradient(90deg, #8a7bff 0%, #c194ff 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtitle {
          font-size: 1.2rem;
          color: var(--text-secondary);
          margin: 0;
        }
        .auth-section {
          margin-bottom: 2rem;
        }
        .auth-card {
          background: var(--dark-secondary);
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .auth-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .auth-header h2 {
          color: var(--text-primary);
          margin: 0;
          font-size: 1.5rem;
        }
        .loading-spinner {
          color: var(--text-secondary);
          font-style: italic;
        }
        .auth-success {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: rgba(40, 167, 69, 0.1);
          border-radius: 8px;
          border: 1px solid rgba(40, 167, 69, 0.3);
        }
        .success-icon {
          font-size: 2rem;
        }
        .user-info h3 {
          color: var(--text-primary);
          margin: 0 0 0.5rem 0;
        }
        .user-email {
          color: var(--text-primary);
          font-weight: 600;
          margin: 0 0 0.25rem 0;
        }
        .user-id {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin: 0;
        }
        .auth-form {
          space-y: 1rem;
        }
        .error-message, .success-message {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
        }
        .error-message {
          background: rgba(255, 59, 48, 0.1);
          border: 1px solid rgba(255, 59, 48, 0.3);
        }
        .success-message {
          background: rgba(40, 167, 69, 0.1);
          border: 1px solid rgba(40, 167, 69, 0.3);
        }
        .error-icon, .success-icon {
          font-size: 1.5rem;
        }
        .error-content h4, .message-content h4 {
          color: var(--text-primary);
          margin: 0 0 0.5rem 0;
        }
        .error-content p, .message-content p {
          color: var(--text-secondary);
          margin: 0;
        }
        .email-notice {
          margin-top: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 6px;
        }
        .email-notice p {
          margin: 0 0 0.5rem 0;
        }
        .auth-form-content {
          space-y: 1.5rem;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-group label {
          display: block;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          font-weight: 600;
        }
        .form-group input {
          width: 100%;
          padding: 0.75rem;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
          font-size: 1rem;
        }
        .form-group input:focus {
          outline: none;
          border-color: var(--purple-primary);
          box-shadow: 0 0 0 2px rgba(138, 123, 255, 0.2);
        }
        .auth-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .tab-btn {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 1px solid var(--purple-primary);
          background: transparent;
          color: var(--text-primary);
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }
        .tab-btn.active {
          background: var(--purple-primary);
          color: white;
        }
        .auth-submit-btn {
          width: 100%;
          padding: 1rem;
          background: var(--purple-primary);
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .auth-submit-btn:hover:not(:disabled) {
          background: #7a6bff;
        }
        .auth-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        @media (max-width: 768px) {
          .auth-test-page {
            padding: 1rem;
          }
          .hero-title {
            font-size: 2rem;
          }
          .auth-card {
            padding: 1.5rem;
          }
          .auth-success {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
} 