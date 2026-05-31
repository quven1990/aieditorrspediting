import type { Metadata } from "next";
import Link from "next/link";
import { getPromptBySlug } from "@/lib/prompts";

export const metadata: Metadata = {
  title: "What Is RSP Editing?",
  description:
    "Plain-English explainer for rsp editing ai: trends, tools, and why it is not one official app.",
};

export default function WhatIsRspEditingPage() {
  const article = getPromptBySlug("what-is-rsp-editing-ai");

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 prose-page">
      <h1 className="font-display text-3xl font-semibold text-ink">What is RSP editing?</h1>
      <p className="text-lg text-muted mt-4">{article?.answer}</p>
      <p>
        On social platforms, <strong>rsp editing</strong> and <strong>rsp editing ai</strong>{" "}
        usually describe a bundle of trends: AI portrait prompts, CapCut timing patterns,
        Lightroom-style color, and short-form video hooks—not a single app you can download as
        “the official RSP editor.”
      </p>
      <h2>What people actually search for</h2>
      <ul>
        <li>
          <strong>ai editor rsp editing</strong> — informational: prompt cards and workflows
        </li>
        <li>
          <strong>rsp editing ai</strong> — often navigational toward popular resource sites
        </li>
        <li>
          <strong>ai editor rsp</strong> — shorter variant of the same intent
        </li>
      </ul>
      <h2>What this site provides</h2>
      <p>
        aieditorrspediting.xyz is an independent English hub. We publish copy-paste prompts,
        manual color recipes, and safety notes. We do not host CapCut project files, APKs, or
        copied creator templates.
      </p>
      <Link
        href="/prompts/ai-editor-rsp-editing-guide/"
        className="inline-block mt-6 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white"
      >
        Read the full starter guide
      </Link>
    </div>
  );
}
