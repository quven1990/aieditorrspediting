/** Decorative SVG for homepage — no external images */
export function HeroVisual() {
  return (
    <div
      className="relative mx-auto w-full max-w-sm shrink-0"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 320 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-sm"
      >
        <rect x="40" y="24" width="240" height="232" rx="20" fill="#fff" stroke="#e8e4df" strokeWidth="1.5" />
        <rect x="56" y="44" width="208" height="140" rx="12" fill="#f6f4f1" />
        <rect x="72" y="60" width="80" height="96" rx="8" fill="#ddd6fe" opacity="0.5" />
        <rect x="160" y="72" width="88" height="12" rx="6" fill="#e8e4df" />
        <rect x="160" y="92" width="72" height="8" rx="4" fill="#e8e4df" />
        <rect x="160" y="108" width="96" height="8" rx="4" fill="#e8e4df" />
        <circle cx="112" cy="108" r="28" fill="#c4b5fd" opacity="0.35" />
        <circle cx="112" cy="108" r="18" fill="#7c3aed" opacity="0.2" />
        <path
          d="M96 120c8-14 32-14 40 0"
          stroke="#7c3aed"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
        <rect x="56" y="196" width="64" height="28" rx="8" fill="#7c3aed" />
        <rect x="128" y="196" width="88" height="28" rx="8" fill="#f6f4f1" stroke="#7c3aed" strokeWidth="1.5" />
        <path d="M248 48l6 12 12 6-12 6-6 12-6-12-12-6 12-6 6-12z" fill="#fbbf24" opacity="0.9" />
        <circle cx="52" cy="52" r="6" fill="#a78bfa" opacity="0.5" />
        <circle cx="268" cy="200" r="8" fill="#c4b5fd" opacity="0.4" />
      </svg>
    </div>
  );
}
