/**
 * Named-entity registry for structured data.
 *
 * Search and AI answer engines resolve places by matching them to a knowledge-graph node, and the
 * most reliable way to tell them *which* "City Palace" or "Agra Fort" a page means is a `sameAs`
 * link to the canonical Wikipedia article (and the Wikidata item where we are certain of it).
 * Every destination page, attraction card, tour `about` and the Organization `knowsAbout` list
 * reads from this one map, so an entity is disambiguated the same way site-wide.
 *
 * Only add entries whose links you have opened: a wrong `sameAs` is worse than none.
 */

export interface Entity {
  /** Display name used in schema `name`. */
  name: string;
  /** Canonical English Wikipedia article. */
  wikipedia: string;
  /** Wikidata QID, only when verified. */
  wikidata?: string;
  /** Schema.org type for the node. */
  type: "City" | "TouristAttraction" | "LandmarksOrHistoricalBuildings" | "Country" | "State" | "Place";
  /** Weekly closure, where a monument has one (drives OpeningHoursSpecification). */
  closedOn?: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
}

const wp = (title: string) => `https://en.wikipedia.org/wiki/${title}`;
const wd = (q: string) => `https://www.wikidata.org/wiki/${q}`;

export const entities = {
  india: { name: "India", wikipedia: wp("India"), wikidata: wd("Q668"), type: "Country" },
  "uttar-pradesh": { name: "Uttar Pradesh", wikipedia: wp("Uttar_Pradesh"), type: "State" },
  rajasthan: { name: "Rajasthan", wikipedia: wp("Rajasthan"), type: "State" },
  "golden-triangle": { name: "Golden Triangle (India)", wikipedia: wp("Golden_Triangle_(India)"), type: "Place" },

  agra: { name: "Agra", wikipedia: wp("Agra"), wikidata: wd("Q42941"), type: "City" },
  delhi: { name: "Delhi", wikipedia: wp("Delhi"), wikidata: wd("Q1353"), type: "City" },
  jaipur: { name: "Jaipur", wikipedia: wp("Jaipur"), wikidata: wd("Q66485"), type: "City" },
  udaipur: { name: "Udaipur", wikipedia: wp("Udaipur"), type: "City" },
  jodhpur: { name: "Jodhpur", wikipedia: wp("Jodhpur"), type: "City" },
  ranthambore: { name: "Ranthambore National Park", wikipedia: wp("Ranthambore_National_Park"), type: "Place" },

  "taj-mahal": { name: "Taj Mahal", wikipedia: wp("Taj_Mahal"), wikidata: wd("Q9141"), type: "TouristAttraction", closedOn: "Friday" },
  "agra-fort": { name: "Agra Fort", wikipedia: wp("Agra_Fort"), type: "TouristAttraction" },
  "fatehpur-sikri": { name: "Fatehpur Sikri", wikipedia: wp("Fatehpur_Sikri"), type: "TouristAttraction" },
  "itimad-ud-daulah": { name: "Tomb of I'timād-ud-Daulah", wikipedia: wp("Tomb_of_I%27tim%C4%81d-ud-Daulah"), type: "TouristAttraction" },
  "mehtab-bagh": { name: "Mehtab Bagh", wikipedia: wp("Mehtab_Bagh"), type: "TouristAttraction" },
  sikandra: { name: "Tomb of Akbar the Great", wikipedia: wp("Tomb_of_Akbar_the_Great"), type: "TouristAttraction" },

  "red-fort": { name: "Red Fort", wikipedia: wp("Red_Fort"), type: "TouristAttraction", closedOn: "Monday" },
  "humayuns-tomb": { name: "Humayun's Tomb", wikipedia: wp("Humayun%27s_Tomb"), type: "TouristAttraction" },
  "qutub-minar": { name: "Qutb Minar", wikipedia: wp("Qutb_Minar"), type: "TouristAttraction" },
  "india-gate": { name: "India Gate", wikipedia: wp("India_Gate"), type: "TouristAttraction" },
  "jama-masjid": { name: "Jama Masjid, Delhi", wikipedia: wp("Jama_Masjid,_Delhi"), type: "TouristAttraction" },
  "chandni-chowk": { name: "Chandni Chowk", wikipedia: wp("Chandni_Chowk"), type: "Place" },
  "lotus-temple": { name: "Lotus Temple", wikipedia: wp("Lotus_Temple"), type: "TouristAttraction", closedOn: "Monday" },
  akshardham: { name: "Swaminarayan Akshardham (Delhi)", wikipedia: wp("Swaminarayan_Akshardham_(Delhi)"), type: "TouristAttraction", closedOn: "Monday" },

  "amber-fort": { name: "Amber Fort", wikipedia: wp("Amer_Fort"), type: "TouristAttraction" },
  "city-palace-jaipur": { name: "City Palace, Jaipur", wikipedia: wp("City_Palace,_Jaipur"), type: "TouristAttraction" },
  "hawa-mahal": { name: "Hawa Mahal", wikipedia: wp("Hawa_Mahal"), type: "TouristAttraction" },
  "jantar-mantar-jaipur": { name: "Jantar Mantar, Jaipur", wikipedia: wp("Jantar_Mantar,_Jaipur"), type: "TouristAttraction" },
  "nahargarh-fort": { name: "Nahargarh Fort", wikipedia: wp("Nahargarh_Fort"), type: "TouristAttraction" },
  "jal-mahal": { name: "Jal Mahal", wikipedia: wp("Jal_Mahal"), type: "TouristAttraction" },

  "city-palace-udaipur": { name: "City Palace, Udaipur", wikipedia: wp("City_Palace,_Udaipur"), type: "TouristAttraction" },
  "lake-pichola": { name: "Lake Pichola", wikipedia: wp("Lake_Pichola"), type: "Place" },
  "jag-mandir": { name: "Jag Mandir", wikipedia: wp("Jag_Mandir"), type: "TouristAttraction" },
  "monsoon-palace": { name: "Monsoon Palace", wikipedia: wp("Monsoon_Palace"), type: "TouristAttraction" },
  "saheliyon-ki-bari": { name: "Saheliyon-ki-Bari", wikipedia: wp("Saheliyon-ki-Bari"), type: "TouristAttraction" },
  "bagore-ki-haveli": { name: "Bagore Ki Haveli", wikipedia: wp("Bagore_Ki_Haveli"), type: "TouristAttraction" },
  "jagdish-temple": { name: "Jagdish Temple, Udaipur", wikipedia: wp("Jagdish_Temple,_Udaipur"), type: "TouristAttraction" },

  "gatimaan-express": { name: "Gatimaan Express", wikipedia: wp("Gatimaan_Express"), type: "Place" },
  "yamuna-expressway": { name: "Yamuna Expressway", wikipedia: wp("Yamuna_Expressway"), type: "Place" },
} as const satisfies Record<string, Entity>;

export type EntityKey = keyof typeof entities;

/** sameAs array for an entity: Wikipedia first, Wikidata when known. */
export const entitySameAs = (key: EntityKey): string[] => {
  const e: Entity = entities[key];
  return [e.wikipedia, ...(e.wikidata ? [e.wikidata] : [])];
};

/**
 * Best-effort match from a free-text attraction name (as written in destination content) to a
 * registry key. Matches on distinctive substrings so "Itimad-ud-Daulah (Baby Taj)" and "Amber Fort"
 * both resolve; returns undefined rather than guessing when nothing distinctive matches.
 */
const attractionAliases: [RegExp, EntityKey][] = [
  [/taj mahal/i, "taj-mahal"],
  [/agra fort/i, "agra-fort"],
  [/fatehpur/i, "fatehpur-sikri"],
  [/itimad|baby taj/i, "itimad-ud-daulah"],
  [/mehtab/i, "mehtab-bagh"],
  [/sikandra|akbar'?s tomb/i, "sikandra"],
  [/red fort|lal qila/i, "red-fort"],
  [/humayun/i, "humayuns-tomb"],
  [/qutub|qutb/i, "qutub-minar"],
  [/india gate/i, "india-gate"],
  [/jama masjid/i, "jama-masjid"],
  [/chandni/i, "chandni-chowk"],
  [/lotus temple/i, "lotus-temple"],
  [/akshardham/i, "akshardham"],
  [/amber|amer fort/i, "amber-fort"],
  [/hawa mahal/i, "hawa-mahal"],
  [/jantar mantar/i, "jantar-mantar-jaipur"],
  [/nahargarh/i, "nahargarh-fort"],
  [/jal mahal/i, "jal-mahal"],
  [/pichola/i, "lake-pichola"],
  [/jag mandir/i, "jag-mandir"],
  [/sajjangarh|monsoon palace/i, "monsoon-palace"],
  [/saheliyon/i, "saheliyon-ki-bari"],
  [/bagore/i, "bagore-ki-haveli"],
  [/jagdish/i, "jagdish-temple"],
];

export function entityForAttraction(name: string, citySlug?: string): EntityKey | undefined {
  // "City Palace" exists in both Jaipur and Udaipur; disambiguate by the page it appears on.
  if (/city palace/i.test(name)) return citySlug === "udaipur" ? "city-palace-udaipur" : citySlug === "jaipur" ? "city-palace-jaipur" : undefined;
  return attractionAliases.find(([re]) => re.test(name))?.[1];
}

/** Destination slug → entity key (identical today, kept explicit so a rename cannot break schema). */
export const destinationEntity: Record<string, EntityKey> = { agra: "agra", delhi: "delhi", jaipur: "jaipur", udaipur: "udaipur" };

/** What the business is an authority on — feeds Organization.knowsAbout. */
export const knowsAboutKeys: EntityKey[] = ["taj-mahal", "golden-triangle", "agra", "delhi", "jaipur", "udaipur", "jodhpur", "ranthambore", "agra-fort", "fatehpur-sikri", "amber-fort", "gatimaan-express"];
