import Link from "next/link";
import Image from "next/image";
import type { Destination } from "@/content/types";
import { getImage } from "@/content/images";
import { cn } from "@/lib/utils";

/**
 * A tall plate with the place name set on the image. The gradient is a single foot wash rather than
 * a full-frame scrim, so the top two thirds of the photograph stay a photograph.
 */
export function DestinationCard({ destination, className }: { destination: Destination; className?: string }) {
  const img = getImage(destination.heroImage);
  return (
    <Link href={`/destinations/${destination.slug}`} className={cn("group relative isolate flex aspect-[3/4] flex-col justify-end overflow-hidden", className)}>
      <div className="figure absolute inset-0 -z-10">
        <Image src={img.src} alt={img.alt} placeholder="blur" sizes="(min-width: 1024px) 24vw, 45vw" />
      </div>
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
      <div className="p-5 text-white">
        <p className="font-display text-3xl font-normal leading-none">{destination.name}</p>
        <p className="mt-2.5 border-t border-white/25 pt-2.5 text-xs leading-relaxed text-white/80">{destination.tagline}</p>
      </div>
    </Link>
  );
}
