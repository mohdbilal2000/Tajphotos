import type { MetadataRoute } from "next";
import { tours, destinations, guides, latestContentDate } from "@/content";
import { getImage } from "@/content/images";
import { absoluteUrl } from "@/lib/utils";
import { publishes } from "@/lib/sections";

const img = (id: string) => absoluteUrl(getImage(id).src.src);

export default function sitemap(): MetadataRoute.Sitemap {
  const latest = latestContentDate();
  const statics: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: latest, changeFrequency: "weekly", priority: 1 },
    // Optional sections are listed only when this brand actually publishes them. Advertising a
    // section that 404s is worse than omitting it: the sitemap is how a crawler finds pages that
    // nothing links to, so this is the entry that would otherwise index four near-identical
    // copies of the shared content library across four domains.
    ...(publishes("tours") ? [{ url: absoluteUrl("/tours"), lastModified: latest, changeFrequency: "weekly" as const, priority: 0.9 }] : []),
    ...(publishes("destinations") ? [{ url: absoluteUrl("/destinations"), lastModified: latest, changeFrequency: "monthly" as const, priority: 0.8 }] : []),
    ...(publishes("guides") ? [{ url: absoluteUrl("/guides"), lastModified: latest, changeFrequency: "weekly" as const, priority: 0.8 }] : []),
    { url: absoluteUrl("/quote"), lastModified: latest, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/about"), lastModified: latest, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/contact"), lastModified: latest, changeFrequency: "yearly", priority: 0.6 },
    { url: absoluteUrl("/reviews"), lastModified: latest, changeFrequency: "weekly", priority: 0.6 },
    { url: absoluteUrl("/faq"), lastModified: latest, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/credits"), lastModified: latest, changeFrequency: "yearly", priority: 0.1 },
    { url: absoluteUrl("/privacy"), lastModified: latest, changeFrequency: "yearly", priority: 0.1 },
    { url: absoluteUrl("/terms"), lastModified: latest, changeFrequency: "yearly", priority: 0.1 },
  ];
  return [
    ...statics,
    ...(publishes("tours") ? tours : []).map((t) => ({ url: absoluteUrl(`/tours/${t.slug}`), lastModified: t.dateModified, changeFrequency: "monthly" as const, priority: 0.9, images: [img(t.heroImage), ...t.gallery.slice(0, 4).map(img)] })),
    ...(publishes("destinations") ? destinations : []).map((d) => ({ url: absoluteUrl(`/destinations/${d.slug}`), lastModified: d.dateModified, changeFrequency: "monthly" as const, priority: 0.8, images: [img(d.heroImage)] })),
    ...(publishes("guides") ? guides : []).map((g) => ({ url: absoluteUrl(`/guides/${g.slug}`), lastModified: g.dateModified, changeFrequency: "monthly" as const, priority: 0.7, images: [img(g.heroImage)] })),
  ];
}
