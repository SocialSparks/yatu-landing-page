import {AppDownloadButtons} from "@/components/app-download-buttons";
import {Decor} from "@/components/decor";
import {UserSocialProof} from "@/components/user-social-proof";
import {DOWNLOAD_DECOR} from "@/lib/decor";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";

export function DownloadSection() {
  return (
    <section
      id="telecharger"
      data-r="download-section"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#F7F4ED",
        padding: "clamp(56px,8vw,104px) 0",
      }}
    >
      <Decor items={DOWNLOAD_DECOR} />

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
            Yatu est disponible.
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
            Télécharge l’appli gratuitement sur iPhone ou Android et crée ton premier événement.
          </p>

          <div data-reveal="up" data-reveal-delay="130">
            <UserSocialProof />
          </div>

          <div data-reveal="up" data-reveal-delay="180" style={{ width: "100%", maxWidth: 540 }}>
            <AppDownloadButtons />
          </div>
        </div>

        <div
          data-r="download-visual"
          data-reveal="scale"
          data-reveal-delay="120"
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            minHeight: "clamp(360px,42vw,480px)",
          }}
        >
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
        </div>
      </div>
    </section>
  );
}
