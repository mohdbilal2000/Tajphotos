"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import type { ImageId } from "@/content/types";
import { getImage } from "@/content/images";

export function PhotoGallery({ images }: { images: ImageId[] }) {
  const [openAt, setOpenAt] = useState<number | null>(null);
  const visible = images.slice(0, 5);
  const remaining = images.length - visible.length;
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  // WCAG 2.1 SC 2.1.1 (Keyboard) + the WAI-ARIA dialog pattern: a modal needs Escape to close,
  // its own arrow-key navigation, a scroll-locked background, and focus moved inside on open and
  // back to the trigger on close — none of which came for free from `role="dialog"` alone.
  useEffect(() => {
    if (openAt === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenAt(null);
      else if (e.key === "ArrowLeft") setOpenAt((i) => (i === null ? i : (i - 1 + images.length) % images.length));
      else if (e.key === "ArrowRight") setOpenAt((i) => (i === null ? i : (i + 1) % images.length));
      else if (e.key === "Tab") {
        // Minimal focus trap: only close/prev/next are focusable inside the dialog, so wrapping
        // between the first and last is enough — no need for a full focusable-elements query.
        const focusable = Array.from(document.querySelectorAll<HTMLElement>("[data-gallery-focusable]"));
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openAt !== null, images.length]);

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-2xl sm:gap-3">
        {visible.map((id, i) => {
          const img = getImage(id);
          return (
            <button
              key={id}
              type="button"
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setOpenAt(i);
              }}
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
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery"
          className="fixed inset-0 z-[100] flex touch-pan-y flex-col bg-ink/95 backdrop-blur"
          onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(dx) > 50) setOpenAt((i) => (i === null ? i : dx > 0 ? (i - 1 + images.length) % images.length : (i + 1) % images.length));
            touchStartX.current = null;
          }}
        >
          <div className="flex justify-end p-4">
            <button type="button" ref={closeBtnRef} data-gallery-focusable onClick={() => setOpenAt(null)} aria-label="Close gallery" className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20">
              <X className="size-6" aria-hidden />
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center px-4 pb-6">
            {(() => {
              const img = getImage(images[openAt]);
              return (
                <figure className="relative flex max-h-full max-w-4xl flex-col items-center">
                  <div className="relative max-h-[70vh] w-full overflow-hidden rounded-xl">
                    <Image key={images[openAt]} src={img.src} alt={img.alt} sizes="90vw" className="max-h-[70vh] w-full object-contain" />
                  </div>
                  <figcaption className="mt-3 text-center text-sm text-white/80">{img.alt}</figcaption>
                </figure>
              );
            })()}
            {images.length > 1 && (
              <>
                <button type="button" data-gallery-focusable onClick={() => setOpenAt((openAt - 1 + images.length) % images.length)} aria-label="Previous photo" className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 sm:left-6">
                  <ChevronLeft className="size-6" aria-hidden />
                </button>
                <button type="button" data-gallery-focusable onClick={() => setOpenAt((openAt + 1) % images.length)} aria-label="Next photo" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 sm:right-6">
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
