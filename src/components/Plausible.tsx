import Script from "next/script";

/** Privacy-friendly analytics by Plausible (ShipSolo) */
export function Plausible() {
  return (
    <>
      <Script
        async
        src="https://plausible.shipsolo.io/js/pa-l8vLhipAyOWWcZnEDiy72.js"
        strategy="afterInteractive"
      />
      <Script id="plausible-init" strategy="afterInteractive">
        {`
          window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
          plausible.init()
        `}
      </Script>
    </>
  );
}
