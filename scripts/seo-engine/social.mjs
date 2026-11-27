/**
 * Social-content agent: turns recently published or updated guides into ready-to-post drafts for
 * each platform (Instagram, Pinterest, LinkedIn, X, Facebook, YouTube Short script), written by
 * Claude from the guide's own text so no fact can drift from the site.
 *
 * It WRITES DRAFTS ONLY — posting happens from the business's own accounts (manually, via Buffer,
 * or via the Orshot connection once accounts are linked). Automating engagement or posting through
 * unofficial means gets accounts banned; we don't do that.
 *
 * Usage: npx tsx scripts/seo-engine/social.mjs [--days 8] [--limit 5]
 * Needs ANTHROPIC_API_KEY (or an `ant auth login` profile).
 */
import fs from "node:fs";
import path from "node:path";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";
import { ROOT, guides } from "./context.mjs";

const args = process.argv.slice(2);
const DAYS = Number(args[args.indexOf("--days") + 1]) || 8;
const LIMIT = Number(args[args.indexOf("--limit") + 1]) || 5;
const today = new Date().toISOString().slice(0, 10);
const cutoff = new Date(Date.now() - DAYS * 86_400_000).toISOString().slice(0, 10);

const Drafts = z.strictObject({
  instagram: z.strictObject({ caption: z.string().describe("≤150 words, hook first line, line breaks, no link (goes in bio), end with a question"), hashtags: z.array(z.string()).describe("8-12, niche over generic") }),
  pinterest: z.strictObject({ title: z.string().describe("≤90 chars"), description: z.string().describe("≤450 chars, keyword-rich, ends with the link") }),
  linkedin: z.strictObject({ post: z.string().describe("≤120 words, practical angle for travel planners/expats, link on its own last line") }),
  x: z.strictObject({ post: z.string().describe("≤240 chars incl. link") }),
  facebook: z.strictObject({ post: z.string().describe("≤80 words + link") }),
  youtubeShort: z.strictObject({ title: z.string(), script: z.string().describe("30-second voiceover script, 5-7 short lines, fact-dense"), description: z.string().describe("2 lines + link") }),
});

const picks = guides
  .filter((g) => g.dateModified >= cutoff)
  .sort((a, b) => b.dateModified.localeCompare(a.dateModified))
  .slice(0, LIMIT);
if (!picks.length) {
  console.log(`No guides updated in the last ${DAYS} days; nothing to draft.`);
  process.exit(0);
}

const client = new Anthropic();
const outDir = path.join(ROOT, "data/social", today);
fs.mkdirSync(outDir, { recursive: true });

const RULES = `You write social drafts for TajPhotos (tajphotos.com), a private tour company in Agra, India.
Hard rules: every fact must come from the guide text given; never invent prices, ratings, reviews, years in business or follower-bait claims; no emojis walls (max 3 per post); no "link in bio" except Instagram; the tone is a knowledgeable local friend, not a brochure. The link for this guide is given below.`;

for (const g of picks) {
  const url = `https://tajphotos.com/guides/${g.slug}`;
  const body = JSON.stringify(g.body).slice(0, 12000);
  const res = await client.messages.parse({
    model: "claude-opus-5-5",
    max_tokens: 8000,
    output_config: { effort: "medium", format: zodOutputFormat(Drafts) },
    system: RULES,
    messages: [{ role: "user", content: `Guide title: ${g.title}\nSummary: ${g.summary}\nKey takeaways: ${g.keyTakeaways.join(" | ")}\nLink: ${url}\n\nGuide body (source of truth):\n${body}` }],
  });
  if (!res.parsed_output) { console.warn(`skip ${g.slug}: ${res.stop_reason}`); continue; }
  const d = res.parsed_output;
  const md = `# Social drafts — ${g.title}\nLink: ${url} · drafted ${today} · review before posting\n
## Instagram\n${d.instagram.caption}\n\n${d.instagram.hashtags.map((h) => (h.startsWith("#") ? h : `#${h}`)).join(" ")}\n
## Pinterest\n**${d.pinterest.title}**\n${d.pinterest.description}\n
## LinkedIn\n${d.linkedin.post}\n
## X\n${d.x.post}\n
## Facebook\n${d.facebook.post}\n
## YouTube Short\n**${d.youtubeShort.title}**\n${d.youtubeShort.script}\n\n${d.youtubeShort.description}\n`;
  fs.writeFileSync(path.join(outDir, `${g.slug}.md`), md);
  console.log(`✓ ${g.slug}`);
}
console.log(`Drafts in data/social/${today}/`);
