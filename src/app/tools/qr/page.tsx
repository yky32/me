import type { Metadata } from "next";

import { ToolPageShell } from "@/components/tools/tool-page-shell";
import { QrGeneratorTool } from "@/components/tools/qr-generator-tool";

export const metadata: Metadata = {
  title: "QR code generator",
  description:
    "Create static QR codes for links, text, email, call, SMS, WhatsApp, Wi‑Fi, vCard, and events — customize colors, logo, and download PNG or SVG in the browser.",
};

export default function QrGeneratorToolPage() {
  return (
    <ToolPageShell
      title="QR code generator"
      description="Pick a type, fill the fields, style colors and optional logo, then download PNG or SVG. Static codes only — all encoding happens on your device."
    >
      <QrGeneratorTool />
    </ToolPageShell>
  );
}
