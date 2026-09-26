import type { Stay } from "@/content/types";

/**
 * The hotels we book for guests.
 *
 * Editorial rules for this file, because it is the one place on the site that talks about other
 * companies' businesses:
 *
 * 1. Every property here is a real, operating hotel, described only with facts that can be checked
 *    against the property's own published material (what the building was, when it was built, where
 *    it sits, what it is known for). No invented amenities.
 * 2. No rates and no star ratings. Rates move by season and by date; quoting an indicative nightly
 *    figure here would be a number a traveller could hold us to and we could not honour. The `tier`
 *    field is OUR categorisation of the kind of building, not a rating of the hotel.
 * 3. No claim of affiliation, partnership, preferred-agent status or negotiated rate. We are a tour
 *    operator that books rooms; that is all this list asserts. `staysDisclosure` below is rendered
 *    on every surface that shows these, and must stay with them.
 * 4. `image` points at the shipped city photography, NOT at a photograph of the property — there is
 *    no licence-safe library of other companies' hotel interiors and there never will be. StayCard
 *    therefore captions every plate with what the picture actually shows. If you swap in real
 *    property imagery supplied by the hotel (with its permission in writing), keep the caption.
 *
 * Adding a property: keep it to hotels the team has actually placed guests in, and keep `detail`
 * to things you could point at a source for.
 */
export const staysDisclosure =
  "We are not the hotel, an agent of it, or affiliated with any group named here. We hold and confirm rooms for your dates before you pay anything, and if a property is full or the rate has moved we tell you and offer the nearest equivalent. You are always free to book direct and have us plan the rest around it. The photographs on this page are of the cities these hotels stand in, not of the properties themselves — each one is captioned with what it actually shows.";

export const stays: Stay[] = [
  {
    slug: "oberoi-amarvilas-agra",
    name: "The Oberoi Amarvilas",
    city: "Agra",
    destination: "agra",
    tier: "contemporary",
    oneLine: "The only hotel in Agra where every single room looks at the Taj Mahal.",
    detail:
      "Built in Moorish and Mughal style around terraced fountains and a reflecting pool, Amarvilas sits roughly 600 metres from the Taj Mahal's east gate — close enough to walk, and close enough that the monument is framed from every guest room and suite rather than from a handful of premium ones. It is the address for travellers whose one non-negotiable is waking up to the view.",
    signature: "Sunrise from your own balcony, before you have even left the building.",
    image: "taj-mahal-couple-1",
    bestFor: ["Honeymoons", "A single big-splurge night", "Photographers"],
  },
  {
    slug: "itc-mughal-agra",
    name: "ITC Mughal",
    city: "Agra",
    destination: "agra",
    tier: "contemporary",
    oneLine: "Thirty-five acres of gardens and one of the largest spas in India.",
    detail:
      "A low-rise, red-brick homage to Mughal architecture that won the Aga Khan Award for Architecture in 1980 — unusual for a hotel, and it shows in the courtyards, water channels and scale of the grounds. Kaya Kalp, its spa, is the reason many guests add a second Agra night instead of driving straight on to Jaipur.",
    signature: "A hammam and a long afternoon in the gardens after a 5 AM start.",
    image: "agra-itimad-1",
    bestFor: ["Families", "Slower itineraries", "Two-night Agra stays"],
  },
  {
    slug: "trident-agra",
    name: "Trident Agra",
    city: "Agra",
    destination: "agra",
    tier: "contemporary",
    oneLine: "The sensible premium choice on Fatehabad Road — calm, walled, a garden courtyard.",
    detail:
      "Not a palace and not pretending to be one: a well-run, low-rise hotel built around a central courtyard and pool, ten minutes from the Taj Mahal's west gate. We book it most often for travellers who want a reliably good room and would rather put the difference into the photography or an extra day in Rajasthan.",
    signature: "Breakfast served early enough to actually make the sunrise gate.",
    image: "agra-fort-1",
    bestFor: ["Value without compromise", "Short Agra stops", "First-time visitors"],
  },
  {
    slug: "imperial-new-delhi",
    name: "The Imperial New Delhi",
    city: "New Delhi",
    destination: "delhi",
    tier: "heritage",
    oneLine: "A 1931 Lutyens-era hotel on Janpath with a museum's worth of art on its walls.",
    detail:
      "Opened in 1931 in the heart of Lutyens' Delhi, The Imperial holds one of the country's notable private collections of 18th and 19th-century prints, lithographs and paintings of India — hung along the corridors rather than shut in a gallery. The palm-lined drive and the Victorian-era public rooms make it the most atmospheric first night in Delhi for anyone arriving on a long-haul flight.",
    signature: "Tea under the palms of the Atrium, jet lag and all.",
    image: "delhi-india-gate-1",
    bestFor: ["First night in India", "History readers", "Central Delhi sightseeing"],
  },
  {
    slug: "leela-palace-new-delhi",
    name: "The Leela Palace New Delhi",
    city: "New Delhi",
    destination: "delhi",
    tier: "contemporary",
    oneLine: "Purpose-built Lutyens-inspired grandeur in the Diplomatic Enclave.",
    detail:
      "Opened in 2011 and designed in deliberate homage to Edwin Lutyens' New Delhi, this is the modern-marble end of the city's luxury market: a rooftop pool looking over the Diplomatic Enclave, a spa, and service calibrated for people who fly a lot. Practically, it is a quiet, green, low-traffic base for Old Delhi mornings.",
    signature: "A rooftop swim with the Delhi skyline going pink.",
    image: "delhi-humayun-tomb-1",
    bestFor: ["Contemporary luxury", "Business-plus-leisure trips", "Families"],
  },
  {
    slug: "rambagh-palace-jaipur",
    name: "Rambagh Palace",
    city: "Jaipur",
    destination: "jaipur",
    tier: "palace",
    oneLine: "The Maharaja of Jaipur's own residence, in 47 acres of gardens.",
    detail:
      "Built in 1835 and later the residence of the Maharaja of Jaipur, Rambagh became a hotel in 1957 and is still the benchmark against which every other Jaipur property is judged. Peacocks, marble corridors, a bar in the former billiards room, and gardens large enough that you stop hearing the city.",
    signature: "Dinner in the gardens, with the palace lit behind you.",
    image: "jaipur-city-palace-1",
    bestFor: ["Anniversaries", "Once-in-a-lifetime nights", "Slow Jaipur stays"],
  },
  {
    slug: "samode-haveli-jaipur",
    name: "Samode Haveli",
    city: "Jaipur",
    destination: "jaipur",
    tier: "heritage",
    oneLine: "A 200-year-old family haveli inside the old city walls, with hand-painted rooms.",
    detail:
      "Still owned by the Samode family, this early 19th-century townhouse sits within the walled city rather than out on the ring road, so you can walk to the bazaars. Its mirrored and hand-painted Sheesh Mahal dining room is the sort of space a big hotel cannot manufacture.",
    signature: "Breakfast in a courtyard, then five minutes on foot to the bazaar.",
    image: "jaipur-hawa-mahal-1",
    bestFor: ["Couples", "Old-city walkers", "Travellers who dislike big hotels"],
  },
  {
    slug: "taj-lake-palace-udaipur",
    name: "Taj Lake Palace",
    city: "Udaipur",
    destination: "udaipur",
    tier: "palace",
    oneLine: "An 18th-century palace on an island, reached only by boat.",
    detail:
      "Built between 1743 and 1746 as Jag Niwas, the summer palace of the Mewar rulers, it covers its own island in Lake Pichola — there is no road, so every arrival and departure is a short boat crossing. White marble, courtyards, lotus pools, and the City Palace looking back at you across the water.",
    signature: "The boat ride in. Everyone remembers the boat ride in.",
    image: "udaipur-lake-pichola-1",
    bestFor: ["Honeymoons", "Proposals", "The one night you will describe for years"],
  },
  {
    slug: "oberoi-udaivilas-udaipur",
    name: "The Oberoi Udaivilas",
    city: "Udaipur",
    destination: "udaipur",
    tier: "contemporary",
    oneLine: "Fifty acres on the far bank of Lake Pichola, built as a modern palace.",
    detail:
      "Laid out on former hunting grounds of the Maharana of Mewar, Udaivilas is a sequence of domed courtyards, reflecting pools and private pool pavilions facing the lake — a purpose-built hotel that borrows the vocabulary of a palace rather than inheriting it. Part of the grounds is a conservation area where the resident wildlife came with the land.",
    signature: "Your own semi-private pool, and the lake beyond it.",
    image: "udaipur-jag-mandir-1",
    bestFor: ["Honeymoons", "Families wanting space", "Long Udaipur stays"],
  },
  {
    slug: "umaid-bhawan-palace-jodhpur",
    name: "Umaid Bhawan Palace",
    city: "Jodhpur",
    tier: "palace",
    oneLine: "Art-deco royal residence, completed 1943, still partly the family's home.",
    detail:
      "One of the world's largest private residences, finished in 1943 in an Indian art-deco idiom, with a wing still occupied by the Jodhpur royal family and another kept as a museum. The scale is the point: a 105-foot central dome, sandstone that was cut to interlock without mortar, and lawns you cross by buggy.",
    signature: "The underground zodiac pool, unchanged since the 1940s.",
    image: "jodhpur-blue-city-1",
    bestFor: ["Rajasthan extensions", "Architecture", "Anniversaries"],
  },
  {
    slug: "raas-jodhpur",
    name: "RAAS Jodhpur",
    city: "Jodhpur",
    tier: "heritage",
    oneLine: "Red sandstone courtyards directly beneath Mehrangarh Fort, inside the old city.",
    detail:
      "A restored 18th-century haveli reworked with contemporary rooms whose windows are framed, deliberately, on the fort above. It sits in the walled blue city, which means the walk to the Clock Tower market is a walk, not a drive.",
    signature: "Mehrangarh floodlit, from a lounger by the pool.",
    image: "jaipur-nahargarh-1",
    bestFor: ["Design-minded travellers", "Couples", "Photographers"],
  },
  {
    slug: "six-senses-fort-barwara",
    name: "Six Senses Fort Barwara",
    city: "Sawai Madhopur (Ranthambore)",
    tier: "heritage",
    oneLine: "A restored 14th-century fort, about an hour from Ranthambore's gates.",
    detail:
      "Opened in 2021 inside a fort whose oldest fabric dates to the 14th century, with two former palaces and a stepwell within the walls, converted over years of restoration. It is the comfortable way to do Ranthambore: a 6 AM safari, and a spa and a fort courtyard to come back to.",
    signature: "Coming back from a cold dawn safari into a walled fort.",
    image: "ranthambore-tiger-1",
    bestFor: ["Tiger safaris", "Six-day Golden Triangle circuits", "Families"],
  },
];

export const getStay = (slug: string) => stays.find((s) => s.slug === slug);
export const staysForCity = (city: string) => stays.filter((s) => s.city.toLowerCase().includes(city.toLowerCase()));
export const staysForDestination = (slug: string) => stays.filter((s) => s.destination === slug);

export const stayTierLabel: Record<Stay["tier"], string> = {
  palace: "Former royal residence",
  heritage: "Historic building",
  contemporary: "Modern luxury hotel",
  boutique: "Small owner-run property",
};
