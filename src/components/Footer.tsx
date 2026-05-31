import Link from "next/link";
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
        <div className="flex flex-wrap gap-4">
          <Link href="/privacy/" className="hover:text-accent">
            Privacy
          </Link>
          <Link href="/terms/" className="hover:text-accent">
            Terms
          </Link>
          <Link href="/safe-use/" className="hover:text-accent">
            Safe Use
          </Link>
        </div>
        <p className="mt-6 text-xs">© {SITE_YEAR} aieditorrspediting.xyz</p>
      </div>
    </footer>
  );
}
