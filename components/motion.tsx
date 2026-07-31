"use client";

import { useEffect } from "react";

/**
 * Scroll-reveal driver — the Next port of site-motion.js.
 *
 * Mounted once in the layout, it scans the document for `data-reveal` elements
 * and adds `.yq-in` when they come into view; the transition itself lives in
 * globals.css. Sections stay server components: they only carry the attributes.
 *
 * `data-reveal-delay="120"` offsets the start. `data-reveal="stagger"` walks the
 * element's children 80ms apart instead of animating the container.
 *
 * The original ran on anime.js from a CDN; CSS transitions do the same job here
 * (fades and slides only) with no third-party request and no layout thrash.
 */
export function Motion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        el.classList.add("yq-in");
      });
      return;
    }

    const seen = new WeakSet<Element>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.unobserve(entry.target);
          entry.target.classList.add("yq-in");
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    function scan() {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);

        const delay = Number(el.getAttribute("data-reveal-delay") || 0);
        if (el.getAttribute("data-reveal") === "stagger") {
          Array.from(el.children).forEach((child, i) => {
            (child as HTMLElement).style.transitionDelay = `${delay + i * 80}ms`;
          });
        } else if (delay) {
          el.style.transitionDelay = `${delay}ms`;
        }

        io.observe(el);
      });
    }

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.documentElement, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  return null;
}
