"use client";

import {useHasLaunched} from "@/lib/use-launch-state";

export function LaunchText({before, after}: {before: string; after: string}) {
  return <>{useHasLaunched() ? after : before}</>;
}
