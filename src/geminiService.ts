import type { AgeGroup, AnalysisResult } from './types';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Models ordered by priority: Primary is Gemini 3.5 Flash Lite, followed by fallbacks
const CANDIDATE_MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3.5-flash',
  'gemini-3.1-flash-lite',
  'gemini-flash-lite-latest',
];

// Timeout before switching to the next model (8.5 seconds)
const MODEL_TIMEOUT_MS = 8500;

function buildPrompt(symptoms: string, ageGroup: AgeGroup): string {
  return `You are MediScan AI, a helpful medical information assistant. A user has described their symptoms and you need to analyze them and provide structured health guidance.

User Details:
- Age Group: ${ageGroup}
- Symptoms: ${symptoms}

Please analyze these symptoms and respond ONLY with a valid JSON object (no markdown, no code blocks, no extra text) in the following exact format:

{
  "riskLevel": "Low",
  "confidenceScore": 88,
  "riskScorePercentage": 28,
  "possibleConditions": [
    {
      "name": "Condition Name",
      "matchPercentage": 82,
      "description": "Brief description of the condition and how it relates to the symptoms"
    }
  ],
  "recommendedAction": "Specific action the user should take",
  "healthTips": [
    "Tip 1 relevant to the symptoms",
    "Tip 2 relevant to the symptoms",
    "Tip 3 relevant to the symptoms"
  ],
  "disclaimer": "This is not a medical diagnosis. Always consult a qualified healthcare professional."
}

Rules:
1. riskLevel must be exactly "Low", "Medium", or "High" — nothing else.
2. confidenceScore must be an integer between 60 and 99 representing your analysis confidence percentage.
3. riskScorePercentage must be an integer (Low: 10-35, Medium: 40-70, High: 75-98) representing clinical severity percentage.
4. possibleConditions must contain exactly 2 to 3 items, each with matchPercentage (integer between 30 and 95) indicating diagnostic likelihood.
5. healthTips must contain exactly 3 to 4 tips.
6. All responses must be age-appropriate for the specified age group.
7. If symptoms suggest a medical emergency (chest pain, difficulty breathing, stroke signs, severe bleeding), always set riskLevel to "High", riskScorePercentage >= 85, and recommendedAction to urge immediate emergency services.
8. Do NOT include any markdown formatting, code fences, or extra text outside the JSON.
9. Respond ONLY with the raw JSON object.`;
}

async function requestFromModel(
  model: string,
  prompt: string,
  timeoutMs: number
): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.3,
          topP: 0.8,
          maxOutputTokens: 1024,
        },
      }),
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!response.ok) {
      const errBody = await response.json().catch(() => ({}));
      const msg =
        (errBody as { error?: { message?: string } }).error?.message ||
        `HTTP ${response.status} ${response.statusText}`;
      throw new Error(`Model ${model} failed with ${msg}`);
    }

    const data = await response.json();
    const rawText: string =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    if (!rawText) {
      throw new Error(`Model ${model} returned empty response`);
    }

    return rawText;
  } catch (err: unknown) {
    clearTimeout(timer);
    if (err instanceof Error && err.name === 'AbortError') {
      throw new Error(`Model ${model} timed out after ${timeoutMs / 1000}s`);
    }
    throw err;
  }
}

export async function analyzeSymptoms(
  symptoms: string,
  ageGroup: AgeGroup
): Promise<AnalysisResult> {
  if (!API_KEY) {
    throw new Error(
      'Gemini API key is missing. Please add VITE_GEMINI_API_KEY to your .env file.'
    );
  }

  const prompt = buildPrompt(symptoms, ageGroup);
  let lastError: Error | null = null;

  // Try primary model (Gemini 3.5 Flash Lite), then automatically fallback if it takes extra time or fails
  for (const model of CANDIDATE_MODELS) {
    try {
      const rawText = await requestFromModel(model, prompt, MODEL_TIMEOUT_MS);

      // Strip any accidental markdown code fences
      const cleaned = rawText
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/\s*```$/i, '')
        .trim();

      const parsed = JSON.parse(cleaned) as AnalysisResult;

      // Validate required fields
      if (
        !parsed.riskLevel ||
        !Array.isArray(parsed.possibleConditions) ||
        !parsed.recommendedAction
      ) {
        throw new Error(`Invalid schema returned from ${model}`);
      }

      // Ensure percentage metrics exist with intelligent defaults if omitted by model
      const defaultRiskPercent =
        parsed.riskLevel === 'Low' ? 24 : parsed.riskLevel === 'Medium' ? 62 : 88;
      const riskScorePercentage =
        typeof parsed.riskScorePercentage === 'number'
          ? Math.min(Math.max(Math.round(parsed.riskScorePercentage), 5), 99)
          : defaultRiskPercent;

      const confidenceScore =
        typeof parsed.confidenceScore === 'number'
          ? Math.min(Math.max(Math.round(parsed.confidenceScore), 50), 99)
          : 91;

      // Normalize condition match percentages
      const possibleConditions = parsed.possibleConditions.map((cond, index) => {
        const fallbackMatch = index === 0 ? 84 : index === 1 ? 68 : 52;
        const matchPercentage =
          typeof cond.matchPercentage === 'number'
            ? Math.min(Math.max(Math.round(cond.matchPercentage), 15), 98)
            : fallbackMatch;
        return {
          ...cond,
          matchPercentage,
        };
      });

      return {
        ...parsed,
        confidenceScore,
        riskScorePercentage,
        possibleConditions,
      };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      lastError = error;
      console.warn(`[MediScan AI] ${model} unavailable or took too long (${error.message}). Switching to next fallback model...`);
    }
  }

  throw new Error(
    lastError?.message ||
      'All AI models were temporarily busy or unreachable. Please try again in a few moments.'
  );
}
