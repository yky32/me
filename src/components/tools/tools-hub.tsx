"use client";

import Link from "next/link";
import {
  ArrowDownAZ,
  Binary,
  Braces,
  CalendarClock,
  Clock3,
  GitCompare,
  Hash,
  KeyRound,
  Link2,
  Regex,
  Ruler,
  Search,
  Sparkles,
  Table2,
} from "lucide-react";
import { useMemo, useState, type ComponentType } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ToolCategory = "data" | "security" | "text" | "time" | "measure";

type ToolItem = {
  href: string;
  title: string;
  description: string;
  category: ToolCategory;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
};

const tools: ToolItem[] = [
  {
    href: "/tools/json",
    title: "JSON workspace",
    description:
      "Format, validate, syntax-highlight, and explore JSON as an expandable tree.",
    icon: Braces,
    category: "data",
  },
  {
    href: "/tools/timezone",
    title: "Timezone studio",
    description:
      "Live multi-city clocks, favorites, and shareable URLs for your team.",
    icon: Clock3,
    category: "time",
  },
  {
    href: "/tools/units",
    title: "Unit converter",
    description:
      "Length, weight, temperature, IEC/SI data sizes, speed, volume, and indicative FX — fast conversions with swap.",
    icon: Ruler,
    category: "measure",
  },
  {
    href: "/tools/base64",
    title: "Base64",
    description:
      "Encode or decode UTF-8 ↔ Base64 with optional URL-safe alphabet — handy for APIs and snippets.",
    icon: Binary,
    category: "data",
  },
  {
    href: "/tools/url",
    title: "URL encoder",
    description:
      "encodeURIComponent / decodeURIComponent with optional per-line mode for query-style strings.",
    icon: Link2,
    category: "data",
  },
  {
    href: "/tools/jwt",
    title: "JWT decoder",
    description:
      "Inspect header and payload (signature not verified). Useful when debugging auth — handle tokens carefully.",
    icon: KeyRound,
    category: "security",
  },
  {
    href: "/tools/hash",
    title: "Hash generator",
    description:
      "MD5, SHA-256/384/512, and optional bcrypt — hex digests or password hashes for debugging workflows.",
    icon: Hash,
    category: "security",
  },
  {
    href: "/tools/cron",
    title: "Cron explainer",
    description:
      "Plain-language schedule plus next run times for standard five-field cron expressions.",
    icon: CalendarClock,
    category: "time",
  },
  {
    href: "/tools/ids",
    title: "UUID · ULID · NanoID",
    description:
      "Generate ids for tests and fixtures — single values or bulk lists with copy buttons.",
    icon: Sparkles,
    category: "security",
  },
  {
    href: "/tools/diff",
    title: "Text diff",
    description:
      "Line-based unified diff with highlights — ideal next to the JSON formatter.",
    icon: GitCompare,
    category: "text",
  },
  {
    href: "/tools/regex",
    title: "Regex tester",
    description:
      "JavaScript RegExp with flags, live highlighting, and capture groups.",
    icon: Regex,
    category: "text",
  },
  {
    href: "/tools/json-table",
    title: "JSON → table",
    description:
      "Flatten objects into columns, browse in a table, copy as TSV.",
    icon: Table2,
    category: "data",
  },
];

const categories: { id: ToolCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "data", label: "Data & encoding" },
  { id: "security", label: "Security & IDs" },
  { id: "text", label: "Text & patterns" },
  { id: "time", label: "Time & schedules" },
  { id: "measure", label: "Units & measure" },
];

const cardSurface =
  "h-full rounded-3xl border-0 bg-muted/30 shadow-none ring-1 ring-border/50 transition-all duration-300 dark:bg-muted/25 dark:ring-white/[0.06]";

function countByCategory(cat: ToolCategory | "all"): number {
  if (cat === "all") return tools.length;
  return tools.filter((t) => t.category === cat).length;
}

export function ToolsHub() {
  const [category, setCategory] = useState<ToolCategory | "all">("all");
  const [sort, setSort] = useState<"featured" | "az">("featured");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = tools.filter((t) =>
      category === "all" ? true : t.category === category,
    );
    if (q.length > 0) {
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q),
      );
    }
    if (sort === "az") {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [category, query, sort]);

  return (
    <div className="mt-14 space-y-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="relative max-w-md flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            placeholder="Filter by name or description…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-10 rounded-xl border-border/60 bg-background/80 pl-9 shadow-none backdrop-blur-sm"
            aria-label="Filter tools"
          />
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Sort
          </p>
          <div
            className="inline-flex rounded-xl bg-muted/70 p-1 ring-1 ring-border/40 dark:bg-muted/40"
            role="group"
            aria-label="Sort order"
          >
            <button
              type="button"
              onClick={() => setSort("featured")}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                sort === "featured"
                  ? "bg-background text-foreground shadow-sm ring-1 ring-border/50 dark:bg-background/90"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Featured
            </button>
            <button
              type="button"
              onClick={() => setSort("az")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                sort === "az"
                  ? "bg-background text-foreground shadow-sm ring-1 ring-border/50 dark:bg-background/90"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <ArrowDownAZ className="size-3.5 opacity-70" aria-hidden />
              A–Z
            </button>
          </div>
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Category
        </p>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
          {categories.map((c) => {
            const count = countByCategory(c.id);
            const active = category === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                aria-pressed={active}
                className={cn(
                  "shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "border-primary/35 bg-primary/10 text-primary dark:bg-primary/15"
                    : "border-border/60 bg-background/60 text-muted-foreground hover:border-border hover:bg-muted/50 hover:text-foreground dark:bg-muted/20",
                )}
              >
                {c.label}
                <span
                  className={cn(
                    "ml-1.5 tabular-nums text-xs opacity-70",
                    active && "text-primary",
                  )}
                >
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border/60 bg-muted/20 px-6 py-12 text-center text-muted-foreground">
          No tools match your filters. Try clearing the search or choosing{" "}
          <button
            type="button"
            className="font-medium text-primary underline-offset-4 hover:underline"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
          >
            All categories
          </button>
          .
        </p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((tool) => (
            <li key={tool.href}>
              <Link href={tool.href} className="group block h-full">
                <Card
                  className={`${cardSurface} hover:-translate-y-1 hover:scale-[1.02] hover:bg-muted/45 hover:shadow-lg hover:shadow-primary/10 dark:hover:shadow-black/25`}
                >
                  <CardHeader>
                    <div className="mb-2 inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                      <tool.icon className="size-5" aria-hidden />
                    </div>
                    <CardTitle className="text-xl transition-colors group-hover:text-primary">
                      {tool.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="text-sm font-semibold text-primary">
                      Open tool →
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
