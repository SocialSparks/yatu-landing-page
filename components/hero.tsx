import { AvatarPair } from "@/components/avatar-pair";
import { DaysUntil } from "@/components/countdown";
import { Decor } from "@/components/decor";
import { WaitlistForm } from "@/components/waitlist-form";
import { icon } from "@/lib/content";
import { HERO_DECOR } from "@/lib/decor";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";

const CHIPS = [
  { dot: "#96E087", label: "Gratuit au lancement" },
  { dot: "#6FC6F1", label: "Sans publicité" },
  { dot: "#C6A8E1", label: "iOS et Android" },
];

const PILL_BASE: React.CSSProperties = {
  position: "absolute",
  zIndex: 40,
  display: "flex",
  alignItems: "center",
  gap: 10,
  background: "#FFFFFF",
  border: "1px solid #EBE7DE",
  borderRadius: 16,
  padding: "12px 16px",
  boxShadow: "0px 8px 24px 0px rgba(42,52,61,.0784)",
};

function Pill({
  tool,
  title,
  detail,
  style,
  hideOnMobile = false,
}: {
  tool: string;
  title: string;
  detail: string;
  style: React.CSSProperties;
  hideOnMobile?: boolean;
}) {
  return (
    <div data-r={hideOnMobile ? "pill mobile-hide" : "pill"} data-float="" style={{ ...PILL_BASE, ...style }}>
      <img src={icon(tool)} alt="" style={{ width: 32, height: 32, display: "block", flex: "none" }} />
      <span style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontFamily: UI, fontWeight: 700, fontSize: 14, color: "#2A343D" }}>{title}</span>
        <span style={{ fontFamily: UI, fontSize: 13, color: "#4E565D" }}>{detail}</span>
      </span>
    </div>
  );
}

export function Hero() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "clamp(24px,4vw,52px) 0 clamp(44px,6vw,72px)",
      }}
    >
      <Decor items={HERO_DECOR} />

      <div
        data-r="gutter"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(380px,100%),1fr))",
          gap: "clamp(32px,5vw,64px)",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 26, maxWidth: 620 }}>
          <span
            data-reveal="up"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              alignSelf: "flex-start",
              background: "#FFFFFF",
              border: "1px solid #EBE7DE",
              borderRadius: 999,
              padding: "9px 16px",
              fontFamily: UI,
              fontWeight: 700,
              fontSize: 13,
              color: "#2A343D",
            }}
          >
            <span
              style={{ width: 8, height: 8, borderRadius: 80, background: "#FED873", flex: "none" }}
            />
            Sortie le 9 septembre 2026
            <DaysUntil />
          </span>

          <h1
            data-reveal="up"
            data-reveal-delay="70"
            style={{
              margin: 0,
              fontFamily: DISPLAY,
              fontWeight: 400,
              fontSize: "clamp(40px,5.6vw,66px)",
              lineHeight: 1.04,
              letterSpacing: "-.028em",
              color: "#2A343D",
              textWrap: "balance",
            }}
          >
            Vos sorties, vos voyages.
            <br />
            Une seule appli.
          </h1>

          <p
            data-reveal="up"
            data-reveal-delay="120"
            style={{
              margin: 0,
              fontFamily: UI,
              fontSize: "clamp(18px,1.6vw,21px)",
              lineHeight: 1.5,
              color: "rgba(42,52,61,.85)",
              maxWidth: "46ch",
            }}
          >
            Yatu réunit tout ce qu&apos;un groupe doit décider et partager autour d&apos;un
            événement : la date, les invitations, le programme, les dépenses, les listes, les
            documents et les photos.
          </p>

          <p
            data-reveal="up"
            data-reveal-delay="155"
            style={{
              margin: 0,
              fontFamily: UI,
              fontSize: 17,
              lineHeight: 1.55,
              color: "rgba(42,52,61,.62)",
              maxWidth: "46ch",
            }}
          >
            Tu crées l&apos;événement, tu partages le lien. Chacun rejoint, tout le monde voit la
            même chose - et l&apos;organisation arrête de reposer sur une seule personne.
          </p>

          <div
            data-reveal="stagger"
            data-reveal-delay="190"
            style={{ display: "flex", flexWrap: "wrap", gap: "8px 10px" }}
          >
            {CHIPS.map((chip) => (
              <span
                key={chip.label}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  background: "#FFFFFF",
                  border: "1px solid #EBE7DE",
                  borderRadius: 999,
                  padding: "8px 14px",
                  fontFamily: UI,
                  fontWeight: 600,
                  fontSize: 13,
                  color: "#4E565D",
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: 80,
                    background: chip.dot,
                    flex: "none",
                  }}
                />
                {chip.label}
              </span>
            ))}
          </div>

          <div data-reveal="up" data-reveal-delay="230">
            <WaitlistForm source="hero" />
          </div>
        </div>

        <div
          data-r="hero-col"
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            minHeight: 620,
          }}
        >
          <div data-r="hero-mockwrap" style={{ position: "relative", width: 380, maxWidth: "100%" }}>
            <div
              data-r="hero-mock"
              data-reveal="scale"
              data-reveal-delay="100"
              data-float=""
              style={
                {
                  position: "relative",
                  width: "100%",
                  aspectRatio: "418 / 850",
                  "--yq-amp": "7px",
                  "--yq-dur": "5.50s",
                  "--yq-lag": "0.39s",
                } as React.CSSProperties
              }
            >
              <img
                src="/mockups/iphone_homepage.png"
                alt="Écran d'accueil de l'application Yatu sur iPhone"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "block",
                  filter: "drop-shadow(0 30px 40px rgba(42,52,61,.2))",
                }}
              />
            </div>

            <Pill
              tool="budget"
              title="Ta part"
              detail="45,20 €"
              hideOnMobile
              style={
                {
                  left: "clamp(-72px, calc(50vw - 100% - 20px), 0px)",
                  top: 302,
                  "--yq-amp": "10px",
                  "--yq-dur": "4.40s",
                  "--yq-lag": "1.50s",
                } as React.CSSProperties
              }
            />
            <Pill
              tool="planning"
              title="Départ vendredi"
              detail="10:00, gare de Lyon"
              hideOnMobile
              style={
                {
                  right: "clamp(-70px, calc(50vw - 100% - 20px), 0px)",
                  top: 466,
                  "--yq-amp": "8px",
                  "--yq-dur": "6.05s",
                  "--yq-lag": "0.76s",
                } as React.CSSProperties
              }
            />
            <Pill
              tool="img"
              title="128 souvenirs"
              detail="déposés par 8 amis"
              hideOnMobile
              style={
                {
                  left: "clamp(-56px, calc(50vw - 100% - 20px), 0px)",
                  bottom: 84,
                  "--yq-amp": "12px",
                  "--yq-dur": "5.50s",
                  "--yq-lag": "0.04s",
                } as React.CSSProperties
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
