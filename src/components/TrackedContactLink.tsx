"use client";
import type { ComponentProps } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * tel:/mailto: anchor with conversion tracking, mirroring WhatsAppLink. Phone and email are
 * advertised contact methods throughout the site (header, footer, contact page, plan-my-trip) —
 * without this wrapper those clicks were invisible to analytics entirely, while WhatsApp clicks
 * were tracked, silently undercounting a real slice of leads in every future report.
 */
export function TrackedContactLink({ event, children, onClick, ...props }: { event: "tel_click" | "email_click" } & ComponentProps<"a">) {
  return (
    <a
      onClick={(e) => {
        trackEvent(event, { href: props.href ?? "" });
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
