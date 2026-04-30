import type { Metadata } from "next";

import { InnerPageSurface } from "@/components/layout/inner-page-surface";
import { ToolsHub } from "@/components/tools/tools-hub";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Hashes, cron, IDs, diff, regex, JSON tables, encoders, JWT, timezones, units, and more — browse by category or search.",
};

export default function ToolsPage() {
  return (
    <InnerPageSurface>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Tools
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Bright utilities for everyday work
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Opinionated, fast, and pleasant to use — built the same way I approach
            product-facing engineering.
          </p>
        </div>
        <ToolsHub />
      </div>
    </InnerPageSurface>
  );
}
