import type { Metadata } from "next";

import { ToolPageShell } from "@/components/tools/tool-page-shell";
import { UrlCodecTool } from "@/components/tools/url-codec-tool";

export const metadata: Metadata = {
  title: "URL encoder",
  description:
    "Encode and decode URI components with encodeURIComponent — optional per-line mode for bulk keys.",
};

export default function UrlCodecToolPage() {
  return (
    <ToolPageShell
      title="URL encoder / decoder"
      description="Percent-encode or decode strings the same way browsers treat query parameter values. Enable per-line mode when you have a list of paths or keys."
    >
      <UrlCodecTool />
    </ToolPageShell>
  );
}
