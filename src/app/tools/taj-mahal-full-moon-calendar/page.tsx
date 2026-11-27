import type { Metadata } from "next";
import Link from "next/link";
import { Moon } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";
import { viewingWindows, istDate } from "@/lib/astro";

const YEAR = new Date().getFullYear();
const YEARS = [YEAR, YEAR + 1];

export const metadata: Metadata = buildMetadata({
  title: `Taj Mahal Full Moon Dates ${YEAR}–${YEAR + 1}`,
  description: `Every Taj Mahal night-viewing window for ${YEAR} and ${YEAR + 1}: the full-moon night plus two nights either side, with Friday closures marked. Confirm final dates with the ASI.`,
  path: "/tools/taj-mahal-full-moon-calendar",
});

export default function FullMoonPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebApplication", name: "Taj Mahal full-moon night-viewing calendar", applicationCategory: "TravelApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: 0, priceCurrency: "USD" }, url: absoluteUrl("/tools/taj-mahal-full-moon-calendar") }} />
      <PageHeader
        image="taj-mahal-moonlight-1"
        crumbs={[{ name: "Tools", path: "/tools" }, { name: "Full-moon calendar", path: "/tools/taj-mahal-full-moon-calendar" }]}
        eyebrow={`${YEAR} and ${YEAR + 1}`}
        title="When can you see the Taj Mahal by moonlight?"
        text="Night viewing runs on five nights around each full moon — the night itself and two either side — except Fridays and the month of Ramadan. 50 visitors per half-hour slot, 8:00 PM to midnight."
      />
      <Section>
        <div className="speakable max-w-3xl text-lg leading-relaxed text-ink/85">
          <p>
            The calendar below computes each full moon astronomically and expands it into the ASI&apos;s
            five-night pattern, striking out Fridays, when the Taj Mahal is closed. The ASI announces the
            official dates and sells the tickets (₹750 foreigner / ₹510 Indian, bought a day ahead) — treat
            this as your planning calendar and{" "}
            <a href="https://www.tajmahal.gov.in/night-view.aspx" rel="noopener noreferrer" target="_blank" className="link">confirm on tajmahal.gov.in</a>{" "}
            before booking flights around it.
          </p>
        </div>
        {YEARS.map((year) => (
          <div key={year} className="mt-12">
            <SectionHeader eyebrow={String(year)} title={`Viewing windows in ${year}`} />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {viewingWindows(year).map((w) => (
                <div key={w.fullMoon.toISOString()} className="rounded-[1.25rem] border border-border bg-surface p-5 shadow-soft">
                  <p className="flex items-center gap-2 text-sm font-semibold text-ink"><Moon className="size-4 text-accent" aria-hidden /> Full moon ≈ {istDate(w.fullMoon)}</p>
                  <ul className="mt-3 space-y-1.5 text-sm">
                    {w.nights.map((n) => (
                      <li key={n.iso} className={n.closed ? "text-muted line-through decoration-accent/60" : n.isFullMoon ? "font-semibold text-accent" : "text-ink/85"}>
                        {n.display} · {n.weekday}{n.closed ? " — closed" : n.isFullMoon ? " — full moon" : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
          Full-moon instants are computed from the mean lunar month (accurate to about ±1 day at this range),
          so a window&apos;s first or last night can shift by a day against the ASI&apos;s announcement. Night
          viewing is also suspended during Ramadan. The view is of the moonlit Taj from the viewing platform —
          photography rules differ from daytime; see the{" "}
          <Link href={"/guides/taj-mahal-night-viewing-dates" as "/guides"} className="link">night-viewing guide</Link>.
        </p>
      </Section>
      <Section tone="surface">
        <SectionHeader eyebrow="Plan around it" title="Make a night of it" />
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={"/tours/taj-mahal-moonlight-tour" as "/tours"} className="btn-primary">Taj Mahal moonlight tour</Link>
          <Link href={"/guides/taj-mahal-night-viewing-dates" as "/guides"} className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink/40">How night viewing works</Link>
          <Link href={"/tools/taj-mahal-sunrise-time" as "/tools"} className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink/40">Sunrise time calculator</Link>
        </div>
      </Section>
    </>
  );
}
