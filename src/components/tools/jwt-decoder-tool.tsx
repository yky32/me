"use client";

import * as React from "react";
import { AlertTriangle, Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

function base64UrlToUtf8(segment: string): string {
  let b64 = segment.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4;
  if (pad) b64 += "=".repeat(4 - pad);
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function tryPrettyJson(text: string): string {
  try {
    return JSON.stringify(JSON.parse(text), null, 2);
  } catch {
    return text;
  }
}

type ParsedJwt =
  | { ok: true; header: string; payload: string; signatureB64: string; expHuman: string | null }
  | { ok: false; message: string };

function parseJwt(token: string): ParsedJwt {
  const trimmed = token.trim();
  if (!trimmed) return { ok: false, message: "Paste a JWT (three dot-separated segments)." };
  const parts = trimmed.split(".");
  if (parts.length !== 3) {
    return { ok: false, message: "Expected header.payload.signature — wrong segment count." };
  }
  const [h, p, sig] = parts as [string, string, string];
  try {
    const headerRaw = base64UrlToUtf8(h);
    const payloadRaw = base64UrlToUtf8(p);
    const header = tryPrettyJson(headerRaw);
    const payload = tryPrettyJson(payloadRaw);
    let expHuman: string | null = null;
    try {
      const payloadObj = JSON.parse(payloadRaw) as Record<string, unknown>;
      if (typeof payloadObj.exp === "number") {
        expHuman = new Date(payloadObj.exp * 1000).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "medium",
        });
      }
    } catch {
      /* ignore */
    }
    return {
      ok: true,
      header,
      payload,
      signatureB64: sig,
      expHuman,
    };
  } catch {
    return { ok: false, message: "Could not Base64URL-decode header or payload." };
  }
}

export function JwtDecoderTool() {
  const [input, setInput] = React.useState("");
  const parsed = React.useMemo(() => parseJwt(input), [input]);

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied`);
    } catch {
      toast.error("Could not copy");
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 font-mono">
      <div
        className="flex gap-3 rounded-xl border border-amber-500/35 bg-amber-500/8 px-4 py-3 text-sm text-amber-950 dark:border-amber-400/25 dark:bg-amber-400/10 dark:text-amber-50"
        role="note"
      >
        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-700 dark:text-amber-300" aria-hidden />
        <div className="space-y-1 leading-relaxed">
          <p className="font-medium text-foreground">Decode only — signature is not verified.</p>
          <p className="text-muted-foreground dark:text-amber-100/85">
            Never paste production secrets or long-lived tokens into third-party sites. This page runs in your
            browser only; still treat JWTs as sensitive.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Label htmlFor="jwt-in" className="text-muted-foreground">
            JWT string
          </Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full"
            disabled={!input.trim()}
            onClick={() => copy(input.trim(), "JWT")}
          >
            <Copy className="size-3.5" />
            Copy JWT
          </Button>
        </div>
        <Textarea
          id="jwt-in"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          className="min-h-[120px] resize-y text-sm leading-relaxed"
        />
      </div>

      {parsed.ok === false ? (
        <p className={cn("text-sm", input.trim() ? "text-destructive" : "text-muted-foreground")} role="status">
          {parsed.message}
        </p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-medium text-muted-foreground">Header</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => copy(parsed.header, "Header")}
              >
                <Copy className="size-3.5" />
                Copy
              </Button>
            </div>
            <ScrollArea className="h-[min(220px,40vh)] rounded-xl border border-border/60 bg-muted/20 p-3">
              <pre className="whitespace-pre-wrap break-all text-xs leading-relaxed">{parsed.header}</pre>
            </ScrollArea>
          </section>

          <section className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-medium text-muted-foreground">Payload</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => copy(parsed.payload, "Payload")}
              >
                <Copy className="size-3.5" />
                Copy
              </Button>
            </div>
            {parsed.expHuman ? (
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">exp</span> → {parsed.expHuman}
              </p>
            ) : null}
            <ScrollArea className="h-[min(280px,45vh)] rounded-xl border border-border/60 bg-muted/20 p-3">
              <pre className="whitespace-pre-wrap break-all text-xs leading-relaxed">{parsed.payload}</pre>
            </ScrollArea>
          </section>

          <section className="space-y-2 lg:col-span-2">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-medium text-muted-foreground">Signature (raw Base64URL segment)</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => copy(parsed.signatureB64, "Signature")}
              >
                <Copy className="size-3.5" />
                Copy
              </Button>
            </div>
            <ScrollArea className="max-h-24 rounded-xl border border-dashed border-border/70 bg-muted/10 p-3">
              <pre className="break-all text-xs text-muted-foreground">{parsed.signatureB64}</pre>
            </ScrollArea>
          </section>
        </div>
      )}
    </div>
  );
}
