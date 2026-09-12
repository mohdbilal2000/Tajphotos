"use client";
import { MessageCircle } from "lucide-react";
import type { Tour } from "@/content/types";
import { QuoteBadge } from "@/components/ui/QuoteBadge";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { site } from "@/config/site";

/** Mobile-only sticky booking bar. Sits above safe-area, replaces the global WhatsApp FAB on tour pages. */
export function StickyMobileBar({ tour }: { tour: Tour }) {
  const message = `Hi ${site.name}! I'd like to check availability for "${tour.title}". My dates: ___. Number of travellers: ___.`;
  return (
    <div id="sticky-mobile-bar" className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 shadow-lift backdrop-blur lg:hidden">
      <div className="flex items-center justify-between gap-3">
        <QuoteBadge variant="bar" />
        <WhatsAppLink message={message} event="whatsapp_click_sticky_bar" className="btn-whatsapp flex-1 justify-center">
          <MessageCircle className="size-4" aria-hidden /> Check availability
        </WhatsAppLink>
      </div>
      {/* Parity with the desktop sidebar's identical line — mobile visitors got no availability
          reassurance at all since this bar is the only booking UI most of them ever see. */}
      <p className="mt-1.5 text-center text-[0.7rem] text-muted">Next available: check on WhatsApp</p>
    </div>
  );
}
