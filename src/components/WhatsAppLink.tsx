"use client";
import type { ComponentProps } from "react";
import { whatsappLink } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

/**
 * Anchor to wa.me with a prefilled message + conversion tracking.
 *
 * Renders nothing when no WhatsApp number is configured for this deployment. That check lives
 * here, at the single point every WhatsApp CTA passes through, rather than at each of the seven
 * call sites — the alternative to hiding it is an anchor pointing at `wa.me/` with no number,
 * which looks like a working button and dead-ends the highest-intent click on the site.
 */
export function WhatsAppLink({ message, event = "whatsapp_click", children, ...props }: { message?: string; event?: string } & Omit<ComponentProps<"a">, "href">) {
  const href = whatsappLink(message);
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent(event, { message: message?.slice(0, 80) ?? "" })} {...props}>
      {children}
    </a>
  );
}
