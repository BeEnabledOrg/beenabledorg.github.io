# Content still needed

Everything below is deliberately blank or marked "coming soon" on the live site.
None of it has been filled with plausible-sounding placeholder text, because for
a real 501(c)(3) invented specifics are a liability rather than a placeholder.

Search the repository for `TODO(content)` to find each spot in context.

## Legal and organisational — blocking

| What | Where it goes |
|---|---|
| EIN (tax identification number) | `about/index.html`, footer partial |
| Mailing address | `about/index.html`, `contact/index.html`, footer |
| Year founded | `about/index.html`, JSON-LD `foundingDate` |
| Board and staff names and roles | `about/index.html` |
| Annual report or financials link | `about/index.html` |

## Contact — blocking

| What | Where it goes |
|---|---|
| Real contact email (currently `hello@beenabled.org`, unverified) | `contact/index.html`, footer |
| Phone number, and whether relay and video relay calls are accepted | `contact/index.html` |
| Form endpoint for the contact form `action` | `contact/index.html` |

The contact form currently posts to `#`. Until an endpoint is set, the email
link is the working path. Whatever endpoint you choose must accept a plain
`POST` of form fields; do not swap in an embedded third-party widget, because
those reliably fail Level AAA and cannot be fixed from the outside.

## Fundraising — blocking before launch

| What | Where it goes |
|---|---|
| Donation URL (Givebutter, Stripe, PayPal…) | `get-involved/index.html` |
| Mailing list signup URL | `get-involved/index.html` |

Both are `href="#"` right now. Keep them as outbound links rather than embedding
the provider's form on the page.

## Program detail

`enableme/index.html` and `blue-envelope/index.html` now exist and are linked
from the main nav and footer, replacing `what-we-do/` in both (see below).

EnableMe now has a real project brief (Ohio DODD Innovative Technology
Solutions Grant proposal, staged county rollout, a moderation workflow, and a
data model — see the project's technical handoff materials) and an
interactive **preview** on the page itself: `enableme/data.js` +
`enableme/hub.js` implement the public Hub's List/Day/Month/topic browsing
and filters, client-side only, against clearly-labeled example data (every
example agency name is prefixed "Example" on purpose — see data.js). There
is no real backend, submission form, agency dashboard, or review queue on
this site; those are internal/agency-facing tools that belong in the real
build a developer creates separately, not on the public marketing site.

| What | Where it goes |
|---|---|
| Whether Be Enabled Advocacy Alliance issues Blue Envelope envelopes directly, or only directs people to existing state/local programs | `blue-envelope/index.html` |
| Real EnableMe listings, once the actual backend/build exists | `enableme/data.js` is example data only — do not add real programs here without also removing the "example" framing and building real submission/moderation |
| Directory feature details (what a listing looks like, how programs get added/verified) | `blue-envelope/index.html`, once specified |

## What we do (unlinked)

The five `what-we-do/` subpages (education, financial-security, healthcare,
housing, transportation) describe work Be Enabled Advocacy Alliance cannot
yet deliver on. They have been removed from the main nav and footer, but the
files are kept on disk rather than deleted, in case the content gets reused
later. `tools/content.mjs` still generates them; `tools/sitemap.mjs` still
lists them since they exist as files. Don't re-link them without checking
whether the content is actually deliverable yet.

## Accessibility statement

| What | Where it goes |
|---|---|
| Date of the first full manual audit | `accessibility/index.html` |
| Which screen readers and browsers were tested | `accessibility/index.html` |

Do not publish a review date until the manual pass in `ACCESSIBILITY-TESTING.md`
has actually been done.

## Social and search

| What | Where it goes |
|---|---|
| Social profile URLs, for JSON-LD `sameAs` | `tools/scaffold-pages.mjs`, the `NGO` block |
| Confirm `beenabled.org` DNS points at GitHub Pages | `CNAME` |
