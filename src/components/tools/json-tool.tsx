"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {
  Braces,
  Copy,
  Download,
  TreeDeciduous,
  AlertCircle,
  Check,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const SAMPLE = `{
  "name": "Wayne Yu",
  "role": "Software Engineer",
  "focus": ["distributed systems", "DX", "shipping"],
  "location": "Hong Kong"
}`;

function tryParseJson(text: string): { ok: true; value: unknown } | { ok: false; message: string } {
  const trimmed = text.trim();
  if (!trimmed) {
    return { ok: false, message: "Paste JSON to get started." };
  }
  try {
    return { ok: true, value: JSON.parse(trimmed) };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Invalid JSON";
    return { ok: false, message: msg };
  }
}

function JsonTree({ data, depth = 0 }: { data: unknown; depth?: number }) {
  const pad = depth * 14;
  if (data === null) {
    return (
      <span className="font-mono text-sm text-muted-foreground" style={{ paddingLeft: pad }}>
        null
      </span>
    );
  }
  if (typeof data === "string") {
    return (
      <span className="font-mono text-sm text-emerald-600 dark:text-emerald-400" style={{ paddingLeft: pad }}>
        &quot;{data}&quot;
      </span>
    );
  }
  if (typeof data === "number" || typeof data === "boolean") {
    return (
      <span className="font-mono text-sm text-sky-600 dark:text-sky-400" style={{ paddingLeft: pad }}>
        {String(data)}
      </span>
    );
  }
  if (Array.isArray(data)) {
    if (data.length === 0) {
      return (
        <span className="font-mono text-sm text-muted-foreground" style={{ paddingLeft: pad }}>
          []
        </span>
      );
    }
    return (
      <ul className="space-y-1 border-l border-foreground/10 pl-3" style={{ marginLeft: pad }}>
        {data.map((item, i) => (
          <li key={i} className="font-mono text-xs text-muted-foreground">
            <span className="text-foreground/60">[{i}]</span>{" "}
            <JsonTree data={item} depth={0} />
          </li>
        ))}
      </ul>
    );
  }
  if (typeof data === "object") {
    const entries = Object.entries(data as Record<string, unknown>);
    if (entries.length === 0) {
      return (
        <span className="font-mono text-sm text-muted-foreground" style={{ paddingLeft: pad }}>
          {"{}"}
        </span>
      );
    }
    return (
      <ul className="space-y-2 border-l border-foreground/10 pl-3" style={{ marginLeft: pad }}>
        {entries.map(([k, v]) => (
          <li key={k}>
            <span className="font-mono text-sm text-primary">{k}</span>
            <span className="text-muted-foreground">: </span>
            {typeof v === "object" && v !== null ? (
              <JsonTree data={v} depth={depth + 1} />
            ) : (
              <JsonTree data={v} depth={0} />
            )}
          </li>
        ))}
      </ul>
    );
  }
  return null;
}

export function JsonTool() {
  const { resolvedTheme } = useTheme();
  const [input, setInput] = React.useState(SAMPLE);
  const [highlighted, setHighlighted] = React.useState<string>("");
  const parsed = React.useMemo(() => tryParseJson(input), [input]);
  const formatted =
    parsed.ok === true ? JSON.stringify(parsed.value, null, 2) : "";

  React.useEffect(() => {
    if (parsed.ok !== true) {
      setHighlighted("");
      return;
    }
    let cancelled = false;
    (async () => {
      const { codeToHtml } = await import("shiki");
      const theme = resolvedTheme === "dark" ? "github-dark" : "github-light";
      const html = await codeToHtml(formatted, {
        lang: "json",
        theme,
      });
      if (!cancelled) setHighlighted(html);
    })();
    return () => {
      cancelled = true;
    };
  }, [formatted, parsed.ok, resolvedTheme]);

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied`);
    } catch {
      toast.error("Could not copy");
    }
  };

  const download = () => {
    if (parsed.ok !== true) return;
    const blob = new Blob([formatted], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Download started");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-medium text-muted-foreground">Input</h2>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => setInput(SAMPLE)}
            >
              Load sample
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => copy(input, "Input")}
              disabled={!input.trim()}
            >
              <Copy className="size-3.5" />
              Copy
            </Button>
          </div>
        </div>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          className="min-h-[320px] resize-y font-mono text-sm leading-relaxed"
          placeholder='{ "hello": "world" }'
        />
        {parsed.ok === false ? (
          <div
            className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
            role="alert"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
            <span>{parsed.message}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-400">
            <Check className="size-4 shrink-0" aria-hidden />
            Valid JSON — explore formatted view or tree.
          </div>
        )}
      </div>

      <div className="flex min-h-[320px] flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-medium text-muted-foreground">Output</h2>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full"
              disabled={parsed.ok !== true}
              onClick={() => copy(formatted, "Formatted JSON")}
            >
              <Copy className="size-3.5" />
              Copy formatted
            </Button>
            <Button
              type="button"
              size="sm"
              className="rounded-full"
              disabled={parsed.ok !== true}
              onClick={download}
            >
              <Download className="size-3.5" />
              Download
            </Button>
          </div>
        </div>
        <Tabs defaultValue="formatted" className="flex flex-1 flex-col">
          <TabsList className="grid w-full grid-cols-2 rounded-xl bg-muted/60 p-1">
            <TabsTrigger value="formatted" className="rounded-lg gap-1.5">
              <Braces className="size-3.5" />
              Formatted
            </TabsTrigger>
            <TabsTrigger value="tree" className="rounded-lg gap-1.5">
              <TreeDeciduous className="size-3.5" />
              Tree
            </TabsTrigger>
          </TabsList>
          <TabsContent value="formatted" className="mt-3 flex-1">
            <ScrollArea className="h-[min(420px,55vh)] rounded-2xl bg-muted/20">
              {parsed.ok === true && highlighted ? (
                <div
                  className="p-4 text-sm [&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:!p-0"
                  dangerouslySetInnerHTML={{ __html: highlighted }}
                />
              ) : (
                <div className="p-4 font-mono text-sm text-muted-foreground">
                  {parsed.ok === true ? "Loading highlighter…" : "Fix JSON to preview."}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="tree" className="mt-3 flex-1">
            <ScrollArea className="h-[min(420px,55vh)] rounded-2xl bg-muted/20 p-4">
              {parsed.ok === true ? (
                <JsonTree data={parsed.value} />
              ) : (
                <p className="text-sm text-muted-foreground">Tree view needs valid JSON.</p>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
