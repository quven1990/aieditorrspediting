import type { Metadata } from "next";
import Link from "next/link";
import {
  FeaturedCopyPromptsSection,
  HomeFaqSection,
  HowItWorksSection,
  ResourceCategoriesSection,
  SafeUsageBullets,
  SiteStatsStrip,
} from "@/components/HomeSections";
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
  const rest = prompts
    .filter((p) => !featured.find((f) => f.slug === p.slug))
    .filter(
      (p) =>
        ![
          "cinematic-street-portrait-boy",
          "aesthetic-floral-girl-portrait",
          "romantic-rain-couple-rsp",
          "attitude-bike-dp-portrait",
          "cinematic-selfie-upgrade",
        ].includes(p.slug),
    )
    .slice(0, 6);

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
              Unofficial · recipe only · free at launch
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold text-ink leading-tight lg:text-[2.75rem]">
              AI Editor RSP Editing Prompts
            </h1>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              You saw the RSP-style photo trend. Find the prompt, edit idea, and safe-use note you
              need—without confusing official claims or risky downloads.
            </p>
            <p className="mt-3 text-muted leading-relaxed">
              Copy RSP-style AI photo prompts, template-style recipes, Lightroom-style color steps,
              and simple mobile workflows from one English hub.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/generator/"
                className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
              >
                Open prompt generator
              </Link>
              <Link
                href="/prompts/"
                className="rounded-lg border border-black/10 bg-card px-5 py-2.5 text-sm font-medium text-ink hover:border-accent/40"
              >
                Browse RSP prompts
              </Link>
              <Link
                href="/what-is-rsp-editing/"
                className="rounded-lg border border-black/10 bg-card px-5 py-2.5 text-sm font-medium text-ink hover:border-accent/40"
              >
                What is RSP editing?
              </Link>
            </div>
            <p className="mt-4 text-xs text-muted">
              Free to use at launch. No account required. Prompt and recipe guides only.
            </p>
          </div>
          <HeroVisual />
        </div>

        <HowItWorksSection />
        <ResourceCategoriesSection />
        <FeaturedCopyPromptsSection />
        <SiteStatsStrip />

        <section className="mt-16 max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-ink">Start here</h2>
          <h3 className="mt-2 text-base font-semibold text-ink">Featured RSP prompt guides</h3>
          <p className="mt-1 text-sm text-muted">
            Best entry points for ai editor rsp editing, rsp editing ai, and pillar workflows.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {featured.map((p) => (
              <PromptCard key={p.slug} article={p} />
            ))}
          </div>
        </section>

        <section className="mt-14 max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-ink">More guides</h2>
          <h3 className="mt-2 text-base font-semibold text-ink">Workflows, color, and explainers</h3>
          <p className="mt-1 text-sm text-muted">
            CapCut timing notes, Lightroom-style grades, and comparison guides you can use today.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {rest.map((p) => (
              <PromptCard key={p.slug} article={p} />
            ))}
          </div>
          <Link href="/prompts/" className="mt-6 inline-block text-sm font-medium text-accent hover:underline">
            View all {prompts.length} guides →
          </Link>
        </section>

        <HomeFaqSection />
        <SafeUsageBullets />

        <aside className="mt-14 max-w-3xl rounded-xl border border-amber-200/80 bg-amber-50/80 p-5 text-sm text-amber-950">
          <strong>Disclaimer:</strong> Not affiliated with RSP Editing, CapCut, VN, Adobe, or
          ByteDance. Prompt guides only—we do not host template files or APKs. Read{" "}
          <Link href="/safe-use/" className="underline font-medium">
            Safe Use
          </Link>{" "}
          before posting edits of real people.
        </aside>

        <section className="mt-14 max-w-3xl rounded-xl bg-accent px-6 py-8 text-white">
          <h2 className="font-display text-xl font-semibold">Turn the trend into a prompt you can use</h2>
          <p className="mt-2 text-sm text-white/90 leading-relaxed">
            RSP-style prompts, template-style recipes, color ideas, and safety notes in one place.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/prompts/"
              className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-accent hover:opacity-95"
            >
              Browse all prompts
            </Link>
            <Link
              href="/safe-use/"
              className="rounded-lg border border-white/40 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10"
            >
              Safe usage notes
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
