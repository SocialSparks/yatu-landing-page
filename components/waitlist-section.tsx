"use client";

import {AppDownloadButtons} from "@/components/app-download-buttons";
import { Countdown } from "@/components/countdown";
import { Decor } from "@/components/decor";
import { WaitlistForm } from "@/components/waitlist-form";
import { WaitlistSocialProof } from "@/components/waitlist-social-proof";
import { LAUNCH_LABEL, icon } from "@/lib/content";
import { WAITLIST_DECOR } from "@/lib/decor";
import {useHasLaunched} from "@/lib/use-launch-state";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";

export function WaitlistSection() {
  const hasLaunched = useHasLaunched();

  return (
    <section
      id="liste"
      data-r="waitlist-section"
      data-release={hasLaunched ? "post" : "pre"}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#F7F4ED",
        padding: "clamp(56px,8vw,104px) 0",
      }}
    >
      <Decor items={WAITLIST_DECOR} />

      <div
        data-r="gutter"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(320px,100%),1fr))",
          gap: "clamp(28px,4vw,56px)",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 540 }}>
          {hasLaunched ? null : <Countdown />}

          <h2
            data-reveal="up"
            style={{
              margin: 0,
              fontFamily: DISPLAY,
              fontWeight: 400,
              fontSize: "clamp(30px,4.2vw,46px)",
              lineHeight: 1.08,
              letterSpacing: "-.025em",
              color: "#2A343D",
              textWrap: "balance",
            }}
          >
            {hasLaunched ? "Yatu est disponible." : "Ton accès arrive avant l’ouverture publique."}
          </h2>

          <p
            data-reveal="up"
            data-reveal-delay="70"
            style={{
              margin: 0,
              fontFamily: UI,
              fontSize: 18,
              lineHeight: 1.5,
              color: "rgba(42,52,61,.8)",
              maxWidth: "42ch",
            }}
          >
            {hasLaunched ? (
              <>Télécharge l’appli gratuitement sur iPhone ou Android et crée ton premier événement.</>
            ) : (
              <>
                Le {LAUNCH_LABEL}, ton accès arrive par e-mail, avant l’ouverture publique. Tu
                pourras faire entrer ton groupe dans la foulée.
              </>
            )}
          </p>

          {hasLaunched ? null : <WaitlistSocialProof />}

          <div data-reveal="up" data-reveal-delay="180" style={{ width: "100%", maxWidth: 540 }}>
            {hasLaunched ? (
              <AppDownloadButtons />
            ) : (
              <WaitlistForm
                source="bas-de-page"
                note="Inscription en dix secondes, sans mot de passe."
              />
            )}
          </div>
        </div>

        <div
          data-r="waitlist-visual"
          data-reveal="scale"
          data-reveal-delay="120"
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: hasLaunched ? "flex-start" : "center",
            minHeight: hasLaunched ? "clamp(360px,42vw,480px)" : 320,
          }}
        >
          {hasLaunched ? (
            <div
              style={{
                width: "min(540px,112%)",
                height: "clamp(360px,42vw,480px)",
                overflow: "visible",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                loading="lazy"
                decoding="async"
                src="/mockups/iphone_homepage-836.webp"
                alt="L’application Yatu sur iPhone, avec les événements du groupe"
                width={418}
                height={850}
                style={{
                  width: "min(440px,100%)",
                  height: "auto",
                  alignSelf: "flex-start",
                  display: "block",
                }}
              />
            </div>
          ) : (
            <>
              <img
                loading="lazy"
                decoding="async"
                src={icon("bell")}
                alt=""
                data-float=""
                style={
                  {
                    position: "absolute",
                    left: "2%",
                    top: "12%",
                    width: 48,
                    height: 48,
                    display: "block",
                    filter: "drop-shadow(0 6px 16px rgba(42,52,61,.2))",
                    "--yq-amp": "11px",
                    "--yq-dur": "4.95s",
                    "--yq-lag": "1.87s",
                  } as React.CSSProperties
                }
              />
              <img
                loading="lazy"
                decoding="async"
                src={icon("heart")}
                alt=""
                data-float=""
                style={
                  {
                    position: "absolute",
                    left: "10%",
                    bottom: "14%",
                    width: 38,
                    height: 38,
                    display: "block",
                    filter: "drop-shadow(0 6px 16px rgba(42,52,61,.18))",
                    "--yq-amp": "13px",
                    "--yq-dur": "6.05s",
                    "--yq-lag": "0.41s",
                  } as React.CSSProperties
                }
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
