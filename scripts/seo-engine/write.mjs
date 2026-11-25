/**
 * Turns the top queued keywords into draft guides in the site's own format.
 *
 * For each keyword:
 *   1. research: Claude searches the web (official sources first) and returns dated, cited notes;
 *   2. write: Claude writes the guide as structured JSON against a strict schema, given the notes,
 *      the site's facts file and the exact list of tours/guides/images it may link to;
 *   3. validate: every internal link, image id, related slug, length rule and banned claim is
 *      checked here, in code. A draft that fails is dropped, never "fixed up" silently;
 *   4. write src/content/guides/<slug>.ts and mark the keyword "drafted".
 *
 * Drafts reach the live site only when a person merges the pull request the workflow opens —
 * Google's scaled-content policy punishes unreviewed bulk AI pages, and this business sells trust.
 *
 * Usage: npx tsx scripts/seo-engine/write.mjs --count 7 [--dry]
 * Needs ANTHROPIC_API_KEY (or an `ant auth login` profile) unless --dry.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";
import { ROOT, tours, guides, destinations, imageIds, factsSource, readQueue, writeQueue, slugify } from "./context.mjs";

const args = process.argv.slice(2);
const COUNT = Number(args[args.indexOf("--count") + 1]) || 7;
const DRY = args.includes("--dry");
const MODEL = "claude-opus-5-5";
const today = new Date().toISOString().slice(0, 10);

/* ----------------------------------------------------------------- schema -- */

const Block = z.strictObject({
  type: z.enum(["p", "h2", "h3", "ul", "ol", "table", "callout", "cta"]),
  text: z.string().nullable().describe("p, h2, h3, callout body, cta text"),
  items: z.array(z.string()).nullable().describe("ul / ol items"),
  headers: z.array(z.string()).nullable().describe("table headers"),
  rows: z.array(z.array(z.string())).nullable().describe("table rows"),
  variant: z.enum(["tip", "info", "warning"]).nullable().describe("callout only"),
  title: z.string().nullable().describe("callout or cta title"),
  tour: z.string().nullable().describe("cta only: a tour slug from the list"),
});
const Draft = z.strictObject({
  slug: z.string(),
  title: z.string().describe("H1, 35–60 characters, contains the primary keyword"),
  summary: z.string().describe("meta description, 130–155 characters, answer-first"),
  category: z.enum(["planning", "taj-mahal", "agra", "delhi", "jaipur", "udaipur", "rajasthan", "photography", "practical"]),
  heroImage: z.string(),
  keyTakeaways: z.array(z.string()).describe("3–5 quotable facts"),
  body: z.array(Block),
  faqs: z.array(z.strictObject({ q: z.string(), a: z.string() })).describe("4–6, answer-first, 40–90 words each"),
  relatedTours: z.array(z.string()),
  relatedGuides: z.array(z.string()),
  keywords: z.array(z.string()).describe("6–10, primary keyword first"),
  sources: z.array(z.strictObject({ title: z.string(), url: z.string() })).describe("official or authoritative pages actually used"),
});

/* ------------------------------------------------------------- the brief -- */

const SITE_BRIEF = `TajPhotos (tajphotos.com) is a new (2026) private-travel company in Agra, India: Taj Mahal and Golden Triangle tours with Government-licensed guides and Government-authorised photographers. WhatsApp +91 89097 41833.

House rules — breaking any of them gets the draft rejected:
- Never invent: no ratings, reviews, traveller counts, years in business, awards, partnerships or quotes from customers.
- Our own prices: only the "from" price stated in the tour list below, and only for that tour.
- Third-party facts (tickets, timings, closures, train times, safari rules): use the facts file first; anything else must come from the research notes and be hedged ("as of 2026", "check the official site") with the official source in \`sources\`.
- Never tell readers to bribe, skip queues illegally, fly drones at monuments or use tripods inside the Taj Mahal.
- Write for travellers, not search engines: concrete times, distances, costs, what to skip, what goes wrong. No filler ("nestled", "boasts", "a testament to", "in conclusion", "whether you're").
- Structure: first paragraph answers the title question directly in 40–60 words. Question-style H2s. At least one table where a comparison or timing helps. One callout. Exactly one cta block near the end pointing at the most relevant tour.
- Internal links in Markdown: [text](/tours/slug), [text](/guides/slug), [text](/destinations/slug), only slugs from the lists. 4–8 of them, where genuinely useful.
- Inline markup: **bold**, *italic*, [text](/path). No HTML.
- Use consistent entity names: "Taj Mahal", "Agra Fort", "Amber Fort (Amer Fort)", "Golden Triangle".
- 1,100–1,800 words of body text.`;

const lists = () => ({
  tours: tours.map((t) => `${t.slug} — ${t.title} — from USD ${t.priceFrom.usd} — ${t.durationLabel}`).join("\n"),
  guides: guides.map((g) => `${g.slug} — ${g.title}`).join("\n"),
  destinations: destinations.map((d) => d.slug).join(", "),
  images: imageIds.join(", "),
});

/* ------------------------------------------------------------ validation -- */

export function validate(d, slug) {
  const errs = [];
  const tourSet = new Set(tours.map((t) => t.slug));
  const guideSet = new Set([...guides.map((g) => g.slug), slug]);
  const destSet = new Set(destinations.map((x) => x.slug));
  if (d.title.length > 65 || d.title.length < 25) errs.push(`title length ${d.title.length}`);
  if (d.summary.length < 110 || d.summary.length > 165) errs.push(`summary length ${d.summary.length}`);
  if (!imageIds.includes(d.heroImage)) errs.push(`unknown heroImage ${d.heroImage}`);
  for (const s of d.relatedTours) if (!tourSet.has(s)) errs.push(`unknown related tour ${s}`);
  for (const s of d.relatedGuides) if (!guideSet.has(s)) errs.push(`unknown related guide ${s}`);
  if (d.faqs.length < 3) errs.push("too few FAQs");
  const text = JSON.stringify(d);
  for (const [, kind, s] of text.matchAll(/\]\(\/(tours|guides|destinations)\/([a-z0-9-]+)\)/g)) {
    const ok = kind === "tours" ? tourSet.has(s) : kind === "guides" ? guideSet.has(s) : destSet.has(s);
    if (!ok) errs.push(`broken link /${kind}/${s}`);
  }
  if (/\b(\d(\.\d)?\s*(stars?|★)|reviews? from|travell?ers? (served|hosted)|since (19|20)\d\d|years of experience|award)/i.test(text)) errs.push("possible invented claim");
  if (/(nestled|boasts|testament to|in conclusion|whether you're)/i.test(text)) errs.push("filler phrasing");
  const ctas = d.body.filter((b) => b.type === "cta");
  if (ctas.length !== 1 || !tourSet.has(ctas[0].tour ?? "")) errs.push("needs exactly one cta with a valid tour");
  const words = d.body.map((b) => [b.text, ...(b.items ?? []), ...(b.rows ?? []).flat()].join(" ")).join(" ").split(/\s+/).length;
  if (words < 900) errs.push(`body too short (${words} words)`);
  return errs;
}

/** Schema blocks → the site's typed Block union (drop the nulls). */
function toBlocks(body) {
  return body.map((b) => {
    switch (b.type) {
      case "p": case "h2": case "h3": return { type: b.type, text: b.text ?? "" };
      case "ul": case "ol": return { type: b.type, items: b.items ?? [] };
      case "table": return { type: "table", headers: b.headers ?? [], rows: b.rows ?? [] };
      case "callout": return { type: "callout", variant: b.variant ?? "tip", ...(b.title ? { title: b.title } : {}), text: b.text ?? "" };
      case "cta": return { type: "cta", title: b.title ?? "Plan it with us", ...(b.text ? { text: b.text } : {}), tour: b.tour };
    }
  });
}

export function toFile(d, slug) {
  const guide = {
    slug,
    title: d.title,
    summary: d.summary,
    category: d.category,
    heroImage: d.heroImage,
    author: "tajphotos-team",
    datePublished: today,
    dateModified: today,
    keyTakeaways: d.keyTakeaways,
    body: toBlocks(d.body),
    faqs: d.faqs,
    relatedTours: d.relatedTours,
    relatedGuides: d.relatedGuides.filter((s) => s !== slug),
    keywords: d.keywords,
    sources: d.sources,
  };
  return `// Drafted by scripts/seo-engine on ${today}. Review facts before merging.\nimport type { Guide } from "@/content/types";\n\nconst guide: Guide = ${JSON.stringify(guide, null, 2)};\n\nexport default guide;\n`;
}

/* ------------------------------------------------------------------ calls -- */

const isMain = import.meta.url === pathToFileURL(process.argv[1] ?? "").href;
const client = DRY || !isMain ? null : new Anthropic();

function textOf(content) {
  return content.filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
}

async function research(keyword) {
  const messages = [{
    role: "user",
    content: `Research the search query "${keyword}" for a travel guide written in ${today.slice(0, 4)}.
Use web search. Prefer official sources: tajmahal.gov.in, asi.nic.in, irctc.co.in, tourism.rajasthan.gov.in, uptourism.gov.in, forest.rajasthan.gov.in, indianvisaonline.gov.in.
Return concise notes: every fact with its source URL and the date the source shows, current ticket prices, timings, closures, rules, and what real travellers ask (forums, People Also Ask). Flag anything the sources disagree on. No prose intro.`,
  }];
  // pause_turn: the server paused a long search turn; send the turn back to let it continue.
  for (let i = 0; i < 4; i++) {
    const res = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 16000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "medium" },
      tools: [{ type: "web_search_20260209", name: "web_search", max_uses: 8 }],
      messages,
    });
    if (res.stop_reason === "refusal") throw new Error("research refused");
    if (res.stop_reason !== "pause_turn") return textOf(res.content);
    messages.push({ role: "assistant", content: res.content });
  }
  throw new Error("research did not finish");
}

async function draft(keyword, notes, slug) {
  const L = lists();
  const res = await client.messages.parse({
    model: MODEL,
    max_tokens: 32000,
    output_config: { effort: "high", format: zodOutputFormat(Draft) },
    system: [{ type: "text", text: `${SITE_BRIEF}\n\nFACTS FILE (authoritative):\n${factsSource}\n\nTOURS (slug — title — from price — duration):\n${L.tours}\n\nEXISTING GUIDES (slug — title):\n${L.guides}\n\nDESTINATIONS: ${L.destinations}\n\nIMAGE IDS: ${L.images}`, cache_control: { type: "ephemeral" } }],
    messages: [{
      role: "user",
      content: `Write the guide for the search query: "${keyword}". Use slug "${slug}".\n\nRESEARCH NOTES (dated, with sources):\n${notes}`,
    }],
  });
  if (res.stop_reason === "refusal") throw new Error("draft refused");
  if (!res.parsed_output) throw new Error(`no parsed output (stop: ${res.stop_reason})`);
  return res.parsed_output;
}

/* ------------------------------------------------------------------- main -- */

if (isMain) await main();

async function main() {
const queue = readQueue();
const picks = queue.keywords.filter((k) => k.status === "queued").slice(0, COUNT);
if (!picks.length) {
  console.log("Queue is empty: run discover.mjs first.");
  return;
}

const report = [];
for (const k of picks) {
  const slug = slugify(k.query);
  const file = path.join(ROOT, "src/content/guides", `${slug}.ts`);
  if (fs.existsSync(file)) { k.status = "exists"; continue; }
  if (DRY) { console.log(`[dry] would draft "${k.query}" → ${slug}`); continue; }
  try {
    const notes = await research(k.query);
    let d = await draft(k.query, notes, slug);
    let errs = validate(d, slug);
    if (errs.length) {
      // one corrective pass, with the exact problems listed
      console.warn(`"${k.query}": retrying after ${errs.join("; ")}`);
      d = await draft(k.query, `${notes}\n\nYOUR PREVIOUS DRAFT WAS REJECTED FOR: ${errs.join("; ")}. Fix all of them.`, slug);
      errs = validate(d, slug);
    }
    if (errs.length) { k.status = "rejected"; k.reason = errs.join("; "); report.push(`- ✗ ${k.query}: ${k.reason}`); continue; }
    fs.writeFileSync(file, toFile(d, slug));
    k.status = "drafted"; k.slug = slug; k.drafted = today;
    report.push(`- ✓ [${d.title}](/guides/${slug}) — query "${k.query}"`);
  } catch (e) {
    k.status = "error"; k.reason = String(e.message ?? e);
    report.push(`- ✗ ${k.query}: ${k.reason}`);
  }
  writeQueue(queue);
}
if (!DRY) writeQueue(queue);
fs.writeFileSync(path.join(ROOT, "data/seo/last-run.md"), `# SEO engine run ${today}\n\n${report.join("\n") || "Nothing drafted."}\n`);
console.log(report.join("\n") || "Nothing drafted.");
}
