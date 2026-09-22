#!/usr/bin/env node
/**
 * SEO and structural checks, plus the accessibility criteria that live in the
 * same markup:
 *   SC 2.4.2  descriptive, unique page titles
 *   SC 1.3.1  exactly one h1, no skipped heading levels
 *   SC 2.4.10 section headings
 *   SC 3.1.1  page language
 * and: canonical, Open Graph and Twitter completeness, valid JSON-LD, and
 * internal links (including #fragments) that actually resolve.
 *
 * Usage:  node tools/seo-check.mjs
 */
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { htmlFiles, rel, read, mainOf, report } from "./lib.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const files = htmlFiles(ROOT);

let failures = 0;
let checked = 0;
const fail = (where, msg) => { console.log(`  FAIL  ${msg}\n        ${where}`); failures++; };

const titles = new Map();
const descriptions = new Map();
const idsByPage = new Map();

/* Pass 1: collect every id, so fragment links can be resolved in pass 2. */
for (const file of files) {
  const html = read(file);
  const ids = new Set([...html.matchAll(/\sid=["']([^"']+)["']/g)].map((m) => m[1]));
  idsByPage.set(rel(ROOT, file), ids);
}

const pageKeyFor = (href) => {
  const path = href.split("#")[0];
  if (path === "/" || path === "") return "index.html";
  const trimmed = path.replace(/^\//, "");
  return trimmed.endsWith(".html") ? trimmed : trimmed.replace(/\/$/, "") + "/index.html";
};

for (const file of files) {
  const html = read(file);
  const where = rel(ROOT, file);
  checked++;

  const one = (re) => (html.match(re) || [])[1];

  /* -- Language, title, description, canonical -------------------------- */
  if (!/<html[^>]+lang=["'][a-z]{2}/i.test(html)) fail(where, "missing lang on <html> (SC 3.1.1)");

  const title = one(/<title>([^<]*)<\/title>/);
  if (!title) fail(where, "missing <title> (SC 2.4.2)");
  else {
    if (title.length > 65) fail(where, `<title> is ${title.length} chars, over the 65 limit: "${title}"`);
    if (titles.has(title)) fail(where, `<title> duplicates ${titles.get(title)}`);
    titles.set(title, where);
  }

  const desc = one(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/);
  if (!desc) fail(where, "missing meta description");
  else {
    if (desc.length < 70 || desc.length > 175)
      fail(where, `meta description is ${desc.length} chars, outside 70-175`);
    if (descriptions.has(desc)) fail(where, `meta description duplicates ${descriptions.get(desc)}`);
    descriptions.set(desc, where);
  }

  const canonical = one(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/);
  if (!canonical) fail(where, "missing canonical link");
  else if (!canonical.startsWith("https://beenabled.org"))
    fail(where, `canonical is not absolute on the live origin: ${canonical}`);

  /* -- Social cards --------------------------------------------------------
     No og:image/twitter:image on purpose: the only artwork that existed was
     the placeholder wheel mark, and no logo has been settled yet (see
     CONTENT-TODO.md, "Logo — not yet settled"). Add those two back here once
     there is a real image to point at. */
  for (const prop of ["og:title", "og:description", "og:url", "og:type"]) {
    if (!new RegExp(`property=["']${prop}["']`).test(html)) fail(where, `missing ${prop}`);
  }
  for (const name of ["twitter:card", "twitter:title", "twitter:description"]) {
    if (!new RegExp(`name=["']${name}["']`).test(html)) fail(where, `missing ${name}`);
  }

  /* -- Headings ---------------------------------------------------------- */
  const h1s = [...html.matchAll(/<h1\b[^>]*>/gi)];
  if (h1s.length !== 1) fail(where, `${h1s.length} <h1> elements; there must be exactly one (SC 1.3.1)`);

  const levels = [...html.matchAll(/<h([1-6])\b[^>]*>/gi)].map((m) => Number(m[1]));
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1] + 1)
      fail(where, `heading level jumps from h${levels[i - 1]} to h${levels[i]} (SC 1.3.1)`);
  }

  /* -- Landmarks --------------------------------------------------------- */
  if (!/<main\b/.test(html)) fail(where, "no <main> landmark");
  if (!/class="skip-links"/.test(html)) fail(where, "no skip link (SC 2.4.1)");

  /* -- JSON-LD ----------------------------------------------------------- */
  for (const m of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(m[1]); }
    catch (e) { fail(where, `JSON-LD does not parse: ${e.message}`); }
  }

  /* -- Internal links resolve, fragments included ------------------------ */
  for (const m of mainOf(html).matchAll(/href=["'](\/[^"'#]*(?:#[^"']*)?|#[^"']+)["']/g)) {
    const href = m[1];
    if (href === "#") continue;   // deliberate TODO placeholder

    const [path, frag] = href.split("#");
    const key = path ? pageKeyFor(href) : where;

    if (path && !existsSync(join(ROOT, key)))
      fail(where, `internal link goes nowhere: ${href}`);
    else if (frag && idsByPage.has(key) && !idsByPage.get(key).has(frag))
      fail(where, `link fragment does not exist: ${href}`);
  }
}

/* -- Site-level files ---------------------------------------------------- */
for (const f of ["robots.txt", "sitemap.xml", "CNAME", ".nojekyll", "404.html", "styles.css", "app.js"]) {
  if (!existsSync(join(ROOT, f))) fail("(site root)", `missing ${f}`);
}

report("SEO and structure", failures, checked);
