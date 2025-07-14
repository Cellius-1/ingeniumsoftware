'use client';
import { useState, useEffect } from 'react';

interface Goal {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  category: 'revenue' | 'customers' | 'products' | 'marketing' | 'operations';
}

export default function ProgressChecker() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Monthly Revenue Target',
      description: 'Reach $10,000 in monthly recurring revenue',
      targetValue: 10000,
      currentValue: 6500,
      unit: '$',
      deadline: '2024-12-31',
      category: 'revenue'
    },
    {
      id: '2',
      title: 'Customer Acquisition',
      description: 'Acquire 100 new customers this quarter',
      targetValue: 100,
      currentValue: 65,
      unit: 'customers',
      deadline: '2024-12-31',
      category: 'customers'
    }
  ]);

  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetValue: 0,
    currentValue: 0,
    unit: '',
    deadline: '',
    category: 'revenue' as const
  });
  const [goalDeadlines, setGoalDeadlines] = useState<{ [id: string]: string }>({});

  useEffect(() => {
    // Convert all deadlines to locale strings on client
    const deadlines: { [id: string]: string } = {};
    goals.forEach(goal => {
      deadlines[goal.id] = new Date(goal.deadline).toLocaleDateString();
    });
    setGoalDeadlines(deadlines);
  }, [goals]);

  const addGoal = () => {
    if (!newGoal.title || !newGoal.targetValue) return;

    const goal: Goal = {
      id: Date.now().toString(),
      ...newGoal
    };

    setGoals([...goals, goal]);
    setNewGoal({
      title: '',
      description: '',
      targetValue: 0,
      currentValue: 0,
      unit: '',
      deadline: '',
      category: 'revenue'
    });
    setShowAddGoal(false);
  };

  const updateProgress = (goalId: string, newValue: number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId ? { ...goal, currentValue: newValue } : goal
    ));
  };

  const deleteGoal = (goalId: string) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const getProgressPercentage = (goal: Goal) => {
    return Math.min((goal.currentValue / goal.targetValue) * 100, 100);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      revenue: '#34c759',
      customers: '#007aff',
      products: '#af52de',
      marketing: '#ff9500',
      operations: '#5ac8fa'
    };
    return colors[category as keyof typeof colors] || '#8e8e93';
  };

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem' 
      }}>
        <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', margin: 0 }}>
          Progress Tracker
        </h2>
        <button
          onClick={() => setShowAddGoal(true)}
          className="cta-button"
          style={{ margin: 0 }}
        >
          Add Goal
        </button>
      </div>

      {/* Goals Overview */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
        gap: '2rem', 
        marginBottom: '2rem' 
      }}>
        {goals.map((goal) => {
          const progressPercentage = getProgressPercentage(goal);
          const isCompleted = progressPercentage >= 100;
          
          return (
            <div key={goal.id} style={{
              backgroundColor: 'var(--dark-secondary)',
              padding: '2rem',
              borderRadius: 'var(--border-radius)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start', 
                marginBottom: '1.5rem' 
              }}>
                <div>
                  <h3 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', margin: '0 0 0.5rem 0' }}>
                    {goal.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                    {goal.description}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{
                    backgroundColor: getCategoryColor(goal.category),
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    textTransform: 'capitalize'
                  }}>
                    {goal.category}
                  </span>
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ff3b30',
                      cursor: 'pointer',
                      fontSize: '1.2rem',
                      padding: '0.25rem'
                    }}
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '0.5rem' 
                }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Progress
                  </span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {progressPercentage.toFixed(1)}%
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div
                    style={{
                      width: `${progressPercentage}%`,
                      height: '100%',
                      backgroundColor: isCompleted ? '#34c759' : '#007aff',
                      borderRadius: '4px',
                      transition: 'width 0.3s ease'
                    }}
                  ></div>
                </div>
              </div>

              {/* Current vs Target */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '1.5rem' 
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: '700' }}>
                    {goal.unit === '$' ? '$' : ''}{goal.currentValue.toLocaleString()}{goal.unit !== '$' ? ` ${goal.unit}` : ''}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Current</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '1.5rem', fontWeight: '700' }}>
                    {goal.unit === '$' ? '$' : ''}{goal.targetValue.toLocaleString()}{goal.unit !== '$' ? ` ${goal.unit}` : ''}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Target</div>
                </div>
              </div>

              {/* Update Progress */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem',
                flexWrap: 'wrap'
              }}>
                <input
                  type="number"
                  value={goal.currentValue}
                  onChange={(e) => updateProgress(goal.id, Number(e.target.value))}
                  style={{
                    flex: 1,
                    minWidth: '120px',
                    padding: '0.5rem',
                    borderRadius: '6px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem'
                  }}
                  min="0"
                />
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                  Deadline: {goalDeadlines[goal.id] || 'Loading...'}
                </span>
              </div>

              {isCompleted && (
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                  <span style={{
                    backgroundColor: '#34c759',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    🎉 Goal Completed!
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Goal Modal */}
      {showAddGoal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'var(--dark-secondary)',
            padding: '2rem',
            borderRadius: 'var(--border-radius)',
            width: '90%',
            maxWidth: '500px',
            margin: '1rem'
          }}>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Add New Goal</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input
                type="text"
                placeholder="Goal title"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: 'var(--text-primary)',
                  fontFamily: 'Inter, sans-serif'
                }}
              />
              
              <textarea
                placeholder="Goal description"
                value={newGoal.description}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: 'var(--text-primary)',
                  fontFamily: 'Inter, sans-serif',
                  minHeight: '80px',
                  resize: 'vertical'
                }}
                rows={2}
              />
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <input
                  type="number"
                  placeholder="Target value"
                  value={newGoal.targetValue || ''}
                  onChange={(e) => setNewGoal({ ...newGoal, targetValue: Number(e.target.value) })}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: 'var(--text-primary)',
                    fontFamily: 'Inter, sans-serif'
                  }}
                />
                
                <input
                  type="text"
                  placeholder="Unit (e.g., $, customers)"
                  value={newGoal.unit}
                  onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: 'var(--text-primary)',
                    fontFamily: 'Inter, sans-serif'
                  }}
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <select
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value as any })}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: 'var(--text-primary)',
                    fontFamily: 'Inter, sans-serif'
                  }}
                >
                  <option value="revenue">Revenue</option>
                  <option value="customers">Customers</option>
                  <option value="products">Products</option>
                  <option value="marketing">Marketing</option>
                  <option value="operations">Operations</option>
                </select>
                
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: 'var(--text-primary)',
                    fontFamily: 'Inter, sans-serif'
                  }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button
                  onClick={addGoal}
                  className="cta-button"
                  style={{ margin: 0, flex: 1 }}
                >
                  Add Goal
                </button>
                <button
                  onClick={() => setShowAddGoal(false)}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backgroundColor: 'transparent',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
