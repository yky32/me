import type { Metadata } from "next";

import { JsonTool } from "@/components/tools/json-tool";
import { ToolPageShell } from "@/components/tools/tool-page-shell";

export const metadata: Metadata = {
  title: "JSON formatter",
  description: "Format, validate, highlight, and tree-view JSON in the browser.",
};

export default function JsonToolPage() {
  return (
    <ToolPageShell
      title="JSON formatter & tree"
      description="Paste raw JSON, catch errors instantly, copy formatted output, or explore the structure as a tree."
    >
      <JsonTool />
    </ToolPageShell>
  );
}
