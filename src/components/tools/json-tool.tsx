"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {
  AlignLeft,
  AlertCircle,
  Braces,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronsDownUp,
  ChevronsUpDown,
  Copy,
  Download,
  Minimize2,
  TreeDeciduous,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const SAMPLE = `{
  "name": "Wayne Yu",
  "role": "Software Engineer",
  "focus": ["distributed systems", "DX", "shipping"],
  "location": "Hong Kong"
}`;

type ParseFail = {
  ok: false;
  message: string;
  line?: number;
  col?: number;
};
type ParseOk = { ok: true; value: unknown };
type ParseResult = ParseFail | ParseOk;

function offsetToLineCol(text: string, offset: number): { line: number; col: number } {
  const safe = Math.min(Math.max(0, offset), text.length);
  let line = 1;
  let col = 1;
  for (let i = 0; i < safe; i++) {
    if (text[i] === "\n") {
      line++;
      col = 1;
    } else {
      col++;
    }
  }
  return { line, col };
}

function extractLineColFromJsonError(message: string): { line: number; col: number } | null {
  const lc = message.match(/line\s+(\d+)\s+column\s+(\d+)/i);
  if (lc) return { line: Number(lc[1]), col: Number(lc[2]) };
  const firefox = message.match(/line\s+(\d+)\s+at\s+column\s+(\d+)/i);
  if (firefox) return { line: Number(firefox[1]), col: Number(firefox[2]) };
  return null;
}

function extractOffsetFromJsonError(message: string): number | null {
  const m = message.match(/position\s+(\d+)/i);
  if (m) return Number(m[1]);
  return null;
}

function tryParseJson(text: string): ParseResult {
  if (!text.trim()) {
    return { ok: false, message: "Paste JSON to get started." };
  }
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Invalid JSON";
    const fromLineCol = extractLineColFromJsonError(msg);
    if (fromLineCol) {
      return { ok: false, message: msg, line: fromLineCol.line, col: fromLineCol.col };
    }
    const off = extractOffsetFromJsonError(msg);
    if (off !== null) {
      const { line, col } = offsetToLineCol(text, off);
      return { ok: false, message: msg, line, col };
    }
    return { ok: false, message: msg };
  }
}

function childPath(parent: string, key: string | number): string {
  if (typeof key === "number") return `${parent}[${key}]`;
  if (/^[A-Za-z_$][\w$]*$/.test(key)) return `${parent}.${key}`;
  return `${parent}[${JSON.stringify(key)}]`;
}

function collectBranchPaths(data: unknown, parent = "$"): string[] {
  if (data === null || typeof data !== "object") return [];
  if (Array.isArray(data)) {
    if (data.length === 0) return [];
    const childPaths = data.flatMap((item, i) =>
      collectBranchPaths(item, childPath(parent, i)),
    );
    return [parent, ...childPaths];
  }
  const entries = Object.entries(data as Record<string, unknown>);
  if (entries.length === 0) return [];
  const childPaths = entries.flatMap(([k, v]) =>
    collectBranchPaths(v, childPath(parent, k)),
  );
  return [parent, ...childPaths];
}

function JsonCollapsibleTree({
  data,
  path = "$",
  depth = 0,
  collapsed,
  toggle,
}: {
  data: unknown;
  path?: string;
  depth?: number;
  collapsed: Record<string, boolean>;
  toggle: (path: string) => void;
}) {
  const pad = depth * 12;

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
    const isOpen = collapsed[path] !== true;
    return (
      <div className="space-y-1" style={{ paddingLeft: pad }}>
        <div className="flex items-start gap-1">
          <button
            type="button"
            className="mt-0.5 inline-flex shrink-0 rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Collapse array" : "Expand array"}
            onClick={() => toggle(path)}
          >
            {isOpen ? (
              <ChevronDown className="size-4" aria-hidden />
            ) : (
              <ChevronRight className="size-4" aria-hidden />
            )}
          </button>
          {!isOpen ? (
            <span className="font-mono text-sm text-muted-foreground">
              [{data.length}] …
            </span>
          ) : (
            <ul className="flex-1 space-y-1 border-l border-foreground/10 pl-3">
              {data.map((item, i) => (
                <li key={i} className="font-mono text-xs text-muted-foreground">
                  <span className="text-foreground/60">[{i}]</span>{" "}
                  <JsonCollapsibleTree
                    data={item}
                    path={childPath(path, i)}
                    depth={0}
                    collapsed={collapsed}
                    toggle={toggle}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }

  const entries = Object.entries(data as Record<string, unknown>);
  if (entries.length === 0) {
    return (
      <span className="font-mono text-sm text-muted-foreground" style={{ paddingLeft: pad }}>
        {"{}"}
      </span>
    );
  }

  const isOpen = collapsed[path] !== true;
  return (
    <div className="space-y-2" style={{ paddingLeft: pad }}>
      <div className="flex items-start gap-1">
        <button
          type="button"
          className="mt-0.5 inline-flex shrink-0 rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Collapse object" : "Expand object"}
          onClick={() => toggle(path)}
        >
          {isOpen ? (
            <ChevronDown className="size-4" aria-hidden />
          ) : (
            <ChevronRight className="size-4" aria-hidden />
          )}
        </button>
        {!isOpen ? (
          <span className="font-mono text-sm text-muted-foreground">
            {"{"}
            {entries.length} …{"}"}
          </span>
        ) : (
          <ul className="flex-1 space-y-2 border-l border-foreground/10 pl-3">
            {entries.map(([k, v]) => (
              <li key={k}>
                <span className="font-mono text-sm text-primary">{k}</span>
                <span className="text-muted-foreground">: </span>
                <JsonCollapsibleTree
                  data={v}
                  path={childPath(path, k)}
                  depth={depth + 1}
                  collapsed={collapsed}
                  toggle={toggle}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function JsonTreePanel({ data }: { data: unknown }) {
  const [collapsed, setCollapsed] = React.useState<Record<string, boolean>>({});

  const toggle = React.useCallback((path: string) => {
    setCollapsed((prev) => ({
      ...prev,
      [path]: !(prev[path] === true),
    }));
  }, []);

  const branchPaths = React.useMemo(() => collectBranchPaths(data), [data]);

  const expandAll = React.useCallback(() => setCollapsed({}), []);

  const collapseAll = React.useCallback(() => {
    setCollapsed(Object.fromEntries(branchPaths.map((p) => [p, true])));
  }, [branchPaths]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-full gap-1.5"
          onClick={expandAll}
          disabled={branchPaths.length === 0}
        >
          <ChevronsUpDown className="size-3.5" aria-hidden />
          Expand all
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-full gap-1.5"
          onClick={collapseAll}
          disabled={branchPaths.length === 0}
        >
          <ChevronsDownUp className="size-3.5" aria-hidden />
          Collapse all
        </Button>
      </div>
      <ScrollArea className="h-[min(420px,55vh)] rounded-2xl bg-muted/20 p-4">
        <JsonCollapsibleTree data={data} collapsed={collapsed} toggle={toggle} />
      </ScrollArea>
    </div>
  );
}

function LineGutterTextarea({
  value,
  onChange,
  errorLine,
}: {
  value: string;
  onChange: (v: string) => void;
  errorLine: number | null;
}) {
  const taRef = React.useRef<HTMLTextAreaElement>(null);
  const gutterRef = React.useRef<HTMLDivElement>(null);

  const lines = value.split("\n");
  const lineCount = Math.max(lines.length, 1);

  const syncScroll = React.useCallback(() => {
    const ta = taRef.current;
    const g = gutterRef.current;
    if (ta && g) g.scrollTop = ta.scrollTop;
  }, []);

  return (
    <div className="flex overflow-hidden rounded-xl border border-input bg-background ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      <div
        ref={gutterRef}
        className="pointer-events-none shrink-0 overflow-hidden border-r border-border/60 bg-muted/30 py-3 pl-3 pr-2 text-right font-mono text-[13px] leading-[22px] text-muted-foreground select-none"
        aria-hidden
      >
        <div style={{ minHeight: 22 * lineCount }}>
          {Array.from({ length: lineCount }, (_, i) => {
            const n = i + 1;
            const bad = errorLine !== null && n === errorLine;
            return (
              <div
                key={n}
                className={cn(
                  "min-h-[22px] pr-1 tabular-nums",
                  bad && "rounded-l bg-destructive/25 font-semibold text-destructive",
                )}
              >
                {n}
              </div>
            );
          })}
        </div>
      </div>
      <textarea
        ref={taRef}
        value={value}
        spellCheck={false}
        onChange={(e) => onChange(e.target.value)}
        onScroll={syncScroll}
        placeholder='{ "hello": "world" }'
        className="min-h-[320px] min-w-0 flex-1 resize-y bg-transparent px-3 py-3 font-mono text-[13px] leading-[22px] outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}

export function JsonTool() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const [input, setInput] = React.useState(SAMPLE);
  const [highlighted, setHighlighted] = React.useState<{ formatted: string; minified: string }>({
    formatted: "",
    minified: "",
  });

  const parsed = React.useMemo(() => tryParseJson(input), [input]);

  const formatted =
    parsed.ok === true ? JSON.stringify(parsed.value, null, 2) : "";
  const minified = parsed.ok === true ? JSON.stringify(parsed.value) : "";

  const errorLine =
    parsed.ok === false && parsed.line !== undefined ? parsed.line : null;

  const shikiTheme =
    mounted && resolvedTheme === "dark" ? "github-dark" : "github-light";

  React.useEffect(() => {
    if (parsed.ok !== true) {
      setHighlighted({ formatted: "", minified: "" });
      return;
    }
    let cancelled = false;
    (async () => {
      const { codeToHtml } = await import("shiki");
      const [fHtml, mHtml] = await Promise.all([
        codeToHtml(formatted, { lang: "json", theme: shikiTheme }),
        codeToHtml(minified, { lang: "json", theme: shikiTheme }),
      ]);
      if (!cancelled) setHighlighted({ formatted: fHtml, minified: mHtml });
    })();
    return () => {
      cancelled = true;
    };
  }, [formatted, minified, parsed.ok, shikiTheme]);

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

  const replaceFormatted = () => {
    if (parsed.ok !== true) return;
    setInput(formatted);
    toast.success("Input replaced with formatted JSON");
  };

  const replaceMinified = () => {
    if (parsed.ok !== true) return;
    setInput(minified);
    toast.success("Input replaced with minified JSON");
  };

  const quotedLiteral =
    parsed.ok === true ? JSON.stringify(formatted) : "";

  return (
    <div className="font-mono grid gap-6 lg:grid-cols-2">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-medium text-muted-foreground">Input</h2>
          <div className="flex flex-wrap gap-2">
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
              className="rounded-full gap-1.5"
              disabled={parsed.ok !== true}
              onClick={replaceFormatted}
            >
              <AlignLeft className="size-3.5" aria-hidden />
              Format
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full gap-1.5"
              disabled={parsed.ok !== true}
              onClick={replaceMinified}
            >
              <Minimize2 className="size-3.5" aria-hidden />
              Minify
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

        <LineGutterTextarea value={input} onChange={setInput} errorLine={errorLine} />

        {parsed.ok === false ? (
          <div
            className="flex flex-col gap-1 rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
            role="alert"
          >
            <div className="flex items-start gap-2">
              <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span className="break-words">{parsed.message}</span>
            </div>
            {parsed.line !== undefined ? (
              <p className="pl-6 text-xs opacity-90">
                Highlighted line <span className="font-semibold">{parsed.line}</span>
                {parsed.col !== undefined ? (
                  <>
                    , column <span className="font-semibold">{parsed.col}</span>
                  </>
                ) : null}
              </p>
            ) : null}
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-400">
            <Check className="size-4 shrink-0" aria-hidden />
            Valid JSON — preview formatted, minified, or tree.
          </div>
        )}
      </div>

      <div className="flex min-h-[320px] flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-medium text-muted-foreground">Output</h2>
          <div className="flex flex-wrap gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex h-8 shrink-0 items-center justify-center gap-1 rounded-full border border-input bg-background px-3 text-xs font-medium hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50">
                Copy as
                <ChevronDown className="size-3 opacity-70" aria-hidden />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[200px]">
                <DropdownMenuItem
                  disabled={parsed.ok !== true}
                  onClick={() => parsed.ok === true && copy(formatted, "Pretty JSON")}
                >
                  Pretty JSON
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={parsed.ok !== true}
                  onClick={() => parsed.ok === true && copy(minified, "Minified JSON")}
                >
                  Minified JSON
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  disabled={parsed.ok !== true}
                  onClick={() => parsed.ok === true && copy(quotedLiteral, "Escaped string literal")}
                >
                  Escaped string literal
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full"
              disabled={parsed.ok !== true}
              onClick={() => copy(formatted, "Pretty JSON")}
            >
              <Copy className="size-3.5" />
              Copy pretty
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
          <TabsList className="grid h-auto w-full grid-cols-3 rounded-xl bg-muted/60 p-1">
            <TabsTrigger value="formatted" className="rounded-lg gap-1.5 text-xs sm:text-sm">
              <Braces className="size-3.5 shrink-0" />
              Pretty
            </TabsTrigger>
            <TabsTrigger value="minified" className="rounded-lg gap-1.5 text-xs sm:text-sm">
              <Minimize2 className="size-3.5 shrink-0" />
              Minified
            </TabsTrigger>
            <TabsTrigger value="tree" className="rounded-lg gap-1.5 text-xs sm:text-sm">
              <TreeDeciduous className="size-3.5 shrink-0" />
              Tree
            </TabsTrigger>
          </TabsList>
          <TabsContent value="formatted" className="mt-3 flex-1">
            <ScrollArea className="h-[min(420px,55vh)] rounded-2xl bg-muted/20">
              {parsed.ok === true && highlighted.formatted ? (
                <div
                  className="p-4 text-sm [&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:!p-0"
                  dangerouslySetInnerHTML={{ __html: highlighted.formatted }}
                />
              ) : (
                <div className="p-4 font-mono text-sm text-muted-foreground">
                  {parsed.ok === true ? "Loading highlighter…" : "Fix JSON to preview."}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="minified" className="mt-3 flex-1">
            <ScrollArea className="h-[min(420px,55vh)] rounded-2xl bg-muted/20">
              {parsed.ok === true && highlighted.minified ? (
                <div
                  className="break-all p-4 text-sm [&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:!whitespace-pre-wrap [&_pre]:!p-0"
                  dangerouslySetInnerHTML={{ __html: highlighted.minified }}
                />
              ) : (
                <div className="p-4 font-mono text-sm text-muted-foreground">
                  {parsed.ok === true ? "Loading highlighter…" : "Fix JSON to preview."}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="tree" className="mt-3 flex-1">
            {parsed.ok === true ? (
              <JsonTreePanel data={parsed.value} />
            ) : (
              <ScrollArea className="h-[min(420px,55vh)] rounded-2xl bg-muted/20 p-4">
                <p className="text-sm text-muted-foreground">Tree view needs valid JSON.</p>
              </ScrollArea>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
