/** Shared helpers for the check scripts. No dependencies by design. */
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

const SKIP = new Set(["node_modules", ".git", "tools", "assets"]);

export const htmlFiles = (root) => {
  const out = [];
  const walk = (dir) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      if (e.name.startsWith(".") || SKIP.has(e.name)) continue;
      const full = join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.name.endsWith(".html")) out.push(full);
    }
  };
  walk(root);
  return out.sort();
};

export const rel = (root, f) => relative(root, f).split("\\").join("/");
export const read = (f) => readFileSync(f, "utf8");

/** The <main> element's inner HTML — the prose we actually author. */
export const mainOf = (html) => {
  const m = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  return m ? m[1] : "";
};

/** Strip tags, comments, and script/style to leave readable text. */
export const textOf = (html) =>
  html
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(script|style|svg)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

export const report = (name, failures, checked) => {
  console.log("\n" + "=".repeat(72));
  if (failures) {
    console.log(`${name}: ${checked} checked · ${failures} FAILING`);
    process.exit(1);
  }
  console.log(`${name}: ${checked} checked · all pass`);
};
