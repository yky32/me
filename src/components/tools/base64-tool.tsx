"use client";

import * as React from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

function utf8ToBase64Binary(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]!);
  return btoa(binary);
}

function base64BinaryToUtf8(b64: string): string {
  const trimmed = b64.replace(/\s/g, "");
  const binary = atob(trimmed);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function toUrlSafe(b64: string): string {
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromUrlSafe(safe: string): string {
  let b64 = safe.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4;
  if (pad) b64 += "=".repeat(4 - pad);
  return b64;
}

export function Base64Tool() {
  const [plain, setPlain] = React.useState('Hello — UTF-8 → Base64');
  const [encoded, setEncoded] = React.useState("");
  const [decodeInput, setDecodeInput] = React.useState("");
  const [decodeOutput, setDecodeOutput] = React.useState("");
  const [decodeError, setDecodeError] = React.useState<string | null>(null);
  const [urlSafe, setUrlSafe] = React.useState(false);

  React.useEffect(() => {
    try {
      let out = utf8ToBase64Binary(plain);
      if (urlSafe) out = toUrlSafe(out);
      setEncoded(out);
    } catch {
      setEncoded("");
    }
  }, [plain, urlSafe]);

  React.useEffect(() => {
    if (!decodeInput.trim()) {
      setDecodeOutput("");
      setDecodeError(null);
      return;
    }
    try {
      const normalized = urlSafe ? fromUrlSafe(decodeInput.trim()) : decodeInput.trim();
      setDecodeOutput(base64BinaryToUtf8(normalized));
      setDecodeError(null);
    } catch {
      setDecodeOutput("");
      setDecodeError("Could not decode — check padding and URL-safe mode.");
    }
  }, [decodeInput, urlSafe]);

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
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border/60 bg-muted/15 px-4 py-3 text-sm text-muted-foreground">
        <p className="max-w-xl leading-relaxed">
          Runs entirely in your browser. Base64 is not encryption — do not use it to protect secrets.
        </p>
        <div className="flex items-center gap-2">
          <Switch id="url-safe" checked={urlSafe} onCheckedChange={setUrlSafe} />
          <Label htmlFor="url-safe" className="cursor-pointer text-foreground">
            URL-safe (-_)
          </Label>
        </div>
      </div>

      <Tabs defaultValue="encode" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 rounded-xl bg-muted/60 p-1">
          <TabsTrigger value="encode" className="rounded-lg">
            Encode
          </TabsTrigger>
          <TabsTrigger value="decode" className="rounded-lg">
            Decode
          </TabsTrigger>
        </TabsList>

        <TabsContent value="encode" className="mt-6 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Label htmlFor="b64-plain" className="text-muted-foreground">
              Plain text (UTF-8)
            </Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full"
              disabled={!plain}
              onClick={() => copy(plain, "Plain text")}
            >
              <Copy className="size-3.5" />
              Copy input
            </Button>
          </div>
          <Textarea
            id="b64-plain"
            value={plain}
            onChange={(e) => setPlain(e.target.value)}
            spellCheck={false}
            className="min-h-[160px] resize-y text-sm leading-relaxed"
          />
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Label className="text-muted-foreground">Base64 output</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full"
              disabled={!encoded}
              onClick={() => copy(encoded, "Base64")}
            >
              <Copy className="size-3.5" />
              Copy output
            </Button>
          </div>
          <Textarea
            readOnly
            value={encoded}
            spellCheck={false}
            className="min-h-[120px] resize-y bg-muted/25 text-sm leading-relaxed"
          />
        </TabsContent>

        <TabsContent value="decode" className="mt-6 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Label htmlFor="b64-in" className="text-muted-foreground">
              Base64 input
            </Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full"
              disabled={!decodeInput.trim()}
              onClick={() => copy(decodeInput, "Base64 input")}
            >
              <Copy className="size-3.5" />
              Copy input
            </Button>
          </div>
          <Textarea
            id="b64-in"
            value={decodeInput}
            onChange={(e) => setDecodeInput(e.target.value)}
            spellCheck={false}
            placeholder="Paste Base64 (whitespace ignored)"
            className="min-h-[160px] resize-y text-sm leading-relaxed"
          />
          {decodeError ? (
            <p className="text-sm text-destructive" role="alert">
              {decodeError}
            </p>
          ) : null}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Label className="text-muted-foreground">Decoded UTF-8</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full"
              disabled={!decodeOutput}
              onClick={() => copy(decodeOutput, "Decoded text")}
            >
              <Copy className="size-3.5" />
              Copy output
            </Button>
          </div>
          <Textarea
            readOnly
            value={decodeOutput}
            spellCheck={false}
            className="min-h-[160px] resize-y bg-muted/25 text-sm leading-relaxed"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
