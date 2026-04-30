import type { Metadata } from "next";

import { ToolPageShell } from "@/components/tools/tool-page-shell";
import { UnitConverterTool } from "@/components/tools/unit-converter-tool";

export const metadata: Metadata = {
  title: "Unit converter",
  description: "Convert length, weight, temperature, and digital storage units.",
};

export default function UnitsToolPage() {
  return (
    <ToolPageShell
      title="Unit converter"
      description="Precise conversions with sensible defaults — optimized for quick checks while you work."
    >
      <UnitConverterTool />
    </ToolPageShell>
  );
}
