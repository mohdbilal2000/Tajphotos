import type { Brand } from "./types";

/**
 * FLAGSHIP — the trip-planning business: licensed guides, private cars, airport transfers and
 * negotiated hotel rates. Photography exists here only as an add-on a guide arranges on request;
 * anyone whose primary want is pictures belongs on tajmahalphotoshoots.com (they are photographed)
 * or tajphototours.com (they hold the camera). Keeping that boundary sharp is what stops the four
 * sites reading as one site published four times.
 */
const brand: Brand = {
  key: "tajphotos",
  domain: "tajphotos.com",
  redirectDomains: [],

  name: "Taj Photos",
  legalName: "Taj Photos — a Techleaf brand",
  tagline: "Private Taj Mahal and Golden Triangle trips, run by Agra locals",
  description:
    "Private Taj Mahal and Golden Triangle trips with licensed local guides, chauffeur-driven cars, airport transfers and hand-picked hotels. Every itinerary is built and quoted for you.",

  product: "Guided Taj Mahal and North India trips — guide, private car, transfers and hotels, arranged end to end.",
  audience: "International travellers planning their first India trip, who want one accountable local contact instead of five bookings.",

  // "Marble & Marigold" — ivory ground, indigo trust primary, Agra-sandstone accent.
  // Contrast ratios verified against the bg: ink 16.25:1, muted 6.89:1, primary 10.75:1,
  // accent 6.80:1. Highlight is 1.76:1 on the light ground and is therefore only ever used
  // for rules, underlines and icons on ink — never as text on a light surface.
  palette: {
    bg: "#faf7f2",
    surface: "#ffffff",
    surface2: "#f2ece2",
    ink: "#1c1a17",
    muted: "#5b554d",
    border: "#e6ddd0",
    primary: "#1f3a5f",
    primaryHover: "#17304f",
    primaryFg: "#ffffff",
    accent: "#8e3f26",
    accentHover: "#7a3520",
    accentFg: "#faf7f2",
    highlight: "#e8b63a",
    themeColor: "#faf7f2",
  },
  schemaTypes: ["TravelAgency", "TourOperator", "LocalBusiness", "Organization"],
  style: { hero: "split", card: "rounded", radius: "pill", headings: "serif-editorial", density: "dense" },

  home: {
    heroEyebrow: "Agra-based · Licensed local guides",
    heroTitle: "Private Taj Mahal and Golden Triangle trips, run by people who live here",
    heroSubtitle:
      "Same-day trips from Delhi, sunrise at the Taj, and tailor-made Rajasthan journeys — one local contact for the guide, the car, the tickets and the hotels. No shopping-stop detours, ever.",
    heroImage: "taj-mahal-sunrise-1",
    whyEyebrow: "Why book direct",
    whyTitle: "A small team that actually shows up",
    whyPoints: [
      { icon: "userCheck", title: "Licensed guides", text: "Ministry of Tourism registered, not a driver moonlighting as a guide." },
      { icon: "car", title: "Cars under 3 years old", text: "Air-conditioned, seatbelts checked, no roadside surprises." },
      { icon: "shield", title: "No shopping stops", text: "We are not paid commission to detour you through emporiums." },
      { icon: "camera", title: "Photographer on request", text: "Added to any tour when you want the day properly photographed." },
    ],
    showcaseEyebrow: "One contact, not five bookings",
    showcaseTitle: "The guide, the car, the tickets and the hotel — arranged by one person",
    showcaseText:
      "Most first trips to India go wrong in the gaps between bookings: the driver who does not know the guide, the ticket nobody bought, the hotel an hour from where you needed to be. We hold all of it, so there are no gaps to fall through.",
    showcaseImages: ["taj-mahal-wide-1", "india-private-car-1", "agra-fort-1"],
    steps: [
      { t: "Tell us your dates", d: "A two-minute form or a WhatsApp message. No account, no card." },
      { t: "Get a real itinerary", d: "Day by day, from a person in Agra — with an exact price for it." },
      { t: "Confirm with a small deposit", d: "Balance on arrival. Free cancellation up to 48 hours before." },
    ],
    faqs: [
      { q: "Is the Taj Mahal closed on Fridays?", a: "Yes. The Taj Mahal is closed to tourists every Friday, though local Muslims may enter for prayers. We route Friday visitors to Agra Fort, Mehtab Bagh and Fatehpur Sikri instead, or suggest a nearby day." },
      { q: "How far is Agra from Delhi, and how do you get there?", a: "Agra is about 230 km from Delhi, roughly 3-4 hours by private car on the Yamuna Expressway, or 1 hour 40 minutes on the Gatimaan Express train, which does not run on Fridays." },
      { q: "Why don't you publish prices?", a: "Because what a trip costs depends on your dates, group size, how many days and which hotels — a list price would overcharge the simple trips and quietly exclude what you asked for. Send us the details and you get an exact quote, usually the same day." },
      { q: "Is it safe to book directly instead of through a marketplace?", a: "We are a registered Agra-based operator with licensed guides and named team members, not an anonymous listing. You can reach us on WhatsApp before paying anything, and we take a modest deposit with the balance due on arrival." },
    ],
    ctaTitle: "Tell us where you'd like to go",
    ctaText: "Free to ask, no obligation — we reply with a real itinerary and an exact price.",
  },

  sections: { tours: true, destinations: true, guides: true, gallery: false },
  showPrices: false,

  quote: {
    cta: "Get my itinerary",
    heading: "Tell us the trip. We'll send a real itinerary and a price.",
    promise:
      "One reply from a human in Agra, usually within a few hours — a day-by-day plan and an exact quote, not a brochure.",
    questions: [
      {
        id: "services",
        question: "What do you need help with?",
        type: "multi",
        required: true,
        help: "Pick everything that applies — most travellers pick two or three.",
        options: [
          { value: "Guided Taj Mahal tour", label: "Guided Taj Mahal tour", hint: "Licensed guide, tickets handled" },
          { value: "Multi-day trip", label: "Multi-day trip", hint: "Golden Triangle or longer" },
          { value: "Car and driver", label: "Car & driver", hint: "Private, chauffeur-driven" },
          { value: "Airport transfer", label: "Airport transfer", hint: "Delhi or Agra" },
          { value: "Hotel booking", label: "Hotels", hint: "Our negotiated rates" },
          { value: "Photographer add-on", label: "Photographer", hint: "Added to any tour" },
        ],
      },
      {
        id: "travellers",
        question: "How many of you are travelling?",
        type: "single",
        required: true,
        options: [
          { value: "1", label: "Just me" },
          { value: "2", label: "2" },
          { value: "3-4", label: "3–4" },
          { value: "5-8", label: "5–8" },
          { value: "9+", label: "9 or more" },
        ],
      },
      {
        id: "dates",
        question: "Roughly when?",
        type: "text",
        placeholder: "e.g. second week of November, or \"flexible, sometime this winter\"",
        help: "Approximate is genuinely fine — it only needs to be close enough to price.",
      },
      {
        id: "startCity",
        question: "Where will you be starting from?",
        type: "single",
        options: [
          { value: "Delhi", label: "Delhi" },
          { value: "Agra", label: "Agra" },
          { value: "Jaipur", label: "Jaipur" },
          { value: "Elsewhere in India", label: "Somewhere else in India" },
          { value: "Not decided", label: "Still deciding" },
        ],
      },
    ],
  },

  contact: {
    email: "hello@tajphotos.com",
    whatsapp: "",
    phoneDisplay: "",
    phoneE164: "",
  },
  social: {},
};

export default brand;
