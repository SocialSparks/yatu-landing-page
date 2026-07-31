import { Decor } from "@/components/decor";
import { SectionHeading } from "@/components/section-heading";
import {
  BDE_FEATURES,
  BDE_PROBLEMES,
  BDE_USAGES,
  PACK_ASKS,
  PACK_INCLUDES,
} from "@/lib/bde-content";
import { ACCENT, icon } from "@/lib/content";
import { BDE_PROBLEMES_DECOR, BDE_USAGES_DECOR } from "@/lib/decor";

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
      <img src={icon(tool)} alt="" style={{ width: 40, height: 40, display: "block" }} />
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
          title="Le problème n'est pas l'événement. C'est tout ce qu'il y a autour."
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
      </div>
    </section>
  );
}

export function BdeFeatures() {
  return (
    <section style={{ background: "#2A343D", padding: "clamp(56px,8vw,104px) 0" }}>
      <div data-r="gutter" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <SectionHeading
          badge="Les fonctionnalités BDE"
          badgeBg={ACCENT.meadow}
          title="Ce que l'app fait en plus quand vous êtes deux cents."
          titleMaxCh={20}
          onDark
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(240px,100%),1fr))",
            gap: 16,
          }}
        >
          {BDE_FEATURES.map((f) => (
            <div
              key={f.title}
              data-fly={f.fly}
              data-reveal-delay={f.delay || undefined}
              className="yq-lift"
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.1)",
                borderRadius: 16,
                padding: 26,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <img src={icon(f.tool)} alt="" style={{ width: 40, height: 40, display: "block" }} />
              <span
                style={{
                  fontFamily: DISPLAY,
                  fontSize: 19,
                  lineHeight: 1.2,
                  letterSpacing: "-.02em",
                  color: "#FFFFFF",
                }}
              >
                {f.title}
              </span>
              <span
                style={{
                  fontFamily: UI,
                  fontSize: 15,
                  lineHeight: 1.45,
                  color: "rgba(255,255,255,.7)",
                }}
              >
                {f.desc}
              </span>
            </div>
          ))}
        </div>
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
          badge="Les cas d'usage"
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
          title="Pack BDE Pilote - gratuit, avant le lancement."
          titleMaxCh={20}
          ledeMaxCh={48}
          lede="On ouvre Yatu à un petit nombre de BDE sur leur prochain événement. Vous utilisez tout, gratuitement, avec nous au bout du fil. En retour, on apprend de vous."
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
                Ce qu&apos;on vous demande en retour
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
              Les statistiques d&apos;usage sont agrégées et anonymes : nombre d&apos;événements,
              taux de participation, fonctionnalités utilisées. Jamais le contenu des conversations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
