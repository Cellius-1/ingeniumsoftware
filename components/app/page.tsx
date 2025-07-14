'use client';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  // Don't render the homepage content if user is signed in (will redirect)
  if (user) {
    return null;
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 style={{ 
            fontSize: '3rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            background: 'linear-gradient(90deg, #8a7bff 0%, #c194ff 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: '1.2',
            position: 'relative',
            zIndex: 1
          }}>
            Empower Your Business with InGenium
          </h1>
          <p className="slide-up delay-1">
            The all-in-one platform for business management, funding discovery, and content creation. 
            Built specifically for entrepreneurs and small businesses ready to scale.
          </p>
          <div className="slide-up delay-2">
            <Link href="/dashboard" className="cta-button">
              Get Started Free
            </Link>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="features-section">
        <div className="container">
          <h2 className="fade-in">Everything You Need to Grow</h2>
          <p className="section-subtitle fade-in delay-1">
            Streamline your business operations with our comprehensive suite of tools
          </p>
          
          <div className="features-grid">
            <div className="feature-card scale-in delay-1">
              <div className="feature-icon">
                <span>📊</span>
              </div>
              <h3>Business Management Hub</h3>
              <p>Task management, calendar integration, and progress tracking all in one place. Stay organized and never miss a deadline.</p>
              <Link href="/business-hub" className="feature-button">
                Explore Hub
              </Link>
            </div>

            <div className="feature-card scale-in delay-2">
              <div className="feature-icon">
                <span>💰</span>
              </div>
              <h3>Financial Aid Tools</h3>
              <p>Discover state-specific grants and funding opportunities tailored to your business. Track applications and maximize your funding potential.</p>
              <Link href="/funding" className="feature-button">
                Find Funding
              </Link>
            </div>

            <div className="feature-card scale-in delay-3">
              <div className="feature-icon">
                <span>🎨</span>
              </div>
              <h3>Content Creation Toolkit</h3>
              <p>Professional templates for social media, pitch decks, and branding materials. Create compelling content without design expertise.</p>
              <Link href="/content-toolkit" className="feature-button">
                Create Content
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="fade-in">How InGenium Works</h2>
          <div className="steps-container">
            <div className="step slide-in-left delay-1">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Set Up Your Profile</h3>
                <p>Tell us about your business, location, and goals. We'll customize your experience and funding recommendations.</p>
              </div>
            </div>

            <div className="step slide-in-right delay-2">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Organize & Plan</h3>
                <p>Use our business hub to manage tasks, schedule activities, and track your progress toward key milestones.</p>
              </div>
            </div>

            <div className="step slide-in-left delay-3">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Discover Funding</h3>
                <p>Access our database of grants and funding opportunities specific to your state and industry.</p>
              </div>
            </div>

            <div className="step slide-in-right delay-4">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Create & Scale</h3>
                <p>Build professional content with our templates and tools. Present your business professionally to investors and customers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2 className="fade-in">What Our Users Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial scale-in delay-1">
              <p>"InGenium helped me find $25,000 in grants I never knew existed. The state-specific search saved me countless hours of research."</p>
              <div className="testimonial-author">
                <div className="author-avatar">S</div>
                <div>
                  <div className="author-name">Sarah Chen</div>
                  <div className="author-location">Tech Startup, California</div>
                </div>
              </div>
            </div>

            <div className="testimonial scale-in delay-2">
              <p>"The business hub keeps me organized like never before. I can manage everything from one dashboard and actually focus on growing my business."</p>
              <div className="testimonial-author">
                <div className="author-avatar">M</div>
                <div>
                  <div className="author-name">Marcus Johnson</div>
                  <div className="author-location">Consulting Firm, Texas</div>
                </div>
              </div>
            </div>

            <div className="testimonial scale-in delay-3">
              <p>"The content templates are professional and easy to customize. My pitch deck helped secure our first major investor meeting."</p>
              <div className="testimonial-author">
                <div className="author-avatar">A</div>
                <div>
                  <div className="author-name">Aisha Patel</div>
                  <div className="author-location">E-commerce, New York</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <h2 className="fade-in">Ready to Transform Your Business?</h2>
          <p className="fade-in delay-1">
            Join thousands of entrepreneurs who are already using InGenium to streamline their operations and secure funding.
          </p>
          <div className="fade-in delay-2">
            <Link href="/dashboard" className="cta-button">
              Start Your Free Trial
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
