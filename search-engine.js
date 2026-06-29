// STEMspace Collective — search engine
// Plain client-side search over SEARCH_INDEX (see search-data.js).
// Handles: live filtering as you type, ranked results, keyboard navigation,
// click-to-navigate, and auto-focusing the matched section on the destination page.

(function () {
  "use strict";

  // --- Focus handoff: runs on EVERY page load, regardless of whether ---
  // --- this particular page has the search bar markup or not.       ---

  const FOCUS_HANDOFF_KEY = "stemspace-search-focus-id";

  function focusSection(id) {
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;

    // If the target is a <details> accordion (e.g. an FAQ item), open it so the
    // answer is actually visible, not just scrolled-to-but-collapsed.
    if (el.tagName === "DETAILS") {
      el.open = true;
    }

    el.scrollIntoView({ behavior: "smooth", block: "start" });

    el.classList.add("search-focus-highlight");
    window.setTimeout(() => {
      el.classList.remove("search-focus-highlight");
    }, 2000);
  }

  function applyFocusHandoffOnLoad() {
    const focusId = sessionStorage.getItem(FOCUS_HANDOFF_KEY);
    if (!focusId) return;
    sessionStorage.removeItem(FOCUS_HANDOFF_KEY);
    // Wait a tick so layout/fonts/images settle before scrolling.
    window.setTimeout(() => focusSection(focusId), 50);
  }

  applyFocusHandoffOnLoad();

  // --- Search UI wiring: only runs on pages that include the search bar. ---

  const input = document.getElementById("site-search-input");
  const resultsBox = document.getElementById("site-search-results");
  if (!input || !resultsBox) return;

  let activeIndex = -1;
  let currentResults = [];

  // --- Matching & ranking -----------------------------------------------

  // Returns a score for how well `entry` matches `query`, or null if no match.
  // Lower score = better match. Title hits rank above keyword/description hits.
  function scoreEntry(entry, query) {
    const q = query.trim().toLowerCase();
    if (!q) return null;

    const title = entry.title.toLowerCase();
    const description = (entry.description || "").toLowerCase();
    const keywords = (entry.keywords || []).map((k) => k.toLowerCase());

    if (title === q) return 0;
    if (title.startsWith(q)) return 1;
    if (title.includes(q)) return 2;
    if (keywords.some((k) => k === q)) return 3;
    if (keywords.some((k) => k.startsWith(q))) return 4;
    if (keywords.some((k) => k.includes(q))) return 5;
    if (description.includes(q)) return 6;

    return null;
  }

  function getResults(query) {
    return SEARCH_INDEX
      .map((entry) => ({ entry, score: scoreEntry(entry, query) }))
      .filter((r) => r.score !== null)
      .sort((a, b) => a.score - b.score)
      .map((r) => r.entry);
  }

  // --- Rendering -----------------------------------------------------------

  function renderResults(results) {
    currentResults = results;
    activeIndex = -1;

    if (results.length === 0) {
      resultsBox.innerHTML =
        '<li class="px-4 py-3 text-gray-400 text-sm">No matches yet — try a different word.</li>';
      resultsBox.classList.remove("hidden");
      return;
    }

    resultsBox.innerHTML = results
      .map(
        (entry, i) => `
        <li>
          <button
            type="button"
            data-index="${i}"
            class="search-result-item w-full text-left px-4 py-3 hover:bg-violet-600/20 focus:bg-violet-600/20 focus:outline-none transition-colors"
          >
            <div class="text-white font-semibold">${escapeHtml(entry.title)}</div>
            ${entry.description ? `<div class="text-gray-400 text-sm mt-0.5">${escapeHtml(entry.description)}</div>` : ""}
          </button>
        </li>`
      )
      .join("");

    resultsBox.classList.remove("hidden");

    resultsBox.querySelectorAll(".search-result-item").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-index"), 10);
        goToResult(currentResults[idx]);
      });
    });
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function closeResults() {
    resultsBox.classList.add("hidden");
    resultsBox.innerHTML = "";
    activeIndex = -1;
  }

  // --- Navigation + auto-focus on destination page --------------------

  function goToResult(entry) {
    if (!entry) return;

    // External links (e.g. the Google Form) just navigate normally, no focus handoff.
    if (/^https?:\/\//i.test(entry.url)) {
      window.open(entry.url, "_blank");
      closeResults();
      input.value = "";
      return;
    }

    const [path, hash] = entry.url.split("#");
    const focusId = entry.focusId || hash || null;
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const targetPath = path || currentPath;

    if (focusId) {
      sessionStorage.setItem(FOCUS_HANDOFF_KEY, focusId);
    }

    if (targetPath === currentPath) {
      // Same page — scroll immediately, no reload needed.
      focusSection(focusId);
      closeResults();
      input.value = "";
    } else {
      window.location.href = entry.url;
    }
  }

  // --- Event wiring --------------------------------------------------------

  input.addEventListener("input", () => {
    const query = input.value;
    if (!query.trim()) {
      closeResults();
      return;
    }
    renderResults(getResults(query));
  });

  input.addEventListener("keydown", (e) => {
    if (resultsBox.classList.contains("hidden") || currentResults.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, currentResults.length - 1);
      highlightActive();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      highlightActive();
    } else if (e.key === "Enter") {
      e.preventDefault();
      const chosen = activeIndex >= 0 ? currentResults[activeIndex] : currentResults[0];
      goToResult(chosen);
    } else if (e.key === "Escape") {
      closeResults();
    }
  });

  function highlightActive() {
    const items = resultsBox.querySelectorAll(".search-result-item");
    items.forEach((item, i) => {
      item.classList.toggle("bg-violet-600/20", i === activeIndex);
      if (i === activeIndex) item.scrollIntoView({ block: "nearest" });
    });
  }

  // Close dropdown when clicking outside the search widget (form + results dropdown).
  document.addEventListener("click", (e) => {
    const searchWidget = document.getElementById("site-search-widget");
    if (searchWidget && !searchWidget.contains(e.target)) {
      closeResults();
    }
  });

})();