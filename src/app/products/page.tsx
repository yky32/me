import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowUpRight, Globe } from "lucide-react";

import { InstagramIcon } from "@/components/icons/instagram";
import { XIcon } from "@/components/icons/x";
import { InnerPageSurface } from "@/components/layout/inner-page-surface";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Standalone products and brands with their own sites and channels — including TGT (tgt.gg) and Ordercoon on Instagram. Each destination opens from its row.",
};

type Product = {
  name: string;
  description: string;
  tags?: readonly string[];
  /** Label next to globe icon */
  website?: string;
  /** Destination URL for the website row (omit row link if missing) */
  websiteUrl?: string;
  /** Handle without @ */
  instagram?: string;
  /** Override Instagram URL; defaults to instagram.com/{handle} when linked */
  instagramUrl?: string;
  /** Show Instagram row using handle, but no link yet */
  instagramSoon?: boolean;
  /** Handle without @ */
  x?: string;
  /** Override X URL; defaults to x.com/{handle} when linked */
  xUrl?: string;
};

const products = [
  {
    name: "TGT",
    description:
      "Standalone site — open the link for what it is today (landing, app, or experiment).",
    website: "tgt.gg",
    websiteUrl: "https://www.tgt.gg",
    instagram: "TGT",
    instagramSoon: true,
    tags: ["fitness", "personal health"],
  },
  {
    name: "Ordercoon",
    description:
      "Updates and drops — follow @ordercoon for the latest.",
    instagram: "ordercoon",
    tags: ["food ordering", "smart POS"],
  },
] satisfies Product[];

const cardClass =
  "rounded-2xl border-0 bg-muted/30 shadow-none ring-1 ring-border/50 transition-colors hover:bg-muted/45 hover:ring-primary/25 dark:bg-muted/20 dark:ring-white/[0.06]";

/** Bold monospace chip for domains and handles */
function QuoteBoldValue({ children }: { children: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg px-2 py-1",
        "bg-muted/70 ring-1 ring-border/60 dark:bg-muted/40 dark:ring-white/[0.08]",
        "font-mono text-[13px] font-bold leading-none tracking-tight text-foreground",
        "transition-colors group-hover/row:bg-primary/[0.09] group-hover/row:ring-primary/25",
      )}
    >
      {children}
    </span>
  );
}

type PresenceRow = {
  key: string;
  icon: ReactNode;
  value: string;
  href?: string;
  soon?: boolean;
  ariaLabel: string;
};

function buildPresenceRows(product: Product): PresenceRow[] {
  const rows: PresenceRow[] = [];

  if (product.website) {
    rows.push({
      key: "website",
      icon: <Globe className="size-4 shrink-0 text-muted-foreground" aria-hidden />,
      value: product.website,
      href: product.websiteUrl,
      ariaLabel: product.websiteUrl
        ? `Open website ${product.website}`
        : `Website ${product.website}`,
    });
  }

  if (product.instagram) {
    const handle = `@${product.instagram.replace(/^@/, "")}`;
    const slug = product.instagram.replace(/^@/, "");
    const href =
      product.instagramSoon
        ? undefined
        : (product.instagramUrl ?? `https://www.instagram.com/${slug}/`);
    rows.push({
      key: "instagram",
      icon: <InstagramIcon className="size-4 shrink-0 text-muted-foreground" />,
      value: handle,
      href,
      soon: product.instagramSoon,
      ariaLabel: product.instagramSoon
        ? `Instagram ${handle}, coming soon`
        : `Open Instagram ${handle}`,
    });
  }

  if (product.x) {
    const handle = `@${product.x.replace(/^@/, "")}`;
    const slug = product.x.replace(/^@/, "");
    const href = product.xUrl ?? `https://x.com/${slug}`;
    rows.push({
      key: "x",
      icon: <XIcon className="size-4 shrink-0 text-muted-foreground" />,
      value: handle,
      href,
      ariaLabel: `Open X ${handle}`,
    });
  }

  return rows;
}

/** Shared grid: fixed icon column so labels align across linked vs non-linked rows. */
const presenceRowGrid =
  "grid w-full grid-cols-[1.25rem_minmax(0,1fr)_auto] items-center gap-x-2";

function PresenceRowIcon({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center [&_svg]:size-4">
      {children}
    </span>
  );
}

function ProductPresenceRows({ product }: { product: Product }) {
  const rows = buildPresenceRows(product);
  if (rows.length === 0) return null;

  const rowPad = "-mx-2 rounded-lg px-2 py-1.5";

  return (
    <ul className="mt-3 list-none space-y-1 p-0">
      {rows.map((row) => (
        <li key={row.key} className="min-w-0">
          {row.href ? (
            <a
              href={row.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={row.ariaLabel}
              className={cn(
                presenceRowGrid,
                rowPad,
                "group/row outline-none",
                "transition-colors hover:bg-muted/55 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
            >
              <PresenceRowIcon>{row.icon}</PresenceRowIcon>
              <span className="min-w-0 justify-self-start">
                <QuoteBoldValue>{row.value}</QuoteBoldValue>
              </span>
              <ArrowUpRight
                className="size-4 shrink-0 justify-self-end text-muted-foreground opacity-60 transition-opacity group-hover/row:opacity-100"
                aria-hidden
              />
            </a>
          ) : row.soon ? (
            <div
              className={cn(presenceRowGrid, rowPad)}
              aria-label={row.ariaLabel}
            >
              <PresenceRowIcon>{row.icon}</PresenceRowIcon>
              <span className="min-w-0 justify-self-start">
                <QuoteBoldValue>{row.value}</QuoteBoldValue>
              </span>
              <span className="justify-self-end rounded-md bg-muted/80 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-muted-foreground ring-1 ring-border/50 dark:bg-muted/50">
                Soon
              </span>
            </div>
          ) : (
            <div
              className={cn(
                "grid w-full grid-cols-[1.25rem_minmax(0,1fr)] items-center gap-x-2",
                rowPad,
                "text-muted-foreground",
              )}
              aria-label={row.ariaLabel}
            >
              <PresenceRowIcon>{row.icon}</PresenceRowIcon>
              <span className="min-w-0 justify-self-start">
                <QuoteBoldValue>{row.value}</QuoteBoldValue>
              </span>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

function phraseToHashtag(phrase: string): string {
  const slug = phrase.trim().toLowerCase().replace(/\s+/g, "-");
  return `#${slug}`;
}

function ProductHashtags({ tags }: { tags?: readonly string[] }) {
  if (tags === undefined || tags.length === 0) return null;

  return (
    <ul
      className="mt-4 flex flex-wrap gap-2"
      aria-label="Topics"
    >
      {tags.map((tag) => (
        <li key={tag}>
          <span
            className={cn(
              "inline-flex rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold tracking-tight",
              "bg-primary/10 text-primary ring-1 ring-primary/20",
              "dark:bg-primary/15 dark:ring-primary/25",
            )}
          >
            {phraseToHashtag(tag)}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function ProductsPage() {
  return (
    <InnerPageSurface>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Products
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Things out in the wild
          </h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Products and brands that live on their own sites and channels.
          </p>
        </div>

        <div className="mx-auto mt-4 flex justify-center px-4 sm:px-6 lg:px-8">
          <blockquote
            className={cn(
              "border-l-[3px] border-primary/30 py-0.5 pl-5 text-left text-pretty text-sm italic leading-relaxed text-muted-foreground/75 sm:text-[0.9375rem]",
              "max-w-xl sm:max-w-2xl md:max-w-3xl",
              "lg:max-w-none lg:w-max lg:whitespace-nowrap",
            )}
          >
            Follow a row below — brand story, mission &amp; values, and
            day-to-day updates live there.
          </blockquote>
        </div>

        <ul className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
          {products.map((p) => {
            const presenceRows = buildPresenceRows(p);
            const linkCount = presenceRows.filter((r) => r.href).length;
            const rowCount = presenceRows.length;
            return (
              <li key={p.name}>
                <Card className={cn(cardClass, "h-full")}>
                  <CardHeader>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-xl">{p.name}</CardTitle>
                      <ProductPresenceRows product={p} />
                    </div>
                    <CardDescription className="text-base leading-relaxed">
                      {p.description}
                    </CardDescription>
                    <ProductHashtags tags={p.tags} />
                  </CardHeader>
                  {linkCount > 0 ? (
                    <CardContent className="pt-0">
                      <p className="text-xs text-muted-foreground">
                        {linkCount > 1
                          ? "Each linked row opens a different destination — new tab."
                          : rowCount > 1
                            ? "The linked row opens in a new tab; other rows are labels or coming soon."
                            : "Opens in a new tab from the row above."}
                      </p>
                    </CardContent>
                  ) : null}
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
    </InnerPageSurface>
  );
}
