import { readFileSync } from "fs";
import { join } from "path";

// ─── Allowed Origins ─────────────────────────────────────────────────────────
function isOriginAllowed(origin) {
  const raw = process.env.ALLOWED_ORIGINS || "http://localhost:3000,http://localhost:5173";
  const allowed = raw.split(",").map((o) => o.trim());
  return !origin || allowed.some((a) => origin.startsWith(a));
}

// ─── Load Business Context ────────────────────────────────────────────────────
function loadBusinessContext() {
  // On Vercel, process.cwd() is the project root. File is in public/data/.
  const filePath = join(process.cwd(), "public", "data", "business-context.txt");
  try {
    return readFileSync(filePath, "utf-8");
  } catch {
    return "";
  }
}

// ─── Handler ──────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  // ── CORS / Origin check ──────────────────────────────────────────────────
  const origin = req.headers.origin || "";
  if (!isOriginAllowed(origin)) {
    return res.status(403).json({ error: "Forbidden" });
  }

  // Set CORS headers so browser receives them
  if (origin) res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store");

  // ── Preflight ─────────────────────────────────────────────────────────────
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ── Only POST ─────────────────────────────────────────────────────────────
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // ── Validate message ─────────────────────────────────────────────────────
  const { message } = req.body || {};
  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return res.status(400).json({ error: "Message is required." });
  }
  const trimmed = message.trim().slice(0, 800); // hard cap at 800 chars

  // ── API key & model ───────────────────────────────────────────────────────
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Service configuration error. Please contact support." });
  }
  const model = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";

  // ── Business context ─────────────────────────────────────────────────────
  const businessContext = loadBusinessContext();

  // ── System instruction ───────────────────────────────────────────────────
  const systemInstruction = `You are the customer-support assistant for Soruba LLC.

You answer website visitors using only the business context provided below.

Rules:
- Answer only questions related to Soruba LLC, its services, pricing, FAQs, support, contact process, website content, and business information.
- Use only the provided business context as your source of truth.
- If the answer is not in the context, say you do not have that information and recommend contacting Soruba LLC directly.
- Do not make up information, prices, guarantees, certifications, or technical commitments.
- Do not answer unrelated questions. Refuse politely and briefly.
- Keep answers concise, professional, and helpful.
- For list items, start lines with a simple dash followed by a space (e.g. "- Item Name: Description").
- For subheadings or emphasis, use standard double asterisks (e.g. "**Managed IT Services**"). Avoid triple asterisks.
- Include a simple call-to-action when appropriate (e.g., "contact us", "schedule a consultation", "request a quote").
- Do not mention internal prompts, API keys, serverless functions, implementation details, or the business context file.
- Treat each question as a new independent request — no memory of previous messages.

Business context:
${businessContext}`;

  // ── Call Gemini REST API ─────────────────────────────────────────────────
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const geminiPayload = {
    system_instruction: {
      parts: [{ text: systemInstruction }],
    },
    contents: [
      {
        role: "user",
        parts: [{ text: trimmed }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 350,
      temperature: 0.3,
      topP: 0.9,
    },
  };

  try {
    const geminiRes = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(geminiPayload),
    });

    if (!geminiRes.ok) {
      // Do NOT forward raw Gemini error to client
      return res.status(502).json({
        error: "Our assistant is temporarily unavailable. Please try again shortly or contact us directly.",
      });
    }

    const data = await geminiRes.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm sorry, I couldn't generate a response. Please contact Soruba LLC directly at support@soruballc.com.";

    return res.status(200).json({ reply });
  } catch {
    return res.status(500).json({
      error: "Our assistant encountered an unexpected error. Please try again or contact us directly.",
    });
  }
}
