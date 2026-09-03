import { Check, X } from "lucide-react";

export function IncludedExcluded({ inclusions, exclusions, className }: { inclusions: string[]; exclusions: string[]; className?: string }) {
  return (
    <div className={`grid gap-6 sm:grid-cols-2 ${className ?? ""}`}>
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-success">Included</h3>
        <ul className="mt-3 space-y-2.5">
          {inclusions.map((x) => (
            <li key={x} className="flex items-start gap-2.5 text-sm text-ink/90"><Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />{x}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">Not included</h3>
        <ul className="mt-3 space-y-2.5">
          {exclusions.map((x) => (
            <li key={x} className="flex items-start gap-2.5 text-sm text-muted"><X className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden />{x}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
