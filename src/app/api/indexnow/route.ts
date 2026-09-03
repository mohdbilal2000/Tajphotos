import { NextRequest, NextResponse } from "next/server";
import { site } from "@/config/site";
import { allRoutes } from "@/content";
import { absoluteUrl } from "@/lib/utils";

/**
 * Pings IndexNow (adopted by Bing, Yandex, Naver, Seznam, Yep — NOT Google, which needs
 * sitemap.xml + Search Console instead). Call this after every deploy that changes content:
 *   curl -X POST https://tajphotos.com/api/indexnow
 * or POST { "urls": ["https://tajphotos.com/tours/..."] } to ping specific pages only.
 * Requires INDEXNOW_KEY to be set and public/<INDEXNOW_KEY>.txt to exist (see scripts/write-indexnow-key.mjs).
 */
export async function POST(req: NextRequest) {
  const key = process.env.INDEXNOW_KEY;
  if (!key) return NextResponse.json({ error: "INDEXNOW_KEY not configured" }, { status: 501 });

  let urls: string[] | undefined;
  try {
    const body = await req.json();
    urls = Array.isArray(body?.urls) ? body.urls : undefined;
  } catch {
    // no body — ping everything
  }

  if (!urls?.length) {
    const r = allRoutes();
    urls = [...r.staticPages, ...r.tourPaths, ...r.destinationPaths, ...r.guidePaths].map((p) => absoluteUrl(p));
  }

  const host = new URL(site.url).hostname;
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key, keyLocation: absoluteUrl(`/${key}.txt`), urlList: urls }),
  });

  return NextResponse.json({ submitted: urls.length, status: res.status }, { status: res.ok ? 200 : 502 });
}
