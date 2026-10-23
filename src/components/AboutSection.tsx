import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about-section" className="py-24 relative bg-dots">
      {/* Ambient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="section-divider" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            About <span className="gradient-text">MediScan AI</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-base leading-relaxed text-center">
            Built to bridge the gap between uncertainty and understanding — using the power of Google Gemini AI.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-12">
          {/* Left — Description */}
          <div className="gradient-border">
            <div className="rounded-2xl p-8 bg-[#0a1628] h-full">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Powered by Google Gemini</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                MediScan AI harnesses the capabilities of <span className="text-cyan-400 font-medium">Google Gemini 3.8 Flash</span> — one of the world's most advanced large language models — to analyze symptom descriptions and return structured health insights in real time.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed">
                The AI is guided by a carefully crafted, structured prompt that ensures every response contains a risk level assessment, possible conditions, recommended actions, and relevant health tips — all formatted consistently for easy reading.
              </p>
            </div>
          </div>

          {/* Right — How it works */}
          <div className="space-y-4">
            {[
              {
                step: '01',
                title: 'Describe Your Symptoms',
                desc: 'Type your symptoms in natural language or use quick-pick chips. Include duration, severity, and any relevant details.',
                color: 'from-cyan-500 to-teal-500',
              },
              {
                step: '02',
                title: 'AI Analysis',
                desc: 'Your symptoms are sent to Gemini 3.8 Flash with a structured prompt that ensures consistent, medically-oriented responses.',
                color: 'from-blue-500 to-indigo-500',
              },
              {
                step: '03',
                title: 'Structured Results',
                desc: 'Receive a clear risk assessment, possible conditions, recommended next steps, and personalized health tips.',
                color: 'from-violet-500 to-purple-500',
              },
            ].map((item) => (
              <div key={item.step} className="gradient-border">
                <div className="rounded-2xl p-5 bg-[#0a1628] flex items-start gap-4 hover:bg-[#0d1f3a] transition-colors">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-slate-200 font-semibold text-sm mb-1">{item.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {[
            { value: 'Gemini 3.8', label: 'Flash Model', icon: '⚡' },
            { value: '< 3s', label: 'Response Time', icon: '⏱' },
            { value: '3 Levels', label: 'Risk Assessment', icon: '🛡' },
            { value: '100%', label: 'Privacy First', icon: '🔒' },
          ].map((stat) => (
            <div key={stat.label} className="gradient-border">
              <div className="rounded-2xl p-5 bg-[#0a1628] text-center">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-slate-600 text-xs">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Important disclaimer */}
        <div className="gradient-border">
          <div className="rounded-2xl p-6 bg-[#0a1628] bg-gradient-to-r from-amber-500/5 to-transparent">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h4 className="text-amber-300 font-semibold mb-2">Medical Disclaimer</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  MediScan AI is an informational tool only and <strong className="text-slate-400">does not provide medical diagnoses</strong>. The information provided is for general educational purposes and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for any health concerns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
