import Link from "next/link";
import { isAnchor } from "@/lib/routes";

/**
 * Renders a same-page anchor as a plain <a> (next/link no-ops when the route
 * doesn’t change) and everything else as a next/link.
 */
export function NavLink({
  href,
  children,
  ...rest
}: { href: string; children: React.ReactNode } & Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
>) {
  if (isAnchor(href) || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}
