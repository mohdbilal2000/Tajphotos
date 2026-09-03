"use client";
import { MessageCircle, ShieldCheck, BadgePercent, Clock3 } from "lucide-react";
import type { Tour } from "@/content/types";
import { Price } from "@/components/ui/Price";
import { CurrencySwitcher } from "@/components/ui/CurrencySwitcher";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/config/site";

export function BookingCard({ tour }: { tour: Tour }) {
  const message = `Hi ${site.name}! I'd like to check availability for "${tour.title}". My dates: ___. Number of travellers: ___.`;
  return (
    <div className="rounded-3xl border border-border bg-white p-6 shadow-lift">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted">From</p>
          <p className="font-display text-3xl font-semibold text-accent"><Price usd={tour.priceFrom.usd} /></p>
          <p className="text-xs text-muted">{tour.priceNote}</p>
        </div>
        <CurrencySwitcher />
      </div>

      <ul className="mt-5 space-y-2 text-sm text-ink/85">
        <li className="flex items-center gap-2"><ShieldCheck className="size-4 text-success" aria-hidden /> {tour.cancellation}</li>
        <li className="flex items-center gap-2"><BadgePercent className="size-4 text-success" aria-hidden /> No hidden costs, no shopping stops</li>
        <li className="flex items-center gap-2"><Clock3 className="size-4 text-success" aria-hidden /> {site.contact.hoursNote}</li>
      </ul>

      <div className="mt-6 flex flex-col gap-3">
        <WhatsAppLink message={message} event="whatsapp_click_booking_card" className="btn-whatsapp w-full">
          <MessageCircle className="size-4" aria-hidden /> Check availability on WhatsApp
        </WhatsAppLink>
        <ButtonLink href="/plan-my-trip" variant="secondary" className="w-full">Request a custom quote</ButtonLink>
      </div>
      {tour.rating && (
        <p className="mt-4 text-center text-xs text-muted">★ {tour.rating.value.toFixed(1)} from {tour.rating.count} travellers</p>
      )}
    </div>
  );
}
