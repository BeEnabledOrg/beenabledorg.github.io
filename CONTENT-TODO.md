# Content still needed

Everything below is deliberately blank or marked "coming soon" on the live site.
None of it has been filled with plausible-sounding placeholder text, because for
a real 501(c)(3) invented specifics are a liability rather than a placeholder.

Search the repository for `TODO(content)` to find each spot in context.

## Legal and organizational — blocking

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

## Resource Hub & Calendar (EnableMe)

`resources/index.html` is live, filterable, and works with JavaScript off. It
now carries 45 real listings (in `tools/content.mjs`, the `HUB_LISTINGS`
array), sourced from Jen's own Content Source Inventory workbook — every one
checked against the organization's own site, with a link back to that site on
the card. None of these came through the agency submission form; they were
compiled directly by the team, which is why the page copy on `/resources/`
says so plainly rather than implying they were all agency-submitted.

Still blocking before this is fully useful:

| What | Where it goes |
|---|---|
| More listings, especially from counties with none yet | `tools/content.mjs`, the `HUB_LISTINGS` array |
| Form endpoint for the submission form `action` | `resources/submit/index.html` — same unresolved question as the contact form above |
| A pass to re-check the workbook's still-parked tabs (Day Programs & Providers, County Boards, Libraries, and the rest) once resources reopen beyond Calendar-only scope | see the workbook's Read Me sheet |

The workbook flags several real, dated finds that could not be promoted this
round for reasons worth revisiting rather than re-deciding from scratch:
past-cycle events waiting on next year's date (e.g. DD Awareness & Advocacy
Day, the Franklin and Lucas County provider fairs, the Clark DD Rockin' Ball),
recurring series whose current schedule needs a fresh pull close to drafting
time (e.g. Autism Society Mahoning Valley and Dayton's family calendars), and
a couple of good finds outside Ohio or aimed at an employer audience rather
than individuals and families (the Arc's National Convention, OOD's employer
webinar series). None of those are in `HUB_LISTINGS` yet.

New listings, whether promoted from the workbook or added by hand, follow the
same format. Each one needs these `data-*` attributes, read by `app.js`'s Hub
filtering and its Day/Month views — nothing else needs to change when a
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

## Blue Envelope Project

The Blue Envelope Project now has its own page at `/blue-envelope/`, with a
directory of state and local programs. That directory was compiled through
research (state agency pages, legislature and bill-tracking sites, and news
coverage, including research assisted by AI tools) rather than confirmed by
phone with every program — see the callout and "Where this directory comes
from" section on that page. Treat it as a living document: correct it as
programs launch, change, or close. `glossary/index.html`
(`#blue-envelope-project`) now has real copy too.

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
