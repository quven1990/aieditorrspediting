import promptsData from "@/content/prompts.json";

export type PromptArticle = {
  slug: string;
  title: string;
  description: string;
  answer: string;
  primaryKeyword: string;
  category: string;
  /** Short label for cards, e.g. "Instagram DP" */
  bestFor?: string;
  /** Grouping for browse sections: Boy, Girl, Couple, Festival, General */
  audienceTag?: string;
  prompt: string;
  variables: string[];
  negativePrompt: string;
  tools: string[];
  steps: string[];
  faq: { q: string; a: string }[];
  commonMistakes: string[];
  updated: string;
};

const CATEGORY_ORDER = ["Pillar", "Portrait", "Couple", "Trend", "Color", "Video", "Guides"] as const;

const articles = promptsData as PromptArticle[];

export function getAllPrompts(): PromptArticle[] {
  return articles;
}

export function getPromptBySlug(slug: string): PromptArticle | undefined {
  return articles.find((p) => p.slug === slug);
}

export function getPromptSlugs(): string[] {
  return articles.map((p) => p.slug);
}

export function getPromptsByCategory(category: string): PromptArticle[] {
  return articles.filter((p) => p.category === category);
}

export function getPromptsByAudience(tag: string): PromptArticle[] {
  return articles.filter((p) => p.audienceTag === tag);
}

export function getGroupedPromptCategories(): { category: string; items: PromptArticle[] }[] {
  const categories = [...new Set(articles.map((p) => p.category))];
  const orderIndex = (c: string) => {
    const i = (CATEGORY_ORDER as readonly string[]).indexOf(c);
    return i === -1 ? 99 : i;
  };
  categories.sort((a, b) => orderIndex(a) - orderIndex(b));
  return categories.map((category) => ({
    category,
    items: articles.filter((p) => p.category === category),
  }));
}

export const FEATURED_COPY_PROMPT_SLUGS = [
  "cinematic-street-portrait-boy",
  "aesthetic-floral-girl-portrait",
  "romantic-rain-couple-rsp",
  "rsp-editing-ai-holi-trend",
  "attitude-bike-dp-portrait",
  "cinematic-selfie-upgrade",
] as const;

export function getFeaturedCopyPrompts(): PromptArticle[] {
  return FEATURED_COPY_PROMPT_SLUGS.map((slug) => articles.find((p) => p.slug === slug)).filter(
    (p): p is PromptArticle => Boolean(p),
  );
}
