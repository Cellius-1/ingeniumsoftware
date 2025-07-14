'use client';

export default function RecentTasks() {
  const tasks = [
    { id: '1', title: 'Complete grant application', priority: 'high', dueDate: '2024-01-15' },
    { id: '2', title: 'Update business plan', priority: 'medium', dueDate: '2024-01-18' },
    { id: '3', title: 'Create social media content', priority: 'low', dueDate: '2024-01-20' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ff3b30';
      case 'medium': return '#ff9500';
      case 'low': return '#34c759';
      default: return '#8e8e93';
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
        Recent Tasks
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {tasks.map((task) => (
          <div key={task.id} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.02)'
          }}>
            <div>
              <p style={{ 
                fontWeight: '500', 
                color: 'var(--text-primary)',
                margin: '0 0 0.25rem 0'
              }}>
                {task.title}
              </p>
              <p style={{ 
                fontSize: '0.85rem', 
                color: 'var(--text-secondary)',
                margin: 0
              }}>
                Due: {task.dueDate}
              </p>
            </div>
            <span style={{
              backgroundColor: getPriorityColor(task.priority),
              color: 'white',
              padding: '0.25rem 0.75rem',
              borderRadius: '12px',
              fontSize: '0.8rem',
              fontWeight: '500',
              textTransform: 'capitalize'
            }}>
              {task.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
