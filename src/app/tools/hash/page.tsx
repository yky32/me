import type { Metadata } from "next";

import { HashGeneratorTool } from "@/components/tools/hash-generator-tool";
import { ToolPageShell } from "@/components/tools/tool-page-shell";

export const metadata: Metadata = {
  title: "Hash generator",
  description:
    "MD5, SHA-256/384/512 via Web Crypto; optional bcrypt — all computed client-side.",
};

export default function HashToolPage() {
  return (
    <ToolPageShell
      title="Hash generator"
      description="Hex digests for MD5 and SHA-2 family (fast). bcrypt is opt-in and intentionally slow — useful for demos, not for bypassing your platform’s auth primitives."
    >
      <HashGeneratorTool />
    </ToolPageShell>
  );
}
