"use client";

import { NavLink } from "@/components/nav-link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/lib/routes";

const UI = "var(--font-ui), system-ui, sans-serif";

const NAV = [
  { href: ROUTES.modules, label: "Les modules" },
  { href: ROUTES.fonctionnement, label: "Comment ça marche" },
  { href: ROUTES.usages, label: "Cas d'usage" },
  { href: ROUTES.bde, label: "BDE & assos", note: "Page dédiée" },
];

/** "/#solution" -> "solution", "/bde" -> null (no in-page anchor). */
function anchorId(href: string): string | null {
  const i = href.indexOf("#");
  return i === -1 ? null : href.slice(i + 1);
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const pathname = usePathname();
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);

  // Scroll-spy: highlight the nav link whose section is currently in view.
  useEffect(() => {
    const ids = NAV.map((item) => anchorId(item.href)).filter((id): id is string => !!id);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveAnchor(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (href: string) => {
    const id = anchorId(href);
    if (id) {
      const base = href.slice(0, href.indexOf("#")) || "/";
      return pathname === base && activeAnchor === id;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

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
          className="yq-logo-link"
          style={{ display: "flex", alignItems: "center", flex: "none", textDecoration: "none" }}
        >
          <img
            src="/assets/yatu-wordmark.png"
            alt="Yatu"
            className="yq-logo-mark"
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
              aria-current={isActive(item.href) ? "page" : undefined}
              style={{
                fontFamily: UI,
                fontWeight: 600,
                fontSize: 15,
                color: isActive(item.href) ? "#2A343D" : "#4E565D",
                background: isActive(item.href) ? "#EFE8DE" : undefined,
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
            aria-current={isActive(item.href) ? "page" : undefined}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: item.note ? "space-between" : undefined,
              minHeight: 52,
              padding: "0 18px",
              background: isActive(item.href) ? "#EFE8DE" : "#FFFFFF",
              border: isActive(item.href) ? "1px solid #DCD3C2" : "1px solid #EBE7DE",
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
