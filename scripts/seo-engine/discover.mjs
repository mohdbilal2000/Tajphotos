/**
 * Keyword discovery, free: expands seed topics through Google's public autocomplete (what people
 * actually type, India + global), drops anything the site already answers, scores the rest for
 * intent, and merges them into data/seo/keywords.json (status: "queued").
 *
 * Usage: npx tsx scripts/seo-engine/discover.mjs
 * Optional: add rows exported from Search Console to data/seo/gsc-queries.txt (one query per line);
 * they are treated as the strongest seeds because the site already shows for them.
 */
import fs from "node:fs";
import path from "node:path";
import { ROOT, coverage, readQueue, writeQueue, tokens, jaccard } from "./context.mjs";

const SEEDS = [
  "taj mahal", "taj mahal tour", "taj mahal sunrise", "taj mahal photography", "taj mahal photoshoot",
  "taj mahal tickets", "taj mahal timings", "taj mahal night", "taj mahal guide", "taj mahal from delhi",
  "agra tour", "agra itinerary", "agra fort", "things to do in agra", "agra hotels", "agra food",
  "mehtab bagh", "fatehpur sikri", "delhi to agra", "delhi tour", "old delhi", "red fort",
  "jaipur tour", "jaipur itinerary", "amber fort", "hawa mahal", "jaipur photography",
  "udaipur tour", "udaipur itinerary", "lake pichola", "jodhpur", "ranthambore safari",
  "golden triangle tour", "golden triangle itinerary", "golden triangle india cost", "india travel tips",
  "india photography tour", "pre wedding shoot taj mahal", "india private driver", "rajasthan itinerary",
];
const PREFIXES = ["", "how to ", "is ", "best ", "what ", "can you "];
const MARKETS = [{ hl: "en", gl: "in" }, { hl: "en", gl: "us" }, { hl: "en", gl: "gb" }];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function suggest(q, { hl, gl }) {
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&hl=${hl}&gl=${gl}&q=${encodeURIComponent(q)}`;
  try {
    const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0 (tajphotos keyword research)" } });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data?.[1]) ? data[1] : [];
  } catch {
    return [];
  }
}

/** Rough intent score: questions and commercial terms are what a tour operator can win and convert. */
function score(q, fromGsc) {
  const t = tokens(q);
  let s = 0;
  if (/^(how|is|what|can|when|where|which|why|do|does|should)\b/.test(q)) s += 2;
  if (/\b(tour|trip|itinerary|guide|private|book|booking|cost|price|ticket|tickets|photoshoot|photographer|package|driver|day trip)\b/.test(q)) s += 2;
  if (/\b(taj|agra|delhi|jaipur|udaipur|jodhpur|ranthambore|golden triangle|rajasthan|fatehpur|mehtab)\b/.test(q)) s += 1;
  if (t.length >= 3 && t.length <= 8) s += 1;
  if (/\b(wiki|history of|essay|drawing|png|wallpaper|images|photo hd|song|movie|quiz|model|lego)\b/.test(q)) s -= 5;
  if (fromGsc) s += 3;
  return s;
}

const gscPath = path.join(ROOT, "data/seo/gsc-queries.txt");
const gsc = fs.existsSync(gscPath) ? fs.readFileSync(gscPath, "utf8").split("\n").map((l) => l.trim().toLowerCase()).filter(Boolean) : [];

const found = new Map(gsc.map((q) => [q, { fromGsc: true }]));
for (const seed of SEEDS) {
  for (const p of PREFIXES) {
    for (const m of MARKETS) {
      for (const s of await suggest(p + seed, m)) {
        const q = s.toLowerCase().trim();
        if (!found.has(q)) found.set(q, { fromGsc: false });
      }
      await sleep(120);
    }
  }
}
if (!gsc.length && found.size === 0) {
  console.error("No suggestions returned (network blocked?). Nothing changed.");
  process.exit(1);
}

const queue = readQueue();
const known = new Set(queue.keywords.map((k) => k.query));
let added = 0;
for (const [q, meta] of found) {
  if (known.has(q)) continue;
  const cov = coverage(q);
  if (cov.score >= 0.5) continue; // already answered by an existing guide
  const sc = score(q, meta.fromGsc);
  if (sc < 3) continue;
  // collapse near-duplicates of something already queued
  if (queue.keywords.some((k) => jaccard(tokens(k.query), tokens(q)) >= 0.6)) continue;
  queue.keywords.push({ query: q, score: sc, nearest: cov.slug, status: "queued", found: new Date().toISOString().slice(0, 10) });
  added++;
}
queue.keywords.sort((a, b) => (a.status === b.status ? b.score - a.score : a.status === "queued" ? -1 : 1));
writeQueue(queue);
console.log(`Suggestions seen: ${found.size}. New keywords queued: ${added}. Queue size: ${queue.keywords.filter((k) => k.status === "queued").length}.`);
