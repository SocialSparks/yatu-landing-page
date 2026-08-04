import { NavLink } from "@/components/nav-link";
import type { Crumb } from "@/lib/routes";

const UI = "var(--font-ui), system-ui, sans-serif";

/**
 * The visible trail at the top of a guide. The last entry is the current page,
 * so it is text rather than a link - the same rule the BreadcrumbList markup
 * follows in components/structured-data.tsx.
 */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav
      aria-label="Fil d’Ariane"
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 8,
        fontFamily: UI,
        fontSize: 14,
        color: "rgba(42,52,61,.55)",
      }}
    >
      {trail.map((crumb, i) => {
        const last = i === trail.length - 1;

        return (
          <span key={crumb.path} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            {i > 0 ? <span aria-hidden="true">/</span> : null}
            {last ? (
              <span aria-current="page" style={{ color: "rgba(42,52,61,.8)" }}>
                {crumb.name}
              </span>
            ) : (
              <NavLink
                href={crumb.path}
                style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: 3 }}
              >
                {crumb.name}
              </NavLink>
            )}
          </span>
        );
      })}
    </nav>
  );
}
