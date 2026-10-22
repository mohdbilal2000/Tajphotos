import Image from "next/image";
import Link from "next/link";
import type { TeamMember } from "@/content/types";
import { getImage } from "@/content/images";
import { InlineText } from "@/components/content/RichText";

export function TeamCard({ member, articles }: { member: TeamMember; articles?: { slug: string; title: string }[] }) {
  const img = member.image ? getImage(member.image) : null;
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      {img && (
        <div className="figure relative mb-5 aspect-[4/5] w-28">
          <Image src={img.src} alt={`${member.name}, ${member.role}`} placeholder="blur" sizes="96px" className="size-full object-cover" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-ink">{member.name}</h3>
      <p className="text-sm font-medium text-accent">{member.role}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted"><InlineText text={member.bio} /></p>
      <p className="mt-3 text-xs text-muted">{member.years} years experience · {member.languages.join(", ")}</p>
      {member.credentials && (
        <ul className="mt-2 space-y-1 text-xs text-muted">
          {member.credentials.map((c) => <li key={c}>✓ {c}</li>)}
        </ul>
      )}
      {articles && articles.length > 0 && (
        <div className="mt-4 border-t border-border pt-3">
          <p className="text-xs font-semibold text-ink">Guides by {member.name.split(" ")[0]}</p>
          <ul className="mt-1.5 space-y-1 text-xs">
            {articles.map((a) => <li key={a.slug}><Link href={`/guides/${a.slug}`} className="link">{a.title}</Link></li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
