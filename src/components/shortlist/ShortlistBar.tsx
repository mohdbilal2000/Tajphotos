"use client";
import { useState } from "react";
import Link from "next/link";
import { Heart, X, MessageCircle, ChevronUp } from "lucide-react";
import { useShortlist } from "@/context/ShortlistContext";
import { Price } from "@/components/ui/Price";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Appears only once something is saved. One tap sends the whole shortlist as a single WhatsApp
 * message, so comparing three tours becomes one conversation instead of three. Sits bottom-left,
 * opposite the WhatsApp float, and uses the same consent-banner offset (.shortlist-bar in
 * globals.css) so the two never overlap the banner or each other.
 */
export function ShortlistBar() {
  const { items, remove } = useShortlist();
  const [open, setOpen] = useState(false);
  if (items.length === 0) return null;
  const message = `Hi ${site.name}! I've shortlisted these — could you check availability for my dates?\n${items
    .map((it, i) => `${i + 1}. ${it.name} (from $${it.usd})`)
    .join("\n")}`;
  return (
    <div className="shortlist-bar fixed left-4 z-40 w-[min(22rem,calc(100vw-6.5rem))] sm:left-6">
      {open && (
        <div className="mb-2 overflow-hidden rounded-2xl border border-border bg-surface shadow-lift">
          <p className="border-b border-border px-4 py-3 text-label font-semibold uppercase text-muted">Your shortlist</p>
          <ul className="max-h-64 divide-y divide-border overflow-y-auto">
            {items.map((it) => (
              <li key={it.slug} className="flex items-center gap-3 px-4 py-3 text-sm">
                <Link href={`/tours/${it.slug}` as "/tours"} className="min-w-0 flex-1 truncate font-medium text-ink hover:text-accent">{it.name}</Link>
                <span className="shrink-0 text-xs text-muted">from <Price usd={it.usd} /></span>
                <button type="button" onClick={() => remove(it.slug)} aria-label={`Remove ${it.name}`} className="shrink-0 rounded-full p-1 text-muted hover:bg-bg hover:text-ink"><X className="size-4" aria-hidden /></button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex items-center gap-2 rounded-full bg-ink p-1.5 pl-2 text-white shadow-lift">
        <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="flex min-w-0 flex-1 items-center gap-2 rounded-full px-2 py-1.5 text-sm font-semibold">
          <Heart className="size-4 shrink-0 fill-accent text-accent" aria-hidden />
          <span className="truncate">{items.length} saved</span>
          <ChevronUp className={cn("size-4 shrink-0 transition-transform", !open && "rotate-180")} aria-hidden />
        </button>
        <WhatsAppLink message={message} event="whatsapp_click_shortlist" className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-whatsapp-ink px-3.5 py-2 text-xs font-semibold text-white hover:brightness-110">
          <MessageCircle className="size-3.5" aria-hidden /> Send list
        </WhatsAppLink>
      </div>
    </div>
  );
}
