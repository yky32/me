import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
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
    "Standalone products and brands with their own sites and channels — including TGT (tgt.gg) and Ordercoon on Instagram. Each card links to the live, public home for that project.",
};

type Product = {
  name: string;
  href: string;
  description: string;
  /** Topic phrases rendered as #hashtag-style chips */
  tags?: readonly string[];
  /** Domain/host text next to globe icon */
  website?: string;
  /** Handle without @; shown next to Instagram icon */
  instagram?: string;
  /** Handle without @; shown next to X icon */
  x?: string;
};

const products = [
  {
    name: "TGT",
    href: "https://www.tgt.gg",
    description:
      "Standalone site — open the link for what it is today (landing, app, or experiment).",
    website: "tgt.gg",
    tags: ["fitness", "personal health"],
  },
  {
    name: "Ordercoon",
    href: "https://www.instagram.com/ordercoon/",
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
        "transition-colors group-hover:bg-primary/[0.09] group-hover:ring-primary/25",
      )}
    >
      {children}
    </span>
  );
}

function ProductPresenceRows({ product }: { product: Product }) {
  const rows: {
    key: string;
    icon: ReactNode;
    value: string;
    ariaLabel: string;
  }[] = [];

  if (product.website) {
    rows.push({
      key: "website",
      icon: <Globe className="size-4 shrink-0 text-muted-foreground" aria-hidden />,
      value: product.website,
      ariaLabel: `Website ${product.website}`,
    });
  }
  if (product.instagram) {
    const handle = `@${product.instagram.replace(/^@/, "")}`;
    rows.push({
      key: "instagram",
      icon: <InstagramIcon className="size-4 shrink-0 text-muted-foreground" />,
      value: handle,
      ariaLabel: `Instagram ${handle}`,
    });
  }
  if (product.x) {
    const handle = `@${product.x.replace(/^@/, "")}`;
    rows.push({
      key: "x",
      icon: <XIcon className="size-4 shrink-0 text-muted-foreground" />,
      value: handle,
      ariaLabel: `X ${handle}`,
    });
  }

  if (rows.length === 0) return null;

  return (
    <ul className="mt-3 space-y-2">
      {rows.map((row) => (
        <li
          key={row.key}
          className="flex items-center gap-2"
          aria-label={row.ariaLabel}
        >
          {row.icon}
          <QuoteBoldValue>{row.value}</QuoteBoldValue>
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
            Open a card for the live home — brand story, mission &amp; values,
            and day-to-day updates live there.
          </blockquote>
        </div>

        <ul className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
          {products.map((p) => (
            <li key={p.href}>
              <Link
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Card className={cn(cardClass, "h-full")}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-xl transition-colors group-hover:text-primary">
                          {p.name}
                        </CardTitle>
                        <ProductPresenceRows product={p} />
                      </div>
                      <ArrowUpRight
                        className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                        aria-hidden
                      />
                    </div>
                    <CardDescription className="text-base leading-relaxed">
                      {p.description}
                    </CardDescription>
                    <ProductHashtags tags={p.tags} />
                  </CardHeader>
                  <CardContent>
                    <span className="text-sm font-semibold text-primary">
                      Visit →
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </InnerPageSurface>
  );
}
