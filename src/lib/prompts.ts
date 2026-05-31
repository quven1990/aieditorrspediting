import promptsData from "@/content/prompts.json";

export type PromptArticle = {
  slug: string;
  title: string;
  description: string;
  answer: string;
  primaryKeyword: string;
  category: string;
  prompt: string;
  variables: string[];
  negativePrompt: string;
  tools: string[];
  steps: string[];
  faq: { q: string; a: string }[];
  commonMistakes: string[];
  updated: string;
};

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
