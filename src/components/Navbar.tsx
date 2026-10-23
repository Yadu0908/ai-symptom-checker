import React from 'react';

interface NavbarProps {
  currentPage: 'home' | 'checker';
  onNavigate: (page: 'home' | 'checker') => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  return (
    <nav className="navbar">
      <div className="navbar__inner">
        {/* Logo */}
        <button
          id="nav-logo"
          onClick={() => onNavigate('home')}
          className="navbar__logo"
        >
          <div className="navbar__logo-icon">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6M12 3C7.029 3 3 7.029 3 12s4.029 9 9 9 9-4.029 9-9-4.029-9-9-9z" />
            </svg>
          </div>
          <span className="navbar__logo-text">MediScan AI</span>
        </button>

        {/* Links */}
        <div className="navbar__links">
          <button
            id="nav-home"
            onClick={() => onNavigate('home')}
            className={`navbar__link${currentPage === 'home' ? ' navbar__link--active' : ''}`}
          >
            Home
          </button>
          <button
            id="nav-checker"
            onClick={() => onNavigate('checker')}
            className={`navbar__link${currentPage === 'checker' ? ' navbar__link--active' : ''}`}
          >
            Checker
          </button>
          <button
            id="nav-about"
            onClick={() => {
              onNavigate('home');
              setTimeout(() => {
                document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="navbar__link"
          >
            About
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
