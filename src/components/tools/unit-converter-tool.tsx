"use client";

import * as React from "react";
import { ArrowLeftRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Category = "length" | "weight" | "temperature" | "data";

const LENGTH_TO_M: Record<string, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.344,
};

const WEIGHT_TO_KG: Record<string, number> = {
  mg: 1e-6,
  g: 0.001,
  kg: 1,
  t: 1000,
  lb: 0.45359237,
  oz: 0.028349523125,
};

const DATA_TO_BYTES: Record<string, number> = {
  B: 1,
  KB: 1024,
  MB: 1024 ** 2,
  GB: 1024 ** 3,
  TB: 1024 ** 4,
  PB: 1024 ** 5,
};

function toCelsius(value: number, unit: string): number {
  if (unit === "C") return value;
  if (unit === "F") return ((value - 32) * 5) / 9;
  if (unit === "K") return value - 273.15;
  return value;
}

function fromCelsius(c: number, unit: string): number {
  if (unit === "C") return c;
  if (unit === "F") return (c * 9) / 5 + 32;
  if (unit === "K") return c + 273.15;
  return c;
}

function convert(
  category: Category,
  amount: number,
  from: string,
  to: string,
): number {
  if (Number.isNaN(amount)) return NaN;
  if (category === "temperature") {
    const c = toCelsius(amount, from);
    return fromCelsius(c, to);
  }
  if (category === "length") {
    const m = amount * (LENGTH_TO_M[from] ?? 1);
    return m / (LENGTH_TO_M[to] ?? 1);
  }
  if (category === "weight") {
    const kg = amount * (WEIGHT_TO_KG[from] ?? 1);
    return kg / (WEIGHT_TO_KG[to] ?? 1);
  }
  const bytes = amount * (DATA_TO_BYTES[from] ?? 1);
  return bytes / (DATA_TO_BYTES[to] ?? 1);
}

const defaults: Record<
  Category,
  { from: string; to: string; sample: string }
> = {
  length: { from: "m", to: "ft", sample: "1" },
  weight: { from: "kg", to: "lb", sample: "70" },
  temperature: { from: "C", to: "F", sample: "22" },
  data: { from: "GB", to: "MB", sample: "1.5" },
};

export function UnitConverterTool() {
  const [category, setCategory] = React.useState<Category>("length");
  const { from: dFrom, to: dTo, sample } = defaults[category];
  const [fromUnit, setFromUnit] = React.useState(dFrom);
  const [toUnit, setToUnit] = React.useState(dTo);
  const [input, setInput] = React.useState(sample);

  React.useEffect(() => {
    const d = defaults[category];
    setFromUnit(d.from);
    setToUnit(d.to);
    setInput(d.sample);
  }, [category]);

  const amount = parseFloat(input.replace(/,/g, ""));
  const output = convert(category, amount, fromUnit, toUnit);

  const swap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    if (!Number.isNaN(output)) {
      const rounded = formatNumber(output);
      setInput(rounded.replace(/,/g, ""));
    }
  };

  const unitOptions = React.useMemo(() => {
    if (category === "length") return Object.keys(LENGTH_TO_M);
    if (category === "weight") return Object.keys(WEIGHT_TO_KG);
    if (category === "data") return Object.keys(DATA_TO_BYTES);
    return ["C", "F", "K"];
  }, [category]);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <Tabs
        value={category}
        onValueChange={(v) => setCategory(v as Category)}
        className="w-full"
      >
        <TabsList className="grid h-auto w-full grid-cols-2 gap-1 rounded-xl bg-muted/60 p-1 sm:grid-cols-4">
          {(
            [
              ["length", "Length"],
              ["weight", "Weight"],
              ["temperature", "Temp"],
              ["data", "Data"],
            ] as const
          ).map(([id, label]) => (
            <TabsTrigger
              key={id}
              value={id}
              className="rounded-lg px-2 py-2 text-xs sm:text-sm"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        {(["length", "weight", "temperature", "data"] as const).map((c) => (
          <TabsContent key={c} value={c} className="mt-6 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="from-amount">From</Label>
                <Input
                  id="from-amount"
                  inputMode="decimal"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="rounded-xl font-mono text-lg"
                />
                <Select
                  value={fromUnit}
                  onValueChange={(v) => {
                    if (v) setFromUnit(v);
                  }}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {unitOptions.map((u) => (
                      <SelectItem key={u} value={u}>
                        {u}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="to-result">To</Label>
                <Input
                  id="to-result"
                  readOnly
                  value={Number.isFinite(output) ? formatNumber(output) : "—"}
                  className="rounded-xl border-transparent bg-muted/60 font-mono text-lg ring-1 ring-foreground/8 dark:ring-white/10"
                />
                <Select
                  value={toUnit}
                  onValueChange={(v) => {
                    if (v) setToUnit(v);
                  }}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {unitOptions.map((u) => (
                      <SelectItem key={u} value={u}>
                        {u}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={swap}
              >
                <ArrowLeftRight className="size-4" />
                Swap units
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return "";
  const abs = Math.abs(n);
  const digits = abs >= 1000 || abs < 0.0001 ? 6 : abs < 1 ? 6 : 4;
  return n.toLocaleString(undefined, {
    maximumFractionDigits: digits,
    minimumFractionDigits: 0,
  });
}
