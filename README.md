# beenabled.org

The website for **Be Enabled Advocacy Alliance (BEAA)**, a disability-led
501(c)(3) non-profit.

Plain static HTML, CSS, and JavaScript. No framework, no build step, no runtime
dependencies. GitHub Pages serves these files exactly as they sit in the repo.

Built to **WCAG 2.2 Level AAA**, with the gaps documented rather than hidden.
See [`accessibility/index.html`](accessibility/index.html) for the public claim.

## Quick start

```bash
npm install          # dev tooling only — nothing here ships
npm run serve        # http://localhost:8080
npm run check        # the fast checks: no browser needed
npm run check:all    # everything, including the browser-based scans
```

## Layout

```
index.html                  Home
about/                      About BEAA
what-we-do/                 Hub for the five areas
  housing/ healthcare/ education/ transportation/ financial-security/
resources/                  Resource Hub & Calendar (EnableMe) and its submission form
get-involved/  contact/     Calls to action
accessibility/              Conformance claim and documented exceptions
glossary/  privacy/  sitemap/
404.html

styles.css                  One stylesheet. Tokens at the top.
app.js                      Progressive enhancement only.
assets/fonts/               Self-hosted webfonts (SIL OFL, licenses included)
assets/img/                 Favicon and Open Graph card
tools/                      Dev scripts. Never served — robots.txt disallows it.
```

## How to edit

**Page content** — edit the `.html` files directly. They are the source of
truth. Content lives outside the `@partial` markers and is yours to change.

**Navigation or footer** — these are duplicated into every page on purpose (a
JavaScript-injected nav would break the no-JS baseline and SEO). Do not
hand-edit inside the `<!-- @partial:… -->` markers. Instead:

```bash
# edit tools/partials/header.html or footer.html, then:
node tools/sync-partials.mjs --fix
```

`npm run check:partials` fails if any page drifts. That check is what
mechanically guarantees consistent navigation (SC 3.2.3) and consistent help
(SC 3.2.6), which are otherwise pure discipline.

**Adding a page** — add it to `tools/content.mjs`, run
`node tools/scaffold-pages.mjs` (existing pages are skipped), then
`node tools/sitemap.mjs` and add it to `sitemap/index.html` and the footer.

**Colors** — change them only in the token blocks at the top of `styles.css`,
then run `npm run check:contrast`. Every pairing must stay at 7:1. A failing
pair is fixed in the stylesheet, never waived in the checker.

## The checks, and what each one proves

| Command | Proves |
|---|---|
| `check:contrast` | 238 color pairings across 7 palettes meet 7:1 (SC 1.4.6) and 3:1 (SC 1.4.11), and each page palette names the same tokens in its dark-device reset |
| `check:partials` | Nav and footer are identical everywhere (SC 3.2.3, 3.2.6) |
| `check:read` | Every page reads at grade 9 or below, or carries a plain summary (SC 3.1.5) |
| `check:links` | No "read more", no `target="_blank"`, no ambiguous link text (SC 2.4.9, 3.2.5) |
| `check:seo` | Titles, descriptions, canonicals, cards, heading order, valid JSON-LD, working internal links |
| `check:sitemap` | `sitemap.xml` matches the pages on disk, both ways |
| `check:html` | Markup validity plus the html-validate accessibility rules |
| `check:a11y` | pa11y on the **WCAG2AAA** ruleset, both the htmlcs and axe engines |
| `check:themes` | The same AAA scan re-run in all six color conditions: the four chosen themes, plus "Match my device" on a light device and on a dark device |
| `check:targets` | Every target is at least 44x44 CSS px at three widths (SC 2.5.5) |
| `check:interaction` | The menu, display settings, and form confirm flow actually work |

Everything above is automated, and it still only covers about a third of WCAG.
The rest is [`ACCESSIBILITY-TESTING.md`](ACCESSIBILITY-TESTING.md).

## Things that must not change

These are not style preferences. Each one is load-bearing for the AAA claim.

- **The header is not sticky.** A sticky header cannot guarantee that a focused
  element is never obscured (SC 2.4.12).
- **Links in prose are always underlined.** At 7:1 both body text and link text
  are squeezed into one narrow luminance band — our link is only 1.40:1 against
  body text, far below the 3:1 that SC 1.4.1 requires when color is the only
  differentiator.
- **No carousels, modals, tooltips, scroll animation, or cookie banners.** Each
  breaks a Level AAA criterion outright.
- **No audio or video.** One video would pull in four more AAA criteria,
  including synchronised sign-language interpretation.
- **No third-party embeds.** Donations and the mailing list link out instead. We
  cannot fix code we do not control, and embedding it would import its failures
  into our conformance claim.
- **No `target="_blank"`** (SC 3.2.5). The link checker enforces this.
- **Amber `#f09901` can never carry body text.** It is 2.27:1 on white. Use
  `--accent-ui` where amber must carry meaning, and keep the amber button at
  large text only.
- **A page palette (`.hub`, `.blue-envelope`) is light-theme only, in both
  spellings of "light".** Light can be chosen in the panel (`data-theme="light"`)
  or be the device's own preference with nothing chosen (no `data-theme`). A
  selector that only excludes the chosen themes still matches the second case
  on a dark device, and paints the light palette's white cards under the dark
  theme's near-white text. Each palette therefore has a `@media
  (prefers-color-scheme: dark)` reset that hands every token back with
  `inherit`; `check:contrast` fails if the two lists ever differ.
- **The browser-based checks use the Chromium that pa11y bundles**, not the
  system Chrome. pa11y's axe build misreads closed `<details>` content in
  newer Chromes and reports hundreds of false contrast errors. Headless system
  Chrome also inherits the Mac's dark appearance, which is why `check:themes`
  emulates the OS preference explicitly for every condition.

## Still to do

[`CONTENT-TODO.md`](CONTENT-TODO.md) lists everything left blank on purpose:
EIN, address, board, phone number, and the donation and mailing-list URLs. None
of it was filled with placeholder text.

## License

Site content © Be Enabled Advocacy Alliance. Code MIT. Bundled fonts are under
the SIL Open Font License; see `assets/fonts/`.
