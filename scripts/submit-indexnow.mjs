/**
 * Submit sitemap URLs to Bing/IndexNow after deploy.
 * Key file must be live at https://<host>/<key>.txt
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aieditorrspediting.xyz"
).replace(/\/$/, "");
const KEY = process.env.INDEXNOW_KEY ?? "c17fe838b04349c4ac14070d1d38bd10";
const HOST = new URL(SITE_URL).host;
const SITEMAP_PATH =
  process.env.INDEXNOW_SITEMAP_PATH ?? join(root, "out/sitemap_index.xml");

const xml = readFileSync(SITEMAP_PATH, "utf8");
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

if (urlList.length === 0) {
  console.error("submit-indexnow: no URLs found in", SITEMAP_PATH);
  process.exit(1);
}

const body = {
  host: HOST,
  key: KEY,
  keyLocation: `${SITE_URL}/${KEY}.txt`,
  urlList,
};

const endpoints = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
];

for (const endpoint of endpoints) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  console.log(`${endpoint} → ${res.status} ${res.statusText}`);
  if (!res.ok && res.status !== 202) {
    const text = await res.text();
    console.error(text);
    process.exit(1);
  }
}

console.log(`submit-indexnow: submitted ${urlList.length} URLs`);
