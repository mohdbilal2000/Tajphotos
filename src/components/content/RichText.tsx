import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import type { ReactNode } from "react";
import type { Block, Inline, FAQ } from "@/content/types";
import { getImage } from "@/content/images";
import { slugify, cn } from "@/lib/utils";
import { Lightbulb, Info, TriangleAlert } from "lucide-react";
import { CtaCard } from "@/components/sections/CtaCard";

/* ------------------------------ Inline renderer ------------------------------ */

const TOKEN = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;

/** Renders our tiny inline markup: [text](href), **bold**, *italic*, `code`. */
export function InlineText({ text }: { text: Inline }) {
  const parts = text.split(TOKEN).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const [, label, href] = link;
          const external = /^https?:\/\//.test(href);
          return external ? (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="link">
              {label}
            </a>
          ) : (
            <Link key={i} href={href as Route} className="link">
              {label}
            </Link>
          );
        }
        if (part.startsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
        if (part.startsWith("*")) return <em key={i}>{part.slice(1, -1)}</em>;
        if (part.startsWith("`")) return <code key={i} className="rounded bg-surface px-1 py-0.5 text-[0.9em]">{part.slice(1, -1)}</code>;
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

/* ------------------------------- Block renderer ------------------------------ */

const calloutStyles = {
  tip: { icon: Lightbulb, cls: "border-accent/40 bg-accent/10", label: "Insider tip" },
  info: { icon: Info, cls: "border-primary/30 bg-primary/5", label: "Good to know" },
  warning: { icon: TriangleAlert, cls: "border-warning/50 bg-warning/10", label: "Heads up" },
} as const;

export function FaqList({ items, className }: { items: FAQ[]; className?: string }) {
  return (
    <div className={cn("divide-y divide-border rounded-2xl border border-border bg-surface/60", className)}>
      {items.map((f) => (
        <details key={f.q} className="group px-5 py-4 open:bg-surface" name="faq">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-medium text-ink marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="text-balance">{f.q}</span>
            <span aria-hidden className="mt-1 shrink-0 text-muted transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="speakable mt-3 text-muted leading-relaxed">
            <InlineText text={f.a} />
          </p>
        </details>
      ))}
    </div>
  );
}

export function RichText({ blocks, className }: { blocks: Block[]; className?: string }) {
  return (
    <div className={cn("prose-site", className)}>
      {blocks.map((b, i) => (
        <BlockView key={i} block={b} />
      ))}
    </div>
  );
}

function BlockView({ block }: { block: Block }): ReactNode {
  switch (block.type) {
    case "p":
      return (
        <p>
          <InlineText text={block.text} />
        </p>
      );
    case "h2":
      return (
        <h2 id={block.id ?? slugify(block.text)} className="scroll-mt-28">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 id={block.id ?? slugify(block.text)} className="scroll-mt-28">
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul>
          {block.items.map((it, i) => (
            <li key={i}>
              <InlineText text={it} />
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {block.items.map((it, i) => (
            <li key={i}>
              <InlineText text={it} />
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            {block.caption && <caption className="px-4 py-2 text-left text-xs text-muted">{block.caption}</caption>}
            <thead className="bg-surface text-left">
              <tr>
                {block.headers.map((h) => (
                  <th key={h} scope="col" className="px-4 py-2.5 font-semibold text-ink">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {block.rows.map((r, i) => (
                <tr key={i} className="odd:bg-bg even:bg-surface/40">
                  {r.map((c, j) => (
                    <td key={j} className="px-4 py-2.5 align-top text-ink/90">
                      <InlineText text={c} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout": {
      const s = calloutStyles[block.variant];
      const Icon = s.icon;
      return (
        <aside className={cn("not-prose my-6 flex gap-3 rounded-2xl border p-4 sm:p-5", s.cls)}>
          <Icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">{block.title ?? s.label}</p>
            <p className="mt-1 text-ink/90 leading-relaxed">
              <InlineText text={block.text} />
            </p>
          </div>
        </aside>
      );
    }
    case "image": {
      const img = getImage(block.image);
      return (
        <figure className="not-prose my-8">
          <Image src={img.src} alt={img.alt} placeholder="blur" sizes="(min-width: 1024px) 768px, 100vw" className="w-full rounded-2xl object-cover" />
          {block.caption && (
            <figcaption className="mt-2 text-center text-sm text-muted">
              <InlineText text={block.caption} />
            </figcaption>
          )}
        </figure>
      );
    }
    case "quote":
      return (
        <blockquote>
          <p>
            <InlineText text={block.text} />
          </p>
          {block.by && <footer>— {block.by}</footer>}
        </blockquote>
      );
    case "faq":
      return <FaqList items={block.items} className="not-prose my-6" />;
    case "cta":
      return <CtaCard title={block.title} text={block.text} tourSlug={block.tour} label={block.label} className="not-prose my-8" />;
    default:
      return null;
  }
}
