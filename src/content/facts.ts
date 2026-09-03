/**
 * Single source of truth for facts that repeat across many pages (prices, hours, distances).
 * Sourced from tajmahal.gov.in and cross-checked operator data, verified 2026-09-03 — see
 * /research notes. Re-verify quarterly; the ASI changes fees and rules without much notice.
 * Referencing this file (instead of copy-pasting numbers) is what keeps every page consistent,
 * which both readers and AI answer engines reward.
 */

export const tajMahal = {
  ticketForeigner: { entry: 1100, mausoleum: 200, currency: "INR" as const, total: 1300 },
  ticketSaarc: { entry: 540, mausoleum: 200, currency: "INR" as const },
  ticketIndian: { entry: 50, mausoleum: 200, currency: "INR" as const },
  childFreeUnder: 15,
  officialTicketSite: "https://asi.payumoney.com",
  nightTicketSite: "https://asi.paygov.org.in",
  closedDay: "Friday",
  hours: "Opens 30 minutes before sunrise, closes 30 minutes before sunset (approx. 6:00 AM in summer, 6:30 AM in winter)",
  visitTimeLimit: "3 hours from entry (overstaying requires paying again to exit and re-enter)",
  nightViewing: {
    schedule: "5 nights a month, around the full moon (2 nights before, the full-moon night, and 2 nights after)",
    excluded: "Not available on Fridays or during Ramzan",
    window: "8:30 PM – 12:30 AM, in 30-minute batches of up to 50 visitors (max 400/night)",
    priceForeigner: 750,
    priceIndian: 510,
    bookAt: "ASI office, 22 Mall Road, Agra (24 hours ahead) or online at asi.paygov.org.in",
  },
  photographyRules: "Cameras and phones are welcome; no photography inside the main mausoleum. Tripods, monopods, gimbals, drones, video cameras, headphones and large bags are not allowed. Professional/commercial shoots need ASI permission arranged at least 15 days in advance.",
} as const;

export const otherMonuments = {
  agraFort: { foreigner: 650, indian: 50 },
  fatehpurSikri: { foreigner: 610, indian: 40 },
  itimadUdDaulah: { foreigner: 310, indian: 30 },
  mehtabBagh: { foreigner: 300, indian: 30 },
  amberFort: { foreigner: 500, indian: 100, compositeNote: "A 500 composite ticket covers 5 Jaipur monuments over 2 days" },
} as const;

export const transport = {
  delhiAgraCar: { distanceKm: "230–240", hours: "3–4", route: "Yamuna Expressway", tollOneWayInr: 735 },
  gatimaanExpress: { train: "12050/12049 Gatimaan Express", depart: "Hazrat Nizamuddin 08:10", arrive: "Agra Cantt 09:50", duration: "1 h 40 m", returnDepart: "Agra Cantt 17:50", returnArrive: "Hazrat Nizamuddin 19:30", note: "Does not run on Fridays" },
  delhiJaipur: { distanceKm: "270–280", hours: "3–5.5" },
  agraJaipur: { distanceKm: "~240", hours: "4–6", note: "Longer via Fatehpur Sikri and Abhaneri Chand Baori" },
} as const;

export const visa = {
  eTouristVisa30Day: 25,
  eTouristVisa1Year: 40,
  eTouristVisa5Year: 80,
  officialSite: "https://indianvisaonline.gov.in",
  warning: "Book only through indianvisaonline.gov.in — many look-alike sites charge extra fees.",
} as const;

export const marketFacts = {
  topSourceMarkets: ["USA (17.6%)", "UK (9.8%)", "Canada (4.5%)", "Australia (4.3%)"],
  visitorsPerYear: "6.9 million (FY2024–25)",
} as const;
