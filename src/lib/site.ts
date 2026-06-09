/** Canonical origin, no trailing slash (used in sitemap + robots) */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aieditorrspediting.xyz"
).replace(/\/$/, "");

export const SITE_NAME = "AI Editor RSP Editing";

export const SITE_DESCRIPTION =
  "Copy RSP-style AI photo prompts and mobile edit recipes in English. Unofficial ai editor rsp editing guides with safe workflows—no APK or template downloads.";

/** Fixed year avoids SSR/client timezone mismatch in footer */
export const SITE_YEAR = 2026;

/** Site operator (legal pages) */
export const SITE_OPERATOR = "aieditorrspediting.xyz";

export const CONTACT_EMAIL = "contract@aieditorrspediting.xyz";

export const PRIVACY_EMAIL = "privacy@aieditorrspediting.xyz";

/** Bing IndexNow key — verification file at /{key}.txt */
export const INDEXNOW_KEY = "c17fe838b04349c4ac14070d1d38bd10";
