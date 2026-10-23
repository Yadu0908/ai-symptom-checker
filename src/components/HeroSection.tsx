import React from 'react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  return (
    <section className="relative overflow-hidden bg-dots">
      {/* Ambient background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center relative z-10">
        {/* Badge */}
        <div className="fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          Powered by Google Gemini 3.8 Flash
        </div>

        {/* Hero heading */}
        <h1 className="fade-in-up-delay-1 text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
          <span className="text-white">Your AI</span>{' '}
          <span className="gradient-text">Health</span>
          <br />
          <span className="text-white">Assistant</span>
        </h1>

        <p className="fade-in-up-delay-2 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Describe your symptoms, get instant AI health guidance.{' '}
          <span className="text-cyan-400 font-medium">MediScan AI</span> analyzes
          your symptoms using advanced AI to help you understand what might be happening
          and what steps to take next.
        </p>

        {/* CTA buttons */}
        <div className="fade-in-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button
            id="hero-cta-primary"
            onClick={onGetStarted}
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl text-base shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Check My Symptoms
            <span className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          </button>
          <button
            id="hero-cta-secondary"
            onClick={() => {
              document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 glass border border-cyan-500/20 text-slate-300 hover:text-white font-medium rounded-xl text-base hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all duration-200"
          >
            Learn More
          </button>
        </div>

        {/* Feature cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
                </svg>
              ),
              title: 'AI-Powered Analysis',
              desc: 'Gemini 3.8 Flash processes your symptoms in seconds',
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: 'Risk Assessment',
              desc: 'Color-coded Low / Medium / High risk levels',
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: 'Actionable Guidance',
              desc: 'Clear next steps tailored to your symptoms',
            },
          ].map((feat) => (
            <div
              key={feat.title}
              className="gradient-border p-px"
            >
              <div className="bg-[#0a1628] rounded-2xl p-5 h-full text-center hover:bg-[#0d1f3a] transition-colors duration-200">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mx-auto mb-3">
                  {feat.icon}
                </div>
                <h3 className="font-semibold text-slate-200 mb-1 text-sm">{feat.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-10 flex flex-col items-center gap-2 text-slate-600 text-xs animate-bounce">
          <span>Scroll to explore</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
