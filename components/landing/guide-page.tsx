import { Breadcrumbs } from "@/components/breadcrumbs";
import { Decor } from "@/components/decor";
import { FaqSection } from "@/components/faq-section";
import { NavLink } from "@/components/nav-link";
import { Picture } from "@/components/picture";
import { SectionCta } from "@/components/section-cta";
import { SectionHeading } from "@/components/section-heading";
import { LandingStructuredData } from "@/components/structured-data";
import { WaitlistForm } from "@/components/waitlist-form";
import { ACCENT, CTA, LAUNCH_LABEL, MODULES, icon } from "@/lib/content";
import { USAGES_DECOR } from "@/lib/decor";
import {
  type LandingCounterpart,
  type LandingPage,
  landingBySlug,
  landingPath,
} from "@/lib/landing-content";
import { GUIDES_CRUMB, HOME_CRUMB, ROUTES } from "@/lib/routes";
import { formatDateFr } from "@/lib/site";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";

const GUTTER: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  maxWidth: 1120,
  margin: "0 auto",
  padding: "0 24px",
};

/**
 * The trail shown on the page and marked up as a BreadcrumbList. An "app" page
 * hangs off the home page, not off /organiser: it is not one of the guides that
 * index lists.
 */
export const guideTrail = (page: LandingPage) =>
  page.kind === "guide"
    ? [HOME_CRUMB, GUIDES_CRUMB, { name: page.cardTitle, path: landingPath(page.slug) }]
    : [HOME_CRUMB, { name: page.cardTitle, path: landingPath(page.slug) }];

function Pain({ pain }: { pain: LandingPage["pains"][number] }) {
  return (
    <li
      className="yq-lift"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        background: "#FFFFFF",
        border: "1px solid #EBE7DE",
        borderRadius: 22,
        padding: 24,
      }}
    >
      <img
        loading="lazy"
        decoding="async"
        src={icon(pain.tool)}
        alt=""
        width={38}
        height={38}
        style={{ width: 38, height: 38, display: "block" }}
      />
      <h3
        style={{
          margin: 0,
          fontFamily: DISPLAY,
          fontWeight: 400,
          fontSize: 21,
          lineHeight: 1.2,
          letterSpacing: "-.02em",
          color: "#2A343D",
        }}
      >
        {pain.title}
      </h3>
      <p
        style={{
          margin: 0,
          fontFamily: UI,
          fontSize: 15.5,
          lineHeight: 1.55,
          color: "rgba(42,52,61,.72)",
          textWrap: "pretty",
        }}
      >
        {pain.desc}
      </p>
    </li>
  );
}

function Step({ step, index, accent }: { step: LandingPage["steps"][number]; index: number; accent: string }) {
  return (
    <li
      id={`etape-${index + 1}`}
      style={{
        display: "flex",
        gap: 18,
        background: "#FFFFFF",
        border: "1px solid #EBE7DE",
        borderRadius: 22,
        padding: "24px 26px",
        scrollMarginTop: 100,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          flex: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 42,
          height: 42,
          borderRadius: 999,
          background: accent,
          fontFamily: DISPLAY,
          fontSize: 19,
          color: "#2A343D",
        }}
      >
        {index + 1}
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        <h3
          style={{
            margin: 0,
            fontFamily: DISPLAY,
            fontWeight: 400,
            fontSize: 22,
            lineHeight: 1.2,
            letterSpacing: "-.02em",
            color: "#2A343D",
          }}
        >
          {step.title}
        </h3>
        <p
          style={{
            margin: 0,
            fontFamily: UI,
            fontSize: 16,
            lineHeight: 1.6,
            color: "rgba(42,52,61,.78)",
            maxWidth: "68ch",
            textWrap: "pretty",
          }}
        >
          {step.body}
        </p>
      </span>
    </li>
  );
}

/**
 * The link to the other half of the pair, with an anchor that says what is on
 * the other end. A guide and its "application pour X" page answer neighbouring
 * queries; without this block, the only thing telling them apart is the copy.
 */
function Counterpart({ counterpart, accent }: { counterpart: LandingCounterpart; accent: string }) {
  const target = landingBySlug(counterpart.slug);
  if (!target) return null;

  return (
    <div
      data-reveal="up"
      style={{
        marginTop: "clamp(28px,4vw,40px)",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        background: "#F7F4ED",
        border: "1px solid #EBE7DE",
        borderLeft: `4px solid ${accent}`,
        borderRadius: 20,
        padding: "24px 26px",
      }}
    >
      <span
        style={{
          fontFamily: UI,
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: ".06em",
          textTransform: "uppercase",
          color: "rgba(42,52,61,.55)",
        }}
      >
        {counterpart.kicker}
      </span>
      <p
        style={{
          margin: 0,
          fontFamily: DISPLAY,
          fontSize: "clamp(21px,2.6vw,27px)",
          lineHeight: 1.2,
          letterSpacing: "-.02em",
          color: "#2A343D",
        }}
      >
        <NavLink href={landingPath(target.slug)} style={{ color: "#2A343D" }}>
          {counterpart.label}
        </NavLink>
      </p>
      <p
        style={{
          margin: 0,
          fontFamily: UI,
          fontSize: 15.5,
          lineHeight: 1.55,
          color: "rgba(42,52,61,.72)",
          maxWidth: "70ch",
          textWrap: "pretty",
        }}
      >
        {counterpart.body}
      </p>
    </div>
  );
}

function RelatedCard({ slug }: { slug: string }) {
  const page = landingBySlug(slug);
  if (!page) return null;

  return (
    <NavLink
      href={landingPath(page.slug)}
      className="yq-lift"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        background: "#FFFFFF",
        border: "1px solid #EBE7DE",
        borderRadius: 22,
        padding: 22,
        textDecoration: "none",
      }}
    >
      <img
        loading="lazy"
        decoding="async"
        src={page.icon}
        alt=""
        width={34}
        height={34}
        style={{ width: 34, height: 34, display: "block" }}
      />
      <span
        style={{
          fontFamily: DISPLAY,
          fontSize: 19,
          lineHeight: 1.2,
          letterSpacing: "-.02em",
          color: "#2A343D",
        }}
      >
        {page.cardTitle}
      </span>
      <span style={{ fontFamily: UI, fontSize: 14.5, lineHeight: 1.5, color: "rgba(42,52,61,.66)" }}>
        {page.cardSub}
      </span>
    </NavLink>
  );
}

/**
 * The shape every occasion guide takes: the promise and the signup, what goes
 * wrong, the method, the Yatu modules that carry it, the questions, and the
 * guides next door.
 *
 * The page is one <h1> followed by <h2> sections, each step and each answer
 * visible in the markup - the structured data quotes this page, it never adds
 * to it.
 */
export function GuidePage({ page }: { page: LandingPage }) {
  const trail = guideTrail(page);
  // moduleNotes replaces the canonical MODULES sentence where a page would
  // otherwise print the same paragraph as the page it competes with.
  const modules = page.modules
    .map((key) => MODULES.find((module) => module.key === key))
    .filter((module): module is (typeof MODULES)[number] => Boolean(module))
    .map((module) => ({ ...module, desc: page.moduleNotes?.[module.key] ?? module.desc }));

  return (
    <main style={{ background: "#F7F4ED" }}>
      <LandingStructuredData page={page} trail={trail} />

      {/* ── Promesse ─────────────────────────────────────────────────── */}
      <section style={{ position: "relative", overflow: "hidden", padding: "clamp(28px,4vw,44px) 0 clamp(48px,7vw,88px)" }}>
        <Decor items={USAGES_DECOR} />

        <div data-r="gutter" style={GUTTER}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "6px 14px",
            }}
          >
            <Breadcrumbs trail={trail} />
            {/* The date the Article markup quotes - printed, not just declared. */}
            <time
              dateTime={page.updated}
              style={{ fontFamily: UI, fontSize: 14, color: "rgba(42,52,61,.5)" }}
            >
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
                  fontSize: "clamp(34px,5vw,58px)",
                  lineHeight: 1.06,
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

              <WaitlistForm
                source={page.slug}
                note={`Yatu ouvre le ${LAUNCH_LABEL}. Laisse ton adresse, on te prévient le jour même.`}
              />
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
              {/* Above the fold on this page: fetched first, never deferred. */}
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

      {/* ── Ce qui coince ────────────────────────────────────────────── */}
      <section style={{ background: "#FFFFFF", padding: "clamp(56px,8vw,96px) 0" }}>
        <div data-r="gutter" style={GUTTER}>
          <SectionHeading
            badge="Le problème"
            badgeBg={ACCENT.sandDeep}
            title={page.painsTitle}
            titleMaxCh={24}
            marginBottom="clamp(34px,4.5vw,56px)"
          />

          <ul
            data-reveal="stagger"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(260px,100%),1fr))",
              gap: 16,
              margin: 0,
              padding: 0,
              listStyle: "none",
            }}
          >
            {page.pains.map((pain) => (
              <Pain key={pain.title} pain={pain} />
            ))}
          </ul>
        </div>
      </section>

      {/* ── Les écrans ───────────────────────────────────────────────── */}
      {page.screens ? (
        <section style={{ background: "#EFE8DE", padding: "clamp(56px,8vw,96px) 0" }}>
          <div data-r="gutter" style={GUTTER}>
            <SectionHeading
              badge="L’application"
              badgeBg="#FFFFFF"
              title={page.screensTitle ?? "À quoi ça ressemble"}
              lede={page.screensLede}
              titleMaxCh={22}
              marginBottom="clamp(30px,4vw,48px)"
            />

            <ul
              data-reveal="stagger"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(220px,100%),1fr))",
                gap: "clamp(24px,4vw,40px)",
                margin: "0 auto",
                padding: 0,
                maxWidth: 900,
                listStyle: "none",
              }}
            >
              {page.screens.map((screen) => (
                <li
                  key={screen.label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 12,
                    textAlign: "center",
                  }}
                >
                  <Picture
                    src={screen.src}
                    alt={screen.alt}
                    widths={[418, 836]}
                    sizes="(max-width: 760px) 62vw, 260px"
                    width={418}
                    height={850}
                    style={{
                      width: "100%",
                      maxWidth: 260,
                      height: "auto",
                      display: "block",
                      filter: "drop-shadow(0 22px 32px rgba(42,52,61,.18))",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: DISPLAY,
                      fontSize: 19,
                      lineHeight: 1.2,
                      letterSpacing: "-.02em",
                      color: "#2A343D",
                    }}
                  >
                    {screen.label}
                  </span>
                  <span
                    style={{
                      fontFamily: UI,
                      fontSize: 14.5,
                      lineHeight: 1.5,
                      color: "rgba(42,52,61,.7)",
                      maxWidth: "34ch",
                      textWrap: "pretty",
                    }}
                  >
                    {screen.caption}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* ── La méthode ───────────────────────────────────────────────── */}
      <section style={{ background: "#F7F4ED", padding: "clamp(56px,8vw,96px) 0" }}>
        <div data-r="gutter" style={GUTTER}>
          <SectionHeading
            badge="La méthode"
            badgeBg={page.accent}
            title={page.stepsTitle}
            lede={page.stepsLede}
            titleMaxCh={22}
            marginBottom="clamp(34px,4.5vw,56px)"
          />

          <ol
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
            {page.steps.map((step, i) => (
              <Step key={step.title} step={step} index={i} accent={page.accent} />
            ))}
          </ol>
        </div>
      </section>

      {/* ── Le comparatif ────────────────────────────────────────────── */}
      {page.compare ? (
        <section style={{ background: "#EFE8DE", padding: "clamp(56px,8vw,96px) 0" }}>
          <div data-r="gutter" style={GUTTER}>
            <SectionHeading
              badge="Comparé à l’existant"
              badgeBg="#FFFFFF"
              title={page.compareTitle ?? "Avant, et avec Yatu"}
              lede={page.compareLede}
              titleMaxCh={24}
              ledeMaxCh={52}
              marginBottom="clamp(30px,4vw,48px)"
            />

            <div className="yq-table-wrap" style={{ maxWidth: 900, margin: "0 auto" }}>
              <table className="yq-table">
                <thead>
                  <tr>
                    <th scope="col">Ce qu’il faut faire</th>
                    <th scope="col">{page.compareBefore ?? "Aujourd’hui"}</th>
                    <th scope="col">Dans un événement Yatu</th>
                  </tr>
                </thead>
                <tbody>
                  {page.compare.map((row) => (
                    <tr key={row.need}>
                      <th scope="row">{row.need}</th>
                      <td>{row.before}</td>
                      <td>{row.after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : null}

      {/* ── Le rétroplanning ─────────────────────────────────────────── */}
      {page.timeline ? (
        <section style={{ background: "#EFE8DE", padding: "clamp(56px,8vw,96px) 0" }}>
          <div data-r="gutter" style={GUTTER}>
            <SectionHeading
              badge="Le rétroplanning"
              badgeBg="#FFFFFF"
              title={page.timelineTitle ?? "Quoi, et quand"}
              titleMaxCh={22}
              marginBottom="clamp(30px,4vw,48px)"
            />

            <ol
              data-reveal="stagger"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
                margin: "0 auto",
                padding: 0,
                maxWidth: 780,
                listStyle: "none",
              }}
            >
              {page.timeline.map((row) => (
                <li
                  key={row.when}
                  className="yq-milestone"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(140px,auto) 1fr",
                    gap: "6px 22px",
                    padding: "16px 0",
                    borderTop: "1px solid rgba(42,52,61,.12)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: UI,
                      fontWeight: 700,
                      fontSize: 15,
                      color: "#2A343D",
                    }}
                  >
                    {row.when}
                  </span>
                  <span
                    style={{
                      fontFamily: UI,
                      fontSize: 16,
                      lineHeight: 1.55,
                      color: "rgba(42,52,61,.75)",
                      textWrap: "pretty",
                    }}
                  >
                    {row.what}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* ── Le budget par personne ───────────────────────────────────── */}
      {page.costs ? (
        <section style={{ background: "#FFFFFF", padding: "clamp(56px,8vw,96px) 0" }}>
          <div data-r="gutter" style={GUTTER}>
            <SectionHeading
              badge="Le budget"
              badgeBg={ACCENT.sunbeam}
              title={page.costsTitle ?? "Ce que ça coûte, par personne"}
              lede={page.costsLede}
              titleMaxCh={24}
              ledeMaxCh={52}
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
              {page.costs.map((cost) => (
                <li
                  key={cost.format}
                  className="yq-cost"
                  style={{
                    background: "#F7F4ED",
                    border: "1px solid #EBE7DE",
                    borderRadius: 20,
                    padding: "20px 24px",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: DISPLAY,
                      fontWeight: 400,
                      fontSize: 20,
                      lineHeight: 1.22,
                      letterSpacing: "-.02em",
                      color: "#2A343D",
                    }}
                  >
                    {cost.format}
                  </h3>
                  <span
                    className="yq-cost-range"
                    style={{
                      fontFamily: DISPLAY,
                      fontSize: 23,
                      lineHeight: 1.1,
                      letterSpacing: "-.02em",
                      color: "#2A343D",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {cost.range}
                  </span>
                  <p
                    className="yq-cost-detail"
                    style={{
                      margin: 0,
                      fontFamily: UI,
                      fontSize: 15.5,
                      lineHeight: 1.55,
                      color: "rgba(42,52,61,.72)",
                      maxWidth: "70ch",
                      textWrap: "pretty",
                    }}
                  >
                    {cost.detail}
                  </p>
                </li>
              ))}
            </ul>

            {/* Said on the page, not only in the head: these are orders of
                magnitude and the reader has to be told so. */}
            {page.costsNote ? (
              <p
                style={{
                  margin: "clamp(24px,3.5vw,34px) auto 0",
                  maxWidth: 780,
                  fontFamily: UI,
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "rgba(42,52,61,.66)",
                  textWrap: "pretty",
                }}
              >
                {page.costsNote}
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* ── Le décompte travaillé ────────────────────────────────────── */}
      {page.worked ? (
        <section style={{ background: "#FFFFFF", padding: "clamp(56px,8vw,96px) 0" }}>
          <div data-r="gutter" style={GUTTER}>
            <SectionHeading
              badge="Un exemple chiffré"
              badgeBg={ACCENT.sunbeam}
              title={page.worked.title}
              lede={page.worked.lede}
              titleMaxCh={22}
              ledeMaxCh={52}
              marginBottom="clamp(30px,4vw,48px)"
            />

            <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", flexDirection: "column", gap: 28 }}>
              <div className="yq-table-wrap">
                <table className="yq-table">
                  <caption>Les cinq dépenses du week-end</caption>
                  <thead>
                    <tr>
                      <th scope="col">Dépense</th>
                      <th scope="col">Montant</th>
                      <th scope="col">Payée par</th>
                      <th scope="col">Pour qui</th>
                    </tr>
                  </thead>
                  <tbody>
                    {page.worked.rows.map((row) => (
                      <tr key={row.label}>
                        <th scope="row">{row.label}</th>
                        <td className="yq-num">{row.amount}</td>
                        <td>{row.who}</td>
                        <td>{row.forWhom}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="yq-table-wrap">
                <table className="yq-table">
                  <caption>Ce que chacun a payé, ce que chacun doit</caption>
                  <thead>
                    <tr>
                      <th scope="col">Qui</th>
                      <th scope="col">A payé</th>
                      <th scope="col">Doit</th>
                      <th scope="col">Solde</th>
                    </tr>
                  </thead>
                  <tbody>
                    {page.worked.balances.map((row) => (
                      <tr key={row.who}>
                        <th scope="row">{row.who}</th>
                        <td className="yq-num">{row.paid}</td>
                        <td className="yq-num">{row.owed}</td>
                        <td className="yq-num">{row.net}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div
                style={{
                  background: "#F7F4ED",
                  border: "1px solid #EBE7DE",
                  borderLeft: `4px solid ${page.accent}`,
                  borderRadius: 20,
                  padding: "22px 26px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: DISPLAY,
                    fontSize: 20,
                    lineHeight: 1.2,
                    letterSpacing: "-.02em",
                    color: "#2A343D",
                  }}
                >
                  Le solde, en trois virements
                </span>
                <ul
                  style={{
                    margin: 0,
                    padding: "0 0 0 20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    fontFamily: UI,
                    fontSize: 16,
                    lineHeight: 1.5,
                    color: "rgba(42,52,61,.78)",
                  }}
                >
                  {page.worked.settle.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>

              <p
                style={{
                  margin: 0,
                  fontFamily: UI,
                  fontSize: 15.5,
                  lineHeight: 1.6,
                  color: "rgba(42,52,61,.7)",
                  textWrap: "pretty",
                }}
              >
                {page.worked.note}
              </p>
            </div>
          </div>
        </section>
      ) : null}

      {/* ── Les erreurs classiques ───────────────────────────────────── */}
      {page.mistakes ? (
        <section style={{ background: "#F7F4ED", padding: "clamp(56px,8vw,96px) 0" }}>
          <div data-r="gutter" style={GUTTER}>
            <SectionHeading
              badge="À éviter"
              badgeBg={ACCENT.coral}
              title="Les erreurs classiques"
              titleMaxCh={20}
              marginBottom="clamp(30px,4vw,48px)"
            />

            <ul
              data-reveal="stagger"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))",
                gap: 16,
                margin: 0,
                padding: 0,
                listStyle: "none",
              }}
            >
              {page.mistakes.map((mistake) => (
                <li
                  key={mistake.title}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    background: "#FFFFFF",
                    border: "1px solid #EBE7DE",
                    borderLeft: `4px solid ${ACCENT.coral}`,
                    borderRadius: 18,
                    padding: 22,
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: DISPLAY,
                      fontWeight: 400,
                      fontSize: 19,
                      lineHeight: 1.22,
                      letterSpacing: "-.02em",
                      color: "#2A343D",
                    }}
                  >
                    {mistake.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: UI,
                      fontSize: 15.5,
                      lineHeight: 1.55,
                      color: "rgba(42,52,61,.72)",
                      textWrap: "pretty",
                    }}
                  >
                    {mistake.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* ── Ce que Yatu réunit ───────────────────────────────────────── */}
      <section style={{ background: "#FFFFFF", padding: "clamp(56px,8vw,96px) 0" }}>
        <div data-r="gutter" style={GUTTER}>
          <SectionHeading
            badge="Avec Yatu"
            badgeBg={ACCENT.sunbeam}
            title={page.modulesTitle}
            lede={page.modulesLede}
            titleMaxCh={24}
            marginBottom="clamp(34px,4.5vw,56px)"
          />

          <ul
            data-reveal="stagger"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(240px,100%),1fr))",
              gap: 14,
              margin: 0,
              padding: 0,
              listStyle: "none",
            }}
          >
            {modules.map((module) => (
              <li
                key={module.key}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  background: "#F7F4ED",
                  border: "1px solid #EBE7DE",
                  borderRadius: 20,
                  padding: 20,
                }}
              >
                <img
                  loading="lazy"
                  decoding="async"
                  src={module.icon}
                  alt=""
                  width={34}
                  height={34}
                  style={{ width: 34, height: 34, display: "block" }}
                />
                <span
                  style={{
                    fontFamily: DISPLAY,
                    fontSize: 19,
                    lineHeight: 1.2,
                    letterSpacing: "-.02em",
                    color: "#2A343D",
                  }}
                >
                  {module.label}
                </span>
                <span
                  style={{
                    fontFamily: UI,
                    fontSize: 14.5,
                    lineHeight: 1.5,
                    color: "rgba(42,52,61,.7)",
                    textWrap: "pretty",
                  }}
                >
                  {module.desc}
                </span>
              </li>
            ))}
          </ul>

          {page.counterpart ? (
            <Counterpart counterpart={page.counterpart} accent={page.accent} />
          ) : null}

          <SectionCta
            title={`Yatu ouvre le ${LAUNCH_LABEL}.`}
            body="Garde ta place : les inscrits sont prévenus le jour de l’ouverture et créent leur premier événement en premier."
            primary={{ href: ROUTES.liste, label: CTA.waitlist }}
            secondary={{ href: ROUTES.fonctionnement, label: CTA.demo }}
            accent={page.accent}
          />
        </div>
      </section>

      {/* ── Les questions ────────────────────────────────────────────── */}
      <FaqSection items={page.faq} title="Les questions qu’on nous pose" />

      {/* ── Les autres guides ────────────────────────────────────────── */}
      <section style={{ background: "#F7F4ED", padding: "clamp(56px,8vw,96px) 0" }}>
        <div data-r="gutter" style={GUTTER}>
          <SectionHeading
            badge="À lire ensuite"
            badgeBg={ACCENT.blush}
            title={page.kind === "guide" ? "Les autres guides" : "À lire aussi"}
            titleMaxCh={20}
            marginBottom="clamp(30px,4vw,48px)"
          />

          <div
            data-reveal="stagger"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(240px,100%),1fr))",
              gap: 14,
            }}
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
