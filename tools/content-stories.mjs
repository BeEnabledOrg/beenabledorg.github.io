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
        <p>We also ask what helped. Disabled people already know a lot about
           what works. Put together, that knowledge can help the next person.</p>
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
                 the patterns: what keeps going wrong, where, and what helps.</p>
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
        <p>Nothing yet. We will post findings for each topic as stories come
           in, in stages.</p>
        <!-- TODO(content): confirm these numbers before launch. -->
        <ol class="steps">
          <li>
            <span class="steps__num" aria-hidden="true">1</span>
            <div>
              <strong>At 100 stories: first findings</strong>
              <p>What goes wrong most often, and what helps most.</p>
            </div>
          </li>
          <li>
            <span class="steps__num" aria-hidden="true">2</span>
            <div>
              <strong>At 500 stories: findings by group</strong>
              <p>Whether some people are treated worse than others, by
                 disability, race, age, and kind of place.</p>
            </div>
          </li>
          <li>
            <span class="steps__num" aria-hidden="true">3</span>
            <div>
              <strong>At 1,000 stories: findings by state</strong>
              <p>Which places do better, so others can learn from them.</p>
            </div>
          </li>
        </ol>
      </div>
    </section>`,
};


/* ----------------------------------------------------- Form building -- *
 * How every topic's questionnaire is shaped. Borrowed from StuffThatWorks'
 * sign-up survey, adapted for an anonymous, story-first campaign:
 *
 *   - Plain-language consent before the first question (theirs opens with
 *     a "what counts as personal information" screen).
 *   - The story comes first and is the ONLY required answer. Theirs has 60+
 *     questions, most required; ours lets people stop after the story.
 *   - A one-line summary, which becomes the quote on a share-back card (their
 *     community pages pair a short quote with an outcome label).
 *   - Labeled scales in words, never bare numbers, so every option reads on
 *     its own to a screen reader (theirs are 1-5 circles labeled at the ends).
 *   - "What helped?": the heart of StuffThatWorks is ranking what works.
 *     Ours asks which tools people had and whether each one helped, so we can
 *     publish what helps most, not only what goes wrong.
 *   - Before-and-after: they rate severity before and after a treatment; we
 *     ask how people felt about calling 911 before this happened, and now.
 *   - A CORE block (who, where, about you, how we may use it) that stays the
 *     same for every topic, so topics can be compared. Only the middle parts
 *     change per topic.
 */

/* One option per line: the visible label is also the submitted value. */
const choice = (type, name, items) =>
  items
    .map((v) => `              <label><input type="${type}" name="${name}" value="${v}"> ${v}</label>`)
    .join("\n");

/* A question with set answers. Every group is a <fieldset> with a <legend>,
   which is what makes it readable as one question (SC 1.3.1). */
const group = (legend, hint, id, type, name, items) => `
          <fieldset${hint ? ` aria-describedby="${id}-hint"` : ""}>
            <legend>${legend} <span class="field__req">(optional${type === "checkbox" ? ", choose all that apply" : ""})</span></legend>
${hint ? `            <p class="field__hint" id="${id}-hint">${hint}</p>\n` : ""}            <div class="radio-row">
${choice(type, name, items)}
            </div>
          </fieldset>`;

/* A question answered in the person's own words. */
const text = (label, hint, id, name, { long = false, autocomplete = "", inputmode = "" } = {}) => `
          <div class="field">
            <label for="${id}">${label} <span class="field__req">(optional)</span></label>
${hint ? `            <p class="field__hint" id="${id}-hint">${hint}</p>\n` : ""}            ${long
    ? `<textarea id="${id}" name="${name}"${hint ? ` aria-describedby="${id}-hint"` : ""}></textarea>`
    : `<input type="text" id="${id}" name="${name}"${autocomplete ? ` autocomplete="${autocomplete}"` : ""}${inputmode ? ` inputmode="${inputmode}"` : ""}${hint ? ` aria-describedby="${id}-hint"` : ""}>`}
          </div>`;

const part = (n, total, title) => `
          <h3>Part ${n} of ${total}: ${title}</h3>`;

/* Shared answer sets, so every topic counts the same way. */
const SCALE_WELL = ["Very badly", "Badly", "Okay", "Well", "Very well", "Not sure"];

/* "What helped?" answer set, used once per tool. "Nobody looked at it" is
   kept apart from "Did not help" on purpose: a file no responder opened is a
   different finding from one that was read and did not change anything. */
const HELPED = ["Did not have it", "Helped a lot", "Helped a little", "Did not help", "Nobody looked at it", "Made it worse"];

const helpedRow = (p, key, tool) => group(tool, "", `${p}-helped-${key}`, "radio", `helped[${key}]`, HELPED);

/* ---- CORE parts: identical wording on every topic. `p` is the id prefix. */

const coreBeforeYouStart = `
          <div class="in-short">
            <h3>Before you start</h3>
            <p>You must be 18 or older. A parent or caregiver can tell a child's
               story.</p>
            <p>Only the story is required. Skip any question you like.</p>
            <p>Please leave out names of people, hospitals, and streets.</p>
            <p>A person on our team reads every story and removes anything that
               could point to you. Then we count it with everyone else's.</p>
            <p>We never sell what you tell us.</p>
          </div>`;

const coreWhose = (p) => group(
  "Whose story is this?",
  "If it is someone else's story, answer every question about them.",
  `${p}-whose`, "radio", "whose",
  [
    "My own",
    "Someone I support or care for",
    "I am a 911 call-taker, responder, or health worker",
  ]
);

const coreWhere = (p) => `
${text("Which state did it happen in?", "So we can compare states.", `${p}-state`, "state", { autocomplete: "address-level1" })}
${text(
  "What was the ZIP code?",
  "We use it only to group stories by area and to compare them with public data, like income and how far the nearest hospital is. We never use it to find you. Leave it blank if you would rather.",
  `${p}-zip`, "zip", { inputmode: "numeric" }
)}
${group(
  "What kind of place is it?",
  "",
  `${p}-area`, "radio", "area",
  ["Big city", "Small city or town", "Suburb", "Rural", "Not sure"]
)}`;

const coreAboutYou = (p, n, total) => `
${part(n, total, "About you")}
          <p>Only if you want to share. This shows us who is affected most, and
             whether some people are treated worse than others.</p>
${group(
  "Which of these describe you?",
  "Use your own words in the next box if none of these fit.",
  `${p}-dis`, "checkbox", "disability[]",
  [
    "Physical disability",
    "Blind or low vision",
    "Deaf or hard of hearing",
    "Developmental or intellectual disability",
    "Autistic",
    "Mental health disability",
    "Chronic illness",
    "Brain injury",
  ]
)}
${text("Your disability, in your own words", "", `${p}-dis-other`, "disabilityOther")}
${group(
  "How do you communicate?",
  "",
  `${p}-comm`, "checkbox", "communication[]",
  [
    "Speaking",
    "Sign language",
    "Writing or typing",
    "A speech device, app, or letter board",
    "Gestures or sounds",
    "Someone who knows me helps",
  ]
)}
${group(
  "How old are you?",
  "",
  `${p}-age`, "radio", "age",
  ["18 to 29", "30 to 44", "45 to 64", "65 or older", "I would rather not say"]
)}
${group(
  "What is your race or ethnicity?",
  "",
  `${p}-race`, "checkbox", "race[]",
  [
    "American Indian or Alaska Native",
    "Asian",
    "Black or African American",
    "Hispanic or Latino",
    "Middle Eastern or North African",
    "Native Hawaiian or Pacific Islander",
    "White",
    "Another race or ethnicity",
    "I would rather not say",
  ]
)}
${group(
  "What is your gender?",
  "",
  `${p}-gender`, "radio", "gender",
  ["Woman", "Man", "Non-binary", "Another gender", "I would rather not say"]
)}`;

const coreUseAndStay = (p, n, total) => `
${part(n, total, "How we may use your story")}
${group(
  "Can we share some of your words?",
  "We always count your answers. This is only about quoting what you wrote, with nothing that names you.",
  `${p}-share`, "radio", "share",
  ["Yes, you may quote me without my name", "No, only count my answers"]
)}
${group(
  "Would you like to stay involved?",
  "Each of these needs an email address, so we can reach you.",
  `${p}-involve`, "checkbox", "involve[]",
  [
    "Send me what you learn",
    "Ask me about another topic later",
    "I would like to help check what the stories show",
    "I would speak to lawmakers or officials",
  ]
)}
${text(
  "Email address",
  "Only if you ticked something above. We keep it apart from your story.",
  `${p}-email`, "email", { autocomplete: "email" }
).replace('type="text"', 'type="email"')}`;

/* ------------------------------------------------- Medical 911 topic -- */

const P = "s9";
const PARTS = 8;

const medical911Page = {
  file: "stories/medical-911/index.html",
  url: "/stories/medical-911/",
  title: "Your Medical 911 Story | Be Enabled Advocacy Alliance",
  description:
    "Have you called 911 for a medical emergency, or had someone call for you? Tell us what happened and what helped. You do not need to give your name.",
  h1: "Tell us your medical 911 story",
  crumb: "Medical 911",
  trail: [{ name: "Your stories", url: "/stories/" }], // TODO(content): campaign name
  noindex: true,
  body: `
    <section class="section">
      <div class="wrap wrap--narrow stack">
        <h1>Tell us your medical 911 story</h1>
        <p class="lede">You called 911, or someone called for you. What happened
           next, and what helped?</p>

        <div class="in-short">
          <h2>In short</h2>
          <p>Tell us about one time 911 was called for a medical emergency.</p>
          <p>It can be good, bad, or mixed. Every story counts.</p>
          <p>We also ask what helped, so we can share what works.</p>
          <p>You do not need to give your name.</p>
          <p>The story alone takes about 5 minutes. All of it takes about 15.</p>
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
        <p>We hear these stories all the time. But almost nobody counts them.</p>
        <p>We also want to know what helps. Many people keep a medical file at
           home, or sign up with their local 911 ahead of time. Nobody has asked
           whether these things actually work. You can tell us.</p>
        <p>This connects to our
           <a href="/blue-envelope/">Blue Envelope Project</a>, which helps
           drivers share their needs during a traffic stop.</p>
      </div>
    </section>

    <section class="section">
      <div class="wrap wrap--narrow stack">
        <h2 id="tell-it">Your story</h2>
        <p>Every box tells you what it is for. There are ${PARTS} short parts.
           Only the story in part 2 is required.</p>

        <!-- DRAFT: this is deliberately not a <form> and sends nothing. Where
             health stories are stored, who can read them, and how long they
             are kept must be decided first — see CONTENT-TODO.md. When that
             is settled, wrap this in a <form method="post" ...
             data-confirm-before-send> like contact/index.html, and make the
             button type="submit". -->
        <div class="story-form" id="story-911">
${coreBeforeYouStart}
${part(1, PARTS, "About the call")}
${coreWhose(P)}
${group(
  "Who called 911?",
  "",
  `${P}-caller`, "radio", "caller",
  ["I called for myself", "Someone called for me", "I called for someone else"]
)}
${group(
  "How did the call reach 911?",
  "",
  `${P}-how`, "radio", "how",
  [
    "A voice call",
    "A text to 911",
    "A relay service or TTY",
    "A medical alert button or device",
    "Someone else spoke for me",
    "Not sure",
  ]
)}
${group(
  "When did this happen?",
  "A rough guess is fine.",
  `${P}-when`, "radio", "when",
  ["In the last year", "1 to 5 years ago", "More than 5 years ago"]
)}
${group(
  "How many times has 911 been called for you in the past year?",
  "Count every medical call, not just this one.",
  `${P}-count`, "radio", "count",
  ["None", "Once", "2 or 3 times", "4 or more times", "Not sure"]
)}
${part(2, PARTS, "What happened")}
          <div class="field">
            <label for="${P}-story">Tell us what happened <span class="field__req">(required)</span></label>
            <p class="field__hint" id="${P}-story-hint">Start wherever you like.
               What was going on, who came, how they treated you, and how it
               ended. There is no wrong way to write it.</p>
            <textarea id="${P}-story" name="story" rows="10" aria-describedby="${P}-story-hint"></textarea>
          </div>
${text(
  "Sum it up in one line",
  "If someone only read one sentence of your story, what should it be?",
  `${P}-line`, "oneLine"
)}
          <p><a href="#${P}-send">Short on time? Skip to the end and send just your story</a></p>
${part(3, PARTS, "Where it happened")}
${coreWhere(P)}
${group(
  "Where were you?",
  "",
  `${P}-place`, "radio", "place",
  [
    "At home",
    "In a group home or care home",
    "At work or school",
    "Out in public",
    "In a car or on the road",
    "Somewhere else",
  ]
)}
${part(4, PARTS, "How it went")}
${group(
  "Who came?",
  "Everyone who showed up, as far as you know.",
  `${P}-who`, "checkbox", "responders[]",
  ["Ambulance or paramedics", "Fire department", "Police", "A crisis team", "Nobody came", "Not sure"]
)}
${group(
  "How well did the 911 call-taker understand you?",
  "",
  `${P}-dispatch`, "radio", "dispatchUnderstood", SCALE_WELL
)}
${group(
  "How well did the responders understand your disability and needs?",
  "Think about how they spoke to you, moved you, and listened.",
  `${P}-understood`, "radio", "respondersUnderstood", SCALE_WELL
)}
${group(
  "How much did they include you in decisions about your care?",
  "",
  `${P}-included`, "radio", "included",
  ["Not at all", "A little", "Some", "Mostly", "Fully", "Not sure"]
)}
${group(
  "How safe did you feel with the responders?",
  "",
  `${P}-safe`, "radio", "safe",
  ["Very unsafe", "Unsafe", "Okay", "Safe", "Very safe"]
)}
${group(
  "Did any of these happen?",
  "These are things we hear about often.",
  `${P}-issues`, "checkbox", "issues[]",
  [
    "It was hard to communicate",
    "They did not believe me, or thought I was drunk or on drugs",
    "They spoke to someone else instead of me",
    "My wheelchair or other equipment was left behind",
    "My equipment was damaged",
    "My service animal was kept away",
    "My medicine or a device was left behind",
    "I was held down or restrained",
    "I was handcuffed or arrested",
    "I was taken somewhere I did not want to go",
    "They would not take me to the hospital",
    "I was treated well",
  ]
)}
${text(
  "What is the ONE thing that would have made it better?",
  "If you could change one thing about how it went, what would it be?",
  `${P}-better`, "better", { long: true }
)}
${part(5, PARTS, "What helped")}
          <p>Many people prepare for emergencies ahead of time. Tell us what you
             had, and whether it helped. This is how we learn what works.</p>
${helpedRow(P, "file", "A medical information file at home, like a File of Life")}
${helpedRow(P, "registry", "A profile registered with 911 ahead of time, like Smart911")}
${helpedRow(P, "id", "A medical ID bracelet, wallet card, or phone medical ID")}
${helpedRow(P, "card", "A communication card, board, or speech device")}
${helpedRow(P, "person", "Someone with me who knew my needs")}
${helpedRow(P, "told", "Telling the 911 call-taker about my disability")}
${text(
  "Anything else that helped?",
  "A tip for someone in your shoes. Something you did, said, or kept ready.",
  `${P}-tip`, "tip", { long: true }
)}
${part(6, PARTS, "Afterward")}
${group(
  "Did you go to the hospital?",
  "",
  `${P}-hospital`, "radio", "hospital",
  [
    "Yes, by ambulance",
    "Yes, another way",
    "No, I chose not to go",
    "No, they would not take me",
    "Not sure",
  ]
)}
${group(
  "Did you get a bill for the ambulance?",
  "Count what you had to pay yourself, after insurance.",
  `${P}-bill`, "radio", "bill",
  ["No bill, or it was covered", "Under $500", "$500 to $1,999", "$2,000 or more", "Not sure yet"]
)}
${group(
  "Before this happened, how did you feel about calling 911?",
  "",
  `${P}-trust-before`, "radio", "trustBefore",
  ["I would not call", "Only if I had no choice", "Unsure", "I would call, with some worry", "I would call without worry"]
)}
${group(
  "And now?",
  "",
  `${P}-trust-after`, "radio", "trustAfter",
  ["I would not call", "Only if I had no choice", "Unsure", "I would call, with some worry", "I would call without worry"]
)}
${group(
  "Overall, how did it go?",
  "",
  `${P}-overall`, "radio", "overall",
  ["Very badly", "Badly", "Mixed", "Well", "Very well"]
)}
${coreAboutYou(P, 7, PARTS)}
${coreUseAndStay(P, 8, PARTS)}

          <p class="btn-row" id="${P}-send" style="margin-block-start: var(--space-6)">
            <button type="button" class="btn btn--primary" disabled aria-describedby="${P}-draft-note">Send my story</button>
          </p>
          <p class="field__hint" id="${P}-draft-note">This is a preview. Sending is
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
