import type { Metadata } from "next";
import { destinations } from "@/content";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import { buildMetadata } from "@/lib/seo";
import { requireSection } from "@/lib/sections";

export const metadata: Metadata = buildMetadata({
  title: "Destinations — Agra, Delhi, Jaipur, Udaipur & Rajasthan",
  description: "Travel guides and tours for Agra, Delhi, Jaipur, Udaipur and the wider Rajasthan and Golden Triangle region.",
  path: "/destinations",
});

export default function DestinationsPage() {
  requireSection("destinations");
  return (
    <>
      <div className="border-b border-border bg-surface py-6"><div className="container-site"><Breadcrumbs items={[{ name: "Destinations", path: "/destinations" }]} /><h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Destinations</h1></div></div>
      <Section>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">{destinations.map((d) => <DestinationCard key={d.slug} destination={d} />)}</div>
      </Section>
    </>
  );
}
