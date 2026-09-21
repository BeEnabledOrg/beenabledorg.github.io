/**
 * Example data for the EnableMe Resource Hub preview.
 *
 * Everything in EXAMPLE_LISTINGS is invented for demonstration only — not a
 * real program, agency, date, or contact. Organization names are prefixed
 * "Example" on purpose, so nobody mistakes a preview listing for a real
 * county office or provider. See CONTENT-TODO.md.
 *
 * COUNTIES is the real, complete list of Ohio's 88 counties: EnableMe is
 * planned to cover all of them from day one, not just the ones with sample
 * listings, so the county filter never reads as broken.
 */
(function () {
  "use strict";

  var COUNTIES = [
    "Adams", "Allen", "Ashland", "Ashtabula", "Athens", "Auglaize", "Belmont", "Brown",
    "Butler", "Carroll", "Champaign", "Clark", "Clermont", "Clinton", "Columbiana",
    "Coshocton", "Crawford", "Cuyahoga", "Darke", "Defiance", "Delaware", "Erie",
    "Fairfield", "Fayette", "Franklin", "Fulton", "Gallia", "Geauga", "Greene",
    "Guernsey", "Hamilton", "Hancock", "Hardin", "Harrison", "Henry", "Highland",
    "Hocking", "Holmes", "Huron", "Jackson", "Jefferson", "Knox", "Lake", "Lawrence",
    "Licking", "Logan", "Lorain", "Lucas", "Madison", "Mahoning", "Marion", "Medina",
    "Meigs", "Mercer", "Miami", "Monroe", "Montgomery", "Morgan", "Morrow",
    "Muskingum", "Noble", "Ottawa", "Paulding", "Perry", "Pickaway", "Pike",
    "Portage", "Preble", "Putnam", "Richland", "Ross", "Sandusky", "Scioto",
    "Seneca", "Shelby", "Stark", "Summit", "Trumbull", "Tuscarawas", "Union",
    "Van Wert", "Vinton", "Warren", "Washington", "Wayne", "Williams", "Wood", "Wyandot"
  ];

  var CATEGORIES = ["Housing", "Employment", "Transportation", "Social & Recreation", "Health", "Peer Support", "Respite"];

  var AGENCY_TYPES = ["County board of developmental disabilities", "Nonprofit provider", "State agency", "Self-advocacy group"];

  var DISABILITY_TYPES = ["Developmental disability", "Autism", "Physical disability", "Sensory disability"];

  function daysFromNow(n) {
    var d = new Date();
    d.setDate(d.getDate() + n);
    return d;
  }

  function iso(date, hour, minute) {
    var d = new Date(date);
    d.setHours(hour, minute, 0, 0);
    var pad = function (n) { return String(n).padStart(2, "0"); };
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) + "T" + pad(d.getHours()) + ":" + pad(d.getMinutes());
  }

  var EXAMPLE_LISTINGS = [
    {
      title: "Job Coaching Info Session",
      description: "A drop-in info session on job coaching and supported employment.",
      category: ["Employment"],
      county: "Franklin",
      disabilityType: "",
      dateTime: iso(daysFromNow(3), 10, 0),
      location: "Example Community Center",
      accessibilityNotes: "",
      agencyName: "Example Board of Developmental Disabilities",
      agencyType: "County board of developmental disabilities"
    },
    {
      title: "Monthly Self-Advocate Circle",
      description: "A peer-led monthly meetup for self-advocates to connect and share resources.",
      category: ["Peer Support"],
      county: "Franklin",
      disabilityType: "",
      dateTime: "",
      location: "",
      accessibilityNotes: "",
      agencyName: "Example Peer Network",
      agencyType: "Self-advocacy group"
    },
    {
      title: "Rural Rideshare & Para-transit Signup",
      description: "Learn what para-transit and rideshare options exist outside the city, and how to sign up.",
      category: ["Transportation"],
      county: "Athens",
      disabilityType: "",
      dateTime: iso(daysFromNow(12), 13, 0),
      location: "Example Regional Transit Office",
      accessibilityNotes: "Wheelchair accessible venue.",
      agencyName: "Example Regional Transit Agency",
      agencyType: "State agency"
    },
    {
      title: "Waiver Housing Navigation Workshop",
      description: "A walkthrough of waiver housing options and home modification funding.",
      category: ["Housing"],
      county: "Hamilton",
      disabilityType: "",
      dateTime: iso(daysFromNow(20), 14, 0),
      location: "Example Housing Partner office",
      accessibilityNotes: "Sensory-friendly quiet space available on request.",
      agencyName: "Example Nonprofit Housing Partner",
      agencyType: "Nonprofit provider"
    },
    {
      title: "Accessible Primary Care Clinic Day",
      description: "A clinic day at a primary care practice with accessible exam tables and extended appointment times.",
      category: ["Health"],
      county: "Cuyahoga",
      disabilityType: "Physical disability",
      dateTime: iso(daysFromNow(9), 9, 0),
      location: "Example Community Health Center",
      accessibilityNotes: "Accessible exam tables; extended appointment slots.",
      agencyName: "Example Community Health Partner",
      agencyType: "Nonprofit provider"
    },
    {
      title: "Section 8 Waitlist Q&A",
      description: "An open Q&A walking through Section 8 and waiver housing waitlists and how to apply.",
      category: ["Housing"],
      county: "Franklin",
      disabilityType: "",
      dateTime: iso(daysFromNow(2), 11, 0),
      location: "Virtual",
      accessibilityNotes: "",
      agencyName: "Example Board of Developmental Disabilities",
      agencyType: "County board of developmental disabilities"
    },
    {
      title: "Job Coaching Info Session (monthly series)",
      description: "The recurring monthly version of the job coaching info session.",
      category: ["Employment"],
      county: "Franklin",
      disabilityType: "",
      dateTime: "",
      location: "Example Community Center",
      accessibilityNotes: "Wheelchair accessible venue.",
      agencyName: "Example Board of Developmental Disabilities",
      agencyType: "County board of developmental disabilities"
    }
  ];

  window.ENABLEME_HUB_DATA = {
    counties: COUNTIES,
    categories: CATEGORIES,
    agencyTypes: AGENCY_TYPES,
    disabilityTypes: DISABILITY_TYPES,
    listings: EXAMPLE_LISTINGS
  };
})();
