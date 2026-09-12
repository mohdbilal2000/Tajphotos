import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/JsonLd";
import { GroupDirectory } from "@/components/sections/ServiceReferral";
import { brand, PARENT, hasWhatsApp } from "@/config/brand";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { MessageCircle } from "lucide-react";
import { allGroupSites, parentService } from "@/config/network";
import { site } from "@/config/site";
import { buildMetadata, breadcrumbJsonLd, graph } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: `Everything we do — the ${PARENT.name} group`,
  description: `${site.name} is one of several ${PARENT.name} businesses. Here is what each one does, so you can go straight to the right one instead of being sold the wrong thing.`,
  path: "/services",
});

/**
 * ONE page per site describing the whole group — not a sub-page per sibling topic.
 *
 * The goal ("every service is reachable from every site") is met here in a single honest page.
 * The alternative — a /tours page on the photoshoot site, a /photoshoots page on the photo-tour
 * site, and so on — would put dozens of near-duplicate topic pages across domains under one
 * owner, all chasing the same queries. That is the doorway pattern, and it costs every site at
 * once. A directory page that openly says "these are all us, here is which one you want" does
 * the same commercial job and is exactly what it appears to be.
 */
export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbJsonLd([{ name: "Everything we do", path: "/services" }]),
          // A plain ItemList of the group. Machine-readable disclosure of the relationship is
          // the point: it is how an answer engine learns these are one declared business rather
          // than an undisclosed network it should discount.
          {
            "@type": "ItemList",
            name: `${PARENT.name} businesses`,
            itemListElement: allGroupSites.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: { "@type": "Organization", name: s.name, url: `https://${s.domain}`, description: s.sells },
            })),
          },
        )}
      />

      <div className="border-b border-border bg-surface py-10">
        <div className="container-site">
          <Breadcrumbs items={[{ name: "Everything we do", path: "/services" }]} />
          <h1 className="mt-3 max-w-3xl text-3xl font-semibold sm:text-4xl">
            {site.name} is one of several {PARENT.name} businesses
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            We kept them separate on purpose. Being photographed at the Taj Mahal and photographing it yourself are
            different jobs needing different people, and a single site trying to sell you both does neither well.
            Here is the whole group, so you can go straight to the right one.
          </p>
        </div>
      </div>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_22rem]">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">What this site does</h2>
            <p className="mt-4 max-w-2xl text-lg text-ink/85">{brand.product}</p>
            <p className="mt-3 max-w-2xl text-muted">Built for {brand.audience.replace(/^[A-Z]/, (c) => c.toLowerCase())}</p>
            <div className="mt-6">
              <ButtonLink href="/quote">{brand.quote.cta}</ButtonLink>
            </div>

            <h2 className="mt-14 text-2xl font-semibold sm:text-3xl">Why they are separate sites</h2>
            <div className="prose-site mt-4 max-w-2xl">
              <p>
                One legal entity, one team, one set of accounts — {PARENT.name}. What differs is the work
                itself. A photographer who shoots couples at sunrise is not the person who teaches you to expose for
                white marble, and neither of them is the person who negotiates your hotel rate.
              </p>
              <p>
                Keeping them apart means each site can be honest about what it is not, and can send you somewhere
                better instead of upselling you something that nearly fits. It also means the people answering your
                message actually do that job every day.
              </p>
            </div>
          </div>

          <GroupDirectory />
        </div>
      </Section>

      {parentService.enabled && (
        <Section>
          <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-3xl border border-border bg-surface-2 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">The other half of {PARENT.name}</p>
              <p className="mt-2 font-display text-xl font-semibold text-ink">
                {parentService.headline}, from {parentService.from}
              </p>
              <p className="mt-2 max-w-xl text-sm text-muted">{parentService.pitch}</p>
            </div>
            <a href={parentService.url} rel="noopener" className="btn-secondary shrink-0 self-start sm:self-auto">
              {parentService.cta}
            </a>
          </div>
        </Section>
      )}

      <Section tone="surface">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">Not sure which one you need?</h2>
          <p className="mt-4 text-muted">
            Describe what you want and we will point you at the right one — including when that is not us. Free, and
            it takes about a minute.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/quote">{brand.quote.cta}</ButtonLink>
            {hasWhatsApp ? (
              <WhatsAppLink
                message={`Hi ${PARENT.name}! I found you via ${brand.domain} and I'm not sure which of your businesses I need.`}
                event="whatsapp_click_services_group"
                className="btn-whatsapp"
              >
                <MessageCircle className="size-4" aria-hidden /> WhatsApp the team
              </WhatsAppLink>
            ) : (
              <ButtonLink href="/contact" variant="secondary">Ask us directly</ButtonLink>
            )}
          </div>
          <p className="mt-8 text-xs text-muted">
            All of these are {PARENT.name} businesses, operated by the same company. We say so on every site rather
            than pretending to be unrelated companies recommending each other.{" "}
            <a href={absoluteUrl("/about")} className="link">
              More about us
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
