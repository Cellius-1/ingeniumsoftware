'use client';
import { useState } from 'react';

interface BrandElement {
  id: string;
  type: 'logo' | 'color' | 'font' | 'template';
  name: string;
  preview: string;
  description: string;
}

export default function BrandingKit() {
  const [activeTab, setActiveTab] = useState<'colors' | 'fonts' | 'logos' | 'templates'>('colors');

  const brandElements: { [key: string]: BrandElement[] } = {
    colors: [
      {
        id: '1',
        type: 'color',
        name: 'Primary Blue',
        preview: '#3B82F6',
        description: 'Main brand color for buttons and accents'
      },
      {
        id: '2',
        type: 'color',
        name: 'Secondary Gray',
        preview: '#6B7280',
        description: 'Text and neutral elements'
      },
      {
        id: '3',
        type: 'color',
        name: 'Success Green',
        preview: '#10B981',
        description: 'Success states and positive actions'
      },
      {
        id: '4',
        type: 'color',
        name: 'Warning Orange',
        preview: '#F59E0B',
        description: 'Warnings and attention-grabbing elements'
      }
    ],
    fonts: [
      {
        id: '5',
        type: 'font',
        name: 'Inter',
        preview: 'The quick brown fox jumps over the lazy dog',
        description: 'Primary font for headings and body text'
      },
      {
        id: '6',
        type: 'font',
        name: 'Roboto Mono',
        preview: 'The quick brown fox jumps over the lazy dog',
        description: 'Monospace font for code and technical content'
      }
    ],
    logos: [
      {
        id: '7',
        type: 'logo',
        name: 'Primary Logo',
        preview: '/logo-placeholder.svg',
        description: 'Main logo for headers and primary branding'
      },
      {
        id: '8',
        type: 'logo',
        name: 'Logo Mark',
        preview: '/logomark-placeholder.svg',
        description: 'Simplified logo for small spaces and favicons'
      }
    ],
    templates: [
      {
        id: '9',
        type: 'template',
        name: 'Business Card',
        preview: 'business-card-preview.png',
        description: 'Professional business card template'
      },
      {
        id: '10',
        type: 'template',
        name: 'Letterhead',
        preview: 'letterhead-preview.png',
        description: 'Company letterhead template'
      }
    ]
  };

  const renderColorPalette = () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
      gap: '2rem' 
    }}>
      {brandElements.colors.map((color) => (
        <div key={color.id} style={{
          backgroundColor: 'var(--dark-secondary)',
          padding: '2rem',
          borderRadius: 'var(--border-radius)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div
              style={{
                width: '4rem',
                height: '4rem',
                borderRadius: '8px',
                backgroundColor: color.preview,
                border: '2px solid rgba(255, 255, 255, 0.1)'
              }}
            ></div>
            <div>
              <h3 style={{ color: 'var(--text-primary)', margin: '0 0 0.25rem 0' }}>{color.name}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontFamily: 'monospace', margin: 0 }}>
                {color.preview}
              </p>
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            {color.description}
          </p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-primary)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
            >
              Copy HEX
            </button>
            <button style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-primary)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
            >
              Copy RGB
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderFonts = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {brandElements.fonts.map((font) => (
        <div key={font.id} style={{
          backgroundColor: 'var(--dark-secondary)',
          padding: '2rem',
          borderRadius: 'var(--border-radius)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: 'var(--text-primary)', margin: '0 0 0.5rem 0' }}>{font.name}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
              {font.description}
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: '0 0 0.5rem 0' }}>
                Heading (24px)
              </p>
              <p style={{ 
                fontSize: '1.5rem', 
                color: 'var(--text-primary)',
                fontFamily: font.name,
                margin: 0
              }}>
                {font.preview}
              </p>
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: '0 0 0.5rem 0' }}>
                Body Text (16px)
              </p>
              <p style={{ 
                fontSize: '1rem', 
                color: 'var(--text-primary)',
                fontFamily: font.name,
                margin: 0
              }}>
                {font.preview}
              </p>
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: '0 0 0.5rem 0' }}>
                Small Text (14px)
              </p>
              <p style={{ 
                fontSize: '0.875rem', 
                color: 'var(--text-primary)',
                fontFamily: font.name,
                margin: 0
              }}>
                {font.preview}
              </p>
            </div>
          </div>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
            <button 
              className="cta-button"
              style={{ margin: 0, fontSize: '0.9rem', padding: '0.6rem 1.2rem' }}
            >
              Download Font
            </button>
            <button style={{
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backgroundColor: 'transparent',
              color: 'var(--text-primary)',
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
              View on Google Fonts
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderLogos = () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
      gap: '2rem' 
    }}>
      {brandElements.logos.map((logo) => (
        <div key={logo.id} style={{
          backgroundColor: 'var(--dark-secondary)',
          padding: '2rem',
          borderRadius: 'var(--border-radius)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            padding: '3rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '120px'
          }}>
            <div style={{
              width: '120px',
              height: '60px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              fontSize: '0.8rem'
            }}>
              Logo Preview
            </div>
          </div>
          <h3 style={{ color: 'var(--text-primary)', margin: '0 0 0.5rem 0' }}>{logo.name}</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            {logo.description}
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              className="cta-button"
              style={{ margin: 0, fontSize: '0.9rem', padding: '0.6rem 1.2rem' }}
            >
              Download PNG
            </button>
            <button style={{
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backgroundColor: 'transparent',
              color: 'var(--text-primary)',
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
              Download SVG
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTemplates = () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
      gap: '2rem' 
    }}>
      {brandElements.templates.map((template) => (
        <div key={template.id} style={{
          backgroundColor: 'var(--dark-secondary)',
          padding: '2rem',
          borderRadius: 'var(--border-radius)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            padding: '2rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            aspectRatio: '3/4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)',
            fontSize: '0.8rem'
          }}>
            {template.name} Preview
          </div>
          <h3 style={{ color: 'var(--text-primary)', margin: '0 0 0.5rem 0' }}>{template.name}</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            {template.description}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button 
              className="cta-button"
              style={{ margin: 0, width: '100%', fontSize: '0.9rem', padding: '0.6rem 1.2rem' }}
            >
              Customize Template
            </button>
            <button style={{
              width: '100%',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backgroundColor: 'transparent',
              color: 'var(--text-primary)',
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
              Download Template
            </button>
          </div>
        </div>
      ))}
    </div>
  );

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
          Brand Kit
        </h2>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          Maintain consistent branding across all your materials with our comprehensive brand kit tools.
        </p>
      </div>

      {/* Tab Navigation */}
      <div style={{ 
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)', 
        marginBottom: '2rem',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <nav style={{ display: 'flex', gap: '2rem' }}>
          {['colors', 'fonts', 'logos', 'templates'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              style={{
                padding: '0.75rem 1rem',
                border: 'none',
                background: 'none',
                color: activeTab === tab ? 'var(--purple-primary)' : 'var(--text-secondary)',
                borderBottom: activeTab === tab ? '2px solid var(--purple-primary)' : '2px solid transparent',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: '500',
                textTransform: 'capitalize',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab) {
                  e.currentTarget.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab) {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'colors' && renderColorPalette()}
        {activeTab === 'fonts' && renderFonts()}
        {activeTab === 'logos' && renderLogos()}
        {activeTab === 'templates' && renderTemplates()}
      </div>
    </div>
  );
}
