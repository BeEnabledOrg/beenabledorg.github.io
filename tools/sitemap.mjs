#!/usr/bin/env node
/**
 * Generates sitemap.xml from the pages actually present on disk, and checks
 * that the filesystem and the sitemap agree in both directions.
 *
 * <priority> and <changefreq> are deliberately omitted: Google ignores both.
 *
 * Usage:  node tools/sitemap.mjs [--check]
 */
import { readdirSync, writeFileSync, readFileSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://beenabled.org";
const SKIP = new Set(["node_modules", ".git", "tools", "assets"]);

const walk = (dir, out = []) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || SKIP.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
};

/* Last real edit, from git where available, else mtime. */
const lastmod = (file) => {
  try {
    const out = execSync(`git log -1 --format=%cI -- "${relative(ROOT, file)}"`, {
      cwd: ROOT, stdio: ["ignore", "pipe", "ignore"],
    }).toString().trim();
    if (out) return out.slice(0, 10);
  } catch {}
  return statSync(file).mtime.toISOString().slice(0, 10);
};

const urlFor = (file) => {
  const rel = relative(ROOT, file).split("\\").join("/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return "/" + rel.slice(0, -"index.html".length);
  return "/" + rel;
};

const isNoindex = (file) => readFileSync(file, "utf8").includes('name="robots" content="noindex"');

const files = walk(ROOT)
  .filter((f) => !f.endsWith("404.html"))   // never index the error page
  .filter((f) => !isNoindex(f))             // unpublished pages stay out of the sitemap too
  .sort();

const urls = files.map((f) => ({ loc: ORIGIN + urlFor(f), lastmod: lastmod(f) }));

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`).join("\n") +
  `\n</urlset>\n`;

const target = join(ROOT, "sitemap.xml");

if (process.argv.includes("--check")) {
  let current = "";
  try { current = readFileSync(target, "utf8"); } catch {}
  const inSitemap = new Set([...current.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  const onDisk = new Set(urls.map((u) => u.loc));

  const missing = [...onDisk].filter((u) => !inSitemap.has(u));
  const stale = [...inSitemap].filter((u) => !onDisk.has(u));

  if (missing.length || stale.length) {
    missing.forEach((u) => console.log(`  MISSING from sitemap: ${u}`));
    stale.forEach((u) => console.log(`  STALE in sitemap (no such page): ${u}`));
    console.log("\nRun: node tools/sitemap.mjs");
    process.exit(1);
  }
  console.log(`sitemap.xml matches the ${urls.length} pages on disk.`);
} else {
  writeFileSync(target, xml);
  console.log(`sitemap.xml written with ${urls.length} URLs.`);
}
