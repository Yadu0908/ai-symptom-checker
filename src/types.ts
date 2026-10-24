// Types for Gemini API interaction and app state

export interface SymptomCondition {
  name: string;
  description: string;
  matchPercentage?: number; // e.g., 85% match with symptom profile
}

export type RiskLevel = 'Low' | 'Medium' | 'High';

export type AgeGroup = 'Child (under 12)' | 'Teen (12-17)' | 'Adult (18-64)' | 'Senior (65+)';

export interface AnalysisResult {
  riskLevel: RiskLevel;
  confidenceScore?: number; // e.g., 92% AI analysis confidence
  riskScorePercentage?: number; // e.g., 25% severity score
  possibleConditions: SymptomCondition[];
  recommendedAction: string;
  healthTips: string[];
  disclaimer: string;
}

export interface AppState {
  symptoms: string;
  ageGroup: AgeGroup;
  isLoading: boolean;
  result: AnalysisResult | null;
  error: string | null;
  currentPage: 'home' | 'checker';
}

export const QUICK_SYMPTOMS = [
  'Fever',
  'Headache',
  'Cough',
  'Fatigue',
  'Nausea',
  'Chest Pain',
  'Dizziness',
  'Sore Throat',
  'Shortness of Breath',
  'Body Aches',
];

export const AGE_GROUPS: AgeGroup[] = [
  'Child (under 12)',
  'Teen (12-17)',
  'Adult (18-64)',
  'Senior (65+)',
];
