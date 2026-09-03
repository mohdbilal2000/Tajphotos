import Image from "next/image";
import type { TeamMember } from "@/content/types";
import { getImage } from "@/content/images";
import { InlineText } from "@/components/content/RichText";

export function TeamCard({ member }: { member: TeamMember }) {
  const img = member.image ? getImage(member.image) : null;
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      {img && (
        <div className="relative mb-4 aspect-square w-24 overflow-hidden rounded-full">
          <Image src={img.src} alt={img.alt} placeholder="blur" sizes="96px" className="size-full object-cover" />
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
    </div>
  );
}
