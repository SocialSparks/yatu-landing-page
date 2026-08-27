import type {Metadata, Viewport} from "next";
import {Capriola, Lato, Outfit} from "next/font/google";
import {BackToTop} from "@/components/back-to-top";
import {CookieBanner} from "@/components/cookie-banner";
import {Measurement} from "@/components/measurement";
import {Motion} from "@/components/motion";
import {SiteChrome} from "@/components/site-chrome";
import {SiteFooter} from "@/components/site-footer";
import {SiteHeader} from "@/components/site-header";
import {SiteStructuredData} from "@/components/structured-data";
import {PUBLISHER, SITE_NAME, SITE_URL} from "@/lib/site";
import "./globals.css";

const META_PIXEL_ID = (process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "2191380281815578").trim();
const META_CONSENT_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 183;

/**
 * Meta's official bootstrap, placed in <head> for returning visitors who have
 * already accepted the advertising category. Consent lives in localStorage,
 * so this small guard has to run in the browser before the bootstrap itself.
 */
const META_PIXEL_HEAD_SCRIPT = /^\d+$/.test(META_PIXEL_ID)
  ? `
(function (w, d, pixelId, consentKey, maxAge) {
  var consent = null;
  try {
    consent = JSON.parse(w.localStorage.getItem(consentKey) || "null");
  } catch (_) {}

  var savedAt = consent && consent.ts ? new Date(consent.ts).getTime() : NaN;
  if (!consent || consent.social !== true || !Number.isFinite(savedAt) || Date.now() - savedAt > maxAge) return;

  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;t.id='yatu-meta-pixel';
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(w,d,'script',
  'https://connect.facebook.net/en_US/fbevents.js');

  w.fbq('consent', 'grant');
  w.fbq('init', pixelId);
  w.__yatuMetaInitialized = true;
  w.fbq('track', 'PageView');
  w.__yatuMetaPageView = w.location.pathname;
})(window, document, ${JSON.stringify(META_PIXEL_ID)}, "yatu-consent-v1", ${META_CONSENT_MAX_AGE_MS});`
  : "";

/* Capriola - display / titles. Lato - UI + body.
   Outfit stands in for Safiro (commercial); it only appears on brand boards. */
const capriola = Capriola({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-capriola",
});

const lato = Lato({
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
});

const outfit = Outfit({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

/**
 * Site-wide defaults. Every page then declares its own title, description and
 * canonical URL through pageMetadata() - see lib/site.ts.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Yatu - organiser un événement entre amis",
    template: `%s - ${SITE_NAME}`,
  },
  applicationName: SITE_NAME,
  publisher: PUBLISHER,
  authors: [{ name: PUBLISHER, url: SITE_URL }],
  creator: PUBLISHER,
  manifest: "/manifest.webmanifest",
  // Indexable by default; a page that must stay out says so through
  // pageMetadata({ index: false }). max-image-preview:large is what lets the
  // guide photos show full width in the results and in Discover.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // app/favicon.ico is picked up on its own; these cover the larger sizes.
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: { siteName: SITE_NAME, locale: "fr_FR", type: "website" },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION.trim() } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#F7F4ED",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${capriola.variable} ${lato.variable} ${outfit.variable}`}
    >
      <head>
        {META_PIXEL_HEAD_SCRIPT ? (
          <script
            id="yatu-meta-pixel-bootstrap"
            dangerouslySetInnerHTML={{__html: META_PIXEL_HEAD_SCRIPT}}
          />
        ) : null}
      </head>
      <body>
        <noscript>
          {/* site-motion.js hid elements from script; without script nothing should stay hidden. */}
          <style>{`[data-reveal],[data-fly],[data-reveal="stagger"]>*,[data-float]{opacity:1!important;transform:none!important;scale:1!important}`}</style>
        </noscript>
        <Motion />
        <Measurement />
        {/* Publisher + site identity, on every page: the pages then only have
            to declare what they are and point back to these by @id. */}
        <SiteStructuredData />
        {/* Every page in the design project imports these three - every page but
            /go, the link-in-bio page, which SiteChrome serves bare. */}
        <SiteChrome
          header={<SiteHeader />}
          footer={
            <>
              <SiteFooter />
              <BackToTop />
            </>
          }
        >
          {children}
        </SiteChrome>
        <CookieBanner />
        {/* Last in the body, and no role="main": the CSS that swaps it in
            (`body > :not(.yq-watch-unsupported)`) does not care about order,
            but anything that reads the document top-down - a crawler, a text
            extractor, a screen reader - used to meet this notice before the
            <h1>, and a second "main" landmark with it. */}
        <div className="yq-watch-unsupported">
          <span className="yq-watch-unsupported-mark" aria-hidden="true">
            Y
          </span>
          <strong>Ce site ne peut pas s’afficher sur montre connectée.</strong>
          <span>Ouvre le site sur ton téléphone ou ton ordinateur.</span>
        </div>
      </body>
    </html>
  );
}
