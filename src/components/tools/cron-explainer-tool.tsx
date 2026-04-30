"use client";

import * as React from "react";
import { CronExpressionParser } from "cron-parser";
import cronstrue from "cronstrue";
import { Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const SAMPLE = "0 9 * * 1-5";

export function CronExplainerTool() {
  const [expr, setExpr] = React.useState(SAMPLE);
  const parsed = React.useMemo(() => {
    const trimmed = expr.trim();
    if (!trimmed) {
      return { ok: false as const, message: "Enter a cron expression." };
    }
    let human = "";
    try {
      human = cronstrue.toString(trimmed, { use24HourTimeFormat: true });
    } catch {
      human = "";
    }
    try {
      const interval = CronExpressionParser.parse(trimmed, {
        currentDate: new Date(),
      });
      const dates: Date[] = [];
      for (let i = 0; i < 12; i++) {
        const next = interval.next();
        dates.push(next.toDate());
      }
      return {
        ok: true as const,
        human: human || "(Could not build English summary — still parsed schedule.)",
        dates,
      };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Invalid cron expression";
      return { ok: false as const, message: msg };
    }
  }, [expr]);

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied`);
    } catch {
      toast.error("Could not copy");
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 font-mono">
      <p className="rounded-xl border border-border/60 bg-muted/15 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
        Standard five-field cron: <code className="text-foreground">minute hour day month weekday</code>.
        Parser runs in your browser in local time for “next run” previews.
      </p>

      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Label htmlFor="cron-expr">Expression</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full"
            disabled={!expr.trim()}
            onClick={() => copy(expr.trim(), "Cron")}
          >
            <Copy className="size-3.5" />
            Copy
          </Button>
        </div>
        <Textarea
          id="cron-expr"
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          spellCheck={false}
          placeholder="0 * * * *"
          className="min-h-[80px] resize-y text-sm"
        />
      </div>

      {parsed.ok === false ? (
        <p className="text-sm text-destructive" role="alert">
          {parsed.message}
        </p>
      ) : (
        <div className="space-y-6">
          <section className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
            <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Plain language
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground">{parsed.human}</p>
          </section>

          <section>
            <h2 className="mb-2 text-sm font-medium text-muted-foreground">
              Next runs (first 12)
            </h2>
            <ul className="space-y-1 rounded-xl border border-border/60 bg-muted/15 py-2 text-sm">
              {parsed.dates.map((d, i) => (
                <li key={i} className="flex gap-3 px-4 py-1 tabular-nums">
                  <span className="w-6 text-muted-foreground">{i + 1}.</span>
                  <span>{d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "medium" })}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}
