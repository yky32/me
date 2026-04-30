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

type Category =
  | "length"
  | "weight"
  | "temperature"
  | "data1024"
  | "data1000"
  | "speed"
  | "volume"
  | "currency";

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

/** Binary IEC-style (1024^n), excluding bare B handled separately */
const DATA_BINARY_TO_BYTES: Record<string, number> = {
  KiB: 1024,
  MiB: 1024 ** 2,
  GiB: 1024 ** 3,
  TiB: 1024 ** 4,
  PiB: 1024 ** 5,
};

/** Decimal SI marketing-style (1000^n) */
const DATA_DECIMAL_TO_BYTES: Record<string, number> = {
  kB: 1000,
  MB: 1000 ** 2,
  GB: 1000 ** 3,
  TB: 1000 ** 4,
  PB: 1000 ** 5,
};

/** Speed → m/s */
const SPEED_TO_MS: Record<string, number> = {
  "m/s": 1,
  "km/h": 1000 / 3600,
  mph: 0.44704,
  "ft/s": 0.3048,
  knot: 0.514444,
};

/** Volume → liters */
const VOLUME_TO_L: Record<string, number> = {
  mL: 0.001,
  L: 1,
  "m³": 1000,
  "gal (US)": 3.785411784,
  "qt (US)": 0.946352946,
  "cup (US)": 0.2365882365,
  "fl oz (US)": 0.0295735295625,
  "gal (UK)": 4.54609,
};

/** Fallback ECB-scale-ish snapshot when API fails */
const FALLBACK_USD_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 150,
  HKD: 7.78,
  CNY: 7.24,
  AUD: 1.53,
  CAD: 1.36,
  CHF: 0.88,
  SGD: 1.34,
  NZD: 1.67,
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

function convertBytesBinary(amount: number, from: string, to: string): number {
  const fromMult =
    from === "B" ? 1 : DATA_BINARY_TO_BYTES[from] ?? NaN;
  const toMult = to === "B" ? 1 : DATA_BINARY_TO_BYTES[to] ?? NaN;
  if (!Number.isFinite(fromMult) || !Number.isFinite(toMult)) return NaN;
  const bytes = amount * fromMult;
  return bytes / toMult;
}

function convertBytesDecimal(amount: number, from: string, to: string): number {
  const fromMult =
    from === "B" ? 1 : DATA_DECIMAL_TO_BYTES[from] ?? NaN;
  const toMult = to === "B" ? 1 : DATA_DECIMAL_TO_BYTES[to] ?? NaN;
  if (!Number.isFinite(fromMult) || !Number.isFinite(toMult)) return NaN;
  const bytes = amount * fromMult;
  return bytes / toMult;
}

function convertCurrency(
  amount: number,
  from: string,
  to: string,
  rates: Record<string, number>,
): number {
  const rFrom = rates[from];
  const rTo = rates[to];
  if (rFrom === undefined || rTo === undefined || rFrom <= 0 || rTo <= 0) return NaN;
  const inUsd = from === "USD" ? amount : amount / rFrom;
  return to === "USD" ? inUsd : inUsd * rTo;
}

function convert(
  category: Category,
  amount: number,
  from: string,
  to: string,
  usdRates: Record<string, number>,
): number {
  if (Number.isNaN(amount)) return NaN;
  if (category === "temperature") {
    const c = toCelsius(amount, from);
    return fromCelsius(c, to);
  }
  if (category === "length") {
    const m = amount * (LENGTH_TO_M[from] ?? NaN);
    return m / (LENGTH_TO_M[to] ?? NaN);
  }
  if (category === "weight") {
    const kg = amount * (WEIGHT_TO_KG[from] ?? NaN);
    return kg / (WEIGHT_TO_KG[to] ?? NaN);
  }
  if (category === "data1024") return convertBytesBinary(amount, from, to);
  if (category === "data1000") return convertBytesDecimal(amount, from, to);
  if (category === "speed") {
    const ms = amount * (SPEED_TO_MS[from] ?? NaN);
    return ms / (SPEED_TO_MS[to] ?? NaN);
  }
  if (category === "volume") {
    const liters = amount * (VOLUME_TO_L[from] ?? NaN);
    return liters / (VOLUME_TO_L[to] ?? NaN);
  }
  return convertCurrency(amount, from, to, usdRates);
}

const defaults: Record<
  Category,
  { from: string; to: string; sample: string }
> = {
  length: { from: "m", to: "ft", sample: "1" },
  weight: { from: "kg", to: "lb", sample: "70" },
  temperature: { from: "C", to: "F", sample: "22" },
  data1024: { from: "GiB", to: "MiB", sample: "1.5" },
  data1000: { from: "GB", to: "MB", sample: "500" },
  speed: { from: "km/h", to: "mph", sample: "100" },
  volume: { from: "L", to: "gal (US)", sample: "3.78" },
  currency: { from: "USD", to: "HKD", sample: "100" },
};

const TAB_META: { id: Category; label: string }[] = [
  { id: "length", label: "Length" },
  { id: "weight", label: "Weight" },
  { id: "temperature", label: "Temperature" },
  { id: "data1024", label: "Data · 1024" },
  { id: "data1000", label: "Data · 1000" },
  { id: "speed", label: "Speed" },
  { id: "volume", label: "Volume" },
  { id: "currency", label: "Currency" },
];

export function UnitConverterTool() {
  const [category, setCategory] = React.useState<Category>("length");
  const [usdRates, setUsdRates] =
    React.useState<Record<string, number>>(FALLBACK_USD_RATES);

  React.useEffect(() => {
    let cancelled = false;
    fetch("https://api.frankfurter.app/latest?from=USD")
      .then((r) => r.json())
      .then((data: { rates?: Record<string, number> }) => {
        if (cancelled || !data.rates || typeof data.rates !== "object") return;
        setUsdRates({ USD: 1, ...data.rates });
      })
      .catch(() => {
        if (!cancelled) setUsdRates(FALLBACK_USD_RATES);
      });
    return () => {
      cancelled = true;
    };
  }, []);

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

  const unitOptions = React.useMemo(() => {
    if (category === "length") return Object.keys(LENGTH_TO_M);
    if (category === "weight") return Object.keys(WEIGHT_TO_KG);
    if (category === "temperature") return ["C", "F", "K"];
    if (category === "data1024") return ["B", ...Object.keys(DATA_BINARY_TO_BYTES)];
    if (category === "data1000") return ["B", ...Object.keys(DATA_DECIMAL_TO_BYTES)];
    if (category === "speed") return Object.keys(SPEED_TO_MS);
    if (category === "volume") return Object.keys(VOLUME_TO_L);
    return Object.keys(usdRates).sort((a, b) => a.localeCompare(b));
  }, [category, usdRates]);

  const amount = parseFloat(input.replace(/,/g, ""));
  const output = convert(category, amount, fromUnit, toUnit, usdRates);

  const swap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    if (!Number.isNaN(output)) {
      const rounded = formatNumber(output);
      setInput(rounded.replace(/,/g, ""));
    }
  };

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <Tabs
        value={category}
        onValueChange={(v) => setCategory(v as Category)}
        className="w-full"
      >
        <TabsList className="grid h-auto w-full grid-cols-2 gap-1 rounded-xl bg-muted/60 p-1 md:grid-cols-4">
          {TAB_META.map(({ id, label }) => (
            <TabsTrigger
              key={id}
              value={id}
              className="rounded-lg px-2 py-2 text-xs sm:text-sm"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {TAB_META.map(({ id }) => (
          <TabsContent key={id} value={id} className="mt-6 space-y-6">
            {id === "currency" ? (
              <p className="text-xs leading-relaxed text-muted-foreground">
                Rates update from{" "}
                <span className="font-medium text-foreground">Frankfurter</span>{" "}
                (ECB series). Indicative only — not for trading or accounting.
              </p>
            ) : null}
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
                  className="rounded-xl border-primary/20 bg-primary/5 font-mono text-lg"
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
