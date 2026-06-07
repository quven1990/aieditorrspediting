/**
 * Append per-page no-cache rules to out/_headers so HTML is not edge-cached
 * without also applying no-cache to /_next/* (Cloudflare merges duplicate rules).
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "out");
const headersPath = join(outDir, "_headers");

function walkHtmlFiles(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walkHtmlFiles(path, files);
    else if (name === "index.html") files.push(path);
  }
  return files;
}

function htmlPathToUrl(filePath) {
  const rel = relative(outDir, dirname(filePath));
  if (rel === "." || rel === "") return "/";
  return `/${rel.replace(/\\/g, "/")}/`;
}

const base = readFileSync(headersPath, "utf8").trimEnd();
const routes = walkHtmlFiles(outDir)
  .map(htmlPathToUrl)
  .sort((a, b) => b.length - a.length);

const htmlBlocks = routes
  .map(
    (route) => `${route}
  Cache-Control: no-cache, must-revalidate
  CDN-Cache-Control: no-store`,
  )
  .join("\n\n");

writeFileSync(headersPath, `${base}\n\n# HTML pages — do not cache (avoids stale CSS hashes after deploy).\n${htmlBlocks}\n`, "utf8");
console.log(`append-html-cache-headers: ${routes.length} HTML routes`);
