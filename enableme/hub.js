/**
 * EnableMe Resource Hub preview.
 *
 * A client-side only demonstration of the browsing experience described in
 * the EnableMe project brief: filter by county/category/agency/disability
 * type, search, and switch between List, Day, and Month views. All data
 * comes from data.js and is clearly labeled as example data — there is no
 * backend, and nothing here is a real program.
 *
 * Progressive enhancement: without JavaScript, the noscript notice in
 * index.html is shown and this file never runs.
 */
(function () {
  "use strict";

  var DATA = window.ENABLEME_HUB_DATA;
  if (!DATA) return;

  var state = { county: "", category: "", agencyType: "", disabilityType: "", search: "", dateFrom: "", view: "list", selectedDate: null, selectedMonth: null };

  function pad2(n) { return String(n).padStart(2, "0"); }
  function todayISO() {
    var d = new Date();
    return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
  }
  function addDaysISO(iso, days) {
    var parts = iso.split("-").map(Number);
    var d = new Date(parts[0], parts[1] - 1, parts[2]);
    d.setDate(d.getDate() + days);
    return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
  }
  function labelForISO(iso, opts) {
    var parts = iso.split("-").map(Number);
    var d = new Date(parts[0], parts[1] - 1, parts[2]);
    return d.toLocaleDateString(undefined, opts);
  }
  function fmtTime(dt) {
    var d = new Date(dt);
    return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  }
  function fmtDateShort(dt) {
    var d = new Date(dt);
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (k) {
      if (attrs[k] == null) return;
      if (k === "class") node.className = attrs[k];
      else if (k === "text") node.textContent = attrs[k];
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) {
      if (c == null) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  function fillSelect(select, options, placeholder) {
    var html = placeholder ? '<option value="">' + placeholder + "</option>" : "";
    html += options.map(function (o) { return '<option value="' + o + '">' + o + "</option>"; }).join("");
    select.innerHTML = html;
  }

  function matches(listing) {
    if (state.county && listing.county !== state.county) return false;
    if (state.category && listing.category.indexOf(state.category) === -1) return false;
    if (state.agencyType && listing.agencyType !== state.agencyType) return false;
    if (state.disabilityType && listing.disabilityType && listing.disabilityType !== state.disabilityType) return false;
    if (state.search) {
      var q = state.search.toLowerCase();
      if (listing.title.toLowerCase().indexOf(q) === -1 && listing.description.toLowerCase().indexOf(q) === -1) return false;
    }
    if (state.dateFrom && listing.dateTime) {
      if (listing.dateTime.slice(0, 10) < state.dateFrom) return false;
    }
    return true;
  }

  function defaultDate(results) {
    var dated = results.filter(function (l) { return l.dateTime; })
      .map(function (l) { return l.dateTime.slice(0, 10); })
      .sort();
    var today = todayISO();
    var upcoming = dated.filter(function (d) { return d >= today; })[0];
    return upcoming || dated[0] || today;
  }

  function listingMeta(listing) {
    var badges = listing.category.map(function (c) { return el("span", { class: "hub-badge" }, [c]); });
    badges.push(el("span", { class: "hub-badge" }, [listing.county + " County"]));
    return el("div", { class: "hub-listing__meta" }, badges);
  }

  function listingRow(listing) {
    var dateChip;
    if (listing.dateTime) {
      var d = new Date(listing.dateTime);
      dateChip = el("div", { class: "hub-listing__date" }, [
        el("span", { class: "hub-listing__month" }, [d.toLocaleDateString(undefined, { month: "short" })]),
        el("span", { class: "hub-listing__day" }, [String(d.getDate())])
      ]);
    } else {
      dateChip = el("div", { class: "hub-listing__date hub-listing__date--ongoing" }, ["Ongoing"]);
    }
    var subParts = [];
    if (listing.dateTime) subParts.push(fmtDateShort(listing.dateTime) + " · " + fmtTime(listing.dateTime));
    subParts.push("Hosted by " + listing.agencyName);
    if (listing.accessibilityNotes) subParts.push(listing.accessibilityNotes);
    return el("li", { class: "hub-listing" }, [
      dateChip,
      el("div", { class: "hub-listing__body" }, [
        listingMeta(listing),
        el("p", { class: "hub-listing__title" }, [listing.title]),
        el("p", { class: "hub-listing__sub" }, [subParts.join(" · ")])
      ])
    ]);
  }

  function renderTopics() {
    var box = document.getElementById("hub-topics");
    box.innerHTML = "";
    DATA.categories.forEach(function (cat) {
      var pressed = state.category === cat;
      var btn = el("button", { type: "button", class: "hub-topic" + (pressed ? " is-active" : ""), "aria-pressed": String(pressed) }, [cat]);
      btn.addEventListener("click", function () {
        state.category = state.category === cat ? "" : cat;
        document.getElementById("hub-category").value = state.category;
        render();
      });
      box.appendChild(btn);
    });
  }

  function renderList(results) {
    var box = document.getElementById("hub-list");
    box.innerHTML = "";
    var list = el("ul", { class: "hub-listings no-bullet" }, results.map(listingRow));
    box.appendChild(list);
  }

  function renderDay(results) {
    if (!state.selectedDate) state.selectedDate = defaultDate(results);
    var box = document.getElementById("hub-day");
    box.innerHTML = "";

    var today = todayISO();
    var strip = el("div", { class: "hub-daystrip", role: "group", "aria-label": "Choose a day" });
    for (var offset = -2; offset <= 2; offset++) {
      (function (offset) {
        var iso = addDaysISO(state.selectedDate, offset);
        var hasEvent = results.some(function (l) { return l.dateTime && l.dateTime.slice(0, 10) === iso; });
        var selected = iso === state.selectedDate;
        var btn = el("button", {
          type: "button",
          class: "hub-daycell" + (selected ? " is-selected" : "") + (iso === today ? " is-today" : ""),
          "aria-pressed": String(selected),
          "aria-label": labelForISO(iso, { weekday: "long", month: "long", day: "numeric" }) + (hasEvent ? ", has listings" : "")
        }, [
          el("span", { class: "hub-daycell__label" }, [labelForISO(iso, { weekday: "short" })]),
          el("span", { class: "hub-daycell__num" }, [String(Number(iso.slice(8, 10)))]),
          hasEvent ? el("span", { class: "hub-daycell__dot", "aria-hidden": "true" }, []) : null
        ]);
        btn.addEventListener("click", function () { state.selectedDate = iso; render(); });
        strip.appendChild(btn);
      })(offset);
    }
    var prev = el("button", { type: "button", class: "hub-arrow", "aria-label": "Earlier days" }, ["‹"]);
    prev.addEventListener("click", function () { state.selectedDate = addDaysISO(state.selectedDate, -5); render(); });
    var next = el("button", { type: "button", class: "hub-arrow", "aria-label": "Later days" }, ["›"]);
    next.addEventListener("click", function () { state.selectedDate = addDaysISO(state.selectedDate, 5); render(); });

    box.appendChild(el("div", { class: "hub-daynav" }, [prev, strip, next]));
    box.appendChild(el("h3", {}, [labelForISO(state.selectedDate, { weekday: "long", month: "long", day: "numeric" })]));

    var dayResults = results.filter(function (l) { return l.dateTime && l.dateTime.slice(0, 10) === state.selectedDate; })
      .sort(function (a, b) { return a.dateTime.localeCompare(b.dateTime); });

    if (dayResults.length === 0) {
      box.appendChild(el("p", { class: "text-muted" }, ["Nothing scheduled for this day in the example data. Try Month view, or browse by topic above."]));
    } else {
      var agenda = el("ul", { class: "hub-listings no-bullet" }, dayResults.map(listingRow));
      box.appendChild(agenda);
    }

    var ongoing = results.filter(function (l) { return !l.dateTime; });
    if (ongoing.length > 0) {
      box.appendChild(el("h3", { style: "margin-top: var(--space-6)" }, ["Ongoing programs (not tied to a single date)"]));
      box.appendChild(el("ul", { class: "hub-listings no-bullet" }, ongoing.map(listingRow)));
    }
  }

  function monthLabel(ym) {
    return new Date(ym.year, ym.month, 1).toLocaleDateString(undefined, { month: "long", year: "numeric" });
  }
  function monthAdd(ym, delta) {
    var year = ym.year, month = ym.month + delta;
    while (month < 0) { month += 12; year -= 1; }
    while (month > 11) { month -= 12; year += 1; }
    return { year: year, month: month };
  }

  function renderMonth(results) {
    if (!state.selectedMonth) {
      var d = state.selectedDate || defaultDate(results);
      var parts = d.split("-").map(Number);
      state.selectedMonth = { year: parts[0], month: parts[1] - 1 };
    }
    var box = document.getElementById("hub-month");
    box.innerHTML = "";

    var prev = el("button", { type: "button", class: "hub-arrow", "aria-label": "Previous month" }, ["‹"]);
    prev.addEventListener("click", function () { state.selectedMonth = monthAdd(state.selectedMonth, -1); render(); });
    var next = el("button", { type: "button", class: "hub-arrow", "aria-label": "Next month" }, ["›"]);
    next.addEventListener("click", function () { state.selectedMonth = monthAdd(state.selectedMonth, 1); render(); });
    box.appendChild(el("div", { class: "hub-monthnav" }, [prev, el("h3", {}, [monthLabel(state.selectedMonth)]), next]));

    var head = el("div", { class: "hub-monthgrid hub-monthgrid--head" }, ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(function (d) { return el("span", {}, [d]); }));
    box.appendChild(head);

    var year = state.selectedMonth.year, month = state.selectedMonth.month;
    var firstWeekday = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();

    var byDay = {};
    results.forEach(function (l) {
      if (!l.dateTime) return;
      var p = l.dateTime.slice(0, 10).split("-").map(Number);
      if (p[0] === year && p[1] - 1 === month) {
        byDay[p[2]] = byDay[p[2]] || [];
        byDay[p[2]].push(l);
      }
    });

    var grid = el("div", { class: "hub-monthgrid" });
    for (var i = 0; i < firstWeekday; i++) grid.appendChild(el("div", { class: "hub-monthcell hub-monthcell--blank" }));
    for (var day = 1; day <= daysInMonth; day++) {
      (function (day) {
        var iso = year + "-" + pad2(month + 1) + "-" + pad2(day);
        var dayListings = byDay[day] || [];
        var cellChildren = [el("span", { class: "hub-monthcell__num" }, [String(day)])];
        if (dayListings.length) cellChildren.push(el("span", { class: "hub-monthcell__dot", "aria-hidden": "true" }, []));
        var label = "Day " + day + (dayListings.length ? ", " + dayListings.length + " listing" + (dayListings.length === 1 ? "" : "s") : ", nothing scheduled");
        var cell = el("button", { type: "button", class: "hub-monthcell" + (dayListings.length ? " has-listings" : ""), "aria-label": label, disabled: dayListings.length ? null : "" }, cellChildren);
        if (dayListings.length) {
          cell.addEventListener("click", function () {
            state.selectedDate = iso;
            state.view = "day";
            document.querySelector('input[name="hub-view"][value="day"]').checked = true;
            render();
          });
        } else {
          cell.disabled = true;
        }
        grid.appendChild(cell);
      })(day);
    }
    box.appendChild(grid);
    box.appendChild(el("p", { class: "text-muted", style: "margin-top: var(--space-3)" }, ["A dot marks a day with example listings. Select a marked day to see it in Day view."]));
  }

  function render() {
    var results = DATA.listings.filter(matches);
    var count = document.getElementById("hub-count");
    count.textContent = "Showing " + results.length + " example listing" + (results.length === 1 ? "" : "s");

    var listBox = document.getElementById("hub-list");
    var dayBox = document.getElementById("hub-day");
    var monthBox = document.getElementById("hub-month");
    var emptyBox = document.getElementById("hub-empty");

    listBox.hidden = state.view !== "list";
    dayBox.hidden = state.view !== "day";
    monthBox.hidden = state.view !== "month";
    emptyBox.hidden = !(state.view === "list" && results.length === 0);

    renderTopics();
    if (state.view === "list") renderList(results);
    else if (state.view === "day") renderDay(results);
    else if (state.view === "month") renderMonth(results);
  }

  function init() {
    // Built by hand rather than fillSelect: the visible label needs a
    // " County" suffix, but the option value must stay the plain county name
    // so it matches the data.
    document.getElementById("hub-county").innerHTML = '<option value="">All counties</option>' +
      DATA.counties.map(function (c) { return '<option value="' + c + '">' + c + " County</option>"; }).join("");

    fillSelect(document.getElementById("hub-category"), DATA.categories, "All categories");
    fillSelect(document.getElementById("hub-agency-type"), DATA.agencyTypes, "All agency types");
    fillSelect(document.getElementById("hub-disability"), DATA.disabilityTypes, "All disability types");

    document.getElementById("hub-county").addEventListener("change", function (e) { state.county = e.target.value; render(); });
    document.getElementById("hub-category").addEventListener("change", function (e) { state.category = e.target.value; render(); });
    document.getElementById("hub-agency-type").addEventListener("change", function (e) { state.agencyType = e.target.value; render(); });
    document.getElementById("hub-disability").addEventListener("change", function (e) { state.disabilityType = e.target.value; render(); });
    document.getElementById("hub-search").addEventListener("input", function (e) { state.search = e.target.value; render(); });
    document.getElementById("hub-date").addEventListener("change", function (e) { state.dateFrom = e.target.value; render(); });

    document.getElementById("hub-clear").addEventListener("click", function () {
      state.county = state.category = state.agencyType = state.disabilityType = state.search = state.dateFrom = "";
      document.querySelectorAll("#hub-filters select").forEach(function (s) { s.value = ""; });
      document.getElementById("hub-search").value = "";
      document.getElementById("hub-date").value = "";
      render();
    });

    document.querySelectorAll('input[name="hub-view"]').forEach(function (input) {
      input.addEventListener("change", function (e) { state.view = e.target.value; render(); });
    });

    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
