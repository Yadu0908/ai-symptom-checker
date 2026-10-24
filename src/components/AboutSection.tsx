import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about-section" className="about bg-dots">
      <div className="about__blob" />

      <div className="about__container">
        {/* Header */}
        <div className="about__header">
          <div className="section-divider" />
          <h2 className="about__title">
            About <span className="gradient-text">MediScan AI</span>
          </h2>
          <p className="about__subtitle">
            Built to bridge the gap between uncertainty and understanding —
            using the power of Google Gemini AI.
          </p>
        </div>

        {/* Two-column grid */}
        <div className="about__grid">
          {/* Left — Description */}
          <div className="about__desc-card">
            <div className="about__desc-icon">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
              </svg>
            </div>
            <h3>Powered by Google Gemini</h3>
            <p>
              MediScan AI harnesses the capabilities of{' '}
              <span>Google Gemini 3.5 Flash Lite</span> — one of Google's fastest and most responsive
              large language models — with automated model fallback to analyze symptom descriptions and return
              structured health insights in real time.
            </p>
            <p>
              The AI is guided by a carefully crafted, structured prompt that ensures
              every response contains a risk level assessment, possible conditions,
              recommended actions, and relevant health tips — all formatted consistently
              for easy reading.
            </p>
          </div>

          {/* Right — Steps */}
          <div className="about__steps">
            {[
              {
                num: '01',
                cls: 'step-num--1',
                title: 'Describe Your Symptoms',
                desc: 'Type your symptoms in natural language or use quick-pick chips. Include duration, severity, and any relevant details.',
              },
              {
                num: '02',
                cls: 'step-num--2',
                title: 'AI Analysis',
                desc: 'Your symptoms are analyzed by Gemini 3.5 Flash Lite with automated model fallback to guarantee rapid, consistent responses.',
              },
              {
                num: '03',
                cls: 'step-num--3',
                title: 'Structured Results',
                desc: 'Receive a clear risk assessment, possible conditions, recommended next steps, and personalised health tips.',
              },
            ].map((s) => (
              <div key={s.num} className="step-card">
                <div className={`step-num ${s.cls}`}>{s.num}</div>
                <div>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {[
            { icon: '⚡', value: 'Gemini 3.5', label: 'Flash Lite Model' },
            { icon: '⏱', value: '< 3s', label: 'Response Time' },
            { icon: '🛡', value: '3 Levels', label: 'Risk Assessment' },
            { icon: '🔒', value: '100%', label: 'Privacy First' },
          ].map((s) => (
            <div key={s.label} className="stat-card">
              <div className="stat-card__emoji">{s.icon}</div>
              <div className="stat-card__value">{s.value}</div>
              <div className="stat-card__label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="about__disclaimer">
          <div className="about__disclaimer-inner">
            <div className="about__disclaimer-icon">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h4>Medical Disclaimer</h4>
              <p>
                MediScan AI is an informational tool only and{' '}
                <strong>does not provide medical diagnoses</strong>. The information
                provided is for general educational purposes and should not be used as
                a substitute for professional medical advice, diagnosis, or treatment.
                Always consult a qualified healthcare professional for any health concerns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
