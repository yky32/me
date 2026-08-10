"use client";

import * as React from "react";
import {
  Calendar,
  Copy,
  Download,
  Globe,
  ImagePlus,
  Link2,
  Mail,
  MessageSquare,
  Phone,
  QrCode,
  Trash2,
  Type,
  UserRound,
  Wifi,
} from "lucide-react";
import QRCode from "qrcode";
import { toast } from "sonner";

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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type QrType =
  | "link"
  | "text"
  | "email"
  | "call"
  | "sms"
  | "whatsapp"
  | "wifi"
  | "vcard"
  | "event";

type ErrorLevel = "L" | "M" | "Q" | "H";

const QR_TYPES: {
  id: QrType;
  label: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  blurb: string;
}[] = [
  { id: "link", label: "Link", icon: Link2, blurb: "Website URL" },
  { id: "text", label: "Text", icon: Type, blurb: "Plain text" },
  { id: "email", label: "E-mail", icon: Mail, blurb: "Compose email" },
  { id: "call", label: "Call", icon: Phone, blurb: "Phone dial" },
  { id: "sms", label: "SMS", icon: MessageSquare, blurb: "Text message" },
  { id: "whatsapp", label: "WhatsApp", icon: MessageSquare, blurb: "Chat link" },
  { id: "wifi", label: "WI-FI", icon: Wifi, blurb: "Network join" },
  { id: "vcard", label: "V-card", icon: UserRound, blurb: "Contact card" },
  { id: "event", label: "Event", icon: Calendar, blurb: "Calendar invite" },
];

const PRESET_FG = [
  "#0f172a",
  "#111827",
  "#1d4ed8",
  "#0f766e",
  "#b45309",
  "#be123c",
  "#6d28d9",
  "#ffffff",
] as const;

const PRESET_BG = [
  "#ffffff",
  "#f8fafc",
  "#fef3c7",
  "#ecfeff",
  "#fce7f3",
  "#000000",
] as const;

function escapeWifiValue(value: string): string {
  return value.replace(/([\\;,:"])/g, "\\$1");
}

function escapeVCard(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function foldIcalText(value: string): string {
  return value.replace(/\r?\n/g, "\\n");
}

function toIcalDateTime(local: string): string | null {
  // datetime-local: YYYY-MM-DDTHH:mm
  if (!local || local.length < 16) return null;
  const [date, time] = local.split("T");
  if (!date || !time) return null;
  const compact = `${date.replace(/-/g, "")}T${time.replace(":", "")}00`;
  return compact;
}

function normalizePhone(raw: string): string {
  return raw.replace(/[^\d+]/g, "");
}

function buildPayload(type: QrType, fields: FieldState): string {
  switch (type) {
    case "link": {
      const url = fields.url.trim();
      if (!url) return "";
      if (/^https?:\/\//i.test(url) || /^mailto:/i.test(url)) return url;
      return `https://${url}`;
    }
    case "text":
      return fields.text;
    case "email": {
      const email = fields.email.trim();
      if (!email) return "";
      const params = new URLSearchParams();
      if (fields.emailSubject.trim()) params.set("subject", fields.emailSubject.trim());
      if (fields.emailBody.trim()) params.set("body", fields.emailBody.trim());
      const q = params.toString();
      return q ? `mailto:${email}?${q}` : `mailto:${email}`;
    }
    case "call": {
      const phone = normalizePhone(fields.phone);
      return phone ? `tel:${phone}` : "";
    }
    case "sms": {
      const phone = normalizePhone(fields.phone);
      if (!phone) return "";
      const body = fields.smsBody.trim();
      // sms: URI — body param is widely supported on mobile
      return body
        ? `sms:${phone}?body=${encodeURIComponent(body)}`
        : `sms:${phone}`;
    }
    case "whatsapp": {
      const phone = normalizePhone(fields.phone).replace(/^\+/, "");
      if (!phone) return "";
      const text = fields.whatsappText.trim();
      return text
        ? `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
        : `https://wa.me/${phone}`;
    }
    case "wifi": {
      const ssid = fields.wifiSsid.trim();
      if (!ssid) return "";
      const enc =
        fields.wifiEncryption === "nopass"
          ? "nopass"
          : fields.wifiEncryption === "WEP"
            ? "WEP"
            : "WPA";
      const pass =
        enc === "nopass" ? "" : `P:${escapeWifiValue(fields.wifiPassword)};`;
      const hidden = fields.wifiHidden ? "H:true;" : "";
      return `WIFI:T:${enc};S:${escapeWifiValue(ssid)};${pass}${hidden};`;
    }
    case "vcard": {
      const first = fields.vcFirst.trim();
      const last = fields.vcLast.trim();
      const fn = [first, last].filter(Boolean).join(" ") || first || last;
      if (!fn && !fields.vcPhone.trim() && !fields.vcEmail.trim()) return "";
      const lines = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `N:${escapeVCard(last)};${escapeVCard(first)};;;`,
        `FN:${escapeVCard(fn)}`,
      ];
      if (fields.vcPhone.trim()) {
        lines.push(`TEL;TYPE=CELL:${escapeVCard(normalizePhone(fields.vcPhone))}`);
      }
      if (fields.vcMobile.trim()) {
        lines.push(`TEL;TYPE=CELL:${escapeVCard(normalizePhone(fields.vcMobile))}`);
      }
      if (fields.vcEmail.trim()) {
        lines.push(`EMAIL:${escapeVCard(fields.vcEmail.trim())}`);
      }
      if (fields.vcOrg.trim()) {
        lines.push(`ORG:${escapeVCard(fields.vcOrg.trim())}`);
      }
      if (fields.vcTitle.trim()) {
        lines.push(`TITLE:${escapeVCard(fields.vcTitle.trim())}`);
      }
      if (fields.vcUrl.trim()) {
        const u = fields.vcUrl.trim();
        const href = /^https?:\/\//i.test(u) ? u : `https://${u}`;
        lines.push(`URL:${escapeVCard(href)}`);
      }
      const street = fields.vcStreet.trim();
      const city = fields.vcCity.trim();
      const post = fields.vcPost.trim();
      const country = fields.vcCountry.trim();
      if (street || city || post || country) {
        lines.push(
          `ADR;TYPE=WORK:;;${escapeVCard(street)};${escapeVCard(city)};;${escapeVCard(post)};${escapeVCard(country)}`,
        );
      }
      lines.push("END:VCARD");
      return lines.join("\n");
    }
    case "event": {
      const summary = fields.eventTitle.trim();
      const start = toIcalDateTime(fields.eventStart);
      if (!summary || !start) return "";
      const end = toIcalDateTime(fields.eventEnd) ?? start;
      const lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//yky.app//QR Generator//EN",
        "BEGIN:VEVENT",
        `SUMMARY:${foldIcalText(summary)}`,
        `DTSTART:${start}`,
        `DTEND:${end}`,
      ];
      if (fields.eventLocation.trim()) {
        lines.push(`LOCATION:${foldIcalText(fields.eventLocation.trim())}`);
      }
      if (fields.eventDescription.trim()) {
        lines.push(`DESCRIPTION:${foldIcalText(fields.eventDescription.trim())}`);
      }
      lines.push("END:VEVENT", "END:VCALENDAR");
      return lines.join("\r\n");
    }
    default:
      return "";
  }
}

type FieldState = {
  url: string;
  text: string;
  email: string;
  emailSubject: string;
  emailBody: string;
  phone: string;
  smsBody: string;
  whatsappText: string;
  wifiSsid: string;
  wifiPassword: string;
  wifiEncryption: "WPA" | "WEP" | "nopass";
  wifiHidden: boolean;
  vcFirst: string;
  vcLast: string;
  vcPhone: string;
  vcMobile: string;
  vcEmail: string;
  vcOrg: string;
  vcTitle: string;
  vcUrl: string;
  vcStreet: string;
  vcCity: string;
  vcPost: string;
  vcCountry: string;
  eventTitle: string;
  eventStart: string;
  eventEnd: string;
  eventLocation: string;
  eventDescription: string;
};

const defaultFields: FieldState = {
  url: "https://www.yky.app",
  text: "Hello from yky.app",
  email: "",
  emailSubject: "",
  emailBody: "",
  phone: "",
  smsBody: "",
  whatsappText: "",
  wifiSsid: "",
  wifiPassword: "",
  wifiEncryption: "WPA",
  wifiHidden: false,
  vcFirst: "",
  vcLast: "",
  vcPhone: "",
  vcMobile: "",
  vcEmail: "",
  vcOrg: "",
  vcTitle: "",
  vcUrl: "",
  vcStreet: "",
  vcCity: "",
  vcPost: "",
  vcCountry: "",
  eventTitle: "",
  eventStart: "",
  eventEnd: "",
  eventLocation: "",
  eventDescription: "",
};

function ColorField({
  id,
  label,
  value,
  onChange,
  presets,
  disabled,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  presets: readonly string[];
  disabled?: boolean;
}) {
  return (
    <div className={cn("space-y-2", disabled && "opacity-50")}>
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center gap-3">
        <input
          id={id}
          type="color"
          value={value.length === 7 ? value : "#ffffff"}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className="size-10 shrink-0 cursor-pointer rounded-lg border border-border/60 bg-background p-1 disabled:cursor-not-allowed"
        />
        <Input
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 rounded-xl font-mono text-sm"
          spellCheck={false}
          aria-label={`${label} hex`}
        />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {presets.map((c) => (
          <button
            key={c}
            type="button"
            disabled={disabled}
            title={c}
            aria-label={`Use ${c}`}
            onClick={() => onChange(c)}
            className={cn(
              "size-7 rounded-md ring-1 ring-border/60 transition-transform hover:scale-110 disabled:cursor-not-allowed",
              value.toLowerCase() === c.toLowerCase() &&
                "ring-2 ring-primary ring-offset-2 ring-offset-background",
            )}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
    </div>
  );
}

function FieldBlock({
  label,
  htmlFor,
  children,
  hint,
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

async function drawLogoOnCanvas(
  canvas: HTMLCanvasElement,
  logoDataUrl: string,
  logoSizeRatio: number,
  pad: boolean,
): Promise<void> {
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = () => reject(new Error("logo load failed"));
    el.src = logoDataUrl;
  });

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const size = Math.round(canvas.width * logoSizeRatio);
  const x = Math.round((canvas.width - size) / 2);
  const y = Math.round((canvas.height - size) / 2);
  const padPx = Math.round(size * 0.12);

  if (pad) {
    ctx.fillStyle = "#ffffff";
    const r = Math.round(size * 0.12);
    const px = x - padPx;
    const py = y - padPx;
    const pw = size + padPx * 2;
    const ph = size + padPx * 2;
    ctx.beginPath();
    ctx.moveTo(px + r, py);
    ctx.arcTo(px + pw, py, px + pw, py + ph, r);
    ctx.arcTo(px + pw, py + ph, px, py + ph, r);
    ctx.arcTo(px, py + ph, px, py, r);
    ctx.arcTo(px, py, px + pw, py, r);
    ctx.closePath();
    ctx.fill();
  }

  ctx.drawImage(img, x, y, size, size);
}

export function QrGeneratorTool() {
  const [type, setType] = React.useState<QrType>("link");
  const [fields, setFields] = React.useState<FieldState>(defaultFields);
  const [fg, setFg] = React.useState("#0f172a");
  const [bg, setBg] = React.useState("#ffffff");
  const [transparentBg, setTransparentBg] = React.useState(false);
  const [errorLevel, setErrorLevel] = React.useState<ErrorLevel>("M");
  const [size, setSize] = React.useState(320);
  const [margin, setMargin] = React.useState(2);
  const [logoDataUrl, setLogoDataUrl] = React.useState<string | null>(null);
  const [logoPad, setLogoPad] = React.useState(true);
  const [logoRatio, setLogoRatio] = React.useState(0.22);
  const [dataUrl, setDataUrl] = React.useState<string | null>(null);
  const [payload, setPayload] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [pending, setPending] = React.useState(false);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);

  const setField = <K extends keyof FieldState>(key: K, value: FieldState[K]) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const effectiveErrorLevel: ErrorLevel = logoDataUrl
    ? errorLevel === "L" || errorLevel === "M"
      ? "H"
      : errorLevel
    : errorLevel;

  React.useEffect(() => {
    const next = buildPayload(type, fields);
    setPayload(next);

    if (!next.trim()) {
      setDataUrl(null);
      setError(null);
      setPending(false);
      return;
    }

    let cancelled = false;
    setPending(true);

    (async () => {
      try {
        const canvas = canvasRef.current ?? document.createElement("canvas");
        const light = transparentBg ? "#00000000" : bg;
        await QRCode.toCanvas(canvas, next, {
          errorCorrectionLevel: effectiveErrorLevel,
          width: size,
          margin,
          color: {
            dark: fg,
            light,
          },
        });

        if (logoDataUrl) {
          await drawLogoOnCanvas(canvas, logoDataUrl, logoRatio, logoPad);
        }

        if (cancelled) return;
        if (canvasRef.current !== canvas && canvasRef.current) {
          const dest = canvasRef.current;
          dest.width = canvas.width;
          dest.height = canvas.height;
          const ctx = dest.getContext("2d");
          ctx?.drawImage(canvas, 0, 0);
        }
        setDataUrl(canvas.toDataURL("image/png"));
        setError(null);
      } catch (e) {
        if (cancelled) return;
        setDataUrl(null);
        setError(
          e instanceof Error
            ? e.message
            : "Could not generate QR — content may be too long.",
        );
      } finally {
        if (!cancelled) setPending(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [
    type,
    fields,
    fg,
    bg,
    transparentBg,
    effectiveErrorLevel,
    size,
    margin,
    logoDataUrl,
    logoPad,
    logoRatio,
  ]);

  const onLogoFile = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Logo must be an image file");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Logo must be under 2 MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setLogoDataUrl(reader.result);
        toast.success("Logo added — using high error correction");
      }
    };
    reader.onerror = () => toast.error("Could not read logo");
    reader.readAsDataURL(file);
  };

  const downloadPng = () => {
    if (!dataUrl) {
      toast.error("Generate a QR first");
      return;
    }
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `qr-${type}-${Date.now()}.png`;
    a.click();
    toast.success("PNG downloaded");
  };

  const downloadSvg = async () => {
    if (!payload.trim()) {
      toast.error("Generate a QR first");
      return;
    }
    try {
      const light = transparentBg ? "#00000000" : bg;
      const svg = await QRCode.toString(payload, {
        type: "svg",
        errorCorrectionLevel: effectiveErrorLevel,
        width: size,
        margin,
        color: { dark: fg, light },
      });
      // Logo not embedded in SVG path for simplicity; note in toast if logo present
      const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `qr-${type}-${Date.now()}.svg`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(
        logoDataUrl
          ? "SVG downloaded (logo is PNG-only — use PNG for logo)"
          : "SVG downloaded",
      );
    } catch {
      toast.error("SVG export failed");
    }
  };

  const copyPayload = async () => {
    if (!payload) return;
    try {
      await navigator.clipboard.writeText(payload);
      toast.success("Encoded content copied");
    } catch {
      toast.error("Could not copy");
    }
  };

  const copyImage = async () => {
    if (!dataUrl) return;
    try {
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      if (typeof ClipboardItem === "undefined") {
        toast.error("Clipboard images not supported here — download instead");
        return;
      }
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
      toast.success("QR image copied");
    } catch {
      toast.error("Could not copy image — try download");
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <p className="rounded-xl border border-border/60 bg-muted/15 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
        Static QR codes — content is encoded directly in the pattern (like{" "}
        <span className="font-medium text-foreground">qr.io</span> static mode).
        Everything runs in your browser; nothing is uploaded. Dynamic short links,
        scan stats, and hosted PDF/gallery pages need a backend and are out of
        scope for this utility.
      </p>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:items-start">
        {/* Left: content + design */}
        <div className="space-y-8">
          {/* Step 1: type + fields */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                1
              </span>
              <h2 className="text-lg font-semibold tracking-tight">
                Complete the content
              </h2>
            </div>

            <div
              className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible"
              role="tablist"
              aria-label="QR code type"
            >
              {QR_TYPES.map((t) => {
                const active = type === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setType(t.id)}
                    className={cn(
                      "inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                      active
                        ? "border-primary/40 bg-primary/10 text-primary"
                        : "border-border/60 bg-background/70 text-muted-foreground hover:border-border hover:bg-muted/50 hover:text-foreground",
                    )}
                  >
                    <t.icon className="size-3.5 opacity-80" aria-hidden />
                    {t.label}
                  </button>
                );
              })}
            </div>

            <div className="rounded-2xl border border-border/50 bg-muted/15 p-4 sm:p-5 dark:bg-muted/10">
              <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {QR_TYPES.find((t) => t.id === type)?.blurb}
              </p>

              {type === "link" ? (
                <FieldBlock
                  label="Website URL"
                  htmlFor="qr-url"
                  hint="https:// is added automatically if you omit the scheme."
                >
                  <Input
                    id="qr-url"
                    value={fields.url}
                    onChange={(e) => setField("url", e.target.value)}
                    placeholder="https://example.com"
                    className="h-10 rounded-xl"
                    inputMode="url"
                    autoComplete="url"
                  />
                </FieldBlock>
              ) : null}

              {type === "text" ? (
                <FieldBlock label="Message" htmlFor="qr-text">
                  <Textarea
                    id="qr-text"
                    value={fields.text}
                    onChange={(e) => setField("text", e.target.value)}
                    rows={5}
                    className="rounded-xl"
                    maxLength={2000}
                  />
                  <p className="mt-1 text-right text-xs tabular-nums text-muted-foreground">
                    {fields.text.length}/2000
                  </p>
                </FieldBlock>
              ) : null}

              {type === "email" ? (
                <div className="space-y-4">
                  <FieldBlock label="Email" htmlFor="qr-email">
                    <Input
                      id="qr-email"
                      type="email"
                      value={fields.email}
                      onChange={(e) => setField("email", e.target.value)}
                      placeholder="hello@example.com"
                      className="h-10 rounded-xl"
                    />
                  </FieldBlock>
                  <FieldBlock label="Subject" htmlFor="qr-email-subject">
                    <Input
                      id="qr-email-subject"
                      value={fields.emailSubject}
                      onChange={(e) => setField("emailSubject", e.target.value)}
                      className="h-10 rounded-xl"
                    />
                  </FieldBlock>
                  <FieldBlock label="Message" htmlFor="qr-email-body">
                    <Textarea
                      id="qr-email-body"
                      value={fields.emailBody}
                      onChange={(e) => setField("emailBody", e.target.value)}
                      rows={4}
                      className="rounded-xl"
                    />
                  </FieldBlock>
                </div>
              ) : null}

              {type === "call" ? (
                <FieldBlock
                  label="Phone number"
                  htmlFor="qr-call"
                  hint="Include country code, e.g. +852…"
                >
                  <Input
                    id="qr-call"
                    type="tel"
                    value={fields.phone}
                    onChange={(e) => setField("phone", e.target.value)}
                    placeholder="+852 1234 5678"
                    className="h-10 rounded-xl"
                  />
                </FieldBlock>
              ) : null}

              {type === "sms" ? (
                <div className="space-y-4">
                  <FieldBlock label="Phone number" htmlFor="qr-sms-phone">
                    <Input
                      id="qr-sms-phone"
                      type="tel"
                      value={fields.phone}
                      onChange={(e) => setField("phone", e.target.value)}
                      placeholder="+852 1234 5678"
                      className="h-10 rounded-xl"
                    />
                  </FieldBlock>
                  <FieldBlock label="Message" htmlFor="qr-sms-body">
                    <Textarea
                      id="qr-sms-body"
                      value={fields.smsBody}
                      onChange={(e) => setField("smsBody", e.target.value)}
                      rows={3}
                      className="rounded-xl"
                    />
                  </FieldBlock>
                </div>
              ) : null}

              {type === "whatsapp" ? (
                <div className="space-y-4">
                  <FieldBlock
                    label="Phone number"
                    htmlFor="qr-wa-phone"
                    hint="International format without spaces works best (e.g. 85291234567)."
                  >
                    <Input
                      id="qr-wa-phone"
                      type="tel"
                      value={fields.phone}
                      onChange={(e) => setField("phone", e.target.value)}
                      placeholder="85291234567"
                      className="h-10 rounded-xl"
                    />
                  </FieldBlock>
                  <FieldBlock label="Message" htmlFor="qr-wa-text">
                    <Textarea
                      id="qr-wa-text"
                      value={fields.whatsappText}
                      onChange={(e) => setField("whatsappText", e.target.value)}
                      rows={3}
                      className="rounded-xl"
                    />
                  </FieldBlock>
                </div>
              ) : null}

              {type === "wifi" ? (
                <div className="space-y-4">
                  <FieldBlock label="Network name (SSID)" htmlFor="qr-wifi-ssid">
                    <Input
                      id="qr-wifi-ssid"
                      value={fields.wifiSsid}
                      onChange={(e) => setField("wifiSsid", e.target.value)}
                      className="h-10 rounded-xl"
                      autoComplete="off"
                    />
                  </FieldBlock>
                  <FieldBlock label="Encryption" htmlFor="qr-wifi-enc">
                    <Select
                      value={fields.wifiEncryption}
                      onValueChange={(v) =>
                        setField(
                          "wifiEncryption",
                          v as FieldState["wifiEncryption"],
                        )
                      }
                    >
                      <SelectTrigger
                        id="qr-wifi-enc"
                        className="h-10 w-full max-w-md rounded-xl"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WPA">WPA / WPA2 / WPA3</SelectItem>
                        <SelectItem value="WEP">WEP</SelectItem>
                        <SelectItem value="nopass">None (open)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FieldBlock>
                  {fields.wifiEncryption !== "nopass" ? (
                    <FieldBlock label="Password" htmlFor="qr-wifi-pass">
                      <Input
                        id="qr-wifi-pass"
                        type="text"
                        value={fields.wifiPassword}
                        onChange={(e) =>
                          setField("wifiPassword", e.target.value)
                        }
                        className="h-10 rounded-xl font-mono"
                        autoComplete="off"
                      />
                    </FieldBlock>
                  ) : null}
                  <div className="flex items-center justify-between gap-4 rounded-xl border border-border/50 bg-background/50 px-3 py-2.5">
                    <Label htmlFor="qr-wifi-hidden" className="font-normal">
                      Hidden network
                    </Label>
                    <Switch
                      id="qr-wifi-hidden"
                      checked={fields.wifiHidden}
                      onCheckedChange={(v) => setField("wifiHidden", v)}
                    />
                  </div>
                </div>
              ) : null}

              {type === "vcard" ? (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FieldBlock label="First name" htmlFor="qr-vc-first">
                      <Input
                        id="qr-vc-first"
                        value={fields.vcFirst}
                        onChange={(e) => setField("vcFirst", e.target.value)}
                        className="h-10 rounded-xl"
                      />
                    </FieldBlock>
                    <FieldBlock label="Last name" htmlFor="qr-vc-last">
                      <Input
                        id="qr-vc-last"
                        value={fields.vcLast}
                        onChange={(e) => setField("vcLast", e.target.value)}
                        className="h-10 rounded-xl"
                      />
                    </FieldBlock>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Contact
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FieldBlock label="Phone" htmlFor="qr-vc-phone">
                      <Input
                        id="qr-vc-phone"
                        value={fields.vcPhone}
                        onChange={(e) => setField("vcPhone", e.target.value)}
                        className="h-10 rounded-xl"
                      />
                    </FieldBlock>
                    <FieldBlock label="Mobile" htmlFor="qr-vc-mobile">
                      <Input
                        id="qr-vc-mobile"
                        value={fields.vcMobile}
                        onChange={(e) => setField("vcMobile", e.target.value)}
                        className="h-10 rounded-xl"
                      />
                    </FieldBlock>
                    <FieldBlock label="E-mail" htmlFor="qr-vc-email">
                      <Input
                        id="qr-vc-email"
                        type="email"
                        value={fields.vcEmail}
                        onChange={(e) => setField("vcEmail", e.target.value)}
                        className="h-10 rounded-xl"
                      />
                    </FieldBlock>
                    <FieldBlock label="Website" htmlFor="qr-vc-url">
                      <Input
                        id="qr-vc-url"
                        value={fields.vcUrl}
                        onChange={(e) => setField("vcUrl", e.target.value)}
                        className="h-10 rounded-xl"
                        placeholder="https://"
                      />
                    </FieldBlock>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Company
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FieldBlock label="Company" htmlFor="qr-vc-org">
                      <Input
                        id="qr-vc-org"
                        value={fields.vcOrg}
                        onChange={(e) => setField("vcOrg", e.target.value)}
                        className="h-10 rounded-xl"
                      />
                    </FieldBlock>
                    <FieldBlock label="Job title" htmlFor="qr-vc-title">
                      <Input
                        id="qr-vc-title"
                        value={fields.vcTitle}
                        onChange={(e) => setField("vcTitle", e.target.value)}
                        className="h-10 rounded-xl"
                      />
                    </FieldBlock>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Location
                  </p>
                  <FieldBlock label="Address" htmlFor="qr-vc-street">
                    <Input
                      id="qr-vc-street"
                      value={fields.vcStreet}
                      onChange={(e) => setField("vcStreet", e.target.value)}
                      className="h-10 rounded-xl"
                    />
                  </FieldBlock>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <FieldBlock label="City" htmlFor="qr-vc-city">
                      <Input
                        id="qr-vc-city"
                        value={fields.vcCity}
                        onChange={(e) => setField("vcCity", e.target.value)}
                        className="h-10 rounded-xl"
                      />
                    </FieldBlock>
                    <FieldBlock label="Post code" htmlFor="qr-vc-post">
                      <Input
                        id="qr-vc-post"
                        value={fields.vcPost}
                        onChange={(e) => setField("vcPost", e.target.value)}
                        className="h-10 rounded-xl"
                      />
                    </FieldBlock>
                    <FieldBlock label="Country" htmlFor="qr-vc-country">
                      <Input
                        id="qr-vc-country"
                        value={fields.vcCountry}
                        onChange={(e) => setField("vcCountry", e.target.value)}
                        className="h-10 rounded-xl"
                      />
                    </FieldBlock>
                  </div>
                </div>
              ) : null}

              {type === "event" ? (
                <div className="space-y-4">
                  <FieldBlock label="Event title" htmlFor="qr-ev-title">
                    <Input
                      id="qr-ev-title"
                      value={fields.eventTitle}
                      onChange={(e) => setField("eventTitle", e.target.value)}
                      className="h-10 rounded-xl"
                    />
                  </FieldBlock>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FieldBlock label="Starts" htmlFor="qr-ev-start">
                      <Input
                        id="qr-ev-start"
                        type="datetime-local"
                        value={fields.eventStart}
                        onChange={(e) => setField("eventStart", e.target.value)}
                        className="h-10 rounded-xl"
                      />
                    </FieldBlock>
                    <FieldBlock label="Ends" htmlFor="qr-ev-end">
                      <Input
                        id="qr-ev-end"
                        type="datetime-local"
                        value={fields.eventEnd}
                        onChange={(e) => setField("eventEnd", e.target.value)}
                        className="h-10 rounded-xl"
                      />
                    </FieldBlock>
                  </div>
                  <FieldBlock label="Location" htmlFor="qr-ev-loc">
                    <Input
                      id="qr-ev-loc"
                      value={fields.eventLocation}
                      onChange={(e) =>
                        setField("eventLocation", e.target.value)
                      }
                      className="h-10 rounded-xl"
                    />
                  </FieldBlock>
                  <FieldBlock label="Description" htmlFor="qr-ev-desc">
                    <Textarea
                      id="qr-ev-desc"
                      value={fields.eventDescription}
                      onChange={(e) =>
                        setField("eventDescription", e.target.value)
                      }
                      rows={3}
                      className="rounded-xl"
                    />
                  </FieldBlock>
                </div>
              ) : null}
            </div>
          </section>

          {/* Step 2: design */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                2
              </span>
              <h2 className="text-lg font-semibold tracking-tight">
                Design your QR code
              </h2>
            </div>

            <div className="grid gap-6 rounded-2xl border border-border/50 bg-muted/15 p-4 sm:grid-cols-2 sm:p-5 dark:bg-muted/10">
              <ColorField
                id="qr-fg"
                label="Shape color"
                value={fg}
                onChange={setFg}
                presets={PRESET_FG}
              />
              <ColorField
                id="qr-bg"
                label="Background color"
                value={bg}
                onChange={setBg}
                presets={PRESET_BG}
                disabled={transparentBg}
              />

              <div className="flex items-center justify-between gap-4 rounded-xl border border-border/50 bg-background/50 px-3 py-2.5 sm:col-span-2">
                <div>
                  <Label htmlFor="qr-transparent" className="font-normal">
                    Transparent background
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Best for PNG overlays on colored designs
                  </p>
                </div>
                <Switch
                  id="qr-transparent"
                  checked={transparentBg}
                  onCheckedChange={setTransparentBg}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="qr-ecl">Error correction</Label>
                <Select
                  value={errorLevel}
                  onValueChange={(v) => setErrorLevel(v as ErrorLevel)}
                >
                  <SelectTrigger id="qr-ecl" className="h-10 w-full rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L">L — ~7% recovery</SelectItem>
                    <SelectItem value="M">M — ~15% recovery</SelectItem>
                    <SelectItem value="Q">Q — ~25% recovery</SelectItem>
                    <SelectItem value="H">H — ~30% recovery</SelectItem>
                  </SelectContent>
                </Select>
                {logoDataUrl && (errorLevel === "L" || errorLevel === "M") ? (
                  <p className="text-xs text-amber-600 dark:text-amber-400">
                    Logo active: rendering with H so scanners stay reliable.
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Higher levels survive damage / logos better but denser modules.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="qr-size">Export size</Label>
                  <span className="font-mono text-xs tabular-nums text-muted-foreground">
                    {size}px
                  </span>
                </div>
                <input
                  id="qr-size"
                  type="range"
                  min={160}
                  max={1024}
                  step={16}
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer accent-primary"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="qr-margin">Quiet zone (margin)</Label>
                  <span className="font-mono text-xs tabular-nums text-muted-foreground">
                    {margin} modules
                  </span>
                </div>
                <input
                  id="qr-margin"
                  type="range"
                  min={0}
                  max={8}
                  step={1}
                  value={margin}
                  onChange={(e) => setMargin(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer accent-primary"
                />
              </div>

              <div className="space-y-3 sm:col-span-2">
                <Label>Logo (optional)</Label>
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => onLogoFile(e.target.files?.[0])}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full"
                    onClick={() => fileRef.current?.click()}
                  >
                    <ImagePlus className="size-4" aria-hidden />
                    Upload logo
                  </Button>
                  {logoDataUrl ? (
                    <Button
                      type="button"
                      variant="ghost"
                      className="rounded-full text-muted-foreground"
                      onClick={() => {
                        setLogoDataUrl(null);
                        if (fileRef.current) fileRef.current.value = "";
                      }}
                    >
                      <Trash2 className="size-4" aria-hidden />
                      Remove
                    </Button>
                  ) : null}
                  {logoDataUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={logoDataUrl}
                      alt="Logo preview"
                      className="size-10 rounded-lg object-contain ring-1 ring-border/60"
                    />
                  ) : null}
                </div>
                {logoDataUrl ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="qr-logo-ratio">Logo size</Label>
                        <span className="font-mono text-xs tabular-nums text-muted-foreground">
                          {Math.round(logoRatio * 100)}%
                        </span>
                      </div>
                      <input
                        id="qr-logo-ratio"
                        type="range"
                        min={0.12}
                        max={0.32}
                        step={0.01}
                        value={logoRatio}
                        onChange={(e) =>
                          setLogoRatio(Number(e.target.value))
                        }
                        className="h-2 w-full cursor-pointer accent-primary"
                      />
                    </div>
                    <div className="flex items-center justify-between gap-4 rounded-xl border border-border/50 bg-background/50 px-3 py-2.5">
                      <Label htmlFor="qr-logo-pad" className="font-normal">
                        White pad behind logo
                      </Label>
                      <Switch
                        id="qr-logo-pad"
                        checked={logoPad}
                        onCheckedChange={setLogoPad}
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        </div>

        {/* Right: preview + download sticky */}
        <aside className="space-y-4 lg:sticky lg:top-24">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
              3
            </span>
            <h2 className="text-lg font-semibold tracking-tight">
              Preview &amp; download
            </h2>
          </div>

          <div className="rounded-2xl border border-border/50 bg-muted/20 p-5 dark:bg-muted/15">
            <div
              className={cn(
                "mx-auto flex aspect-square max-w-[280px] items-center justify-center rounded-2xl p-4 ring-1 ring-border/40",
                transparentBg
                  ? "bg-[length:16px_16px] bg-[linear-gradient(45deg,#e2e8f0_25%,transparent_25%),linear-gradient(-45deg,#e2e8f0_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#e2e8f0_75%),linear-gradient(-45deg,transparent_75%,#e2e8f0_75%)] bg-[position:0_0,0_8px,8px_-8px,-8px_0] dark:bg-[linear-gradient(45deg,#334155_25%,transparent_25%),linear-gradient(-45deg,#334155_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#334155_75%),linear-gradient(-45deg,transparent_75%,#334155_75%)]"
                  : "bg-background",
              )}
            >
              {/* Hidden work canvas for generation */}
              <canvas ref={canvasRef} className="hidden" aria-hidden />
              {dataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={dataUrl}
                  alt="QR code preview"
                  className="max-h-full max-w-full rounded-lg"
                  width={size}
                  height={size}
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-center text-muted-foreground">
                  <QrCode className="size-12 opacity-40" aria-hidden />
                  <p className="text-sm">
                    {pending
                      ? "Generating…"
                      : "Fill in the required fields to preview"}
                  </p>
                </div>
              )}
            </div>

            {error ? (
              <p className="mt-3 text-center text-sm text-destructive" role="alert">
                {error}
              </p>
            ) : null}

            <div className="mt-5 flex flex-col gap-2">
              <Button
                type="button"
                className="w-full rounded-full"
                disabled={!dataUrl}
                onClick={downloadPng}
              >
                <Download className="size-4" aria-hidden />
                Download PNG
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full rounded-full"
                disabled={!payload.trim()}
                onClick={() => void downloadSvg()}
              >
                <Download className="size-4" aria-hidden />
                Download SVG
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  className="rounded-full"
                  disabled={!dataUrl}
                  onClick={() => void copyImage()}
                >
                  <Copy className="size-4" aria-hidden />
                  Copy image
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="rounded-full"
                  disabled={!payload}
                  onClick={() => void copyPayload()}
                >
                  <Copy className="size-4" aria-hidden />
                  Copy data
                </Button>
              </div>
            </div>

            {payload ? (
              <div className="mt-4 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <Globe className="size-3.5" aria-hidden />
                  Encoded payload
                </div>
                <pre className="max-h-28 overflow-auto rounded-xl bg-background/80 p-3 font-mono text-[11px] leading-relaxed text-muted-foreground ring-1 ring-border/40">
                  {payload}
                </pre>
              </div>
            ) : null}
          </div>
        </aside>
      </div>
    </div>
  );
}
