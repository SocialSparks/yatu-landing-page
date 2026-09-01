"use client";

import {useEffect, useState} from "react";
import {LAUNCH_DATE} from "@/lib/content";

const LAUNCH_MS = new Date(LAUNCH_DATE).getTime();
const MAX_TIMEOUT_MS = 2_147_483_647;
const LAUNCH_MODE = process.env.NEXT_PUBLIC_LAUNCH_MODE;

/**
 * Keeps the prerendered pre-launch HTML hydration-safe, then applies the local
 * override when present or switches from the visitor's live clock. A page left
 * open across the deadline switches too.
 */
export function useHasLaunched() {
  const [hasLaunched, setHasLaunched] = useState(false);

  useEffect(() => {
    if (LAUNCH_MODE === "pre" || LAUNCH_MODE === "post") {
      setHasLaunched(LAUNCH_MODE === "post");
      return;
    }

    let timer: number | undefined;

    const sync = () => {
      window.clearTimeout(timer);
      const remaining = LAUNCH_MS - Date.now();
      const launched = remaining <= 0;
      setHasLaunched(launched);

      if (!launched) {
        timer = window.setTimeout(sync, Math.min(remaining + 50, MAX_TIMEOUT_MS));
      }
    };

    sync();
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("pageshow", sync);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("pageshow", sync);
    };
  }, []);

  return hasLaunched;
}
