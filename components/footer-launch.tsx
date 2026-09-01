"use client";

import {AppDownloadButtons} from "@/components/app-download-buttons";
import {LaunchStatus} from "@/components/countdown";
import {useHasLaunched} from "@/lib/use-launch-state";

const UI = "var(--font-ui), system-ui, sans-serif";

export function FooterLaunch() {
  const hasLaunched = useHasLaunched();

  if (hasLaunched) return <AppDownloadButtons layout="column" />;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        alignSelf: "flex-start",
        background: "rgba(255,255,255,.08)",
        borderRadius: 999,
        padding: "7px 14px",
        fontFamily: UI,
        fontWeight: 700,
        fontSize: 13,
        color: "#FED873",
      }}
    >
      <LaunchStatus />
    </span>
  );
}
