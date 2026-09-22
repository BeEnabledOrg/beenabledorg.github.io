#!/usr/bin/env node
/**
 * Runs the WCAG2AAA scan again in every color condition a visitor can be in.
 *
 * The default pa11y pass only ever sees one theme. A wrong token in the dark
 * or high-contrast theme is completely invisible to it, so each theme is a
 * separate rendering condition and needs its own scan. The theme is set the
 * way a real visitor would: by opening the display settings and choosing one.
 *
 * Two of the conditions are not choices at all. "Match my device" is the
 * default, and it means the site follows prefers-color-scheme — so the same
 * default renders two different palettes depending on the device. Both are
 * scanned, with the OS preference emulated explicitly so the result never
 * depends on the appearance setting of whichever machine runs the check.
 *
 * Uses the Chromium that pa11y's own puppeteer bundles, the same browser
 * `npm run check:a11y` uses, so the two scans cannot disagree about the
 * engine. (pa11y's axe build misreads closed <details> content in newer
 * system Chromes and reports hundreds of false contrast errors.)
 *
 * Requires a server on :8080.  npm run serve
 *
 * Usage:  node tools/theme-scan.mjs [condition ...]
 *         conditions: light dark contrast warm auto-light auto-dark
 */
import pa11y from "pa11y";
import puppeteer from "puppeteer";
import { PAGES } from "./content.mjs";

const CONDITIONS = {
  "light":      { choose: "light",    scheme: "light", label: "Light (chosen)" },
  "dark":       { choose: "dark",     scheme: "light", label: "Dark (chosen)" },
  "contrast":   { choose: "contrast", scheme: "light", label: "High contrast (chosen)" },
  "warm":       { choose: "warm",     scheme: "light", label: "Warm (chosen)" },
  "auto-light": { choose: "auto",     scheme: "light", label: "Match my device, on a light device" },
  "auto-dark":  { choose: "auto",     scheme: "dark",  label: "Match my device, on a dark device" },
};

const wanted = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(CONDITIONS);
for (const name of wanted) {
  if (!CONDITIONS[name]) {
    console.error(`Unknown condition "${name}". Use: ${Object.keys(CONDITIONS).join(" ")}`);
    process.exit(2);
  }
}

const BASE = "http://localhost:8080";
const urls = PAGES.map((p) => BASE + p.url);

/* One browser for the whole run. Letting pa11y launch its own Chrome per page
   means ~100 cold starts, which is slow and eventually times out. */
const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

let total = 0;
let failures = 0;

for (const name of wanted) {
  const condition = CONDITIONS[name];
  console.log(`\n${condition.label}`);
  console.log("-".repeat(60));

  for (const url of urls) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 1024 });
    await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: condition.scheme }]);

    const result = await pa11y(url, {
      browser,
      page,
      standard: "WCAG2AAA",
      runners: ["htmlcs", "axe"],
      timeout: 60000,
      actions: [
        "wait for element #display-settings to be added",
        "click element #display-settings > summary",
        `click element #display-settings input[name="theme"][value="${condition.choose}"]`,
        "wait for element body to be visible",
      ],
    });

    await page.close();

    total++;
    const errors = result.issues.filter((i) => i.type === "error");
    if (errors.length) {
      failures += errors.length;
      console.log(`  FAIL ${url}  ${errors.length} error(s)`);
      for (const e of errors.slice(0, 6)) {
        console.log(`       ${e.code}\n       ${e.message}\n       ${e.selector}`);
      }
    } else {
      console.log(`  pass ${url}`);
    }
  }
}

await browser.close();

console.log("\n" + "=".repeat(60));
if (failures) {
  console.log(`${total} page-condition combinations scanned · ${failures} error(s)`);
  process.exit(1);
}
console.log(`${total} page-condition combinations scanned · all pass`);
