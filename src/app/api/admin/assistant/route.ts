import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAdminAuthenticated } from "@/app/actions/admin-auth";
import {
  ADMIN_COPILOT_SYSTEM_INSTRUCTION,
  CODEBASE_REFUSAL_MESSAGE,
  isTechnicalQuery,
  getSmartOfflineAnswer,
} from "@/lib/ai-assistant/knowledge-base";
import {
  getLiveDashboardDataSnapshot,
  formatLiveDashboardSummaryText,
  isSummaryRequest,
} from "@/lib/ai-assistant/dashboard-data";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

interface ChatMessage {
  role: "user" | "model";
  text: string;
}


export async function POST(req: NextRequest) {
  try {
    // 1. Verify admin session security across local and Vercel edge/serverless
    const reqCookie = req.cookies.get("ethiopian_sig_admin")?.value;
    let isAuth = reqCookie === "authenticated";
    if (!isAuth) {
      try {
        const cookieStore = await cookies();
        isAuth = cookieStore.get("ethiopian_sig_admin")?.value === "authenticated" || (await isAdminAuthenticated());
      } catch {
        isAuth = false;
      }
    }

    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized access. Please log in as admin." }, { status: 401 });
    }

    const body = await req.json();
    const { message, history = [], userApiKey } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const trimmedQuery = message.trim();

    // 2. STRICT CUSTOM RULE ENFORCEMENT:
    // If the query asks about the codebase, source code, database schemas, SQL, or internal details,
    // immediately return the polite operational refusal.
    if (isTechnicalQuery(trimmedQuery)) {
      return NextResponse.json({
        answer: CODEBASE_REFUSAL_MESSAGE,
        isOfflineFallback: true,
      });
    }

    // 3. Retrieve real-time live operational snapshot from the database
    const liveSnapshot = await getLiveDashboardDataSnapshot();
    const liveSnapshotText = liveSnapshot ? formatLiveDashboardSummaryText(liveSnapshot) : "";
    const isSummary = isSummaryRequest(trimmedQuery);

    // 4. Determine API Key (Client override or Vercel env)
    const rawApiKey = (userApiKey || process.env.GEMINI_API_KEY || "").trim();
    const isRealGeminiKey = Boolean(
      rawApiKey &&
      rawApiKey.length >= 25 &&
      !rawApiKey.toLowerCase().includes("your_") &&
      !rawApiKey.toLowerCase().includes("placeholder")
    );

    // 5. Construct payload for Google Generative AI
    const formattedContents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    // Append prior history if any (keep last 4 turns for context efficiency)
    const recentHistory = (history as ChatMessage[]).slice(-4);
    for (const h of recentHistory) {
      formattedContents.push({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: h.text }],
      });
    }

    // Append current user query
    formattedContents.push({
      role: "user",
      parts: [{ text: trimmedQuery }],
    });

    // Modern, stable Gemini models (excluding deprecated 1.5/2.0 endpoints)
    const CANDIDATE_MODELS = [
      "gemini-3.5-flash",
      "gemini-3.5-flash-lite",
      "gemini-3.8-flash",
      "gemini-flash-latest",
      "gemini-flash-lite-latest",
    ];

    const dynamicSystemInstruction = liveSnapshotText
      ? `${ADMIN_COPILOT_SYSTEM_INSTRUCTION}

---

### LIVE DASHBOARD DATA SNAPSHOT (Current real-time operational database records):
${liveSnapshotText}

Instructions for live data usage:
- You have full real-time access to the live inquiries, courses, cohort capacity, enrolled students, and service packages listed above.
- When the admin asks for an executive summary, status report, recent activity, list of leads, or what needs attention, synthesize and answer using this exact real-time operational data.
- Highlight urgent action items first (new inquiries, pending student registrations, pending service bookings).
- NEVER reveal internal database column names, SQL, or server action code. Present all information as clear, executive operational business data!`
      : ADMIN_COPILOT_SYSTEM_INSTRUCTION;

    let candidateText: string | null = null;
    let lastError: string | null = null;

    if (isRealGeminiKey) {
      for (const model of CANDIDATE_MODELS) {
        try {
          const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${rawApiKey}`;

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 15000);

          const response = await fetch(geminiEndpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              systemInstruction: {
                parts: [{ text: dynamicSystemInstruction }],
              },
              contents: formattedContents,
              generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 1800,
                topP: 0.95,
              },
            }),
            signal: controller.signal,
          });

          clearTimeout(timeoutId);

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
            console.warn(`Gemini model ${model} error (${response.status}):`, errBody.slice(0, 150));
          }
        } catch (err: any) {
          lastError = err?.message || "Fetch failed";
        }
      }
    }

    // 6. If model successfully responded, return answer
    if (candidateText) {
      return NextResponse.json({
        answer: candidateText,
        isOfflineFallback: false,
      });
    }

    // 7. If the admin asked for a summary and remote model is unreachable, return live snapshot directly
    if (isSummary && liveSnapshotText) {
      return NextResponse.json({
        answer: liveSnapshotText,
        isOfflineFallback: true,
      });
    }

    // 8. Resilient context-aware operational response computed from live database
    let offlineAnswer = getSmartOfflineAnswer(trimmedQuery, liveSnapshot);

    // If API key is missing on Vercel/server, append a helpful operational notice
    if (!isRealGeminiKey) {
      offlineAnswer += `\n\n---\n> 💡 *Notice: Remote AI is operating in live-data mode because no API key is configured. Your answer above was calculated live from your actual database records. To enable conversational AI, add \`GEMINI_API_KEY\` in Vercel Environment Variables or click ⚙️ above.*`;
    }

    return NextResponse.json({
      answer: offlineAnswer,
      isOfflineFallback: true,
    });
  } catch (error: any) {
    console.error("Assistant Route Exception:", error);
    return NextResponse.json(
      {
        answer: "An error occurred while compiling your dashboard report. Please try again.",
        isOfflineFallback: true,
      },
      { status: 200 }
    );
  }
}
