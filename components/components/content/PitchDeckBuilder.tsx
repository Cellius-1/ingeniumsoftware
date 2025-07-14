'use client';
import { useState } from 'react';

interface Slide {
  id: string;
  title: string;
  type: string;
  content: string;
  order: number;
}

export default function PitchDeckBuilder() {
  const defaultSlides: Slide[] = [
    { id: '1', title: 'Title Slide', type: 'title', content: 'Company Name & Tagline', order: 1 },
    { id: '2', title: 'Problem', type: 'problem', content: 'What problem are you solving?', order: 2 },
    { id: '3', title: 'Solution', type: 'solution', content: 'How do you solve this problem?', order: 3 },
    { id: '4', title: 'Market Size', type: 'market', content: 'How big is the opportunity?', order: 4 },
    { id: '5', title: 'Business Model', type: 'business-model', content: 'How do you make money?', order: 5 },
    { id: '6', title: 'Competition', type: 'competition', content: 'Who are your competitors?', order: 6 },
    { id: '7', title: 'Traction', type: 'traction', content: 'What progress have you made?', order: 7 },
    { id: '8', title: 'Financial Projections', type: 'financials', content: 'What are your projections?', order: 8 },
    { id: '9', title: 'Funding Ask', type: 'funding', content: 'How much do you need?', order: 9 },
    { id: '10', title: 'Team', type: 'team', content: 'Who is behind this?', order: 10 }
  ];

  const [slides, setSlides] = useState<Slide[]>(defaultSlides);
  const [selectedSlide, setSelectedSlide] = useState<Slide | null>(defaultSlides[0]);
  const [slideContent, setSlideContent] = useState(defaultSlides[0].content);

  const updateSlideContent = (content: string) => {
    if (!selectedSlide) return;
    
    setSlideContent(content);
    setSlides(slides.map(slide => 
      slide.id === selectedSlide.id ? { ...slide, content } : slide
    ));
  };

  const selectSlide = (slide: Slide) => {
    setSelectedSlide(slide);
    setSlideContent(slide.content);
  };

  const getSlideIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      'title': '🏷️',
      'problem': '❗',
      'solution': '💡',
      'market': '📊',
      'business-model': '💰',
      'competition': '⚔️',
      'traction': '📈',
      'financials': '💹',
      'funding': '🎯',
      'team': '👥'
    };
    return icons[type] || '📄';
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem' }}>
      {/* Slide Navigation */}
      <div>
        <div style={{
          backgroundColor: 'var(--dark-secondary)',
          padding: '2rem',
          borderRadius: 'var(--border-radius)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '1.5rem' 
          }}>
            <h2 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '1.25rem' }}>
              Slides
            </h2>
            <button style={{
              color: 'var(--purple-primary)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '600'
            }}>
              + Add
            </button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {slides.sort((a, b) => a.order - b.order).map((slide) => (
              <div
                key={slide.id}
                onClick={() => selectSlide(slide)}
                style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: selectedSlide?.id === slide.id 
                    ? '2px solid var(--purple-primary)' 
                    : '2px solid transparent',
                  backgroundColor: selectedSlide?.id === slide.id 
                    ? 'rgba(123, 104, 238, 0.1)' 
                    : 'rgba(255, 255, 255, 0.03)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>{getSlideIcon(slide.type)}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ 
                      color: 'var(--text-primary)', 
                      fontSize: '0.9rem', 
                      fontWeight: '600',
                      margin: 0,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {slide.order}. {slide.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Editor */}
      <div>
        {selectedSlide ? (
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
                <h2 style={{ 
                  color: 'var(--text-primary)', 
                  fontSize: '1.5rem', 
                  margin: '0 0 0.5rem 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span>{getSlideIcon(selectedSlide.type)}</span>
                  <span>{selectedSlide.title}</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                  Slide {selectedSlide.order} of {slides.length}
                </p>
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
                  Preview
                </button>
                <button 
                  className="cta-button"
                  style={{ margin: 0, fontSize: '0.9rem', padding: '0.75rem 1.5rem' }}
                >
                  Save Changes
                </button>
              </div>
            </div>

            {/* Content Editor */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  color: 'var(--text-primary)', 
                  fontWeight: '600', 
                  marginBottom: '0.75rem' 
                }}>
                  Slide Content
                </label>
                <textarea
                  value={slideContent}
                  onChange={(e) => updateSlideContent(e.target.value)}
                  style={{
                    width: '100%',
                    height: '300px',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    lineHeight: 1.5
                  }}
                  placeholder={`Enter content for your ${selectedSlide.title} slide...`}
                />
              </div>

              {/* Slide-specific helpers */}
              <div style={{
                backgroundColor: 'rgba(123, 104, 238, 0.1)',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid rgba(123, 104, 238, 0.2)'
              }}>
                <h3 style={{ color: 'var(--purple-primary)', margin: '0 0 1rem 0', fontSize: '1rem' }}>
                  💡 Tips for {selectedSlide.title}
                </h3>
                <div style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                  {selectedSlide.type === 'problem' && (
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: 1.6 }}>
                      <li>Clearly define the pain point your target customers face</li>
                      <li>Use specific examples or statistics</li>
                      <li>Make it relatable and urgent</li>
                    </ul>
                  )}
                  {selectedSlide.type === 'solution' && (
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: 1.6 }}>
                      <li>Explain your unique approach to solving the problem</li>
                      <li>Highlight what makes you different</li>
                      <li>Keep it simple and clear</li>
                    </ul>
                  )}
                  {selectedSlide.type === 'market' && (
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: 1.6 }}>
                      <li>Include TAM (Total Addressable Market)</li>
                      <li>Show market growth trends</li>
                      <li>Define your target segment</li>
                    </ul>
                  )}
                  {selectedSlide.type === 'funding' && (
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: 1.6 }}>
                      <li>Be specific about the amount needed</li>
                      <li>Explain how you'll use the funds</li>
                      <li>Include expected timeline and milestones</li>
                    </ul>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={() => {
                      const currentIndex = slides.findIndex(s => s.id === selectedSlide.id);
                      if (currentIndex > 0) {
                        selectSlide(slides[currentIndex - 1]);
                      }
                    }}
                    disabled={selectedSlide.order === 1}
                    style={{
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      backgroundColor: 'transparent',
                      color: selectedSlide.order === 1 ? 'var(--text-secondary)' : 'var(--text-primary)',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      cursor: selectedSlide.order === 1 ? 'not-allowed' : 'pointer',
                      fontSize: '0.9rem',
                      opacity: selectedSlide.order === 1 ? 0.5 : 1
                    }}
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() => {
                      const currentIndex = slides.findIndex(s => s.id === selectedSlide.id);
                      if (currentIndex < slides.length - 1) {
                        selectSlide(slides[currentIndex + 1]);
                      }
                    }}
                    disabled={selectedSlide.order === slides.length}
                    style={{
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      backgroundColor: 'transparent',
                      color: selectedSlide.order === slides.length ? 'var(--text-secondary)' : 'var(--text-primary)',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      cursor: selectedSlide.order === slides.length ? 'not-allowed' : 'pointer',
                      fontSize: '0.9rem',
                      opacity: selectedSlide.order === slides.length ? 0.5 : 1
                    }}
                  >
                    Next →
                  </button>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button style={{
                    backgroundColor: '#34c759',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    Export as PDF
                  </button>
                  <button style={{
                    backgroundColor: '#af52de',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    Present
                  </button>
                </div>
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
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Select a slide to start editing
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
