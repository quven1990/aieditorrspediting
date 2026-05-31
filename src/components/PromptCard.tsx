import Link from "next/link";
import type { PromptArticle } from "@/lib/prompts";

export function PromptCard({ article }: { article: PromptArticle }) {
  return (
    <Link
      href={`/prompts/${article.slug}/`}
      className="block rounded-xl border border-black/6 bg-card p-5 shadow-sm hover:border-accent/30 hover:shadow-md transition-all"
    >
      <span className="text-xs font-medium text-accent">{article.category}</span>
      <h2 className="mt-1 font-display text-lg font-semibold text-ink">{article.title}</h2>
      <p className="mt-2 text-sm text-muted line-clamp-2">{article.description}</p>
    </Link>
  );
}
