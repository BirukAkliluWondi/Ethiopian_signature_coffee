import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/app/actions/admin-auth";
import { ADMIN_COPILOT_SYSTEM_INSTRUCTION, getSmartOfflineAnswer } from "@/lib/ai-assistant/knowledge-base";

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Verify admin session security
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized access. Please log in as admin." }, { status: 401 });
    }

    const body = await req.json();
    const { message, history = [], userApiKey } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const trimmedQuery = message.trim();

    // 2. Determine API Key (env or client-supplied)
    const apiKey = (process.env.GEMINI_API_KEY || userApiKey || "").trim();

    // 3. If no API key is available, check offline curated knowledge base
    if (!apiKey) {
      const offlineAnswer = getSmartOfflineAnswer(trimmedQuery);
      if (offlineAnswer) {
        return NextResponse.json({
          answer: offlineAnswer,
          isOfflineFallback: true,
          apiKeyMissing: true,
        });
      }

      // Default prompt when no API key is provided and no exact offline topic matched
      return NextResponse.json({
        answer: `### Google Gemini API Key Needed for Open Chat:

I have the entire Ethiopian Signature codebase, database schemas, and admin workflows ready to assist you. To ask freeform questions beyond standard operational topics:

1. Visit **[Google AI Studio (aistudio.google.com)](https://aistudio.google.com)** (100% free, zero credit card required).
2. Click **"Get API key"** and create your free key.
3. Click the **"Settings" (gear icon)** at the top of this drawer and paste your key, or add \`GEMINI_API_KEY="AIzaSy..."\` to your \`.env.local\` file.

In the meantime, you can ask about:
- **"How do I export students to Excel?"**
- **"How do I create a course with custom questions?"**
- **"Where do contact form messages arrive?"**
- **"How do I update the hero photo?"**
- **"Explain the database schema."**`,
        isOfflineFallback: true,
        apiKeyMissing: true,
      });
    }

    // 4. Construct payload for Google Gemini 2.0 Flash
    const formattedContents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    // Append prior history if any (keep last 6 turns for context efficiency)
    const recentHistory = (history as ChatMessage[]).slice(-6);
    for (const h of recentHistory) {
      formattedContents.push({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: h.text }],
      });
    }

    // Append current user message
    formattedContents.push({
      role: "user",
      parts: [{ text: trimmedQuery }],
    });

    const CANDIDATE_MODELS = [
      "gemini-flash-lite-latest",
      "gemini-flash-latest",
      "gemini-2.5-flash",
      "gemini-2.0-flash",
    ];

    let lastError: string | null = null;
    let candidateText: string | null = null;

    for (const model of CANDIDATE_MODELS) {
      try {
        const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        const response = await fetch(geminiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: ADMIN_COPILOT_SYSTEM_INSTRUCTION }],
            },
            contents: formattedContents,
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 2048,
              topP: 0.95,
            },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            candidateText = text;
            break;
          }
        } else {
          const errBody = await response.text();
          lastError = `${response.status} ${response.statusText}`;
          console.warn(`Model ${model} returned error ${response.status}:`, errBody.slice(0, 150));
        }
      } catch (err: any) {
        lastError = err?.message || "Fetch failed";
      }
    }

    if (candidateText) {
      return NextResponse.json({
        answer: candidateText,
        isOfflineFallback: false,
      });
    }

    // If all remote attempts fail or hit quota, serve seamlessly from the rich embedded knowledge base
    const offlineAnswer = getSmartOfflineAnswer(trimmedQuery);
    if (offlineAnswer) {
      return NextResponse.json({
        answer: offlineAnswer,
        isOfflineFallback: true,
      });
    }

    return NextResponse.json(
      {
        error: `Gemini API was unable to generate content (${lastError || "Rate limit or network error"}). Please try again or check Copilot settings.`,
      },
      { status: 502 }
    );
  } catch (error: any) {
    console.error("Assistant Route Handler Exception:", error);
    return NextResponse.json(
      { error: error?.message || "An unexpected error occurred while contacting the assistant." },
      { status: 500 }
    );
  }
}
