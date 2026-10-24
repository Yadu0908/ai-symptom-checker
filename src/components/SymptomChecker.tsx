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
    <section className="checker bg-dots">
      {/* Blobs */}
      <div className="checker__blobs">
        <div className="checker__blob checker__blob--1" />
        <div className="checker__blob checker__blob--2" />
      </div>

      <div className="checker__inner">
        {/* Header - shown only when not loading and no result */}
        {!isLoading && !result && (
          <div className="checker__header">
            <div className="checker__badge">
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6M12 3C7.029 3 3 7.029 3 12s4.029 9 9 9 9-4.029 9-9-4.029-9-9-9z" />
              </svg>
              AI Symptom Analysis
            </div>
            <h1 className="checker__title">How are you feeling?</h1>
            <p className="checker__subtitle">
              Describe your symptoms in detail for a more accurate AI analysis.
            </p>
          </div>
        )}

        {/* Main content */}
        {isLoading ? (
          <div className="checker__loading-wrap">
            <div className="card card--loading">
              <LoadingSpinner />
            </div>
          </div>
        ) : result ? (
          <ResultCard result={result} onReset={handleReset} />
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            {/* Error */}
            {error && (
              <div className="error-banner">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#f87171" strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>{error}</p>
              </div>
            )}

            {/* Form card */}
            <div className="form-card">
              {/* Age group */}
              <div className="form-field">
                <label htmlFor="age-group-select" className="form-label">Age Group</label>
                <div className="form-select-wrap">
                  <select
                    id="age-group-select"
                    value={ageGroup}
                    onChange={(e) => setAgeGroup(e.target.value as AgeGroup)}
                    className="form-select"
                  >
                    {AGE_GROUPS.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                  <div className="form-select-arrow">
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Chips */}
              <div>
                <p className="chips-label">
                  Quick-pick symptoms <span>(tap to add)</span>
                </p>
                <div className="chips-row">
                  {QUICK_SYMPTOMS.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      id={`chip-${chip.toLowerCase().replace(/\s/g, '-')}`}
                      onClick={() => handleChipToggle(chip)}
                      className={`chip${activeChips.has(chip) ? ' chip--active' : ''}`}
                    >
                      {activeChips.has(chip) && '✓ '}
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Textarea */}
              <div className="form-field">
                <label htmlFor="symptoms-textarea" className="form-label">
                  Describe your symptoms
                  <span className="required">*</span>
                </label>
                <textarea
                  id="symptoms-textarea"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="e.g., I have a fever, headache and sore throat for 2 days. I also feel tired and my body aches..."
                  rows={5}
                  className="form-textarea"
                />
                <p className="form-hint">
                  {symptoms.length} characters · Be as detailed as possible for better results
                </p>
              </div>

              {/* Submit */}
              <button
                id="analyze-symptoms-btn"
                type="submit"
                disabled={!symptoms.trim()}
                className="btn btn-primary btn-full"
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
                </svg>
                Analyze Symptoms
              </button>

              {/* Privacy */}
              <p className="privacy-note">
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Your data is sent directly to Gemini API and not stored anywhere.
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default SymptomChecker;
