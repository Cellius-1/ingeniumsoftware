'use client';
import { useState, useEffect } from 'react';
import { grantService } from '@/lib/database';
import type { Database } from '@/lib/supabase';

type Grant = Database['public']['Tables']['grants']['Row'];

export default function GrantFinder() {
  const [grants, setGrants] = useState<Grant[]>([]);
  const [filters, setFilters] = useState({
    state: '',
    category: '',
    amount: '',
    search: ''
  });
  const [loading, setLoading] = useState(false);

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
    'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
    'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
    'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  const categories = [
    'Small Business', 'Technology', 'Agriculture', 'Healthcare',
    'Education', 'Environment', 'Arts & Culture', 'Research & Development'
  ];

  const searchGrants = async () => {
    setLoading(true);
    try {
      const data = await grantService.getGrants({
        state: filters.state || undefined,
        category: filters.category || undefined,
        search: filters.search || undefined
      });
      
      setGrants(data);
    } catch (error) {
      console.error('Error searching grants:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load initial grants
    searchGrants();
  }, []);

  return (
    <div>
      {/* Search Form */}
      <div style={{
        backgroundColor: 'var(--dark-secondary)',
        padding: '2rem',
        borderRadius: 'var(--border-radius)',
        marginBottom: '2rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.25rem' }}>
          Search Grants & Funding
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          <select
            value={filters.state}
            onChange={(e) => setFilters({ ...filters, state: e.target.value })}
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-primary)',
              fontSize: '0.95rem'
            }}
          >
            <option value="">All States</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-primary)',
              fontSize: '0.95rem'
            }}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <select
            value={filters.amount}
            onChange={(e) => setFilters({ ...filters, amount: e.target.value })}
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-primary)',
              fontSize: '0.95rem'
            }}
          >
            <option value="">Any Amount</option>
            <option value="0-10000">$0 - $10,000</option>
            <option value="10000-50000">$10,000 - $50,000</option>
            <option value="50000-100000">$50,000 - $100,000</option>
            <option value="100000+">$100,000+</option>
          </select>
          
          <button
            onClick={searchGrants}
            disabled={loading}
            className="cta-button"
            style={{ margin: 0, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Searching...' : 'Search Grants'}
          </button>
        </div>
        
        <input
          type="text"
          placeholder="Search keywords..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: 'var(--text-primary)',
            fontSize: '0.95rem'
          }}
        />
      </div>

      {/* Results */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {grants.length === 0 && !loading ? (
          <div style={{
            backgroundColor: 'var(--dark-secondary)',
            padding: '3rem',
            borderRadius: 'var(--border-radius)',
            textAlign: 'center',
            color: 'var(--text-secondary)'
          }}>
            <p>No grants found matching your criteria. Try adjusting your filters.</p>
          </div>
        ) : (
          grants.map((grant) => (
            <div key={grant.id} style={{
              backgroundColor: 'var(--dark-secondary)',
              padding: '2rem',
              borderRadius: 'var(--border-radius)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s ease'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start', 
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div style={{ flex: 1, minWidth: '300px' }}>
                  <h3 style={{ 
                    color: 'var(--text-primary)', 
                    fontSize: '1.25rem', 
                    margin: '0 0 0.75rem 0',
                    fontWeight: '600'
                  }}>
                    {grant.title}
                  </h3>
                  <p style={{ 
                    color: 'var(--text-secondary)', 
                    lineHeight: 1.6,
                    margin: '0 0 1rem 0'
                  }}>
                    {grant.description}
                  </p>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'flex-end',
                  gap: '0.5rem'
                }}>
                  <span style={{
                    backgroundColor: 'var(--purple-primary)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    {grant.amount}
                  </span>
                  
                  <span style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'var(--text-primary)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.8rem'
                  }}>
                    {grant.category}
                  </span>
                </div>
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      📍 {grant.state}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      ⏰ Deadline: {new Date(grant.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button style={{
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backgroundColor: 'transparent',
                    color: 'var(--text-primary)',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'all 0.3s ease'
                  }}>
                    Save Grant
                  </button>
                  
                  {grant.url && (
                    <a
                      href={grant.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta-button"
                      style={{ margin: 0, fontSize: '0.9rem', padding: '0.75rem 1.5rem' }}
                    >
                      Apply Now
                    </a>
                  )}
                </div>
              </div>
              
              {grant.eligibility && grant.eligibility.length > 0 && (
                <div style={{ marginTop: '1.5rem' }}>
                  <h4 style={{ 
                    color: 'var(--text-primary)', 
                    fontSize: '1rem', 
                    margin: '0 0 0.75rem 0',
                    fontWeight: '600'
                  }}>
                    Eligibility Requirements:
                  </h4>
                  <ul style={{ 
                    margin: 0, 
                    paddingLeft: '1.5rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6
                  }}>
                    {grant.eligibility.map((requirement, index) => (
                      <li key={index} style={{ marginBottom: '0.25rem' }}>
                        {requirement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
