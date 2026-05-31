import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyBlock } from "@/components/CopyBlock";
import { getPromptBySlug, getPromptSlugs } from "@/lib/prompts";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPromptSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getPromptBySlug(slug);
  if (!article) return {};
  return {
    ...pageMetadata({
      title: article.title,
      description: `${article.description} ${article.answer}`,
      path: `/prompts/${slug}/`,
    }),
    keywords: [article.primaryKeyword, "rsp editing", "ai editor"],
  };
}

export default async function PromptPage({ params }: Props) {
  const { slug } = await params;
  const article = getPromptBySlug(slug);
  if (!article) notFound();

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 prose-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Link href="/prompts/" className="text-sm text-accent hover:underline">
        ← All prompts
      </Link>
      <p className="mt-4 text-xs font-medium uppercase tracking-wide text-accent">
        {article.category} · Updated {article.updated}
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink">{article.title}</h1>

      <div className="mt-6 rounded-lg border border-accent/20 bg-accent/5 p-4">
        <p className="text-sm font-medium text-ink">Quick answer</p>
        <p className="mt-1 text-muted leading-relaxed">{article.answer}</p>
      </div>

      <CopyBlock text={article.prompt} />
      {article.variables.length > 0 && (
        <>
          <h2>Variables</h2>
          <h3 className="!mt-2 !mb-2 text-base font-semibold text-ink">Fields you can customize</h3>
          <ul>
            {article.variables.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </>
      )}
      {article.negativePrompt !== "N/A" && (
        <>
          <h2>Negative prompt</h2>
          <h3 className="!mt-2 !mb-2 text-base font-semibold text-ink">What to exclude from the render</h3>
          <CopyBlock text={article.negativePrompt} label="Negative" />
        </>
      )}

      <h2>Tools</h2>
      <h3 className="!mt-2 !mb-2 text-base font-semibold text-ink">Apps that work with this recipe</h3>
      <ul>
        {article.tools.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <h2>Steps</h2>
      <h3 className="!mt-2 !mb-2 text-base font-semibold text-ink">Recommended workflow</h3>
      <ol>
        {article.steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>

      <h2>Common mistakes</h2>
      <h3 className="!mt-2 !mb-2 text-base font-semibold text-ink">What to avoid</h3>
      <ul>
        {article.commonMistakes.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>

      <h2>FAQ</h2>
      <h3 className="!mt-2 !mb-2 text-base font-semibold text-ink">Common questions</h3>
      {article.faq.map((f) => (
        <div key={f.q} className="mb-6">
          <h3 className="!mt-4">{f.q}</h3>
          <p>{f.a}</p>
        </div>
      ))}

      <aside className="mt-10 rounded-xl border border-black/8 bg-card p-4 text-sm text-muted">
        Unofficial guide only. Not affiliated with brands mentioned. See{" "}
        <Link href="/safe-use/" className="text-accent underline">
          Safe Use
        </Link>
        .
      </aside>
    </article>
  );
}
