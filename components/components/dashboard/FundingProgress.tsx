'use client';

export default function FundingProgress() {
  const applications = [
    { id: '1', name: 'SBIR Grant', amount: '$50,000', status: 'submitted', progress: 75 },
    { id: '2', name: 'State Innovation Fund', amount: '$25,000', status: 'draft', progress: 30 },
    { id: '3', name: 'Small Business Loan', amount: '$100,000', status: 'approved', progress: 100 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return { bg: '#34c759', text: 'white' };
      case 'submitted': return { bg: '#007aff', text: 'white' };
      case 'draft': return { bg: '#ff9500', text: 'white' };
      default: return { bg: '#8e8e93', text: 'white' };
    }
  };

  return (
    <div style={{
      backgroundColor: 'var(--dark-secondary)',
      padding: '1.5rem',
      borderRadius: 'var(--border-radius)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
    }}>
      <h3 style={{ 
        fontSize: '1.1rem', 
        fontWeight: '600', 
        color: 'var(--text-primary)', 
        margin: '0 0 1.5rem 0' 
      }}>
        Funding Progress
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {applications.map((app) => (
          <div key={app.id} style={{
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            padding: '1rem',
            backgroundColor: 'rgba(255, 255, 255, 0.02)'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start', 
              marginBottom: '1rem',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              <div>
                <p style={{ 
                  fontWeight: '500', 
                  color: 'var(--text-primary)',
                  margin: '0 0 0.25rem 0'
                }}>
                  {app.name}
                </p>
                <p style={{ 
                  fontSize: '0.9rem', 
                  color: '#34c759',
                  fontWeight: '600',
                  margin: 0
                }}>
                  {app.amount}
                </p>
              </div>
              <span style={{
                backgroundColor: getStatusColor(app.status).bg,
                color: getStatusColor(app.status).text,
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: '600',
                textTransform: 'capitalize'
              }}>
                {app.status}
              </span>
            </div>
            <div style={{
              width: '100%',
              height: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '4px',
              overflow: 'hidden',
              marginBottom: '0.5rem'
            }}>
              <div
                style={{
                  width: `${app.progress}%`,
                  height: '100%',
                  backgroundColor: '#007aff',
                  borderRadius: '4px',
                  transition: 'width 0.3s ease'
                }}
              ></div>
            </div>
            <p style={{ 
              fontSize: '0.85rem', 
              color: 'var(--text-secondary)',
              margin: 0
            }}>
              {app.progress}% complete
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
