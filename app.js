/**
 * beenabled.org — progressive enhancement only.
 *
 * Everything on this site works with JavaScript disabled. Nothing here creates
 * content, navigation, or state that the page needs in order to function; it
 * only improves things that already work.
 *
 *   1. Display settings   — the mechanism for SC 1.4.8 (user-selectable colours,
 *                           text size, line spacing) and SC 2.3.3 (motion).
 *   2. Nav disclosure     — <details> already opens and closes natively; this
 *                           adds only Escape-to-close and resize cleanup.
 *   3. Contact form       — inline validation plus the review-and-confirm step
 *                           required by SC 3.3.6 Error Prevention (All).
 *
 * Deliberately absent: carousels, modals, scroll animation, smooth scrolling,
 * tooltips, analytics, and cookie banners. Each of those breaks a Level AAA
 * criterion outright.
 */
(function () {
  "use strict";

  /* Storage can throw outright in some privacy modes, not merely return null. */
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
    del: function (k) { try { localStorage.removeItem(k); } catch (e) {} },
  };

  var root = document.documentElement;

  /* ------------------------------------------------------------------ 1 --
     Display settings.

     Each control maps to one data-* attribute on <html>; the stylesheet does
     the rest. Radio inputs rather than a slider or a <select>, because
     SC 2.5.7 forbids requiring a drag, and SC 3.2.5 forbids a control that
     changes context the moment it is touched.                             */
  var SETTINGS = [
    { name: "theme",       key: "beaa-theme",       attr: "data-theme",       fallback: "auto", label: "Colour theme" },
    { name: "text-size",   key: "beaa-text-size",   attr: "data-text-size",   fallback: "100",  label: "Text size" },
    { name: "line-height", key: "beaa-line-height", attr: "data-line-height", fallback: "160",  label: "Line spacing" },
    { name: "motion",      key: "beaa-motion",      attr: "data-motion",      fallback: "auto", label: "Movement" },
  ];

  var panel = document.getElementById("display-settings");

  function apply(setting, value, announce) {
    if (value === setting.fallback) {
      root.removeAttribute(setting.attr);
      store.del(setting.key);
    } else {
      root.setAttribute(setting.attr, value);
      store.set(setting.key, value);
    }
    if (announce) say(setting.label + " set to " + announce);
  }

  var statusEl = panel && panel.querySelector("[data-settings-status]");
  var sayTimer;
  function say(message) {
    if (!statusEl) return;
    /* Clearing first makes repeat announcements actually re-announce. */
    statusEl.textContent = "";
    clearTimeout(sayTimer);
    sayTimer = setTimeout(function () { statusEl.textContent = message; }, 60);
  }

  if (panel) {
    SETTINGS.forEach(function (setting) {
      var inputs = panel.querySelectorAll('input[name="' + setting.name + '"]');
      if (!inputs.length) return;

      /* Reflect what the inline <head> script already applied, so the controls
         agree with the page on first paint. */
      var saved = store.get(setting.key) || setting.fallback;
      Array.prototype.forEach.call(inputs, function (input) {
        input.checked = input.value === saved;
        input.addEventListener("change", function () {
          if (!input.checked) return;
          var text = (input.parentNode.textContent || input.value).trim();
          apply(setting, input.value, text);
        });
      });
    });

    var reset = panel.querySelector("[data-settings-reset]");
    if (reset) {
      reset.addEventListener("click", function () {
        SETTINGS.forEach(function (setting) {
          apply(setting, setting.fallback);
          var input = panel.querySelector(
            'input[name="' + setting.name + '"][value="' + setting.fallback + '"]'
          );
          if (input) input.checked = true;
        });
        say("Display settings reset to their starting values.");
      });
    }
  }

  /* ------------------------------------------------------------------ 2 --
     Nav disclosure. <details>/<summary> is already a keyboard-accessible,
     no-JS disclosure with correct semantics. These are the two behaviours it
     does not give us.                                                     */
  var navToggle = document.querySelector(".nav-toggle");

  if (navToggle) {
    var summary = navToggle.querySelector("summary");

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape" || !navToggle.open) return;
      navToggle.open = false;
      /* Focus must come back to the control that opened it, or the user is
         dropped at the top of the document. */
      if (summary) summary.focus();
    });

    /* Without this the menu can be left open in a layout that no longer shows
       the toggle, stranding it. */
    if (window.matchMedia) {
      var wide = window.matchMedia("(min-width: 56.0625rem)");
      var onChange = function (event) { if (event.matches) navToggle.open = false; };
      if (wide.addEventListener) wide.addEventListener("change", onChange);
      else if (wide.addListener) wide.addListener(onChange);
    }
  }

  /* ------------------------------------------------------------------ 3 --
     Contact form.

     SC 3.3.6 Error Prevention (All) requires that a submission be reversible,
     checked, or confirmed. We do the latter two: fields are validated with
     visible inline messages, then the whole message is read back for explicit
     confirmation before anything is sent. Nothing here is timed, and nothing
     submits on its own (SC 2.2.3, SC 3.2.5).                              */
  var form = document.querySelector("[data-confirm-before-send]");

  if (form) {
    var confirmed = false;
    var statusBox = form.querySelector("[data-form-status]");

    var RULES = [
      {
        id: "cf-message",
        test: function (v) { return v.trim().length > 0; },
        message: "Please write your message before sending. This is the only box we need.",
      },
      {
        id: "cf-email",
        /* Empty is fine — the field is optional. Only a filled-in address is checked. */
        test: function (v) { return v.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); },
        message: "That email address does not look complete. Check it, or clear the box if you do not want a reply by email.",
      },
    ];

    function setError(rule, ok) {
      var input = document.getElementById(rule.id);
      var errorEl = document.getElementById(rule.id + "-error");
      var field = input && input.closest(".field");
      if (!input || !errorEl || !field) return;

      if (ok) {
        field.classList.remove("field--invalid");
        input.removeAttribute("aria-invalid");
        errorEl.textContent = "";
        /* Re-point aria-describedby at the hint only. */
        input.setAttribute("aria-describedby", rule.id + "-hint");
      } else {
        field.classList.add("field--invalid");
        input.setAttribute("aria-invalid", "true");
        errorEl.textContent = rule.message;
        input.setAttribute("aria-describedby", rule.id + "-hint " + rule.id + "-error");
      }
    }

    function validate() {
      var firstBad = null;
      RULES.forEach(function (rule) {
        var input = document.getElementById(rule.id);
        if (!input) return;
        var ok = rule.test(input.value);
        setError(rule, ok);
        if (!ok && !firstBad) firstBad = input;
      });
      return firstBad;
    }

    /* Re-check a field once the user has left it, but never while they are
       still typing — mid-typing errors are noise. */
    RULES.forEach(function (rule) {
      var input = document.getElementById(rule.id);
      if (!input) return;
      input.addEventListener("blur", function () {
        if (input.value.trim() !== "" || input.hasAttribute("required")) {
          setError(rule, rule.test(input.value));
        }
      });
    });

    function escapeHtml(s) {
      return String(s).replace(/[&<>"']/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
      });
    }

    function review() {
      var get = function (id) {
        var el = document.getElementById(id);
        if (!el) return "";
        if (el.tagName === "SELECT") return el.options[el.selectedIndex].text;
        return el.value.trim();
      };
      var rows = [
        ["Your name", get("cf-name") || "Not given"],
        ["Email address", get("cf-email") || "Not given"],
        ["What this is about", get("cf-topic")],
        ["Your message", get("cf-message")],
      ];

      statusBox.innerHTML =
        '<div class="in-short" role="group" aria-labelledby="cf-review-heading">' +
        '<h3 id="cf-review-heading" tabindex="-1">Check this before you send it</h3>' +
        '<p>Nothing has been sent yet. Read it over, then choose.</p>' +
        '<dl class="def-list">' +
        rows.map(function (r) {
          return "<div><dt>" + escapeHtml(r[0]) + "</dt><dd>" +
                 escapeHtml(r[1]).replace(/\n/g, "<br>") + "</dd></div>";
        }).join("") +
        "</dl>" +
        '<p class="btn-row">' +
        '<button type="submit" class="btn btn--primary" data-really-send>Yes, send this message</button>' +
        '<button type="button" class="btn btn--secondary" data-go-back>No, go back and edit it</button>' +
        "</p></div>";

      confirmed = true;

      var heading = document.getElementById("cf-review-heading");
      if (heading) heading.focus();

      var back = statusBox.querySelector("[data-go-back]");
      if (back) {
        back.addEventListener("click", function () {
          confirmed = false;
          statusBox.innerHTML = "";
          var message = document.getElementById("cf-message");
          if (message) message.focus();
        });
      }
    }

    form.addEventListener("submit", function (event) {
      var firstBad = validate();

      if (firstBad) {
        event.preventDefault();
        confirmed = false;
        if (statusBox) statusBox.innerHTML = "";
        firstBad.focus();
        return;
      }

      /* First valid submit shows the review. The second one is the real send. */
      if (!confirmed && statusBox) {
        event.preventDefault();
        review();
      }
    });
  }
})();
