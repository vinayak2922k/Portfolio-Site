# Portfolio Chatbot — Backend

Express API that answers questions about Vinayak Sharma's portfolio, grounded
strictly in `data/portfolioContext.js`. Powered by **Google's Gemini API**,
which has a genuinely free tier — no credit card required.

## Setup

```bash
cd backend
npm install
cp .env.example .env
```

Get a free API key at **https://aistudio.google.com/apikey** (sign in with
any Google account — no billing needed), then paste it into `.env` as
`GEMINI_API_KEY`.

```bash
npm start          # production
npm run dev        # auto-restarts on file changes (Node 18.19+/20+)
```

The server listens on `PORT` (default `3001`).

## Endpoints

### `GET /api/health`
Returns `{ "status": "ok" }`. Useful for uptime checks / load balancer probes.

### `POST /api/chat`
```json
{
  "message": "What projects have you built?",
  "history": [
    { "role": "user", "content": "Hi" },
    { "role": "assistant", "content": "Hi! I'm Vinayak's portfolio assistant..." }
  ]
}
```
`history` is optional — pass the last few turns so the assistant can handle
follow-ups ("what about the second one?"). Only the last 6 messages are used.

Response:
```json
{
  "reply": "I've built two projects: a Data Science Report using Python, Pandas, NumPy and Matplotlib, and a Predicting Housing Prices model...",
  "isFallback": false,
  "suggestions": ["What are your technical skills?", "Where did you study?", "How can I contact you?"]
}
```
`isFallback` is true when the model declined to answer because the question
fell outside the portfolio data — the frontend can style that message
differently if desired. `suggestions` are quick-reply chips to render under
the response.

## Keeping the bot accurate

Edit `data/portfolioContext.js` whenever the real resume/portfolio changes.
The full JSON is injected alongside the system instruction on every request,
so the model always answers from current data — there's no separate
fine-tuning or embedding step to keep in sync.

## About the free Gemini tier

Google AI Studio's free tier (as of 2026) offers `gemini-2.5-flash` with
1,500 requests/day, 15 requests/minute, and no credit card requirement —
comfortably enough for a portfolio site's traffic. One trade-off: Google may
use free-tier prompts/responses to improve their models (this doesn't apply
on paid tiers). If you outgrow the free tier or want that data policy, add
billing in Google AI Studio and nothing else in this codebase needs to
change — same SDK, same code path.

## Security & reliability notes

- The Gemini API key lives only in `.env` on the server; it is never sent to
  the browser. Make sure `.env` is in your `.gitignore`.
- `express-rate-limit` caps each IP to 20 messages/minute (`chatLimiter` in
  `server.js`) — tune to taste.
- `utils/retry.js` retries transient `429`/`5xx` errors with exponential
  backoff (3 attempts by default) before giving up.
- Set `ALLOWED_ORIGIN` in `.env` to your real frontend URL before deploying —
  the `*` default is for local development only.
- Incoming messages are capped at 500 characters and the JSON body at 10kb to
  limit abuse.
