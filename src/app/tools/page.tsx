import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sunrise, Moon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Free Taj Mahal Planning Tools",
  description: "Free tools for planning a Taj Mahal visit: exact sunrise and gate-opening times by date, and the full-moon night-viewing calendar with Friday closures marked.",
  path: "/tools",
});

const tools = [
  {
    href: "/tools/taj-mahal-sunrise-time",
    icon: Sunrise,
    name: "Sunrise & gate time calculator",
    text: "Sunrise, gate-opening and golden-hour times at the Taj Mahal for every month, computed for the monument's own coordinates.",
  },
  {
    href: "/tools/taj-mahal-full-moon-calendar",
    icon: Moon,
    name: "Full-moon night-viewing calendar",
    text: "Every 5-night viewing window around each full moon, with the Friday closures already struck out.",
  },
];

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        image="taj-mahal-mist-1"
        crumbs={[{ name: "Tools", path: "/tools" }]}
        eyebrow="Free planning tools"
        title="Plan the Taj Mahal by the clock"
        text="The Taj rewards timing more than any monument in India. These free tools answer the two timing questions every visit hangs on — no sign-up, no download."
      />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2">
          {tools.map((t) => (
            <Link key={t.href} href={t.href as "/tools"} className="group flex flex-col rounded-[1.375rem] border border-border bg-surface p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-fg"><t.icon className="size-5" aria-hidden /></span>
              <h2 className="mt-5 font-display text-2xl font-normal text-ink">{t.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t.text}</p>
              <span className="mt-auto flex items-center gap-2 pt-5 text-sm font-semibold text-primary">Open the tool <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden /></span>
            </Link>
          ))}
        </div>
        <p className="mt-10 max-w-2xl text-sm text-muted">
          Built and kept current by the TajPhotos team in Agra. Found them useful? They are free to link to from your own article or guide.
        </p>
      </Section>
    </>
  );
}
