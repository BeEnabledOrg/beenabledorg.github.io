#!/usr/bin/env node
/**
 * Keeps the shared header and footer byte-identical across every page.
 *
 * Duplicated markup is fine; SILENT DRIFT is not. This is what mechanically
 * guarantees SC 3.2.3 Consistent Navigation and SC 3.2.6 Consistent Help —
 * criteria that are otherwise pure discipline and always eventually break.
 *
 * The only per-page variation allowed inside a managed block is
 * aria-current="page", which is normalised away before comparing.
 *
 * Usage:
 *   node tools/sync-partials.mjs            check for drift (exit 1 if found)
 *   node tools/sync-partials.mjs --fix      rewrite every page from page 1
 */
import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { htmlFiles, rel, read, report } from "./lib.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const fix = process.argv.includes("--fix");
const NAMES = ["header", "footer"];

const blockOf = (html, name) => {
  const re = new RegExp(
    `([ \\t]*<!-- @partial:${name}[^>]*-->)([\\s\\S]*?)([ \\t]*<!-- /@partial:${name} -->)`
  );
  const m = html.match(re);
  return m ? { full: m[0], inner: m[2], re } : null;
};

/* aria-current marks the current page and is legitimately per-page. */
const normalise = (s) => s.replace(/ aria-current="page"/g, "").replace(/\s+/g, " ").trim();

const files = htmlFiles(ROOT);
let failures = 0;
let checked = 0;

for (const name of NAMES) {
  const reference = files
    .map((f) => ({ f, b: blockOf(read(f), name) }))
    .find((x) => x.b);

  if (!reference) {
    console.log(`  no @partial:${name} block found in any page`);
    failures++;
    continue;
  }

  const want = normalise(reference.b.inner);

  for (const file of files) {
    const html = read(file);
    const block = blockOf(html, name);
    checked++;

    if (!block) {
      console.log(`  MISSING @partial:${name}  ${rel(ROOT, file)}`);
      failures++;
      continue;
    }
    if (normalise(block.inner) === want) continue;

    if (fix) {
      /* Preserve this page's own aria-current placement by re-deriving it from
         the page's existing block rather than clobbering it. */
      const current = [...block.inner.matchAll(/href="([^"]+)"[^>]*aria-current="page"/g)]
        .map((m) => m[1]);
      let inner = reference.b.inner.replace(/ aria-current="page"/g, "");
      for (const href of current) {
        inner = inner.replace(
          new RegExp(`(<a[^>]*href="${href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}")`),
          "$1 aria-current=\"page\""
        );
      }
      writeFileSync(file, html.replace(block.re, `$1${inner}$3`));
      console.log(`  fixed   ${name.padEnd(7)} ${rel(ROOT, file)}`);
    } else {
      console.log(`  DRIFT   ${name.padEnd(7)} ${rel(ROOT, file)}`);
      failures++;
    }
  }
}

if (fix) {
  console.log("\nPartials synced. Re-run without --fix to confirm.");
} else {
  if (failures) console.log("\nEdit tools/partials/*.html, then run: node tools/sync-partials.mjs --fix");
  report("Partial consistency", failures, checked);
}
