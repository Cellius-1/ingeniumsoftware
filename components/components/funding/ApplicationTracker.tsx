'use client';
import { useState, useEffect } from 'react';

interface Application {
  id: string;
  grantName: string;
  amount: string;
  status: 'draft' | 'submitted' | 'under-review' | 'approved' | 'rejected';
  submittedDate: string;
  deadline: string;
  notes: string;
}

export default function ApplicationTracker() {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: '1',
      grantName: 'SBIR Phase I Grant',
      amount: '$50,000',
      status: 'submitted',
      submittedDate: '2024-01-10',
      deadline: '2024-02-15',
      notes: 'Waiting for initial review'
    },
    {
      id: '2',
      grantName: 'State Innovation Fund',
      amount: '$25,000',
      status: 'draft',
      submittedDate: '',
      deadline: '2024-03-01',
      notes: 'Need to complete financial projections'
    }
  ]);

  const [appDeadlines, setAppDeadlines] = useState<{ [id: string]: string }>({});
  const [appSubmittedDates, setAppSubmittedDates] = useState<{ [id: string]: string }>({});
  const [appTimeRemaining, setAppTimeRemaining] = useState<{ [id: string]: number }>({});

  useEffect(() => {
    const deadlines: { [id: string]: string } = {};
    const submittedDates: { [id: string]: string } = {};
    const timeRemaining: { [id: string]: number } = {};
    applications.forEach(app => {
      deadlines[app.id] = new Date(app.deadline).toLocaleDateString();
      if (app.submittedDate) {
        submittedDates[app.id] = new Date(app.submittedDate).toLocaleDateString();
      }
      timeRemaining[app.id] = Math.ceil((new Date(app.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    });
    setAppDeadlines(deadlines);
    setAppSubmittedDates(submittedDates);
    setAppTimeRemaining(timeRemaining);
  }, [applications]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return { bg: '#34c759', text: 'white' };
      case 'submitted': return { bg: '#007aff', text: 'white' };
      case 'under-review': return { bg: '#af52de', text: 'white' };
      case 'draft': return { bg: '#ff9500', text: 'white' };
      case 'rejected': return { bg: '#ff3b30', text: 'white' };
      default: return { bg: '#8e8e93', text: 'white' };
    }
  };

  const updateStatus = (id: string, newStatus: Application['status']) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  return (
    <div>
      {/* Header */}
      <div style={{
        backgroundColor: 'var(--dark-secondary)',
        padding: '2rem',
        borderRadius: 'var(--border-radius)',
        marginBottom: '2rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.25rem' }}>
          Grant Application Tracker
        </h2>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          Track the status and progress of all your grant applications in one place.
        </p>
      </div>

      {/* Applications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {applications.map((app) => (
          <div key={app.id} style={{
            backgroundColor: 'var(--dark-secondary)',
            padding: '2rem',
            borderRadius: 'var(--border-radius)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start', 
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <h3 style={{ 
                  color: 'var(--text-primary)', 
                  fontSize: '1.25rem', 
                  margin: '0 0 0.5rem 0' 
                }}>
                  {app.grantName}
                </h3>
                <p style={{ 
                  color: '#34c759', 
                  fontWeight: '600', 
                  fontSize: '1.1rem',
                  margin: 0 
                }}>
                  {app.amount}
                </p>
              </div>
              
              <select
                value={app.status}
                onChange={(e) => updateStatus(app.id, e.target.value as Application['status'])}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  border: 'none',
                  backgroundColor: getStatusColor(app.status).bg,
                  color: getStatusColor(app.status).text,
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                <option value="draft">Draft</option>
                <option value="submitted">Submitted</option>
                <option value="under-review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem', 
              marginBottom: '1.5rem' 
            }}>
              <div>
                <span style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '0.9rem' }}>
                  Deadline:
                </span>
                <p style={{ color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>
                  {appDeadlines[app.id]}
                </p>
              </div>
              
              {appSubmittedDates[app.id] && (
                <div>
                  <span style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '0.9rem' }}>
                    Submitted:
                  </span>
                  <p style={{ color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>
                    {appSubmittedDates[app.id]}
                  </p>
                </div>
              )}
              
              <div>
                <span style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '0.9rem' }}>
                  Time Remaining:
                </span>
                <p style={{ color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>
                  {appTimeRemaining[app.id]} days
                </p>
              </div>
            </div>

            {app.notes && (
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '0.9rem' }}>
                  Notes:
                </span>
                <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 0 0', lineHeight: 1.5 }}>
                  {app.notes}
                </p>
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button 
                className="cta-button"
                style={{ margin: 0, fontSize: '0.9rem', padding: '0.6rem 1.2rem' }}
              >
                View Details
              </button>
              <button style={{
                padding: '0.6rem 1.2rem',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backgroundColor: 'transparent',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'transparent';
              }}>
                Edit Application
              </button>
            </div>
          </div>
        ))}
      </div>

      {applications.length === 0 && (
        <div style={{
          backgroundColor: 'var(--dark-secondary)',
          padding: '3rem',
          borderRadius: 'var(--border-radius)',
          textAlign: 'center',
          color: 'var(--text-secondary)'
        }}>
          <p style={{ marginBottom: '1.5rem' }}>No grant applications tracked yet.</p>
          <button 
            className="cta-button"
            style={{ margin: 0 }}
          >
            Add Your First Application
          </button>
        </div>
      )}
    </div>
  );
}
