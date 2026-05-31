import Link from "next/link";
import { FeaturedPromptCard } from "@/components/FeaturedPromptCard";
import { HOME_FAQ, RESOURCE_HUBS } from "@/lib/home";
import { getAllPrompts, getFeaturedCopyPrompts } from "@/lib/prompts";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Choose a style",
    body: "Pick a prompt for portraits, couples, Holi, CapCut timing, or Lightroom-style color.",
  },
  {
    step: "02",
    title: "Copy and customize",
    body: "Swap subject, outfit, background, lighting, and mood using the variable lines on each page.",
  },
  {
    step: "03",
    title: "Edit and share safely",
    body: "Finish in your own apps, check the result at full zoom, and post only what you have rights to use.",
  },
] as const;

export function HowItWorksSection() {
  return (
    <section className="mt-16 max-w-3xl" aria-labelledby="how-it-works">
      <p className="text-xs font-medium uppercase tracking-widest text-accent">How it works</p>
      <h2 id="how-it-works" className="mt-2 font-display text-2xl font-semibold text-ink">
        From trend idea to a safer edit recipe
      </h2>
      <ol className="mt-8 space-y-6">
        {HOW_IT_WORKS.map((item) => (
          <li key={item.step} className="flex gap-4">
            <span className="font-display text-2xl font-semibold text-accent/40">{item.step}</span>
            <div>
              <h3 className="font-semibold text-ink">{item.title}</h3>
              <p className="mt-1 text-sm text-muted leading-relaxed">{item.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function ResourceCategoriesSection() {
  return (
    <section className="mt-16" aria-labelledby="resource-categories">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-widest text-accent">
          Resource categories
        </p>
        <h2 id="resource-categories" className="mt-2 font-display text-2xl font-semibold text-ink">
          Pick the page that matches the photo you want
        </h2>
      </div>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {RESOURCE_HUBS.map((hub) => (
          <li key={hub.href + hub.title}>
            <Link
              href={hub.href}
              className="block h-full rounded-xl border border-black/6 bg-card p-5 shadow-sm hover:border-accent/30 hover:shadow-md transition-all"
            >
              <h3 className="font-display text-base font-semibold text-ink">{hub.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{hub.description}</p>
              <span className="mt-3 inline-block text-sm font-medium text-accent">Open →</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function FeaturedCopyPromptsSection() {
  const featured = getFeaturedCopyPrompts();

  return (
    <section className="mt-16" aria-labelledby="featured-prompts">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-widest text-accent">Featured prompts</p>
        <h2 id="featured-prompts" className="mt-2 font-display text-2xl font-semibold text-ink">
          Copyable cards with safety notes beside the idea
        </h2>
        <p className="mt-2 text-sm text-muted">
          Snippets below are shortened—each link opens the full prompt, negatives, and steps.
        </p>
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {featured.map((article) => (
          <FeaturedPromptCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}

export function SiteStatsStrip() {
  const count = getAllPrompts().length;
  return (
    <section className="mt-16 max-w-3xl rounded-xl border border-black/6 bg-card px-5 py-6">
      <p className="text-xs font-medium uppercase tracking-widest text-accent">What you get</p>
      <p className="mt-2 text-muted leading-relaxed">
        <strong className="text-ink">{count} prompt and workflow guides</strong> covering portraits,
        couples, festival color, CapCut timing, and Lightroom-style settings—plus safe-use notes on
        every page. Free to read; no account or checkout in phase one.
      </p>
    </section>
  );
}

export function HomeFaqSection() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="mt-16 max-w-3xl" aria-labelledby="home-faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <p className="text-xs font-medium uppercase tracking-widest text-accent">FAQ</p>
      <h2 id="home-faq" className="mt-2 font-display text-2xl font-semibold text-ink">
        Fast answers before you copy a prompt
      </h2>
      <dl className="mt-8 space-y-6">
        {HOME_FAQ.map((f) => (
          <div key={f.q}>
            <dt className="font-semibold text-ink">{f.q}</dt>
            <dd className="mt-2 text-sm text-muted leading-relaxed">{f.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function SafeUsageBullets() {
  return (
    <section className="mt-10 max-w-3xl">
      <h2 className="font-display text-xl font-semibold text-ink">Safe usage reminders</h2>
      <ul className="mt-4 list-disc pl-5 text-sm text-muted space-y-2">
        <li>Avoid private photos without consent and copied creator assets.</li>
        <li>Do not prompt trademark logos, celebrity likenesses, or unknown download links.</li>
        <li>Template and color pages are recipes only—we do not host project or preset files.</li>
        <li>
          Read our{" "}
          <Link href="/safe-use/" className="text-accent underline font-medium">
            Safe Use
          </Link>{" "}
          page before posting edits of real people.
        </li>
      </ul>
    </section>
  );
}
