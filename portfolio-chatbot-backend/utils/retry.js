/**
 * retry.js
 *
 * Wraps an async function with exponential-backoff retries. Retries on
 * HTTP 429 (rate limited) and 5xx (transient server errors) only —
 * anything else (bad request, auth failure) fails fast.
 */

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryable(err) {
  const status = err?.status || err?.response?.status;
  return status === 429 || (status >= 500 && status < 600);
}

async function withRetry(fn, { retries = 3, baseDelayMs = 500 } = {}) {
  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (attempt === retries || !isRetryable(err)) {
        throw err;
      }
      const delay = baseDelayMs * 2 ** attempt + Math.floor(Math.random() * 100);
      await sleep(delay);
    }
  }
  throw lastErr;
}

module.exports = { withRetry };
