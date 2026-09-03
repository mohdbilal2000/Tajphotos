import { ShieldCheck } from "lucide-react";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

export function TrustWall({ className }: { className?: string }) {
  return (
    <ul className={cn("grid gap-3 sm:grid-cols-3", className)}>
      {site.credentials.map((c) => (
        <li key={c.short} className="flex items-center gap-2.5 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-ink/90">
          <ShieldCheck className="size-4 shrink-0 text-success" aria-hidden /> {c.label}
        </li>
      ))}
    </ul>
  );
}
