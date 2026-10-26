/**
 * Data and markup for /stories/ — the community story campaign (DRAFT).
 *
 * WORKING NAME ONLY. The campaign does not have a name yet; "Your stories"
 * stands in until one is chosen. Search for TODO(content) to find each spot.
 *
 * The idea, in one line: people tell us one true story about one topic, in
 * their own words (anonymous, the way PostSecret works), and answer a few
 * short, optional questions alongside it, so the stories add up to a data
 * set we can count, compare, and hand back to the community (the way
 * StuffThatWorks turns many personal reports into shared findings).
 *
 * Unpublished. Like the five What We Do domain pages, these pages are
 * noindex, left out of sitemap.xml, and linked from nowhere on the site —
 * see CONTENT-TODO.md, "Story campaign — draft". The form on the topic page
 * deliberately sends nothing: health stories are sensitive, and where they
 * should be stored has not been decided. Do not point it at FormSubmit (which
 * would put people's medical details in an email inbox) without that
 * decision being made first.
 */

/* One entry per topic. Only `open: true` topics get a page and a link; the
   rest show as "coming later" so people can see where the campaign is going.
   The order is the order we plan to open them in. TODO(content): confirm. */
export const STORY_TOPICS = [
  {
    slug: "medical-911",
    mod: "healthcare",
    name: "Medical 911",
    prompt: "Tell us about a time you, or someone with you, called 911 for a medical emergency.",
    open: true,
  },
  {
    slug: "housing",
    mod: "housing",
    name: "Housing",
    prompt: "Finding, keeping, or getting into a home.",
  },
  {
    slug: "healthcare",
    mod: "healthcare",
    name: "Healthcare",
    prompt: "Getting care, equipment, or an appointment that works for you.",
  },
  {
    slug: "education",
    mod: "education",
    name: "Education",
    prompt: "School, college, or training, and the support that came with it — or did not.",
  },
  {
    slug: "transportation",
    mod: "transportation",
    name: "Transportation",
    prompt: "Getting where you need to go: buses, paratransit, rides, and roads.",
  },
  {
    slug: "benefits-safety",
    mod: "money",
    name: "Benefits and safety",
    prompt: "Keeping your benefits, and feeling safe at home and out in the world.",
  },
];

const topicCards = STORY_TOPICS.map((t) =>
  t.open
    ? `          <li class="card card--domain card--${t.mod}">
            <h3><a class="card__link" href="/stories/${t.slug}/">Tell us your ${t.name.toLowerCase()} story</a></h3>
            <p>${t.prompt}</p>
            <p class="card__meta">Open now</p>
          </li>`
    : `          <li class="card card--domain card--${t.mod}">
            <h3>${t.name}</h3>
            <p>${t.prompt}</p>
            <p class="card__meta">Coming later</p>
          </li>`
).join("\n");

/* Shared by both pages: the "not for emergencies" notice. It sits above the
   fold on the topic page because some readers will arrive mid-crisis. */
const notForEmergencies = `
        <div class="callout" role="note">
          <svg class="callout__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
            <path d="M12 7v6M12 16.5v.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
          </svg>
          <div>
            <p><strong>This is not a way to get help in an emergency.</strong></p>
            <p>If you need help right now, call 911. If you are in crisis or
               thinking about suicide, call or text 988.</p>
          </div>
        </div>`;

/* ------------------------------------------------------------ Hub page -- */
const hubPage = {
  file: "stories/index.html",
  url: "/stories/",
  title: "Your Stories | Be Enabled Advocacy Alliance", // TODO(content): campaign name
  description:
    "Tell us one true story about your life with a disability. Together, your stories show what is really happening and help us push for change.",
  h1: "Your stories",
  noindex: true,
  body: `
    <section class="section">
      <div class="wrap wrap--narrow stack">
        <!-- TODO(content): campaign name. "Your stories" is a stand-in. -->
        <h1>Your stories</h1>
        <p class="lede">One true story, in your own words. Together, they show
           what is really happening.</p>

        <div class="in-short">
          <h2>In short</h2>
          <p>We ask about one topic at a time. The first one is calling 911 for
             a medical emergency.</p>
          <p>You can tell your story without giving your name.</p>
          <p>We count what people tell us and share what we learn with everyone.</p>
          <p>We use it to push for change, with facts that come from you.</p>
        </div>
${notForEmergencies}
      </div>
    </section>

    <section class="section section--tint">
      <div class="wrap wrap--narrow stack">
        <h2>Why we are asking</h2>
        <p>Officials often say they have no data on how disabled people are
           treated. Without numbers, our problems are easy to wave away as
           one-off stories.</p>
        <p>One story is easy to ignore. Hundreds of stories that say the same
           thing are not.</p>
        <p>So we ask the same short questions next to every story. That way we
           can count how often something happens, where it happens, and who it
           happens to.</p>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <h2>Pick a topic</h2>
        <p>We open one topic at a time, so each one gets enough stories to mean
           something.</p>
        <ul class="grid no-bullet">
${topicCards}
        </ul>
      </div>
    </section>

    <section class="section section--tint">
      <div class="wrap wrap--narrow stack">
        <h2>What happens to your story</h2>
        <ol class="steps">
          <li>
            <span class="steps__num" aria-hidden="true">1</span>
            <div>
              <strong>You tell it</strong>
              <p>Write as much or as little as you like. Only the story itself is
                 required. Every other question can be skipped.</p>
            </div>
          </li>
          <li>
            <span class="steps__num" aria-hidden="true">2</span>
            <div>
              <strong>A person reads it</strong>
              <p>Someone on our team reads every story. We remove names, places,
                 and anything else that could point to you.</p>
            </div>
          </li>
          <li>
            <span class="steps__num" aria-hidden="true">3</span>
            <div>
              <strong>We count it</strong>
              <p>Your short answers join everyone else's. That is how we find
                 the patterns: what keeps going wrong, and where.</p>
            </div>
          </li>
          <li>
            <span class="steps__num" aria-hidden="true">4</span>
            <div>
              <strong>We share what we learn</strong>
              <p>We post what the stories show, here, for everyone. Only if you
                 say yes, we may also share a few of your words, with nothing
                 that names you.</p>
            </div>
          </li>
          <li>
            <span class="steps__num" aria-hidden="true">5</span>
            <div>
              <strong>We take it to people who can fix it</strong>
              <p>Lawmakers, agencies, hospitals, and emergency services. Facts
                 from you carry more weight than anything we could say alone.</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="section">
      <div class="wrap wrap--narrow stack">
        <h2>What we have heard so far</h2>
        <!-- TODO(content): once stories come in, this becomes the "share it
             back" section: a few counts per topic, and, only with consent, a
             handful of short anonymous quotes, each on its own card. Never a
             made-up example. -->
        <p>Nothing yet. When the first topic has enough stories, what we learn
           will be posted here.</p>
      </div>
    </section>`,
};

/* ------------------------------------------------- Medical 911 topic -- */

/* Checkbox and radio helpers. Every group is a <fieldset> with a <legend>,
   which is what makes the question readable as a question (SC 1.3.1). */
const choice = (type, name, items) =>
  items
    .map((v) => `              <label><input type="${type}" name="${name}" value="${v}"> ${v}</label>`)
    .join("\n");

const group = (legend, hint, id, type, name, items) => `
          <fieldset aria-describedby="${id}-hint">
            <legend>${legend} <span class="field__req">(optional${type === "checkbox" ? ", choose all that apply" : ""})</span></legend>
            <p class="field__hint" id="${id}-hint">${hint}</p>
            <div class="radio-row">
${choice(type, name, items)}
            </div>
          </fieldset>`;

const medical911Page = {
  file: "stories/medical-911/index.html",
  url: "/stories/medical-911/",
  title: "Your Medical 911 Story | Be Enabled Advocacy Alliance",
  description:
    "Have you called 911 for a medical emergency, or had someone call for you? Tell us what happened. You do not need to give your name.",
  h1: "Tell us your medical 911 story",
  crumb: "Medical 911",
  trail: [{ name: "Your stories", url: "/stories/" }], // TODO(content): campaign name
  noindex: true,
  body: `
    <section class="section">
      <div class="wrap wrap--narrow stack">
        <h1>Tell us your medical 911 story</h1>
        <p class="lede">You called 911, or someone called for you. What happened
           next?</p>

        <div class="in-short">
          <h2>In short</h2>
          <p>Tell us about one time 911 was called for a medical emergency.</p>
          <p>It can be good, bad, or mixed. Every story counts.</p>
          <p>You do not need to give your name.</p>
          <p>It takes about 10 minutes. Only the story is required.</p>
        </div>
${notForEmergencies}
      </div>
    </section>

    <section class="section section--tint">
      <div class="wrap wrap--narrow stack">
        <h2>Why this topic first</h2>
        <p>When disabled people call 911, things can go wrong in ways other
           people never face.</p>
        <ul class="tick-list">
          <li>A wheelchair or other equipment gets left behind.</li>
          <li>Responders cannot understand how someone communicates.</li>
          <li>Police come instead of, or along with, medical help.</li>
          <li>A service animal is kept away.</li>
          <li>Medicine or a device does not come to the hospital.</li>
        </ul>
        <p>We hear these stories all the time. But almost nobody counts them.
           We want to.</p>
        <p>This connects to our
           <a href="/blue-envelope/">Blue Envelope Project</a>, which helps
           drivers share their needs during a traffic stop.</p>
      </div>
    </section>

    <section class="section">
      <div class="wrap wrap--narrow stack">
        <h2 id="tell-it">Your story</h2>
        <p>Every box tells you what it is for. Only the first one is required.
           Skip anything you do not want to answer.</p>
        <p>Please leave out names of people, hospitals, and streets. We remove
           them anyway, but it is safer not to send them.</p>

        <!-- DRAFT: this is deliberately not a <form> and sends nothing. Where
             health stories are stored, who can read them, and how long they
             are kept must be decided first — see CONTENT-TODO.md. When that
             is settled, wrap this in a <form method="post" ...
             data-confirm-before-send> like contact/index.html, and make the
             button type="submit". -->
        <div class="story-form" id="story-911">
          <div class="field">
            <label for="s9-story">What happened? <span class="field__req">(required)</span></label>
            <p class="field__hint" id="s9-story-hint">Start wherever you like. What
               was going on, who came, how they treated you, and how it ended.
               There is no wrong way to write it.</p>
            <textarea id="s9-story" name="story" rows="10" aria-describedby="s9-story-hint"></textarea>
          </div>

          <h3>A few short questions</h3>
          <p>These are what let us count stories and spot patterns. Each one
             is optional.</p>
${group(
  "Who called 911?",
  "Pick the one closest to what happened.",
  "s9-caller", "radio", "caller",
  ["I called for myself", "Someone called for me", "I called for someone else"]
)}
${group(
  "When did this happen?",
  "A rough guess is fine.",
  "s9-when", "radio", "when",
  ["In the last year", "1 to 5 years ago", "More than 5 years ago"]
)}

          <div class="field">
            <label for="s9-state">Which state was it in? <span class="field__req">(optional)</span></label>
            <p class="field__hint" id="s9-state-hint">So we can compare places.</p>
            <input type="text" id="s9-state" name="state" autocomplete="address-level1" aria-describedby="s9-state-hint">
          </div>

          <div class="field">
            <label for="s9-county">Which county or city? <span class="field__req">(optional)</span></label>
            <p class="field__hint" id="s9-county-hint">Leave this blank if it is a
               small place where people might know who you are.</p>
            <input type="text" id="s9-county" name="county" aria-describedby="s9-county-hint">
          </div>
${group(
  "Who came?",
  "Everyone who showed up, as far as you know.",
  "s9-who", "checkbox", "responders[]",
  ["Ambulance or paramedics", "Fire department", "Police", "A crisis team", "Nobody came", "Not sure"]
)}
${group(
  "Did they understand your disability and what you needed?",
  "Think about how they spoke to you, moved you, and listened.",
  "s9-understood", "radio", "understood",
  ["Yes", "Partly", "No", "Not sure"]
)}
${group(
  "Did any of these happen?",
  "These are things we hear about often. Choose any that fit.",
  "s9-issues", "checkbox", "issues[]",
  [
    "It was hard to communicate",
    "My wheelchair or other equipment was left behind",
    "My service animal was kept away",
    "My medicine or a device was left behind",
    "I was held down or restrained",
    "I was taken somewhere I did not want to go",
    "They would not take me to the hospital",
    "I got a large bill afterward",
    "I was treated well",
  ]
)}

          <div class="field">
            <label for="s9-better">What would have made it better? <span class="field__req">(optional)</span></label>
            <p class="field__hint" id="s9-better-hint">If you could change one
               thing about how it went, what would it be?</p>
            <textarea id="s9-better" name="better" aria-describedby="s9-better-hint"></textarea>
          </div>

          <h3>About you</h3>
          <p>Only if you want to share. This helps us see who is affected most.</p>
${group(
  "Which of these describe you?",
  "Use your own words in the next box if none of these fit.",
  "s9-dis", "checkbox", "disability[]",
  [
    "Physical disability",
    "Blind or low vision",
    "Deaf or hard of hearing",
    "Developmental disability",
    "Autistic",
    "Mental health disability",
    "Chronic illness",
    "I do not speak, or speak in another way",
  ]
)}

          <div class="field">
            <label for="s9-dis-other">In your own words <span class="field__req">(optional)</span></label>
            <input type="text" id="s9-dis-other" name="disabilityOther">
          </div>

          <h3>How we may use your story</h3>
${group(
  "Can we share some of your words?",
  "We always count your answers. This is only about quoting what you wrote, with nothing that names you.",
  "s9-share", "radio", "share",
  [
    "Yes, you may quote me without my name",
    "No, only count my answers",
  ]
)}

          <div class="field">
            <label for="s9-email">Email address <span class="field__req">(optional)</span></label>
            <p class="field__hint" id="s9-email-hint">Only if you would like us to
               follow up, or to hear what we learn. We keep it apart from your
               story.</p>
            <input type="email" id="s9-email" name="email" autocomplete="email" aria-describedby="s9-email-hint">
          </div>

          <p class="btn-row" style="margin-block-start: var(--space-6)">
            <button type="button" class="btn btn--primary" disabled aria-describedby="s9-draft-note">Send my story</button>
          </p>
          <p class="field__hint" id="s9-draft-note">This is a preview. Sending is
             switched off until the campaign starts.</p>
        </div>
      </div>
    </section>

    <section class="section section--tint">
      <div class="wrap wrap--narrow stack">
        <h2>Your privacy</h2>
        <!-- TODO(content): rewrite once storage is chosen, and add a matching
             section to privacy/index.html. -->
        <ul class="tick-list">
          <li>You do not need to give your name.</li>
          <li>A person on our team removes anything that could point to you
              before your story is counted or quoted.</li>
          <li>If you give an email address, we keep it apart from your story.</li>
          <li>We never sell what you tell us.</li>
          <li>If you gave an email address, you can ask us to delete your story
              at any time.</li>
        </ul>
        <p><a href="/stories/">See every topic in the story campaign</a></p>
      </div>
    </section>`,
};

export const STORY_PAGES = [hubPage, medical911Page];
