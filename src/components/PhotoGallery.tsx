"use client";
import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import type { ImageId } from "@/content/types";
import { getImage } from "@/content/images";

export function PhotoGallery({ images }: { images: ImageId[] }) {
  const [openAt, setOpenAt] = useState<number | null>(null);
  const visible = images.slice(0, 5);
  const remaining = images.length - visible.length;

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-2xl sm:gap-3">
        {visible.map((id, i) => {
          const img = getImage(id);
          return (
            <button
              key={id}
              type="button"
              onClick={() => setOpenAt(i)}
              className={`relative overflow-hidden ${i === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"} group`}
              aria-label={`Open photo: ${img.alt}`}
            >
              <Image src={img.src} alt={img.alt} placeholder="blur" sizes={i === 0 ? "50vw" : "25vw"} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
              {i === visible.length - 1 && remaining > 0 && (
                <span className="absolute inset-0 flex items-center justify-center bg-ink/55 text-sm font-semibold text-white">
                  <Camera className="mr-1.5 size-4" aria-hidden /> +{remaining} more
                </span>
              )}
            </button>
          );
        })}
      </div>

      {openAt !== null && (
        <div role="dialog" aria-modal="true" aria-label="Photo gallery" className="fixed inset-0 z-[100] flex flex-col bg-ink/95 backdrop-blur">
          <div className="flex justify-end p-4">
            <button type="button" onClick={() => setOpenAt(null)} aria-label="Close gallery" className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20">
              <X className="size-6" aria-hidden />
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center px-4 pb-6">
            {(() => {
              const img = getImage(images[openAt]);
              return (
                <figure className="relative flex max-h-full max-w-4xl flex-col items-center">
                  <div className="relative max-h-[70vh] w-full overflow-hidden rounded-xl">
                    <Image src={img.src} alt={img.alt} sizes="90vw" className="max-h-[70vh] w-full object-contain" />
                  </div>
                  <figcaption className="mt-3 text-center text-sm text-white/80">{img.alt}</figcaption>
                </figure>
              );
            })()}
            {images.length > 1 && (
              <>
                <button type="button" onClick={() => setOpenAt((openAt - 1 + images.length) % images.length)} aria-label="Previous photo" className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 sm:left-6">
                  <ChevronLeft className="size-6" aria-hidden />
                </button>
                <button type="button" onClick={() => setOpenAt((openAt + 1) % images.length)} aria-label="Next photo" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 sm:right-6">
                  <ChevronRight className="size-6" aria-hidden />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
