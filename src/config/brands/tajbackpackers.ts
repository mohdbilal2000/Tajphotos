import type { Brand } from "./types";

/**
 * BACKPACKERS — shared small-group departures, not private hire.
 *
 * This is the one brand in the portfolio that differs by *operations* rather than by subject: a
 * fixed 04:30 departure that eleven strangers board from three hostels is a different business
 * from a private car booked for one couple, with different unit economics, different risk and a
 * different customer. That is what earns it a separate site — a cheaper version of the flagship
 * would not.
 *
 * The audience is also the one that behaves least like the others: 20-35, hostel-based, often
 * already in India, frequently booking for tomorrow rather than next November, and comparing
 * against Hostelworld and GetYourGuide listings that show a number. See the note on `showPrices`
 * below — this is the brand where the portfolio-wide no-rates rule costs the most.
 *
 * DOMAIN: defaults to tajphotos.in, which is currently held as a defensive redirect. A `.in`
 * ccTLD genuinely helps here — this is the only brand whose customers are usually already in
 * India when they search — but "Taj Photos" is the flagship's name, and reusing it for a budget
 * shared-tour product is a compromise, not a design. A dedicated domain is a one-line change
 * here plus a Vercel domain attach.
 */
const brand: Brand = {
  key: "tajbackpackers",
  domain: "tajphotos.in",
  redirectDomains: [],

  name: "Taj Day Trips",
  legalName: "Taj Day Trips — a Techleaf brand",
  tagline: "Sunrise at the Taj Mahal from Delhi, in a small group, back the same night",
  description:
    "Small-group day trips to the Taj Mahal from Delhi and Agra. Hostel pickups, a real local guide, a maximum of twelve people, and you are back the same night. Solo travellers welcome.",

  product: "Shared small-group day trips to the Taj Mahal with hostel pickup — join a group rather than hiring privately.",
  audience: "Backpackers and solo travellers in their twenties and thirties, usually already in India and often booking for tomorrow.",

  // "Chai & Indigo" — warm, loud and young. Deliberately the least formal palette in the
  // portfolio: this brand sits next to hostel noticeboards, not hotel concierge desks.
  // Contrast on the #fffaf2 ground: ink 15.6:1, muted 6.3:1, primary 8.9:1 (white on primary
  // 8.6:1), accent 5.2:1. Highlight is decorative only, never text on a light surface.
  palette: {
    bg: "#fffaf2",
    surface: "#ffffff",
    surface2: "#ffeeda",
    ink: "#1f1a12",
    muted: "#655a49",
    border: "#f0dcc0",
    primary: "#1d4e6b",
    primaryHover: "#163e56",
    primaryFg: "#ffffff",
    accent: "#b04a16",
    accentHover: "#953e12",
    accentFg: "#fffaf2",
    highlight: "#f2a51c",
    themeColor: "#fffaf2",
  },
  style: { hero: "full-bleed", card: "rounded", radius: "pill", headings: "sans-friendly", density: "dense" },
  schemaTypes: ["TouristInformationCenter", "TravelAgency", "LocalBusiness", "Organization"],

  home: {
    heroEyebrow: "Small groups · Hostel pickups · Solo travellers welcome",
    heroTitle: "See the Taj Mahal at sunrise without booking a private car you don't need",
    heroSubtitle:
      "A shared minibus leaves Delhi before dawn, picks up from the hostels, and has you at the gate as it opens. Twelve people maximum, a licensed guide, and you are back in Delhi the same night.",
    heroImage: "taj-mahal-sunrise-2",
    whyEyebrow: "Why go with a group",
    whyTitle: "Going alone is cheaper until it isn't",
    whyPoints: [
      { icon: "car", title: "Split the car, not the day", text: "A private car for one person costs what a group seat costs for four." },
      { icon: "userCheck", title: "An actual licensed guide", text: "Not a driver who waits in the car park while you work it out yourself." },
      { icon: "clock", title: "At the gate when it opens", text: "We leave stupidly early on purpose. That is the whole trick." },
      { icon: "heart", title: "Good if you're solo", text: "Most people on these are travelling alone. Plenty leave together." },
    ],
    showcaseEyebrow: "Booked for tomorrow? Fine.",
    showcaseTitle: "Most people find us the night before",
    showcaseText:
      "Message us on WhatsApp and we will tell you straight away whether there is a seat on tomorrow's run, where it picks up from and what time you need to be downstairs. No account, no card, no waiting for an email.",
    showcaseImages: ["taj-mahal-sunrise-2", "taj-mahal-wide-1", "agra-fort-1"],
    steps: [
      { t: "Tell us the date and where you're staying", d: "Hostel name is enough. We know most of them." },
      { t: "We confirm the seat and the pickup time", d: "Usually within minutes on WhatsApp, including same-day." },
      { t: "Be downstairs, and sleep in the bus", d: "Everyone does. It's a four-hour drive and it's still dark." },
    ],
    faqs: [
      { q: "Can I book for tomorrow morning?", a: "Usually yes, if there is a seat left. Message us on WhatsApp rather than using the form if you are booking inside 24 hours — we will tell you straight away whether the run is full, and where and when it picks up." },
      { q: "How early does it actually leave Delhi?", a: "Between 02:00 and 03:00 depending on the season, because the drive is around four hours and the Taj Mahal opens 30 minutes before sunrise. It is brutal and it is worth it — the first 40 minutes after the gates open is soft light and almost nobody there." },
      { q: "Is it worth it if I'm travelling alone?", a: "This is mostly who comes. A shared departure is the cheapest way to do the trip properly, and you get a guide and company for the day rather than sitting alone in a private car. Nobody is paired up or made to socialise." },
      { q: "How many people are on the bus?", a: "Twelve at the absolute maximum, usually six to nine. Big coach tours move at the speed of their slowest person and lose half the morning in the car park; that is the thing we are specifically avoiding." },
      { q: "Is the Taj Mahal closed on Fridays?", a: "Yes, to tourists, every Friday. There is no run on Thursday nights for that reason. If your only free day is a Friday we will tell you honestly to spend it on Agra Fort and Fatehpur Sikri instead, or to move the day." },
      { q: "Why is there no price on the site?", a: "Because a seat, a private car and a group booking are different things, and the monument ticket alone differs by nationality. Ask and you get the exact number in a couple of minutes on WhatsApp — no form, no sales call." },
    ],
    ctaTitle: "Tell us the date and we'll check the seat",
    ctaText: "Same-day is usually possible. WhatsApp is the fastest way to find out.",
  },

  sections: { tours: true, destinations: false, guides: true, gallery: false },
  showPrices: false,

  quote: {
    cta: "Check a seat",
    heading: "Tell us the date. We'll tell you if there's a seat.",
    promise: "A real reply in minutes on WhatsApp, including same-day bookings. No account, no card up front.",
    questions: [
      {
        id: "date",
        question: "Which morning?",
        type: "text",
        required: true,
        placeholder: "e.g. tomorrow, or Thursday the 14th",
        help: "Same-day and next-day are normal here — just say so. There is no Friday run; the Taj Mahal is closed.",
      },
      {
        id: "from",
        question: "Where are you starting from?",
        type: "single",
        required: true,
        options: [
          { value: "Delhi", label: "Delhi", hint: "Hostel pickup, leaves ~02:00-03:00" },
          { value: "Agra", label: "Already in Agra", hint: "Much easier morning" },
          { value: "Jaipur", label: "Jaipur" },
          { value: "Not sure yet", label: "Not decided yet" },
        ],
      },
      {
        id: "people",
        question: "How many of you?",
        type: "single",
        required: true,
        options: [
          { value: "1", label: "Just me", hint: "Most people on these are solo" },
          { value: "2", label: "2" },
          { value: "3-4", label: "3-4" },
          { value: "5+", label: "5 or more", hint: "We can run it just for you instead" },
        ],
      },
      {
        id: "style",
        question: "Shared seat or your own car?",
        type: "single",
        help: "Shared is far cheaper. A private car makes sense from about four people, or if you want to set your own timings.",
        options: [
          { value: "Shared group seat", label: "Shared seat", hint: "Max 12 people, fixed pickup time" },
          { value: "Private car", label: "Private car", hint: "Your own timings and pace" },
          { value: "Whichever is cheaper", label: "Whichever works out cheaper" },
        ],
      },
      {
        id: "extras",
        question: "Anything else you're after?",
        type: "multi",
        options: [
          { value: "Agra Fort as well", label: "Agra Fort too" },
          { value: "Fatehpur Sikri", label: "Fatehpur Sikri" },
          { value: "Someone to take photos", label: "Someone to take a few photos" },
          { value: "Vegetarian or vegan food", label: "Veg / vegan food stops" },
          { value: "Onward drop, not back to Delhi", label: "Drop me onward, not back to Delhi" },
        ],
      },
    ],
  },

  contact: { email: "hello@tajphotos.in", whatsapp: "", phoneDisplay: "", phoneE164: "" },
  social: {},
};

export default brand;
