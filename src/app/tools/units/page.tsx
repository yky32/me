import type { Metadata } from "next";

import { ToolPageShell } from "@/components/tools/tool-page-shell";
import { UnitConverterTool } from "@/components/tools/unit-converter-tool";

export const metadata: Metadata = {
  title: "Unit converter",
  description:
    "Convert length, weight, temperature, IEC & SI data sizes, speed, volume, and indicative currency rates.",
};

export default function UnitsToolPage() {
  return (
    <ToolPageShell
      title="Unit converter"
      description="Length, mass, temperature, binary vs decimal byte units, speed, volume, and indicative FX — defaults tuned for everyday engineering checks."
    >
      <UnitConverterTool />
    </ToolPageShell>
  );
}
