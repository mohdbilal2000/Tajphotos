import type { Metadata } from "next";
import { destinations } from "@/content";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Destinations — Agra, Delhi, Jaipur, Udaipur & Rajasthan",
  description: "Travel guides and tours for Agra, Delhi, Jaipur, Udaipur and the wider Rajasthan and Golden Triangle region.",
  path: "/destinations",
});

export default function DestinationsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Destinations", path: "/destinations" }]}
        eyebrow="Where you go"
        title="The cities, street by street"
        text="Written by the team that guides them — what to see, what to skip, what it costs and when the light is worth setting an alarm for."
      />
      <Section>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">{destinations.map((d) => <DestinationCard key={d.slug} destination={d} />)}</div>
      </Section>
    </>
  );
}
