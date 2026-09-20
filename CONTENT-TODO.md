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

## Programme detail

| What | Where it goes |
|---|---|
| What the Blue Envelope Project actually is, in two or three plain sentences | `glossary/index.html` (`#blue-envelope-project`) |

## Resource Hub & Calendar (EnableMe) — blocking before it's useful

`resources/index.html` is live, filterable, and works with JavaScript off, but
it ships with zero listings on purpose: this site does not fill a real
organisation's pages with invented placeholder data, and BEAA has not
approved any programs yet.

| What | Where it goes |
|---|---|
| Real, approved program and event listings | `resources/index.html`, inside `<ul id="hubList">` |
| Form endpoint for the submission form `action` | `resources/submit/index.html` — same unresolved question as the contact form above |

Once a program is approved, add it as one more `<li class="listing-card">`
inside `#hubList`. Each one needs, as `data-*` attributes read by `app.js`'s
Hub filtering and its Day/Month views — nothing else needs to change when a
listing is added:

```html
<li class="listing-card"
    data-title="Program or event name"
    data-county="Franklin"
    data-category="Housing,Peer Support"
    data-agency-type="Nonprofit provider"
    data-disability-type="Developmental disability"
    data-date="2026-11-04"
    data-ongoing="false">
  <div class="listing-card__tags">
    <span class="tag">Housing</span>
    <span class="tag">Peer Support</span>
  </div>
  <h3>Program or event name</h3>
  <p class="listing-card__meta">Franklin County · Nonprofit provider · Developmental disability · November 4, 2026, 10:00 am</p>
  <p>Plain-language description of the program.</p>
  <p><strong>Location:</strong> Street address, or "Virtual".</p>
  <p><strong>Accessibility:</strong> Whatever the agency told us — wheelchair accessible, ASL interpretation, and so on.</p>
</li>
```

For an ongoing program with no fixed date, drop `data-date` and set
`data-ongoing="true"` instead; leave `data-category` as a comma-separated
list when a program covers more than one topic.

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
