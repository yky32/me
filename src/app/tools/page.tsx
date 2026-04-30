import type { Metadata } from "next";
import Link from "next/link";
import { Braces, Clock3, Ruler } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Interactive utilities: JSON formatter & tree, timezone clocks, and unit converter.",
};

const tools = [
  {
    href: "/tools/json",
    title: "JSON workspace",
    description:
      "Format, validate, syntax-highlight, and explore JSON as an expandable tree.",
    icon: Braces,
  },
  {
    href: "/tools/timezone",
    title: "Timezone studio",
    description:
      "Live multi-city clocks, favorites, and shareable URLs for your team.",
    icon: Clock3,
  },
  {
    href: "/tools/units",
    title: "Unit converter",
    description:
      "Length, weight, temperature, and data sizes — fast conversions with swap.",
    icon: Ruler,
  },
] as const;

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          Tools
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Bright utilities for everyday work
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Opinionated, fast, and pleasant to use — built the same way I approach
          product-facing engineering.
        </p>
      </div>
      <ul className="mt-14 grid gap-6 md:grid-cols-3">
        {tools.map((tool) => (
          <li key={tool.href}>
            <Link href={tool.href} className="group block h-full">
              <Card className="h-full rounded-2xl border-0 bg-muted/25 shadow-none ring-0 transition-all hover:-translate-y-0.5 hover:bg-muted/40 hover:shadow-lg hover:shadow-black/[0.04] dark:hover:shadow-black/25">
                <CardHeader>
                  <div className="mb-2 inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                    <tool.icon className="size-5" aria-hidden />
                  </div>
                  <CardTitle className="text-xl transition-colors group-hover:text-primary">
                    {tool.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-sm font-semibold text-primary">
                    Open tool →
                  </span>
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
