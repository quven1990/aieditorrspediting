import type { Metadata } from "next";
import Link from "next/link";
import { HeroVisual } from "@/components/HeroVisual";
import { PromptCard } from "@/components/PromptCard";
import { getAllPrompts } from "@/lib/prompts";
import { pageMetadata } from "@/lib/seo";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "AI Editor RSP Editing Prompts — Copy & Paste Guides",
  description: SITE_DESCRIPTION,
  path: "/",
});

export default function HomePage() {
  const prompts = getAllPrompts();
  const featured = prompts.filter((p) =>
    ["ai-editor-rsp-editing-guide", "rsp-editing-ai", "ai-editor-rsp"].includes(p.slug),
  );
  const rest = prompts.filter((p) => !featured.find((f) => f.slug === p.slug)).slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AI Editor RSP Editing",
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-12">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium uppercase tracking-widest text-accent">
              Unofficial English hub
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold text-ink leading-tight lg:text-[2.75rem]">
              AI Editor RSP Editing Prompts
            </h1>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              Copy RSP-style AI photo prompts, template recipes, and Lightroom-style color
              steps—with safety notes and no risky downloads.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/prompts/"
                className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
              >
                Browse all prompts
              </Link>
              <Link
                href="/what-is-rsp-editing/"
                className="rounded-lg border border-black/10 bg-card px-5 py-2.5 text-sm font-medium text-ink hover:border-accent/40"
              >
                What is RSP editing?
              </Link>
            </div>
          </div>
          <HeroVisual />
        </div>

        <section className="mt-14 max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-ink">Start here</h2>
          <h3 className="mt-2 text-base font-semibold text-ink">Featured RSP prompt guides</h3>
          <p className="mt-1 text-sm text-muted">
            Best entry points for ai editor rsp editing, rsp editing ai, and portrait workflows.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {featured.map((p) => (
              <PromptCard key={p.slug} article={p} />
            ))}
          </div>
        </section>

        <section className="mt-14 max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-ink">More guides</h2>
          <h3 className="mt-2 text-base font-semibold text-ink">Couple, color, and video recipes</h3>
          <p className="mt-1 text-sm text-muted">
            CapCut timing notes, Lightroom-style grades, and trend prompts you can copy today.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {rest.map((p) => (
              <PromptCard key={p.slug} article={p} />
            ))}
          </div>
        </section>

        <aside className="mt-14 max-w-3xl rounded-xl border border-amber-200/80 bg-amber-50/80 p-5 text-sm text-amber-950">
          <strong>Disclaimer:</strong> Not affiliated with RSP Editing, CapCut, VN, Adobe, or
          ByteDance. Prompt guides only—we do not host template files or APKs. Read{" "}
          <Link href="/safe-use/" className="underline font-medium">
            Safe Use
          </Link>{" "}
          before posting edits of real people.
        </aside>
      </div>
    </>
  );
}
