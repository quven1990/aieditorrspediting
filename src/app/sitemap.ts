import type { MetadataRoute } from "next";
import { getPromptSlugs } from "@/lib/prompts";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "prompts/",
    "what-is-rsp-editing/",
    "safe-use/",
    "privacy/",
    "terms/",
  ];

  const now = new Date();

  const staticEntries = staticRoutes.map((path) => ({
    url: `${SITE_URL}/${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const promptEntries = getPromptSlugs().map((slug) => ({
    url: `${SITE_URL}/prompts/${slug}/`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: slug === "ai-editor-rsp-editing-guide" ? 0.9 : 0.7,
  }));

  return [...staticEntries, ...promptEntries];
}
