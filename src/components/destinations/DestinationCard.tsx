import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Destination } from "@/content/types";
import { getImage } from "@/content/images";
import { toursForDestination } from "@/content";
import { cn } from "@/lib/utils";

export function DestinationCard({ destination, className }: { destination: Destination; className?: string }) {
  const img = getImage(destination.heroImage);
  const count = toursForDestination(destination.slug).length;
  return (
    <Link href={`/destinations/${destination.slug}`} className={cn("group relative isolate flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-2xl shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift", className)}>
      <Image src={img.src} alt={img.alt} placeholder="blur" sizes="(min-width: 1024px) 24vw, 45vw" className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
      {count > 0 && (
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[0.6875rem] font-semibold text-ink shadow-sm">
          {count} {count === 1 ? "tour" : "tours"}
        </span>
      )}
      <span aria-hidden className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-white/90 text-ink transition-transform group-hover:rotate-45">
        <ArrowUpRight className="size-4" />
      </span>
      <div className="p-5 text-white">
        <p className="font-display text-3xl font-normal leading-none">{destination.name}</p>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/85">{destination.tagline}</p>
      </div>
    </Link>
  );
}
