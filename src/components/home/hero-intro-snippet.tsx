"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const SNIPPET_SOURCE = `/** Rolling readme — paste anywhere */
export const whoAmI = {
  name: "${siteConfig.name}",
  role: "Software Engineer",
  basedIn: "Hong Kong",
  focus: ["Systems", "Backend", "DX"],
} as const`;

type Token =
  | { t: "kw"; v: string }
  | { t: "str"; v: string }
  | { t: "key"; v: string }
  | { t: "sym"; v: string }
  | { t: "com"; v: string };

const LINES: Token[][] = [
  [{ t: "com", v: "/** Rolling readme — paste anywhere */" }],
  [
    { t: "kw", v: "export" },
    { t: "sym", v: " " },
    { t: "kw", v: "const" },
    { t: "sym", v: " whoAmI = {" },
  ],
  [
    { t: "sym", v: "  " },
    { t: "key", v: "name" },
    { t: "sym", v: ": " },
    { t: "str", v: `"${siteConfig.name}"` },
    { t: "sym", v: "," },
  ],
  [
    { t: "sym", v: "  " },
    { t: "key", v: "role" },
    { t: "sym", v: ": " },
    { t: "str", v: `"Software Engineer"` },
    { t: "sym", v: "," },
  ],
  [
    { t: "sym", v: "  " },
    { t: "key", v: "basedIn" },
    { t: "sym", v: ": " },
    { t: "str", v: `"Hong Kong"` },
    { t: "sym", v: "," },
  ],
  [
    { t: "sym", v: "  " },
    { t: "key", v: "focus" },
    { t: "sym", v: ": [" },
    { t: "str", v: `"Systems"` },
    { t: "sym", v: ", " },
    { t: "str", v: `"Backend"` },
    { t: "sym", v: ", " },
    { t: "str", v: `"DX"` },
    { t: "sym", v: "]," },
  ],
  [
    { t: "sym", v: "}" },
    { t: "sym", v: " " },
    { t: "kw", v: "as" },
    { t: "sym", v: " " },
    { t: "kw", v: "const" },
  ],
];

/** Keywords stay in the site’s sky lane; strings & keys use warmer hues so it isn’t one blue wash */
function tokenClass(tok: Token["t"]) {
  switch (tok) {
    case "kw":
      return "text-sky-300 dark:text-sky-200";
    case "str":
      return "text-emerald-400 dark:text-emerald-300";
    case "key":
      return "text-violet-300 dark:text-violet-200";
    case "com":
      return "italic text-zinc-500 dark:text-zinc-400";
    default:
      return "text-zinc-100 dark:text-zinc-100";
  }
}

export function HeroIntroSnippet({
  className,
  motionDelayBase = 0.28,
}: {
  className?: string;
  motionDelayBase?: number;
}) {
  const reduceMotion = useReducedMotion();
  const [copied, setCopied] = React.useState(false);

  const copy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(SNIPPET_SOURCE);
      setCopied(true);
      toast.success("Snippet copied");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy");
    }
  }, []);

  const step = reduceMotion ? 0 : 0.045;

  return (
    <motion.figure
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: motionDelayBase,
        duration: reduceMotion ? 0.25 : 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "font-mono relative mx-auto w-full max-w-lg lg:mx-0",
        // Showcase frame — gradient halo like snippet preview cards
        "rounded-2xl bg-gradient-to-br from-primary/28 via-cyan-400/18 to-transparent p-[1px] shadow-[0_24px_80px_-28px_color-mix(in_oklab,var(--color-primary)_45%,transparent)]",
        className,
      )}
      aria-label="Code-style introduction snippet"
    >
      <div className="overflow-hidden rounded-[15px] bg-[var(--snippet-bg)] ring-1 ring-[color:var(--snippet-border)]">
        <figcaption className="flex items-center justify-between gap-3 border-b border-[color:var(--snippet-border)] bg-[var(--snippet-bar)] px-3 py-2 sm:px-3.5">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex shrink-0 gap-1" aria-hidden>
              <span className="size-2.5 rounded-full bg-[#ff5f56]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#27c93f]" />
            </span>
            <span className="truncate font-mono text-[11px] text-zinc-400 sm:text-xs">
              wayne.ts
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="rounded-md bg-primary/15 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-primary">
              TypeScript
            </span>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-1 rounded-lg border border-[color:var(--snippet-border)] bg-white/[0.06] px-2 py-1 font-mono text-[11px] text-zinc-200 transition-colors hover:bg-white/[0.11] hover:text-white"
              aria-label="Copy snippet"
            >
              {copied ? (
                <Check className="size-3 text-emerald-400" aria-hidden />
              ) : (
                <Copy className="size-3 opacity-80" aria-hidden />
              )}
              <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </figcaption>

        <div className="flex bg-[var(--snippet-bg)] font-mono text-[11px] leading-relaxed sm:text-xs md:text-[13px]">
          <div
            className="select-none border-r border-[color:var(--snippet-border)] bg-[var(--snippet-gutter)] px-2 py-3 text-right text-zinc-500 tabular-nums sm:px-3"
            aria-hidden
          >
            {LINES.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <pre className="min-w-0 flex-1 overflow-x-auto bg-[var(--snippet-bg)] p-3 text-left">
            <code className="inline-block min-w-full">
              {LINES.map((line, row) => (
                <motion.div
                  key={row}
                  className="whitespace-pre"
                  initial={reduceMotion ? undefined : { opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: motionDelayBase + 0.12 + row * step,
                    duration: reduceMotion ? 0 : 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {line.map((tok, i) => (
                    <span key={i} className={tokenClass(tok.t)}>
                      {tok.v}
                    </span>
                  ))}
                  {row === LINES.length - 1 ? (
                    <motion.span
                      className="ml-0.5 inline-block h-[1em] w-2 translate-y-px rounded-sm bg-primary align-middle"
                      animate={
                        reduceMotion ? { opacity: 1 } : { opacity: [1, 0.25, 1] }
                      }
                      transition={{
                        duration: 1.05,
                        repeat: reduceMotion ? 0 : Infinity,
                        ease: "easeInOut",
                      }}
                      aria-hidden
                    />
                  ) : null}
                </motion.div>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </motion.figure>
  );
}
