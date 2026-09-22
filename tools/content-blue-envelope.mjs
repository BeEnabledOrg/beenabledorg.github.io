/**
 * Data and markup for /blue-envelope/ — the Blue Envelope Project directory.
 *
 * This is content data, not a general-purpose component: it is imported once,
 * by tools/content.mjs, to build the page body at scaffold time. After the
 * page is scaffolded, blue-envelope/index.html is the source of truth and may
 * be hand-edited directly, exactly like every other page on this site — see
 * the note at the top of tools/content.mjs.
 *
 * Sourcing note: every entry below was compiled by researching state agency
 * sites, legislature and bill-tracking sites, and news coverage, including
 * research assisted by AI tools. None of it has been confirmed by phone.
 * Treat it as a lead, not a verified fact — the page itself says so, in the
 * callout near the top of the directory section.
 *
 * We never link a bare source domain (e.g. "abc3340.com") as a clickable
 * link, because we do not have the specific article URL, only the domain
 * name — a guessed URL is worse than no link. Domains are shown as plain
 * text. A literal phone number or email address in the data IS linked
 * (tel:/mailto:), because that is not a guess: it links to exactly the text
 * printed on the page.
 */

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* Wrap a literal phone number or email address in a tel:/mailto: link.
   Everything else passes through untouched. */
const contactLine = (text) => {
  if (!text) return "";
  let out = esc(text);
  out = out.replace(/([\w.+-]+@[\w-]+\.[\w.-]+)/g, (m) => `<a href="mailto:${m}">${m}</a>`);
  out = out.replace(/(\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4})/g, (m) => {
    const tel = m.replace(/\D/g, "");
    /* html-validate's tel-non-breaking rule (SC 1.4.10-adjacent: a phone
       number must not be able to wrap mid-number at a narrow width). */
    const nb = m.replace(/ /g, "&nbsp;").replace(/-/g, "&#8209;");
    return `<a href="tel:+1${tel}">${nb}</a>`;
  });
  return out;
};

const STATUS = {
  law:      { label: "Required by state law",            cls: "law",
              blurb: "A state statute requires the program, so every driver in that state has the same guarantee." },
  agency:   { label: "Run statewide by a state agency",   cls: "agency",
              blurb: "A state agency runs the program everywhere in the state, without a specific law requiring it." },
  local:    { label: "Active in some cities or counties", cls: "local",
              blurb: "One or more police departments, sheriffs, or counties run their own version. Coverage varies from place to place." },
  proposed: { label: "Proposed, not law yet",             cls: "proposed",
              blurb: "A bill has been introduced but has not passed." },
  none:     { label: "No program found yet",              cls: "none",
              blurb: "Nothing turned up in this research. That is not a guarantee no program exists." },
};

/* ------------------------------------------------------------------ States,
   with local/county chapters nested where this research found one. ------- */
const STATES = [
  { name: "Alabama", abbr: "AL", status: "local",
    summary: "No statewide program. Hoover, Oxford, and Helena police departments and the Shelby County Sheriff's Office each run their own version, working with the Arc of Shelby County.",
    chapters: [
      { where: "Hoover", sponsor: "Hoover Police Department, with the Arc of Shelby County", launched: "April 2026", populations: "Autism, developmental disabilities, dementia, anxiety", contact: "Hoover City Hall, 100 Municipal Lane (1st floor). The kit includes a blue seat belt sleeve.", confirmed: true, sourceText: "abc3340.com" },
      { where: "Oxford, Helena, and Shelby County", sponsor: "Oxford Police Department, Helena Police Department, Shelby County Sheriff's Office", launched: "2026", populations: "Special needs, autism, anxiety, early dementia", contact: "Local agency. Envelopes are made at the Opportunity Center, Anniston.", confirmed: true, sourceText: "abc3340.com" },
    ] },
  { name: "Alaska", abbr: "AK", status: "none",
    summary: "No Blue Envelope or similar program has been identified in Alaska." },
  { name: "Arizona", abbr: "AZ", status: "agency",
    summary: "The Arizona Department of Transportation's Motor Vehicle Division runs the program statewide, working with the Department of Public Safety and the University of Arizona. It is voluntary and does not use a database.",
    legalBasis: "A state agency partnership, not a specific law.",
    launched: "2024–2025",
    populations: "Autistic drivers",
    howToGet: "Any Arizona Department of Transportation Motor Vehicle Division office, or a partner agency." },
  { name: "Arkansas", abbr: "AR", status: "law",
    summary: "Arkansas runs two related programs passed as separate laws: a blue envelope (Act 16) for autistic drivers, and a green envelope (Act 531) for drivers with a mental illness.",
    legalBasis: "Blue under Act 16; green under Act 531.",
    launched: "Signed during the 2025 legislative session; both became available to drivers on January 2, 2026.",
    populations: "Blue: autism. Green: mental illness.",
    howToGet: "Any of Arkansas's 130+ Revenue Offices, or by ordering online. No documentation is required." },
  { name: "California", abbr: "CA", status: "local",
    summary: "No statewide law exists — a bill, SB 664, has been introduced but not passed. San Diego County has run a program since October 2023, and San Bernardino and Riverside Counties (the Inland Empire) followed in 2025 and 2026.",
    legalBasis: "No statewide law. Local programs run under their own county or city authority.",
    launched: "San Diego: October 16, 2023. Inland Empire counties: 2025–2026.",
    populations: "San Diego: autism spectrum disorder, dementia, anxiety, and other conditions. Inland Empire: autism, intellectual and developmental disabilities, and deaf or hard-of-hearing drivers.",
    howToGet: "San Diego: any participating sheriff's station or community partner, listed below. Elsewhere: a local regional center, police department, or sheriff's station.",
    chapters: [
      { where: "San Diego County", sponsor: "San Diego County Sheriff's Department, with the County Police Chiefs' and Sheriff's Association, the Board of Supervisors, the Autism Society of San Diego, Alzheimer's San Diego, and the Metropolitan Transit System", launched: "October 16, 2023", populations: "Autism spectrum disorder, dementia, anxiety, and other conditions", contact: "BlueEnvelopeProgram@SDSheriff.gov, (858) 974-2222", confirmed: true, sourceText: "sdsheriff.gov" },
      { where: "Riverside County (12 sheriff's stations)", sponsor: "Riverside County Sheriff's Department, with the Autism Society Inland Empire and the Inland Regional Center", launched: "2025–2026", populations: "Autism, intellectual and developmental disabilities, deaf or hard-of-hearing drivers", contact: "Sheriff's stations in Cabazon, Colorado River, Hemet, Jurupa Valley, Lake Elsinore, Lake Matthews, Moreno Valley, Palm Desert, Perris, San Jacinto, Temecula, and Thermal", confirmed: true, sourceText: "ieautism.org" },
      { where: "San Bernardino County", sponsor: "San Bernardino County Sheriff's Department and city police departments, with the Autism Society Inland Empire and the Inland Regional Center", launched: "2025–2026", populations: "Autism, intellectual and developmental disabilities, deaf or hard-of-hearing drivers", contact: "Barstow, Chino, Fontana, Ontario, Redlands, San Bernardino, and Upland police departments, and San Bernardino County Sheriff's stations", confirmed: true, sourceText: "ieautism.org" },
      { where: "Menifee and the city of Riverside", sponsor: "Menifee Police Department, Riverside Police Department, with the Autism Society Inland Empire and the Inland Regional Center", launched: "2025–2026", populations: "Autism, intellectual and developmental disabilities", contact: "City police department — confirm before visiting", confirmed: true, sourceText: "ieautism.org" },
    ] },
  { name: "Colorado", abbr: "CO", status: "local",
    summary: "No statewide law. Boulder was the first Colorado city to run a program, and it has since spread to Boulder County, Lafayette, Denver, Aurora, and other jurisdictions.",
    chapters: [
      { where: "Boulder (first in Colorado)", sponsor: "Boulder Police Department", launched: "January 2025", populations: "Invisible disabilities, including autism and dementia", contact: "Boulder PD Records Lobby, 1805 33rd St, or BlueEnvelope@bouldercolorado.gov", confirmed: true, sourceText: "bouldercolorado.gov" },
      { where: "Boulder County", sponsor: "Boulder County Sheriff's Office", launched: "2025", populations: "Autism, dementia, communication barriers", contact: "Boulder County Sheriff's Office", confirmed: true, sourceText: "bouldercounty.gov" },
      { where: "Lafayette", sponsor: "Lafayette Police Department", launched: "2025", populations: "Intellectual and developmental disabilities, autism, dementia, communication barriers", contact: "Lafayette Police Department or a participating agency", confirmed: true, sourceText: "lafayetteco.gov" },
      { where: "Denver", sponsor: "Denver Police Department", launched: "October 9, 2025", populations: "Deaf or hard-of-hearing, physical or intellectual disabilities, mental health needs, medical alerts — the broadest population description of any Colorado chapter", contact: "Sign-up form through Denver Police Department", confirmed: true, sourceText: "cbsnews.com/colorado" },
      { where: "Aurora", sponsor: "Aurora Police Department", launched: "2025–2026", populations: "Physical or cognitive disabilities, including autism, severe anxiety, or depression", contact: "Aurora PD District 1, an Aurora Public Library branch, or BlueEnvelope@auroragov.org", confirmed: true, sourceText: "cbsnews.com/colorado" },
      { where: "Jefferson County and other agencies", sponsor: "County agencies", launched: "2025", populations: "Communication challenges", contact: "Local agency", confirmed: false, sourceText: "kdvr.com" },
    ] },
  { name: "Connecticut", abbr: "CT", status: "law",
    summary: "Connecticut's Department of Motor Vehicles ran the first Blue Envelope program in the country, starting in January 2020. Most other states' programs are modeled on it.",
    legalBasis: "A public act of the Connecticut General Assembly.",
    launched: "January 2020",
    populations: "Autistic drivers",
    howToGet: "Connecticut Department of Motor Vehicles." },
  { name: "Delaware", abbr: "DE", status: "agency",
    summary: "Delaware State Police, the Delaware Chiefs of Police, the University of Delaware Center for Disabilities Studies, the DMV, and the Delaware Network for Excellence in Autism together run a statewide program.",
    legalBasis: "A state initiative. A bill introduced in January 2026 would give it a stronger legal footing.",
    launched: "Statewide, August 26, 2025",
    populations: "Autism and other disabilities affecting communication, sensory processing, or mobility",
    howToGet: "Any Delaware State Police troop or participating agency. No identification is required." },
  { name: "Florida", abbr: "FL", status: "law",
    summary: "Florida's law requires the Department of Highway Safety and Motor Vehicles to run an identification program, and requires law enforcement officer training on autism spectrum disorder. It builds on a program the Bal Harbour Police Department started locally.",
    legalBasis: "Senate Bill 418, signed into law as Chapter 2026-147.",
    launched: "Signed June 16, 2026; effective July 1, 2026.",
    populations: "Autism spectrum disorder",
    howToGet: "Through the Department of Highway Safety and Motor Vehicles, once the program is operational. Specific pickup locations were not yet published as of this research." },
  { name: "Georgia", abbr: "GA", status: "none",
    summary: "No Blue Envelope or similar program has been identified in Georgia." },
  { name: "Hawaii", abbr: "HI", status: "none",
    summary: "No Blue Envelope or similar program has been identified in Hawaii." },
  { name: "Idaho", abbr: "ID", status: "none",
    summary: "No Blue Envelope or similar program has been identified in Idaho." },
  { name: "Illinois", abbr: "IL", status: "local",
    summary: "Cook County Sheriff's Office and Aurora Police Department both run programs, along with the Autism Hero Project's partner sites and other municipalities. The Illinois Secretary of State has announced plans to expand the program statewide through DMVs and police departments starting January 1, 2027; as of this research it was still running only in the municipalities listed below.",
    chapters: [
      { where: "Cook County", sponsor: "Cook County Sheriff's Office", launched: "2026", populations: "Autism and other communication differences", contact: "Cook County courthouses and county locations", confirmed: true, sourceText: "cbsnews.com/chicago" },
      { where: "Aurora", sponsor: "Aurora Police Department", launched: "Around May 2026", populations: "Autism", contact: "Aurora Police Department", confirmed: true, sourceText: "cbsnews.com/chicago" },
      { where: "Bartlett, Harper College, and Park Ridge", sponsor: "Autism Hero Project, with local police departments", launched: "2024–2026", populations: "Autism spectrum disorder and other communication differences", contact: "Local police department, or campus police department", confirmed: true, sourceText: "dailyherald.com" },
      { where: "Naperville", sponsor: "Naperville Police Department Social Services Unit", launched: "Around September 2025", populations: "Autism spectrum, open to anyone who lives, works, or spends considerable time in Naperville", contact: "NPDSocialServices@naperville.il.us, (630) 420-6666, or the Naperville PD (1350 Aurora Ave)", confirmed: true, sourceText: "naperville.il.us" },
      { where: "Glenview", sponsor: "Glenview Police Department, through the Autism Hero Project", launched: "Around April 2026", populations: "Autism spectrum, open to anyone who lives, works, or spends considerable time in Glenview", contact: "Glenview PD, 2500 East Lake Ave; Sgt. Carly Gaba, cgaba@glenview.il.us, (847) 901-6198", confirmed: true, sourceText: "glenview.il.us" },
    ] },
  { name: "Indiana", abbr: "IN", status: "local",
    summary: "Porter County's program, in Portage Township, started in 2020 and expanded into an Indiana Bureau of Motor Vehicles pilot in 2025. Bloomington and Indianapolis (Marion County) run their own programs too.",
    chapters: [
      { where: "Porter County (Portage Township)", sponsor: "Portage Township Autism Action Coalition, with the Indiana Bureau of Motor Vehicles", launched: "2020; a BMV pilot followed in April 2025", populations: "Autism", contact: "Porter County BMV branches", confirmed: true, sourceText: "in.gov" },
      { where: "Monroe County / Bloomington", sponsor: "Bloomington Police Department", launched: "March 2026", populations: "Autism spectrum disorder, also dementia, anxiety, Down syndrome", contact: "Bloomington PD (220 E Third St) or City Hall", confirmed: true, sourceText: "bloomington.in.gov" },
      { where: "Marion County / Indianapolis", sponsor: "Marion County Prosecutor's Office, with The Arc of Indiana", launched: "April 23, 2025", populations: "Down syndrome, autism, dementia, anxiety disorders, and other conditions", contact: "MCPO@indy.gov", confirmed: true, sourceText: "wishtv.com" },
    ] },
  { name: "Iowa", abbr: "IA", status: "none",
    summary: "No Blue Envelope or similar program has been identified in Iowa." },
  { name: "Kansas", abbr: "KS", status: "local",
    summary: "Johnson County and other Kansas City-metro agencies run local programs. Kansas also has a separate autism indicator that can be added to a driver's license.",
    chapters: [
      { where: "Johnson County and the Kansas City metro area", sponsor: "Local agencies", launched: "2025–2026", populations: "Disabilities affecting communication", contact: "Local agency", confirmed: false, sourceText: "kshb.com" },
    ] },
  { name: "Kentucky", abbr: "KY", status: "local",
    summary: "Highland Heights and Alexandria were the first police departments in Kentucky to run a program, starting in April 2026.",
    chapters: [
      { where: "Highland Heights and Alexandria (first in Kentucky)", sponsor: "Highland Heights Police Department and Alexandria Police Department", launched: "April 2026", populations: "Dementia, traumatic brain injury, autism", contact: "A participating police department — sticker and envelope provided", confirmed: true, sourceText: "local12.com" },
    ] },
  { name: "Louisiana", abbr: "LA", status: "law",
    summary: "Louisiana's law gives drivers a free green envelope (for a mental, physical, or developmental disability) or blue envelope (for autism) to hold their license and registration during a stop. Louisiana also has a separate Developmental Disability Disclosure Card program.",
    legalBasis: "House Bill 590, signed into law as Act 816.",
    launched: "Signed June 8, 2026; effective August 1, 2026.",
    populations: "Green: mental, physical, or developmental disabilities. Blue: autism.",
    howToGet: "Free, no medical documentation required. The pickup process had not been detailed in coverage as of this research." },
  { name: "Maine", abbr: "ME", status: "local",
    summary: "The Down Syndrome Advocacy Project of Maine sponsors the program at more than 30 agencies, including the Maine State Police, without a state law behind it. Maine uses the broadest population description of any program: Down syndrome, autism, dementia, anxiety, PTSD, and brain injury.",
    chapters: [
      { where: "Cape Elizabeth (first in Maine)", sponsor: "Cape Elizabeth Police Department (Sgt. Kevin Kennedy), with the Down Syndrome Advocacy Project of Maine", launched: "2023", populations: "Autism, anxiety, and other conditions", contact: "Cape Elizabeth Police Department", confirmed: true, sourceText: "wgme.com" },
      { where: "Topsham", sponsor: "Topsham Police Department (Chief Marc Hagan)", launched: "2024", populations: "Autism, anxiety, PTSD", contact: "Topsham Police Department", confirmed: true, sourceText: "newscentermaine.com" },
      { where: "Cumberland", sponsor: "Cumberland Police Department", launched: "2024", populations: "Down syndrome, autism spectrum disorder, dementia, anxiety", contact: "Cumberland Police Department", confirmed: true, sourceText: "townofcumberlandmaine.gov" },
      { where: "Biddeford", sponsor: "Biddeford Police Department", launched: "2024", populations: "Down syndrome, autism spectrum disorder, dementia, anxiety", contact: "Biddeford Police Department", confirmed: true, sourceText: "biddefordmaine.org" },
      { where: "Augusta", sponsor: "Augusta Police Department (Sgt. Anthony Drouin)", launched: "2024", populations: "Developmental, mental, or behavioral conditions", contact: "Augusta Police Department, 7 Willow St", confirmed: true, sourceText: "pressherald.com" },
      { where: "Statewide, through Maine State Police", sponsor: "Maine State Police (Trooper Seth Allen), with the Down Syndrome Advocacy Project of Maine", launched: "June 2024", populations: "Autism, Down syndrome, PTSD", contact: "Some Maine State Police locations — no proof required", confirmed: true, sourceText: "mainepublic.org" },
      { where: "Kennebec County", sponsor: "Kennebec County Sheriff's Office", launched: "2024", populations: "Developmental, mental, or behavioral conditions", contact: "Kennebec County Sheriff's Office", confirmed: true, sourceText: "sunjournal.com" },
      { where: "Newport, Dover-Foxcroft, Farmington, Lisbon, Wells, Lewiston, Milo, Lincoln, Madawaska, and Kittery", sponsor: "Local police departments, with the Down Syndrome Advocacy Project of Maine", launched: "2024", populations: "Developmental disabilities, autism", contact: "Local police department — confirm through the Down Syndrome Advocacy Project of Maine", confirmed: false, sourceText: "q1065.fm" },
    ] },
  { name: "Maryland", abbr: "MD", status: "local",
    summary: "The Baltimore Police Department runs a program, distinct from its separate Neurodivergent Individuals Database. Pathfinders for Autism and the Maryland Department of Disabilities are good contacts elsewhere in the state, where a program has not been confirmed.",
    chapters: [
      { where: "Baltimore", sponsor: "Baltimore Police Department", launched: "Around April 1, 2026", populations: "Autism and other neurodivergence", contact: "Baltimore PD Community Partnerships Unit, BPDLiaisons@baltimorepolice.org. About 1,500 kits and 3,000 communication-facilitator cards were distributed at launch.", confirmed: true, sourceText: "baltimorepolice.org" },
    ] },
  { name: "Massachusetts", abbr: "MA", status: "law",
    summary: "Massachusetts ran the program on a voluntary basis starting in 2024, then wrote it into law in 2026. The Registry of Motor Vehicles produces the envelopes with the State Police.",
    legalBasis: "A Blue Envelope law passed in 2026, originally introduced by Senator Comerford.",
    launched: "Voluntary since 2024; written into law June 2026, effective September 2026.",
    populations: "Autistic drivers",
    howToGet: "The Registry of Motor Vehicles provides envelopes on request to the driver or a parent or guardian." },
  { name: "Michigan", abbr: "MI", status: "proposed",
    summary: "Senate Bill 554, introduced by Senator Michael Webber with the Autism Alliance of Michigan, would create a registry-based program inside the Department of State. It has not passed.",
    legalBasis: "Senate Bill 554.",
    launched: "Introduced September 2025.",
    populations: "Autism and other special needs" },
  { name: "Minnesota", abbr: "MN", status: "local",
    summary: "The Burnsville Police Department, in the Twin Cities metro area, has run a program since around October 2025. The Autism Society of Minnesota and The Arc Minnesota are good contacts elsewhere in the state, where a program has not been confirmed.",
    chapters: [
      { where: "Burnsville", sponsor: "Burnsville Police Department", launched: "Around October 2025", populations: "Autism spectrum disorder", contact: "Burnsville police station or City Hall, (952) 895-4400", confirmed: true, sourceText: "hometownsource.com" },
    ] },
  { name: "Mississippi", abbr: "MS", status: "agency",
    summary: "The Mississippi Department of Public Safety runs the program statewide.",
    legalBasis: "A state agency program.",
    launched: "Around early 2025",
    populations: "Autism and other disabilities",
    howToGet: "Any Mississippi Department of Public Safety driver's license office." },
  { name: "Missouri", abbr: "MO", status: "local",
    summary: "Springfield, Hollister, and Nixa in southwest Missouri, and Belton in the Kansas City metro area, each run their own program.",
    chapters: [
      { where: "Springfield, Hollister, and Nixa", sponsor: "Springfield Police Department and partners", launched: "April 2026", populations: "Disabilities affecting communication", contact: "Local police department", confirmed: true, sourceText: "sgfcitizen.org" },
      { where: "Belton (Cass County)", sponsor: "Belton Police Department", launched: "March 2026", populations: "Intellectual disability, sensory sensitivity", contact: "Belton Police Department or DMV", confirmed: true, sourceText: "kshb.com" },
    ] },
  { name: "Montana", abbr: "MT", status: "none",
    summary: "No Blue Envelope or similar program has been identified in Montana." },
  { name: "Nebraska", abbr: "NE", status: "none",
    summary: "No Blue Envelope or similar program has been identified in Nebraska." },
  { name: "Nevada", abbr: "NV", status: "none",
    summary: "No Blue Envelope or similar program has been identified in Nevada." },
  { name: "New Hampshire", abbr: "NH", status: "law",
    summary: "New Hampshire's envelope is designed to be mounted on a vehicle's sun visor.",
    legalBasis: "RSA 265:3-c.",
    launched: "Statewide, July 2026.",
    populations: "Autism or a trauma- or stressor-related disorder",
    howToGet: "Any New Hampshire Department of Motor Vehicles office, free." },
  { name: "New Jersey", abbr: "NJ", status: "local",
    summary: "County prosecutors and Autism New Jersey coordinate a county-by-county rollout that started in Hunterdon County and has spread to Atlantic, Passaic, and several municipal police departments.",
    chapters: [
      { where: "Hunterdon County (first in New Jersey)", sponsor: "Local law enforcement, with Autism New Jersey", launched: "2024–2025", populations: "Autism", contact: "Local police department", confirmed: true, sourceText: "autismnj.org" },
      { where: "Atlantic County", sponsor: "Atlantic County Prosecutor's Office and the county's chiefs of police", launched: "2025–2026", populations: "Autism spectrum disorder", contact: "Local police department", confirmed: true, sourceText: "patch.com" },
      { where: "Passaic County", sponsor: "Passaic County Prosecutor's Office", launched: "2025–2026", populations: "Autism and other neurodivergence", contact: "Local police department", confirmed: true, sourceText: "northjersey.com" },
      { where: "North Caldwell, Rochelle Park, and Wyckoff", sponsor: "Municipal police departments", launched: "2024–2026", populations: "Autism spectrum disorder", contact: "Local police department", confirmed: false, sourceText: "patch.com" },
      { where: "Neptune (Monmouth County), Belleville, Wyckoff, and Rochelle Park", sponsor: "County prosecutors and municipal police departments", launched: "2024–2026", populations: "Autism spectrum disorder", contact: "Local police department, county prosecutor, or State Police barracks", confirmed: true, sourceText: "neptunepolice.org" },
    ] },
  { name: "New Mexico", abbr: "NM", status: "none",
    summary: "No Blue Envelope or similar program has been identified in New Mexico." },
  { name: "New York", abbr: "NY", status: "local",
    summary: "The New York State Sheriffs' Association coordinates a county-by-county rollout that has reached Cortland, Oswego, Erie, Cayuga, Onondaga, Seneca, Chemung, Jefferson, and several other counties.",
    chapters: [
      { where: "Cortland County", sponsor: "Cortland County Sheriff's Office (Sheriff Helms)", launched: "2025", populations: "Autism", contact: "(607) 758-5599", confirmed: true, sourceText: "cortlandvoice.com" },
      { where: "Oswego County", sponsor: "Oswego County Sheriff's Office (Sheriff Hilton)", launched: "April 2025", populations: "Autism", contact: "Oswego County Sheriff's Office", confirmed: true, sourceText: "oswegocountyny.gov" },
      { where: "Erie County", sponsor: "Erie County Sheriff's Office", launched: "2025–2026", populations: "Autism", contact: "Mitchell.Martin@erie.gov", confirmed: true, sourceText: "wivb.com" },
      { where: "Cayuga County", sponsor: "Cayuga County Sheriff's Office", launched: "2025–2026", populations: "Autism", contact: "7445 County House Rd, Auburn; (315) 253-1222, press 8", confirmed: true, sourceText: "wsyr.com" },
      { where: "Onondaga County", sponsor: "Onondaga County Sheriff's Office", launched: "2025–2026", populations: "Autism", contact: "Community relations, (315) 435-3006", confirmed: true, sourceText: "wsyr.com" },
      { where: "Seneca County", sponsor: "Seneca County Sheriff's Office", launched: "2025–2026", populations: "Autism", contact: "Law Enforcement Center lobby; (315) 220-3403", confirmed: true, sourceText: "wsyr.com" },
      { where: "Chemung County", sponsor: "Chemung County Sheriff's Office (Sheriff Schrom)", launched: "2025–2026", populations: "Autism", contact: "Chemung County Sheriff's Office", confirmed: true, sourceText: "wetmtv.com" },
      { where: "Jefferson County (North Country)", sponsor: "Jefferson County Sheriff's Office (Sheriff Barnett), with the Arc Jefferson-St. Lawrence", launched: "February 2025", populations: "Autism", contact: "Jefferson County Sheriff's Office", confirmed: true, sourceText: "northcountrypublicradio.org" },
      { where: "Suffolk, Oneida, Saratoga, Albany, and St. Lawrence Counties", sponsor: "County sheriffs, with the Arc Jefferson-St. Lawrence and local advocates", launched: "2024–2026", populations: "Autism", contact: "County Sheriff's Office or a local advocacy organization", confirmed: true, sourceText: "dailygazette.com" },
    ] },
  { name: "North Carolina", abbr: "NC", status: "local",
    summary: "The Town of Duck Police Department, working with Outer Banks Health and Dare County, started North Carolina's first known program in November 2024. Other counties have not yet been confirmed.",
    chapters: [
      { where: "Town of Duck (Outer Banks)", sponsor: "Duck Police Department, with Outer Banks Health and Dare County", launched: "November 2024", populations: "Autism, dementia, anxiety", contact: "Duck Police Department or a partner agency", confirmed: true, sourceText: "ducknc.gov" },
    ] },
  { name: "North Dakota", abbr: "ND", status: "none",
    summary: "No Blue Envelope or similar program has been identified in North Dakota." },
  { name: "Ohio", abbr: "OH", status: "agency",
    summary: "Ohio's program runs through the state's county boards of developmental disabilities, and is live in 84 of the state's 88 counties. Each kit includes an envelope, a decal, a wallet card, and a brochure. The envelope design was licensed from the San Diego County Sheriff's Department.",
    legalBasis: "State-supported, with no specific statute.",
    launched: "Introduced in 2024, statewide by 2025–2026.",
    populations: "Developmental disabilities, including autism, anxiety, dementia, physical disability, and mental health conditions",
    howToGet: "Your county Board of Developmental Disabilities, free packet.",
    chapters: [
      { where: "Shaker Heights, Kettering, Beachwood, and Bay Village", sponsor: "City police departments, through county boards of developmental disabilities", launched: "2025–2026", populations: "Developmental disabilities, including autism and anxiety", contact: "County board of developmental disabilities or city police department", confirmed: true, sourceText: "shakerheightsoh.gov" },
      { where: "Summit, Portage, and Franklin Counties (and Upper Arlington)", sponsor: "County boards of developmental disabilities, with the Southern Ohio Council of Governments", launched: "2025–2026", populations: "Developmental disabilities, including autism, anxiety, and dementia", contact: "County board of developmental disabilities, free packet", confirmed: true, sourceText: "summitdd.org" },
      { where: "Richland County / Mansfield", sponsor: "Mansfield Police Department, with the Northeast Ohio Autism Association", launched: "2025–2026", populations: "Autism", contact: "Any Richland County law enforcement agency, or driver-education sites", confirmed: true, sourceText: "fox8.com" },
      { where: "Franklin, Lakewood, Beavercreek, Springboro, Vandalia, and Tipp City", sponsor: "Local police departments", launched: "2025", populations: "Autism, dementia, anxiety", contact: "Nearest police department, free", confirmed: false, sourceText: "acils.com" },
    ] },
  { name: "Oklahoma", abbr: "OK", status: "local",
    summary: "The Autism Foundation of Oklahoma coordinates the program across the Oklahoma City metro area, including Edmond, Oklahoma City, Oklahoma County, Choctaw, Midwest City, Moore, Norman, and The Village.",
    chapters: [
      { where: "Oklahoma City metro area (Edmond, Oklahoma City, Oklahoma County, Choctaw, Midwest City, Moore, Norman, The Village)", sponsor: "Autism Foundation of Oklahoma, with the Metro Law Enforcement Leaders Network", launched: "October 2025", populations: "Autism and other neurodevelopmental or communication conditions", contact: "A participating agency", confirmed: true, sourceText: "koco.com" },
    ] },
  { name: "Oregon", abbr: "OR", status: "none",
    summary: "No Blue Envelope or similar program has been identified in Oregon." },
  { name: "Pennsylvania", abbr: "PA", status: "local",
    summary: "Philadelphia Police Department launched a citywide program in September 2026. Centre County runs its own, separately-organized program under a similar name, and the Jefferson Health / Lehigh Valley Health Network model covers Lehigh, Monroe, Northampton, and Luzerne counties.",
    chapters: [
      { where: "Philadelphia", sponsor: "Philadelphia Police Department, announced by Mayor Cherelle Parker", launched: "September 10, 2026", populations: "Autism, sensory or cognitive challenges, hearing impairments", contact: "blueenvelopepa.org", confirmed: true, sourceText: "6abc.com" },
      { where: "Centre County", sponsor: "Centre County Crisis Intervention Team and Sheriff's Office", launched: "April 2026", populations: "Autism", contact: "Centre County Sheriff's Office", confirmed: true, sourceText: "wpsu.org" },
      { where: "Lehigh Valley (Lehigh, Monroe, Northampton, and Luzerne Counties)", sponsor: "Jefferson Health / Lehigh Valley Health Network, with local police departments", launched: "April 2024 onward", populations: "Autism spectrum disorder and communication difficulties, anxiety", contact: "Lehigh Valley Physician Group practices and partner police departments", confirmed: true, sourceText: "lvhn.org" },
    ] },
  { name: "Rhode Island", abbr: "RI", status: "law",
    summary: "Rhode Island's law mandates the program statewide.",
    legalBasis: "A Rhode Island House Bill, signed by Governor McKee.",
    launched: "Signed June 2024; statewide effective January 1, 2025.",
    populations: "Autistic drivers",
    howToGet: "Any scheduled DMV license or registration appointment. No advance sign-up is needed." },
  { name: "South Carolina", abbr: "SC", status: "none",
    summary: "No Blue Envelope or similar program has been identified in South Carolina." },
  { name: "South Dakota", abbr: "SD", status: "local",
    summary: "Sioux Falls Police Department, the Minnehaha County Sheriff's Office, and the University of South Dakota's Sanford Center for Disabilities launched a program in July 2026, funded by the Sioux Falls Area Community Foundation.",
    chapters: [
      { where: "Sioux Falls / Minnehaha County", sponsor: "Sioux Falls Police Department, Minnehaha County Sheriff's Office, and the University of South Dakota Sanford Center for Disabilities", launched: "July 2026", populations: "Autism and other communication differences", contact: "The Center for Disabilities, or the Law Enforcement Center in Sioux Falls, free", confirmed: true, sourceText: "siouxfalls.gov" },
    ] },
  { name: "Tennessee", abbr: "TN", status: "local",
    summary: "The Montgomery County Sheriff's Office, around Clarksville, started a program in April 2026. Nolensville Police Department followed in June 2026, working with Autism Tennessee.",
    chapters: [
      { where: "Montgomery County", sponsor: "Montgomery County Sheriff's Office", launched: "April 2026", populations: "Autism spectrum disorder and communication, sensory, or cognitive conditions", contact: "Montgomery County Sheriff's Office, 120 Commerce St, Clarksville", confirmed: true, sourceText: "wsmv.com" },
      { where: "Nolensville", sponsor: "Nolensville Police Department, with Autism Tennessee", launched: "June 2026", populations: "Autism and other disabilities", contact: "Nolensville Police Department", confirmed: true, sourceText: "wsmv.com" },
    ] },
  { name: "Texas", abbr: "TX", status: "local",
    summary: "Kerrville Police Department runs an active program. A proposed state law, referred to as Brylee's Law, would expand it statewide, but has not passed.",
    chapters: [
      { where: "Kerrville", sponsor: "Kerrville Police Department (Community Backup Initiative)", launched: "2025–2026", populations: "Autism spectrum disorder, dementia, anxiety, developmental disabilities", contact: "Kerrville Police Department, free, weekdays 8am–5pm", confirmed: true, sourceText: "kerrvilletx.gov" },
    ] },
  { name: "Utah", abbr: "UT", status: "local",
    summary: "Centerville Police Department started what is known locally as the “Big Blue Envelope Program,” which has since equipped all 19 law enforcement agencies in Davis County. The Autism Council of Utah and ARC Salt Lake help coordinate it.",
    chapters: [
      { where: "Davis County (Centerville-led)", sponsor: "Autism Council of Utah and ARC Salt Lake, with Centerville Police Department", launched: "Late 2025", populations: "Autism", contact: "Utah Parent Center, Murray; all 19 Davis County law enforcement agencies", confirmed: true, sourceText: "fox13now.com" },
    ] },
  { name: "Vermont", abbr: "VT", status: "agency",
    summary: "Vermont's Department of Motor Vehicles runs the program statewide, working with the University of Vermont's Autism Collaborative. It grew out of the Massachusetts and Arizona programs.",
    legalBasis: "A DMV program, not a specific statute.",
    launched: "August 2024",
    populations: "Autistic drivers",
    howToGet: "Any Vermont Department of Motor Vehicles office." },
  { name: "Virginia", abbr: "VA", status: "law",
    summary: "Virginia's Department of Motor Vehicles runs the program statewide.",
    legalBasis: "Code of Virginia § 46.2-203.3.",
    launched: "Live July 1, 2025.",
    populations: "Autism spectrum disorder",
    howToGet: "Any Virginia DMV customer service center, free." },
  { name: "Washington", abbr: "WA", status: "law",
    summary: "Washington's law uses a broad definition of neurodivergence, covering more conditions than most other states' programs.",
    legalBasis: "House Bill 2323.",
    launched: "Signed March 2026 by Governor Ferguson; envelopes available from June 11, 2026.",
    populations: "Autism, ADHD, bipolar disorder, dyslexia, OCD, and Tourette syndrome",
    howToGet: "Washington licensing offices, free." },
  { name: "West Virginia", abbr: "WV", status: "law",
    summary: "West Virginia's law was modeled on Ohio's program. Costs are covered by the Department of Health and Human Resources and nonprofit partners rather than the state.",
    legalBasis: "House Bill 4053.",
    launched: "Signed, effective June 11, 2026. A launch event was held July 23, 2026; statewide sign-up opens January 1, 2027.",
    populations: "Autism, intellectual disabilities, dementia",
    howToGet: "A local DMV office or West Virginia State Police detachment, starting January 1, 2027." },
  { name: "Wisconsin", abbr: "WI", status: "none",
    summary: "No Blue Envelope or similar program has been identified in Wisconsin." },
  { name: "Wyoming", abbr: "WY", status: "local",
    summary: "The Laramie County Sheriff's Office launched Wyoming's first Blue Envelope program in July 2026.",
    chapters: [
      { where: "Laramie County / Cheyenne", sponsor: "Laramie County Sheriff's Office", launched: "Around July 1–3, 2026", populations: "Intellectual, developmental, or cognitive disabilities affecting communication", contact: "Sheriff's Office front desk, 1910 Pioneer Ave, Cheyenne", confirmed: true, sourceText: "newslj.com" },
    ] },
];

/* ---------------------------------------------------------- Federal layer */
const FEDERAL = [
  { entity: "Supporting Blue Envelope Programs Act (H.R. 6602)", type: "Federal legislation — House",
    status: "Introduced December 2025; in committee", detail: "Reps. Norma Torres (D-CA) and John Rutherford (R-FL)",
    notes: "Would authorize Department of Justice grants for Blue Envelope programs. Has not had a floor vote as of this research." },
  { entity: "Supporting Blue Envelope Programs Act (S. 4089)", type: "Federal legislation — Senate",
    status: "Introduced March 12, 2026; referred to the Judiciary Committee", detail: "Sens. Chris Coons (D-DE) and Eric Schmitt (R-MO)",
    notes: "The Senate companion bill. Endorsed by the Autism Society, Autism Speaks, the Major County Sheriffs Association, the Fraternal Order of Police, Easterseals, The Arc, and NAMI, among others." },
  { entity: "FY2027 Commerce-Justice-Science Appropriations Report (House Report 119-652)", type: "Federal appropriations",
    status: "House Appropriations Committee report", detail: "",
    notes: "Names Blue Envelope programs as an eligible use of Byrne Justice Assistance Grant funding, and directs the Department of Justice to notify grant recipients and report back to Congress." },
  { entity: "National Public Safety Alliance for Individuals With Disabilities", type: "National coordinator network",
    status: "Active", detail: "Operated by Online Policing Solutions, Inc.",
    notes: "Runs a chapter model across local, county, and state agencies. Describes the overall effort as decentralized — each agency implements its own version." },
  { entity: "Down Syndrome Advocacy Project of Maine", type: "State sponsor — Maine",
    status: "Active", detail: "Erica Koch, ekoch@dsapmaine.org, (207) 754-5757",
    notes: "Sponsors more than 30 Maine agencies with no state law behind it. Uses the broadest population description of any program." },
  { entity: "Autism Society Inland Empire and Inland Regional Center", type: "Regional sponsor — California",
    status: "Active", detail: "San Bernardino and Riverside Counties",
    notes: "Publishes a curriculum and best-practices guide, and encourages adding a health care passport to the envelope." },
  { entity: "Autism Hero Project", type: "Regional sponsor — Illinois",
    status: "Active", detail: "",
    notes: "Sponsors programs at Bartlett, Harper College, Park Ridge, and other Illinois sites." },
  { entity: "Autism Foundation of Oklahoma", type: "State sponsor — Oklahoma",
    status: "Active", detail: "",
    notes: "Partnered with the Metro Law Enforcement Leaders Network for the Oklahoma City-area rollout." },
  { entity: "New York State Sheriffs' Association", type: "State coordinator — New York",
    status: "Active", detail: "",
    notes: "Coordinates New York's county-by-county rollout." },
  { entity: "Ohio Developmental Disabilities Council", type: "State coordinator — Ohio",
    status: "Active", detail: "",
    notes: "Coordinates distribution through Ohio's 88 county boards of developmental disabilities." },
  { entity: "Autism New Jersey", type: "State advocacy — New Jersey",
    status: "Active", detail: "",
    notes: "Publishes rollout guidance for New Jersey agencies." },
];

/* -------------------------------------------------------------- Markup -- */
const chapterHtml = (c) => `            <div class="chapter-item">
              <p><strong>${esc(c.where)}</strong> — ${c.confirmed ? "matched to an official source" : "news coverage only, not yet matched to an official page"}</p>
              <dl class="def-list">
                <div><dt>Runs it</dt><dd>${esc(c.sponsor)}</dd></div>
                <div><dt>Started</dt><dd>${esc(c.launched)}</dd></div>
                <div><dt>Who it is for</dt><dd>${esc(c.populations)}</dd></div>
                <div><dt>Contact</dt><dd>${contactLine(c.contact)}</dd></div>
                <div><dt>As reported by</dt><dd>${esc(c.sourceText)}</dd></div>
              </dl>
            </div>`;

const stateHtml = (s) => {
  const st = STATUS[s.status];
  const rows = [];
  if (s.legalBasis) rows.push(`<div><dt>Legal basis</dt><dd>${esc(s.legalBasis)}</dd></div>`);
  if (s.launched) rows.push(`<div><dt>Started</dt><dd>${esc(s.launched)}</dd></div>`);
  if (s.populations) rows.push(`<div><dt>Who it is for</dt><dd>${esc(s.populations)}</dd></div>`);
  if (s.howToGet) rows.push(`<div><dt>How to get one</dt><dd>${contactLine(s.howToGet)}</dd></div>`);
  const details = rows.length
    ? `\n            <dl class="def-list">\n              ${rows.join("\n              ")}\n            </dl>`
    : "";
  const chapters = s.chapters && s.chapters.length
    ? `\n            <div class="chapter-group">
              <p><strong>Local and county programs in ${esc(s.name)} (${s.chapters.length})</strong></p>
              <p class="field__hint">Contact details below are as researched. Call ahead to confirm before a visit.</p>
${s.chapters.map(chapterHtml).join("\n")}
            </div>`
    : "";

  return `        <details class="state-card" id="state-${s.abbr}" data-search="${esc((s.name + " " + s.abbr + " " + s.summary + " " + (s.chapters || []).map((c) => c.where).join(" ")).toLowerCase())}">
          <summary>
            <span class="state-card__name">${esc(s.name)} <span class="state-card__abbr">${s.abbr}</span></span>
            <span class="status-badge status-badge--${st.cls}">${st.label}</span>
            <svg class="chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </summary>
          <div class="state-card__body">
            <p>${esc(s.summary)}</p>${details}${chapters}
          </div>
        </details>`;
};

const federalHtml = (f) => `          <li class="card">
            <p class="card__meta">${esc(f.type)}</p>
            <h3>${esc(f.entity)}</h3>
            <p class="card__meta">${esc(f.status)}${f.detail ? " · " + esc(f.detail) : ""}</p>
            <p>${esc(f.notes)}</p>
          </li>`;

const stateIndex = STATES
  .map((s) => `          <li><a href="#state-${s.abbr}">${esc(s.name)}</a></li>`)
  .join("\n");

const stateList = STATES.map(stateHtml).join("\n");

const federalList = FEDERAL.map(federalHtml).join("\n");

const legendList = Object.values(STATUS)
  .map((st) => `          <li><span class="status-badge status-badge--${st.cls}">${st.label}</span> — ${st.blurb}</li>`)
  .join("\n");

export const blueEnvelopePage = {
  file: "blue-envelope/index.html",
  url: "/blue-envelope/",
  title: "The Blue Envelope Project | Be Enabled Advocacy Alliance",
  description:
    "Find a Blue Envelope program near you. A free envelope holds a license and papers, plus short notes that help a traffic stop go more smoothly.",
  h1: "The Blue Envelope Project",
  crumb: "Blue Envelope Project",
  trail: [],
  body: `
    <div class="blue-envelope">
    <section class="hero">
      <div class="wrap hero__inner">
        <div class="stack">
          <p class="kicker">A project of Be Enabled Advocacy Alliance</p>
          <h1>The Blue Envelope Project</h1>
          <p class="lede">A simple envelope that helps traffic stops go more
             smoothly for drivers who communicate differently.</p>
          <p class="btn-row">
            <a class="btn btn--primary" href="#directory">Find a program</a>
            <a class="btn btn--secondary" href="#waitlist">Join the waitlist</a>
          </p>
          <p class="field__hint">Free directory of programs across the United States.</p>
        </div>
        <div class="hero__art cover" aria-hidden="true">
          <div>
            <p class="cover__title">The Blue Envelope Project</p>
            <p class="cover__sub">Calmer stops. Clearer communication.</p>
          </div>
          <svg class="cover__art" viewBox="0 0 240 170" focusable="false">
            <rect class="cover__art-paper" x="44" y="6" width="152" height="100" rx="5"/>
            <path class="cover__art-lines" d="M62 30h90M62 46h116M62 62h70" stroke-width="5" stroke-linecap="round"/>
            <rect class="cover__art-envelope" x="10" y="40" width="220" height="124" rx="10"/>
            <path class="cover__art-flap" d="M10 48L120 116L230 48" fill="none" stroke-width="4" stroke-linejoin="round"/>
            <circle class="cover__art-seal" cx="120" cy="116" r="15"/>
            <circle class="cover__art-seal-hole" cx="120" cy="116" r="6"/>
          </svg>
          <p class="cover__brand">BEAA</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap wrap--narrow stack">
        <h2 class="accent-line">What it is</h2>
        <p>A blue envelope holds your license, registration, and insurance. It
           also carries short tips for you and for the officer.</p>
        <p>Handing it over says: <strong>I may need more time, and I
           communicate differently.</strong></p>
        <p class="text-muted">Always voluntary. Not having one never means
           someone has no needs.</p>

        <h2 class="accent-line">How it works</h2>
        <ol class="steps">
          <li>
            <span class="steps__num" aria-hidden="true">1</span>
            <div>
              <strong>Get an envelope</strong>
              <p>From a participating Department of Motor Vehicles (DMV),
                 police department, or advocacy group.</p>
            </div>
          </li>
          <li>
            <span class="steps__num" aria-hidden="true">2</span>
            <div>
              <strong>Keep your documents inside</strong>
              <p>License, registration, and insurance, plus emergency
                 contacts.</p>
            </div>
          </li>
          <li>
            <span class="steps__num" aria-hidden="true">3</span>
            <div>
              <strong>Hand it over at a stop</strong>
              <p>The officer reads the tips and adjusts how they
                 communicate.</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="section section--tint" id="directory">
      <div class="wrap">
        <h2 class="accent-line">Find a Blue Envelope program</h2>
        <p class="lede">Search by state, city, county, or agency.</p>

        <div class="in-short">
          <h2>In short</h2>
          <p>This directory lists Blue Envelope programs by state, and by
             city or county where one is known. Some are required by state
             law, some are run by a state agency, and some exist only in
             specific places. Some states have none found yet.</p>
        </div>

        <div class="callout" role="note">
          <svg class="callout__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M12 9v4M12 16.5h.01M10.29 3.86l-8.5 14.72A1.5 1.5 0 0 0 3.06 21h17.88a1.5 1.5 0 0 0 1.27-2.42l-8.5-14.72a1.5 1.5 0 0 0-2.42 0Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <div>
            <p><strong>Treat every entry here as a lead, not a confirmed fact.</strong>
               This directory was put together through research — state agency
               pages, legislature and bill-tracking sites, and news coverage — and
               most entries have not been confirmed by phone. A state marked
               "no program found yet" means nothing turned up in that research, not
               that no program exists. Call ahead before you rely on any address,
               phone number, or hours listed here, and
               <a href="/contact/">tell us what you find</a> if something has
               changed.</p>
          </div>
        </div>

        <h3>How to read this directory</h3>
        <p>Entries below often use short names for agencies: a Bureau of Motor
           Vehicles is a BMV, a Department of Public Safety is a DPS, a Police
           Department is a PD, and a Sheriff's Office is an SO. A local or
           county program is marked "matched to an official source" when
           this research found a government or agency page confirming it, or
           "news coverage only" when the only source found so far was a news
           report.</p>
        <ul class="no-bullet stack">
${legendList}
        </ul>

        <div class="field" style="margin-block-start: var(--space-6);">
          <label for="be-search">Search by state, city, county, or agency</label>
          <input type="search" id="be-search" autocomplete="off">
          <p class="field__hint" data-be-hint>Typing here needs JavaScript to filter
             the list below. Without it, every state is already listed — just browse.</p>
          <noscript><p class="field__hint">This search box needs JavaScript to work.
             Browse the full list below instead — nothing is hidden.</p></noscript>
        </div>

        <nav aria-label="Jump to a state">
          <h3 class="visually-hidden">Jump to a state</h3>
          <ul class="state-index">
${stateIndex}
          </ul>
        </nav>

        <p class="result-count" id="be-result-count" aria-live="polite" hidden></p>

        <div class="state-list" id="be-state-list">
${stateList}
        </div>
      </div>
    </section>

    <section class="section section--tint" id="waitlist">
      <div class="wrap">
        <h2 class="accent-line">Get the Blue Envelope</h2>
        <ul class="grid no-bullet">
          <li class="card">
            <h3>Join the waitlist</h3>
            <p>Get one email when it's ready. Nothing else.</p>
            <form class="stack" data-form="waitlist">
              <div class="field">
                <label for="wl-email">Email address</label>
                <input id="wl-email" type="email" required placeholder="you@example.com" autocomplete="email">
              </div>
              <p><button class="btn btn--primary" type="submit">Join the waitlist</button></p>
              <p class="form-status" role="status" data-wl-status></p>
            </form>
            <!-- TODO(content): wire this up to a real mailing-list service
                 once one is chosen, then remove the JS intercept in app.js
                 (search "Blue Envelope waitlist") that currently explains it
                 is not connected yet. See CONTENT-TODO.md. -->
          </li>
          <li class="card">
            <h3>Bring it to your town</h3>
            <p>Police departments, motor vehicle agencies, and community
               groups can start a Blue Envelope program.</p>
            <p><a class="btn btn--secondary" href="/contact/">Start a program</a></p>
          </li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <h2 class="accent-line">Federal and national efforts</h2>
        <p>Two related bills are moving through Congress, and several
           organizations coordinate programs above the state level.</p>
        <ul class="grid no-bullet">
${federalList}
        </ul>
      </div>
    </section>

    <section class="section section--tint">
      <div class="wrap wrap--narrow stack">
        <h2 class="accent-line">Where this directory comes from</h2>
        <p>This directory was put together by researching state agency websites,
           legislature and bill-tracking sites, and news coverage, including
           research assisted by AI tools. It has not been confirmed by phone with
           every program listed, and it was last checked in September 2026. Laws
           pass, programs launch, and contact details change faster than any
           directory can track on its own.</p>

        <h3>What "no program found yet" means</h3>
        <p>A Blue Envelope program is often started by a single police
           department or county, with no state registry recording it. That makes a
           small local program easy to miss. If you know of one that is missing
           from this directory, or a detail here that has changed,
           <a href="/contact/">tell us what you found</a>.</p>
      </div>
    </section>
    </div>`,
};
