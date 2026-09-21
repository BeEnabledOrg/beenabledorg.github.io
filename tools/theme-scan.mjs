#!/usr/bin/env node
/**
 * Runs the WCAG2AAA scan again in every color theme.
 *
 * The default pa11y pass only ever sees the light theme. A wrong token in the
 * dark or high-contrast theme is completely invisible to it, so each theme is a
 * separate rendering condition and needs its own scan. The theme is set the way
 * a real visitor would: by opening the display settings and choosing one.
 *
 * Requires a server on :8080.  npm run serve
 *
 * Usage:  node tools/theme-scan.mjs [theme ...]
 */
import pa11y from "pa11y";
import puppeteer from "puppeteer";
import { PAGES } from "./content.mjs";

const THEMES = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ["light", "dark", "contrast", "warm"];

const BASE = "http://localhost:8080";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const urls = PAGES.map((p) => BASE + (p.url === "/404.html" ? "/404.html" : p.url));

/* One browser for the whole run. Letting pa11y launch its own Chrome per page
   means ~60 cold starts, which is slow and eventually times out. */
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

let total = 0;
let failures = 0;

for (const theme of THEMES) {
  console.log(`\nTheme: ${theme}`);
  console.log("-".repeat(60));

  for (const url of urls) {
    const page = await browser.newPage();
    const result = await pa11y(url, {
      browser,
      page,
      standard: "WCAG2AAA",
      runners: ["htmlcs", "axe"],
      timeout: 60000,
      actions: [
        "wait for element #display-settings to be added",
        "click element #display-settings > summary",
        `click element #display-settings input[name="theme"][value="${theme}"]`,
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
  console.log(`${total} page-theme combinations scanned · ${failures} error(s)`);
  process.exit(1);
}
console.log(`${total} page-theme combinations scanned · all pass`);
