import { site } from "@/config/site";
import { tours, destinations, guides } from "@/content";
import { absoluteUrl } from "@/lib/utils";
import { stripInline } from "@/lib/seo";
import type { Block, FAQ } from "@/content/types";

function blocksToText(blocks: Block[]): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case "p": return stripInline(b.text);
        case "h2": return `\n## ${b.text}`;
        case "h3": return `\n### ${b.text}`;
        case "ul": return b.items.map((i) => `- ${stripInline(i)}`).join("\n");
        case "ol": return b.items.map((i, n) => `${n + 1}. ${stripInline(i)}`).join("\n");
        case "table": return [b.headers.join(" | "), b.headers.map(() => "---").join(" | "), ...b.rows.map((r) => r.map(stripInline).join(" | "))].join("\n");
        case "callout": return `${b.title ?? b.variant.toUpperCase()}: ${stripInline(b.text)}`;
        case "quote": return `> ${stripInline(b.text)}${b.by ? ` — ${b.by}` : ""}`;
        case "faq": return faqsToText(b.items);
        default: return "";
      }
    })
    .filter(Boolean)
    .join("\n\n");
}
const faqsToText = (faqs: FAQ[]) => faqs.map((f) => `Q: ${f.q}\nA: ${stripInline(f.a)}`).join("\n\n");

export function GET() {
  const out: string[] = [
    `# ${site.name} — full site content`,
    "",
    site.description,
    "",
    `Structured tour data (price, duration, group size, destinations) is also available as JSON at ${absoluteUrl("/tours.json")}.`,
    "",
  ];
  for (const t of tours) {
    out.push(`---`, `# ${t.title}`, `URL: ${absoluteUrl(`/tours/${t.slug}`)}`, `Duration: ${t.durationLabel} · Starts: ${t.startCity} · Ends: ${t.endCity}`, `Price: from USD ${t.priceFrom.usd} ${t.priceNote}`, "", t.summary, "", "## Highlights", ...t.highlights.map((h) => `- ${h}`), "", blocksToText(t.description), "", "## Itinerary", ...t.itinerary.map((d) => `Day ${d.day}: ${d.title} — ${stripInline(d.summary)}\n${d.details.map((x) => `  - ${stripInline(x)}`).join("\n")}`), "", "## Inclusions", ...t.inclusions.map((x) => `- ${x}`), "## Exclusions", ...t.exclusions.map((x) => `- ${x}`), "", "## FAQ", faqsToText(t.faqs), "");
  }
  for (const d of destinations) {
    out.push(`---`, `# ${d.title}`, `URL: ${absoluteUrl(`/destinations/${d.slug}`)}`, "", d.summary, "", ...d.quickFacts.map((q) => `${q.label}: ${stripInline(q.value)}`), "", blocksToText(d.intro), "", "## Top attractions", ...d.attractions.map((a) => `- ${a.name}: ${stripInline(a.summary)}${a.timings ? ` Timings: ${a.timings}.` : ""}${a.tickets ? ` Tickets: ${a.tickets}.` : ""}`), "", "## Best time to visit", blocksToText(d.bestTime), "", "## Getting there", blocksToText(d.gettingThere), "", "## FAQ", faqsToText(d.faqs), "");
  }
  for (const g of guides) {
    out.push(`---`, `# ${g.title}`, `URL: ${absoluteUrl(`/guides/${g.slug}`)}`, `Updated: ${g.dateModified}`, "", g.summary, "", "Key takeaways:", ...g.keyTakeaways.map((k) => `- ${stripInline(k)}`), "", blocksToText(g.body), "", "## FAQ", faqsToText(g.faqs), "");
  }
  return new Response(out.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600, s-maxage=86400" } });
}
