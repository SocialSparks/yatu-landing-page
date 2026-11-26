"use client";

import {AppDownloadButtons} from "@/components/app-download-buttons";
import {GoLayout} from "@/components/go-layout";
import {NavLink} from "@/components/nav-link";

export function GoPage() {
  return <GoLayout Link={NavLink} stores={<AppDownloadButtons tone="dark" />} />;
}
