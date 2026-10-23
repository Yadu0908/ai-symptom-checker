import React from 'react';

interface NavbarProps {
  currentPage: 'home' | 'checker';
  onNavigate: (page: 'home' | 'checker') => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-cyan-500/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            id="nav-logo"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6M12 3C7.029 3 3 7.029 3 12s4.029 9 9 9 9-4.029 9-9-4.029-9-9-9z" />
              </svg>
            </div>
            <span className="font-bold text-lg gradient-text">MediScan AI</span>
          </button>

          {/* Nav Links */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              id="nav-home"
              onClick={() => onNavigate('home')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentPage === 'home'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              Home
            </button>
            <button
              id="nav-checker"
              onClick={() => onNavigate('checker')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentPage === 'checker'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              Symptom Checker
            </button>
            <button
              id="nav-about"
              onClick={() => {
                onNavigate('home');
                setTimeout(() => {
                  document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-white/5 transition-all duration-200"
            >
              About
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
