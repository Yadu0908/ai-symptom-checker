import React, { useState } from 'react';
import type { AgeGroup, AnalysisResult } from '../types';
import { QUICK_SYMPTOMS, AGE_GROUPS } from '../types';
import { analyzeSymptoms } from '../geminiService';
import LoadingSpinner from './LoadingSpinner';
import ResultCard from './ResultCard';

const SymptomChecker: React.FC = () => {
  const [symptoms, setSymptoms] = useState('');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('Adult (18-64)');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeChips, setActiveChips] = useState<Set<string>>(new Set());

  const handleChipToggle = (chip: string) => {
    const newActive = new Set(activeChips);
    if (newActive.has(chip)) {
      newActive.delete(chip);
      // Remove from textarea
      const cleaned = symptoms
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.toLowerCase() !== chip.toLowerCase())
        .join(', ');
      setSymptoms(cleaned);
    } else {
      newActive.add(chip);
      setSymptoms((prev) => {
        const trimmed = prev.trim();
        if (!trimmed) return chip;
        if (trimmed.endsWith(',')) return `${trimmed} ${chip}`;
        return `${trimmed}, ${chip}`;
      });
    }
    setActiveChips(newActive);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = symptoms.trim();
    if (!trimmed) {
      setError('Please describe your symptoms before analyzing.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeSymptoms(trimmed, ageGroup);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setSymptoms('');
    setActiveChips(new Set());
    setAgeGroup('Adult (18-64)');
  };

  return (
    <section className="w-full min-h-screen pt-24 pb-16 bg-dots relative">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-72 h-72 bg-cyan-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/8 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Page header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-4">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6M12 3C7.029 3 3 7.029 3 12s4.029 9 9 9 9-4.029 9-9-4.029-9-9-9z" />
            </svg>
            AI Symptom Analysis
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            How are you feeling?
          </h1>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Describe your symptoms in detail for a more accurate AI analysis.
          </p>
        </div>

        {/* Main content */}
        {isLoading ? (
          <div className="gradient-border">
            <div className="rounded-2xl p-6 bg-[#0a1628]">
              <LoadingSpinner />
            </div>
          </div>
        ) : result ? (
          <ResultCard result={result} onReset={handleReset} />
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            {/* Error message */}
            {error && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/25 mb-5 fade-in-up">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Form card */}
            <div className="gradient-border">
              <div className="rounded-2xl p-6 sm:p-8 bg-[#0a1628] space-y-6">

                {/* Age group select */}
                <div>
                  <label htmlFor="age-group-select" className="block text-sm font-medium text-slate-300 mb-2">
                    Age Group
                  </label>
                  <div className="relative">
                    <select
                      id="age-group-select"
                      value={ageGroup}
                      onChange={(e) => setAgeGroup(e.target.value as AgeGroup)}
                      className="w-full appearance-none bg-white/5 border border-white/10 text-slate-200 text-sm rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-200 cursor-pointer hover:border-cyan-500/30"
                    >
                      {AGE_GROUPS.map((group) => (
                        <option key={group} value={group} className="bg-[#0f172a] text-slate-200">
                          {group}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Quick symptom chips */}
                <div>
                  <p className="text-sm font-medium text-slate-300 mb-2">
                    Quick-pick symptoms{' '}
                    <span className="text-slate-600 font-normal">(tap to add)</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_SYMPTOMS.map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        id={`chip-${chip.toLowerCase().replace(/\s/g, '-')}`}
                        onClick={() => handleChipToggle(chip)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                          activeChips.has(chip)
                            ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-sm shadow-cyan-500/20'
                            : 'bg-white/5 border-white/10 text-slate-400 hover:border-cyan-500/30 hover:text-slate-200 hover:bg-white/10'
                        }`}
                      >
                        {activeChips.has(chip) && (
                          <span className="mr-1">✓</span>
                        )}
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Symptoms textarea */}
                <div>
                  <label htmlFor="symptoms-textarea" className="block text-sm font-medium text-slate-300 mb-2">
                    Describe your symptoms
                    <span className="text-red-400 ml-1">*</span>
                  </label>
                  <textarea
                    id="symptoms-textarea"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="e.g., I have a fever, headache and sore throat for 2 days. I also feel tired and my body aches..."
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 text-slate-200 text-sm rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-200 placeholder:text-slate-600 hover:border-white/20"
                  />
                  <p className="mt-1.5 text-xs text-slate-600">
                    {symptoms.length} characters · Be as detailed as possible for better results
                  </p>
                </div>

                {/* Submit button */}
                <button
                  id="analyze-symptoms-btn"
                  type="submit"
                  disabled={!symptoms.trim()}
                  className="group w-full py-4 rounded-xl font-semibold text-sm text-white relative overflow-hidden transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
                  </svg>
                  Analyze Symptoms
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity rounded-xl" />
                </button>

                {/* Privacy note */}
                <p className="text-center text-xs text-slate-600">
                  <svg className="w-3 h-3 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Your data is sent directly to Gemini API and not stored anywhere.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default SymptomChecker;
