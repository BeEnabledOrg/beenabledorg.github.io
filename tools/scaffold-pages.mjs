#!/usr/bin/env node
/**
 * One-time scaffold: assembles every page from tools/content.mjs and the shared
 * partials in tools/partials/, then writes plain static HTML.
 *
 * After the first run the emitted .html files are the source of truth for page
 * CONTENT and may be hand-edited freely. Only the regions between
 *   <!-- @partial:name --> ... <!-- /@partial:name -->
 * are managed; tools/sync-partials.mjs keeps those identical across all pages,
 * which is what mechanically guarantees SC 3.2.3 Consistent Navigation and
 * SC 3.2.6 Consistent Help.
 *
 * Usage:  node tools/scaffold-pages.mjs [--force]
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PAGES, SITE } from "./content.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const force = process.argv.includes("--force");
const read = (p) => readFileSync(join(ROOT, p), "utf8").trimEnd();

const wheel = read("tools/partials/wheel.svg");
const headerTpl = read("tools/partials/header.html");
const footerTpl = read("tools/partials/footer.html");

/* Wrap a partial in its managed markers. */
const managed = (name, html) =>
  `  <!-- @partial:${name} — managed by tools/sync-partials.mjs. Do not hand-edit. -->\n${html}\n  <!-- /@partial:${name} -->`;

const headerFor = (page) => {
  let h = headerTpl.replace("__WHEEL__", wheel.split("\n").map((l, i) => (i ? "        " + l : l)).join("\n"));
  // SC 2.4.8 Location — mark the current top-level section.
  for (const [token, prefix] of [
    ["__CUR_ABOUT__", "/about/"],
    ["__CUR_WHAT__", "/what-we-do/"],
    ["__CUR_BLUE__", "/blue-envelope/"],
    ["__CUR_GET__", "/get-involved/"],
    ["__CUR_CONTACT__", "/contact/"],
  ]) {
    const current = page.url === prefix || (prefix !== "/" && page.url.startsWith(prefix));
    h = h.replace(token, current ? ' aria-current="page"' : "");
  }
  return h;
};

const breadcrumb = (page) => {
  if (!page.trail?.length) return "";
  const items = [{ name: "Home", url: "/" }, ...page.trail];
  const lis = [
    ...items.map((i) => `          <li><a href="${i.url}">${i.name}</a></li>`),
    `          <li><span aria-current="page">${page.crumb ?? page.h1}</span></li>`,
  ].join("\n");
  return `
    <nav class="wrap breadcrumb" aria-label="Breadcrumb">
      <h2 class="visually-hidden">Where you are</h2>
      <ol class="breadcrumb__list">
${lis}
        </ol>
    </nav>`;
};

/* JSON-LD. The organization is emitted once with a stable @id and referenced
   by @id everywhere else, so the graph stays consistent across pages. */
const jsonld = (page) => {
  const graph = [];
  if (page.url === "/") {
    graph.push({
      "@type": "NGO",
      "@id": `${SITE.origin}/#org`,
      name: SITE.name,
      alternateName: "BEAA",
      url: `${SITE.origin}/`,
      slogan: SITE.slogan,
      description: SITE.description,
      nonprofitStatus: "Nonprofit501c3",
      areaServed: { "@type": "Country", name: "United States" },
      knowsAbout: [
        "Disability rights", "Housing access", "Healthcare access",
        "Special education", "Accessible transportation", "Disability benefits",
        "Assistive technology",
      ],
    });
    graph.push({
      "@type": "WebSite",
      "@id": `${SITE.origin}/#website`,
      url: `${SITE.origin}/`,
      name: SITE.name,
      publisher: { "@id": `${SITE.origin}/#org` },
      inLanguage: "en-US",
    });
  }
  graph.push({
    "@type": "WebPage",
    "@id": `${SITE.origin}${page.url}#page`,
    url: `${SITE.origin}${page.url}`,
    name: page.title,
    description: page.description,
    isPartOf: { "@id": `${SITE.origin}/#website` },
    about: { "@id": `${SITE.origin}/#org` },
    inLanguage: "en-US",
  });
  if (page.trail?.length) {
    const items = [{ name: "Home", url: "/" }, ...page.trail, { name: page.crumb ?? page.h1, url: page.url }];
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${SITE.origin}${page.url}#breadcrumb`,
      itemListElement: items.map((i, n) => ({
        "@type": "ListItem",
        position: n + 1,
        name: i.name,
        item: `${SITE.origin}${i.url}`,
      })),
    });
  }
  if (page.schema) graph.push(...page.schema);
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2)
    .split("\n").map((l) => "    " + l).join("\n");
};

const render = (page) => {
  const canonical = `${SITE.origin}${page.url}`;
  const og = `${SITE.origin}/assets/img/og-default.png`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <!-- No maximum-scale and no user-scalable=no: those break SC 1.4.4 Resize Text. -->
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <link rel="canonical" href="${canonical}">

  <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#0b1817" media="(prefers-color-scheme: dark)">

  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${SITE.name}">
  <meta property="og:locale" content="en_US">
  <meta property="og:title" content="${page.title}">
  <meta property="og:description" content="${page.description}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${og}">
  <meta property="og:image:alt" content="${SITE.name}. ${SITE.slogan}.">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${page.title}">
  <meta name="twitter:description" content="${page.description}">
  <meta name="twitter:image" content="${og}">
  <meta name="twitter:image:alt" content="${SITE.name}. ${SITE.slogan}.">

  <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
  <link rel="preload" href="/assets/fonts/atkinson-hyperlegible-400-normal-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/styles.css">

  <!-- Applies saved display settings before first paint. This has to be inline
       and synchronous: without it the page flashes the default theme, which for
       a light-sensitive or migraine-affected reader is a real harm, not a
       cosmetic one. Fails silently where storage is blocked. -->
  <script>
    (function () {
      try {
        var d = document.documentElement, s = localStorage;
        var t = s.getItem("beaa-theme");
        if (t && t !== "auto") d.setAttribute("data-theme", t);
        var z = s.getItem("beaa-text-size");
        if (z && z !== "100") d.setAttribute("data-text-size", z);
        var l = s.getItem("beaa-line-height");
        if (l && l !== "160") d.setAttribute("data-line-height", l);
        var m = s.getItem("beaa-motion");
        if (m && m !== "auto") d.setAttribute("data-motion", m);
      } catch (e) {}
    })();
  </script>

  <script type="application/ld+json">
${jsonld(page)}
  </script>
</head>
<body>
${managed("header", headerFor(page))}
${breadcrumb(page)}
  <main id="main" tabindex="-1">
${page.body.trimEnd()}
  </main>

${managed("footer", footerTpl)}

  <script src="/app.js" defer></script>
</body>
</html>
`;
};

let written = 0;
for (const page of PAGES) {
  const out = join(ROOT, page.file);
  if (existsSync(out) && !force) {
    console.log(`skip (exists)  ${page.file}`);
    continue;
  }
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, render(page));
  console.log(`wrote          ${page.file}`);
  written++;
}
console.log(`\n${written} page(s) written of ${PAGES.length}.`);
