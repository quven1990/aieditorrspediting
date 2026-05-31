import Script from "next/script";

const ADSENSE_CLIENT = "ca-pub-9101692675645964";

/** Google AdSense loader (auto ads) */
export function AdSense() {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
