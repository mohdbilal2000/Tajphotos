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

  home: {
    heroEyebrow: "Prints · Licensing · A working reference",
    heroTitle: "The Taj Mahal, photographed properly — and everything we learned doing it",
    heroSubtitle:
      "Fine-art prints and image licences from photographers based in Agra, alongside a free, genuinely useful reference: where to stand, what the rules are, and what each month's light actually looks like.",
    heroImage: "taj-mahal-wide-1",
    whyEyebrow: "Why here",
    whyTitle: "Photographs made on the ground, not bought from a stock library",
    whyPoints: [
      { icon: "image", title: "Shot by people who live here", text: "Every frame made in Agra, across years and every season." },
      { icon: "award", title: "Archival prints", text: "Printed on archival paper and shipped worldwide, tracked." },
      { icon: "shield", title: "Licensing done plainly", text: "Editorial and commercial, scoped to your actual use. No surprise renewals." },
      { icon: "mapPin", title: "A free reference that isn't SEO filler", text: "Photo spots, camera rules, ticket timings, month-by-month light." },
    ],
    showcaseEyebrow: "From the archive",
    showcaseTitle: "Years of mornings, in one place",
    showcaseText:
      "Every frame here was made on the ground in Agra, across seasons, weather and light most visitors never see — winter fog, monsoon cloud, the five moonlit nights a month the site opens after dark. Available as archival prints and as licensed images.",
    showcaseImages: ["taj-mahal-wide-1", "taj-mahal-moonlight-1", "agra-itimad-1"],
    steps: [
      { t: "Tell us the image and the use", d: "A print for a wall and a licence for a print run are priced differently." },
      { t: "We quote it, usually same day", d: "Licences depend on medium, territory and run length, so we scope each one." },
      { t: "Delivered or shipped", d: "Files on approval; prints packed flat or rolled and tracked to your door." },
    ],
    faqs: [
      { q: "Do I need a licence to use one of these photographs?", a: "For anything beyond private viewing, yes. Editorial use in a book, article or documentary and commercial use in advertising or packaging are licensed separately and priced differently, because what a licence costs depends on medium, territory, run length and duration." },
      { q: "Can I photograph the Taj Mahal commercially myself?", a: "Only with permission. The Archaeological Survey of India requires advance permission for commercial photography and filming, normally filed at least 15 days ahead, and tripods and drones are prohibited inside the complex regardless. Our camera-rules guide covers what is and is not allowed in detail." },
      { q: "What is the best month for a clear photograph of the monument?", a: "October, November, February and March. December and January mornings are frequently lost to dense fog, and the pre-monsoon months from April bring haze and heat that flatten the marble. Sunrise is the strongest light in every one of those months." },
      { q: "Why isn't there a price list?", a: "A print price depends on size and finish; a licence price depends on how, where and for how long the image will be used. Both are quick to quote once we know that, and we usually come back the same working day." },
    ],
    ctaTitle: "Tell us what you need the image for",
    ctaText: "Prints, editorial licences and commercial licences are all quoted individually.",
  },

  // No destinations section: the shared destination pages are written in trip-planning voice
  // ("the gateway to your Golden Triangle trip"), which is another brand's sentence. This brand's
  // reference content is the photographic guides — spots, rules, month-by-month light — and
  // narrowing it further is the point rather than a cost.
  sections: { tours: false, destinations: false, guides: true, gallery: true },
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
