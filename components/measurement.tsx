"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  CONSENT_CHANGED_EVENT,
  readConsent,
} from "@/components/consent-button";

const GA_ID = (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-TBFPKYGBGY").trim();
const CLARITY_ID = (process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? "xvqi59gd5v").trim();

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

function clearMeasurementCookies() {
  const names = document.cookie
    .split(";")
    .map((entry) => entry.split("=")[0]?.trim())
    .filter((name): name is string => Boolean(name))
    .filter((name) => name === "_ga" || name.startsWith("_ga_") || name.startsWith("_cl"));

  const domains = [window.location.hostname, `.${window.location.hostname}`];
  for (const name of names) {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}; SameSite=Lax`;
    }
  }
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
    page_location: new URL(window.location.pathname, window.location.origin).toString(),
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

/** Loads audience tools only after the visitor accepts the analytics category. */
export function Measurement() {
  const pathname = usePathname();
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const gaConfigured = useRef(false);
  const clarityConfigured = useRef(false);
  const lastPageView = useRef("");

  useEffect(() => {
    const sync = () => setAllowed(Boolean(readConsent()?.analytics));
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

    if (allowed === null) return;

    if (allowed) {
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
      lastPageView.current = "";
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
  }, [allowed]);

  useEffect(() => {
    if (allowed !== true || !gaConfigured.current || !window.gtag || lastPageView.current === pathname) {
      return;
    }

    lastPageView.current = pathname;
    window.gtag("event", "page_view", {
      page_path: pathname,
      page_location: new URL(pathname, window.location.origin).toString(),
      page_title: document.title,
    });
  }, [allowed, pathname]);

  return null;
}
