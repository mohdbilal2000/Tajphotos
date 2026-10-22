import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { TeamCard } from "@/components/TeamCard";
import { TrustWall } from "@/components/sections/TrustWall";
import { StatStrip } from "@/components/sections/StatStrip";
import { CtaCard } from "@/components/sections/CtaCard";
import { team, guides } from "@/content";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/config/site";
import { buildMetadata, graph, personJsonLd, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Us — A Small Agra Team of Guides & Photographers",
  description: `${site.legalName} is a small, Agra-based team of licensed guides, drivers and photographers running private Golden Triangle and Taj Mahal tours since ${site.foundingYear}.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={graph(webPageJsonLd({ path: "/about", type: "AboutPage", name: `About ${site.name}`, description: site.description }), ...team.map(personJsonLd))} />
      <PageHeader
        image="taj-mahal-mist-1"
        crumbs={[{ name: "About", path: "/about" }]}
        eyebrow="Who we are"
        title="A small Agra team of guides, drivers and photographers"
      />

      <Section>
        <div className="max-w-2xl space-y-4 text-lg leading-relaxed text-ink/85">
          <p>{site.legalName} started in Tajganj, the neighbourhood that grew up around the Taj Mahal&apos;s east gate, with one guide and one camera. {site.stats.yearsOperating} years and {site.stats.travellersServed} travellers later, we&apos;re still a small, hands-on team — no call centre, no commission-driven shopping stops, no anonymous booking-widget experience.</p>
          <p>We plan every itinerary personally, drive you in cars we maintain ourselves, and — because photography is where we started — we know exactly where the light lands on the marble at sunrise each month of the year.</p>
        </div>
        <StatStrip className="mt-14 grid grid-cols-2 gap-8 border-t border-border pt-10 sm:grid-cols-4" />
      </Section>

      <Section tone="surface">
        <SectionHeader eyebrow="Our team" title="Who you'll travel with" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => <div key={m.slug} id={m.slug}><TeamCard member={m} articles={guides.filter((g) => g.author === m.slug).map((g) => ({ slug: g.slug, title: g.title }))} /></div>)}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="How we work" title="What makes us different" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {[
            { t: "No commission shops", d: "We are never paid to detour you through emporiums or 'government' shops. If we stop somewhere, it's because you asked." },
            { t: "Transparent pricing", d: "Prices are quoted per person, in your currency, before you book — not buried mid-page in a foreign currency." },
            { t: "Vehicle standards", d: "Air-conditioned cars under three years old, checked before every trip, with seatbelts for every seat." },
            { t: "Real safety practices", d: "Licensed drivers, verified guides, and a team that answers WhatsApp during your trip, not just before it." },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border border-border bg-surface p-6"><p className="font-semibold text-ink">{x.t}</p><p className="mt-1.5 text-sm text-muted">{x.d}</p></div>
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeader eyebrow="Credentials" title="Registered and recognised" />
        <TrustWall className="mt-8" />
      </Section>

      <Section><CtaCard title="Come plan a trip with us" className="mx-auto" /></Section>
    </>
  );
}
