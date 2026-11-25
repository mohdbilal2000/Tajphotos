/**
 * Shared site context for the SEO engine: what already exists (so nothing is duplicated and every
 * internal link resolves) and the facts file every article must agree with.
 * Imports the TypeScript content directly, so run these scripts with `tsx`.
 */
import fs from "node:fs";
import path from "node:path";
import { tours } from "../../src/content/tours/index.ts";
import { destinations } from "../../src/content/destinations/index.ts";
import { guides } from "../../src/content/guides/index.ts";

export const ROOT = path.resolve(import.meta.dirname, "../..");
export const QUEUE = path.join(ROOT, "data/seo/keywords.json");

export { tours, destinations, guides };

export const imageIds = fs
  .readdirSync(path.join(ROOT, "src/assets/images"))
  .map((f) => f.replace(/\.[^.]+$/, ""))
  .sort();

export const factsSource = fs.readFileSync(path.join(ROOT, "src/content/facts.ts"), "utf8");

export const STOP = new Set("a an the to of in on for and or is are was be at by with from vs it its can do does how what when where which who why best near me i my our your this that".split(" "));
export const tokens = (s) => s.toLowerCase().replace(/[^a-z0-9 ]+/g, " ").split(/\s+/).filter((w) => w && !STOP.has(w));

export function jaccard(a, b) {
  const A = new Set(a), B = new Set(b);
  const inter = [...A].filter((x) => B.has(x)).length;
  return inter / (A.size + B.size - inter || 1);
}

/** Token sets that represent what the site already answers, one per guide. */
export const covered = guides.map((g) => ({ slug: g.slug, sets: [g.title, ...g.keywords].map(tokens) }));

export function coverage(query) {
  const t = tokens(query);
  let best = { slug: null, score: 0 };
  for (const c of covered) for (const s of c.sets) {
    const j = jaccard(t, s);
    if (j > best.score) best = { slug: c.slug, score: j };
  }
  return best;
}

export function readQueue() {
  try { return JSON.parse(fs.readFileSync(QUEUE, "utf8")); } catch { return { updated: null, keywords: [] }; }
}
export function writeQueue(q) {
  fs.mkdirSync(path.dirname(QUEUE), { recursive: true });
  fs.writeFileSync(QUEUE, JSON.stringify({ ...q, updated: new Date().toISOString().slice(0, 10) }, null, 2) + "\n");
}

export const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 70);
