import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { FeatureStrip } from "@/components/home/feature-strip";
import { HomeHero } from "@/components/home/hero";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const highlights = [
  {
    title: "Tools you can use today",
    description:
      "JSON workspace, timezone clocks, and unit conversions — fast, bright, and keyboard-friendly.",
    href: "/tools",
  },
  {
    title: "Writing & ideas",
    description:
      "Notes on systems thinking, shipping culture, and lessons from the field.",
    href: "/blog",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <FeatureStrip />
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Built for clarity
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A calm surface with energetic details — the same philosophy I bring
            to production systems and product work.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {highlights.map((item) => (
            <Card
              key={item.href}
              className="group border-border/80 bg-card/90 shadow-sm transition-shadow hover:shadow-md"
            >
              <CardHeader>
                <CardTitle className="text-xl">{item.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "inline-flex items-center gap-1 rounded-full px-0 text-primary hover:bg-transparent hover:text-primary/90",
                  )}
                >
                  Open
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
