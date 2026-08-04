import {Countdown} from "@/components/countdown";
import {Decor} from "@/components/decor";
import {AppleIcon, GooglePlayIcon, InstagramIcon, TikTokIcon} from "@/components/icons";
import {NavLink} from "@/components/nav-link";
import {WaitlistForm} from "@/components/waitlist-form";
import {APP_STORE_URL, CTA, icon, PLAY_STORE_URL, STORES_LIVE} from "@/lib/content";
import {GO_DECOR} from "@/lib/decor";
import {GO_DOWNLOAD, GO_HANDLE, GO_LEDE, GO_LINKS, GO_TITLE, GO_WAITLIST, type GoLink,} from "@/lib/go-content";
import {ROUTES} from "@/lib/routes";
import {PUBLISHER} from "@/lib/site";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";

/* The column is deliberately narrow: this page is read on a phone, held in one
   hand, two seconds after leaving an Instagram bio. `position:relative` lifts
   it above the decor layer, which is absolutely positioned behind it. */
const COLUMN_STYLE: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  width: "100%",
  maxWidth: 520,
  margin: "0 auto",
  padding: "0 20px",
  display: "flex",
  flexDirection: "column",
};

const LEGAL = [
  { href: ROUTES.mentionsLegales, label: "Mentions légales" },
  { href: ROUTES.confidentialite, label: "Confidentialité" },
  { href: ROUTES.cookies, label: "Cookies" },
];

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M7.5 4.5 13 10l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The 48px square at the head of a row - a network mark, or a Yatu tool. */
function LinkTile({ link }: { link: GoLink }) {
  if ("tool" in link) {
    return (
      <span
        aria-hidden="true"
        style={{
          width: 48,
          height: 48,
          flex: "none",
          display: "grid",
          placeItems: "center",
          borderRadius: 15,
          background: "#EFE8DE",
        }}
      >
        <img
          loading="lazy"
          decoding="async"
          src={icon(link.tool)}
          alt=""
          width={30}
          height={30}
          style={{ display: "block" }}
        />
      </span>
    );
  }

  const instagram = link.brand === "instagram";

  return (
    <span
      aria-hidden="true"
      style={{
        width: 48,
        height: 48,
        flex: "none",
        display: "grid",
        placeItems: "center",
        borderRadius: 15,
        // A wash of the network's own colour: enough to recognise the row at a
        // glance, not enough to drag Instagram's gradient onto a Yatu page.
        background: instagram ? "rgba(225,48,108,.1)" : "rgba(42,52,61,.08)",
        color: instagram ? "#E1306C" : "#111111",
      }}
    >
      {instagram ? <InstagramIcon size={26} /> : <TikTokIcon size={24} />}
    </span>
  );
}

function LinkRow({ link, delay }: { link: GoLink; delay: number }) {
  return (
    <NavLink
      href={link.href}
      className="yq-go-row"
      data-reveal="up"
      data-reveal-delay={delay}
      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <LinkTile link={link} />

      <span style={{ minWidth: 0, flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontFamily: UI, fontWeight: 700, fontSize: 16, color: "#2A343D" }}>
          {link.title}
        </span>
        <span
          style={{
            fontFamily: UI,
            fontSize: 13.5,
            lineHeight: 1.35,
            color: "#71787E",
            textWrap: "pretty",
          }}
        >
          {link.sub}
        </span>
      </span>

      <span
        aria-hidden="true"
        className="yq-go-arrow"
        style={{ flex: "none", display: "flex", color: "#B8BBBE" }}
      >
        <ArrowIcon />
      </span>
    </NavLink>
  );
}

const STORE_BUTTON: React.CSSProperties = {
  flex: "1 1 190px",
  minHeight: 58,
  padding: "0 20px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 11,
  background: "#FFFFFF",
  color: "#2A343D",
  border: "1px solid #FFFFFF",
  borderRadius: 16,
  fontFamily: UI,
  fontWeight: 700,
  fontSize: 15,
  textDecoration: "none",
};

/** What the ink card holds once the app is out: one button per open store. */
function StoreButtons() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
      {APP_STORE_URL ? (
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="yq-btn-light"
          style={STORE_BUTTON}
        >
          <AppleIcon size={22} />
          {GO_DOWNLOAD.appStore}
        </a>
      ) : null}
      {PLAY_STORE_URL ? (
        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="yq-btn-light"
          style={STORE_BUTTON}
        >
          <GooglePlayIcon size={22} />
          {GO_DOWNLOAD.playStore}
        </a>
      ) : null}
    </div>
  );
}

/**
 * /go - the link-in-bio page, the one address the Instagram and TikTok profiles
 * point at.
 *
 * It is a linktree in shape only: same sand, same floating tools, same Capriola
 * headings as the rest of the site, so a visitor arriving from a story lands
 * somewhere that already looks like Yatu. It is served bare - see
 * components/site-chrome.tsx - so nothing competes with the four destinations.
 *
 * The card under the title is the whole point of the page, and it has two
 * states: the waitlist while the stores are closed, the download buttons once
 * they open. Filling APP_STORE_URL / PLAY_STORE_URL in lib/content.ts is the
 * only thing that has to happen on launch day.
 */
export function GoPage() {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        background: "#F7F4ED",
        padding: "clamp(30px,7vw,60px) 0 clamp(26px,5vw,44px)",
      }}
    >
      <Decor items={GO_DECOR} />

      <main
        style={{
          ...COLUMN_STYLE,
          flex: 1,
          gap: "clamp(22px,4vw,30px)",
        }}
      >
        <header
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 14,
          }}
        >
          {/* The app icon, the same square that will sit on their home screen.
              Eager: it is the first thing on the page and the only image above
              the fold that carries the brand. */}
          <img
            loading="eager"
            decoding="async"
            fetchPriority="high"
            src="/icon-192.png"
            alt="Yatu"
            width={96}
            height={96}
            data-reveal="scale"
            style={{
              width: "clamp(84px,22vw,96px)",
              height: "auto",
              display: "block",
              borderRadius: 26,
              boxShadow: "0 10px 30px rgba(42,52,61,.14)",
            }}
          />

          <span
            data-reveal="up"
            style={{
              fontFamily: UI,
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: ".04em",
              color: "#71787E",
            }}
          >
            {GO_HANDLE}
          </span>

          <h1
            data-reveal="up"
            data-reveal-delay="60"
            style={{
              margin: 0,
              fontFamily: DISPLAY,
              fontWeight: 400,
              fontSize: "clamp(27px,7vw,34px)",
              lineHeight: 1.12,
              letterSpacing: "-.025em",
              color: "#2A343D",
              textWrap: "balance",
            }}
          >
            {GO_TITLE}
          </h1>

          <p
            data-reveal="up"
            data-reveal-delay="110"
            style={{
              margin: 0,
              maxWidth: "40ch",
              fontFamily: UI,
              fontSize: 15.5,
              lineHeight: 1.5,
              color: "rgba(42,52,61,.72)",
              textWrap: "pretty",
            }}
          >
            {GO_LEDE}
          </p>
        </header>

        <section
          aria-labelledby="go-cta-title"
          className="yq-go-cta"
          data-reveal="up"
          data-reveal-delay="160"
          style={{
            background: "#2A343D",
            borderRadius: 24,
            padding: "clamp(20px,5vw,26px)",
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            <h2
              id="go-cta-title"
              style={{
                margin: 0,
                fontFamily: DISPLAY,
                fontWeight: 400,
                fontSize: "clamp(21px,5.4vw,24px)",
                lineHeight: 1.2,
                letterSpacing: "-.02em",
                color: "#FFFFFF",
                textWrap: "balance",
              }}
            >
              {STORES_LIVE ? GO_DOWNLOAD.title : GO_WAITLIST.title}
            </h2>
            <p
              style={{
                margin: 0,
                fontFamily: UI,
                fontSize: 15,
                lineHeight: 1.5,
                color: "rgba(255,255,255,.72)",
                textWrap: "pretty",
              }}
            >
              {STORES_LIVE ? GO_DOWNLOAD.lede : GO_WAITLIST.lede}
            </p>
          </div>

          {STORES_LIVE ? (
            <StoreButtons />
          ) : (
            <>
              <Countdown tone="dark" />
              <WaitlistForm
                tone="dark"
                cta={CTA.waitlist}
                source={GO_WAITLIST.source}
                note={GO_WAITLIST.note}
              />
            </>
          )}
        </section>

        <nav aria-label="Nos liens" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {GO_LINKS.map((link, i) => (
            <LinkRow key={link.href} link={link} delay={60 + i * 60} />
          ))}
        </nav>
      </main>

      {/* Outside <main>: on a page with no site footer, this one is the
          contentinfo landmark. `marginTop:auto` keeps it at the bottom of a
          tall screen without pinning it over the content on a short one. */}
      <footer
        style={{
          ...COLUMN_STYLE,
          marginTop: "auto",
          paddingTop: "clamp(26px,5vw,34px)",
          alignItems: "center",
          gap: 8,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "6px 14px",
          }}
        >
          {LEGAL.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              className="yq-go-legal"
              style={{
                fontFamily: UI,
                fontSize: 13,
                color: "#71787E",
                textDecoration: "none",
              }}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <span style={{ fontFamily: UI, fontSize: 12.5, color: "#94999E" }}>
          © 2026 Yatu - édité par {PUBLISHER}
        </span>
      </footer>
    </div>
  );
}
