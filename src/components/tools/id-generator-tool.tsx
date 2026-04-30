"use client";

import * as React from "react";
import { ulid } from "ulid";
import { customAlphabet, nanoid } from "nanoid";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const nanoReadable = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  21,
);

export function IdGeneratorTool() {
  const [uuid, setUuid] = React.useState(() => crypto.randomUUID());
  const [ulidVal, setUlidVal] = React.useState(() => ulid());
  const [nanoLen, setNanoLen] = React.useState(12);
  const [nano, setNano] = React.useState(() => nanoid(12));
  const [bulkCount, setBulkCount] = React.useState(5);
  const [bulkOut, setBulkOut] = React.useState("");

  const genUuid = React.useCallback(() => {
    setUuid(crypto.randomUUID());
  }, []);

  const genUlid = React.useCallback(() => {
    setUlidVal(ulid());
  }, []);

  const genNano = React.useCallback(() => {
    const len = Math.min(36, Math.max(4, nanoLen));
    setNano(nanoid(len));
  }, [nanoLen]);

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied`);
    } catch {
      toast.error("Could not copy");
    }
  };

  const runBulk = (kind: "uuid" | "ulid" | "nano") => {
    const n = Math.min(100, Math.max(1, bulkCount));
    const lines: string[] = [];
    const len = Math.min(36, Math.max(4, nanoLen));
    for (let i = 0; i < n; i++) {
      if (kind === "uuid") lines.push(crypto.randomUUID());
      else if (kind === "ulid") lines.push(ulid());
      else lines.push(nanoid(len));
    }
    setBulkOut(lines.join("\n"));
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8 font-mono">
      <Tabs defaultValue="uuid" className="w-full">
        <TabsList className="grid h-auto w-full grid-cols-3 rounded-xl bg-muted/60 p-1">
          <TabsTrigger value="uuid" className="rounded-lg text-xs sm:text-sm">
            UUID v4
          </TabsTrigger>
          <TabsTrigger value="ulid" className="rounded-lg text-xs sm:text-sm">
            ULID
          </TabsTrigger>
          <TabsTrigger value="nano" className="rounded-lg text-xs sm:text-sm">
            NanoID
          </TabsTrigger>
        </TabsList>

        <TabsContent value="uuid" className="mt-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button type="button" className="rounded-full gap-2" onClick={genUuid}>
              <RefreshCw className="size-3.5" />
              Regenerate
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              disabled={!uuid}
              onClick={() => copy(uuid, "UUID")}
            >
              <Copy className="size-3.5" />
              Copy
            </Button>
          </div>
          <Input readOnly value={uuid} className="rounded-xl font-mono text-sm" />
        </TabsContent>

        <TabsContent value="ulid" className="mt-6 space-y-4">
          <p className="text-xs text-muted-foreground">
            Lexicographically sortable, 128-bit; embeds a timestamp in the first chars.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button type="button" className="rounded-full gap-2" onClick={genUlid}>
              <RefreshCw className="size-3.5" />
              Regenerate
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              disabled={!ulidVal}
              onClick={() => copy(ulidVal, "ULID")}
            >
              <Copy className="size-3.5" />
              Copy
            </Button>
          </div>
          <Input readOnly value={ulidVal} className="rounded-xl font-mono text-sm" />
        </TabsContent>

        <TabsContent value="nano" className="mt-6 space-y-4">
          <div className="flex flex-wrap items-end gap-4">
            <div className="space-y-2">
              <Label htmlFor="nano-len">Length</Label>
              <Input
                id="nano-len"
                type="number"
                min={4}
                max={36}
                value={nanoLen}
                onChange={(e) => setNanoLen(Number(e.target.value))}
                className="w-24 rounded-xl font-mono"
              />
            </div>
            <Button type="button" className="rounded-full gap-2" onClick={genNano}>
              <RefreshCw className="size-3.5" />
              Regenerate
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              disabled={!nano}
              onClick={() => copy(nano, "NanoID")}
            >
              <Copy className="size-3.5" />
              Copy
            </Button>
          </div>
          <Input readOnly value={nano} className="rounded-xl font-mono text-sm" />
          <p className="text-xs text-muted-foreground">
            Default NanoID alphabet is URL-safe. For a ULID-like charset sample:{" "}
            <button
              type="button"
              className="text-primary underline-offset-2 hover:underline"
              onClick={() => setNano(nanoReadable())}
            >
              generate 21-char alphanumeric
            </button>
          </p>
        </TabsContent>
      </Tabs>

      <section className="space-y-3 rounded-xl border border-border/60 bg-muted/10 p-4">
        <h2 className="text-sm font-medium text-foreground">Bulk generate</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Label htmlFor="bulk-n" className="sr-only">
            Count
          </Label>
          <Input
            id="bulk-n"
            type="number"
            min={1}
            max={100}
            value={bulkCount}
            onChange={(e) => setBulkCount(Number(e.target.value))}
            className="w-24 rounded-xl font-mono text-sm"
          />
          <span className="text-xs text-muted-foreground">lines (max 100)</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="secondary" size="sm" className="rounded-full" onClick={() => runBulk("uuid")}>
            UUID × N
          </Button>
          <Button type="button" variant="secondary" size="sm" className="rounded-full" onClick={() => runBulk("ulid")}>
            ULID × N
          </Button>
          <Button type="button" variant="secondary" size="sm" className="rounded-full" onClick={() => runBulk("nano")}>
            NanoID × N
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full"
            disabled={!bulkOut}
            onClick={() => copy(bulkOut, "Bulk IDs")}
          >
            <Copy className="size-3.5" />
            Copy all
          </Button>
        </div>
        <Textarea
          readOnly
          value={bulkOut}
          placeholder="Generated IDs appear here"
          className="min-h-[160px] resize-y bg-background text-sm"
        />
      </section>
    </div>
  );
}
