/**
 * Writes public/<INDEXNOW_KEY>.txt so IndexNow can verify domain ownership (the file must contain
 * only the key string, at the site root). Run after setting INDEXNOW_KEY, before deploying.
 * Usage: INDEXNOW_KEY=your-key node scripts/write-indexnow-key.mjs
 */
import fs from "node:fs";
import path from "node:path";

const key = process.env.INDEXNOW_KEY;
if (!key) {
  console.error("Set INDEXNOW_KEY first, e.g.: INDEXNOW_KEY=$(node -e \"console.log(crypto.randomUUID().replace(/-/g,''))\") node scripts/write-indexnow-key.mjs");
  process.exit(1);
}
fs.writeFileSync(path.resolve("public", `${key}.txt`), key);
console.log(`Wrote public/${key}.txt — remember to set INDEXNOW_KEY=${key} in your deploy environment too.`);
