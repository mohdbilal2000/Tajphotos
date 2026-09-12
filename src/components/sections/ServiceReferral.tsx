import { ArrowUpRight } from "lucide-react";
import { allGroupSites, type NetworkSite } from "@/config/network";
import { PARENT } from "@/config/brand";

/**
 * A contextual hand-off to a sister business.
 *
 * Placed where a visitor has just revealed they want something this site does not sell — the
 * bottom of a photo-tour page for someone who actually wants to be photographed, a print page
 * for someone who wants a shoot commissioned. It is deliberately a referral and not a sales
 * pitch: the whole value is that it is believable, and a site that admits what it does not do is
 * more trusted on what it does.
 *
 * This is also why there are no mirror sub-pages in this codebase. Giving every site a page for
 * every sibling's topic would reach the same "all services visible everywhere" goal by creating
 * dozens of near-duplicate pages across domains under one owner, which is the doorway pattern.
 * A referral achieves it with one honest paragraph and no duplicated content.
 */
export function ServiceReferral({ sites, className }: { sites: NetworkSite[]; className?: string }) {
  if (!sites.length) return null;
  return (
    <aside className={className} aria-label="Other services from this group">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Not quite what you need?</p>
      <ul className="mt-4 space-y-3">
        {sites.map((s) => (
          <li key={s.domain}>
            <a
              href={`https://${s.domain}`}
              rel="noopener"
              className="group flex items-start gap-3 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-primary/40"
            >
              <span className="flex-1">
                <span className="block font-semibold text-ink">
                  {s.name}
                  <ArrowUpRight className="ml-1 inline size-3.5 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </span>
                <span className="mt-1 block text-sm text-muted">{s.sells}</span>
                <span className="mt-1.5 block text-xs text-muted">
                  Go here if {s.forYouIf}.
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted">
        {sites.length === 1 ? "This is" : "These are"} also {PARENT.name} {sites.length === 1 ? "business" : "businesses"} — same
        people, different job.
      </p>
    </aside>
  );
}

/** The full group, for the /services hub page. */
export function GroupDirectory({ className }: { className?: string }) {
  return <ServiceReferral sites={allGroupSites} className={className} />;
}
