import type { Metadata } from "next";
import { PromptCard } from "@/components/PromptCard";
import { getAllPrompts } from "@/lib/prompts";

export const metadata: Metadata = {
  title: "RSP Editing AI Prompts",
  description:
    "Browse copy-paste RSP-style AI photo prompts, color recipes, and mobile workflows in English.",
};

export default function PromptsIndexPage() {
  const prompts = getAllPrompts();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-3xl font-semibold text-ink">All prompt guides</h1>
      <p className="mt-3 text-muted leading-relaxed">
        {prompts.length} English guides for rsp editing ai, portraits, couples, color, and
        CapCut-style workflows. Copy prompts into your own apps—no downloads required.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {prompts.map((p) => (
          <PromptCard key={p.slug} article={p} />
        ))}
      </div>
    </div>
  );
}
