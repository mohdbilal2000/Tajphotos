import type { Brand } from "./types";

/**
 * PHOTOSHOOTS — the client is *in front of* the camera. Couples, proposals, families, solo
 * portraits. This is the inverse of tajphototours.com (where the client holds the camera) and
 * sits below tajmahalphotography.com on price and formality rather than competing with it.
 *
 * Deliberately does not publish tours, destinations or transport: a visitor here wants pictures
 * of themselves at the Taj Mahal, and every extra service on the page is a reason to leave.
 */
const brand: Brand = {
  key: "tajphotoshoots",
  domain: "tajmahalphotoshoots.com",
  redirectDomains: [],

  name: "Taj Mahal Photoshoots",
  legalName: "Taj Mahal Photoshoots — a Techleaf brand",
  tagline: "Your photos at the Taj Mahal, shot at sunrise by a local photographer",
  description:
    "Couple, proposal, family and solo photoshoots at the Taj Mahal and around Agra. Local photographers, sunrise slots, edited gallery delivered fast. Every shoot quoted to your plan.",

  product: "Portrait photoshoots of the client at the Taj Mahal and Agra — couple, proposal, pre-wedding, family, solo, maternity.",
  audience: "Couples and families on a once-in-a-lifetime trip who want the pictures to be genuinely good, not a stranger's phone snap.",

  // "Rose & Marble" — warm blush ground, deep rosewood primary, terracotta accent.
  // Contrast on the #fdf8f6 ground: ink 15.9:1, muted 6.4:1, primary 8.6:1 (white on primary
  // 8.4:1), accent 5.0:1. Highlight is decorative only — never text on a light surface.
  palette: {
    bg: "#fdf8f6",
    surface: "#ffffff",
    surface2: "#f7ebe7",
    ink: "#241a1a",
    muted: "#6b5450",
    border: "#ecd9d3",
    primary: "#7d2b45",
    primaryHover: "#68223a",
    primaryFg: "#ffffff",
    accent: "#a85a4a",
    accentHover: "#8f4a3c",
    accentFg: "#fdf8f6",
    highlight: "#d9a441",
    themeColor: "#fdf8f6",
  },
  schemaTypes: ["ProfessionalService", "LocalBusiness", "Organization"],
  style: { hero: "full-bleed", card: "overlay", radius: "soft", headings: "serif-romantic", density: "spacious" },

  sections: { tours: false, destinations: false, guides: true, gallery: true },
  showPrices: false,

  quote: {
    cta: "Get my shoot quote",
    heading: "Tell us about the shoot. We'll send a plan and a price.",
    promise:
      "A real photographer replies — with the best light slot for your date, what we'd shoot where, and an exact quote.",
    questions: [
      {
        id: "occasion",
        question: "What's the occasion?",
        type: "single",
        required: true,
        options: [
          { value: "Couple / honeymoon", label: "Couple or honeymoon" },
          { value: "Surprise proposal", label: "A proposal", hint: "We shoot it discreetly, from a distance" },
          { value: "Pre-wedding", label: "Pre-wedding" },
          { value: "Family", label: "Family" },
          { value: "Solo portrait", label: "Solo portrait" },
          { value: "Maternity", label: "Maternity" },
          { value: "Something else", label: "Something else" },
        ],
      },
      {
        id: "locations",
        question: "Where would you like to shoot?",
        type: "multi",
        help: "Not sure is a perfectly good answer — we'll suggest the right spots for your date and light.",
        options: [
          { value: "Taj Mahal at sunrise", label: "Taj Mahal, sunrise", hint: "Softest light, thinnest crowds" },
          { value: "Taj Mahal during the day", label: "Taj Mahal, daytime" },
          { value: "Mehtab Bagh", label: "Mehtab Bagh", hint: "The Taj from across the river" },
          { value: "Agra Fort", label: "Agra Fort" },
          { value: "Your hotel", label: "Your hotel" },
          { value: "Not sure yet", label: "Not sure — suggest for me" },
        ],
      },
      {
        id: "people",
        question: "How many people in the photos?",
        type: "single",
        required: true,
        options: [
          { value: "1", label: "Just me" },
          { value: "2", label: "2" },
          { value: "3-5", label: "3–5" },
          { value: "6+", label: "6 or more" },
        ],
      },
      {
        id: "dates",
        question: "What date are you in Agra?",
        type: "text",
        required: true,
        placeholder: "e.g. 14 Nov, or \"the 12th or 13th, not fixed yet\"",
        help: "Sunrise slots at the Taj Mahal are limited, so the date drives everything else.",
      },
      {
        id: "deliverables",
        question: "What would you like back?",
        type: "multi",
        options: [
          { value: "Edited highlights", label: "Edited highlights" },
          { value: "Full edited gallery", label: "The full gallery, edited" },
          { value: "Video as well", label: "Video too" },
          { value: "Printed album", label: "A printed album" },
          { value: "Fast turnaround", label: "Fast turnaround", hint: "Some shots before you fly home" },
        ],
      },
    ],
  },

  contact: {
    email: "hello@tajmahalphotoshoots.com",
    whatsapp: "",
    phoneDisplay: "",
    phoneE164: "",
  },
  social: {},
};

export default brand;
