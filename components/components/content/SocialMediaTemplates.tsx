'use client';
import { useState } from 'react';

interface Template {
  id: string;
  name: string;
  platform: string;
  category: string;
  content: string;
  preview: string;
}

export default function SocialMediaTemplates() {
  const templates: Template[] = [
    {
      id: '1',
      name: 'Product Launch',
      platform: 'LinkedIn',
      category: 'Announcement',
      content: '🚀 Excited to announce the launch of [Product Name]! \n\n[Brief description of what makes it special]\n\n✨ Key features:\n• [Feature 1]\n• [Feature 2]\n• [Feature 3]\n\nReady to transform your [industry/area]? Learn more: [link]\n\n#ProductLaunch #Innovation #[YourIndustry]',
      preview: '🚀 Excited to announce the launch of our new platform!'
    },
    {
      id: '2',
      name: 'Success Story',
      platform: 'Instagram',
      category: 'Social Proof',
      content: '✨ CLIENT SUCCESS STORY ✨\n\n"[Client testimonial quote]" - [Client Name], [Client Title]\n\n🎯 Results achieved:\n📈 [Metric 1]\n💰 [Metric 2]\n⏰ [Metric 3]\n\nReady for similar results? DM us to get started!\n\n#SuccessStory #ClientResults #[YourService]',
      preview: '✨ CLIENT SUCCESS STORY ✨'
    },
    {
      id: '3',
      name: 'Behind the Scenes',
      platform: 'Twitter',
      category: 'Engagement',
      content: '👀 Behind the scenes at [Company Name]!\n\n[Description of what you\'re working on/process]\n\nThis is how we [specific action] to deliver [benefit] for our clients.\n\nWhat would you like to see more of? 👇\n\n#BehindTheScenes #TeamWork #[YourIndustry]',
      preview: '👀 Behind the scenes at our company!'
    }
  ];

  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [customizedContent, setCustomizedContent] = useState('');

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setCustomizedContent(template.content);
  };

  const platforms = ['All', 'LinkedIn', 'Instagram', 'Twitter', 'Facebook'];
  const categories = ['All', 'Announcement', 'Social Proof', 'Engagement', 'Educational'];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
      {/* Templates List */}
      <div>
        <div style={{
          backgroundColor: 'var(--dark-secondary)',
          padding: '2rem',
          borderRadius: 'var(--border-radius)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.25rem' }}>
            Templates
          </h2>
          
          {/* Filters */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            <select style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-primary)',
              fontSize: '0.95rem'
            }}>
              {platforms.map(platform => (
                <option key={platform} value={platform}>{platform}</option>
              ))}
            </select>
            <select style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-primary)',
              fontSize: '0.95rem'
            }}>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Template List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => handleTemplateSelect(template)}
                style={{
                  padding: '1.5rem',
                  border: selectedTemplate?.id === template.id 
                    ? '2px solid var(--purple-primary)' 
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backgroundColor: selectedTemplate?.id === template.id 
                    ? 'rgba(123, 104, 238, 0.1)' 
                    : 'rgba(255, 255, 255, 0.02)'
                }}
                onMouseEnter={(e) => {
                  if (selectedTemplate?.id !== template.id) {
                    (e.target as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedTemplate?.id !== template.id) {
                    (e.target as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                  }
                }}
              >
                <h3 style={{ color: 'var(--text-primary)', margin: '0 0 0.5rem 0', fontWeight: '600' }}>
                  {template.name}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0 0 0.75rem 0' }}>
                  {template.platform} • {template.category}
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0, opacity: 0.8 }}>
                  {template.preview}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Template Editor */}
      <div>
        {selectedTemplate ? (
          <div style={{
            backgroundColor: 'var(--dark-secondary)',
            padding: '2rem',
            borderRadius: 'var(--border-radius)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start', 
              marginBottom: '2rem' 
            }}>
              <div>
                <h2 style={{ color: 'var(--text-primary)', margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>
                  {selectedTemplate.name}
                </h2>
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                  {selectedTemplate.platform} • {selectedTemplate.category}
                </p>
              </div>
              <button 
                className="cta-button"
                style={{ margin: 0, fontSize: '0.9rem', padding: '0.6rem 1.2rem' }}
              >
                Save Template
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  color: 'var(--text-primary)', 
                  fontWeight: '600', 
                  marginBottom: '0.75rem' 
                }}>
                  Customize your post:
                </label>
                <textarea
                  value={customizedContent}
                  onChange={(e) => setCustomizedContent(e.target.value)}
                  style={{
                    width: '100%',
                    height: '300px',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    fontFamily: 'monospace',
                    resize: 'vertical',
                    lineHeight: 1.5
                  }}
                  placeholder="Customize your template here..."
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button style={{
                  backgroundColor: '#34c759',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#2d9c4a'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#34c759'}>
                  Copy to Clipboard
                </button>
                
                <button style={{
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}>
                  Preview
                </button>
                
                <button style={{
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}>
                  Schedule Post
                </button>
              </div>

              {/* Character Count */}
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                Character count: {customizedContent.length}
                {selectedTemplate.platform === 'Twitter' && (
                  <span style={{ color: customizedContent.length > 280 ? '#ff3b30' : 'inherit' }}>
                    {' '}(Twitter limit: 280)
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div style={{
            backgroundColor: 'var(--dark-secondary)',
            padding: '3rem',
            borderRadius: 'var(--border-radius)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            textAlign: 'center'
          }}>
            <div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                Select a template to start customizing
              </p>
              <button 
                className="cta-button"
                style={{ margin: 0 }}
              >
                Create Custom Template
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
