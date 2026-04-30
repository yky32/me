import type { Metadata } from "next";

import { RegexTesterTool } from "@/components/tools/regex-tester-tool";
import { ToolPageShell } from "@/components/tools/tool-page-shell";

export const metadata: Metadata = {
  title: "Regex tester",
  description: "JavaScript RegExp flags, live highlights, and capture groups — client-side only.",
};

export default function RegexToolPage() {
  return (
    <ToolPageShell
      title="Regex tester"
      description="Built-in JavaScript regex semantics with toggles for global, case-insensitive, multiline, dotAll, unicode, and sticky. See matches and numbered groups without sending data anywhere."
    >
      <RegexTesterTool />
    </ToolPageShell>
  );
}
