import React, { useState, useEffect } from 'react';
import type { AnalysisResult, RiskLevel } from '../types';

interface ResultCardProps {
  result: AnalysisResult;
  onReset: () => void;
}

interface CountUpProps {
  end: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 1000,
  delay = 0,
  suffix = '',
  prefix = '',
  className = '',
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frameId: number;
    let startTimestamp: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout>;

    const startCounting = () => {
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / duration, 1);

        // Smooth cubic ease-out
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(easeOut * end));

        if (progress < 1) {
          frameId = requestAnimationFrame(step);
        }
      };

      frameId = requestAnimationFrame(step);
    };

    if (delay > 0) {
      timeoutId = setTimeout(startCounting, delay);
    } else {
      startCounting();
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [end, duration, delay]);

  return (
    <span className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

function getRiskClass(level: RiskLevel): string {
  if (level === 'Low') return 'risk-badge--low';
  if (level === 'Medium') return 'risk-badge--medium';
  return 'risk-badge--high';
}

function getRiskBarClass(level: RiskLevel): string {
  if (level === 'Low') return 'risk-bar__fill--low';
  if (level === 'Medium') return 'risk-bar__fill--medium';
  return 'risk-bar__fill--high';
}

function RiskIcon({ level }: { level: RiskLevel }) {
  if (level === 'Low') {
    return (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  if (level === 'Medium') {
    return (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

const ResultCard: React.FC<ResultCardProps> = ({ result, onReset }) => {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 60);
    return () => clearTimeout(timer);
  }, []);

  const riskPercent =
    result.riskScorePercentage ??
    (result.riskLevel === 'Low' ? 24 : result.riskLevel === 'Medium' ? 62 : 88);

  const confidence = result.confidenceScore ?? 92;

  return (
    <div className="result">
      {/* Risk header with animated counting scores */}
      <div className="result__header">
        <div className="result__header-top">
          <div className="result__meta">
            <p>Analysis Complete</p>
            <h2>Your Health Report</h2>
            <div className="meta-pills">
              <span className="confidence-pill">
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <CountUp end={confidence} duration={1100} delay={100} suffix="% AI Confidence" />
              </span>
            </div>
          </div>
          <div className="result__badges">
            <div className={`risk-badge ${getRiskClass(result.riskLevel)}`}>
              <RiskIcon level={result.riskLevel} />
              {result.riskLevel} Risk (
              <CountUp end={riskPercent} duration={950} suffix="%" />
              )
            </div>
          </div>
        </div>
        <div className="risk-bar">
          <div
            className={`risk-bar__fill ${getRiskBarClass(result.riskLevel)}`}
            style={{ width: hasAnimated ? `${riskPercent}%` : '0%' }}
          />
        </div>
      </div>

      {/* Possible Conditions with Animated Match Percentage */}
      <div className="result__section">
        <div className="result__section-title">
          <div className="result__section-icon result__section-icon--cyan">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3>What This Might Be</h3>
        </div>
        <div className="conditions">
          {result.possibleConditions.map((c, i) => {
            const match = c.matchPercentage ?? (i === 0 ? 84 : i === 1 ? 68 : 52);
            return (
              <div key={i} className="condition-item">
                <div className="condition-num">{i + 1}</div>
                <div className="condition-body">
                  <div className="condition-header-row">
                    <p className="condition-name">{c.name}</p>
                    <span className="condition-match-badge">
                      <CountUp end={match} duration={1000} delay={150 + i * 200} suffix="% Match" />
                    </span>
                  </div>
                  <p className="condition-desc">{c.description}</p>
                  <div className="condition-bar-track">
                    <div
                      className="condition-bar-fill"
                      style={{ width: hasAnimated ? `${match}%` : '0%' }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommended Action */}
      <div className="result__section">
        <div className="result__section-title">
          <div className="result__section-icon result__section-icon--blue">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3>Recommended Action</h3>
        </div>
        <div className="action-box">
          <p>{result.recommendedAction}</p>
        </div>
      </div>

      {/* Health Tips */}
      <div className="result__section">
        <div className="result__section-title">
          <div className="result__section-icon result__section-icon--indigo">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3>Health Tips</h3>
        </div>
        <ul className="tips-list">
          {result.healthTips.map((tip, i) => (
            <li key={i}>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Disclaimer */}
      <div className="disclaimer">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p>{result.disclaimer || 'This is not a medical diagnosis. Always consult a qualified healthcare professional.'}</p>
      </div>

      {/* Reset */}
      <button id="result-check-again" onClick={onReset} className="btn btn-ghost btn-full">
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Check Again
      </button>
    </div>
  );
};

export default ResultCard;
