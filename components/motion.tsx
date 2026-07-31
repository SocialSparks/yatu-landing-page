"use client";

import { useEffect } from "react";

/**
 * Scroll-reveal driver - the Next port of site-motion.js.
 *
 * Mounted once in the layout, it scans the document for `data-reveal` elements
 * and adds `.yq-in` when they come into view; the transition itself lives in
 * globals.css. Sections stay server components: they only carry the attributes.
 *
 * `data-reveal-delay="120"` offsets the start. `data-reveal="stagger"` walks the
 * element's children 80ms apart instead of animating the container.
 * `data-fly="x,y,deg"` arrives from an offset with a rotation - the starting
 * transform is read off the attribute, the rest is the same CSS transition.
 *
 * The original ran on anime.js from a CDN; CSS transitions do the same job here
 * (fades and slides only) with no third-party request and no layout thrash.
 *
 * Like site-motion.js, this writes to nodes React also owns. In development
 * React notices the extra class on a subtree it is hydrating and logs an
 * attribute mismatch - dev-only, and harmless: React never rendered a
 * className for these elements, so it never reconciles one away (verified:
 * .yq-in survives re-renders). Removing the log would mean turning every
 * revealing element into its own client component, which is not worth it.
 */
export function Motion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll<HTMLElement>("[data-reveal],[data-fly],[data-float]").forEach((el) => {
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
      document.querySelectorAll<HTMLElement>("[data-reveal],[data-fly],[data-float]").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);

        const delay = Number(el.getAttribute("data-reveal-delay") || 0);

        const fly = el.getAttribute("data-fly");
        if (fly !== null) {
          const [x = 0, y = 0, deg = 0] = fly.split(",").map(Number);
          el.style.transform = `translate(${x}px, ${y}px) rotate(${deg}deg)`;
          if (delay) el.style.transitionDelay = `${delay}ms`;
          io.observe(el);
          return;
        }

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

    /* Safety net, in the spirit of site-motion.js's fallback(): copy that never
       reveals is copy nobody reads. Browsers defer IntersectionObserver in a
       background tab, so only start counting once the page is actually visible. */
    let bail: number | undefined;
    function armBail() {
      if (document.visibilityState !== "visible") return;
      window.clearTimeout(bail);
      bail = window.setTimeout(() => {
        document.querySelectorAll<HTMLElement>("[data-reveal],[data-fly],[data-float]").forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("yq-in");
        });
      }, 4000);
    }

    armBail();
    document.addEventListener("visibilitychange", armBail);

    return () => {
      mo.disconnect();
      io.disconnect();
      window.clearTimeout(bail);
      document.removeEventListener("visibilitychange", armBail);
    };
  }, []);

  return null;
}
