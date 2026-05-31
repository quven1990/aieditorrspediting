import Link from "next/link";
import type { PromptArticle } from "@/lib/prompts";

export function FeaturedPromptCard({ article }: { article: PromptArticle }) {
  const tag = article.audienceTag ?? article.category;

  return (
    <article className="rounded-xl border border-black/6 bg-card p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="font-medium text-accent">{tag}</span>
        {article.bestFor && (
          <span className="text-muted">· Best for: {article.bestFor}</span>
        )}
      </div>
      <h3 className="mt-2 font-display text-lg font-semibold text-ink">
        <Link href={`/prompts/${article.slug}/`} className="hover:text-accent">
          {article.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-muted line-clamp-3">{article.prompt}</p>
      <p className="mt-3 text-xs text-muted leading-relaxed">
        Works with mainstream AI image tools. Replace subject details before posting; avoid
        celebrity likenesses and logos.
      </p>
      <Link
        href={`/prompts/${article.slug}/`}
        className="mt-4 inline-block text-sm font-medium text-accent hover:underline"
      >
        Open full prompt →
      </Link>
    </article>
  );
}
