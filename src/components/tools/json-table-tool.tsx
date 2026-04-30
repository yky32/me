"use client";

import * as React from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

const SAMPLE = `[
  { "id": 1, "region": "HK", "latency_ms": 42, "meta": { "tier": "gold" } },
  { "id": 2, "region": "US", "latency_ms": 180, "meta": { "tier": "silver" } }
]`;

function flattenRow(obj: Record<string, unknown>, prefix = ""): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v === null || v === undefined) {
      out[key] = String(v);
    } else if (typeof v === "object" && !Array.isArray(v)) {
      Object.assign(out, flattenRow(v as Record<string, unknown>, key));
    } else if (Array.isArray(v)) {
      out[key] = JSON.stringify(v);
    } else {
      out[key] = String(v);
    }
  }
  return out;
}

type ParseResult =
  | { ok: true; columns: string[]; rows: Record<string, string>[] }
  | { ok: false; message: string };

function parseTableJson(text: string): ParseResult {
  const trimmed = text.trim();
  if (!trimmed) return { ok: false, message: "Paste JSON (array of objects or one object)." };
  let data: unknown;
  try {
    data = JSON.parse(trimmed);
  } catch (e) {
    return { ok: false, message: e instanceof Error ? e.message : "Invalid JSON" };
  }

  let objects: Record<string, unknown>[] = [];
  if (Array.isArray(data)) {
    if (data.length === 0) return { ok: false, message: "Array is empty." };
    if (!data.every((x) => x !== null && typeof x === "object" && !Array.isArray(x))) {
      return { ok: false, message: "Array must contain only objects." };
    }
    objects = data as Record<string, unknown>[];
  } else if (data !== null && typeof data === "object" && !Array.isArray(data)) {
    objects = [data as Record<string, unknown>];
  } else {
    return { ok: false, message: "Root must be an object or array of objects." };
  }

  const flattened = objects.map((o) => flattenRow(o));
  const colSet = new Set<string>();
  for (const row of flattened) {
    for (const c of Object.keys(row)) colSet.add(c);
  }
  const columns = [...colSet].sort((a, b) => a.localeCompare(b));

  const rows = flattened.map((row) => {
    const out: Record<string, string> = {};
    for (const c of columns) {
      out[c] = row[c] ?? "";
    }
    return out;
  });

  return { ok: true, columns, rows };
}

export function JsonTableTool() {
  const [input, setInput] = React.useState(SAMPLE);
  const parsed = React.useMemo(() => parseTableJson(input), [input]);

  const tsv = React.useMemo(() => {
    if (parsed.ok !== true) return "";
    const header = parsed.columns.join("\t");
    const lines = parsed.rows.map((r) => parsed.columns.map((c) => r[c] ?? "").join("\t"));
    return [header, ...lines].join("\n");
  }, [parsed]);

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied`);
    } catch {
      toast.error("Could not copy");
    }
  };

  return (
    <div className="mx-auto max-w-full space-y-6 font-mono">
      <p className="text-sm text-muted-foreground">
        Flattens nested objects with dot paths (arrays JSON-stringified). Good for skimming API payloads or diffing
        exports.
      </p>

      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Label htmlFor="jt-json">JSON</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full"
            disabled={!input.trim()}
            onClick={() => copy(input, "JSON")}
          >
            <Copy className="size-3.5" />
            Copy JSON
          </Button>
        </div>
        <Textarea
          id="jt-json"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          className="min-h-[180px] resize-y text-sm leading-relaxed"
        />
      </div>

      {parsed.ok === false ? (
        <p className="text-sm text-destructive">{parsed.message}</p>
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full"
              disabled={!tsv}
              onClick={() => copy(tsv, "TSV")}
            >
              <Copy className="size-3.5" />
              Copy as TSV
            </Button>
            <span className="text-xs text-muted-foreground">
              {parsed.rows.length} row(s) · {parsed.columns.length} column(s)
            </span>
          </div>

          <ScrollArea className="max-h-[min(520px,60vh)] rounded-xl border border-border/60">
            <table className="w-max min-w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="sticky left-0 z-10 bg-muted/95 px-3 py-2 font-medium backdrop-blur-sm">
                    #
                  </th>
                  {parsed.columns.map((c) => (
                    <th key={c} className="whitespace-nowrap px-3 py-2 font-medium text-foreground">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {parsed.rows.map((row, ri) => (
                  <tr key={ri} className="border-b border-border/40 odd:bg-muted/10">
                    <td className="sticky left-0 z-10 bg-background/95 px-3 py-2 text-muted-foreground backdrop-blur-sm">
                      {ri + 1}
                    </td>
                    {parsed.columns.map((c) => (
                      <td key={c} className="max-w-[320px] break-words px-3 py-2 align-top">
                        {row[c]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollArea>
        </>
      )}
    </div>
  );
}
