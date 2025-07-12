'use client';
import { useState } from 'react';
import TaskManager from '@/components/business-hub/TaskManager';
import Calendar from '@/components/business-hub/Calendar';
import ProgressChecker from '@/components/business-hub/ProgressChecker';

export default function BusinessHub() {
  const [activeTab, setActiveTab] = useState('tasks');

  const handleTabHover = (tab: string, isHover: boolean) => {
    // Handle hover state if needed
  };

  return (
    <section className="container">
      <h1 style={{ color: 'var(--text-primary)', marginBottom: '2rem', textAlign: 'center' }}>
        Business Management Hub
      </h1>
      
      {/* Tab Navigation */}
      <div style={{ 
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)', 
        marginBottom: '2rem',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <nav style={{ display: 'flex', gap: '2rem' }}>
          {['tasks', 'calendar', 'progress'].map((tab) => (
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
            >
              {tab === 'tasks' ? 'Task Manager' : tab === 'calendar' ? 'Calendar' : 'Progress Checker'}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'tasks' && <TaskManager />}
        {activeTab === 'calendar' && <Calendar />}
        {activeTab === 'progress' && <ProgressChecker />}
      </div>
    </section>
  );
}
