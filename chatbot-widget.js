/**
 * chatbot-widget.js
 *
 * Self-contained portfolio chatbot widget — no React, no build step, no
 * Tailwind. Drop this file + chatbot-widget.css into your project and
 * include both in index.html (see integration instructions in the README).
 *
 * Configure the backend URL BEFORE this script tag by setting:
 *   <script>
 *     window.PORTFOLIO_CHATBOT_CONFIG = { apiUrl: "https://your-backend.com/api/chat" };
 *   </script>
 * If omitted, it defaults to http://localhost:3001/api/chat for local testing.
 */
(function () {
  "use strict";

  function init() {
    var CONFIG = window.PORTFOLIO_CHATBOT_CONFIG || {};
    var API_URL = CONFIG.apiUrl || "http://localhost:3001/api/chat";

    var GREETING =
      "Hi! I'm Vinayak's portfolio assistant. Ask me anything about his education, projects, skills, or experience.";
    var DEFAULT_CHIPS = [
      "What projects have you built?",
      "What are your technical skills?",
      "Tell me about your internship",
    ];

    var state = {
      open: false,
      loading: false,
      messages: [{ role: "assistant", content: GREETING, suggestions: DEFAULT_CHIPS }],
    };

    // ---- Build DOM ----
    var root = document.createElement("div");
    root.className = "pc-chatbot-root";
    document.body.appendChild(root);

    var fab = document.createElement("button");
    fab.type = "button";
    fab.className = "pc-fab";
    fab.setAttribute("aria-label", "Open portfolio chat");
    fab.innerHTML = chatIconSVG();
    root.appendChild(fab);

    var panel = document.createElement("div");
    panel.className = "pc-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Portfolio assistant chat");
    panel.style.display = "none";
    panel.innerHTML =
      '<div class="pc-header">' +
      '<div class="pc-avatar">VS</div>' +
      '<div class="pc-header-text">' +
      '<p class="pc-title">Vinayak&#39;s Assistant</p>' +
      '<p class="pc-subtitle">Ask about his portfolio</p>' +
      "</div>" +
      '<button type="button" class="pc-close" aria-label="Close chat">&times;</button>' +
      "</div>" +
      '<div class="pc-messages"></div>' +
      '<form class="pc-form">' +
      '<input type="text" class="pc-input" placeholder="Ask a question..." maxlength="500" autocomplete="off" />' +
      '<button type="submit" class="pc-send" aria-label="Send message">' +
      sendIconSVG() +
      "</button>" +
      "</form>";
    root.appendChild(panel);

    var messagesEl = panel.querySelector(".pc-messages");
    var formEl = panel.querySelector(".pc-form");
    var inputEl = panel.querySelector(".pc-input");
    var sendBtn = panel.querySelector(".pc-send");
    var closeBtn = panel.querySelector(".pc-close");

    // ---- Behavior ----
    function toggle(open) {
      state.open = open !== undefined ? open : !state.open;
      panel.style.display = state.open ? "flex" : "none";
      fab.innerHTML = state.open ? closeIconSVG() : chatIconSVG();
      fab.setAttribute("aria-label", state.open ? "Close portfolio chat" : "Open portfolio chat");
      if (state.open) {
        inputEl.focus();
        scrollToBottom();
      }
    }

    fab.addEventListener("click", function () {
      toggle();
    });
    closeBtn.addEventListener("click", function () {
      toggle(false);
    });
    formEl.addEventListener("submit", function (e) {
      e.preventDefault();
      sendMessage(inputEl.value);
    });

    function scrollToBottom() {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function render() {
      messagesEl.innerHTML = "";

      state.messages.forEach(function (m, i) {
        var row = document.createElement("div");
        row.className = "pc-row " + (m.role === "user" ? "pc-row-user" : "pc-row-bot");

        var bubble = document.createElement("div");
        bubble.className = "pc-bubble " + (m.role === "user" ? "pc-bubble-user" : "pc-bubble-bot");
        if (m.isFallback) bubble.classList.add("pc-bubble-fallback");
        if (m.isError) bubble.classList.add("pc-bubble-error");
        bubble.textContent = m.content;
        row.appendChild(bubble);

        var isLast = i === state.messages.length - 1;
        if (isLast && !state.loading && m.suggestions && m.suggestions.length) {
          var chips = document.createElement("div");
          chips.className = "pc-chips";
          m.suggestions.forEach(function (chip) {
            var btn = document.createElement("button");
            btn.type = "button";
            btn.className = "pc-chip";
            btn.textContent = chip;
            btn.addEventListener("click", function () {
              sendMessage(chip);
            });
            chips.appendChild(btn);
          });
          row.appendChild(chips);
        }

        messagesEl.appendChild(row);
      });

      if (state.loading) {
        var loadingRow = document.createElement("div");
        loadingRow.className = "pc-row pc-row-bot";
        loadingRow.innerHTML =
          '<div class="pc-bubble pc-bubble-bot pc-typing">' +
          '<span class="pc-dot"></span><span class="pc-dot"></span><span class="pc-dot"></span>' +
          "</div>";
        messagesEl.appendChild(loadingRow);
      }

      inputEl.disabled = state.loading;
      sendBtn.disabled = state.loading;
      scrollToBottom();
    }

    function sendMessage(text) {
      var trimmed = (text || "").trim();
      if (!trimmed || state.loading) return;

      var history = state.messages.map(function (m) {
        return { role: m.role, content: m.content };
      });

      state.messages.push({ role: "user", content: trimmed });
      inputEl.value = "";
      state.loading = true;
      render();

      fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history: history }),
      })
        .then(function (res) {
          if (!res.ok) {
            return res
              .json()
              .catch(function () {
                return {};
              })
              .then(function (err) {
                throw new Error(err.error || "Request failed (" + res.status + ")");
              });
          }
          return res.json();
        })
        .then(function (data) {
          state.messages.push({
            role: "assistant",
            content: data.reply,
            isFallback: data.isFallback,
            suggestions: data.suggestions || [],
          });
        })
        .catch(function () {
          state.messages.push({
            role: "assistant",
            content: "⚠️ Sorry, something went wrong reaching the server. Please try again.",
            isError: true,
          });
        })
        .finally(function () {
          state.loading = false;
          render();
        });
    }

    function chatIconSVG() {
      return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }
    function closeIconSVG() {
      return '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }
    function sendIconSVG() {
      return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }

    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
