import Image from "next/image";
import { MapPin } from "lucide-react";
import type { Stay } from "@/content/types";
import { stayTierLabel } from "@/content/stays";
import { getImage } from "@/content/images";
import { cn } from "@/lib/utils";

/**
 * Hotels are not linked out and not priced. Both are deliberate: we are not an affiliate and we are
 * not a rate-comparison site, so a card that looked like a booking widget would promise something
 * this business doesn't do. What a traveller gets instead is the one thing an OTA listing never
 * gives them — what the building actually is, and the detail they'll remember.
 *
 * Every plate carries a caption naming what the photograph actually shows, and this is not
 * decoration. The shipped image library is licence-safe city photography, not photography of these
 * properties: a picture of the Jaipur City Palace sitting untitled above the words "Rambagh
 * Palace" reads as a photograph of Rambagh, which is a claim about someone else's hotel that we
 * have no right to make. The caption costs one line and removes the implication entirely. When the
 * client supplies real property imagery, the caption should stay — it is how a magazine credits a
 * picture — and simply name the property instead.
 */
export function StayCard({ stay, className, eager }: { stay: Stay; className?: string; eager?: boolean }) {
  const img = getImage(stay.image);
  return (
    <article className={cn("group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift", className)}>
      <div className="figure relative aspect-[4/3] w-full">
        <Image
          src={img.src}
          alt={img.alt}
          placeholder="blur"
          loading={eager ? "eager" : undefined}
          sizes="(min-width: 1024px) 31vw, (min-width: 640px) 45vw, 88vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[0.6875rem] font-semibold text-ink shadow-sm">{stayTierLabel[stay.tier]}</span>
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-ink/70 px-2.5 py-1 text-[0.6875rem] font-medium text-white backdrop-blur-sm">
          <MapPin className="size-3" aria-hidden /> {stay.city}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
      <p className="text-[0.6875rem] italic leading-relaxed text-muted">Pictured: {img.subject.charAt(0).toLowerCase() + img.subject.slice(1)}.</p>

      <h3 className="mt-3 font-sans text-lg font-semibold leading-snug tracking-tight text-ink">{stay.name}</h3>
      <p className="mt-2.5 font-display text-lg italic leading-snug text-ink/80">{stay.oneLine}</p>
      <p className="mt-4 grow text-sm leading-relaxed text-muted">{stay.detail}</p>

      <div className="mt-5 rounded-xl bg-bg p-3.5">
        <p className="text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-muted">What you remember</p>
        <p className="mt-2 text-sm leading-relaxed text-ink">{stay.signature}</p>
      </div>

      <ul className="mt-4 flex flex-wrap gap-1.5 text-[0.6875rem] text-ink/80">
        {stay.bestFor.map((b) => (
          <li key={b} className="rounded-full bg-surface-2 px-2.5 py-1">{b}</li>
        ))}
      </ul>
      </div>
    </article>
  );
}
