"use client";

import { NavLink } from "@/components/nav-link";
import { useState } from "react";
import { ROUTES } from "@/lib/routes";

const UI = "var(--font-ui), system-ui, sans-serif";

const NAV = [
  { href: ROUTES.modules, label: "Les modules" },
  { href: ROUTES.fonctionnement, label: "Comment ça marche" },
  { href: ROUTES.usages, label: "Cas d'usage" },
  { href: ROUTES.bde, label: "BDE & assos", note: "Page dédiée" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 60, background: "#F7F4ED" }}>
      <div
        data-r="gutter"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <NavLink
          href={ROUTES.home}
          aria-label="Yatu - accueil"
          style={{ display: "flex", alignItems: "center", flex: "none", textDecoration: "none" }}
        >
          <img
            src="/assets/yatu-wordmark.png"
            alt="Yatu"
            style={{ height: 40, width: "auto", display: "block" }}
          />
        </NavLink>

        <nav
          data-r="nav-desk"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            marginLeft: "auto",
            flexWrap: "wrap",
            background: "#FFFFFF",
            border: "1px solid #EBE7DE",
            borderRadius: 999,
            padding: 5,
          }}
        >
          {NAV.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              className="yq-nav-link"
              style={{
                fontFamily: UI,
                fontWeight: 600,
                fontSize: 15,
                color: "#4E565D",
                textDecoration: "none",
                padding: "10px 16px",
                borderRadius: 999,
              }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <NavLink
          data-r="hdr-cta"
          href={ROUTES.liste}
          className="yq-btn-dark"
          style={{
            flex: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 9,
            background: "#2A343D",
            color: "#FFFFFF",
            fontFamily: UI,
            fontWeight: 700,
            fontSize: 15,
            lineHeight: 1,
            padding: "15px 22px",
            borderRadius: 999,
            textDecoration: "none",
          }}
        >
          <span
            style={{ width: 8, height: 8, borderRadius: 80, background: "#FED873", flex: "none" }}
          />
          Rejoindre la liste
        </NavLink>

        <button
          data-r="nav-burger"
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          style={{
            flex: "none",
            width: 48,
            height: 48,
            cursor: "pointer",
            background: "#FFFFFF",
            border: "1px solid #EBE7DE",
            borderRadius: 999,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 5,
            padding: 0,
          }}
        >
          <span
            style={{
              display: "block",
              width: 18,
              height: 2,
              borderRadius: 2,
              background: "#2A343D",
              transition: "transform 200ms var(--ease-standard)",
              transform: open ? "translateY(7px) rotate(45deg)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: 18,
              height: 2,
              borderRadius: 2,
              background: "#2A343D",
              transition: "opacity 200ms var(--ease-standard)",
              opacity: open ? 0 : 1,
            }}
          />
          <span
            style={{
              display: "block",
              width: 18,
              height: 2,
              borderRadius: 2,
              background: "#2A343D",
              transition: "transform 200ms var(--ease-standard)",
              transform: open ? "translateY(-7px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      <div
        data-r="gutter"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px 16px",
          flexDirection: "column",
          gap: 6,
          display: open ? "flex" : "none",
        }}
      >
        {NAV.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            onClick={close}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: item.note ? "space-between" : undefined,
              minHeight: 52,
              padding: "0 18px",
              background: "#FFFFFF",
              border: "1px solid #EBE7DE",
              borderRadius: 16,
              fontFamily: UI,
              fontWeight: 600,
              fontSize: 16,
              color: "#2A343D",
              textDecoration: "none",
            }}
          >
            {item.label}
            {item.note ? (
              <span style={{ fontFamily: UI, fontWeight: 700, fontSize: 12, color: "#71787E" }}>
                {item.note}
              </span>
            ) : null}
          </NavLink>
        ))}
      </div>
    </header>
  );
}
