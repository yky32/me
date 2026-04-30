import type { Metadata } from "next";
import { Suspense } from "react";

import { TimezoneTool } from "@/components/tools/timezone-tool";
import { ToolPageShell } from "@/components/tools/tool-page-shell";

export const metadata: Metadata = {
  title: "Timezone converter",
  description: "Live clocks across cities, favorites, and shareable URLs.",
};

function TimezoneFallback() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
      <div className="h-48 animate-pulse rounded-2xl bg-muted/60" />
      <div className="h-48 animate-pulse rounded-2xl bg-muted/40" />
    </div>
  );
}

export default function TimezoneToolPage() {
  return (
    <ToolPageShell
      title="Timezone studio"
      description="Keep multiple IANA zones in view, star your frequent cities, and share the exact layout with a URL."
    >
      <Suspense fallback={<TimezoneFallback />}>
        <TimezoneTool />
      </Suspense>
    </ToolPageShell>
  );
}
