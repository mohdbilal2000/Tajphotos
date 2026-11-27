import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";
import { sunTable } from "@/lib/astro";

// The build year, baked in at compile time; the weekly SEO-engine rebuild keeps it current.
const YEAR = new Date().getFullYear();

export const metadata: Metadata = buildMetadata({
  title: `Taj Mahal Sunrise Time ${YEAR}: Gates & Golden Hour`,
  description: `Exact sunrise, gate-opening and golden-hour times at the Taj Mahal for every month of ${YEAR}, computed for the monument's coordinates. Gates open 30 minutes before sunrise.`,
  path: "/tools/taj-mahal-sunrise-time",
});

export default function SunrisePage() {
  const table = sunTable(YEAR);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebApplication", name: "Taj Mahal sunrise time calculator", applicationCategory: "TravelApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: 0, priceCurrency: "USD" }, url: absoluteUrl("/tools/taj-mahal-sunrise-time") }} />
      <PageHeader
        image="taj-mahal-sunrise-1"
        crumbs={[{ name: "Tools", path: "/tools" }, { name: "Sunrise time", path: "/tools/taj-mahal-sunrise-time" }]}
        eyebrow={`Updated for ${YEAR}`}
        title="What time is sunrise at the Taj Mahal?"
        text="Computed for the mausoleum's own coordinates (27.1751°N, 78.0421°E), in Indian Standard Time. The entry gates open 30 minutes before sunrise, and the best light is over within the first hour."
      />
      <Section>
        <div className="speakable max-w-3xl text-lg leading-relaxed text-ink/85">
          <p>
            Sunrise at the Taj Mahal ranges from about 05:30 in June to about 07:10 in January. Gates open
            30 minutes earlier, so arrive at the ticket queue around 45 minutes before the sunrise time below;
            the soft pink light on the marble lasts only until the golden hour ends.
          </p>
        </div>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <caption className="sr-only">Sunrise, gate and golden hour times at the Taj Mahal, {YEAR}</caption>
            <thead>
              <tr className="border-b border-ink/20 text-left text-label uppercase text-muted">
                <th className="py-3 pr-4 font-semibold">Date</th>
                <th className="py-3 pr-4 font-semibold">Gates open</th>
                <th className="py-3 pr-4 font-semibold">Sunrise</th>
                <th className="py-3 pr-4 font-semibold">Morning golden hour ends</th>
                <th className="py-3 pr-4 font-semibold">Evening golden hour starts</th>
                <th className="py-3 pr-4 font-semibold">Last entry</th>
                <th className="py-3 font-semibold">Sunset</th>
              </tr>
            </thead>
            <tbody>
              {table.flatMap(({ rows }) =>
                rows.map((r) => (
                  <tr key={r.label} className="border-b border-border">
                    <td className="py-2.5 pr-4 font-semibold text-ink">{r.label}</td>
                    <td className="py-2.5 pr-4 tabular-nums">{r.gatesOpen}</td>
                    <td className="py-2.5 pr-4 font-semibold tabular-nums text-accent">{r.sunrise}</td>
                    <td className="py-2.5 pr-4 tabular-nums">{r.goldenEnd}</td>
                    <td className="py-2.5 pr-4 tabular-nums">{r.goldenStart}</td>
                    <td className="py-2.5 pr-4 tabular-nums">{r.lastEntry}</td>
                    <td className="py-2.5 tabular-nums">{r.sunset}</td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
          Times are astronomical (NOAA algorithm, ±2 minutes) for dates between the two shown; haze and the
          Yamuna mist shift what you <em>see</em> by a few minutes, especially December–January. The Taj Mahal
          is closed to tourists every Friday. Official hours: sunrise −30 min to sunset −30 min —{" "}
          <a href="https://www.tajmahal.gov.in/visiting-hours.aspx" rel="noopener noreferrer" target="_blank" className="link">tajmahal.gov.in</a>.
        </p>
      </Section>
      <Section tone="surface">
        <SectionHeader eyebrow="Use it" title="Built around these hours" />
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={"/tours/taj-mahal-sunrise-tour-with-photographer" as "/tours"} className="btn-primary">Sunrise tour with photographer</Link>
          <Link href={"/guides/taj-mahal-sunrise-vs-sunset" as "/guides"} className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink/40">Sunrise vs sunset — which is better?</Link>
          <Link href={"/guides/best-time-to-visit-taj-mahal" as "/guides"} className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink/40">Best time of year to visit</Link>
        </div>
      </Section>
    </>
  );
}
