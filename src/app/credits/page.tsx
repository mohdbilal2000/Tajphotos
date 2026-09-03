import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { images, type SiteImage } from "@/content/images";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ title: "Photo Credits", description: "Attribution for photography used on this site.", path: "/credits", noIndex: true });

export default function CreditsPage() {
  const list = Object.entries(images) as [string, SiteImage][];
  return (
    <>
      <div className="border-b border-border bg-surface py-8"><div className="container-site"><Breadcrumbs items={[{ name: "Credits", path: "/credits" }]} /><h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Photo credits</h1><p className="mt-2 max-w-2xl text-muted">Placeholder photography used ahead of our own on-location shoots. Every image links to its source and licence.</p></div></div>
      <Section>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="border-b border-border text-left"><tr><th className="py-2 pr-4">Subject</th><th className="py-2 pr-4">Photographer</th><th className="py-2 pr-4">Licence</th><th className="py-2">Source</th></tr></thead>
            <tbody className="divide-y divide-border">
              {list.map(([id, img]) => (
                <tr key={id}>
                  <td className="py-2 pr-4 text-ink/85">{img.subject}</td>
                  <td className="py-2 pr-4 text-muted">{img.credit.author}</td>
                  <td className="py-2 pr-4 text-muted"><a href={img.credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="link">{img.credit.license}</a></td>
                  <td className="py-2"><a href={img.credit.sourcePage} target="_blank" rel="noopener noreferrer" className="link">{img.credit.source}</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-sm text-muted">Questions about an image? <Link href="/contact" className="link">Contact us</Link>.</p>
      </Section>
    </>
  );
}
