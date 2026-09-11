"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  CONSENT_CHANGED_EVENT,
  readConsent,
} from "@/components/consent-button";
import {
  campaignEventParameters,
  campaignFromSearch,
  measuredPageLocation,
} from "@/lib/campaign";

const GA_ID = (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-TBFPKYGBGY").trim();
const CLARITY_ID = (process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? "xvqi59gd5v").trim();
const META_PIXEL_ID = (process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "2191380281815578").trim();

type Gtag = (...args: unknown[]) => void;
type Fbq = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  loaded?: boolean;
  push?: Fbq;
  queue?: unknown[][];
  version?: string;
};

declare global {
  interface Window {
    _fbq?: Fbq;
    __yatuMetaInitialized?: boolean;
    __yatuMetaPageView?: string;
    dataLayer?: unknown[];
    fbq?: Fbq;
    gtag?: Gtag;
  }
}

/**
 * Records a confirmed waitlist signup as a Meta standard event.
 *
 * The email is deliberately not included: the browser only shares the form's
 * placement, which is enough to compare campaigns and landing-page variants.
 * Keeping the consent check here makes future callers unable to bypass the
 * choice made in the cookie panel by accident.
 */
export function trackMetaWaitlistLead(source: string) {
  if (!readConsent()?.social || !window.fbq) return;

  window.fbq("track", "Lead", {
    content_name: "Inscription waiting list",
    content_category: "waitlist",
    signup_source: source,
  });
}

/** Records the last measurable step before the visitor leaves for a store. */
export function trackStoreClick(store: "app_store" | "google_play", destination: string) {
  if (!readConsent()?.analytics || !window.gtag) return;

  window.gtag("event", "store_click", {
    store,
    link_url: destination,
    ...campaignEventParameters(window.location.search),
  });
}

function currentMeasuredLocation(pathname = window.location.pathname) {
  return measuredPageLocation(window.location.origin, pathname, window.location.search);
}

function clearCookies(matches: (name: string) => boolean) {
  const names = document.cookie
    .split(";")
    .map((entry) => entry.split("=")[0]?.trim())
    .filter((name): name is string => Boolean(name))
    .filter(matches);

  const domains = [window.location.hostname, `.${window.location.hostname}`];
  for (const name of names) {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}; SameSite=Lax`;
    }
  }
}

function clearMeasurementCookies() {
  clearCookies((name) => name === "_ga" || name.startsWith("_ga_") || name.startsWith("_cl"));
}

function clearMetaCookies() {
  clearCookies((name) => name === "_fbp" || name === "_fbc");
}

function configureGoogleAnalytics() {
  if (!/^G-[A-Z0-9]+$/i.test(GA_ID)) return false;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag =
    window.gtag ??
    (function gtag() {
      window.dataLayer?.push(arguments);
    } as Gtag);

  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("consent", "update", { analytics_storage: "granted" });
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location: currentMeasuredLocation(),
    page_path: window.location.pathname,
  });

  if (!document.getElementById("yatu-google-analytics")) {
    const script = document.createElement("script");
    script.id = "yatu-google-analytics";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
    document.head.appendChild(script);
  }

  return true;
}

/** Installs Meta's official bootstrap in document.head after social consent. */
function configureMetaPixel() {
  if (!/^\d+$/.test(META_PIXEL_ID)) return false;

  if (!window.fbq) {
    let fbq: Fbq;
    fbq = function metaPixelQueue(...args: unknown[]) {
      if (fbq.callMethod) {
        fbq.callMethod(...args);
      } else {
        fbq.queue?.push(args);
      }
    };

    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    window.fbq = fbq;
    window._fbq = fbq;
  }

  window.fbq("consent", "grant");
  if (!window.__yatuMetaInitialized) {
    window.fbq("init", META_PIXEL_ID);
    window.__yatuMetaInitialized = true;
  }

  if (!document.getElementById("yatu-meta-pixel")) {
    const script = document.createElement("script");
    script.id = "yatu-meta-pixel";
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }

  return true;
}

/** Loads measurement and advertising tools only after their respective consent. */
export function Measurement() {
  const pathname = usePathname();
  const [analyticsAllowed, setAnalyticsAllowed] = useState<boolean | null>(null);
  const [socialAllowed, setSocialAllowed] = useState<boolean | null>(null);
  const gaConfigured = useRef(false);
  const clarityConfigured = useRef(false);
  const metaConfigured = useRef(false);
  const lastAnalyticsPageView = useRef("");
  const lastQrLanding = useRef("");
  const lastMetaPageView = useRef("");

  useEffect(() => {
    const sync = () => {
      const consent = readConsent();
      setAnalyticsAllowed(Boolean(consent?.analytics));
      setSocialAllowed(Boolean(consent?.social));
    };
    sync();
    window.addEventListener(CONSENT_CHANGED_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CONSENT_CHANGED_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    if (analyticsAllowed === null) return;

    if (analyticsAllowed) {
      if (!gaConfigured.current) {
        gaConfigured.current = configureGoogleAnalytics();
      } else {
        window.gtag?.("consent", "update", { analytics_storage: "granted" });
      }

      if (CLARITY_ID && !clarityConfigured.current) {
        void import("@microsoft/clarity").then(({ default: Clarity }) => {
          if (cancelled) return;
          Clarity.init(CLARITY_ID);
          Clarity.consentV2({ ad_Storage: "denied", analytics_Storage: "granted" });
          clarityConfigured.current = true;
        });
      }
    } else {
      lastAnalyticsPageView.current = "";
      lastQrLanding.current = "";
      window.gtag?.("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });

      if (clarityConfigured.current) {
        void import("@microsoft/clarity").then(({ default: Clarity }) => {
          Clarity.consentV2({ ad_Storage: "denied", analytics_Storage: "denied" });
          Clarity.consent(false);
        });
      }
      clearMeasurementCookies();
    }

    return () => {
      cancelled = true;
    };
  }, [analyticsAllowed]);

  useEffect(() => {
    if (socialAllowed === null) return;

    if (socialAllowed) {
      if (!metaConfigured.current) {
        metaConfigured.current = configureMetaPixel();
      } else {
        window.fbq?.("consent", "grant");
      }
      // The head bootstrap already sent the initial PageView for a returning,
      // consented visitor. Adopt it so the React effect does not send it twice.
      if (window.__yatuMetaPageView) {
        lastMetaPageView.current = window.__yatuMetaPageView;
      }
    } else {
      lastMetaPageView.current = "";
      window.__yatuMetaPageView = "";
      window.fbq?.("consent", "revoke");
      clearMetaCookies();
    }
  }, [socialAllowed]);

  useEffect(() => {
    const pageLocation = currentMeasuredLocation(pathname);
    if (
      analyticsAllowed !== true ||
      !gaConfigured.current ||
      !window.gtag ||
      lastAnalyticsPageView.current === pageLocation
    ) {
      return;
    }

    lastAnalyticsPageView.current = pageLocation;
    window.gtag("event", "page_view", {
      page_path: pathname,
      page_location: pageLocation,
      page_title: document.title,
    });

    const campaign = campaignFromSearch(window.location.search);
    if (
      pathname === "/go" &&
      campaign.utm_medium?.toLowerCase() === "qr" &&
      lastQrLanding.current !== pageLocation
    ) {
      lastQrLanding.current = pageLocation;
      window.gtag("event", "qr_landing", campaignEventParameters(window.location.search));
    }
  }, [analyticsAllowed, pathname]);

  useEffect(() => {
    if (
      socialAllowed !== true ||
      !metaConfigured.current ||
      !window.fbq ||
      lastMetaPageView.current === pathname
    ) {
      return;
    }

    lastMetaPageView.current = pathname;
    window.__yatuMetaPageView = pathname;
    window.fbq("track", "PageView");
  }, [socialAllowed, pathname]);

  return null;
}
