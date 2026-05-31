import type { Metadata } from "next";
import { PromptCard } from "@/components/PromptCard";
import {
  getAllPrompts,
  getGroupedPromptCategories,
  getPromptsByAudience,
} from "@/lib/prompts";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "RSP Editing AI Prompts",
  description:
    "Browse English RSP-style AI photo prompt guides: boy and girl portraits, couples, Holi trends, CapCut workflows, and Lightroom-style color—copy and paste, no downloads.",
  path: "/prompts/",
});

const AUDIENCE_SECTIONS = [
  { id: "boy-edits", label: "Boy portrait prompts", tag: "Boy" },
  { id: "girl-edits", label: "Girl portrait prompts", tag: "Girl" },
  { id: "couple-edits", label: "Couple prompts", tag: "Couple" },
] as const;

export default function PromptsIndexPage() {
  const prompts = getAllPrompts();
  const grouped = getGroupedPromptCategories();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl font-semibold text-ink">All prompt guides</h1>
        <p className="mt-3 text-muted leading-relaxed">
          {prompts.length} English guides for rsp editing ai, portraits, couples, festival color,
          CapCut-style workflows, and Lightroom-style settings. Copy prompts into your own apps—no
          template files or APKs hosted here.
        </p>
      </div>

      {AUDIENCE_SECTIONS.map((section) => {
        const items = getPromptsByAudience(section.tag);
        if (items.length === 0) return null;
        return (
          <section key={section.id} id={section.id} className="mt-14 scroll-mt-24">
            <h2 className="font-display text-xl font-semibold text-ink">{section.label}</h2>
            <p className="mt-1 text-sm text-muted mb-6">
              Copy-paste prompts with variables, negatives, and safety notes.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <PromptCard key={p.slug} article={p} />
              ))}
            </div>
          </section>
        );
      })}

      {grouped.map(({ category, items }) => {
        const filtered = items.filter(
          (p) => !p.audienceTag || !["Boy", "Girl", "Couple"].includes(p.audienceTag),
        );
        if (filtered.length === 0) return null;
        return (
          <section key={category} className="mt-14 scroll-mt-24">
            <h2 className="font-display text-xl font-semibold text-ink">{category}</h2>
            <p className="mt-1 text-sm text-muted mb-6">
              {filtered.length} guide{filtered.length === 1 ? "" : "s"} in this topic.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <PromptCard key={p.slug} article={p} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
