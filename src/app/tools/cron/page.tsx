import type { Metadata } from "next";

import { CronExplainerTool } from "@/components/tools/cron-explainer-tool";
import { ToolPageShell } from "@/components/tools/tool-page-shell";

export const metadata: Metadata = {
  title: "Cron explainer",
  description: "Turn cron expressions into plain language and list upcoming run times.",
};

export default function CronToolPage() {
  return (
    <ToolPageShell
      title="Cron expression explainer"
      description="Standard five-field cron in local time: translate with cronstrue and preview the next dozen ticks from cron-parser — handy for jobs, queues, and infra configs."
    >
      <CronExplainerTool />
    </ToolPageShell>
  );
}
