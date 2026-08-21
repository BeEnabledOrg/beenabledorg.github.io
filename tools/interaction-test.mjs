#!/usr/bin/env node
/**
 * Functional smoke test of the three JavaScript enhancements, plus the reflow
 * requirements that only show up in a real engine.
 *
 * Requires a server on :8080.   npm run serve
 * Usage:  node tools/interaction-test.mjs
 */
import puppeteer from "puppeteer";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = "http://localhost:8080";
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--no-sandbox"] });

let pass = 0, fail = 0;
const check = (name, ok, detail = "") => {
  if (ok) { pass++; console.log(`  pass  ${name}`); }
  else { fail++; console.log(`  FAIL  ${name}${detail ? "\n        " + detail : ""}`); }
};

const newPage = async (w = 1280, h = 900) => {
  const p = await browser.newPage();
  await p.setViewport({ width: w, height: h });
  await p.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "light" }]);
  return p;
};

/* -- Mobile nav disclosure --------------------------------------------- */
console.log("\nMobile navigation (SC 2.1.1, 2.1.2, 4.1.2)");
{
  const p = await newPage(390, 844);
  await p.goto(BASE + "/", { waitUntil: "networkidle0" });

  const closed = await p.evaluate(() => {
    const t = document.querySelector(".nav-toggle");
    const menuIcon = getComputedStyle(document.querySelector(".nav-toggle__icon--menu")).display;
    const closeIcon = getComputedStyle(document.querySelector(".nav-toggle__icon--close")).display;
    const linkVisible = document.querySelector(".nav__link").getBoundingClientRect().height > 0;
    return { open: t.open, menuIcon, closeIcon, linkVisible };
  });
  check("menu starts closed", closed.open === false);
  check("closed state shows the hamburger, not the X",
        closed.menuIcon !== "none" && closed.closeIcon === "none",
        `menu=${closed.menuIcon} close=${closed.closeIcon}`);
  check("nav links are hidden while closed", closed.linkVisible === false);

  await p.click(".nav-toggle > summary");
  const opened = await p.evaluate(() => ({
    open: document.querySelector(".nav-toggle").open,
    menuIcon: getComputedStyle(document.querySelector(".nav-toggle__icon--menu")).display,
    closeIcon: getComputedStyle(document.querySelector(".nav-toggle__icon--close")).display,
    linkVisible: document.querySelector(".nav__link").getBoundingClientRect().height > 0,
  }));
  check("clicking opens the menu", opened.open === true);
  check("open state shows the X, not the hamburger",
        opened.closeIcon !== "none" && opened.menuIcon === "none");
  check("nav links become visible", opened.linkVisible === true);

  await p.keyboard.press("Escape");
  const afterEsc = await p.evaluate(() => ({
    open: document.querySelector(".nav-toggle").open,
    focusOnSummary: document.activeElement === document.querySelector(".nav-toggle > summary"),
  }));
  check("Escape closes the menu", afterEsc.open === false);
  check("Escape returns focus to the toggle", afterEsc.focusOnSummary === true);
  await p.close();
}

/* -- Display settings --------------------------------------------------- */
console.log("\nDisplay settings (SC 1.4.8, 2.3.3, 4.1.3)");
{
  const p = await newPage();
  await p.goto(BASE + "/", { waitUntil: "networkidle0" });
  await p.click("#display-settings > summary");

  await p.click('#display-settings input[name="theme"][value="dark"]');
  check("choosing dark sets data-theme",
        (await p.evaluate(() => document.documentElement.getAttribute("data-theme"))) === "dark");
  check("the choice is persisted",
        (await p.evaluate(() => localStorage.getItem("beaa-theme"))) === "dark");

  await p.click('#display-settings input[name="text-size"][value="150"]');
  check("text size 150 is applied",
        (await p.evaluate(() => document.documentElement.getAttribute("data-text-size"))) === "150");

  await p.click('#display-settings input[name="motion"][value="reduce"]');
  check("reduce motion is applied",
        (await p.evaluate(() => document.documentElement.getAttribute("data-motion"))) === "reduce");

  await new Promise((r) => setTimeout(r, 200));
  const announced = await p.evaluate(() => document.querySelector("[data-settings-status]").textContent.trim());
  check("changes are announced in a live region", announced.length > 0, `announced: "${announced}"`);

  /* Survives a reload without a flash of the wrong theme. */
  await p.reload({ waitUntil: "networkidle0" });
  check("settings survive a reload",
        (await p.evaluate(() => document.documentElement.getAttribute("data-theme"))) === "dark");
  const radioReflects = await p.evaluate(() =>
    document.querySelector('#display-settings input[name="theme"][value="dark"]').checked);
  check("controls reflect the saved state after reload", radioReflects === true);

  await p.click("#display-settings > summary");
  await p.click("[data-settings-reset]");
  check("reset clears every setting",
        (await p.evaluate(() => document.documentElement.getAttribute("data-theme"))) === null);
  await p.close();
}

/* -- Contact form ------------------------------------------------------- */
console.log("\nContact form (SC 3.3.1, 3.3.3, 3.3.6)");
{
  const p = await newPage();
  await p.goto(BASE + "/contact/", { waitUntil: "networkidle0" });

  await p.click('button[type="submit"]');
  const err = await p.evaluate(() => ({
    text: document.querySelector("#cf-message-error").textContent.trim(),
    invalid: document.querySelector("#cf-message").getAttribute("aria-invalid"),
    described: document.querySelector("#cf-message").getAttribute("aria-describedby"),
    focused: document.activeElement.id,
  }));
  check("empty submit shows a visible error", err.text.length > 0, err.text);
  check("the field is marked aria-invalid", err.invalid === "true");
  check("the error is linked by aria-describedby", (err.described || "").includes("cf-message-error"));
  check("focus moves to the first bad field", err.focused === "cf-message");

  await p.type("#cf-message", "The lift at my station has been broken for three weeks.");
  await p.type("#cf-email", "not-an-email");
  await p.click('button[type="submit"]');
  const emailErr = await p.evaluate(() => document.querySelector("#cf-email-error").textContent.trim());
  check("a malformed email is caught", emailErr.length > 0);

  await p.evaluate(() => { document.querySelector("#cf-email").value = ""; });
  await p.click('button[type="submit"]');
  const review = await p.evaluate(() => ({
    shown: !!document.querySelector("#cf-review-heading"),
    focused: document.activeElement.id,
    hasSend: !!document.querySelector("[data-really-send]"),
    hasBack: !!document.querySelector("[data-go-back]"),
    body: document.querySelector("[data-form-status]").textContent,
  }));
  check("a valid submit shows the review step first (SC 3.3.6)", review.shown === true);
  check("focus moves to the review heading", review.focused === "cf-review-heading");
  check("the review offers both send and go-back", review.hasSend && review.hasBack);
  check("the review reads the message back", review.body.includes("broken for three weeks"));
  check("nothing was sent yet", review.body.includes("Nothing has been sent yet"));

  await p.click("[data-go-back]");
  check("go-back returns to the form",
        (await p.evaluate(() => !document.querySelector("#cf-review-heading"))) === true);
  await p.close();
}

/* -- Reflow and zoom ---------------------------------------------------- */
console.log("\nReflow and zoom (SC 1.4.4, 1.4.10, 1.4.8)");
{
  for (const [w, label] of [[320, "320px wide"], [1280, "1280px wide"]]) {
    const p = await newPage(w, 900);
    await p.goto(BASE + "/what-we-do/housing/", { waitUntil: "networkidle0" });
    const overflow = await p.evaluate(() =>
      document.documentElement.scrollWidth - document.documentElement.clientWidth);
    check(`no horizontal scrolling at ${label}`, overflow <= 1, `overflows by ${overflow}px`);
    await p.close();
  }

  /* 400% zoom is equivalent to a 320px-wide viewport at 1280 logical px. */
  const p = await newPage(1280, 900);
  await p.goto(BASE + "/", { waitUntil: "networkidle0" });
  await p.evaluate(() => { try { localStorage.setItem("beaa-text-size", "200"); } catch (e) {} });
  await p.reload({ waitUntil: "networkidle0" });
  const overflow200 = await p.evaluate(() =>
    document.documentElement.scrollWidth - document.documentElement.clientWidth);
  check("no horizontal scrolling at 200% text size", overflow200 <= 1, `overflows by ${overflow200}px`);

  /* SC 1.4.8: line length must stay under 80 characters. */
  const measure = await p.evaluate(() => {
    const p1 = document.querySelector("main p");
    const cs = getComputedStyle(p1);
    const probe = document.createElement("span");
    probe.style.font = cs.font; probe.style.visibility = "hidden";
    probe.textContent = "0".repeat(80);
    document.body.appendChild(probe);
    const eighty = probe.getBoundingClientRect().width;
    probe.remove();
    return { width: p1.getBoundingClientRect().width, eighty, align: cs.textAlign };
  });
  check("prose stays under an 80-character measure", measure.width <= measure.eighty,
        `${Math.round(measure.width)}px vs ${Math.round(measure.eighty)}px for 80 chars`);
  check("text is never justified", measure.align !== "justify");
  await p.close();
}

await browser.close();
console.log("\n" + "=".repeat(72));
console.log(`Interaction tests: ${pass} passed, ${fail} failed`);
if (fail) process.exit(1);
