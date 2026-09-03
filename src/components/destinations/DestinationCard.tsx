import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Destination } from "@/content/types";
import { getImage } from "@/content/images";
import { cn } from "@/lib/utils";

export function DestinationCard({ destination, className }: { destination: Destination; className?: string }) {
  const img = getImage(destination.heroImage);
  return (
    <Link href={`/destinations/${destination.slug}`} className={cn("group relative isolate flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-2xl", className)}>
      <Image src={img.src} alt={img.alt} placeholder="blur" sizes="(min-width: 1024px) 300px, 45vw" className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
      <div className="p-5 text-white">
        <p className="font-display text-2xl font-semibold">{destination.name}</p>
        <p className="mt-1 flex items-center gap-1 text-sm text-white/85">{destination.tagline} <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></p>
      </div>
    </Link>
  );
}
