/**
 * server.js
 *
 * Express backend for the portfolio chatbot, powered by Google's Gemini API
 * (free tier via Google AI Studio — no credit card required).
 *   POST /api/chat   -> { reply, isFallback, suggestions }
 *   GET  /api/health -> { status: "ok" }
 *
 * The Gemini API key stays server-side only (loaded from .env) and is never
 * sent to the browser. See README.md for setup.
 */

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { GoogleGenAI } = require("@google/genai");

const portfolioContext = require("./data/portfolioContext");
const SYSTEM_PROMPT = require("./data/systemPrompt");
const { FALLBACK_PATTERN, pickGeneral, pickFallbackSuggestions } = require("./data/suggestedQuestions");
const { withRetry } = require("./utils/retry");

const PORT = process.env.PORT || 3001;
const MODEL_NAME = process.env.MODEL_NAME || "gemini-3.6-flash";
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";
const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY_TURNS = 6; // how many prior messages to keep for context

if (!process.env.GEMINI_API_KEY) {
  console.warn(
    "[warn] GEMINI_API_KEY is not set. Requests to /api/chat will fail until it is configured in .env"
  );
}

const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;

const app = express();
app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json({ limit: "10kb" }));

// Basic per-IP rate limiting: 20 messages per minute.
const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many messages — please slow down and try again shortly." },
});

// Full portfolio JSON is appended to the system prompt so the model always
// has ground-truth data available alongside its instructions.
const SYSTEM_INSTRUCTION = `${SYSTEM_PROMPT}\n\nPortfolio data (JSON, authoritative — do not use any fact not present here):\n${JSON.stringify(
  portfolioContext
)}`;

function sanitizeHistory(history) {
  if (!Array.isArray(history)) return [];
  return history
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-MAX_HISTORY_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LENGTH) }));
}

// Gemini uses "model" instead of "assistant" for the bot's turns.
function toGeminiContents(history, latestMessage) {
  const turns = [...history, { role: "user", content: latestMessage }];
  return turns.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
}

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/chat", chatLimiter, async (req, res) => {
  const { message, history } = req.body || {};

  if (typeof message !== "string" || message.trim().length === 0) {
    return res.status(400).json({ error: "`message` is required and must be a non-empty string." });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({ error: `Message too long (max ${MAX_MESSAGE_LENGTH} characters).` });
  }
  if (!ai) {
    return res.status(500).json({ error: "Server is not configured with an API key." });
  }

  const cleanHistory = sanitizeHistory(history);
  const contents = toGeminiContents(cleanHistory, message.trim());

  try {
    const response = await withRetry(() =>
      ai.models.generateContent({
        model: MODEL_NAME,
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          maxOutputTokens: 500,
          temperature: 0.3,
          thinkingConfig: { thinkingLevel: "minimal" },
        },
      })
    );

    const reply = (response.text || "").trim();
    const isFallback = FALLBACK_PATTERN.test(reply);
    const suggestions = isFallback
      ? pickFallbackSuggestions()
      : pickGeneral(cleanHistory.map((m) => m.content));

    res.json({ reply, isFallback, suggestions });
  } catch (err) {
    console.error("Chat completion error:", err?.message || err);
    res.status(502).json({ error: "Sorry, I couldn't generate a response right now. Please try again." });
  }
});

app.listen(PORT, () => {
  console.log(`Portfolio chatbot backend listening on port ${PORT}`);
});
