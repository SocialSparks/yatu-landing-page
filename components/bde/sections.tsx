import { Decor } from "@/components/decor";
import { SectionHeading } from "@/components/section-heading";
import { SectionCta } from "@/components/section-cta";
import {
  BDE_CTA,
  BDE_FEATURES,
  BDE_PROBLEMES,
  BDE_USAGES,
  PACK_ASKS,
  PACK_INCLUDES,
} from "@/lib/bde-content";
import { ACCENT, icon } from "@/lib/content";
import { BDE_PROBLEMES_DECOR, BDE_USAGES_DECOR } from "@/lib/decor";
import { ROUTES } from "@/lib/routes";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";

/** White card with an icon, a Capriola title and a paragraph. */
function SoftCard({ tool, title, desc }: { tool: string; title: string; desc: string }) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #EBE7DE",
        borderRadius: 24,
        padding: 26,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <img loading="lazy" decoding="async" src={icon(tool)} alt="" style={{ width: 40, height: 40, display: "block" }} />
      <span
        style={{
          fontFamily: DISPLAY,
          fontSize: 19,
          lineHeight: 1.2,
          letterSpacing: "-.02em",
          color: "#2A343D",
        }}
      >
        {title}
      </span>
      <span
        style={{ fontFamily: UI, fontSize: 15, lineHeight: 1.5, color: "rgba(42,52,61,.8)" }}
      >
        {desc}
      </span>
    </div>
  );
}

export function BdeProblemes() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#EFE8DE",
        padding: "clamp(56px,8vw,104px) 0",
      }}
    >
      <Decor items={BDE_PROBLEMES_DECOR} />
      <div
        data-r="gutter"
        style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}
      >
        <SectionHeading
          badge="Ce que vivent les organisateurs"
          badgeBg={ACCENT.coral}
          title="Le problème n’est pas l’événement. C’est tout ce qu’il y a autour."
          titleMaxCh={20}
        />
        <div
          data-reveal="stagger"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(250px,100%),1fr))",
            gap: 16,
          }}
        >
          {BDE_PROBLEMES.map((p) => (
            <SoftCard key={p.title} {...p} />
          ))}
        </div>

        <SectionCta
          title="Et si tout revenait au même endroit ?"
          body="Les outils pensés pour tenir un grand groupe informé sans alourdir le travail du bureau."
          primary={{ href: ROUTES.bdeFeatures, label: BDE_CTA.features }}
          secondary={{ href: ROUTES.bdePilote, label: BDE_CTA.pilote }}
          accent={ACCENT.coral}
        />
      </div>
    </section>
  );
}

export function BdeFeatures() {
  const accents = ["#96E087", "#FED873", "#6FC6F1", "#C6A8E1", "#FF9F8E", "#96E087"];

  return (
    <section
      id="fonctionnalites"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#2A343D",
        padding: "clamp(64px,9vw,116px) 0",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 520,
          height: 520,
          borderRadius: 999,
          top: -300,
          right: -160,
          background: "rgba(111,198,241,.1)",
          filter: "blur(8px)",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 420,
          height: 420,
          borderRadius: 999,
          bottom: -260,
          left: -130,
          background: "rgba(198,168,225,.1)",
          filter: "blur(8px)",
        }}
      />

      <div
        data-r="gutter"
        style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}
      >
        <div className="yq-bde-feature-heading">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 22 }}>
            <span
              data-reveal="up"
              style={{
                display: "inline-flex",
                background: ACCENT.meadow,
                color: "#2A343D",
                borderRadius: 999,
                padding: "11px 21px",
                fontFamily: UI,
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              Les fonctionnalités BDE
            </span>
            <h2
              data-reveal="up"
              data-reveal-delay="70"
              style={{
                margin: 0,
                maxWidth: "18ch",
                fontFamily: DISPLAY,
                fontWeight: 400,
                fontSize: "clamp(36px,5vw,58px)",
                lineHeight: 1.06,
                letterSpacing: "-.027em",
                color: "#FFFFFF",
                textWrap: "balance",
              }}
            >
              Tout reste clair, même à deux cents.
            </h2>
          </div>

          <div data-reveal="right" data-reveal-delay="120" className="yq-bde-feature-summary">
            <div style={{ display: "flex", alignItems: "center" }}>
              {BDE_FEATURES.map((feature, index) => (
                <span
                  key={feature.title}
                  style={{
                    width: 42,
                    height: 42,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: "none",
                    marginLeft: index === 0 ? 0 : -8,
                    background: "#FFFFFF",
                    border: "2px solid #2A343D",
                    borderRadius: 14,
                    position: "relative",
                    zIndex: BDE_FEATURES.length - index,
                  }}
                >
                  <img loading="lazy" decoding="async" src={icon(feature.tool)} alt="" style={{ width: 28, height: 28, display: "block" }} />
                </span>
              ))}
            </div>
            <p
              style={{
                margin: 0,
                fontFamily: UI,
                fontSize: 16,
                lineHeight: 1.55,
                color: "rgba(255,255,255,.72)",
                textWrap: "pretty",
              }}
            >
              Six outils reliés au même événement : ton bureau garde la main, et chaque participant
              regarde la même information.
            </p>
          </div>
        </div>

        <div data-reveal="stagger" className="yq-bde-feature-grid">
          {BDE_FEATURES.map((f, index) => {
            const accent = accents[index];

            return (
              <div
                key={f.title}
                className="yq-bde-feature-card"
                style={
                  {
                    "--yq-feature-accent": accent,
                  } as React.CSSProperties
                }
              >
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    width: 180,
                    height: 180,
                    right: -70,
                    bottom: -100,
                    borderRadius: 999,
                    background: accent,
                    opacity: 0.08,
                  }}
                />

                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                  }}
                >
                  <span
                    style={{
                      width: 52,
                      height: 52,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#FFFFFF",
                      borderRadius: 16,
                      boxShadow: "0 10px 28px rgba(0,0,0,.14)",
                    }}
                  >
                    <img
                      loading="lazy"
                      decoding="async"
                      src={icon(f.tool)}
                      alt=""
                      style={{ width: 36, height: 36, display: "block" }}
                    />
                  </span>
                  <span
                    style={{
                      fontFamily: DISPLAY,
                      fontSize: 14,
                      letterSpacing: ".08em",
                      color: accent,
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3
                  style={{
                    position: "relative",
                    margin: 0,
                    fontFamily: DISPLAY,
                    fontWeight: 400,
                    fontSize: "clamp(20px,2.2vw,25px)",
                    lineHeight: 1.18,
                    letterSpacing: "-.02em",
                    color: "#FFFFFF",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    position: "relative",
                    margin: 0,
                    maxWidth: "54ch",
                    fontFamily: UI,
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: "rgba(255,255,255,.7)",
                    textWrap: "pretty",
                  }}
                >
                  {f.desc}
                </p>
                <span
                  aria-hidden="true"
                  style={{
                    position: "relative",
                    width: 48,
                    height: 3,
                    marginTop: "auto",
                    borderRadius: 999,
                    background: accent,
                  }}
                />
              </div>
            );
          })}
        </div>

        <SectionCta
          title="Tu veux voir ce que ça donne sur ton prochain événement ?"
          body="On te montre le parcours complet avec tes contraintes, ton volume et ton calendrier."
          primary={{ href: ROUTES.bdeDemo, label: BDE_CTA.demo }}
          secondary={{ href: ROUTES.bdePilote, label: BDE_CTA.pilote }}
          onDark
          accent={ACCENT.meadow}
        />
      </div>
    </section>
  );
}

export function BdeUsages() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#F7F4ED",
        padding: "clamp(56px,8vw,104px) 0",
      }}
    >
      <Decor items={BDE_USAGES_DECOR} />
      <div
        data-r="gutter"
        style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}
      >
        <SectionHeading
          badge="Les cas d’usage"
          badgeBg={ACCENT.blush}
          title="Là où un BDE perd le plus de temps."
          titleMaxCh={18}
        />
        <div
          data-reveal="stagger"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(230px,100%),1fr))",
            gap: 16,
          }}
        >
          {BDE_USAGES.map((u) => (
            <SoftCard key={u.title} {...u} />
          ))}
        </div>

        <SectionCta
          title="Ton prochain événement ressemble à l’un de ceux-là ?"
          body="Explique-nous ton organisation actuelle, on te dira où Yatu peut vous faire gagner du temps. Tu organises entre amis plutôt qu’en asso ? La page d’accueil est faite pour ça."
          primary={{ href: ROUTES.bdeDemo, label: BDE_CTA.demo }}
          secondary={{ href: ROUTES.home, label: BDE_CTA.amis }}
          accent={ACCENT.blush}
        />
      </div>
    </section>
  );
}

function PackList({
  items,
  dotColor,
  color,
}: {
  items: string[];
  dotColor: string;
  color: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
      {items.map((item) => (
        <span
          key={item}
          style={{
            display: "flex",
            gap: 11,
            alignItems: "flex-start",
            fontFamily: UI,
            fontSize: 16,
            lineHeight: 1.45,
            color,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 80,
              background: dotColor,
              flex: "none",
              marginTop: 8,
            }}
          />
          {item}
        </span>
      ))}
    </div>
  );
}

export function BdePilote() {
  return (
    <section id="pilote" style={{ background: "#FFFFFF", padding: "clamp(56px,8vw,104px) 0" }}>
      <div data-r="gutter" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <SectionHeading
          badge="Le programme pilote"
          badgeBg={ACCENT.sunbeam}
          title="Pack BDE pilote : gratuit, avant le lancement."
          titleMaxCh={20}
          ledeMaxCh={48}
          lede="On ouvre Yatu à quelques BDE pour leur prochain événement. Tu utilises tout, gratuitement, avec l’équipe au bout du fil. En échange, on apprend de ton organisation."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(320px,100%),1fr))",
            gap: 20,
          }}
        >
          <div
            data-reveal="left"
            style={{
              background: "#F7F4ED",
              border: "1px solid #EBE7DE",
              borderRadius: 28,
              padding: "clamp(24px,3vw,36px)",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img
                loading="lazy"
                decoding="async"
                src={icon("people")}
                alt=""
                style={{ width: 40, height: 40, display: "block", flex: "none" }}
              />
              <span
                style={{
                  fontFamily: DISPLAY,
                  fontSize: 22,
                  lineHeight: 1.2,
                  letterSpacing: "-.02em",
                  color: "#2A343D",
                }}
              >
                Ce que le pack inclut
              </span>
            </div>
            <PackList items={PACK_INCLUDES} dotColor="#96E087" color="#2A343D" />
          </div>

          <div
            data-reveal="right"
            style={{
              background: "#2A343D",
              borderRadius: 28,
              padding: "clamp(24px,3vw,36px)",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img
                loading="lazy"
                decoding="async"
                src={icon("send")}
                alt=""
                style={{ width: 40, height: 40, display: "block", flex: "none" }}
              />
              <span
                style={{
                  fontFamily: DISPLAY,
                  fontSize: 22,
                  lineHeight: 1.2,
                  letterSpacing: "-.02em",
                  color: "#FFFFFF",
                }}
              >
                Ce qu’on te demande en échange
              </span>
            </div>
            <PackList items={PACK_ASKS} dotColor="#FED873" color="rgba(255,255,255,.85)" />
            <p
              style={{
                margin: "auto 0 0",
                fontFamily: UI,
                fontSize: 14,
                lineHeight: 1.5,
                color: "rgba(255,255,255,.55)",
                textWrap: "pretty",
              }}
            >
              Les statistiques d’usage sont agrégées et anonymes : nombre d’événements, taux de
              participation, fonctionnalités utilisées. Jamais le contenu des discussions.
            </p>
          </div>
        </div>

        <SectionCta
          title="Le prochain BDE pilote peut être le tien."
          body="Le pack est gratuit, sans engagement, et accompagné directement par l’équipe Yatu."
          primary={{ href: ROUTES.bdeDemo, label: BDE_CTA.demo }}
          accent={ACCENT.sunbeam}
        />
      </div>
    </section>
  );
}
