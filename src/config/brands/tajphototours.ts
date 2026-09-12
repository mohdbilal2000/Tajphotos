import type { Brand } from "./types";

/**
 * PHOTO TOURS — the client *holds* the camera. Sunrise photo walks, golden-hour workshops and
 * multi-day shooting itineraries led by a photographer who also guides. The buyer here owns a
 * camera and is choosing between this and shooting alone, so the page has to answer craft
 * questions (light, angles, permitted gear, ASI rules) rather than sell scenery.
 *
 * The deliberate inverse of tajmahalphotoshoots.com. No portrait packages, no "we photograph
 * you" — that request gets referred across rather than upsold here.
 */
const brand: Brand = {
  key: "tajphototours",
  domain: "tajphototours.com",
  redirectDomains: ["tajphototours.in"],

  name: "Taj Photo Tours",
  legalName: "Taj Photo Tours — a Techleaf brand",
  tagline: "Photograph the Taj Mahal properly — led by a photographer who knows the light",
  description:
    "Sunrise photo walks, golden-hour workshops and multi-day photography tours of Agra and North India. Led by working photographers. Small groups, real craft, gear rules explained.",

  product: "Guided photography tours and workshops where the traveller shoots — light timing, locations, technique and permit rules.",
  audience: "Enthusiast and professional photographers from the US, Germany, Australia and the UK who would otherwise shoot Agra blind.",

  // "Slate & Amber" — cool neutral ground so photographs on the page carry all the colour,
  // deep teal-slate primary, burnt amber accent. On the #f4f5f6 ground: ink 16.1:1,
  // muted 7.0:1, primary 11.4:1 (white on primary 10.9:1), accent 6.3:1.
  palette: {
    bg: "#f4f5f6",
    surface: "#ffffff",
    surface2: "#e7e9ec",
    ink: "#16181b",
    muted: "#55595f",
    border: "#d6dade",
    primary: "#123b45",
    primaryHover: "#0c2d35",
    primaryFg: "#ffffff",
    accent: "#9a4a10",
    accentHover: "#823d0c",
    accentFg: "#f4f5f6",
    highlight: "#e3a11c",
    themeColor: "#f4f5f6",
  },
  schemaTypes: ["TouristInformationCenter", "TravelAgency", "LocalBusiness", "Organization"],
  style: { hero: "gallery-grid", card: "sharp", radius: "none", headings: "sans-industrial", density: "dense" },

  home: {
    heroEyebrow: "Small groups · Led by working photographers",
    heroTitle: "Photograph the Taj Mahal properly, with someone who knows the light",
    heroSubtitle:
      "Sunrise photo walks, golden-hour workshops and multi-day shooting itineraries across Agra and North India. You hold the camera. We handle timing, access, angles and the rules nobody tells you about.",
    heroImage: "taj-mahal-detail-1",
    whyEyebrow: "Why shoot with a guide",
    whyTitle: "Most people get one morning here, and waste it queueing",
    whyPoints: [
      { icon: "sun", title: "Timed to the light", text: "We are at the gate before it opens because the first 40 minutes is the shot." },
      { icon: "mapPin", title: "Angles you won't find alone", text: "Mehtab Bagh, the river bank, the rooftops — and when each of them works." },
      { icon: "shield", title: "The rules, straight", text: "No tripods, no drones, no photography inside the chamber. We say so up front." },
      { icon: "award", title: "Led by people who shoot", text: "Working photographers, not a guide who has read about exposure." },
    ],
    showcaseEyebrow: "Craft, not sightseeing",
    showcaseTitle: "You will not be handed a shot list. You will be put in the right place at the right hour.",
    showcaseText:
      "Where the light lands on the marble shifts month by month, the river bank works only at certain water levels, and the rules on what you can carry inside are stricter than most visitors expect. Knowing all three in advance is most of the difference.",
    showcaseImages: ["taj-mahal-detail-1", "taj-mahal-moonlight-1", "agra-itimad-1"],
    steps: [
      { t: "Tell us what you shoot", d: "Phone or medium format, it changes the pace and where we take you." },
      { t: "We build it around the light", d: "Which locations, on which mornings, and what is realistically shootable." },
      { t: "Shoot, with help when you want it", d: "As much or as little instruction as you ask for. It is your trip." },
    ],
    faqs: [
      { q: "Can I bring a tripod or a drone to the Taj Mahal?", a: "No. Tripods, monopods, drones and video cameras are all prohibited inside the Taj Mahal complex, and photography is not allowed inside the main mausoleum chamber. Handheld stills are fine everywhere else in the grounds. A commercial shoot needs ASI permission filed at least 15 days in advance." },
      { q: "When is the light best?", a: "October to March, in the first 40 minutes after the gates open 30 minutes before sunrise. Winter fog can hide the monument entirely in December and January mornings, which is worth planning around — we will tell you honestly what your dates are likely to give you." },
      { q: "Is this useful if I only shoot on a phone?", a: "Yes, and we mean that. Composition, position and timing account for far more of a good Taj photograph than the sensor does, and those are exactly what a guided shoot fixes. We adjust pace and locations to what you are carrying." },
      { q: "Why don't you list prices?", a: "A solo photographer on one sunrise walk and a six-person workshop across four days are not the same job. Tell us your dates, your group and what you want to shoot, and we will quote it exactly — free, and with no obligation." },
    ],
    ctaTitle: "Tell us what you want to shoot",
    ctaText: "A working photographer replies with the right slots for your dates and a price.",
  },

  sections: { tours: true, destinations: true, guides: true, gallery: true },
  showPrices: false,

  quote: {
    cta: "Plan my photo tour",
    heading: "Tell us what you shoot. We'll build the tour around the light.",
    promise:
      "A working photographer replies with the right slots for your dates, what's realistically shootable, and a quote.",
    questions: [
      {
        id: "level",
        question: "What are you shooting with?",
        type: "single",
        required: true,
        help: "This changes the pace and where we take you — nothing else.",
        options: [
          { value: "Phone", label: "Phone", hint: "Absolutely fine — composition still wins" },
          { value: "Mirrorless / DSLR, learning", label: "Mirrorless or DSLR, still learning" },
          { value: "Enthusiast", label: "Enthusiast", hint: "I shoot manual and know my kit" },
          { value: "Professional", label: "Professional", hint: "Working or selling my work" },
        ],
      },
      {
        id: "interests",
        question: "What do you want to come away with?",
        type: "multi",
        required: true,
        options: [
          { value: "Sunrise photo walk", label: "Sunrise at the Taj", hint: "The shot everyone wants, done right" },
          { value: "Golden hour workshop", label: "Golden-hour workshop" },
          { value: "Full-day Agra photo tour", label: "Full-day Agra" },
          { value: "Multi-day tour", label: "Multi-day", hint: "Agra, Delhi, Rajasthan" },
          { value: "Moonlight / night", label: "Moonlight & night", hint: "Five ASI nights a month only" },
          { value: "Street and documentary", label: "Street & documentary" },
          { value: "Architecture and detail", label: "Architecture & detail work" },
        ],
      },
      {
        id: "dates",
        question: "What dates are you in India?",
        type: "text",
        required: true,
        placeholder: "e.g. 3–8 February, arriving Delhi",
        help: "Moonlight shoots run on five nights a month, so exact dates matter more here than usual.",
      },
      {
        id: "groupSize",
        question: "Shooting alone or with others?",
        type: "single",
        options: [
          { value: "1", label: "Alone" },
          { value: "2", label: "2 of us" },
          { value: "3-6", label: "3–6" },
          { value: "Workshop group", label: "A workshop group", hint: "I'm organising for others" },
        ],
      },
      {
        id: "gear",
        question: "Anything specific we should sort out in advance?",
        type: "text",
        placeholder: "Tripod, drone, ASI permit, a specific shot you've seen…",
        help:
          "Worth asking: tripods, monopods and drones are banned inside the Taj Mahal complex, and a commercial shoot needs ASI permission filed at least 15 days ahead. We'll tell you straight what is and isn't possible.",
      },
    ],
  },

  contact: {
    email: "hello@tajphototours.com",
    whatsapp: "",
    phoneDisplay: "",
    phoneE164: "",
  },
  social: {},
};

export default brand;
