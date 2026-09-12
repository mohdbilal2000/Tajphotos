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
  style: { hero: "gallery-grid", card: "sharp", radius: "none", headings: "sans-industrial", density: "dense" },

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
