import type { Metadata } from "next";

import { IdGeneratorTool } from "@/components/tools/id-generator-tool";
import { ToolPageShell } from "@/components/tools/tool-page-shell";

export const metadata: Metadata = {
  title: "ID generator",
  description: "UUID v4, ULID, and NanoID — single IDs or bulk lists, copy-ready.",
};

export default function IdsToolPage() {
  return (
    <ToolPageShell
      title="UUID · ULID · NanoID"
      description="Generate identifiers for fixtures and tests. UUID v4 is random; ULIDs sort by time; NanoID is compact and URL-safe."
    >
      <IdGeneratorTool />
    </ToolPageShell>
  );
}
