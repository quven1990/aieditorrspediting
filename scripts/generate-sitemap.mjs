import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aieditorrspediting.xyz"
).replace(/\/$/, "");

const today = new Date().toISOString().slice(0, 10);

const prompts = JSON.parse(
  readFileSync(join(root, "src/content/prompts.json"), "utf8"),
);

const staticPaths = [
  "/",
  "/prompts/",
  "/what-is-rsp-editing/",
  "/safe-use/",
  "/privacy/",
  "/terms/",
];

const urls = [
  ...staticPaths.map((path) => ({
    loc: `${SITE_URL}${path === "/" ? "/" : path}`,
    priority: path === "/" ? "1.0" : "0.8",
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

const outPath = join(root, "public/sitemap.xml");
writeFileSync(outPath, xml, "utf8");
console.log(`Wrote ${urls.length} URLs to public/sitemap.xml`);
