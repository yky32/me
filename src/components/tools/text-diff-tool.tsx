"use client";

import * as React from "react";
import { diffLines } from "diff";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export function TextDiffTool() {
  const [left, setLeft] = React.useState(`{
  "service": "payments",
  "timeout_ms": 5000
}`);
  const [right, setRight] = React.useState(`{
  "service": "payments",
  "timeout_ms": 8000,
  "retries": 2
}`);

  const parts = React.useMemo(() => diffLines(left, right), [left, right]);

  const simpleStats = React.useMemo(() => {
    let additions = 0;
    let removals = 0;
    for (const p of parts) {
      if (!p.added && !p.removed) continue;
      const chunks = p.value.split("\n");
      const lines = p.value.endsWith("\n") ? chunks.length - 1 : chunks.length;
      const n = lines === 0 && p.value.length ? 1 : Math.max(0, lines);
      if (p.added) additions += n;
      if (p.removed) removals += n;
    }
    return { additions, removals };
  }, [parts]);

  return (
    <div className="mx-auto max-w-6xl space-y-6 font-mono">
      <p className="text-sm text-muted-foreground">
        Line-oriented diff (Myers). Paste configs, JSON, or logs — scroll the unified view below.
      </p>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="diff-left">Before / left</Label>
          <Textarea
            id="diff-left"
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            spellCheck={false}
            className="min-h-[220px] resize-y text-sm leading-relaxed"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="diff-right">After / right</Label>
          <Textarea
            id="diff-right"
            value={right}
            onChange={(e) => setRight(e.target.value)}
            spellCheck={false}
            className="min-h-[220px] resize-y text-sm leading-relaxed"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
        <span>
          <span className="text-emerald-600 dark:text-emerald-400">+{simpleStats.additions}</span> lines added
        </span>
        <span>
          <span className="text-red-600 dark:text-red-400">−{simpleStats.removals}</span> lines removed
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border/60 bg-muted/15">
        <pre className="min-h-[200px] max-h-[min(480px,55vh)] overflow-auto p-4 text-xs leading-relaxed whitespace-pre-wrap">
          {parts.map((part, i) => (
            <span
              key={i}
              className={cn(
                part.added && "bg-emerald-500/18 text-emerald-900 dark:text-emerald-100",
                part.removed && "bg-red-500/18 text-red-900 dark:text-red-100",
              )}
            >
              {part.value}
            </span>
          ))}
        </pre>
      </div>
    </div>
  );
}
