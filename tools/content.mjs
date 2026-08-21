/**
 * Page content for beenabled.org.
 *
 * This file is the scaffold source. After tools/scaffold-pages.mjs has run, the
 * emitted .html files are the source of truth for content and may be edited by
 * hand; re-running the scaffold will skip any page that already exists unless
 * --force is passed.
 *
 * Writing rules, which are compliance requirements and not style preferences:
 *   SC 3.1.5  Reading level at or below lower secondary. Short sentences, one
 *             idea per paragraph, common words. Verified by tools/readability.mjs.
 *   SC 3.1.4  Every abbreviation is spelled out in visible text on first use on
 *             each page, and linked to /glossary/.
 *   SC 2.4.9  Link text must make sense read on its own. Never "learn more",
 *             "read more", "click here". Verified by tools/link-text.mjs.
 *   SC 1.4.9  No text baked into images. Diagrams use inline SVG <text>.
 *   SC 3.2.5  No target="_blank" anywhere.
 */

export const SITE = {
  origin: "https://beenabled.org",
  name: "Be Enabled Advocacy Alliance",
  slogan: "Accessibility for all",
  description:
    "Be Enabled Advocacy Alliance is a disability-led non-profit. We work for housing, healthcare, education, transportation, and money security, and for the right of disabled people to run their own lives.",
};

/* Reusable call-to-action block. Link text is self-describing on purpose. */
const CTA = `
    <section class="section section--tint">
      <div class="wrap">
        <h2>Work with us</h2>
        <p>We are a small organisation. Every hand and every dollar changes what we can take on.</p>
        <p class="btn-row">
          <a class="btn btn--accent" href="/get-involved/">Find a way to get involved</a>
          <a class="btn btn--secondary" href="/contact/">Contact Be Enabled Advocacy Alliance</a>
        </p>
      </div>
    </section>`;

const DOMAINS = [
  {
    slug: "housing",
    mod: "housing",
    name: "Housing",
    short: "A home you can get into, afford, and stay in.",
  },
  {
    slug: "healthcare",
    mod: "healthcare",
    name: "Healthcare",
    short: "Care that reaches you, and equipment that actually fits your life.",
  },
  {
    slug: "education",
    mod: "education",
    name: "Education",
    short: "School and training that expect you to succeed.",
  },
  {
    slug: "transportation",
    mod: "transportation",
    name: "Transportation",
    short: "A way to get where you are going, when you need to go.",
  },
  {
    slug: "financial-security",
    mod: "money",
    name: "Money and benefits",
    short: "Enough income to live on, without losing the support you need.",
  },
];

const domainCards = DOMAINS.map(
  (d) => `          <li class="card card--domain card--${d.mod}">
            <h3><a class="card__link" href="/what-we-do/${d.slug}/">${d.name}</a></h3>
            <p>${d.short}</p>
          </li>`
).join("\n");

export const PAGES = [
  /* ---------------------------------------------------------------- Home */
  {
    file: "index.html",
    url: "/",
    title: "Be Enabled Advocacy Alliance — Disability-Led Advocacy",
    description:
      "A disability-led non-profit working for housing, healthcare, education, transportation, and money security, so disabled people can run their own lives.",
    h1: "Advocacy led by disabled people",
    body: `
    <section class="hero">
      <div class="wrap hero__inner">
        <div class="stack">
          <h1>Advocacy led by disabled people</h1>
          <p class="lede">We work for housing, healthcare, school, transport, and
             money security — and for your right to run your own life.</p>
          <p class="btn-row">
            <a class="btn btn--primary" href="/what-we-do/">See the five things we work on</a>
            <a class="btn btn--secondary" href="/about/">About Be Enabled Advocacy Alliance</a>
          </p>
        </div>
        <div class="hero__art" aria-hidden="true">
          <svg class="wheel" viewBox="0 0 200 200" focusable="false">
            <circle class="wheel__tire" cx="100" cy="100" r="84" stroke-width="10"/>
            <g class="wheel__spoke" stroke-width="5" stroke-linecap="round">
              <line x1="100" y1="100" x2="100" y2="22"/>
              <line x1="100" y1="100" x2="45"  y2="45"/>
              <line x1="100" y1="100" x2="22"  y2="100"/>
              <line x1="100" y1="100" x2="45"  y2="155"/>
              <line x1="100" y1="100" x2="100" y2="178"/>
            </g>
            <path class="wheel__arc" d="M100 16 a84 84 0 0 1 0 168" stroke-width="22" stroke-linecap="round"/>
            <circle class="wheel__hub" cx="100" cy="100" r="19"/>
          </svg>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap wrap--narrow">
        <div class="in-short">
          <h2>In short</h2>
          <p>Be Enabled Advocacy Alliance is a non-profit run by disabled people.</p>
          <p>We work on five things every person needs: a home, healthcare,
             school, a way to get around, and enough money to live on.</p>
          <p>We also work on the everyday technology that makes those five things
             possible.</p>
          <p>Our goal is simple. People should be able to run their own lives and
             make their own choices.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <h2>The five things we work on</h2>
        <p>Each one holds up the others. Lose one and the rest get harder.</p>
        <ul class="grid no-bullet">
${domainCards}
        </ul>
        <hr class="rule">
        <h3>And the technology that ties them together</h3>
        <p>Direct support technology is the everyday tools disabled people use to
           live day to day. Think of the app that books your ride, the device that
           lets you write, or the system that tracks your care hours. When those
           tools are built badly, every other part of life gets harder. We push
           for tools that are built with disabled people, not just for them.</p>
        <p><a href="/what-we-do/">Read how the five areas connect</a></p>
      </div>
    </section>

    <section class="section section--raised">
      <div class="wrap wrap--narrow">
        <h2>Why we join these things up</h2>
        <p>Most groups pick one issue and stay there. We do not, because life does
           not work that way.</p>
        <p>A home you cannot leave is not really a home. A job you cannot reach is
           not really a job. A benefit that disappears the moment you earn a wage
           is not really support.</p>
        <p>Access is the thread that runs through all of it. We work on the whole
           thread, and on the power communities need to defend it.</p>
      </div>
    </section>
${CTA}`,
  },

  /* --------------------------------------------------------------- About */
  {
    file: "about/index.html",
    url: "/about/",
    title: "About Us | Be Enabled Advocacy Alliance",
    description:
      "Be Enabled Advocacy Alliance is a disability-led non-profit. Learn what disability-led means, how we work, and why we join five areas of life together.",
    h1: "About Be Enabled Advocacy Alliance",
    crumb: "About",
    trail: [],
    body: `
    <section class="section">
      <div class="wrap wrap--narrow stack">
        <h1>About Be Enabled Advocacy Alliance</h1>

        <div class="in-short">
          <h2>In short</h2>
          <p>We are a non-profit led by disabled people.</p>
          <p>We do three kinds of work: advocacy, programmes, and community building.</p>
          <p>We work on five parts of life at once, because they hold each other up.</p>
          <p>We want disabled people to have both the basics of a good life and the
             power to protect them.</p>
        </div>

        <h2>Who we are</h2>
        <p>Be Enabled Advocacy Alliance is a disability-led advocacy, programming,
           and community organisation. Most people use the short name BEAA, said
           as "bee-ay-ay".</p>
        <p>We work to grow autonomy and agency for people who are pushed to the
           edges — and above all for disabled people. <a href="/glossary/#autonomy">Autonomy</a>
           means running your own life. <a href="/glossary/#agency">Agency</a>
           means having a real say in what happens to you.</p>

        <h2>What "disability-led" means here</h2>
        <p>It means disabled people are not just consulted. We set the agenda, do
           the work, and make the decisions.</p>
        <p>Plenty of groups speak about disabled people. Fewer are run by them.
           That difference shows up in what gets prioritised, what gets noticed,
           and what gets left out.</p>

        <h2>How we work</h2>
        <dl class="def-list">
          <dt>Advocacy</dt>
          <dd>We push for better rules, better services, and better design. Some of
              that is public. A lot of it is slow work with agencies and providers.</dd>

          <dt>Programming</dt>
          <dd>We run projects that meet a need directly, rather than waiting for a
              policy to change. <a href="/glossary/#blue-envelope-project">The Blue Envelope Project</a>
              is one of them.</dd>

          <dt>Community</dt>
          <dd>We build the space many of us needed and never had: somewhere to find
              support, guidance, connection, culture, and to be believed.</dd>
        </dl>

        <h2>The five areas, and why we refuse to separate them</h2>
        <p>We work across housing, healthcare, education, transportation, and money
           security. We treat them as one system because that is how they are lived.</p>
        <p>A missed bus becomes a missed appointment. A missed appointment becomes a
           lapsed prescription. A lapsed prescription becomes a lost job. The parts
           are not separate, so our work is not either.</p>
        <p><a href="/what-we-do/">Read about the five areas we work on</a></p>

        <h2>Our legal status</h2>
        <p>Be Enabled Advocacy Alliance is a non-profit organisation under section
           <a href="/glossary/#sec-501c3">501(c)(3)</a> of the United States tax code.
           Gifts to us may be tax deductible.</p>
        <!-- TODO(content): EIN, year founded, mailing address, board and staff
             names, and the annual report link. See CONTENT-TODO.md. These are
             deliberately left blank rather than filled with placeholder text. -->
        <p class="text-muted">We are still writing up our board, our finances, and
           our full history for this page.</p>
      </div>
    </section>
${CTA}`,
  },

  /* -------------------------------------------------------- What we do */
  {
    file: "what-we-do/index.html",
    url: "/what-we-do/",
    title: "What We Do | Be Enabled Advocacy Alliance",
    description:
      "We work across five connected areas: housing, healthcare, education, transportation, and money security, plus the direct support technology that ties them together.",
    h1: "What we do",
    crumb: "What we do",
    trail: [],
    body: `
    <section class="section">
      <div class="wrap wrap--narrow stack">
        <h1>What we do</h1>
        <p class="lede">Five areas of life, treated as one system.</p>

        <div class="in-short">
          <h2>In short</h2>
          <p>We work on housing, healthcare, education, transportation, and money security.</p>
          <p>We also work on direct support technology — the everyday tools disabled people rely on.</p>
          <p>We keep these together because a problem in one area causes problems in the others.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <h2>The five areas</h2>
        <ul class="grid no-bullet">
${domainCards}
        </ul>
      </div>
    </section>

    <section class="section section--tint">
      <div class="wrap wrap--narrow stack">
        <h2>Direct support technology</h2>
        <p>Direct support technology means the tools that carry daily life: the app
           that books a ride, the device that lets someone write or speak, the
           system a care agency uses to log hours.</p>
        <p>These tools decide who gets served and who gets stuck. A booking app that
           a screen reader cannot read will lock out a blind rider just as firmly as
           a step at the door.</p>
        <p>So we treat technology as infrastructure, not as a gadget. We ask for
           tools designed with disabled people from the start.</p>
      </div>
    </section>

    <section class="section">
      <div class="wrap wrap--narrow stack">
        <h2>How the five areas pull on each other</h2>
        <p>Here is one ordinary chain of events.</p>
        <ul class="tick-list">
          <li>The lift at the station is broken, so the trip to the clinic does not happen.</li>
          <li>The missed appointment means a prescription runs out.</li>
          <li>Being unwell means missing shifts at work.</li>
          <li>Lost wages put the rent at risk.</li>
          <li>An unstable address makes it harder to keep benefits and harder to stay in school.</li>
        </ul>
        <p>One broken lift, five areas of life. That is why we do not pick just one.</p>
      </div>
    </section>
${CTA}`,
  },

];

/* -------------------------------------------------------- Domain pages --
   Each follows the same shape: an "In short" summary (the conforming
   supplemental version permitted by SC 3.1.5), what is happening, what we do,
   and how the area pulls on the other four. */
const domainPage = ({ slug, title, description, h1, lede, inShort, whatsHappening, whatWeDo, connects }) => ({
  file: `what-we-do/${slug}/index.html`,
  url: `/what-we-do/${slug}/`,
  title,
  description,
  h1,
  crumb: h1,
  trail: [{ name: "What we do", url: "/what-we-do/" }],
  body: `
    <section class="section">
      <div class="wrap wrap--narrow stack">
        <h1>${h1}</h1>
        <p class="lede">${lede}</p>

        <div class="in-short">
          <h2>In short</h2>
${inShort.map((l) => `          <p>${l}</p>`).join("\n")}
        </div>

        <h2>What is happening now</h2>
${whatsHappening}

        <h2>What we do about it</h2>
${whatWeDo}

        <h2>How this connects to the rest</h2>
${connects}
      </div>
    </section>
${CTA}`,
});

const DOMAIN_PAGES = [
  domainPage({
    slug: "housing",
    title: "Housing | Be Enabled Advocacy Alliance",
    description:
      "Disabled people need homes they can get into, afford, and stay in. We work for accessible, affordable housing and the right to live in your own community.",
    h1: "Housing",
    lede: "A home you can get into, afford, and stay in.",
    inShort: [
      "Most homes are built with steps, narrow doors, and bathrooms nobody can use in a wheelchair.",
      "Accessible homes are rare, so they cost more and fill up fast.",
      "Some disabled people end up in nursing homes when they could live at home with the right support.",
      "We work for homes that are accessible and affordable, and for the right to stay in your own community.",
    ],
    whatsHappening: `        <p>Very little housing is built to be accessible. What exists is scattered,
           often old, and usually more expensive. Waiting lists run for years.</p>
        <p>Landlords are required to allow reasonable changes to a home, but the
           tenant often has to pay for them and undo them later. That is a real
           cost most renters cannot carry.</p>
        <p>When accessible housing cannot be found, people get placed in nursing
           homes and other institutions. Many of them do not need to be there. They
           need a step-free door and a few hours of support a day.</p>
        <p>The Supreme Court settled the principle in 1999 in a case called
           <a href="/glossary/#olmstead">Olmstead</a>: needless segregation of
           disabled people is discrimination. Twenty-five years on, the practice has
           not caught up with the ruling.</p>`,
    whatWeDo: `        <ul class="tick-list">
          <li>We push local builders and planners to include step-free entrances,
              wider doors, and usable bathrooms from the first drawing, when it is
              cheap, instead of retrofitting later, when it is not.</li>
          <li>We help people ask for changes to a rented home, and push back when a
              reasonable request is refused.</li>
          <li>We support people who want to move out of an institution and back into
              their own community, and we press the agencies that make that slow.</li>
          <li>We speak up for more Home and Community-Based Services
              (<a href="/glossary/#hcbs">HCBS</a>), the funding that pays for support
              in your own home rather than in a facility.</li>
        </ul>`,
    connects: `        <p>Housing is the address everything else is delivered to. Care visits, post
           about benefits, a school place, a bus route — all of them assume a stable
           home.</p>
        <p>Where you live also decides what you can reach. A cheaper flat with no bus
           route can cost more than an expensive one on a good line.</p>
        <p><a href="/what-we-do/transportation/">Read about our transportation work</a>
           and <a href="/what-we-do/healthcare/">read about our healthcare work</a>.</p>`,
  }),

  domainPage({
    slug: "healthcare",
    title: "Healthcare | Be Enabled Advocacy Alliance",
    description:
      "Care that reaches disabled people, equipment that fits real life, and clinics you can actually get into. We work on access, coverage, and being believed.",
    h1: "Healthcare",
    lede: "Care that reaches you, and equipment that actually fits your life.",
    inShort: [
      "Many clinics cannot examine a patient who cannot stand or move to the table.",
      "Getting a wheelchair or other equipment approved can take months.",
      "Disabled people are often not believed when they describe their own symptoms.",
      "We work for care that is reachable, equipment that arrives on time, and staff who listen.",
    ],
    whatsHappening: `        <p>A clinic can have a ramp at the door and still be unusable. If the exam
           table does not lower, the scale cannot take a wheelchair, and no one is
           trained to transfer a patient safely, the visit does not really happen.</p>
        <p>Equipment is its own maze. A wheelchair, a lift, or a communication device
           can take months to be approved, and is often approved in a cheaper form
           than the one that was actually prescribed.</p>
        <p>There is also the part that does not show up in any policy document. Many
           disabled people are talked past, talked over, or told a symptom is just
           part of their condition. Being disbelieved delays diagnosis, and delay
           does real harm.</p>`,
    whatWeDo: `        <ul class="tick-list">
          <li>We help people appeal when equipment or care is refused, and we track
              the refusals that keep repeating.</li>
          <li>We work with clinics on the things that actually decide access:
              height-adjustable tables, wheelchair scales, longer appointment slots,
              and staff training.</li>
          <li>We push for Home and Community-Based Services
              (<a href="/glossary/#hcbs">HCBS</a>) so support arrives where people
              live, not only where a facility can bill for it.</li>
          <li>We work on making health information plain, so people can act on it
              without needing an interpreter for their own care.</li>
        </ul>`,
    connects: `        <p>Care depends on getting there. It depends on a stable address for post and
           follow-up. It depends on money, because a co-payment can be the reason an
           appointment is skipped.</p>
        <p>It runs the other way too. Untreated pain costs people jobs and school
           terms, which costs income, which costs housing.</p>
        <p><a href="/what-we-do/transportation/">Read about our transportation work</a>
           and <a href="/what-we-do/financial-security/">read about our work on money and benefits</a>.</p>`,
  }),

  domainPage({
    slug: "education",
    title: "Education | Be Enabled Advocacy Alliance",
    description:
      "School and training that expect disabled students to succeed. We work on support plans, college access, and the low expectations that limit futures.",
    h1: "Education",
    lede: "School and training that expect you to succeed.",
    inShort: [
      "Disabled students have a legal right to the support they need at school.",
      "Getting that support often depends on how well a family can argue for it.",
      "Support at college works differently, and many students find that out too late.",
      "We help families ask for what is owed, and we push schools to expect more.",
    ],
    whatsHappening: `        <p>In United States public schools, a disabled student may have an
           Individualized Education Program (<a href="/glossary/#iep">IEP</a>) or a
           504 plan. Both are legal documents. Both describe support the school is
           required to provide.</p>
        <p>The right exists. Getting it delivered is a different matter. Families who
           know the law, have time for meetings, and can push hard tend to get more.
           Families who cannot do those things tend to get less. That gap is not
           about the children.</p>
        <p>College changes the rules again. Nobody writes a plan for you any more.
           You have to identify yourself as disabled, ask for adjustments, and supply
           the paperwork. Students who were supported all through school often arrive
           having never been taught to do this.</p>
        <p>Underneath all of it sits low expectation, which is harder to appeal than
           any decision.</p>`,
    whatWeDo: `        <ul class="tick-list">
          <li>We help families prepare for school meetings and understand what the
              school must provide.</li>
          <li>We teach students to speak for themselves, so the skill transfers when
              the support system does not.</li>
          <li>We work with colleges and training providers on making disability
              services easy to find and easy to use.</li>
          <li>We challenge the assumption that a disabled student is a lower bet.</li>
        </ul>`,
    connects: `        <p>Getting to school needs transport. Staying in school needs stable housing.
           Learning needs health needs that are actually met.</p>
        <p>And school decides a lot about the money side of life later on, which is
           why low expectations are so expensive.</p>
        <p><a href="/what-we-do/financial-security/">Read about our work on money and benefits</a>
           and <a href="/what-we-do/housing/">read about our housing work</a>.</p>`,
  }),

  domainPage({
    slug: "transportation",
    title: "Transportation | Be Enabled Advocacy Alliance",
    description:
      "A way to get where you are going, when you need to go. We work on accessible transit, paratransit that runs on time, and rural transport gaps.",
    h1: "Transportation",
    lede: "A way to get where you are going, when you need to go.",
    inShort: [
      "A broken lift or a missing kerb ramp can end a journey before it starts.",
      "Paratransit often has to be booked a day ahead and can still arrive very late.",
      "Outside cities there is frequently no accessible transport at all.",
      "We work for transport that is reliable, not just technically available.",
    ],
    whatsHappening: `        <p>Most transport systems are accessible on paper. The gap is in whether they
           work on the day. A station lift that is out of service, a bus ramp that is
           not deployed, a driver who has not been trained — each one ends a trip.</p>
        <p><a href="/glossary/#paratransit">Paratransit</a> is the door-to-door
           service for people who cannot use regular buses and trains. It usually has
           to be booked the day before, comes within a wide time window, and often
           runs late. It is very hard to hold a job on a service that cannot promise
           when it will arrive.</p>
        <p>Outside cities the problem is simpler and worse: there is often nothing at
           all. Rural disabled people are frequently reliant on family, or they do
           not travel.</p>
        <p>Newer services have added a newer problem. Booking apps that a screen
           reader cannot read lock people out just as effectively as a step, and
           drivers still refuse service dogs and folding wheelchairs.</p>`,
    whatWeDo: `        <ul class="tick-list">
          <li>We track broken lifts, ramps, and stops, and keep reporting them until
              they are fixed.</li>
          <li>We push transport agencies to publish honest data about how often
              paratransit actually arrives on time.</li>
          <li>We work on rural transport gaps, which get far less attention than city
              systems.</li>
          <li>We press ride-hailing and booking services to make their apps usable
              with a screen reader, and to enforce their own service animal rules.</li>
        </ul>`,
    connects: `        <p>Transport is the connective tissue. It is how you reach the clinic, the
           school, the job, and the benefits office.</p>
        <p>It is also why a cheaper home in the wrong place is not cheaper. A home
           you cannot leave is not a home. It is an address.</p>
        <p><a href="/what-we-do/healthcare/">Read about our healthcare work</a> and
           <a href="/what-we-do/education/">read about our education work</a>.</p>`,
  }),

  domainPage({
    slug: "financial-security",
    title: "Money and Benefits | Be Enabled Advocacy Alliance",
    description:
      "Enough income to live on, without losing the support you need. We work on benefit cliffs, asset limits, ABLE accounts, and fair pay for disabled workers.",
    h1: "Money and benefits",
    lede: "Enough income to live on, without losing the support you need.",
    inShort: [
      "Many disability benefits stop or shrink as soon as you earn or save a little.",
      "That means taking a job can leave someone worse off than before.",
      "Some disabled workers are still legally paid less than the minimum wage.",
      "We work for rules that let people earn, save, and still keep their care.",
    ],
    whatsHappening: `        <p>Two main programmes support disabled adults in the United States.
           Supplemental Security Income (<a href="/glossary/#ssi">SSI</a>) is based on
           need. Social Security Disability Insurance
           (<a href="/glossary/#ssdi">SSDI</a>) is based on past work. Both come with
           strict limits on what you may earn and what you may keep.</p>
        <p>Those limits create what people call a
           <a href="/glossary/#benefit-cliff">benefit cliff</a>. Earn a little over
           the line and support does not taper — it drops. Someone can take a raise
           and end the month with less money and no healthcare. So people turn down
           hours, and it looks like a choice.</p>
        <p>Saving is restricted too. The asset limit for Supplemental Security Income
           has been 2,000 dollars since 1989 and has never been adjusted for
           inflation. Saving for an emergency can cost you the benefit.</p>
        <p><a href="/glossary/#able-account">ABLE accounts</a> were created to fix
           part of this, and they do help, but only people whose disability began
           before a set age can open one.</p>
        <p>There is also section 14(c) of the Fair Labor Standards Act, which still
           lets some employers pay disabled workers below the minimum wage.</p>`,
    whatWeDo: `        <ul class="tick-list">
          <li>We help people work out what a job will actually do to their benefits
              before they take it, so the decision is informed rather than feared.</li>
          <li>We help people open and use an ABLE account where they qualify.</li>
          <li>We campaign to raise the asset limits, which have not moved in decades.</li>
          <li>We support ending section 14(c) and the subminimum wage.</li>
        </ul>`,
    connects: `        <p>Money is what turns a right into a real option. Rent, co-payments, fares,
           and equipment all cost money.</p>
        <p>And it runs both ways. Poor transport limits which jobs you can take. An
           unmet health need limits how many hours you can work. Weak education
           limits pay for a lifetime.</p>
        <p><a href="/what-we-do/housing/">Read about our housing work</a> and
           <a href="/what-we-do/healthcare/">read about our healthcare work</a>.</p>`,
  }),
];

PAGES.push(...DOMAIN_PAGES);

/* ----------------------------------------------------------- Glossary --
   Required by SC 3.1.3 Unusual Words and SC 3.1.4 Abbreviations. An
   <abbr title> alone does not satisfy AAA, because the title attribute cannot
   be reached by keyboard or touch. So every term is spelled out in visible text
   on first use and linked here. */
const TERMS = [
  ["sec-501c3", "501(c)(3)", `The part of the United States tax code that covers charities. A 501(c)(3) organisation does not pay federal income tax, and gifts to it may be tax deductible.`],
  ["sec-504-plan", "504 plan", `A written plan that sets out the changes a school will make for a disabled student. It comes from Section 504 of the Rehabilitation Act. It is usually shorter and simpler than an Individualized Education Program.`],
  ["able-account", "ABLE account", `A savings account a disabled person can use without losing benefits. Money in an ABLE account does not count towards the usual savings limit. Only people whose disability began before a set age can open one.`],
  ["ada", "ADA (Americans with Disabilities Act)", `A United States law passed in 1990. It makes it illegal to discriminate against disabled people in work, public services, and public places.`],
  ["agency", "Agency", `Having a real say in what happens to you. Being the one who decides, rather than the one who is decided about.`],
  ["assistive-technology", "Assistive technology", `Any tool that helps a disabled person do something. It covers everything from a walking stick to screen reading software.`],
  ["autonomy", "Autonomy", `Running your own life. Making your own choices about where you live, who supports you, and what you do.`],
  ["benefit-cliff", "Benefit cliff", `The point where earning slightly more money causes benefits to stop suddenly instead of reducing gradually. It can leave someone worse off after a pay rise.`],
  ["blue-envelope-project", "Blue Envelope Project", `A Be Enabled Advocacy Alliance programme. <!-- TODO(content): describe the programme in two or three plain sentences. See CONTENT-TODO.md -->`],
  ["direct-support-technology", "Direct support technology", `The everyday tools disabled people use to get through the day. Booking apps, communication devices, and the systems care agencies use to schedule support.`],
  ["disability-led", "Disability-led", `An organisation where disabled people set the agenda and make the decisions, rather than only being asked for their views.`],
  ["dme", "DME (durable medical equipment)", `Equipment prescribed for use over a long period, such as a wheelchair, a hoist, or a hospital bed.`],
  ["hcbs", "HCBS (Home and Community-Based Services)", `Funding that pays for support in a person's own home and neighbourhood, instead of in a nursing home or other institution.`],
  ["iep", "IEP (Individualized Education Program)", `A legal document for a disabled student in a United States public school. It sets out the student's goals and the support the school must provide.`],
  ["medicaid-waiver", "Medicaid waiver", `A programme that lets a state use Medicaid money in ways the normal rules would not allow. Waivers are often how support at home gets paid for.`],
  ["olmstead", "Olmstead decision", `A United States Supreme Court ruling from 1999. It found that keeping disabled people in institutions when they could live in the community is a form of discrimination.`],
  ["paratransit", "Paratransit", `A door-to-door transport service for people who cannot use regular buses and trains. It usually has to be booked in advance.`],
  ["screen-reader", "Screen reader", `Software that reads what is on a screen out loud, or sends it to a braille display. It is how many blind people use a computer or phone.`],
  ["ssdi", "SSDI (Social Security Disability Insurance)", `A United States benefit for disabled people who have worked and paid into Social Security. The amount is based on past earnings.`],
  ["ssi", "SSI (Supplemental Security Income)", `A United States benefit for disabled people with very little income or savings. It is based on need rather than on past work.`],
  ["subminimum-wage", "Subminimum wage", `Pay below the legal minimum wage. Section 14(c) of the Fair Labor Standards Act still allows some employers to pay disabled workers this way.`],
  ["wcag", "WCAG (Web Content Accessibility Guidelines)", `The international standard for making websites usable by disabled people. It has three levels: A, AA, and AAA.`],
];

const glossaryBody = TERMS.map(
  ([id, term, def]) => `          <div>
            <dt id="${id}"><dfn>${term}</dfn></dt>
            <dd>${def}</dd>
          </div>`
).join("\n");

PAGES.push(
  /* -------------------------------------------------------- Get involved */
  {
    file: "get-involved/index.html",
    url: "/get-involved/",
    title: "Get Involved | Be Enabled Advocacy Alliance",
    description:
      "Give, volunteer, partner, or join our mailing list. Every hand and every dollar changes what a small disability-led non-profit can take on.",
    h1: "Get involved",
    crumb: "Get involved",
    trail: [],
    body: `
    <section class="section">
      <div class="wrap wrap--narrow stack">
        <h1>Get involved</h1>
        <p class="lede">There is more than one way in, and none of them require you
           to be an expert.</p>

        <div class="in-short">
          <h2>In short</h2>
          <p>You can give money, give time, or share what you know.</p>
          <p>Organisations can partner with us on a project.</p>
          <p>You can also just stay in touch and read what we send.</p>
        </div>
      </div>
    </section>

    <section class="section section--tint">
      <div class="wrap">
        <h2>Ways to help</h2>
        <ul class="grid no-bullet">
          <li class="card">
            <h3>Give money</h3>
            <p>We are a 501(c)(3) non-profit, so gifts may be tax deductible.
               Regular monthly gifts help most, because they let us plan.</p>
            <!-- TODO(content): replace # with the real donation URL once the
                 processor is chosen. See CONTENT-TODO.md -->
            <p><a class="btn btn--accent" href="#">Donate to Be Enabled Advocacy Alliance</a></p>
            <p class="card__meta">Donations are handled on a separate secure site.</p>
          </li>

          <li class="card">
            <h3>Give time</h3>
            <p>We need help with research, writing, testing websites and apps,
               staffing events, and sitting with people through paperwork.</p>
            <p>Lived experience counts as a qualification here.</p>
            <p><a href="/contact/">Contact us about volunteering</a></p>
          </li>

          <li class="card">
            <h3>Partner with us</h3>
            <p>We work with clinics, schools, transport agencies, landlords, and
               technology teams who want to get access right.</p>
            <p><a href="/contact/">Contact us about a partnership</a></p>
          </li>

          <li class="card">
            <h3>Share what you know</h3>
            <p>Tell us where the system broke for you. Patterns are what let us
               push for a change instead of fixing one case at a time.</p>
            <p><a href="/contact/">Tell us what happened to you</a></p>
          </li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="wrap wrap--narrow stack">
        <h2>Stay in touch</h2>
        <p>We send occasional updates about our work and about changes to rules
           that affect disabled people. We do not send often, and we do not share
           your address with anyone.</p>
        <!-- TODO(content): replace # with the real mailing list URL. We link out
             rather than embed a signup widget, because embedded third-party forms
             reliably fail Level AAA and we cannot fix code we do not control. -->
        <p><a class="btn btn--primary" href="#">Join the Be Enabled mailing list</a></p>
        <p class="card__meta">The mailing list is run on a separate site.</p>
      </div>
    </section>`,
  },

  /* -------------------------------------------------------------- Contact */
  {
    file: "contact/index.html",
    url: "/contact/",
    title: "Contact Us | Be Enabled Advocacy Alliance",
    description:
      "Get in touch with Be Enabled Advocacy Alliance by email, phone, or post, or send us a message using the form on this page. We reply within five working days.",
    h1: "Contact us",
    crumb: "Contact",
    trail: [],
    body: `
    <section class="section">
      <div class="wrap wrap--narrow stack">
        <h1>Contact us</h1>
        <p class="lede">Use whichever of these is easiest for you. They all reach
           the same small team.</p>

        <div class="in-short">
          <h2>In short</h2>
          <p>You can email us, phone us, write to us, or use the form on this page.</p>
          <p>We aim to reply within five working days.</p>
          <p>If you need a reply in a particular format, say so and we will use it.</p>
        </div>

        <h2>Ways to reach us</h2>
        <dl class="def-list">
          <dt>Email</dt>
          <!-- TODO(content): replace with the real address. See CONTENT-TODO.md -->
          <dd><a href="mailto:hello@beenabled.org">hello@beenabled.org</a></dd>

          <dt>Phone</dt>
          <!-- TODO(content): add the real phone number, and confirm whether you
               accept relay and video relay calls. -->
          <dd>Coming soon. Until then, please use email or the form below.</dd>

          <dt>Post</dt>
          <!-- TODO(content): add the mailing address. -->
          <dd>Coming soon.</dd>
        </dl>
      </div>
    </section>

    <section class="section section--tint">
      <div class="wrap wrap--narrow stack">
        <h2>Send us a message</h2>
        <p>Every box tells you what it is for. Only your message is required — give
           us a way to reply only if you want one.</p>

        <!-- SC 3.3.6 Error Prevention (All): with JavaScript on, app.js adds a
             review step so nothing is sent until it has been read back and
             confirmed. With JavaScript off this posts directly and the browser's
             own required-field checks apply.
             TODO(content): set action to the real form endpoint. -->
        <form class="contact-form" method="post" action="#" data-confirm-before-send novalidate>
          <div class="field">
            <label for="cf-name">Your name <span class="field__req">(optional)</span></label>
            <p class="field__hint" id="cf-name-hint">What should we call you? You can leave this blank.</p>
            <input type="text" id="cf-name" name="name" autocomplete="name" aria-describedby="cf-name-hint">
            <p class="field__error" id="cf-name-error"></p>
          </div>

          <div class="field">
            <label for="cf-email">Email address <span class="field__req">(optional)</span></label>
            <p class="field__hint" id="cf-email-hint">We only use this to reply to you. Leave it blank if you do not want a reply by email.</p>
            <input type="email" id="cf-email" name="email" autocomplete="email" aria-describedby="cf-email-hint">
            <p class="field__error" id="cf-email-error"></p>
          </div>

          <div class="field">
            <label for="cf-topic">What is this about?</label>
            <p class="field__hint" id="cf-topic-hint">This helps us send your message to the right person.</p>
            <select id="cf-topic" name="topic" aria-describedby="cf-topic-hint">
              <option value="general">Something else</option>
              <option value="help">I need help with a problem</option>
              <option value="volunteer">Volunteering</option>
              <option value="partner">Working together</option>
              <option value="access">A problem with this website</option>
              <option value="press">Press or media</option>
            </select>
          </div>

          <div class="field">
            <label for="cf-message">Your message <span class="field__req">(required)</span></label>
            <p class="field__hint" id="cf-message-hint">Tell us what is going on. There is no wrong way to write it, and you do not need to use official words.</p>
            <textarea id="cf-message" name="message" required aria-describedby="cf-message-hint"></textarea>
            <p class="field__error" id="cf-message-error"></p>
          </div>

          <p class="btn-row" style="margin-block-start: var(--space-6)">
            <button type="submit" class="btn btn--primary">Send this message</button>
          </p>

          <div class="form-status" role="status" data-form-status></div>
        </form>
      </div>
    </section>`,
  },

  /* -------------------------------------------------------- Accessibility */
  {
    file: "accessibility/index.html",
    url: "/accessibility/",
    title: "Accessibility Statement | Be Enabled Advocacy Alliance",
    description:
      "Our accessibility conformance claim for beenabled.org, the standard we build to, the gaps we know about, and how to report a barrier you run into.",
    h1: "Accessibility statement",
    crumb: "Accessibility",
    trail: [],
    body: `
    <section class="section">
      <div class="wrap wrap--narrow stack">
        <h1>Accessibility statement</h1>
        <p class="lede">We are a disability-led organisation. This website is the
           first thing we ask you to judge us on.</p>

        <div class="in-short">
          <h2>In short</h2>
          <p>We build this site to the highest level of the international web accessibility standard.</p>
          <p>We list the parts we have not fully met, rather than claiming we met everything.</p>
          <p>If something here is hard to use, tell us and we will fix it.</p>
        </div>

        <h2>What we aim for</h2>
        <p>We build to the Web Content Accessibility Guidelines
           (<a href="/glossary/#wcag">WCAG</a>) version 2.2, at Level AAA. That is
           the highest of the three levels.</p>
        <p>We claim Level AAA <strong>with the documented exceptions listed
           below</strong>. We word it that way on purpose. The group that writes the
           standard advises against claiming full Level AAA for an entire site,
           because some content cannot meet every rule. Naming the gaps is more
           honest than a badge that hides them.</p>

        <h2>What we have done</h2>
        <ul class="tick-list">
          <li>Every combination of text and background colour on this site meets the
              7:1 contrast ratio Level AAA requires. This is checked by a script on
              every change, not by eye.</li>
          <li>You can change the colours, the text size, the line spacing, and the
              amount of movement using <a href="#display-settings">the display settings on this page</a>.
              Your choices are remembered in your browser.</li>
          <li>Every button and link you can tap is at least 44 by 44 pixels.</li>
          <li>Everything works with a keyboard alone, and with a screen reader.</li>
          <li>Links are always underlined, so you never have to see colour to know
              something is a link.</li>
          <li>Lines of text are kept short enough to read comfortably, and text is
              never stretched to both edges.</li>
          <li>There is no moving, flashing, or automatically changing content
              anywhere on this site. Nothing pops up over what you are reading.</li>
          <li>The site works fully with JavaScript turned off.</li>
          <li>We use no cookies and no tracking of any kind.</li>
        </ul>

        <h2>Where we fall short</h2>
        <p>These are the parts of Level AAA we have not fully met, and why.</p>
        <dl class="def-list">
          <dt>Identifying the purpose of page parts (rule 1.3.6)</dt>
          <dd>This rule expects browsers to be able to swap in a reader's preferred
              symbols and wording. No browser or add-on does this yet, so the rule
              cannot really be met or tested by anyone. We have done the parts that
              are possible today.</dd>

          <dt>Reading level (rule 3.1.5)</dt>
          <dd>Some subjects — benefit rules, tax status, education law — cannot be
              made simple without becoming wrong. Where that happens we keep the
              accurate version and put a plain-language "In short" summary at the top
              of the page. The standard allows this.</dd>

          <dt>Sites we link to</dt>
          <dd>Donations and our mailing list are handled on other companies' sites.
              We chose to link out rather than embed their forms here, because we
              cannot fix code we do not control. We cannot promise those sites meet
              this standard.</dd>

          <dt>Some information is still missing</dt>
          <dd>Parts of this site are marked as coming soon. That is unfinished
              content, not an access barrier, but we know it is frustrating.</dd>
        </dl>

        <h2 id="report">Tell us about a barrier</h2>
        <p>If any part of this site is hard or impossible for you to use, we want to
           know. You do not need to know the technical words for it. "I could not
           work out how to do X" is a useful report.</p>
        <p>We aim to reply within five working days.</p>
        <p><a href="/contact/">Contact us about a problem with this website</a></p>

        <h2>How we test</h2>
        <p>We use automated checking tools on every change. Those tools catch
           roughly a third of accessibility problems, so we also test by hand: using
           a keyboard only, using a screen reader, at 400 percent zoom, and in high
           contrast mode.</p>
        <p class="text-muted"><!-- TODO(content): fill in once the manual audit is
           complete. --> Last reviewed: not yet. This statement will be updated with
           a date and the assistive technology we tested with once our first full
           manual review is finished.</p>
      </div>
    </section>`,
  },

  /* ------------------------------------------------------------- Glossary */
  {
    file: "glossary/index.html",
    url: "/glossary/",
    title: "Word List | Be Enabled Advocacy Alliance",
    description:
      "Plain-language definitions of the words and abbreviations used across this site, from ABLE accounts and benefit cliffs to paratransit and Medicaid waivers.",
    h1: "Word list",
    crumb: "Word list",
    trail: [],
    schema: [
      {
        "@type": "DefinedTermSet",
        "@id": "https://beenabled.org/glossary/#terms",
        name: "Be Enabled Advocacy Alliance word list",
        hasDefinedTerm: TERMS.map(([id, term, def]) => ({
          "@type": "DefinedTerm",
          "@id": `https://beenabled.org/glossary/#${id}`,
          name: term,
          description: def.replace(/<[^>]*>/g, "").trim(),
        })),
      },
    ],
    body: `
    <section class="section">
      <div class="wrap wrap--narrow stack">
        <h1>Word list</h1>
        <p class="lede">Every word and abbreviation we use on this site, explained
           in plain language.</p>

        <div class="in-short">
          <h2>In short</h2>
          <p>This page explains the words used elsewhere on this site.</p>
          <p>Nobody is expected to already know them.</p>
          <p>If we have used a word that is not here, please tell us and we will add it.</p>
        </div>

        <h2>The words</h2>
        <dl class="def-list">
${glossaryBody}
        </dl>

        <p><a href="/contact/">Tell us about a word we should add to this list</a></p>
      </div>
    </section>`,
  },

  /* -------------------------------------------------------------- Privacy */
  {
    file: "privacy/index.html",
    url: "/privacy/",
    title: "Privacy | Be Enabled Advocacy Alliance",
    description:
      "This site uses no cookies and no tracking. Your display settings are stored in your own browser and never sent to us. Here is exactly what that means.",
    h1: "Privacy",
    crumb: "Privacy",
    trail: [],
    body: `
    <section class="section">
      <div class="wrap wrap--narrow stack">
        <h1>Privacy</h1>

        <div class="in-short">
          <h2>In short</h2>
          <p>We use no cookies and no tracking on this site.</p>
          <p>Your display settings are saved in your own browser and never sent to us.</p>
          <p>We only see your details if you choose to send them to us.</p>
        </div>

        <h2>What we store</h2>
        <p>When you change the colours, text size, line spacing, or movement
           settings, your browser saves those choices on your own device using a
           feature called local storage.</p>
        <p>That information stays on your device. It is never sent to us, and we
           cannot read it. Clearing your browsing data removes it.</p>
        <p>Because these settings are needed for the site to work the way you asked,
           and they never leave your device, no cookie banner is required. We would
           not use one anyway: banners that cover the page are themselves an access
           barrier.</p>

        <h2>What we do not do</h2>
        <ul class="tick-list">
          <li>We use no analytics and no tracking scripts.</li>
          <li>We use no advertising and no advertising networks.</li>
          <li>We load nothing from other companies. Even the fonts on this site are
              served from our own site, so no one else sees that you visited.</li>
        </ul>

        <h2>If you contact us</h2>
        <p>If you email us or send the form on our contact page, we receive whatever
           you chose to put in it. We use it to reply to you and nothing else. We do
           not sell it, and we do not add you to a mailing list without being asked.</p>

        <h2>Other sites we link to</h2>
        <p>Donations and our mailing list are handled by other companies on their own
           sites. Once you follow one of those links, their privacy rules apply, not
           ours.</p>

        <p><a href="/contact/">Contact us with a question about privacy</a></p>
      </div>
    </section>`,
  },

  /* -------------------------------------------------------------- Sitemap */
  {
    file: "sitemap/index.html",
    url: "/sitemap/",
    title: "All Pages | Be Enabled Advocacy Alliance",
    description:
      "A list of every page on beenabled.org, so you can find what you need without using the menu.",
    h1: "All pages on this site",
    crumb: "All pages",
    trail: [],
    body: `
    <section class="section">
      <div class="wrap wrap--narrow stack">
        <h1>All pages on this site</h1>
        <p class="lede">Every page, in one list.</p>

        <div class="in-short">
          <h2>In short</h2>
          <p>This page lists every page on this site.</p>
          <p>Use it if the menu is hard to use, or if you cannot find something.</p>
        </div>

        <h2>Main pages</h2>
        <ul class="tick-list tick-list--nav">
          <li><a href="/">Home</a></li>
          <li><a href="/about/">About Be Enabled Advocacy Alliance</a></li>
          <li><a href="/what-we-do/">What we do</a></li>
          <li><a href="/get-involved/">Get involved</a></li>
          <li><a href="/contact/">Contact us</a></li>
        </ul>

        <h2>The five areas we work on</h2>
        <ul class="tick-list tick-list--nav">
          <li><a href="/what-we-do/housing/">Housing</a></li>
          <li><a href="/what-we-do/healthcare/">Healthcare</a></li>
          <li><a href="/what-we-do/education/">Education</a></li>
          <li><a href="/what-we-do/transportation/">Transportation</a></li>
          <li><a href="/what-we-do/financial-security/">Money and benefits</a></li>
        </ul>

        <h2>Help and site information</h2>
        <ul class="tick-list tick-list--nav">
          <li><a href="/accessibility/">Accessibility statement</a></li>
          <li><a href="/glossary/">Word list</a></li>
          <li><a href="/privacy/">Privacy</a></li>
        </ul>
      </div>
    </section>`,
  },

  /* ------------------------------------------------------------------ 404 */
  {
    file: "404.html",
    url: "/404.html",
    title: "Page Not Found | Be Enabled Advocacy Alliance",
    description: "That page does not exist. Here is how to find what you were looking for.",
    h1: "We could not find that page",
    body: `
    <section class="section">
      <div class="wrap wrap--narrow stack">
        <h1>We could not find that page</h1>
        <p class="lede">The address may be wrong, or the page may have moved.</p>
        <p>Nothing is broken on your end. Here is where to go next.</p>
        <ul class="tick-list tick-list--nav">
          <li><a href="/">Go to the Be Enabled Advocacy Alliance home page</a></li>
          <li><a href="/sitemap/">See a list of every page on this site</a></li>
          <li><a href="/contact/">Tell us about a link that did not work</a></li>
        </ul>
      </div>
    </section>`,
  },
);
