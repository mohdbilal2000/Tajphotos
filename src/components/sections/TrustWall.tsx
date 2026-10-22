import { site } from "@/config/site";
import { cn } from "@/lib/utils";

/** The credentials, set as a ruled list rather than three green-ticked boxes. */
export function TrustWall({ className }: { className?: string }) {
  return (
    <ul className={cn("grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3", className)}>
      {site.credentials.map((c, i) => (
        <li key={c.short} className="flex flex-col justify-between gap-4 bg-bg px-5 py-6">
          <span aria-hidden className="text-label font-semibold uppercase text-accent">{String(i + 1).padStart(2, "0")}</span>
          <span className="text-sm leading-relaxed text-ink">{c.label}</span>
        </li>
      ))}
    </ul>
  );
}
