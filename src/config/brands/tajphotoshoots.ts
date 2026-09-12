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

  home: {
    heroEyebrow: "Agra photographers · Sunrise slots",
    heroTitle: "Your photos at the Taj Mahal, taken properly",
    heroSubtitle:
      "Couples, proposals, families and solo portraits — shot at sunrise by a photographer who lives in Agra and knows exactly where the light falls and when the crowds arrive.",
    heroImage: "taj-mahal-couple-1",
    whyEyebrow: "Why shoot with us",
    whyTitle: "You get one morning. We only get one chance too.",
    whyPoints: [
      { icon: "sun", title: "We book the light, not the hour", text: "The first 40 minutes after the gates open is the whole shoot. We plan around it." },
      { icon: "heart", title: "Proposals shot from a distance", text: "You will not see us until you want to. Nobody else will know either." },
      { icon: "image", title: "Edited, not just delivered", text: "Hand-edited frames, not a dump of raw files you have to sift through." },
      { icon: "clock", title: "Some shots before you fly", text: "Ask and we will turn a first set around while you are still in India." },
    ],
    showcaseEyebrow: "Sunrise, every time",
    showcaseTitle: "The difference is forty minutes, and knowing where to stand",
    showcaseText:
      "The same monument photographs completely differently at 06:10 and at 09:00 — one is soft and nearly empty, the other is flat light and a thousand people in your frame. We build the whole shoot around the first window, because it does not come back.",
    showcaseImages: ["taj-mahal-couple-1", "taj-mahal-sunrise-2", "taj-mahal-detail-1"],
    steps: [
      { t: "Tell us the occasion and date", d: "Sunrise slots are limited, so the date drives everything else." },
      { t: "We plan the shoot and quote it", d: "Which spots, in what order, and what you get back — with a price." },
      { t: "Turn up and be photographed", d: "We handle the timing, the angles and the crowds. You just show up." },
    ],
    faqs: [
      { q: "Can we shoot inside the Taj Mahal complex?", a: "Yes, across the gardens, the platform and the riverside terrace. Photography is not permitted inside the main mausoleum chamber, and tripods, monopods and drones are banned anywhere in the complex — so a shoot is planned entirely around handheld work in natural light." },
      { q: "What time do we need to start?", a: "Pickup is usually around 05:30-06:00 so you are at the gate before it opens. The soft light and the thin crowds both last roughly the first 40 minutes, and that window is genuinely the difference between good photos and ordinary ones." },
      { q: "Do you do surprise proposals?", a: "Often. We shoot from a distance with a longer lens so nothing gives it away, then step in afterwards for portraits once she has said yes. Tell us the plan and we will work out sightlines and a signal in advance." },
      { q: "Why isn't there a price list?", a: "Shoots vary more than people expect — one portrait session at sunrise and a two-hour multi-location pre-wedding shoot are different jobs. Tell us the occasion, the date and how many people, and we will quote exactly that, free and with no obligation." },
    ],
    ctaTitle: "Tell us about your shoot",
    ctaText: "A photographer replies with the best light slot for your date and an exact price.",
  },

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
