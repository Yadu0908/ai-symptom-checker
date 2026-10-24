import React, { useState, useEffect } from 'react';

const STAGES = [
  { threshold: 24, text: 'Analyzing symptom profile and duration…' },
  { threshold: 50, text: 'Cross-referencing clinical health databases…' },
  { threshold: 74, text: 'Evaluating age factors & condition probabilities…' },
  { threshold: 88, text: 'Formulating triage guidance & clinical next steps…' },
  { threshold: 100, text: 'Finalizing health insights & personal tips…' },
];

const LoadingSpinner: React.FC = () => {
  const [progress, setProgress] = useState(12);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 96) return 96;
        // Smooth progression: starts briskly then gently tapers while awaiting model response
        const increment = prev < 45 ? 6 : prev < 75 ? 4 : 2;
        return Math.min(prev + increment, 96);
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  const currentStage =
    STAGES.find((s) => progress <= s.threshold)?.text ||
    'Finalizing health report…';

  return (
    <div className="spinner-wrap">
      {/* Dual counter-rotating rings with Percentage in Center */}
      <div className="spinner-ring spinner-ring--large">
        <div className="spinner-ring__outer" />
        <div className="spinner-ring__inner" />
        <div className="spinner-ring__center spinner-ring__center--percent">
          <span className="spinner-percent-num">{progress}</span>
          <span className="spinner-percent-sym">%</span>
        </div>
      </div>

      {/* Percentage Progress Bar */}
      <div className="spinner-bar-track">
        <div
          className="spinner-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Percentage Status Text */}
      <div className="spinner-text">
        <h3>
          Analyzing health <span className="spinner-pct-highlight">({progress}%)</span>
        </h3>
        <p className="spinner-stage-text">{currentStage}</p>
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
