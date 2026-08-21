#!/usr/bin/env node
/**
 * SC 2.4.9 Link Purpose (Link Only), AAA: a link's purpose must be clear from
 * its text ALONE — not from the sentence, card, or heading around it.
 *
 * Also checks:
 *   SC 3.2.5  no target="_blank" (unrequested change of context)
 *   SC 3.2.4  the same link text must not point at two different places
 *
 * This lint is a floor, not a ceiling. Human review still matters.
 *
 * Usage:  node tools/link-text.mjs
 */
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { htmlFiles, rel, read, mainOf, textOf, report } from "./lib.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const BANNED = [
  "learn more", "read more", "click here", "here", "more", "this page",
  "details", "see more", "find out more", "continue", "go", "link",
  "read", "more info", "more information", "view", "see", "download",
];

let failures = 0;
let checked = 0;
const seen = new Map();   // link text -> Set of hrefs

for (const file of htmlFiles(ROOT)) {
  const html = read(file);
  const main = mainOf(html);
  const where = rel(ROOT, file);

  if (/target=["']_blank["']/.test(html)) {
    console.log(`  FAIL  target="_blank" found — SC 3.2.5 forbids it  ${where}`);
    failures++;
  }
  if (/<meta[^>]+http-equiv=["']refresh["']/i.test(html)) {
    console.log(`  FAIL  <meta refresh> found — SC 2.2.1 / 3.2.5  ${where}`);
    failures++;
  }

  for (const m of main.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const attrs = m[1];
    const href = (attrs.match(/href=["']([^"']*)["']/) || [])[1] ?? "";
    /* Text a screen reader would announce, minus visually-hidden spans. */
    const text = textOf(m[2]).toLowerCase().replace(/[.,:;!?]+$/, "").trim();
    checked++;

    if (!text) {
      console.log(`  FAIL  link with no text  href="${href}"  ${where}`);
      failures++;
      continue;
    }
    if (BANNED.includes(text)) {
      console.log(`  FAIL  non-descriptive link text "${text}"  ${where}`);
      failures++;
      continue;
    }
    if (/^https?:\/\//.test(text)) {
      console.log(`  FAIL  bare URL as link text  ${where}`);
      failures++;
      continue;
    }
    if (href && !href.startsWith("#") && href !== "#") {
      if (!seen.has(text)) seen.set(text, new Set());
      seen.get(text).add(href);
    }
  }
}

/* Same words, different destination: SC 3.2.4 Consistent Identification. */
for (const [text, hrefs] of seen) {
  if (hrefs.size > 1) {
    console.log(`  FAIL  link text "${text}" points to ${hrefs.size} different places: ${[...hrefs].join(", ")}`);
    failures++;
  }
}

report("Link purpose", failures, checked);
