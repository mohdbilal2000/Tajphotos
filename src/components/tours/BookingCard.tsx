"use client";
import { MessageCircle, ShieldCheck, BadgePercent, Clock3 } from "lucide-react";
import type { Tour } from "@/content/types";
import { QuoteBadge } from "@/components/ui/QuoteBadge";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/config/site";
import { brand } from "@/config/brand";

export function BookingCard({ tour }: { tour: Tour }) {
  const message = `Hi ${site.name}! I'd like to check availability for "${tour.title}". My dates: ___. Number of travellers: ___.`;
  return (
    <div className="rounded-3xl border border-border bg-white p-6 shadow-lift">
      <QuoteBadge variant="panel" />

      <ul className="mt-5 space-y-2 text-sm text-ink/85">
        <li className="flex items-center gap-2"><ShieldCheck className="size-4 text-success" aria-hidden /> {tour.cancellation}</li>
        <li className="flex items-center gap-2"><BadgePercent className="size-4 text-success" aria-hidden /> No hidden costs, no shopping stops</li>
        <li className="flex items-center gap-2"><Clock3 className="size-4 text-success" aria-hidden /> {site.contact.hoursNote}</li>
      </ul>

      <div className="mt-6 flex flex-col gap-3">
        <WhatsAppLink message={message} event="whatsapp_click_booking_card" className="btn-whatsapp w-full">
          <MessageCircle className="size-4" aria-hidden /> Check availability on WhatsApp
        </WhatsAppLink>
        <ButtonLink href="/quote" variant="secondary" className="w-full">{brand.quote.cta}</ButtonLink>
      </div>
      {tour.rating && (
        <p className="mt-4 text-center text-xs text-muted">★ {tour.rating.value.toFixed(1)} from {tour.rating.count} travellers</p>
      )}
    </div>
  );
}
