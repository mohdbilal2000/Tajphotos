import type { Metadata } from "next";
import { MessageCircle, Mail, Phone, MapPin, Clock } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { ButtonLink } from "@/components/ui/Button";
import { site, defaultWhatsappMessage } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ title: "Contact Us", description: `Reach ${site.name} by WhatsApp, phone or email — or use our trip-planning form.`, path: "/contact" });

export default function ContactPage() {
  return (
    <>
      <div className="border-b border-border bg-surface py-8"><div className="container-site"><Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} /><h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Contact us</h1></div></div>
      <Section>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <MessageCircle className="size-6 text-whatsapp-ink" aria-hidden />
            <p className="mt-3 font-semibold text-ink">WhatsApp</p>
            <p className="mt-1 text-sm text-muted">Fastest response, {site.contact.hoursNote.toLowerCase()}</p>
            <WhatsAppLink message={defaultWhatsappMessage} event="whatsapp_click_contact_page" className="btn-whatsapp mt-4 w-full justify-center">Chat now</WhatsAppLink>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6">
            <Phone className="size-6 text-primary" aria-hidden />
            <p className="mt-3 font-semibold text-ink">Phone</p>
            <a href={`tel:${site.contact.phoneE164}`} className="mt-1 block text-sm text-muted hover:text-ink">{site.contact.phoneDisplay}</a>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6">
            <Mail className="size-6 text-primary" aria-hidden />
            <p className="mt-3 font-semibold text-ink">Email</p>
            <a href={`mailto:${site.contact.email}`} className="mt-1 block text-sm text-muted hover:text-ink">{site.contact.email}</a>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6">
            <MapPin className="size-6 text-primary" aria-hidden />
            <p className="mt-3 font-semibold text-ink">Office</p>
            <p className="mt-1 text-sm text-muted">{site.address.streetAddress}, {site.address.addressLocality} {site.address.postalCode}, India</p>
          </div>
        </div>
        <div className="mt-8 flex items-center gap-2 text-sm text-muted"><Clock className="size-4" aria-hidden /> {site.contact.hoursNote}</div>
        <div className="mt-10"><ButtonLink href="/plan-my-trip">Use the trip-planning form instead</ButtonLink></div>
      </Section>
    </>
  );
}
