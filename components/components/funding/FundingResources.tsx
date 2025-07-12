'use client';

export default function FundingResources() {
  const resources = [
    {
      title: 'Grant Writing Guide',
      description: 'Comprehensive guide to writing successful grant applications',
      type: 'guide',
      link: '#'
    },
    {
      title: 'Business Plan Template',
      description: 'Professional business plan template for funding applications',
      type: 'template',
      link: '#'
    },
    {
      title: 'Financial Projection Calculator',
      description: 'Calculate accurate financial projections for your applications',
      type: 'tool',
      link: '#'
    },
    {
      title: 'Funding Webinar Series',
      description: 'Learn from experts about securing funding for your business',
      type: 'video',
      link: '#'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'guide': return '📖';
      case 'template': return '📄';
      case 'tool': return '🧮';
      case 'video': return '🎥';
      default: return '📋';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'guide': return '#007aff';
      case 'template': return '#34c759';
      case 'tool': return '#ff9500';
      case 'video': return '#af52de';
      default: return '#8e8e93';
    }
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
          Funding Resources
        </h2>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          Access helpful resources, templates, and tools to improve your funding success rate.
        </p>
      </div>

      {/* Resources Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {resources.map((resource, index) => (
          <div key={index} style={{
            backgroundColor: 'var(--dark-secondary)',
            padding: '2rem',
            borderRadius: 'var(--border-radius)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(123, 104, 238, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <span style={{ fontSize: '2rem' }}>{getTypeIcon(resource.type)}</span>
              <div style={{ flex: 1 }}>
                <h3 style={{ 
                  color: 'var(--text-primary)', 
                  fontSize: '1.1rem', 
                  margin: '0 0 1rem 0' 
                }}>
                  {resource.title}
                </h3>
                <p style={{ 
                  color: 'var(--text-secondary)', 
                  marginBottom: '1.5rem',
                  lineHeight: 1.5
                }}>
                  {resource.description}
                </p>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <span style={{
                    backgroundColor: getTypeColor(resource.type),
                    color: 'white',
                    padding: '0.4rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    textTransform: 'capitalize'
                  }}>
                    {resource.type}
                  </span>
                  <a
                    href={resource.link}
                    style={{
                      color: 'var(--purple-primary)',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = 'var(--purple-light)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.color = 'var(--purple-primary)';
                    }}
                  >
                    Access Resource →
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
