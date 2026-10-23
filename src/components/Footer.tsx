import React from 'react';

interface FooterProps {
  onNavigate: (page: 'home' | 'checker') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-white/5 bg-[#080f1e]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6M12 3C7.029 3 3 7.029 3 12s4.029 9 9 9 9-4.029 9-9-4.029-9-9-9z" />
              </svg>
            </div>
            <span className="font-bold text-sm gradient-text">MediScan AI</span>
          </button>

          {/* Links */}
          <div className="flex items-center gap-6 text-xs text-slate-600">
            <button onClick={() => onNavigate('home')} className="hover:text-slate-400 transition-colors">Home</button>
            <button onClick={() => onNavigate('checker')} className="hover:text-slate-400 transition-colors">Symptom Checker</button>
            <button
              onClick={() => {
                onNavigate('home');
                setTimeout(() => document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }}
              className="hover:text-slate-400 transition-colors"
            >
              About
            </button>
          </div>

          {/* Copyright */}
          <p className="text-xs text-slate-700">
            © {new Date().getFullYear()} MediScan AI · Not a medical device
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
