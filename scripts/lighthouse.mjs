/**
 * Runs Lighthouse against a running `next start` server using the Chromium already installed in
 * this environment, and prints a compact score summary. Start the server yourself first:
 *   pnpm build && pnpm start -p 3000 &
 *   node scripts/lighthouse.mjs http://localhost:3000/ http://localhost:3000/tours/some-slug ...
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const CHROME = "/opt/pw-browsers/chromium";
const urls = process.argv.slice(2);
if (!urls.length) {
  console.error("Usage: node scripts/lighthouse.mjs <url> [url...]");
  process.exit(1);
}

const outDir = path.resolve(".lighthouse");
fs.mkdirSync(outDir, { recursive: true });

for (const url of urls) {
  const slug = url.replace(/^https?:\/\//, "").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "home";
  for (const preset of ["mobile", "desktop"]) {
    const outPath = path.join(outDir, `${slug}-${preset}.json`);
    const args = [
      url,
      "--quiet",
      "--only-categories=performance,accessibility,best-practices,seo",
      `--chrome-flags=--headless=new --no-sandbox --disable-gpu --disable-dev-shm-usage`,
      "--output=json",
      `--output-path=${outPath}`,
    ];
    if (preset === "desktop") args.push("--preset=desktop");
    execFileSync("npx", ["lighthouse", ...args], { stdio: "inherit", env: { ...process.env, CHROME_PATH: CHROME } });
    const r = JSON.parse(fs.readFileSync(outPath, "utf8"));
    const cat = (k) => Math.round((r.categories[k]?.score ?? 0) * 100);
    console.log(
      `\n${url} [${preset}] — perf ${cat("performance")} · a11y ${cat("accessibility")} · best-practices ${cat("best-practices")} · seo ${cat("seo")}`,
    );
    console.log(
      `  LCP ${r.audits["largest-contentful-paint"]?.displayValue} · CLS ${r.audits["cumulative-layout-shift"]?.displayValue} · TBT ${r.audits["total-blocking-time"]?.displayValue}`,
    );
  }
}
