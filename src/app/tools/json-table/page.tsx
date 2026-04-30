import type { Metadata } from "next";

import { JsonTableTool } from "@/components/tools/json-table-tool";
import { ToolPageShell } from "@/components/tools/tool-page-shell";

export const metadata: Metadata = {
  title: "JSON to table",
  description: "Flatten JSON objects into a scrollable table and copy as TSV.",
};

export default function JsonTableToolPage() {
  return (
    <ToolPageShell
      title="JSON → table"
      description="Paste an object or an array of objects; nested fields become dot paths and arrays stringify into cells. Export as TSV for spreadsheets."
    >
      <JsonTableTool />
    </ToolPageShell>
  );
}
