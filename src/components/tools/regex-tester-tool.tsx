"use client";

import * as React from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

function buildFlags(g: boolean, i: boolean, m: boolean, s: boolean, u: boolean, y: boolean): string {
  let f = "";
  if (g) f += "g";
  if (i) f += "i";
  if (m) f += "m";
  if (s) f += "s";
  if (u) f += "u";
  if (y) f += "y";
  return f;
}

export function RegexTesterTool() {
  const [pattern, setPattern] = React.useState("(\\d{3})-?(\\d{4})");
  const [g, setG] = React.useState(true);
  const [icase, setIcase] = React.useState(false);
  const [m, setM] = React.useState(false);
  const [s, setS] = React.useState(false);
  const [u, setU] = React.useState(true);
  const [y, setY] = React.useState(false);
  const [haystack, setHaystack] = React.useState("Call 415-555-1212 or 2125550199");

  const parsed = React.useMemo(() => {
    const flags = buildFlags(g, icase, m, s, u, y);
    try {
      const re = new RegExp(pattern, flags);
      return { ok: true as const, re, flags };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Invalid pattern";
      return { ok: false as const, message: msg };
    }
  }, [pattern, g, icase, m, s, u, y]);

  const matches = React.useMemo(() => {
    if (parsed.ok !== true) return [];
    try {
      const src = parsed.re.source;
      const flags = parsed.re.flags.includes("g") ? parsed.re.flags : `${parsed.re.flags}g`;
      const rg = new RegExp(src, flags);
      const list: { index: number; match: string; groups: string[] }[] = [];
      let n = 0;
      for (const m of haystack.matchAll(rg)) {
        if (n++ > 400) break;
        list.push({
          index: m.index ?? 0,
          match: m[0],
          groups: [...m].slice(1),
        });
      }
      return list;
    } catch {
      return [];
    }
  }, [parsed, haystack]);

  const highlighted = React.useMemo(() => {
    if (parsed.ok !== true) return haystack;
    try {
      const src = parsed.re.source;
      const flags = parsed.re.flags.includes("g") ? parsed.re.flags : `${parsed.re.flags}g`;
      const rg = new RegExp(src, flags);
      const nodes: React.ReactNode[] = [];
      let last = 0;
      let guard = 0;
      for (const m of haystack.matchAll(rg)) {
        if (guard++ > 400) break;
        const start = m.index ?? 0;
        if (start > last) nodes.push(haystack.slice(last, start));
        nodes.push(
          <mark key={`${start}-${guard}`} className="rounded bg-primary/25 px-0.5 text-foreground">
            {m[0]}
          </mark>,
        );
        last = start + m[0].length;
      }
      nodes.push(haystack.slice(last));
      return nodes.length ? <>{nodes}</> : haystack;
    } catch {
      return haystack;
    }
  }, [parsed, haystack]);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied");
    } catch {
      toast.error("Could not copy");
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 font-mono">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="rx-pattern">Pattern</Label>
            <Input
              id="rx-pattern"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              spellCheck={false}
              className="rounded-xl font-mono text-sm"
              placeholder="\\d+"
            />
          </div>
          <fieldset className="space-y-2 rounded-xl border border-border/50 bg-muted/10 p-3">
            <legend className="text-xs font-medium text-muted-foreground">Flags</legend>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {(
                [
                  ["g", "Global", g, setG],
                  ["i", "Ignore case", icase, setIcase],
                  ["m", "Multiline ^$", m, setM],
                  ["s", "DotAll", s, setS],
                  ["u", "Unicode", u, setU],
                  ["y", "Sticky", y, setY],
                ] as const
              ).map(([id, label, val, set]) => (
                <label key={id} className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={val}
                    onChange={(e) => set(e.target.checked)}
                    className="accent-primary"
                  />
                  <span>
                    <span className="font-medium text-foreground">{id}</span>{" "}
                    <span className="text-muted-foreground">— {label}</span>
                  </span>
                </label>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Flags string:{" "}
              <code className="text-foreground">{parsed.ok === true ? parsed.flags || "(none)" : "—"}</code>
            </p>
          </fieldset>
        </div>

        <div className="space-y-2">
          <Label htmlFor="rx-text">Test string</Label>
          <Textarea
            id="rx-text"
            value={haystack}
            onChange={(e) => setHaystack(e.target.value)}
            spellCheck={false}
            className="min-h-[180px] resize-y text-sm leading-relaxed"
          />
        </div>
      </div>

      {parsed.ok === false ? (
        <p className="rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {parsed.message}
        </p>
      ) : (
        <>
          <section className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-medium text-muted-foreground">Highlighted</h2>
              <Button type="button" variant="outline" size="sm" className="rounded-full" onClick={() => copy(haystack)}>
                <Copy className="size-3.5" />
                Copy text
              </Button>
            </div>
            <div className="min-h-[80px] rounded-xl border border-border/60 bg-muted/15 px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap">
              {highlighted}
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-sm font-medium text-muted-foreground">
              Matches ({matches.length})
            </h2>
            <ScrollArea className="max-h-[280px] rounded-xl border border-border/60 bg-muted/10">
              <ul className="divide-y divide-border/50 p-2 text-xs">
                {matches.length === 0 ? (
                  <li className="px-2 py-6 text-center text-muted-foreground">No matches</li>
                ) : (
                  matches.map((row, idx) => (
                    <li key={idx} className="px-2 py-2">
                      <div className="flex flex-wrap gap-2 text-muted-foreground">
                        <span>#{idx + 1}</span>
                        <span>@ {row.index}</span>
                      </div>
                      <div className="mt-1 break-all text-foreground">{row.match}</div>
                      {row.groups.some(Boolean) ? (
                        <div className="mt-1 text-muted-foreground">
                          Groups:{" "}
                          {row.groups.map((gr, i) => (
                            <span key={i} className="mr-2 inline-block rounded bg-background/80 px-1">
                              {i + 1}: {gr || "∅"}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </li>
                  ))
                )}
              </ul>
            </ScrollArea>
          </section>
        </>
      )}
    </div>
  );
}
