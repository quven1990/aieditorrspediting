import type { Metadata } from "next";
import Link from "next/link";
import { PromptGenerator } from "@/components/PromptGenerator";
import { pageMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "AI Editor RSP Prompt Generator — Free Copy Tool",
  description:
    "Free AI editor RSP prompt generator: pick subject, scene, style, and model (ChatGPT, Gemini, Bing, Grok). Copy RSP-style prompts, negatives, and captions—no login.",
  path: "/generator/",
});

const FAQ = [
  {
    q: "What is the AI Editor RSP prompt generator?",
    a: "A free browser tool on aieditorrspediting.xyz that builds RSP-style AI photo editing prompts from your choices—subject, scene, visual style, and target model—plus negative prompts and caption ideas.",
  },
  {
    q: "Do I need an account?",
    a: "No. The generator runs in your browser. Nothing is uploaded to our servers in phase one.",
  },
  {
    q: "Which AI models does it support?",
    a: "You can tailor output notes for ChatGPT, Gemini, Bing Image Creator, and Grok. Paste the prompt into whichever tool you already use.",
  },
  {
    q: "Is this the official RSP Editing app?",
    a: "No. This is an unofficial English resource hub, not affiliated with RSP Editing, CapCut, Adobe, or the sites aieditorrsp.vip or aieditorrspediting.com.",
  },
  {
    q: "Can I use the results commercially?",
    a: "You must verify rights for people, photos, logos, music, and each platform’s AI disclosure rules before commercial use.",
  },
] as const;

export default function GeneratorPage() {
  const webAppLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AI Editor RSP Prompt Generator",
    url: `${SITE_URL}/generator/`,
    applicationCategory: "DesignApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free prompt generator for RSP-style AI photo edits: subject, scene, style, model, copy to clipboard.",
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Prompt Generator", item: `${SITE_URL}/generator/` },
    ],
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <nav className="text-sm text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">Prompt generator</span>
      </nav>

      <p className="mt-6 text-xs font-medium uppercase tracking-widest text-accent">
        Free tool · no login
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink lg:text-4xl">
        AI Editor RSP Prompt Generator
      </h1>
      <p className="mt-4 text-lg text-muted leading-relaxed">
        Make viral RSP-style AI photo edits faster. Choose a subject, scene, style, and model—then
        copy a ready-to-use prompt for ChatGPT, Gemini, Bing Image Creator, or Grok.
      </p>
      <ul className="mt-4 flex flex-wrap gap-3 text-sm text-muted">
        <li className="rounded-lg border border-black/8 bg-card px-3 py-1.5">
          <strong className="text-ink">5 steps</strong> — subject → scene → style → model → copy
        </li>
        <li className="rounded-lg border border-black/8 bg-card px-3 py-1.5">
          <strong className="text-ink">4 models</strong> — ChatGPT, Gemini, Bing, Grok
        </li>
        <li className="rounded-lg border border-black/8 bg-card px-3 py-1.5">
          <strong className="text-ink">No login</strong> — runs in your browser
        </li>
      </ul>

      <PromptGenerator />

      <section className="mt-16 prose-page max-w-none">
        <h2>Built for real search intent</h2>
        <p>
          Most <strong>ai editor rsp</strong> searches are not looking for a heavy desktop editor.
          Creators want copy-paste <strong>AI photo editing prompts</strong>, CapCut/VN workflow
          ideas, and color recipes they can use on mobile—without unknown template downloads.
        </p>
        <h3>Pair the generator with guides</h3>
        <ul>
          <li>
            <Link href="/prompts/" className="text-accent underline">
              RSP editing prompt library
            </Link>{" "}
            — portrait, couple, and festival pages with full steps.
          </li>
          <li>
            <Link href="/prompts/rsp-editing-capcut-workflow/" className="text-accent underline">
              CapCut workflow
            </Link>{" "}
            — timing and export notes without project files.
          </li>
          <li>
            <Link
              href="/prompts/rsp-editing-lightroom-style-settings/"
              className="text-accent underline"
            >
              Lightroom-style color
            </Link>{" "}
            — manual settings, not preset downloads.
          </li>
          <li>
            <Link href="/safe-use/" className="text-accent underline">
              Safe Use
            </Link>{" "}
            — consent, rights, and unofficial-site disclaimers.
          </li>
        </ul>

        <h2>How the generator works</h2>
        <p>
          Pick the visual ingredients of your edit. The tool assembles a clean main prompt, a
          default negative prompt, a caption line, and hashtags you can paste into your chosen app.
          Use <strong>Random idea</strong> when you want inspiration, then tweak one variable at a
          time before rendering.
        </p>

        <h2>FAQ</h2>
        {FAQ.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}

        <aside className="mt-10 rounded-xl border border-amber-200/80 bg-amber-50/80 p-5 text-sm text-amber-950 not-prose">
          <strong>Disclaimer:</strong> {SITE_NAME} is an independent resource hub. Not affiliated
          with RSP Editing, ChatGPT, Google Gemini, Microsoft Bing, xAI Grok, CapCut, VN,
          Lightroom, Snapseed, or other brands mentioned.
        </aside>
      </section>
    </div>
  );
}
