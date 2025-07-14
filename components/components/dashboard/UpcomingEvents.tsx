'use client';

export default function UpcomingEvents() {
  const events = [
    { id: '1', title: 'Team Meeting', time: '10:00 AM', date: '2024-01-15' },
    { id: '2', title: 'Client Presentation', time: '2:00 PM', date: '2024-01-16' },
    { id: '3', title: 'Grant Deadline', time: '11:59 PM', date: '2024-01-20' },
  ];

  return (
    <div style={{
      backgroundColor: 'var(--dark-secondary)',
      padding: '1.5rem',
      borderRadius: 'var(--border-radius)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      marginBottom: '1.5rem'
    }}>
      <h3 style={{ 
        fontSize: '1.1rem', 
        fontWeight: '600', 
        color: 'var(--text-primary)', 
        margin: '0 0 1.5rem 0' 
      }}>
        Upcoming Events
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {events.map((event) => (
          <div key={event.id} style={{
            borderLeft: '4px solid var(--purple-primary)',
            paddingLeft: '1rem'
          }}>
            <p style={{ 
              fontWeight: '500', 
              color: 'var(--text-primary)',
              margin: '0 0 0.25rem 0'
            }}>
              {event.title}
            </p>
            <p style={{ 
              fontSize: '0.85rem', 
              color: 'var(--text-secondary)',
              margin: 0
            }}>
              {event.date} at {event.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
