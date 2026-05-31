export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aieditorrspediting.xyz";

export const SITE_NAME = "AI Editor RSP Editing";

export const SITE_DESCRIPTION =
  "Unofficial English hub for RSP-style AI photo prompts, template recipes, and safer mobile editing workflows.";

export const GA_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-0NQNJQ2R84";

/** Fixed year avoids SSR/client timezone mismatch in footer */
export const SITE_YEAR = 2026;
