'use client';

export default function DashboardStats() {
  const stats = [
    {
      name: 'Active Tasks',
      value: '12',
      change: '+2 from last week',
      changeType: 'positive'
    },
    {
      name: 'Grant Applications',
      value: '5',
      change: '+1 this month',
      changeType: 'positive'
    },
    {
      name: 'Templates Used',
      value: '8',
      change: '+3 this week',
      changeType: 'positive'
    },
    {
      name: 'Goals Completed',
      value: '3',
      change: 'On track',
      changeType: 'neutral'
    }
  ];

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2 style={{ 
        fontSize: '1.25rem', 
        fontWeight: '600', 
        color: 'var(--text-primary)', 
        marginBottom: '1.5rem' 
      }}>
        Overview
      </h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {stats.map((stat) => (
          <div key={stat.name} style={{
            backgroundColor: 'var(--dark-secondary)',
            padding: '1.5rem',
            borderRadius: 'var(--border-radius)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <p style={{ 
                  fontSize: '0.9rem', 
                  fontWeight: '500', 
                  color: 'var(--text-secondary)',
                  margin: '0 0 0.5rem 0'
                }}>
                  {stat.name}
                </p>
                <p style={{ 
                  fontSize: '2rem', 
                  fontWeight: '700', 
                  color: 'var(--text-primary)',
                  margin: '0 0 0.5rem 0'
                }}>
                  {stat.value}
                </p>
                <p style={{ 
                  fontSize: '0.85rem',
                  margin: 0,
                  color: stat.changeType === 'positive' ? '#34c759' : 
                         stat.changeType === 'negative' ? '#ff3b30' : 'var(--text-secondary)'
                }}>
                  {stat.change}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
