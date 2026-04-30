import type { Metadata } from "next";

import { Base64Tool } from "@/components/tools/base64-tool";
import { ToolPageShell } from "@/components/tools/tool-page-shell";

export const metadata: Metadata = {
  title: "Base64 encoder",
  description:
    "Encode and decode UTF-8 text to Base64 with optional URL-safe alphabet — runs in your browser.",
};

export default function Base64ToolPage() {
  return (
    <ToolPageShell
      title="Base64 encoder / decoder"
      description="Convert between UTF-8 text and Base64 for APIs, tokens, and binary-safe payloads. Toggle URL-safe (-_) when embedding in paths or query strings."
    >
      <Base64Tool />
    </ToolPageShell>
  );
}
