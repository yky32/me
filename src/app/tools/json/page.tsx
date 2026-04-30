import type { Metadata } from "next";

import { JsonTool } from "@/components/tools/json-tool";
import { ToolPageShell } from "@/components/tools/tool-page-shell";

export const metadata: Metadata = {
  title: "JSON formatter",
  description:
    "Format, minify, validate with line hints, Shiki highlighting, collapsible tree, and copy-as options — all client-side.",
};

export default function JsonToolPage() {
  return (
    <ToolPageShell
      title="JSON formatter & tree"
      description="Paste JSON, jump to errors with a line gutter, flip between pretty and minified highlights, copy in several shapes, and explore a collapsible tree."
    >
      <JsonTool />
    </ToolPageShell>
  );
}
