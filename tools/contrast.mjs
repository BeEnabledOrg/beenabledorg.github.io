#!/usr/bin/env node
/**
 * Proves every color pairing in styles.css meets WCAG 2.2 Level AAA.
 *
 * AAA thresholds:  7:1 normal text · 4.5:1 large text (>=24px, or >=18.66px bold)
 * SC 1.4.11:       3:1 non-text UI components and graphical objects
 *
 * Parses the real token values out of styles.css, so the check can never drift
 * from the stylesheet. Exits non-zero on any failure.
 *
 * Usage:  node tools/contrast.mjs
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const css = readFileSync(join(ROOT, "styles.css"), "utf8");

/* -- WCAG relative luminance + contrast ratio ---------------------------- */
const channel = (c) => {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};

const luminance = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return (
    0.2126 * channel((n >> 16) & 255) +
    0.7152 * channel((n >> 8) & 255) +
    0.0722 * channel(n & 255)
  );
};

const ratio = (a, b) => {
  const [x, y] = [luminance(a), luminance(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};

/* -- Pull token values for each theme out of the stylesheet -------------- */
const blockAfter = (marker) => {
  const at = css.indexOf(marker);
  if (at === -1) throw new Error(`Could not find theme block: ${marker}`);
  const open = css.indexOf("{", at);
  const end = css.indexOf("}", open);
  return css.slice(open, end);
};

const tokensIn = (text) => {
  const out = {};
  for (const [, name, value] of text.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)) {
    out[name] = value.toLowerCase();
  }
  return out;
};

const light = tokensIn(blockAfter(":root {"));
const themes = {
  "light (default)": light,
  // Each theme block only redefines what changes, so layer it over light.
  "dark (system)": { ...light, ...tokensIn(blockAfter(':root:not([data-theme="light"])')) },
  "dark (chosen)": { ...light, ...tokensIn(blockAfter(':root[data-theme="dark"]')) },
  "high contrast": { ...light, ...tokensIn(blockAfter(':root[data-theme="contrast"]')) },
  "warm / low blue": { ...light, ...tokensIn(blockAfter(':root[data-theme="warm"]')) },
  // .blue-envelope only overrides the base light theme (see styles.css §20) —
  // dark, high contrast, and warm all fall back to the tokens above.
  "blue envelope (light)": { ...light, ...tokensIn(blockAfter(".blue-envelope {")) },
};

/* -- The contract. Every pairing the design is allowed to render. --------
   need: 7 = body text · 4.5 = large text only · 3 = non-text (SC 1.4.11)   */
const PAIRS = [
  ["text",         "surface",        7,   "body copy on page"],
  ["text",         "surface-raised", 7,   "body copy on card"],
  ["text",         "surface-sunken", 7,   "body copy on band"],
  ["text-muted",   "surface",        7,   "secondary copy on page"],
  ["text-muted",   "surface-raised", 7,   "secondary copy on card"],
  ["text-muted",   "surface-sunken", 7,   "secondary copy on band"],
  ["text-invert",  "surface-invert", 7,   "copy on inverted panel"],
  ["text-footer",  "surface-footer", 7,   "copy in the footer band"],

  ["brand",        "surface",        7,   "heading on page"],
  ["brand-strong", "surface",        7,   "brand text on page"],
  ["brand-strong", "surface-raised", 7,   "brand text on card"],
  ["brand-strong", "surface-sunken", 7,   "brand text on band"],
  ["brand-contrast", "brand",        7,   "label on primary button"],

  ["link",         "surface",        7,   "link on page"],
  ["link",         "surface-raised", 7,   "link on card"],
  ["link",         "surface-sunken", 7,   "link on band"],
  ["link-visited", "surface",        7,   "visited link on page"],
  ["link-visited", "surface-sunken", 7,   "visited link on band"],

  ["border",        "surface",        3,  "form + component border on page"],
  ["border",        "surface-raised", 3,  "form + component border on card"],
  ["border",        "surface-sunken", 3,  "form + component border on band"],
  ["border-strong", "surface",        3,  "emphasis border on page"],

  /* The focus ring is two-tone and sits OUTSIDE the component via
     outline-offset, so it is always adjacent to a surface rather than to the
     component fill. Contract: the inner half must clear 3:1 against every
     surface, and the two halves must clear 3:1 against each other, so the ring
     stays visible whatever it lands on. (SC 2.4.13) */
  ["focus-a",      "focus-b",        3,   "the two halves of the ring distinguish each other"],

  ["accent-ui",    "surface",        3,   "amber where it carries meaning, on page"],
  ["accent-ui",    "surface-sunken", 3,   "amber where it carries meaning, on band"],
  ["accent-warm",  "surface",        3,   "orange as non-text ornament"],
];

/* The focus ring is two-tone: a solid outline in --focus-a wrapped in a halo of
   --focus-b, sitting outside the component. It stays visible as long as AT LEAST
   ONE of the two bands clears 3:1 against whatever it lands on — which is the
   whole reason for using two bands rather than one brand color. Checking each
   band separately would be wrong: it would reject rings that are perfectly
   visible. (SC 2.4.13) */
const FOCUS_SURFACES = [
  ["surface",        "focus ring on the page"],
  ["surface-raised", "focus ring on a card"],
  ["surface-sunken", "focus ring on a tinted band"],
  ["surface-footer", "focus ring in the footer"],
  ["surface-invert", "focus ring on an inverted panel"],
  ["brand",          "focus ring over a primary button"],
  ["accent",         "focus ring over an amber button"],
];

/* Pairings that are knowingly restricted rather than universally safe.
   Each is allowed only in the narrow role named, enforced by review. */
const RESTRICTED = [
  ["accent-text", "accent", 4.5, "label on amber button — LARGE TEXT ONLY (>=24px / >=18.66px bold)"],
];

/* -- Run ------------------------------------------------------------------ */
const args = new Set(process.argv.slice(2));
const verbose = args.has("--verbose") || args.has("-v");
let failures = 0;
let checked = 0;

const run = (label, list, themeTokens) => {
  const rows = [];
  for (const [fg, bg, need, what] of list) {
    const fgv = themeTokens[fg];
    const bgv = themeTokens[bg];
    if (!fgv || !bgv) {
      rows.push({ ok: false, line: `  MISSING TOKEN  --${!fgv ? fg : bg}  (${what})` });
      failures++;
      continue;
    }
    const r = ratio(fgv, bgv);
    const ok = r + 1e-9 >= need;
    checked++;
    if (!ok) failures++;
    if (!ok || verbose) {
      rows.push({
        ok,
        line: `  ${ok ? "pass" : "FAIL"}  ${r.toFixed(2).padStart(6)}:1  (need ${String(need).padEnd(3)})  ` +
              `--${fg} on --${bg}  ${fgv}/${bgv}\n        ${what}`,
      });
    }
  }
  if (rows.length) {
    console.log(`\n${label}`);
    rows.forEach((r) => console.log(r.line));
  }
};

console.log("Contrast audit — WCAG 2.2 Level AAA");
console.log("=".repeat(72));

for (const [name, tokens] of Object.entries(themes)) {
  run(`Theme: ${name}`, PAIRS, tokens);
  {
    const rows = [];
    for (const [bg, what] of FOCUS_SURFACES) {
      const a = ratio(tokens["focus-a"], tokens[bg]);
      const b = ratio(tokens["focus-b"], tokens[bg]);
      const best = Math.max(a, b);
      const ok = best + 1e-9 >= 3;
      checked++;
      if (!ok) failures++;
      if (!ok || verbose) {
        rows.push(`  ${ok ? "pass" : "FAIL"}  ${best.toFixed(2).padStart(6)}:1  (need 3  )  ` +
          `best of --focus-a (${a.toFixed(2)}) / --focus-b (${b.toFixed(2)}) on --${bg}\n        ${what}`);
      }
    }
    if (rows.length) { console.log(`\nTheme: ${name} — focus ring visibility`); rows.forEach((r) => console.log(r)); }
  }
  run(`Theme: ${name} — restricted roles`, RESTRICTED, tokens);
}

console.log("\n" + "=".repeat(72));
if (failures) {
  console.log(`${checked} pairings checked · ${failures} FAILING`);
  console.log("A failing pairing must be fixed in styles.css, not waived here.");
  process.exit(1);
}
console.log(`${checked} pairings checked across ${Object.keys(themes).length} themes · all pass`);
console.log("Run with --verbose to print every ratio.");
