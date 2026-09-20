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
 *   3. Forms              — inline validation plus the review-and-confirm step
 *                           required by SC 3.3.6 Error Prevention (All), for
 *                           every form marked [data-confirm-before-send].
 *   4. Resource Hub        — filtering, topic browsing, and the List/Day/Month
 *                           toggle on /resources/. All of it re-arranges
 *                           <li class="listing-card"> markup that is already
 *                           in the page; nothing here can be read only with
 *                           JavaScript on.
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
     Forms with a review-before-send step.

     SC 3.3.6 Error Prevention (All) requires that a submission be reversible,
     checked, or confirmed. We do the latter two: fields are validated with
     visible inline messages, then the whole message is read back for explicit
     confirmation before anything is sent. Nothing here is timed, and nothing
     submits on its own (SC 2.2.3, SC 3.2.5).

     Every field this checks is discovered from the markup — a required input,
     select, or textarea inside a .field, or an input[type=email] — rather
     than a fixed list of ids, so the same code covers every form on the site
     that opts in with [data-confirm-before-send]: currently the contact form
     and the "submit a program" form.                                      */
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll("[data-confirm-before-send]"), function (form) {
    var statusBox = form.querySelector("[data-form-status]");
    if (!statusBox) return;
    var confirmed = false;

    function rulesFor() {
      var rules = [];
      Array.prototype.forEach.call(form.querySelectorAll(".field [required]"), function (input) {
        rules.push({
          id: input.id,
          test: function (v) { return v.trim().length > 0; },
          message: input.getAttribute("data-required-message") || "Please fill in this box before sending.",
        });
      });
      Array.prototype.forEach.call(form.querySelectorAll('.field input[type="email"]'), function (input) {
        rules.push({
          id: input.id,
          /* Empty is fine when the field is optional. Only a filled-in address is checked. */
          test: function (v) { return v.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); },
          message: "That email address does not look complete. Check it, or clear the box if you do not want a reply by email.",
        });
      });
      return rules;
    }

    function setError(rule, ok) {
      var input = document.getElementById(rule.id);
      var errorEl = document.getElementById(rule.id + "-error");
      var field = input && input.closest(".field");
      if (!input || !errorEl || !field) return;

      if (ok) {
        field.classList.remove("field--invalid");
        input.removeAttribute("aria-invalid");
        errorEl.textContent = "";
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
      rulesFor().forEach(function (rule) {
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
    Array.prototype.forEach.call(form.querySelectorAll(".field input, .field select, .field textarea"), function (input) {
      input.addEventListener("blur", function () {
        if (input.value.trim() === "" && !input.hasAttribute("required")) return;
        /* Deferred one tick: showing or hiding the error text changes this
           field's height. Doing that synchronously, inside blur, lands
           mid-click when the blur was itself caused by pressing a nearby
           button (e.g. "Send") — the button moves between mousedown and
           mouseup and the click is silently lost. A tick later, the click
           has already finished landing on a still-stable layout. */
        setTimeout(function () {
          rulesFor().forEach(function (rule) {
            if (rule.id === input.id) setError(rule, rule.test(input.value));
          });
        }, 0);
      });
    });

    /* Reads every .field and checked checkbox group back in document order,
       so the review step needs no per-form list of what to show. */
    function fieldRows() {
      var rows = [];
      Array.prototype.forEach.call(form.querySelectorAll(".field"), function (field) {
        var label = field.querySelector("label");
        var control = field.querySelector("input, select, textarea");
        if (!label || !control) return;
        var text = label.textContent.replace(/\s*\((optional|required)\)\s*$/i, "").trim();
        var value = control.tagName === "SELECT"
          ? (control.selectedIndex > -1 ? control.options[control.selectedIndex].text : "")
          : control.value.trim();
        rows.push([text, value || "Not given"]);
      });
      Array.prototype.forEach.call(form.querySelectorAll("fieldset"), function (fieldset) {
        var legend = fieldset.querySelector("legend");
        var boxes = fieldset.querySelectorAll("input[type=checkbox]:checked");
        if (!legend || !boxes.length) return;
        var value = Array.prototype.map.call(boxes, function (box) {
          var label = box.closest("label");
          return (label ? label.textContent : box.value).trim();
        }).join(", ");
        rows.push([legend.textContent.replace(/\s*\([^)]*\)\s*$/, "").trim(), value]);
      });
      return rows;
    }

    function review() {
      var headingId = form.id + "-review-heading";
      statusBox.innerHTML =
        '<div class="in-short" role="group" aria-labelledby="' + headingId + '">' +
        '<h3 id="' + headingId + '" tabindex="-1">Check this before you send it</h3>' +
        "<p>Nothing has been sent yet. Read it over, then choose.</p>" +
        '<dl class="def-list">' +
        fieldRows().map(function (r) {
          return "<div><dt>" + escapeHtml(r[0]) + "</dt><dd>" +
                 escapeHtml(r[1]).replace(/\n/g, "<br>") + "</dd></div>";
        }).join("") +
        "</dl>" +
        '<p class="btn-row">' +
        '<button type="submit" class="btn btn--primary" data-really-send>Yes, send this</button>' +
        '<button type="button" class="btn btn--secondary" data-go-back>No, go back and edit it</button>' +
        "</p></div>";

      confirmed = true;

      var heading = document.getElementById(headingId);
      if (heading) heading.focus();

      var back = statusBox.querySelector("[data-go-back]");
      if (back) {
        back.addEventListener("click", function () {
          confirmed = false;
          statusBox.innerHTML = "";
          var firstField = form.querySelector(".field input, .field select, .field textarea");
          if (firstField) firstField.focus();
        });
      }
    }

    form.addEventListener("submit", function (event) {
      var firstBad = validate();

      if (firstBad) {
        event.preventDefault();
        confirmed = false;
        statusBox.innerHTML = "";
        firstBad.focus();
        return;
      }

      /* First valid submit shows the review. The second one is the real send. */
      if (!confirmed) {
        event.preventDefault();
        review();
      }
    });
  });

  /* ------------------------------------------------------------------ 4 --
     Resource Hub & Calendar (/resources/): filtering, topic browsing, and
     the List / Day / Month toggle. Every program is already a plain
     <li class="listing-card" data-county="…" data-category="…" …> in the
     page; this only shows, hides, and regroups that existing markup — it
     never fetches or invents content of its own. */
  var hubList = document.getElementById("hubList");

  if (hubList) {
    var hubEmpty = document.getElementById("hubEmpty");
    var allCards = Array.prototype.slice.call(hubList.querySelectorAll(".listing-card"));

    var hubFilters = { topic: "", county: "", agencyType: "", disabilityType: "", search: "" };

    function splitList(s) {
      return (s || "").split(",").map(function (v) { return v.trim(); });
    }

    function cardMatchesFilters(card) {
      var d = card.dataset;
      if (hubFilters.topic && splitList(d.category).indexOf(hubFilters.topic) === -1) return false;
      if (hubFilters.county && d.county !== hubFilters.county) return false;
      if (hubFilters.agencyType && d.agencyType !== hubFilters.agencyType) return false;
      if (hubFilters.disabilityType && d.disabilityType !== hubFilters.disabilityType) return false;
      if (hubFilters.search) {
        var hay = ((d.title || "") + " " + (card.textContent || "")).toLowerCase();
        if (hay.indexOf(hubFilters.search.toLowerCase()) === -1) return false;
      }
      return true;
    }

    function pad(n) { return n < 10 ? "0" + n : String(n); }
    function isoOf(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
    function parseIsoDate(s) {
      var parts = s.split("-");
      return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    }
    var LONG_DATE = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    var MONTH_YEAR = { month: "long", year: "numeric" };

    /* A plain-text copy of a listing card for the Day/Month agenda views.
       Its own <h3> is demoted to bold text there, so the page never carries
       the same heading twice at once (SC 1.3.1). */
    function agendaCardHtml(card) {
      var clone = card.cloneNode(true);
      var heading = clone.querySelector("h3");
      if (heading) {
        var p = document.createElement("p");
        p.innerHTML = "<strong>" + heading.innerHTML + "</strong>";
        heading.replaceWith(p);
      }
      return clone.outerHTML;
    }

    function renderList() {
      var visible = 0;
      allCards.forEach(function (card) {
        var show = cardMatchesFilters(card);
        card.hidden = !show;
        if (show) visible++;
      });
      if (!hubEmpty) return;
      if (!allCards.length) {
        hubEmpty.innerHTML = 'No programs are listed here yet. <a href="/resources/submit/">Submit a program</a> to help us start filling this in.';
        hubEmpty.hidden = false;
      } else if (visible === 0) {
        hubEmpty.innerHTML = 'Nothing matches those filters. <a href="/resources/submit/">Tell us about a program we are missing</a>, or try different filters.';
        hubEmpty.hidden = false;
      } else {
        hubEmpty.hidden = true;
      }
    }

    var dayLabel = document.getElementById("hubDayLabel");
    var dayAgenda = document.getElementById("hubDayAgenda");
    var currentDay = new Date();

    function renderDay() {
      if (!dayLabel || !dayAgenda) return;
      dayLabel.textContent = new Intl.DateTimeFormat("en-US", LONG_DATE).format(currentDay);
      var iso = isoOf(currentDay);
      var onDay = allCards.filter(function (c) {
        return cardMatchesFilters(c) && c.dataset.ongoing !== "true" && c.dataset.date === iso;
      });
      var ongoing = allCards.filter(function (c) {
        return cardMatchesFilters(c) && c.dataset.ongoing === "true";
      });
      dayAgenda.innerHTML =
        "<p><strong>That day</strong></p>" +
        (onDay.length
          ? '<ul class="listing-list">' + onDay.map(agendaCardHtml).join("") + "</ul>"
          : "<p>Nothing scheduled for this day.</p>") +
        "<p><strong>Ongoing programs</strong></p>" +
        (ongoing.length
          ? '<ul class="listing-list">' + ongoing.map(agendaCardHtml).join("") + "</ul>"
          : "<p>No ongoing programs match your filters.</p>");
    }

    var monthLabel = document.getElementById("hubMonthLabel");
    var monthAgenda = document.getElementById("hubMonthAgenda");
    var currentMonth = new Date();

    function renderMonth() {
      if (!monthLabel || !monthAgenda) return;
      monthLabel.textContent = new Intl.DateTimeFormat("en-US", MONTH_YEAR).format(currentMonth);
      var y = currentMonth.getFullYear();
      var m = currentMonth.getMonth();
      var inMonth = allCards.filter(function (c) {
        if (!cardMatchesFilters(c) || c.dataset.ongoing === "true" || !c.dataset.date) return false;
        var d = parseIsoDate(c.dataset.date);
        return d.getFullYear() === y && d.getMonth() === m;
      }).sort(function (a, b) { return a.dataset.date < b.dataset.date ? -1 : 1; });
      monthAgenda.innerHTML = inMonth.length
        ? '<ul class="listing-list">' + inMonth.map(agendaCardHtml).join("") + "</ul>"
        : "<p>Nothing scheduled this month.</p>";
    }

    function rerender() { renderList(); renderDay(); renderMonth(); }

    var countySel = document.getElementById("hubCounty");
    var agencySel = document.getElementById("hubAgencyType");
    var disabilitySel = document.getElementById("hubDisability");
    var searchInput = document.getElementById("hubSearch");

    if (countySel) countySel.addEventListener("change", function () { hubFilters.county = countySel.value; rerender(); });
    if (agencySel) agencySel.addEventListener("change", function () { hubFilters.agencyType = agencySel.value; rerender(); });
    if (disabilitySel) disabilitySel.addEventListener("change", function () { hubFilters.disabilityType = disabilitySel.value; rerender(); });
    if (searchInput) searchInput.addEventListener("input", function () { hubFilters.search = searchInput.value; rerender(); });

    var topicButtons = document.querySelectorAll("#hubTopics .chip");
    Array.prototype.forEach.call(topicButtons, function (btn) {
      btn.addEventListener("click", function () {
        var wasActive = btn.getAttribute("aria-pressed") === "true";
        Array.prototype.forEach.call(topicButtons, function (b) { b.setAttribute("aria-pressed", "false"); });
        hubFilters.topic = wasActive ? "" : btn.getAttribute("data-topic");
        if (!wasActive) btn.setAttribute("aria-pressed", "true");
        rerender();
      });
    });

    var viewButtons = document.querySelectorAll(".view-toggle button");
    var panels = {
      list: document.getElementById("hubListPanel"),
      day: document.getElementById("hubDayPanel"),
      month: document.getElementById("hubMonthPanel"),
    };
    var focusTargets = { list: null, day: dayLabel, month: monthLabel };

    Array.prototype.forEach.call(viewButtons, function (btn) {
      btn.addEventListener("click", function () {
        var view = btn.getAttribute("data-view");
        Array.prototype.forEach.call(viewButtons, function (b) {
          b.setAttribute("aria-pressed", String(b === btn));
        });
        Object.keys(panels).forEach(function (key) {
          if (panels[key]) panels[key].hidden = key !== view;
        });
        if (focusTargets[view]) focusTargets[view].focus();
      });
    });

    var dayPrev = document.getElementById("hubDayPrev");
    var dayNext = document.getElementById("hubDayNext");
    if (dayPrev) dayPrev.addEventListener("click", function () { currentDay.setDate(currentDay.getDate() - 1); renderDay(); });
    if (dayNext) dayNext.addEventListener("click", function () { currentDay.setDate(currentDay.getDate() + 1); renderDay(); });

    var monthPrev = document.getElementById("hubMonthPrev");
    var monthNext = document.getElementById("hubMonthNext");
    if (monthPrev) monthPrev.addEventListener("click", function () { currentMonth.setMonth(currentMonth.getMonth() - 1); renderMonth(); });
    if (monthNext) monthNext.addEventListener("click", function () { currentMonth.setMonth(currentMonth.getMonth() + 1); renderMonth(); });

    rerender();
  }
})();
