import type { MetadataRoute } from "next";
import { tours, destinations, guides, latestContentDate } from "@/content";
import { getImage } from "@/content/images";
import { absoluteUrl } from "@/lib/utils";

const img = (id: string) => absoluteUrl(getImage(id).src.src);

export default function sitemap(): MetadataRoute.Sitemap {
  const latest = latestContentDate();
  const statics: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: latest, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/tours"), lastModified: latest, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/stays"), lastModified: latest, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/services"), lastModified: latest, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/destinations"), lastModified: latest, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/guides"), lastModified: latest, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/plan-my-trip"), lastModified: latest, changeFrequency: "monthly", priority: 0.9 },
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
    ...tours.map((t) => ({ url: absoluteUrl(`/tours/${t.slug}`), lastModified: t.dateModified, changeFrequency: "monthly" as const, priority: 0.9, images: [img(t.heroImage), ...t.gallery.slice(0, 4).map(img)] })),
    ...destinations.map((d) => ({ url: absoluteUrl(`/destinations/${d.slug}`), lastModified: d.dateModified, changeFrequency: "monthly" as const, priority: 0.8, images: [img(d.heroImage)] })),
    ...guides.map((g) => ({ url: absoluteUrl(`/guides/${g.slug}`), lastModified: g.dateModified, changeFrequency: "monthly" as const, priority: 0.7, images: [img(g.heroImage)] })),
  ];
}
