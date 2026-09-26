import Image from "next/image";
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
    <article className={cn("group flex flex-col", className)}>
      <div className="figure aspect-[5/6] w-full">
        <Image
          src={img.src}
          alt={img.alt}
          placeholder="blur"
          loading={eager ? "eager" : undefined}
          sizes="(min-width: 1024px) 31vw, (min-width: 640px) 45vw, 88vw"
        />
      </div>
      <p className="mt-3 text-xs italic leading-relaxed text-muted">Pictured: {img.subject.charAt(0).toLowerCase() + img.subject.slice(1)}.</p>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <p className="text-label font-semibold uppercase text-accent">{stay.city}</p>
        <p className="text-[0.625rem] uppercase tracking-[0.18em] text-muted">{stayTierLabel[stay.tier]}</p>
      </div>

      <h3 className="mt-3 font-display text-2xl font-normal leading-tight text-ink">{stay.name}</h3>
      <p className="mt-2.5 font-display text-lg italic leading-snug text-ink/80">{stay.oneLine}</p>
      <p className="mt-4 grow text-sm leading-relaxed text-muted">{stay.detail}</p>

      <div className="mt-5 border-t border-border pt-4">
        <p className="text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-muted">What you remember</p>
        <p className="mt-2 text-sm leading-relaxed text-ink">{stay.signature}</p>
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-1.5 text-[0.6875rem] text-muted">
        {stay.bestFor.map((b) => (
          <li key={b} className="border border-border px-2 py-1">{b}</li>
        ))}
      </ul>
    </article>
  );
}
