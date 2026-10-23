import React from 'react';

interface FooterProps {
  onNavigate: (page: 'home' | 'checker') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* Logo */}
        <button id="footer-logo" onClick={() => onNavigate('home')} className="footer__logo">
          <div className="footer__logo-icon">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6M12 3C7.029 3 3 7.029 3 12s4.029 9 9 9 9-4.029 9-9-4.029-9-9-9z" />
            </svg>
          </div>
          <span className="footer__logo-text">MediScan AI</span>
        </button>

        {/* Links */}
        <div className="footer__links">
          <button id="footer-link-home" onClick={() => onNavigate('home')} className="footer__link">
            Home
          </button>
          <button id="footer-link-checker" onClick={() => onNavigate('checker')} className="footer__link">
            Symptom Checker
          </button>
          <button
            id="footer-link-about"
            onClick={() => {
              onNavigate('home');
              setTimeout(() => {
                document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="footer__link"
          >
            About
          </button>
        </div>

        {/* Copyright */}
        <p className="footer__copy">
          © {new Date().getFullYear()} MediScan AI · Not a medical device
        </p>
      </div>
    </footer>
  );
};

export default Footer;
