import { site } from "@/config/site";
import { guides, getTeamMember } from "@/content";
import { absoluteUrl } from "@/lib/utils";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** RSS 2.0 feed of travel guides (helps discovery by aggregators, Feedly, and some AI crawlers). */
export function GET() {
  const items = [...guides]
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished))
    .map(
      (g) => `<item><title>${esc(g.title)}</title><link>${absoluteUrl(`/guides/${g.slug}`)}</link><guid isPermaLink="true">${absoluteUrl(`/guides/${g.slug}`)}</guid><pubDate>${new Date(g.datePublished).toUTCString()}</pubDate><dc:creator>${esc(getTeamMember(g.author).name)}</dc:creator><category>${esc(g.category)}</category><description>${esc(g.summary)}</description></item>`,
    )
    .join("");
  const lastBuild = guides.map((g) => g.dateModified).sort().at(-1);
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/"><channel><title>${esc(site.name)} — Travel guides</title><link>${site.url}</link><description>${esc(site.description)}</description><language>en</language>${lastBuild ? `<lastBuildDate>${new Date(lastBuild).toUTCString()}</lastBuildDate>` : ""}<atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml"/>${items}</channel></rss>`;
  return new Response(xml, { headers: { "content-type": "application/rss+xml; charset=utf-8", "cache-control": "public, max-age=3600, s-maxage=86400" } });
}
