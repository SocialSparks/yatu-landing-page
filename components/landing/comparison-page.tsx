import { AppDownloadButtons } from "@/components/app-download-buttons";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Decor } from "@/components/decor";
import { FaqSection } from "@/components/faq-section";
import { RelatedCard } from "@/components/landing/guide-page";
import { NavLink } from "@/components/nav-link";
import { Picture } from "@/components/picture";
import { SectionCta } from "@/components/section-cta";
import { SectionHeading } from "@/components/section-heading";
import { ComparisonStructuredData } from "@/components/structured-data";
import { type ComparedApp, type ComparisonPage as ComparisonPageData, appAnchor } from "@/lib/comparison-content";
import { ACCENT, CTA } from "@/lib/content";
import { USAGES_DECOR } from "@/lib/decor";
import { landingPath } from "@/lib/landing-content";
import { HOME_CRUMB, ROUTES } from "@/lib/routes";
import { CONTACT_EMAIL, formatDateFr } from "@/lib/site";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";

const GUTTER: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  maxWidth: 1120,
  margin: "0 auto",
  padding: "0 24px",
};

const BODY: React.CSSProperties = {
  margin: 0,
  fontFamily: UI,
  fontSize: 16.5,
  lineHeight: 1.65,
  color: "rgba(42,52,61,.8)",
  textWrap: "pretty",
};

const LABEL: React.CSSProperties = {
  fontFamily: UI,
  fontWeight: 700,
  fontSize: 13,
  letterSpacing: ".06em",
  textTransform: "uppercase",
  color: "rgba(42,52,61,.55)",
};

/** A comparison hangs off the home page: it is not one of the guides /organiser lists. */
export const comparisonTrail = (page: ComparisonPageData) => [
  HOME_CRUMB,
  { name: page.cardTitle, path: landingPath(page.slug) },
];

function BulletList({ items, marker }: { items: string[]; marker: string }) {
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
      {items.map((item) => (
        <li
          key={item}
          style={{
            display: "flex",
            gap: 10,
            fontFamily: UI,
            fontSize: 15.5,
            lineHeight: 1.55,
            color: "rgba(42,52,61,.78)",
            textWrap: "pretty",
          }}
        >
          <span aria-hidden="true" style={{ flex: "none", fontWeight: 700, color: "#2A343D" }}>
            {marker}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * One product, told the same way whoever makes it: what it is, who it fits,
 * what it does, what it does not, what it costs - and where each of those was
 * read. Yatu's card carries the store buttons; the others carry their sources.
 */
function AppCard({ app, accent }: { app: ComparedApp; accent: string }) {
  return (
    <li
      id={appAnchor(app.name)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        background: app.isYatu ? "#FFFBEF" : "#FFFFFF",
        border: "1px solid #EBE7DE",
        borderLeft: `4px solid ${app.isYatu ? accent : "#EBE7DE"}`,
        borderRadius: 22,
        padding: "24px 26px",
        scrollMarginTop: 100,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h3
          style={{
            margin: 0,
            fontFamily: DISPLAY,
            fontWeight: 400,
            fontSize: 24,
            lineHeight: 1.15,
            letterSpacing: "-.02em",
            color: "#2A343D",
          }}
        >
          {app.name}
        </h3>
        <p style={{ ...BODY, fontSize: 16 }}>{app.summary}</p>
      </div>

      <p style={{ ...BODY, fontSize: 15.5 }}>
        <strong style={{ color: "#2A343D" }}>Pour qui : </strong>
        {app.bestFor}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(260px,100%),1fr))",
          gap: "16px 28px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={LABEL}>Ce qu’elle fait bien</span>
          <BulletList items={app.strengths} marker="+" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={LABEL}>Ses limites</span>
          <BulletList items={app.limits} marker="–" />
        </div>
      </div>

      <dl
        style={{
          margin: 0,
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "6px 16px",
          fontFamily: UI,
          fontSize: 15,
          lineHeight: 1.5,
        }}
      >
        <dt style={{ fontWeight: 700, color: "#2A343D" }}>Prix</dt>
        <dd style={{ margin: 0, color: "rgba(42,52,61,.78)" }}>{app.price}</dd>
        <dt style={{ fontWeight: 700, color: "#2A343D" }}>Plateformes</dt>
        <dd style={{ margin: 0, color: "rgba(42,52,61,.78)" }}>{app.platforms}</dd>
      </dl>

      {app.isYatu ? <AppDownloadButtons /> : null}

      {app.sources.length > 0 ? (
        <p style={{ margin: 0, fontFamily: UI, fontSize: 13.5, lineHeight: 1.55, color: "rgba(42,52,61,.6)" }}>
          Sources :{" "}
          {app.sources.map((source, i) => (
            <span key={source.href}>
              {i > 0 ? ", " : null}
              <a
                href={source.href}
                rel="noopener nofollow"
                target="_blank"
                style={{ color: "rgba(42,52,61,.75)" }}
              >
                {source.label}
              </a>
            </span>
          ))}
        </p>
      ) : null}
    </li>
  );
}

/**
 * The shape every comparison takes: the question, the short answer, the table,
 * which tool for which need, each product in detail, how the comparison was
 * made, the questions, and the pages next door.
 *
 * Everything the structured data quotes is printed here - the answer, the list
 * of products, the FAQ.
 */
export function ComparisonPage({ page }: { page: ComparisonPageData }) {
  const trail = comparisonTrail(page);

  return (
    <main style={{ background: "#F7F4ED" }}>
      <ComparisonStructuredData page={page} trail={trail} />

      {/* ── La question ──────────────────────────────────────────────── */}
      <section style={{ position: "relative", overflow: "hidden", padding: "clamp(28px,4vw,44px) 0 clamp(48px,7vw,88px)" }}>
        <Decor items={USAGES_DECOR} />

        <div data-r="gutter" style={GUTTER}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 14px" }}>
            <Breadcrumbs trail={trail} />
            <time dateTime={page.updated} style={{ fontFamily: UI, fontSize: 14, color: "rgba(42,52,61,.5)" }}>
              Mis à jour le {formatDateFr(page.updated)}
            </time>
          </div>

          <div
            data-r="guide-hero"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,1.05fr) minmax(0,.95fr)",
              gap: "clamp(28px,4vw,56px)",
              alignItems: "center",
              marginTop: 28,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <span
                style={{
                  alignSelf: "flex-start",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  background: page.accent,
                  color: "#2A343D",
                  borderRadius: 999,
                  padding: "11px 21px",
                  fontFamily: UI,
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                {page.badge}
              </span>

              <h1
                style={{
                  margin: 0,
                  fontFamily: DISPLAY,
                  fontWeight: 400,
                  fontSize: "clamp(32px,4.6vw,54px)",
                  lineHeight: 1.08,
                  letterSpacing: "-.028em",
                  color: "#2A343D",
                  textWrap: "balance",
                }}
              >
                {page.h1}
              </h1>

              <p
                style={{
                  margin: 0,
                  fontFamily: UI,
                  fontSize: 18,
                  lineHeight: 1.55,
                  color: "rgba(42,52,61,.8)",
                  maxWidth: "56ch",
                  textWrap: "pretty",
                }}
              >
                {page.lede}
              </p>

              {/* Said up front, before a single product is named. */}
              <p style={{ margin: 0, fontFamily: UI, fontSize: 14.5, lineHeight: 1.5, color: "rgba(42,52,61,.6)" }}>
                Comparatif rédigé par l’équipe Yatu. Informations vérifiées le{" "}
                {formatDateFr(page.checked)} sur les sites et fiches officielles de chaque application.
              </p>
            </div>

            <div
              style={{
                position: "relative",
                borderRadius: 28,
                overflow: "hidden",
                border: "1px solid #EBE7DE",
                background: "#EFE8DE",
                aspectRatio: "4 / 3",
              }}
            >
              <Picture
                src={page.photo}
                alt={page.photoAlt}
                widths={[480, 1040]}
                sizes="(max-width: 920px) 100vw, 520px"
                priority
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── La réponse courte ────────────────────────────────────────── */}
      <section style={{ background: "#FFFFFF", padding: "clamp(56px,8vw,96px) 0" }}>
        <div data-r="gutter" style={GUTTER}>
          <SectionHeading
            badge="La réponse courte"
            badgeBg={page.accent}
            title={page.answerTitle}
            titleMaxCh={26}
            marginBottom="clamp(28px,4vw,40px)"
          />
          <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
            {page.answer.map((paragraph) => (
              <p key={paragraph} style={BODY}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Le tableau ───────────────────────────────────────────────── */}
      <section style={{ background: "#EFE8DE", padding: "clamp(56px,8vw,96px) 0" }}>
        <div data-r="gutter" style={GUTTER}>
          <SectionHeading
            badge="Le comparatif"
            badgeBg="#FFFFFF"
            title={page.tableTitle}
            lede={page.tableLede}
            titleMaxCh={24}
            ledeMaxCh={56}
            marginBottom="clamp(30px,4vw,48px)"
          />

          <div className="yq-table-wrap">
            <table className="yq-table yq-table-compare">
              <caption>Vérifié le {formatDateFr(page.checked)}. Les sources sont détaillées plus bas.</caption>
              <thead>
                <tr>
                  <th scope="col">Critère</th>
                  {page.apps.map((app) => (
                    <th key={app.name} scope="col" className={app.isYatu ? "yq-col-yatu" : undefined}>
                      {app.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {page.rows.map((row) => (
                  <tr key={row.criterion}>
                    <th scope="row">{row.criterion}</th>
                    {row.cells.map((cell, i) => (
                      <td key={page.apps[i]?.name ?? i} className={page.apps[i]?.isYatu ? "yq-col-yatu" : undefined}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Quel outil pour quel besoin ──────────────────────────────── */}
      <section style={{ background: "#F7F4ED", padding: "clamp(56px,8vw,96px) 0" }}>
        <div data-r="gutter" style={GUTTER}>
          <SectionHeading
            badge="Selon ton besoin"
            badgeBg={ACCENT.sunbeam}
            title={page.choiceTitle}
            titleMaxCh={24}
            marginBottom="clamp(30px,4vw,48px)"
          />

          <ul
            data-reveal="stagger"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              margin: "0 auto",
              padding: 0,
              maxWidth: 860,
              listStyle: "none",
            }}
          >
            {page.choices.map((choice) => (
              <li
                key={choice.need}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  background: "#FFFFFF",
                  border: "1px solid #EBE7DE",
                  borderRadius: 20,
                  padding: "20px 24px",
                }}
              >
                <span style={{ fontFamily: DISPLAY, fontSize: 19, lineHeight: 1.25, letterSpacing: "-.02em", color: "#2A343D" }}>
                  {choice.need}
                </span>
                <span style={{ fontFamily: UI, fontSize: 15.5, lineHeight: 1.55, color: "rgba(42,52,61,.75)", textWrap: "pretty" }}>
                  {choice.pick}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Chaque application en détail ─────────────────────────────── */}
      <section style={{ background: "#FFFFFF", padding: "clamp(56px,8vw,96px) 0" }}>
        <div data-r="gutter" style={GUTTER}>
          <SectionHeading
            badge="En détail"
            badgeBg={ACCENT.sky}
            title={page.detailTitle}
            titleMaxCh={24}
            marginBottom="clamp(30px,4vw,48px)"
          />

          <ul style={{ display: "flex", flexDirection: "column", gap: 16, margin: "0 auto", padding: 0, maxWidth: 900, listStyle: "none" }}>
            {page.apps.map((app) => (
              <AppCard key={app.name} app={app} accent={page.accent} />
            ))}
          </ul>
        </div>
      </section>

      {/* ── La méthode ───────────────────────────────────────────────── */}
      <section style={{ background: "#F7F4ED", padding: "clamp(56px,8vw,96px) 0" }}>
        <div data-r="gutter" style={GUTTER}>
          <SectionHeading
            badge="Transparence"
            badgeBg={ACCENT.lilac}
            title="Comment ce comparatif a été fait"
            titleMaxCh={22}
            marginBottom="clamp(28px,4vw,40px)"
          />
          <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", flexDirection: "column", gap: 14 }}>
            {page.method.map((paragraph) => (
              <p key={paragraph} style={{ ...BODY, fontSize: 15.5, color: "rgba(42,52,61,.72)" }}>
                {paragraph}
              </p>
            ))}
            <p style={{ ...BODY, fontSize: 15.5, color: "rgba(42,52,61,.72)" }}>
              Une information a changé ? Écris-nous à{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "#2A343D" }}>
                {CONTACT_EMAIL}
              </a>
              {" "}: nous corrigeons la page et sa date de vérification.
            </p>
          </div>

          <SectionCta
            title="Envie d’essayer Yatu ?"
            body="Gratuit sur iPhone et Android. Crée un événement et invite ton groupe."
            primary={{ href: ROUTES.telecharger, label: CTA.download }}
            secondary={{ href: ROUTES.fonctionnement, label: CTA.demo }}
            accent={page.accent}
          />
        </div>
      </section>

      {/* ── Les questions ────────────────────────────────────────────── */}
      <FaqSection items={page.faq} title="Les questions qu’on nous pose" />

      {/* ── À lire aussi ─────────────────────────────────────────────── */}
      <section style={{ background: "#F7F4ED", padding: "clamp(56px,8vw,96px) 0" }}>
        <div data-r="gutter" style={GUTTER}>
          <SectionHeading
            badge="À lire ensuite"
            badgeBg={ACCENT.blush}
            title="À lire aussi"
            titleMaxCh={20}
            marginBottom="clamp(30px,4vw,48px)"
          />

          <div
            data-reveal="stagger"
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(240px,100%),1fr))", gap: 14 }}
          >
            {page.related.map((slug) => (
              <RelatedCard key={slug} slug={slug} />
            ))}
          </div>

          <p
            style={{
              margin: "clamp(28px,4vw,40px) 0 0",
              textAlign: "center",
              fontFamily: UI,
              fontSize: 16,
              lineHeight: 1.5,
              color: "rgba(42,52,61,.66)",
            }}
          >
            <NavLink href={ROUTES.organiser} style={{ color: "#2A343D" }}>
              Voir tous les guides d’organisation
            </NavLink>
          </p>
        </div>
      </section>
    </main>
  );
}
