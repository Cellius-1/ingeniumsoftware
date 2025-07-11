'use client';
import { useState } from 'react';
import GrantFinder from '@/components/funding/GrantFinder';
import ApplicationTracker from '@/components/funding/ApplicationTracker';
import FundingResources from '@/components/funding/FundingResources';

export default function Funding() {
  const [activeTab, setActiveTab] = useState('finder');

  return (
    <section className="container">
      <h1 style={{ color: 'var(--text-primary)', marginBottom: '2rem', textAlign: 'center' }}>
        Financial Aid Tools
      </h1>
      
      {/* Tab Navigation */}
      <div style={{ 
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)', 
        marginBottom: '2rem',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <nav style={{ display: 'flex', gap: '2rem' }}>
          {['finder', 'tracker', 'resources'].map((tab) => (
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
                  e.target.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab) {
                  e.target.style.color = 'var(--text-secondary)';
                }
              }}
            >
              {tab === 'finder' ? 'Grant Finder' : tab === 'tracker' ? 'Application Tracker' : 'Resources'}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'finder' && <GrantFinder />}
        {activeTab === 'tracker' && <ApplicationTracker />}
        {activeTab === 'resources' && <FundingResources />}
      </div>
    </section>
  );
}
// 'ljRArmVcFLr8mwuw'