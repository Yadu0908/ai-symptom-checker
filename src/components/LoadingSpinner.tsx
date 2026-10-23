import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6">
      {/* Outer ring */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-2 border-cyan-500/10" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 spinner" />
        <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-blue-400 spinner" style={{ animationDuration: '0.8s', animationDirection: 'reverse' }} />
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
          <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
          </svg>
        </div>
      </div>

      {/* Text with shimmer skeleton below */}
      <div className="text-center">
        <p className="text-slate-300 font-semibold text-lg mb-1">Analyzing your symptoms…</p>
        <p className="text-slate-500 text-sm">Gemini AI is processing your information</p>
      </div>

      {/* Skeleton lines */}
      <div className="w-full max-w-md space-y-3">
        <div className="h-4 rounded-full shimmer" />
        <div className="h-4 rounded-full shimmer w-4/5 mx-auto" />
        <div className="h-4 rounded-full shimmer w-3/5 mx-auto" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
