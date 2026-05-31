import type { Metadata } from "next";
import { PromptCard } from "@/components/PromptCard";
import { getAllPrompts } from "@/lib/prompts";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "RSP Editing AI Prompts",
  description:
    "Browse 10+ English RSP-style AI photo prompt guides: portraits, couples, Holi trends, CapCut workflows, and Lightroom-style color—copy and paste, no downloads.",
  path: "/prompts/",
});

export default function PromptsIndexPage() {
  const prompts = getAllPrompts();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-3xl font-semibold text-ink">All prompt guides</h1>
      <p className="mt-3 text-muted leading-relaxed">
        {prompts.length} English guides for rsp editing ai, portraits, couples, color, and
        CapCut-style workflows. Copy prompts into your own apps—no downloads required.
      </p>
      <h2 className="mt-10 font-display text-xl font-semibold text-ink">Prompt library</h2>
      <h3 className="mt-2 text-base font-semibold text-ink">Browse by topic</h3>
      <p className="mt-1 text-sm text-muted mb-6">
        Each page includes copy blocks, tools, steps, and FAQs for mobile creators.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {prompts.map((p) => (
          <PromptCard key={p.slug} article={p} />
        ))}
      </div>
    </div>
  );
}
