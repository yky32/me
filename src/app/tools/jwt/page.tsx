import type { Metadata } from "next";

import { JwtDecoderTool } from "@/components/tools/jwt-decoder-tool";
import { ToolPageShell } from "@/components/tools/tool-page-shell";

export const metadata: Metadata = {
  title: "JWT decoder",
  description:
    "Inspect JWT header and payload in the browser — signature not verified; treat tokens as sensitive.",
};

export default function JwtDecoderToolPage() {
  return (
    <ToolPageShell
      title="JWT decoder"
      description="Paste a JSON Web Token to view the header and payload as formatted JSON. Signature verification is intentionally skipped — use your auth stack to validate tokens in production."
    >
      <JwtDecoderTool />
    </ToolPageShell>
  );
}
