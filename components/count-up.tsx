"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts 0 → value the first time it scrolls into view.
 * Renders the final number on the server so the page reads correctly
 * without JS and for crawlers.
 */
export function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || value === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setShown(0);

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();

        const start = performance.now();
        const duration = 1400;

        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          // easeOutQuart - the counter easing the design system calls for
          setShown(Math.round((1 - Math.pow(1 - t, 4)) * value));
          if (t < 1) frame.current = requestAnimationFrame(tick);
        };

        frame.current = requestAnimationFrame(tick);
      },
      { threshold: 0.3 },
    );

    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, [value]);

  return <span ref={ref}>{shown.toLocaleString("fr-FR")}</span>;
}
