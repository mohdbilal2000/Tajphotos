import type { Brand } from "./types";

/**
 * PHOTOGRAPHS — the noun, not the service. An image library and reference desk: the pictures
 * themselves, sold as fine-art prints and licences, wrapped in the deepest free reference
 * content in the portfolio (photo spots, ticket and camera rules, light tables by month).
 *
 * This is the portfolio's authority property and the only one whose primary content is
 * informational rather than transactional. That matters twice over: editorial depth is what
 * earns citations from AI answer engines, and a genuinely useful free reference is also the
 * clearest possible evidence that this group of sites is a real publisher rather than a set of
 * landing pages. It refers commissions out to the sibling brands instead of selling shoots.
 */
const brand: Brand = {
  key: "tajphotographs",
  domain: "tajmahalphotographs.com",
  redirectDomains: ["tajmahalphotographs.in"],

  name: "Taj Mahal Photographs",
  legalName: "Taj Mahal Photographs — a Techleaf brand",
  tagline: "The Taj Mahal, photographed properly — prints, licences and a working reference",
  description:
    "Fine-art prints and image licences of the Taj Mahal and Agra, plus a free working reference: photo spots, camera and drone rules, ticket timings and month-by-month light.",

  product: "Fine-art prints and editorial/commercial image licences, plus a free photographic reference library for Agra.",
  audience: "Editors, publishers, designers and travellers researching how and where to photograph the Taj Mahal before they arrive.",

  // "Parchment & Brass" — archival paper ground that flatters printed work, deep forest primary,
  // bronze accent. On the #f7f6f1 ground: ink 15.8:1, muted 6.6:1, primary 9.6:1
  // (white on primary 9.2:1), accent 5.9:1. Highlight is brass, decorative only.
  palette: {
    bg: "#f7f6f1",
    surface: "#ffffff",
    surface2: "#eceade",
    ink: "#1a1c17",
    muted: "#575a4e",
    border: "#dedbc9",
    primary: "#2f4a33",
    primaryHover: "#253c29",
    primaryFg: "#ffffff",
    accent: "#7a5a1e",
    accentHover: "#664b18",
    accentFg: "#f7f6f1",
    highlight: "#c9a227",
    themeColor: "#f7f6f1",
  },
  schemaTypes: ["ProfessionalService", "LocalBusiness", "Organization"],
  style: { hero: "editorial", card: "frame", radius: "none", headings: "serif-gallery", density: "spacious" },

  sections: { tours: false, destinations: true, guides: true, gallery: true },
  showPrices: false,

  quote: {
    cta: "Request a licence or print",
    heading: "Tell us what you need the image for. We'll quote it.",
    promise:
      "Licence pricing depends entirely on use, territory and run length, so we quote each one — usually the same working day.",
    questions: [
      {
        id: "need",
        question: "What do you need?",
        type: "single",
        required: true,
        options: [
          { value: "Fine-art print", label: "A fine-art print", hint: "Archival paper, shipped worldwide" },
          { value: "Editorial licence", label: "An editorial licence", hint: "Books, press, documentary" },
          { value: "Commercial licence", label: "A commercial licence", hint: "Advertising, packaging, brand use" },
          { value: "Commissioned shoot", label: "A commissioned shoot", hint: "Something specific, shot to brief" },
          { value: "Not sure", label: "Not sure yet" },
        ],
      },
      {
        id: "subject",
        question: "Which image, or what subject?",
        type: "text",
        required: true,
        placeholder: "Paste an image reference, or describe it — \"Taj from Mehtab Bagh at dusk\"",
      },
      {
        id: "usage",
        question: "How will it be used?",
        type: "text",
        placeholder: "e.g. full-page in a printed guidebook, 20,000 copies, worldwide English",
        help: "Print size for a physical print; medium, territory, run length and duration for a licence. Rough is fine.",
      },
      {
        id: "deadline",
        question: "When do you need it?",
        type: "single",
        options: [
          { value: "Urgent", label: "Urgently", hint: "Within 48 hours" },
          { value: "This month", label: "This month" },
          { value: "Next few months", label: "Next few months" },
          { value: "Just researching", label: "Just researching for now" },
        ],
      },
    ],
  },

  contact: {
    email: "hello@tajmahalphotographs.com",
    whatsapp: "",
    phoneDisplay: "",
    phoneE164: "",
  },
  social: {},
};

export default brand;
