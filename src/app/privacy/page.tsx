import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for aieditorrspediting.xyz: static prompt site, GA4 and analytics cookies, Cloudflare logs, no accounts or uploads in phase one, and how to contact the operator.",
  path: "/privacy/",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 prose-page">
      <h1 className="font-display text-3xl font-semibold text-ink">Privacy policy</h1>
      <p>Last updated: May 31, 2026</p>

      <h2>Overview</h2>
      <h3 className="!mt-2 text-base font-semibold text-ink">What this website is</h3>
      <p>
        aieditorrspediting.xyz (“we”, “site”) is a static information website. Phase 1 does not
        offer user accounts or hosted uploads.
      </p>

      <h2>Data we may collect</h2>
      <h3 className="!mt-2 text-base font-semibold text-ink">Analytics and server logs</h3>
      <ul>
        <li>
          <strong>Analytics:</strong> If enabled, Google Analytics 4 may collect usage data
          (pages viewed, device type, approximate geography) via cookies or similar technologies.
        </li>
        <li>
          <strong>Server logs:</strong> Our host (e.g. Cloudflare) may log IP address, user agent,
          and request time for security and performance.
        </li>
      </ul>

      <h2>What we do not collect in phase 1</h2>
      <h3 className="!mt-2 text-base font-semibold text-ink">No accounts or uploads</h3>
      <p>
        We do not operate login, payment, comment forms, or file upload features on this site.
      </p>

      <h2>Third parties</h2>
      <h3 className="!mt-2 text-base font-semibold text-ink">Vendor policies</h3>
      <p>
        Analytics and CDN providers process data under their own policies. You can use browser
        controls or opt-out tools offered by those vendors.
      </p>

      <h2>Contact</h2>
      <h3 className="!mt-2 text-base font-semibold text-ink">Privacy requests</h3>
      <p>
        For privacy questions, contact the site operator at the email you configure for this
        domain (add your address when deploying).
      </p>

      <h2>Changes</h2>
      <h3 className="!mt-2 text-base font-semibold text-ink">Policy updates</h3>
      <p>We may update this policy; the date above will change when we do.</p>
    </div>
  );
}
