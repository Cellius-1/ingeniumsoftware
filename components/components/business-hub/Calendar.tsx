'use client';
import { useState, useEffect } from 'react';

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  description: string;
}

export default function BusinessCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [today, setToday] = useState<Date | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    time: '',
    description: ''
  });

  useEffect(() => {
    setSelectedDate(new Date());
    setToday(new Date());
  }, []);

  const addEvent = () => {
    if (!newEvent.title || !newEvent.time || !selectedDate) return;

    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title,
      date: selectedDate,
      time: newEvent.time,
      description: newEvent.description
    };

    setEvents([...events, event]);
    setNewEvent({ title: '', time: '', description: '' });
    setShowAddEvent(false);
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const deleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  // Simple calendar component
  const renderCalendar = () => {
    if (!selectedDate || !today) return null;
    const currentMonth = selectedDate.getMonth();
    const currentYear = selectedDate.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} style={{ height: '40px' }}></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isSelected = date.toDateString() === selectedDate.toDateString();
      const hasEvents = getEventsForDate(date).length > 0;
      const isToday = date.toDateString() === today.toDateString();
      days.push(
        <div
          key={day}
          style={{
            height: '40px',
            backgroundColor: isSelected ? 'var(--purple-primary)' : isToday ? 'var(--purple-light)' : 'transparent',
            color: isSelected ? 'white' : 'var(--text-primary)',
            borderRadius: '8px',
            border: hasEvents ? '2px solid var(--purple-primary)' : '1px solid rgba(255,255,255,0.1)',
            cursor: 'pointer',
            fontWeight: isSelected ? 700 : 400
          }}
          onClick={() => setSelectedDate(date)}
        >
          {day}
        </div>
      );
    }
    return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>{days}</div>;
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
      {/* Calendar View */}
      <div style={{
        backgroundColor: 'var(--dark-secondary)',
        padding: '2rem',
        borderRadius: 'var(--border-radius)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.25rem' }}>
          Calendar
        </h2>
        
        {/* Calendar Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <button
            onClick={() => setSelectedDate(new Date(selectedDate?.getFullYear() || 0, selectedDate?.getMonth() || 0 - 1, 1))}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              fontSize: '1.2rem'
            }}
          >
            ←
          </button>
          
          <h3 style={{ color: 'var(--text-primary)', margin: 0 }}>
            {selectedDate?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          
          <button
            onClick={() => setSelectedDate(new Date(selectedDate?.getFullYear() || 0, selectedDate?.getMonth() || 0 + 1, 1))}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              fontSize: '1.2rem'
            }}
          >
            →
          </button>
        </div>
        
        {/* Calendar Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '2px',
          marginBottom: '1rem'
        }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} style={{
              textAlign: 'center',
              padding: '0.5rem',
              color: 'var(--text-secondary)',
              fontSize: '0.8rem',
              fontWeight: '600'
            }}>
              {day}
            </div>
          ))}
          {renderCalendar()}
        </div>
        
        <button
          onClick={() => setShowAddEvent(true)}
          className="cta-button"
          style={{ margin: 0, width: '100%' }}
        >
          Add Event
        </button>
      </div>

      {/* Events for Selected Date */}
      <div style={{
        backgroundColor: 'var(--dark-secondary)',
        padding: '2rem',
        borderRadius: 'var(--border-radius)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.25rem' }}>
          Events for {selectedDate?.toLocaleDateString()}
        </h2>
        
        {getEventsForDate(selectedDate || new Date()).length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>No events scheduled for this date.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {getEventsForDate(selectedDate || new Date()).map((event) => (
              <div key={event.id} style={{
                borderLeft: '4px solid var(--purple-primary)',
                paddingLeft: '1rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ color: 'var(--text-primary)', margin: '0 0 0.25rem 0' }}>
                      {event.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>
                      {event.time}
                    </p>
                    {event.description && (
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>
                        {event.description}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteEvent(event.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ff3b30',
                      cursor: 'pointer',
                      fontSize: '0.85rem'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Event Modal */}
      {showAddEvent && (
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
            maxWidth: '400px',
            margin: '1rem'
          }}>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Add Event</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input
                type="text"
                placeholder="Event title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: 'var(--text-primary)'
                }}
              />
              
              <input
                type="time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: 'var(--text-primary)'
                }}
              />
              
              <textarea
                placeholder="Event description (optional)"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: 'var(--text-primary)',
                  minHeight: '80px',
                  fontFamily: 'inherit'
                }}
                rows={3}
              />
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={addEvent}
                  className="cta-button"
                  style={{ margin: 0, flex: 1 }}
                >
                  Add Event
                </button>
                <button
                  onClick={() => setShowAddEvent(false)}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backgroundColor: 'transparent',
                    color: 'var(--text-primary)',
                    cursor: 'pointer'
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
