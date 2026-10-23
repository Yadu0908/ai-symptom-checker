import React from 'react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  return (
    <section className="hero bg-dots">
      {/* Ambient blobs */}
      <div className="hero__blobs">
        <div className="hero__blob hero__blob--1" />
        <div className="hero__blob hero__blob--2" />
        <div className="hero__blob hero__blob--3" />
      </div>

      {/* Content */}
      <div className="hero__content">
        {/* Badge */}
        <div className="hero__badge fade-in-up">
          <span className="hero__badge-dot" />
          Powered by Google Gemini 3.8 Flash
        </div>

        {/* Heading */}
        <h1 className="hero__title fade-in-up-1">
          Your AI{' '}
          <span className="gradient-text">Health</span>
          <br />
          Assistant
        </h1>

        {/* Tagline */}
        <p className="hero__tagline fade-in-up-2">
          Describe your symptoms, get instant AI health guidance.{' '}
          <span>MediScan AI</span> analyzes your symptoms using advanced AI
          to help you understand what might be happening and what steps to take next.
        </p>

        {/* CTA Buttons */}
        <div className="hero__cta fade-in-up-3">
          <button
            id="hero-cta-primary"
            onClick={onGetStarted}
            className="btn btn-primary"
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Check My Symptoms
          </button>
          <button
            id="hero-cta-secondary"
            onClick={() =>
              document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="btn btn-secondary"
          >
            Learn More
          </button>
        </div>

        {/* Feature cards */}
        <div className="hero__cards fade-in-up-3">
          {[
            {
              icon: (
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
                </svg>
              ),
              title: 'AI-Powered Analysis',
              desc: 'Gemini 3.8 Flash processes your symptoms in seconds',
            },
            {
              icon: (
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: 'Risk Assessment',
              desc: 'Color-coded Low / Medium / High risk levels',
            },
            {
              icon: (
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: 'Actionable Guidance',
              desc: 'Clear next steps tailored to your symptoms',
            },
          ].map((feat) => (
            <div key={feat.title} className="feature-card">
              <div className="feature-card__icon">{feat.icon}</div>
              <h3 className="feature-card__title">{feat.title}</h3>
              <p className="feature-card__desc">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hero__scroll">
        <span>Scroll</span>
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
