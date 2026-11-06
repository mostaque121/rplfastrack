import Script from "next/script";

/**
 * GA4 with the heavy gtag.js deferred to browser idle (`lazyOnload`) so it
 * doesn't block the main thread on first load. The tiny inline init runs
 * early and defines `gtag`, so events fired before gtag.js arrives are
 * queued in `dataLayer` and sent once it loads.
 */
export function GoogleAnalytics({ gaId }: { gaId: string }) {
  return (
    <>
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaId}');`}
      </Script>
      <Script id="ga-lib" strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
    </>
  );
}
