import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description:
    "Terms of use for aieditorrspediting.xyz: educational RSP prompt guides only, no brand affiliation, acceptable use, liability limits, and jurisdiction notes for visitors.",
  path: "/terms/",
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 prose-page">
      <h1 className="font-display text-3xl font-semibold text-ink">Terms of use</h1>
      <p>Last updated: May 31, 2026</p>

      <h2>Agreement</h2>
      <h3 className="!mt-2 text-base font-semibold text-ink">Using this site</h3>
      <p>
        By using aieditorrspediting.xyz you agree to these terms. If you disagree, do not use
        the site.
      </p>

      <h2>Informational content only</h2>
      <h3 className="!mt-2 text-base font-semibold text-ink">No guarantees</h3>
      <p>
        Prompts and workflows are provided “as is” for education. We do not guarantee rankings,
        viral reach, or edit quality. Not legal or professional advice.
      </p>

      <h2>No affiliation</h2>
      <h3 className="!mt-2 text-base font-semibold text-ink">Third-party brands</h3>
      <p>
        We are not affiliated with third-party brands named on the site. Trademarks belong to
        their owners.
      </p>

      <h2>Acceptable use</h2>
      <h3 className="!mt-2 text-base font-semibold text-ink">Prohibited behavior</h3>
      <p>
        You may not use the site to plan illegal activity, harassment, non-consensual imagery, or
        malware distribution. See Safe Use for content standards.
      </p>

      <h2>Limitation of liability</h2>
      <h3 className="!mt-2 text-base font-semibold text-ink">Disclaimer of damages</h3>
      <p>
        To the fullest extent permitted by law, we are not liable for damages arising from use of
        site content or third-party tools you choose.
      </p>

      <h2>Governing law</h2>
      <h3 className="!mt-2 text-base font-semibold text-ink">Jurisdiction</h3>
      <p>[待确认] Specify your jurisdiction when deploying—for example the country where you operate the site.</p>
    </div>
  );
}
