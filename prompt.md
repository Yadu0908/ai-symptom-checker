# MediScan AI — Gemini API Prompt Documentation

## Overview

This document details the structured prompt sent to the **Gemini 3.5 Flash Lite** model (with automated fallback support) for symptom analysis. The prompt is carefully engineered to return a consistent, parseable JSON response.

---

## Prompt Template

```
You are MediScan AI, a helpful medical information assistant. A user has described their symptoms and you need to analyze them and provide structured health guidance.

User Details:
- Age Group: {ageGroup}
- Symptoms: {symptoms}

Please analyze these symptoms and respond ONLY with a valid JSON object (no markdown, no code blocks, no extra text) in the following exact format:

{
  "riskLevel": "Low" | "Medium" | "High",
  "possibleConditions": [
    {
      "name": "Condition Name",
      "description": "Brief description of the condition and how it relates to the symptoms"
    }
  ],
  "recommendedAction": "Specific action the user should take (e.g., Rest at home, Schedule a GP visit, Seek urgent care)",
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
5. If symptoms suggest a medical emergency (chest pain, difficulty breathing, stroke signs), always set riskLevel to "High" and recommendedAction to urge immediate emergency services.
6. Do NOT include any markdown formatting, code fences, or extra text outside the JSON.
7. Respond ONLY with the raw JSON object.
```

---

## Variable Substitutions

| Variable | Description | Example Values |
|---|---|---|
| `{ageGroup}` | The selected age category | `Child (under 12)`, `Teen (12-17)`, `Adult (18-64)`, `Senior (65+)` |
| `{symptoms}` | User-provided symptom description | `"I have a fever, headache, and sore throat for 2 days"` |

---

## Response Schema

```typescript
interface GeminiResponse {
  riskLevel: "Low" | "Medium" | "High";
  possibleConditions: Array<{
    name: string;
    description: string;
  }>;
  recommendedAction: string;
  healthTips: string[];
  disclaimer: string;
}
```

---

## Risk Level Guidance

| Risk Level | Color | Typical Scenarios |
|---|---|---|
| **Low** | Green (#22c55e) | Minor cold, mild fatigue, slight headache |
| **Medium** | Yellow (#eab308) | Persistent fever, moderate pain, infections |
| **High** | Red (#ef4444) | Chest pain, difficulty breathing, severe symptoms |

---

## Error Handling

- **Empty input**: Client-side validation prevents submission
- **API failure**: Displays a user-friendly error card with retry option
- **JSON parse error**: Falls back to generic error message
- **Network timeout**: Caught by try/catch, shown in error state

---

## Example Request Payload

```json
{
  "contents": [
    {
      "parts": [
        {
          "text": "You are MediScan AI... [full prompt with substituted values]"
        }
      ]
    }
  ],
  "generationConfig": {
    "temperature": 0.3,
    "topP": 0.8,
    "maxOutputTokens": 1024
  }
}
```

Endpoint: https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key={VITE_GEMINI_API_KEY}

---

## Example Response

```json
{
  "riskLevel": "Low",
  "possibleConditions": [
    {
      "name": "Common Cold",
      "description": "A viral infection of the upper respiratory tract that commonly causes fever, sore throat, and headache lasting 2-7 days."
    },
    {
      "name": "Influenza (Flu)",
      "description": "A more severe viral infection with similar symptoms but typically featuring higher fever and more pronounced fatigue."
    },
    {
      "name": "Strep Throat",
      "description": "A bacterial throat infection that can cause fever and headache alongside throat pain."
    }
  ],
  "recommendedAction": "Rest at home, stay hydrated, and monitor your temperature. Visit a GP if symptoms worsen or persist beyond 5-7 days.",
  "healthTips": [
    "Drink plenty of warm fluids like herbal tea, broth, or water to stay hydrated.",
    "Get adequate rest to help your immune system fight the infection.",
    "Use a humidifier or breathe steam to soothe a sore throat.",
    "Monitor your temperature — seek medical care if it exceeds 39.5 degrees C (103 degrees F)."
  ],
  "disclaimer": "This is not a medical diagnosis. Always consult a qualified healthcare professional."
}
```
