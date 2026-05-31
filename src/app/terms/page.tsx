import type { Metadata } from "next";
import Link from "next/link";
import { ContactEmail } from "@/components/ContactEmail";
import { pageMetadata } from "@/lib/seo";
import { SITE_OPERATOR } from "@/lib/site";

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
        By using {SITE_OPERATOR} you agree to these terms. If you disagree, do not use the site.
      </p>

      <h2>Informational content only</h2>
      <h3 className="!mt-2 text-base font-semibold text-ink">No guarantees</h3>
      <p>
        Prompts and workflows are provided “as is” for education. We do not guarantee search
        rankings, viral reach, or edit quality. Content is not legal, financial, or professional
        advice.
      </p>

      <h2>No affiliation</h2>
      <h3 className="!mt-2 text-base font-semibold text-ink">Third-party brands</h3>
      <p>
        We are not affiliated with RSP Editing, CapCut, VN, Adobe, ByteDance, or any creator or
        platform named on the site. Trademarks belong to their respective owners.
      </p>

      <h2>Acceptable use</h2>
      <h3 className="!mt-2 text-base font-semibold text-ink">Prohibited behavior</h3>
      <p>
        You may not use the site to plan illegal activity, harassment, non-consensual imagery, or
        malware distribution. See our{" "}
        <Link href="/safe-use/" className="text-accent underline">
          Safe Use
        </Link>{" "}
        guidelines for content standards.
      </p>

      <h2>Limitation of liability</h2>
      <h3 className="!mt-2 text-base font-semibold text-ink">Disclaimer of damages</h3>
      <p>
        To the fullest extent permitted by applicable law, the operator of {SITE_OPERATOR} is not
        liable for indirect, incidental, or consequential damages arising from your use of site
        content or third-party tools you choose.
      </p>

      <h2>Governing law</h2>
      <h3 className="!mt-2 text-base font-semibold text-ink">Jurisdiction</h3>
      <p>
        These terms are governed by the laws applicable to the operator of {SITE_OPERATOR}, without
        regard to conflict-of-law principles. Any dispute should first be raised by contacting us at{" "}
        <ContactEmail email="contact" />.
      </p>

      <h2>Contact</h2>
      <h3 className="!mt-2 text-base font-semibold text-ink">General inquiries</h3>
      <p>
        For terms, partnerships, or other site matters (non-privacy), email{" "}
        <ContactEmail email="contact" />.
      </p>
    </div>
  );
}
