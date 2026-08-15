/**
 * suggestedQuestions.js
 *
 * Quick-reply chips. `general` is shown on greeting / after a normal answer.
 * `fallbackSets` mirrors the fallback + follow-up pairings from the project
 * plan so an off-topic question still nudges the user toward real content.
 */

const general = [
  "What projects have you built?",
  "What are your technical skills?",
  "Where did you study?",
  "Tell me about your internship at Wurkify",
  "What certifications do you hold?",
  "How can I contact you?",
  "What are your soft skills?",
  "What is your CGPA?",
];

const fallbackSets = [
  {
    response:
      "I'm sorry, but that information isn't listed in my portfolio. You can contact Vinayak directly for details.",
    suggestions: ["Ask about my projects", "Ask about my skills", "Ask about my education"],
  },
  {
    response:
      "That detail isn't provided on my portfolio. Please feel free to reach out to me for that info.",
    suggestions: ["Ask about projects I've done", "Ask about my experience", "Ask about my certifications"],
  },
  {
    response: "I don't have that info in my portfolio. You might ask about one of these instead.",
    suggestions: ["What projects did you work on?", "What technologies do you know?", "Where did you study?"],
  },
  {
    response: "Sorry, I can't answer that from the portfolio. Maybe ask about my achievements or skills.",
    suggestions: ["What skills do you have?", "What certifications do you hold?", "What did you learn at your internship?"],
  },
  {
    response: "That's outside the scope of my resume. Feel free to ask me about my projects, education, or skills.",
    suggestions: ["Tell me about your projects", "What is your major and CGPA?", "List your technical skills"],
  },
];

/** Regex used to detect that the model produced a fallback-style answer. */
const FALLBACK_PATTERN = /isn.?t listed in my portfolio|isn.?t provided on my portfolio|don.?t have that info|outside the scope of my resume|can.?t answer that from the portfolio/i;

function pickGeneral(exclude = [], count = 3) {
  const pool = general.filter((q) => !exclude.includes(q));
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function pickFallbackSuggestions() {
  const set = fallbackSets[Math.floor(Math.random() * fallbackSets.length)];
  return set.suggestions;
}

module.exports = { general, fallbackSets, FALLBACK_PATTERN, pickGeneral, pickFallbackSuggestions };
