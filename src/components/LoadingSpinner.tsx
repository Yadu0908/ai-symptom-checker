import React, { useState, useEffect } from 'react';

const STAGES = [
  { threshold: 22, text: 'Reading symptoms and age profile…' },
  { threshold: 46, text: 'Scanning medical diagnostic patterns…' },
  { threshold: 70, text: 'Evaluating condition probabilities & risk levels…' },
  { threshold: 88, text: 'Formulating triage guidance & clinical next steps…' },
  { threshold: 100, text: 'Finalizing health insights & personalized tips…' },
];

const RADIUS = 64;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ~402.12

const LoadingSpinner: React.FC = () => {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 96) return 96;
        const step = prev < 40 ? 6 : prev < 72 ? 4 : 2;
        return Math.min(prev + step, 96);
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  const strokeDashoffset = CIRCUMFERENCE - (CIRCUMFERENCE * progress) / 100;
  const currentStage =
    STAGES.find((s) => progress <= s.threshold)?.text ||
    'Finalizing health report…';

  return (
    <div className="spinner-wrap">
      {/* Precision Circular SVG Gauge */}
      <div className="spinner-radial">
        <svg
          className="spinner-radial__svg"
          viewBox="0 0 160 160"
          width="160"
          height="160"
        >
          <defs>
            <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <filter id="spinnerGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer subtle decorative ring */}
          <circle
            cx="80"
            cy="80"
            r="74"
            fill="none"
            stroke="rgba(6, 182, 212, 0.12)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            className="spinner-spin-slow"
          />

          {/* Background track circle */}
          <circle
            cx="80"
            cy="80"
            r={RADIUS}
            fill="none"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="8"
          />

          {/* Active progress circle */}
          <circle
            cx="80"
            cy="80"
            r={RADIUS}
            fill="none"
            stroke="url(#spinnerGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            filter="url(#spinnerGlow)"
            style={{
              transition: 'stroke-dashoffset 0.22s ease-out',
            }}
          />
        </svg>

        {/* Perfectly centered percentage content */}
        <div className="spinner-radial__center">
          <div className="spinner-percent-val">
            <span className="spinner-percent-num">{progress}</span>
            <span className="spinner-percent-unit">%</span>
          </div>
          <div className="spinner-scan-badge">
            <span className="spinner-scan-dot" />
            ANALYZING
          </div>
        </div>
      </div>

      {/* Progress track */}
      <div className="spinner-bar-track">
        <div
          className="spinner-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Status Heading and Stage */}
      <div className="spinner-text">
        <h3>Analyzing Health Profile</h3>
        <p className="spinner-stage-text">{currentStage}</p>
      </div>

      {/* Futuristic scanning wave lines */}
      <div className="skeleton-lines">
        <div className="skeleton-line skeleton-line--w4" />
        <div className="skeleton-line skeleton-line--w3" />
        <div className="skeleton-line skeleton-line--w2" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
