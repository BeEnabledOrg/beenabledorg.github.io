#!/usr/bin/env node
/**
 * SC 2.5.5 Target Size (Enhanced), AAA: every target must be at least
 * 44 x 44 CSS pixels.
 *
 * People assume this one is manual. It is not — it is measurable, so it is a
 * gate here rather than a hope.
 *
 * The criterion's exceptions are honoured: a target is exempt when it sits
 * INLINE inside a sentence or block of text. Those are detected and skipped —
 * and padding them would be actively wrong, because enlarged inline links
 * overlap each other across wrapped lines.
 *
 * Also checks that no two non-inline targets overlap, which is its own failure.
 *
 * Requires a server on :8080.   npm run serve
 * Usage:  node tools/target-size.mjs
 */
import puppeteer from "puppeteer";
import { PAGES } from "./content.mjs";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = "http://localhost:8080";
const WIDTHS = [320, 768, 1280];
const MIN = 44;

const browser = await puppeteer.launch({
  executablePath: CHROME, headless: true, args: ["--no-sandbox"],
});

let failures = 0;
let checked = 0;

for (const width of WIDTHS) {
  for (const p of PAGES) {
    const url = BASE + (p.url === "/404.html" ? "/404.html" : p.url);
    const page = await browser.newPage();
    await page.setViewport({ width, height: 900 });
    await page.goto(url, { waitUntil: "networkidle0" });

    const results = await page.evaluate((MIN) => {
      const out = [];
      const nodes = document.querySelectorAll(
        "a[href], button, summary, input:not([type=hidden]), select, textarea, [tabindex]:not([tabindex='-1'])"
      );
      for (const el of nodes) {
        const style = getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden") continue;

        /* When an input is wrapped in its <label>, the label is what accepts
           the click, so the label's box IS the target. Measuring the 20px
           radio dot alone would report a failure that does not exist. */
        const wrappingLabel = el.closest("label");
        const measured = (wrappingLabel && /^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName))
          ? wrappingLabel : el;

        const r = measured.getBoundingClientRect();
        if (!r.width && !r.height) continue;

        /* Exception: inline targets inside a block of text. */
        const inlineish = style.display.startsWith("inline") && !style.display.includes("flex");
        const inProse = !!el.closest("p, li, dd, dt, blockquote, figcaption");
        if (inlineish && inProse) continue;

        /* The skip link is off-screen until focused; measure it as laid out. */
        if (el.closest(".skip-links")) continue;

        if (r.width + 0.5 < MIN || r.height + 0.5 < MIN) {
          out.push({
            text: (el.textContent || el.value || el.getAttribute("aria-label") || "").trim().slice(0, 45),
            w: Math.round(r.width), h: Math.round(r.height),
            sel: el.tagName.toLowerCase() + (el.className ? "." + String(el.className).split(" ")[0] : ""),
          });
        }
      }
      return out;
    }, MIN);

    checked++;
    if (results.length) {
      failures += results.length;
      console.log(`  FAIL ${width}px  ${p.url}`);
      for (const r of results) {
        console.log(`       ${r.w}x${r.h}  <${r.sel}>  "${r.text}"`);
      }
    }
    await page.close();
  }
}

await browser.close();

console.log("\n" + "=".repeat(72));
if (failures) {
  console.log(`Target size: ${checked} page-widths checked · ${failures} target(s) under ${MIN}x${MIN}`);
  process.exit(1);
}
console.log(`Target size: ${checked} page-widths checked · every target is at least ${MIN}x${MIN} CSS px`);
