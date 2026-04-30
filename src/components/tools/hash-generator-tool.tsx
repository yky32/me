"use client";

import * as React from "react";
import { md5 } from "@noble/hashes/legacy.js";
import { bytesToHex } from "@noble/hashes/utils.js";
import bcrypt from "bcryptjs";
import { Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type FastAlgo = "MD5" | "SHA-256" | "SHA-384" | "SHA-512";

async function digestHex(alg: FastAlgo, text: string): Promise<string> {
  const buf = new TextEncoder().encode(text);
  if (alg === "MD5") {
    return bytesToHex(md5(buf));
  }
  const subtleAlg =
    alg === "SHA-256"
      ? "SHA-256"
      : alg === "SHA-384"
        ? "SHA-384"
        : "SHA-512";
  const hash = await crypto.subtle.digest(subtleAlg, buf);
  return bytesToHex(new Uint8Array(hash));
}

async function hashBcrypt(plain: string, rounds: number): Promise<string> {
  return bcrypt.hash(plain, rounds);
}

export function HashGeneratorTool() {
  const [algo, setAlgo] = React.useState<FastAlgo | "bcrypt">("SHA-256");
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [fastPending, setFastPending] = React.useState(false);
  const [bcryptRounds, setBcryptRounds] = React.useState(10);
  const [bcryptPending, setBcryptPending] = React.useState(false);

  React.useEffect(() => {
    if (algo === "bcrypt") {
      setOutput("");
      return;
    }
    if (!input) {
      setOutput("");
      return;
    }
    let cancelled = false;
    setFastPending(true);
    digestHex(algo, input)
      .then((hex) => {
        if (!cancelled) setOutput(hex);
      })
      .catch(() => {
        if (!cancelled) setOutput("");
      })
      .finally(() => {
        if (!cancelled) setFastPending(false);
      });
    return () => {
      cancelled = true;
    };
  }, [algo, input]);

  const runBcrypt = async () => {
    if (!input) {
      toast.error("Enter text to hash");
      return;
    }
    setBcryptPending(true);
    setOutput("");
    try {
      const hash = await hashBcrypt(input, bcryptRounds);
      setOutput(hash);
      toast.success("bcrypt hash generated");
    } catch {
      toast.error("bcrypt failed");
    } finally {
      setBcryptPending(false);
    }
  };

  const copy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      toast.success("Copied");
    } catch {
      toast.error("Could not copy");
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 font-mono">
      <div className="rounded-xl border border-border/60 bg-muted/15 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
        <p>
          MD5 and SHA digests are fast checksums.{" "}
          <span className="font-medium text-foreground">bcrypt</span> is intentionally slow for password
          storage — run only when needed; higher cost means longer waits.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="hash-algo">Algorithm</Label>
        <Select
          value={algo}
          onValueChange={(v) => setAlgo(v as FastAlgo | "bcrypt")}
        >
          <SelectTrigger id="hash-algo" className="max-w-md rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MD5">MD5 (checksum)</SelectItem>
            <SelectItem value="SHA-256">SHA-256</SelectItem>
            <SelectItem value="SHA-384">SHA-384</SelectItem>
            <SelectItem value="SHA-512">SHA-512</SelectItem>
            <SelectItem value="bcrypt">bcrypt (slow)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {algo === "bcrypt" ? (
        <div className="space-y-3 rounded-xl border border-border/50 bg-muted/10 p-4">
          <div className="flex flex-wrap items-center gap-4">
            <Label htmlFor="bcrypt-cost" className="text-muted-foreground shrink-0">
              Cost factor (rounds)
            </Label>
            <input
              id="bcrypt-cost"
              type="range"
              min={4}
              max={14}
              step={1}
              value={bcryptRounds}
              onChange={(e) => setBcryptRounds(Number(e.target.value))}
              className="h-2 flex-1 min-w-[140px] cursor-pointer accent-primary"
            />
            <span className="w-8 tabular-nums text-sm text-foreground">{bcryptRounds}</span>
          </div>
          <Button
            type="button"
            className="rounded-full"
            disabled={bcryptPending || !input.trim()}
            onClick={() => void runBcrypt()}
          >
            {bcryptPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Hashing…
              </>
            ) : (
              "Generate bcrypt hash"
            )}
          </Button>
        </div>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="hash-in">Input (UTF-8)</Label>
        <Textarea
          id="hash-in"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          placeholder="Payload or password material"
          className="min-h-[140px] resize-y text-sm leading-relaxed"
        />
      </div>

      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Label htmlFor="hash-out" className="flex items-center gap-2">
            Output {algo !== "bcrypt" && fastPending ? <Loader2 className="size-3.5 animate-spin" /> : null}
          </Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full"
            disabled={!output}
            onClick={() => void copy()}
          >
            <Copy className="size-3.5" />
            Copy
          </Button>
        </div>
        <Textarea
          id="hash-out"
          readOnly
          value={output}
          spellCheck={false}
          placeholder={algo === "bcrypt" ? "Run bcrypt to see hash" : "Hex digest"}
          className="min-h-[120px] resize-y break-all bg-muted/25 text-sm leading-relaxed"
        />
      </div>
    </div>
  );
}
