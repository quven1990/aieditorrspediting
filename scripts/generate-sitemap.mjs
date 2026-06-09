import { readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aieditorrspediting.xyz"
).replace(/\/$/, "");

const today = new Date().toISOString().slice(0, 10);
const SITEMAP_FILE = "sitemap_index.xml";

const prompts = JSON.parse(
  readFileSync(join(root, "src/content/prompts.json"), "utf8"),
);

const staticPaths = [
  "/",
  "/generator/",
  "/prompts/",
  "/what-is-rsp-editing/",
  "/safe-use/",
  "/privacy/",
  "/terms/",
];

const urls = [
  ...staticPaths.map((path) => ({
    loc: `${SITE_URL}${path === "/" ? "/" : path}`,
    priority: path === "/" ? "1.0" : path === "/generator/" ? "0.9" : "0.8",
  })),
  ...prompts.map((p) => ({
    loc: `${SITE_URL}/prompts/${p.slug}/`,
    priority: p.slug === "ai-editor-rsp-editing-guide" ? "0.9" : "0.7",
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `<url>
<loc>${u.loc}</loc>
<lastmod>${today}</lastmod>
<changefreq>weekly</changefreq>
<priority>${u.priority}</priority>
</url>`,
  )
  .join("\n")}
</urlset>
`;

const outPath = join(root, "public", SITEMAP_FILE);
const legacyPath = join(root, "public/sitemap.xml");
try {
  unlinkSync(legacyPath);
} catch {
  // ignore if absent
}
writeFileSync(outPath, xml, "utf8");
console.log(`Wrote ${urls.length} URLs to public/${SITEMAP_FILE}`);
