"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formatInTimeZone } from "date-fns-tz";
import { Clock, Link2, Plus, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COMMON_TIMEZONES } from "@/lib/timezones";

const STORAGE_FAVORITES = "tz-favorites-v1";
const MAX_ZONES = 6;

/** Hong Kong first for regional default; remainder alphabetical by IANA id */
const ZONE_OPTIONS: string[] = [
  "Asia/Hong_Kong",
  ...[...COMMON_TIMEZONES]
    .filter((z) => z !== "Asia/Hong_Kong")
    .sort((a, b) => a.localeCompare(b)),
];

const DEFAULT_ZONES = ["Asia/Hong_Kong", "UTC", "America/New_York"] as const;

function parseZonesParam(raw: string | null): string[] {
  if (!raw) return [...DEFAULT_ZONES];
  const parts = raw
    .split(",")
    .map((z) => z.trim())
    .filter(Boolean);
  const valid = new Set(ZONE_OPTIONS);
  const filtered = parts.filter((z) => valid.has(z));
  const capped = filtered.slice(0, MAX_ZONES);
  return capped.length > 0 ? capped : [...DEFAULT_ZONES];
}

function encodeZones(zones: string[]) {
  return zones.join(",");
}

export function TimezoneTool() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [now, setNow] = React.useState(() => new Date());
  const [zones, setZones] = React.useState<string[]>(() => [...DEFAULT_ZONES]);
  const [favorites, setFavorites] = React.useState<string[]>([]);

  React.useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const validZoneSet = React.useMemo(() => new Set(ZONE_OPTIONS), []);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_FAVORITES);
      if (raw) {
        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed)) {
          const cleaned = parsed.filter(
            (z): z is string => typeof z === "string" && validZoneSet.has(z),
          );
          setFavorites(cleaned);
        }
      }
    } catch {
      /* ignore */
    }
  }, [validZoneSet]);

  const persistFavorites = React.useCallback((next: string[]) => {
    const cleaned = next.filter((z) => validZoneSet.has(z));
    setFavorites(cleaned);
    try {
      localStorage.setItem(STORAGE_FAVORITES, JSON.stringify(cleaned));
    } catch {
      /* ignore */
    }
  }, [validZoneSet]);

  const syncUrl = React.useCallback(
    (nextZones: string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("zones", encodeZones(nextZones));
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  React.useEffect(() => {
    setZones(parseZonesParam(searchParams.get("zones")));
  }, [searchParams]);

  const updateZone = (index: number, value: string) => {
    setZones((prev) => {
      const next = [...prev];
      next[index] = value;
      syncUrl(next);
      return next;
    });
  };

  const addRow = () => {
    setZones((prev) => {
      if (prev.length >= MAX_ZONES) {
        toast.error(`You can compare up to ${MAX_ZONES} timezones`);
        return prev;
      }
      const pick =
        ZONE_OPTIONS.find((z) => !prev.includes(z)) ?? ZONE_OPTIONS[0];
      const next = [...prev, pick];
      syncUrl(next);
      return next;
    });
  };

  const removeRow = (index: number) => {
    setZones((prev) => {
      if (prev.length <= 1) return prev;
      const next = prev.filter((_, i) => i !== index);
      syncUrl(next);
      return next;
    });
  };

  const toggleFavorite = (zone: string) => {
    persistFavorites(
      favorites.includes(zone)
        ? favorites.filter((z) => z !== zone)
        : [...favorites, zone],
    );
    toast.success(favorites.includes(zone) ? "Removed from favorites" : "Saved to favorites");
  };

  const copyShare = async () => {
    const url = `${window.location.origin}${pathname}?zones=${encodeURIComponent(encodeZones(zones))}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Share link copied");
    } catch {
      toast.error("Could not copy link");
    }
  };

  const applyFavorite = (zone: string) => {
    if (zones.length >= MAX_ZONES && !zones.includes(zone)) {
      toast.error(`Remove a row first (max ${MAX_ZONES})`);
      return;
    }
    if (!zones.includes(zone)) {
      setZones((prev) => {
        const next = [...prev, zone];
        syncUrl(next);
        return next;
      });
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="size-4 text-primary" aria-hidden />
              Live clocks · updates every second
            </div>
            <p className="text-xs text-muted-foreground">
              Compare up to {MAX_ZONES} zones · Hong Kong in default set · URL saves your layout
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={copyShare}
            >
              <Link2 className="size-3.5" />
              Copy share URL
            </Button>
            <Button
              type="button"
              size="sm"
              className="rounded-full"
              onClick={addRow}
              disabled={zones.length >= MAX_ZONES}
            >
              <Plus className="size-3.5" />
              Add city
            </Button>
          </div>
        </div>
        <div className="space-y-3">
          {zones.map((zone, index) => (
            <Card
              key={`${zone}-${index}`}
              className="border-0 bg-muted/20 shadow-none ring-0 dark:bg-white/[0.04]"
            >
              <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 space-y-0 pb-2">
                <CardTitle className="text-base font-medium">
                  <Label htmlFor={`tz-${index}`} className="sr-only">
                    Timezone {index + 1}
                  </Label>
                  <Select
                    value={zone}
                    onValueChange={(v) => {
                      if (v) updateZone(index, v);
                    }}
                  >
                    <SelectTrigger id={`tz-${index}`} className="w-[min(100%,280px)] rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ZONE_OPTIONS.map((z) => (
                        <SelectItem key={z} value={z}>
                          {z.replace(/_/g, " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardTitle>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    aria-label={favorites.includes(zone) ? "Remove favorite" : "Add favorite"}
                    onClick={() => toggleFavorite(zone)}
                  >
                    <Star
                      className={`size-4 ${favorites.includes(zone) ? "fill-primary text-primary" : ""}`}
                    />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="rounded-full text-muted-foreground hover:text-destructive"
                    aria-label="Remove row"
                    disabled={zones.length <= 1}
                    onClick={() => removeRow(index)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-2xl font-semibold tracking-tight sm:text-3xl">
                  {formatInTimeZone(now, zone, "HH:mm:ss")}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatInTimeZone(now, zone, "EEEE, MMMM d, yyyy zzz")}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="h-fit rounded-2xl border-0 bg-muted/20 ring-0 dark:bg-white/[0.04]">
        <CardHeader>
          <CardTitle className="text-base">Favorites</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {favorites.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Star a timezone to pin it here for quick insert.
            </p>
          ) : (
            <ul className="space-y-2">
              {favorites.map((z) => (
                <li key={z} className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-medium">{z}</span>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="shrink-0 rounded-full"
                    disabled={zones.includes(z) || zones.length >= MAX_ZONES}
                    onClick={() => applyFavorite(z)}
                  >
                    Add
                  </Button>
                </li>
              ))}
            </ul>
          )}
          <div className="pt-2">
            <Label htmlFor="manual-zone" className="text-xs text-muted-foreground">
              Current URL zones token
            </Label>
            <Input
              id="manual-zone"
              readOnly
              value={encodeZones(zones)}
              className="mt-1 font-mono text-xs"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
