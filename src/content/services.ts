import type { Availability, FleetVehicle, Service } from "@/content/types";
import { tajMahal, transport } from "@/content/facts";

/**
 * What we can actually arrange, how far ahead we need to know, and — the part most operators leave
 * off — when the answer is "not every day".
 *
 * `availability` is deliberately not a marketing field. Anything inside the Taj Mahal complex is
 * "except-friday" because the monument closes on Fridays; night viewing is "seasonal" because it is
 * tied to the lunar calendar; anything that depends on a third party's inventory on your dates is
 * "on-request", which means we confirm it before you pay rather than after. Numbers here come from
 * src/content/facts.ts so they cannot drift from the rest of the site.
 */

export const availabilityLabel: Record<Availability, string> = {
  daily: "Every day",
  "except-friday": "Daily except Friday",
  seasonal: "Seasonal / by date",
  "on-request": "Confirmed on your dates",
};

export const availabilityNote: Record<Availability, string> = {
  daily: "No date restrictions.",
  "except-friday": `The Taj Mahal is closed to visitors every ${tajMahal.closedDay}.`,
  seasonal: "Tied to the calendar, not to our diary — we will tell you the eligible dates.",
  "on-request": "Depends on third-party availability; we confirm before you pay anything.",
};

export const fleet: FleetVehicle[] = [
  {
    slug: "innova-crysta",
    name: "Toyota Innova Crysta",
    seats: "1–4 travellers",
    luggage: "3 large cases",
    bestFor: "The default Golden Triangle car",
    note: "A seven-seater we sell as a four, because four people and four suitcases in a seven-seater is a long day. Ground clearance for Rajasthan back roads. The exact car and its registration are confirmed with your booking.",
  },
  {
    slug: "innova-hycross",
    name: "Toyota Innova Hycross (hybrid)",
    seats: "1–4 travellers",
    luggage: "3 large cases",
    bestFor: "Long expressway days",
    note: "Quieter and noticeably smoother than the Crysta on the Yamuna Expressway; the one we put honeymooners in.",
  },
  {
    slug: "camry-hybrid",
    name: "Toyota Camry Hybrid",
    seats: "1–3 travellers",
    luggage: "2 large cases",
    bestFor: "Couples, city days, airport runs",
    note: "A sedan, so it sits lower and rides quieter — ideal for Delhi and the expressway, less so for unpaved approaches.",
  },
  {
    slug: "mercedes-e-class",
    name: "Mercedes-Benz E-Class",
    seats: "1–3 travellers",
    luggage: "2 large cases",
    bestFor: "When the car is part of the occasion",
    note: "Booked on request rather than held in the fleet, so it needs a few days' notice and is priced separately.",
  },
  {
    slug: "urbania",
    name: "Force Urbania / Tempo Traveller",
    seats: "5–12 travellers",
    luggage: "One case per seat",
    bestFor: "Families and small groups",
    note: "Push-back seats, full air conditioning and a luggage bay, so nobody travels with a case on their lap.",
  },
  {
    slug: "gatimaan-express",
    name: `${transport.gatimaanExpress.train}, Executive Chair Car`,
    seats: "Per seat",
    luggage: "Carried on board",
    bestFor: "Delhi to Agra in 1 h 40 m",
    note: `Departs Hazrat Nizamuddin ${transport.gatimaanExpress.depart}, reaches Agra Cantt ${transport.gatimaanExpress.arrive}, and returns ${transport.gatimaanExpress.returnDepart} → ${transport.gatimaanExpress.returnArrive}. ${transport.gatimaanExpress.note}. We book the seat, meet you on the platform and drive you from there.`,
  },
];

export const services: Service[] = [
  {
    slug: "airport-meet-greet",
    name: "Airport meet-and-greet, Delhi T3",
    category: "arrival",
    what: "A named greeter inside the arrivals hall with a board, a porter for your cases, a SIM or eSIM sorted if you want one, and your driver already parked — not a phone number to call after you land.",
    leadTime: "24 hours, with your flight number",
    availability: "daily",
    includedInTours: true,
  },
  {
    slug: "private-car-driver",
    name: "Private car with chauffeur",
    category: "transport",
    what: `Your own car and driver for the whole itinerary, not a shared shuttle and not a per-leg taxi. Delhi to Agra is ${transport.delhiAgraCar.distanceKm} km, ${transport.delhiAgraCar.hours} hours on the ${transport.delhiAgraCar.route}; tolls, parking, fuel and the driver's own costs are ours, not yours.`,
    leadTime: "48 hours in season; same-day often possible",
    availability: "daily",
    includedInTours: true,
    note: "No commission stops. We are not paid by emporiums, so we do not drive you to them — the single most common complaint about Golden Triangle tours and the easiest one to simply not cause.",
  },
  {
    slug: "taj-sunrise-entry",
    name: "Taj Mahal sunrise entry, tickets pre-bought",
    category: "access",
    what: `Tickets bought in your own name before you arrive, and your guide at the gate before it opens — ${tajMahal.hours.toLowerCase()}. There is no skip-the-line product at the Taj Mahal; being early is the whole trick.`,
    leadTime: "48 hours",
    availability: "except-friday",
    includedInTours: true,
    note: `Foreign nationals pay ₹${tajMahal.ticketForeigner.total} including the ₹${tajMahal.ticketForeigner.mausoleum} mausoleum add-on; children under ${tajMahal.childFreeUnder} enter free. Entry allows ${tajMahal.visitTimeLimit}.`,
  },
  {
    slug: "taj-night-viewing",
    name: "Taj Mahal night viewing",
    category: "access",
    what: `${tajMahal.nightViewing.schedule}, ${tajMahal.nightViewing.window}. ${tajMahal.nightViewing.excluded}.`,
    leadTime: "Two weeks — permits are issued 24 hours ahead and sell out",
    availability: "seasonal",
    note: `₹${tajMahal.nightViewing.priceForeigner} for foreign nationals. Booked at the ${tajMahal.nightViewing.bookAt}. We will send you the eligible dates for your month before you commit to an itinerary.`,
  },
  {
    slug: "licensed-guide",
    name: "Licensed guide, by language",
    category: "access",
    what: "A Ministry of Tourism-licensed guide rather than a driver doubling as one. English and Hindi every day; French, German, Spanish, Italian and Japanese guides exist but are a small pool.",
    leadTime: "English: 48 hours. Other languages: 7–10 days",
    availability: "on-request",
    includedInTours: true,
  },
  {
    slug: "photographer",
    name: "Professional photographer",
    category: "photography",
    what: "A photographer who walks the complex with you and hands over edited, high-resolution images within 24–48 hours. Sessions run from 30 minutes to a two-hour couple shoot.",
    leadTime: "72 hours for sunrise slots",
    availability: "except-friday",
    note: tajMahal.photographyRules,
  },
  {
    slug: "hotel-booking",
    name: "Hotel rooms held and confirmed",
    category: "concierge",
    what: "We hold rooms on your dates — palace, heritage or modern — and confirm them before you pay us anything. If a property is full we say so and offer the nearest equivalent rather than quietly downgrading you.",
    leadTime: "Palace properties: 4–8 weeks in October–March",
    availability: "on-request",
  },
  {
    slug: "dining-reservations",
    name: "Dining reservations",
    category: "concierge",
    what: "Tables at the hotel restaurants that genuinely need booking days ahead, and honest recommendations for the ones that do not. Vegetarian, Jain, halal, gluten-free and nut allergies briefed to the kitchen in advance, in Hindi.",
    leadTime: "72 hours",
    availability: "on-request",
  },
  {
    slug: "celebrations",
    name: "Proposals and celebrations",
    category: "concierge",
    what: "Flowers, a private table, a cake, a photographer positioned where you will not see them. Planned around what is actually permitted: nothing can be staged inside the Taj Mahal complex, so we set up at your hotel, at Mehtab Bagh across the river, or on a rooftop with the dome behind you.",
    leadTime: "7 days",
    availability: "on-request",
    note: "The Archaeological Survey of India does not permit props, staging, tripods or commercial shoots inside the complex without permission arranged at least 15 days ahead.",
  },
  {
    slug: "accessibility",
    name: "Step-free routing and wheelchair access",
    category: "access",
    what: "A route planned around ramps and lifts, a wheelchair arranged at the Taj Mahal, and monuments swapped out where access genuinely is not possible rather than promised and then apologised for. Agra Fort and Amber Fort both have sections no wheelchair can reach; we will tell you which before you book.",
    leadTime: "7 days",
    availability: "on-request",
  },
  {
    slug: "duty-contact",
    name: "A person to call while you travel",
    category: "concierge",
    what: "One WhatsApp thread, answered by a named member of the team, for the whole trip — the flight that moved, the stomach that turned, the train that was cancelled. Not a ticketing system.",
    leadTime: "None",
    availability: "daily",
    includedInTours: true,
    note: "Enquiries before you travel are answered 7 AM – 11 PM IST. Once your trip has started, the same thread is watched around the clock on your travel days.",
  },
];

export const servicesByCategory = (c: Service["category"]) => services.filter((s) => s.category === c);

export const serviceCategories: { key: Service["category"]; label: string; blurb: string }[] = [
  { key: "arrival", label: "Arrival", blurb: "From the aircraft door to the car" },
  { key: "transport", label: "Transport", blurb: "Cars, drivers and the Gatimaan Express" },
  { key: "access", label: "Access", blurb: "Tickets, guides, timings and permits" },
  { key: "photography", label: "Photography", blurb: "What we started the company doing" },
  { key: "concierge", label: "On the ground", blurb: "Hotels, tables, celebrations, and a person to call" },
];
