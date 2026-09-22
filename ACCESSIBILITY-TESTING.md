# Manual accessibility checklist

Automated tools catch roughly a third of WCAG problems. Everything in this file
is a criterion **no tool can evaluate**, and it is where Level AAA is actually
won or lost.

Do not publish a review date in `accessibility/index.html` until this has been
walked end to end.

## Before you start

```bash
npm run serve          # http://localhost:8080
npm run check:all      # everything that IS automated must be green first
```

## Keyboard only — every page

Unplug the mouse. Do not touch it.

- [ ] Tab from the address bar: the skip link is the first thing focused, and it
      becomes visible when it does.
- [ ] The skip link moves focus into `<main>`, not just the scroll position.
- [ ] Every link, button, form field, and disclosure can be reached and operated.
- [ ] Nothing traps focus. You can always Tab back out.
- [ ] Focus order matches the visual order.
- [ ] The focus ring is clearly visible on **every** control, in **every** theme.
      Check it on tinted bands, on cards, on the amber button, and in the footer.
- [ ] Nothing ever covers a focused element, at any scroll position (SC 2.4.12).
- [ ] The mobile menu opens with Enter, closes with Escape, and returns focus to
      the toggle.
- [ ] The contact form's review step is fully operable, and "go back" restores
      the form with the typed content intact.

## Screen readers

Minimum matrix. Real assistive technology, not a browser extension.

- [ ] **VoiceOver + Safari** (macOS) — full read-through of the home page and one
      domain page.
- [ ] **VoiceOver + Safari** (iOS) — the mobile menu and the contact form.
- [ ] **NVDA + Firefox** (Windows) — the contact form, including the error
      messages and the review step.
- [ ] **TalkBack + Chrome** (Android) — navigation and the display settings.

While testing, confirm:
- [ ] Every heading makes sense read out of context.
- [ ] Every link makes sense read out of context (SC 2.4.9) — no "read more".
- [ ] The current page is announced in the nav (`aria-current`).
- [ ] Form hints are read together with their field.
- [ ] Errors are announced when they appear.
- [ ] Display-setting changes are announced in the live region.
- [ ] The wheel graphics are silent where decorative, and named where not.

## Zoom, reflow, and spacing

- [ ] 200% browser zoom: nothing is cut off, nothing scrolls sideways.
- [ ] 400% browser zoom at 1280px: content reflows to one column, still no
      sideways scroll.
- [ ] 320px viewport width: same.
- [ ] Apply the WCAG **text spacing bookmarklet** (line height 1.5x, paragraph
      spacing 2x, letter spacing 0.12em, word spacing 0.16em). Nothing may be
      clipped or overlap (SC 1.4.12).
- [ ] Count characters on the longest line of body text — it must be under 80
      (SC 1.4.8). The automated test measures this, but confirm it by eye at a
      few widths.

## Color and contrast

`npm run check:contrast` proves every declared token pair. What it cannot see:

- [ ] Text over the wheel graphics or any gradient.
- [ ] Text inside inline SVG.
- [ ] Gray out or disabled states, if any get added.
- [ ] Grayscale the whole page: is any information carried by color alone
      (SC 1.4.1)? Links must still be identifiable — they are underlined.
- [ ] Windows **High Contrast / forced-colors** mode: borders, focus rings, and
      the wheel remain visible.
- [ ] Each of the four themes, by eye, on a real display.
- [ ] "Match my device" with the OS set to dark, and again set to light. The
      Resource Hub and Blue Envelope pages carry their own light palettes, and
      those must give way to the site's dark theme without a choice being made.

## Content judgement

Formulas are proxies. A person has to read it.

- [ ] Is each `alt` text actually equivalent, not just present?
- [ ] Is every abbreviation spelled out in visible text on first use per page?
- [ ] Is the glossary complete? Any jargon on the site that is not in it?
- [ ] Does each "In short" block genuinely read as plain language?
- [ ] **Have disabled community members, including people with cognitive
      disabilities, read the copy?** For a disability-led organization this
      should be a formal step, not a courtesy. It is the single most valuable
      test on this page.

## Other input methods

- [ ] Voice control (Dragon, or macOS/iOS Voice Control): saying a link's visible
      label activates it (SC 2.5.3 Label in Name).
- [ ] Switch access, if you can get hold of a switch or emulate one.
- [ ] Touch, mouse, and keyboard all work in the same session (SC 2.5.6).
- [ ] 400% zoom together with a screen magnifier.

## After the pass

1. Record the date, the tools, and the assistive technology in
   `accessibility/index.html`.
2. Add anything unfixable to the documented exceptions list on that page, with a
   reason and a target date. Naming a gap is better than hiding it.
