const ADSENSE_CLIENT = "ca-pub-9101692675645964";

/**
 * Literal <script> in <head> so static export HTML includes the tag for AdSense verification.
 * (next/script afterInteractive only emitted preload in view-source.)
 */
export function AdSense() {
  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
      suppressHydrationWarning
    />
  );
}
