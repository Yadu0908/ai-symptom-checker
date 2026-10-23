import type { AgeGroup, AnalysisResult } from './types';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${API_KEY}`;

function buildPrompt(symptoms: string, ageGroup: AgeGroup): string {
  return `You are MediScan AI, a helpful medical information assistant. A user has described their symptoms and you need to analyze them and provide structured health guidance.

User Details:
- Age Group: ${ageGroup}
- Symptoms: ${symptoms}

Please analyze these symptoms and respond ONLY with a valid JSON object (no markdown, no code blocks, no extra text) in the following exact format:

{
  "riskLevel": "Low",
  "possibleConditions": [
    {
      "name": "Condition Name",
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
2. possibleConditions must contain exactly 2 to 3 items.
3. healthTips must contain exactly 3 to 4 tips.
4. All responses must be age-appropriate for the specified age group.
5. If symptoms suggest a medical emergency (chest pain, difficulty breathing, stroke signs, severe bleeding), always set riskLevel to "High" and recommendedAction to urge immediate emergency services.
6. Do NOT include any markdown formatting, code fences, or extra text outside the JSON.
7. Respond ONLY with the raw JSON object.`;
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

  const response = await fetch(API_URL, {
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
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message =
      (errorData as { error?: { message?: string } }).error?.message ||
      `API error: ${response.status} ${response.statusText}`;
    throw new Error(message);
  }

  const data = await response.json();

  const rawText: string =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

  if (!rawText) {
    throw new Error('No response received from Gemini API.');
  }

  // Strip any accidental markdown code fences
  const cleaned = rawText
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  let parsed: AnalysisResult;
  try {
    parsed = JSON.parse(cleaned) as AnalysisResult;
  } catch {
    throw new Error(
      'Failed to parse AI response. Please try again.'
    );
  }

  // Validate required fields
  if (!parsed.riskLevel || !parsed.possibleConditions || !parsed.recommendedAction) {
    throw new Error('Incomplete response from AI. Please try again.');
  }

  return parsed;
}
