import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="spinner-wrap">
      {/* Dual counter-rotating rings */}
      <div className="spinner-ring">
        <div className="spinner-ring__outer" />
        <div className="spinner-ring__inner" />
        <div className="spinner-ring__center">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
          </svg>
        </div>
      </div>

      {/* Text */}
      <div className="spinner-text">
        <h3>Analyzing your symptoms…</h3>
        <p>Gemini AI is processing your information</p>
      </div>

      {/* Skeleton lines */}
      <div className="skeleton-lines">
        <div className="skeleton-line skeleton-line--w4" />
        <div className="skeleton-line skeleton-line--w3" />
        <div className="skeleton-line skeleton-line--w2" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
