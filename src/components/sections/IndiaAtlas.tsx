import { destinations, guides, tours } from "@/content";
import { getImage } from "@/content/images";
import { site } from "@/config/site";
import { JsonLd } from "@/components/JsonLd";
import { AtlasClient, type AtlasStop, type AtlasRoute } from "./AtlasClient";

/**
 * Seven places we actually drive to, and the four routes our itineraries take between them. Every
 * distance and drive time below is copied from the matching tour's day-by-day itinerary, so the map
 * can never disagree with the tour page it links to. Coordinates are the standard city centres.
 */
const STOPS: Omit<AtlasStop, "tours" | "guides" | "image" | "alt">[] = [
  { key: "delhi", name: "Delhi", caption: "The capital", lat: 28.6139, lng: 77.209, imageId: "delhi-humayun-tomb-1", href: "/destinations/delhi", line: "Where nearly every trip lands. Mughal tombs, Old Delhi lanes and Lutyens' avenues — one day is enough to begin." },
  { key: "agra", name: "Agra", caption: "Home base", lat: 27.1767, lng: 78.0081, imageId: "taj-mahal-sunrise-1", href: "/destinations/agra", line: "Our town. The Taj Mahal at opening time, Agra Fort, Mehtab Bagh at dusk. Closed to visitors every Friday." },
  { key: "fatehpur-sikri", name: "Fatehpur Sikri", caption: "Akbar's lost capital", lat: 27.0945, lng: 77.6679, imageId: "agra-fatehpur-sikri-1", line: "Abandoned red-sandstone capital about 40 km west of Agra — the stop that turns the Agra–Jaipur drive into a sightseeing day." },
  { key: "jaipur", name: "Jaipur", caption: "The Pink City", lat: 26.9124, lng: 75.7873, imageId: "jaipur-hawa-mahal-1", href: "/destinations/jaipur", line: "Amber Fort by jeep, the City Palace, Jantar Mantar and Hawa Mahal — the third corner of the triangle." },
  { key: "ranthambore", name: "Ranthambore", caption: "Tiger country", lat: 26.0173, lng: 76.5026, imageId: "ranthambore-tiger-1", line: "Two jeep safaris in the national park. Open 1 October to 30 June; closed for the monsoon." },
  { key: "jodhpur", name: "Jodhpur", caption: "The Blue City", lat: 26.2389, lng: 73.0243, imageId: "jodhpur-blue-city-1", line: "Mehrangarh Fort above a blue old town, at the edge of the Thar." },
  { key: "udaipur", name: "Udaipur", caption: "City of lakes", lat: 24.5854, lng: 73.7125, imageId: "udaipur-lake-pichola-1", href: "/destinations/udaipur", line: "Lake Pichola, the City Palace and sunset from the water — best October to March." },
];

const ROUTES: AtlasRoute[] = [
  {
    key: "triangle", label: "Golden Triangle", tour: "golden-triangle-tour-4-days",
    path: ["delhi", "agra", "jaipur", "delhi"],
    legs: [
      { from: "Delhi", to: "Agra", info: "230–240 km · 3–4 h" },
      { from: "Agra", to: "Jaipur", info: "~240 km · 4–6 h" },
      { from: "Jaipur", to: "Delhi", info: "270–280 km · 3–5.5 h" },
    ],
  },
  {
    key: "tigers", label: "+ Ranthambore", tour: "golden-triangle-tour-6-days-with-ranthambore",
    path: ["delhi", "agra", "fatehpur-sikri", "ranthambore", "jaipur"],
    legs: [
      { from: "Delhi", to: "Agra", info: "230–240 km · 3–4 h" },
      { from: "Agra", to: "Ranthambore", info: "~280 km · ~6 h, via Fatehpur Sikri" },
      { from: "Ranthambore", to: "Jaipur", info: "~180 km · 3.5 h" },
    ],
  },
  {
    key: "lakes", label: "+ Udaipur", tour: "golden-triangle-tour-7-days-with-udaipur",
    path: ["delhi", "agra", "fatehpur-sikri", "jaipur", "udaipur"], flights: ["jaipur-udaipur"],
    legs: [
      { from: "Delhi", to: "Agra", info: "230–240 km · 3–4 h" },
      { from: "Agra", to: "Jaipur", info: "~240 km · 5–6 h, via Fatehpur Sikri" },
      { from: "Jaipur", to: "Udaipur", info: "Short flight" },
    ],
  },
  {
    key: "rajasthan", label: "Rajasthan", tour: "jaipur-jodhpur-udaipur-tour",
    path: ["jaipur", "jodhpur", "udaipur"],
    legs: [
      { from: "Jaipur", to: "Jodhpur", info: "~340 km · ~6 h, via Ajmer" },
      { from: "Jodhpur", to: "Udaipur", info: "~275 km · ~6 h, via Ranakpur" },
    ],
  },
];

export function IndiaAtlas() {
  const stops: AtlasStop[] = STOPS.map((s) => {
    const img = getImage(s.imageId);
    const re = new RegExp(s.name.split(" ")[0], "i");
    return {
      ...s,
      image: img.src,
      alt: img.alt,
      tours: tours
        .filter((t) => t.destinations.includes(s.key) || t.slug.includes(s.key))
        .slice(0, 3)
        .map((t) => ({ slug: t.slug, title: t.shortTitle ?? t.title, meta: t.durationLabel })),
      guides: guides
        .filter((g) => re.test(g.title) || g.slug.includes(s.key) || (s.key === "agra" && /taj/i.test(g.title)))
        .slice(0, 3)
        .map((g) => ({ slug: g.slug, title: g.title })),
    };
  });
  const routes = ROUTES.map((r) => {
    const t = tours.find((x) => x.slug === r.tour);
    return { ...r, days: t?.durationLabel ?? "" };
  });
  const known = new Set(destinations.map((d) => d.slug));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Places on TajPhotos private tours in North India",
          itemListElement: stops.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "TouristDestination",
              name: s.name,
              description: s.line,
              geo: { "@type": "GeoCoordinates", latitude: s.lat, longitude: s.lng },
              ...(s.href && known.has(s.key) ? { url: `${site.url}${s.href}` } : {}),
            },
          })),
        }}
      />
      <AtlasClient stops={stops} routes={routes} />
    </>
  );
}
