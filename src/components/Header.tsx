import Image from "next/image";
import Link from "next/link";

const nav = [
  { href: "/generator/", label: "Generator" },
  { href: "/prompts/", label: "Prompts" },
  { href: "/prompts/rsp-editing-capcut-workflow/", label: "CapCut" },
  { href: "/prompts/rsp-editing-lightroom-style-settings/", label: "Color" },
  { href: "/safe-use/", label: "Safe Use" },
];

export function Header() {
  return (
    <header className="border-b border-black/5 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-semibold text-ink tracking-tight">
          <Image
            src="/icon.svg"
            alt="AI Editor RSP Editing logo"
            width={28}
            height={28}
            className="rounded-md"
          />
          <span className="hidden sm:inline">AI Editor RSP Editing</span>
          <span className="sm:hidden">RSP Editing</span>
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1 text-sm text-muted">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-accent transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
