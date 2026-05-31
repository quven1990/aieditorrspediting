/** Canonical origin, no trailing slash (used in sitemap + robots) */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aieditorrspediting.xyz"
).replace(/\/$/, "");

export const SITE_NAME = "AI Editor RSP Editing";

export const SITE_DESCRIPTION =
  "Unofficial English hub for RSP-style AI photo prompts, template recipes, and safer mobile editing workflows.";

/** Fixed year avoids SSR/client timezone mismatch in footer */
export const SITE_YEAR = 2026;
