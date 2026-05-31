import Link from "next/link";
import { ContactEmailsFooter } from "@/components/ContactEmail";
import { SITE_YEAR } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-black/5 bg-surface">
      <div className="mx-auto max-w-5xl px-4 py-10 text-sm text-muted">
        <p className="mb-4 leading-relaxed">
          Unofficial English resource hub. Not affiliated with RSP Editing, CapCut, VN,
          Adobe, ByteDance, or any creator brand. We do not host template files, APKs, or
          mod links.
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <Link href="/generator/" className="hover:text-accent">
            Generator
          </Link>
          <Link href="/prompts/" className="hover:text-accent">
            Prompts
          </Link>
          <Link href="/what-is-rsp-editing/" className="hover:text-accent">
            What is RSP?
          </Link>
          <Link href="/prompts/rsp-editing-capcut-workflow/" className="hover:text-accent">
            CapCut recipes
          </Link>
          <Link href="/prompts/rsp-editing-lightroom-style-settings/" className="hover:text-accent">
            Color recipes
          </Link>
          <Link href="/safe-use/" className="hover:text-accent">
            Safe Use
          </Link>
          <Link href="/privacy/" className="hover:text-accent">
            Privacy
          </Link>
          <Link href="/terms/" className="hover:text-accent">
            Terms
          </Link>
        </div>
        <ContactEmailsFooter />
        <p className="mt-4 text-xs">© {SITE_YEAR} aieditorrspediting.xyz</p>
      </div>
    </footer>
  );
}
