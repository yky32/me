import type { Metadata } from "next";

import { TextDiffTool } from "@/components/tools/text-diff-tool";
import { ToolPageShell } from "@/components/tools/tool-page-shell";

export const metadata: Metadata = {
  title: "Text diff",
  description: "Line-based diff for configs, JSON, or logs — unified highlight view.",
};

export default function DiffToolPage() {
  return (
    <ToolPageShell
      title="Text diff"
      description="Compare two snapshots side by side with a unified, colorized line diff — pairs naturally with the JSON workspace when reviewing structure changes."
    >
      <TextDiffTool />
    </ToolPageShell>
  );
}
