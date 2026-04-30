"use client";

import * as React from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

/** Encode each line separately (useful for lists of paths or keys). */
function encodePerLine(text: string, encodeFn: (s: string) => string): string {
  return text
    .split("\n")
    .map((line) => {
      if (!line.length) return "";
      try {
        return encodeFn(line);
      } catch {
        return line;
      }
    })
    .join("\n");
}

export function UrlCodecTool() {
  const [encodeIn, setEncodeIn] = React.useState("price=$100 & qty=2\nhello world");
  const [encodeOut, setEncodeOut] = React.useState("");
  const [decodeIn, setDecodeIn] = React.useState("");
  const [decodeOut, setDecodeOut] = React.useState("");
  const [decodeError, setDecodeError] = React.useState<string | null>(null);
  const [perLine, setPerLine] = React.useState(false);

  React.useEffect(() => {
    try {
      if (perLine) {
        setEncodeOut(encodePerLine(encodeIn, encodeURIComponent));
      } else {
        setEncodeOut(encodeURIComponent(encodeIn));
      }
    } catch {
      setEncodeOut("");
    }
  }, [encodeIn, perLine]);

  React.useEffect(() => {
    if (!decodeIn.trim()) {
      setDecodeOut("");
      setDecodeError(null);
      return;
    }
    try {
      if (perLine) {
        setDecodeOut(
          decodeIn
            .split("\n")
            .map((line) => {
              if (!line.length) return "";
              return decodeURIComponent(line);
            })
            .join("\n"),
        );
      } else {
        setDecodeOut(decodeURIComponent(decodeIn));
      }
      setDecodeError(null);
    } catch {
      setDecodeOut("");
      setDecodeError("decodeURIComponent failed — input may be malformed.");
    }
  }, [decodeIn, perLine]);

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
      <p className="rounded-xl border border-border/60 bg-muted/15 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
        Uses <code className="text-foreground">encodeURIComponent</code> /{" "}
        <code className="text-foreground">decodeURIComponent</code> (UTF-8). For full URLs,
        prefer encoding only the query parameter values you control — not the whole scheme/host unless you know why.
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="button"
          variant={perLine ? "secondary" : "outline"}
          size="sm"
          className="rounded-full"
          onClick={() => setPerLine((v) => !v)}
        >
          {perLine ? "Per-line mode: on" : "Per-line mode: off"}
        </Button>
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
            <Label htmlFor="url-enc-in" className="text-muted-foreground">
              Raw string
            </Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full"
              disabled={!encodeIn}
              onClick={() => copy(encodeIn, "Raw")}
            >
              <Copy className="size-3.5" />
              Copy input
            </Button>
          </div>
          <Textarea
            id="url-enc-in"
            value={encodeIn}
            onChange={(e) => setEncodeIn(e.target.value)}
            spellCheck={false}
            className="min-h-[160px] resize-y text-sm leading-relaxed"
          />
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Label className="text-muted-foreground">Encoded</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full"
              disabled={!encodeOut}
              onClick={() => copy(encodeOut, "Encoded")}
            >
              <Copy className="size-3.5" />
              Copy output
            </Button>
          </div>
          <Textarea
            readOnly
            value={encodeOut}
            spellCheck={false}
            className="min-h-[160px] resize-y bg-muted/25 text-sm leading-relaxed"
          />
        </TabsContent>

        <TabsContent value="decode" className="mt-6 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Label htmlFor="url-dec-in" className="text-muted-foreground">
              Encoded string
            </Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full"
              disabled={!decodeIn}
              onClick={() => copy(decodeIn, "Encoded")}
            >
              <Copy className="size-3.5" />
              Copy input
            </Button>
          </div>
          <Textarea
            id="url-dec-in"
            value={decodeIn}
            onChange={(e) => setDecodeIn(e.target.value)}
            spellCheck={false}
            placeholder="%20hello%20world"
            className="min-h-[160px] resize-y text-sm leading-relaxed"
          />
          {decodeError ? (
            <p className="text-sm text-destructive" role="alert">
              {decodeError}
            </p>
          ) : null}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Label className="text-muted-foreground">Decoded</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full"
              disabled={!decodeOut}
              onClick={() => copy(decodeOut, "Decoded")}
            >
              <Copy className="size-3.5" />
              Copy output
            </Button>
          </div>
          <Textarea
            readOnly
            value={decodeOut}
            spellCheck={false}
            className="min-h-[160px] resize-y bg-muted/25 text-sm leading-relaxed"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
