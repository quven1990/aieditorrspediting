/**
 * Fail the build if any exported HTML references missing /_next/static assets.
 * Catches broken deploys before they reach Cloudflare Pages.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "out");

const ASSET_RE = /\/_next\/static\/(?:css|chunks|media)\/[^"'\s)\\]+/g;

function walkHtmlFiles(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) walkHtmlFiles(path, files);
    else if (name.endsWith(".html")) files.push(path);
  }
  return files;
}

function collectAssets(html) {
  const found = new Set();
  for (const match of html.matchAll(ASSET_RE)) {
    found.add(match[0].replace(/\\$/, ""));
  }
  return [...found];
}

let missing = 0;
const htmlFiles = walkHtmlFiles(outDir);

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  for (const assetPath of collectAssets(html)) {
    const normalized = decodeURIComponent(assetPath);
    const diskPath = join(outDir, normalized);
    try {
      statSync(diskPath);
    } catch {
      console.error(`MISSING: ${assetPath} (referenced in ${file.replace(outDir, "")})`);
      missing += 1;
    }
  }
}

if (missing > 0) {
  console.error(`\nverify-static-assets: ${missing} missing asset(s) in out/`);
  process.exit(1);
}

console.log(`verify-static-assets: OK (${htmlFiles.length} HTML files checked)`);
