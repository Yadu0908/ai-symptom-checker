import React from 'react';
import type { AnalysisResult, RiskLevel } from '../types';

interface ResultCardProps {
  result: AnalysisResult;
  onReset: () => void;
}

const riskConfig: Record<RiskLevel, {
  className: string;
  icon: React.ReactNode;
  label: string;
  barColor: string;
  bgGlow: string;
}> = {
  Low: {
    className: 'risk-low',
    label: 'Low Risk',
    barColor: 'bg-green-400',
    bgGlow: 'from-green-500/5 to-transparent',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  Medium: {
    className: 'risk-medium',
    label: 'Medium Risk',
    barColor: 'bg-yellow-400',
    bgGlow: 'from-yellow-500/5 to-transparent',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  High: {
    className: 'risk-high',
    label: 'High Risk',
    barColor: 'bg-red-400',
    bgGlow: 'from-red-500/8 to-transparent',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
};

const ResultCard: React.FC<ResultCardProps> = ({ result, onReset }) => {
  const risk = riskConfig[result.riskLevel] ?? riskConfig['Low'];

  return (
    <div className="w-full fade-in-up">
      {/* Header with risk badge */}
      <div className={`gradient-border mb-5`}>
        <div className={`rounded-2xl p-6 bg-gradient-to-br ${risk.bgGlow} bg-[#0a1628]`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">Analysis Complete</p>
              <h2 className="text-2xl font-bold text-white">Your Health Report</h2>
            </div>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${risk.className}`}>
              {risk.icon}
              {risk.label}
            </div>
          </div>
          {/* Risk bar */}
          <div className="mt-4 h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${risk.barColor}`}
              style={{ width: result.riskLevel === 'Low' ? '33%' : result.riskLevel === 'Medium' ? '66%' : '100%' }}
            />
          </div>
        </div>
      </div>

      {/* Possible Conditions */}
      <div className="gradient-border mb-5">
        <div className="rounded-2xl p-6 bg-[#0a1628]">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-base">What This Might Be</h3>
          </div>
          <div className="space-y-3">
            {result.possibleConditions.map((condition, idx) => (
              <div
                key={idx}
                className="flex gap-3 p-4 rounded-xl bg-white/3 border border-white/5 hover:border-cyan-500/20 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div>
                  <p className="text-slate-200 font-semibold text-sm mb-1">{condition.name}</p>
                  <p className="text-slate-500 text-xs leading-relaxed">{condition.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Action */}
      <div className="gradient-border mb-5">
        <div className="rounded-2xl p-6 bg-[#0a1628]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-base">Recommended Action</h3>
          </div>
          <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
            <p className="text-slate-300 text-sm leading-relaxed">{result.recommendedAction}</p>
          </div>
        </div>
      </div>

      {/* Health Tips */}
      <div className="gradient-border mb-5">
        <div className="rounded-2xl p-6 bg-[#0a1628]">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-base">Health Tips</h3>
          </div>
          <ul className="space-y-2">
            {result.healthTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-400">
                <svg className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 mb-6">
        <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p className="text-amber-300/80 text-xs leading-relaxed">
          {result.disclaimer || 'This is not a medical diagnosis. Always consult a qualified healthcare professional.'}
        </p>
      </div>

      {/* Reset button */}
      <button
        id="result-check-again"
        onClick={onReset}
        className="w-full py-3.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-500/30 hover:bg-cyan-500/5 font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Check Again
      </button>
    </div>
  );
};

export default ResultCard;
