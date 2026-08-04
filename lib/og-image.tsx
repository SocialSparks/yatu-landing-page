import { ImageResponse } from "next/og";
import { ACCENT } from "@/lib/content";
import { OG_WORDMARK } from "@/lib/og-wordmark";

/**
 * The shared social card. Both pages render the same layout with their own
 * words, so a link to /bde never previews as the home page.
 *
 * Nothing here may touch the filesystem: the card is prerendered at build time,
 * but the worker re-renders it on request and has no fs. The wordmark is
 * therefore inlined - see lib/og-wordmark.ts.
 *
 * The brand faces (Capriola, Lato) are not loaded here either, as satori would
 * need the font binaries. The default grotesque stays legible and the wordmark
 * carries the brand.
 */
const SIZE = { width: 1200, height: 630 };

const INK = "#2A343D";
const DOTS = [ACCENT.coral, ACCENT.sunbeam, ACCENT.sky, ACCENT.meadow, ACCENT.lilac];

export function ogImage({
  title,
  subtitle,
  badge,
  accent = ACCENT.sunbeam,
}: {
  title: string;
  subtitle: string;
  badge: string;
  accent?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: ACCENT.sand,
          padding: "68px 76px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <img src={OG_WORDMARK} width={185} height={86} alt="" />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: "#FFFFFF",
              border: `1px solid ${ACCENT.outline}`,
              borderRadius: 999,
              padding: "16px 28px",
              fontSize: 26,
              fontWeight: 700,
              color: INK,
            }}
          >
            <div style={{ display: "flex", width: 16, height: 16, borderRadius: 99, background: accent }} />
            {badge}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              lineHeight: 1.12,
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: INK,
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 31, lineHeight: 1.4, color: "rgba(42,52,61,.68)" }}>
            {subtitle}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {DOTS.map((color) => (
            <div key={color} style={{ display: "flex", width: 20, height: 20, borderRadius: 99, background: color }} />
          ))}
          <div style={{ display: "flex", marginLeft: 14, fontSize: 25, color: "rgba(42,52,61,.55)" }}>
            Sortie le 9 septembre 2026
          </div>
        </div>
      </div>
    ),
    SIZE,
  );
}

export const OG_SIZE = SIZE;
export const OG_CONTENT_TYPE = "image/png";
