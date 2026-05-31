import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Safe Use & Content Guidelines",
  description: "Rights, consent, downloads, and AI disclosure guidelines for RSP-style edits.",
};

export default function SafeUsePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 prose-page">
      <h1 className="font-display text-3xl font-semibold text-ink">Safe use guidelines</h1>
      <p>Last updated: May 31, 2026</p>

      <h2>Not official</h2>
      <p>
        This site is not affiliated with RSP Editing, CapCut, VN, Adobe, ByteDance, or any
        social platform. Brand names are used only to describe compatible workflows.
      </p>

      <h2>No risky downloads</h2>
      <p>
        We do not host template project files, APKs, modded apps, or unknown QR imports. Build
        timelines and prompts manually in apps you install from official stores.
      </p>

      <h2>People and consent</h2>
      <ul>
        <li>Do not edit or publish photos of people without their consent.</li>
        <li>Do not impersonate celebrities or create misleading identity content.</li>
        <li>Minors: extra care—avoid public posting of AI-altered images of children.</li>
      </ul>

      <h2>Copyright and trademarks</h2>
      <ul>
        <li>Do not copy watermarked creator templates or sell others’ presets.</li>
        <li>Music in reels: use platform-licensed libraries.</li>
        <li>Respect festival and cultural content—avoid mockery.</li>
      </ul>

      <h2>AI disclosure</h2>
      <p>
        Follow each platform’s rules on labeling AI-generated or AI-edited media where required.
      </p>

      <h2>Your responsibility</h2>
      <p>
        You are responsible for how you use prompts from this site. We provide educational
        text only—not legal advice.
      </p>
    </div>
  );
}
