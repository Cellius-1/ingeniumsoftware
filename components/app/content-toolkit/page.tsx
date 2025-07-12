'use client';
import { useState } from 'react';
import SocialMediaTemplates from '@/components/content/SocialMediaTemplates';
import PitchDeckBuilder from '@/components/content/PitchDeckBuilder';
import BrandingKit from '@/components/content/BrandingKit';

export default function ContentToolkit() {
  const [activeTab, setActiveTab] = useState('social');

  return (
    <section className="container">
      <h1 style={{ color: 'var(--text-primary)', marginBottom: '2rem', textAlign: 'center' }}>
        Content Creation Toolkit
      </h1>
      
      {/* Tab Navigation */}
      <div style={{ 
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)', 
        marginBottom: '2rem',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <nav style={{ display: 'flex', gap: '2rem' }}>
          {['social', 'pitch', 'branding'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
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
                  (e.target as HTMLElement).style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab) {
                  (e.target as HTMLElement).style.color = 'var(--text-secondary)';
                }
              }}
            >
              {tab === 'social' ? 'Social Media' : tab === 'pitch' ? 'Pitch Deck' : 'Branding'}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'social' && <SocialMediaTemplates />}
        {activeTab === 'pitch' && <PitchDeckBuilder />}
        {activeTab === 'branding' && <BrandingKit />}
      </div>
    </section>
  );
}
