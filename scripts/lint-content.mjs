/**
 * Deterministic content integrity checks (no LLM needed): every relatedTours/relatedGuides slug
 * resolves, every image id referenced exists, every FAQ has both q and a, and a few sanity checks.
 * Run after any content change: node scripts/lint-content.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { tours } from "../src/content/tours/index.ts";
import { destinations } from "../src/content/destinations/index.ts";
import { guides } from "../src/content/guides/index.ts";

const tourSlugs = new Set(tours.map((t) => t.slug));
const guideSlugs = new Set(guides.map((g) => g.slug));
const destSlugs = new Set(destinations.map((d) => d.slug));
// Read image ids from the asset directory rather than importing content/images.ts, since that
// file statically imports .jpg files — a Next.js-specific asset loader tsx/Node can't resolve.
const imageIds = new Set(
  fs.readdirSync(path.resolve(import.meta.dirname, "../src/assets/images")).map((f) => f.replace(/\.[^.]+$/, "")),
);

const errors = [];
const warn = (msg) => errors.push(msg);

function checkFaqs(faqs, label) {
  for (const f of faqs ?? []) {
    if (!f.q?.trim() || !f.a?.trim()) warn(`${label}: empty FAQ q/a`);
    if (f.a && f.a.split(/\s+/).length > 130) warn(`${label}: FAQ answer over 130 words ("${f.q}")`);
  }
}
function checkImageRefs(ids, label) {
  for (const id of ids ?? []) {
    if (!imageIds.has(id)) warn(`${label}: unknown image id "${id}"`);
  }
}
function checkBlocksImages(blocks, label) {
  for (const b of blocks ?? []) {
    if (b.type === "image" && !imageIds.has(b.image)) warn(`${label}: unknown image id in block "${b.image}"`);
  }
}

for (const t of tours) {
  const label = `tour/${t.slug}`;
  checkImageRefs([t.heroImage, ...t.gallery], label);
  checkBlocksImages(t.description, label);
  checkFaqs(t.faqs, label);
  for (const s of t.relatedTours ?? []) if (!tourSlugs.has(s)) warn(`${label}: relatedTours -> unknown tour "${s}"`);
  for (const s of t.relatedGuides ?? []) if (!guideSlugs.has(s)) warn(`${label}: relatedGuides -> unknown guide "${s}"`);
  for (const s of t.destinations ?? []) if (!destSlugs.has(s)) warn(`${label}: destinations -> unknown destination "${s}"`);
  if (!t.title || t.title.length > 70) warn(`${label}: title missing or over 70 chars (${t.title?.length})`);
  if (!t.summary || t.summary.length > 165) warn(`${label}: summary missing or over 165 chars (${t.summary?.length})`);
  if (t.itinerary?.some((d) => !d.title || !d.summary)) warn(`${label}: itinerary day missing title/summary`);
}
for (const d of destinations) {
  const label = `destination/${d.slug}`;
  checkImageRefs([d.heroImage, ...d.gallery], label);
  checkBlocksImages(d.intro, label);
  checkBlocksImages(d.bestTime, label);
  checkBlocksImages(d.gettingThere, label);
  checkFaqs(d.faqs, label);
  for (const s of d.relatedTours ?? []) if (!tourSlugs.has(s)) warn(`${label}: relatedTours -> unknown tour "${s}"`);
  for (const s of d.relatedGuides ?? []) if (!guideSlugs.has(s)) warn(`${label}: relatedGuides -> unknown guide "${s}"`);
}
for (const g of guides) {
  const label = `guide/${g.slug}`;
  checkImageRefs([g.heroImage], label);
  checkBlocksImages(g.body, label);
  checkFaqs(g.faqs, label);
  for (const s of g.relatedTours ?? []) if (!tourSlugs.has(s)) warn(`${label}: relatedTours -> unknown tour "${s}"`);
  for (const s of g.relatedGuides ?? []) if (!guideSlugs.has(s)) warn(`${label}: relatedGuides -> unknown guide "${s}"`);
  if (!g.title || g.title.length > 70) warn(`${label}: title missing or over 70 chars (${g.title?.length})`);
  if (!g.summary || g.summary.length > 165) warn(`${label}: summary missing or over 165 chars (${g.summary?.length})`);
}

console.log(`Checked ${tours.length} tours, ${destinations.length} destinations, ${guides.length} guides, ${imageIds.size} images.`);
if (errors.length) {
  console.log(`\n${errors.length} issue(s):`);
  errors.forEach((e) => console.log(" -", e));
  process.exit(1);
} else {
  console.log("No issues found.");
}
