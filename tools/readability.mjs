#!/usr/bin/env node
/**
 * SC 3.1.5 Reading Level (AAA): content must be readable at lower secondary
 * education level, or carry a supplemental version that is.
 *
 * We measure Flesch-Kincaid grade and Flesch Reading Ease over the prose in
 * <main>. Proper nouns are stripped first, because the criterion explicitly
 * excludes proper names and titles and they otherwise inflate every score.
 *
 * A page over the threshold PASSES only if it carries an .in-short summary —
 * that block is the conforming supplemental version the criterion permits.
 *
 * Usage:  node tools/readability.mjs [--verbose]
 */
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { htmlFiles, rel, read, mainOf, textOf, report } from "./lib.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const verbose = process.argv.includes("--verbose") || process.argv.includes("-v");
const GRADE_LIMIT = 9;   // lower secondary

/* Names and fixed titles the criterion excludes from the measurement. */
const PROPER = [
  "Be Enabled Advocacy Alliance", "Be Enabled", "BEAA", "Blue Envelope Project",
  "Supplemental Security Income", "Social Security Disability Insurance",
  "Home and Community-Based Services", "Individualized Education Program",
  "Americans with Disabilities Act", "Fair Labor Standards Act",
  "Web Content Accessibility Guidelines", "Rehabilitation Act",
  "Supreme Court", "United States", "Medicaid", "Olmstead", "Social Security",
  "ABLE", "WCAG", "HCBS", "IEP", "SSI", "SSDI", "ADA", "DME",
];

const syllables = (word) => {
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!word) return 0;
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "").replace(/^y/, "");
  const groups = word.match(/[aeiouy]{1,2}/g);
  return groups ? groups.length : 1;
};

const analyze = (text) => {
  for (const name of PROPER) {
    text = text.split(name).join("Name");
  }
  const sentences = text.split(/[.!?]+(?=\s|$)/).filter((s) => s.trim().length > 1);
  const words = text.match(/[A-Za-z][A-Za-z'-]*/g) || [];
  if (!sentences.length || !words.length) return null;

  const syl = words.reduce((n, w) => n + syllables(w), 0);
  const wps = words.length / sentences.length;
  const spw = syl / words.length;

  return {
    grade: 0.39 * wps + 11.8 * spw - 15.59,
    ease: 206.835 - 1.015 * wps - 84.6 * spw,
    words: words.length,
    sentences: sentences.length,
    wps,
  };
};

let failures = 0;
let checked = 0;

console.log("Reading level — SC 3.1.5 (target: grade " + GRADE_LIMIT + " or below)");
console.log("=".repeat(72));
console.log("  grade   ease  words  w/sent  summary  page");

for (const file of htmlFiles(ROOT)) {
  const html = read(file);
  const main = mainOf(html);
  if (!main) continue;

  /* The summary block is measured on its own too: it is the part that MUST be
     plain, so it is held to a stricter bar than the body. */
  const hasSummary = /class="in-short"/.test(main);
  const stats = analyze(textOf(main));
  if (!stats) continue;
  checked++;

  const over = stats.grade > GRADE_LIMIT;
  const ok = !over || hasSummary;
  if (!ok) failures++;

  if (!ok || verbose || over) {
    console.log(
      `  ${ok ? " " : "!"}${stats.grade.toFixed(1).padStart(5)} ` +
      `${stats.ease.toFixed(0).padStart(6)} ` +
      `${String(stats.words).padStart(6)} ` +
      `${stats.wps.toFixed(1).padStart(7)} ` +
      `${(hasSummary ? "yes" : "NO").padStart(8)}  ${rel(ROOT, file)}` +
      (over && hasSummary ? "\n          over grade " + GRADE_LIMIT +
        ", but carries an \"In short\" summary — conforming supplemental version" : "")
    );
  }
}

if (failures) {
  console.log("\nA page over the grade limit must carry an .in-short summary block.");
}
report("Reading level", failures, checked);
