"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Boxes, Cpu, PenLine } from "lucide-react";

const tiles = [
  {
    href: "/tools",
    label: "Tools",
    sub: "In the browser",
    icon: Boxes,
    layout:
      "md:col-span-2 md:row-span-2 min-h-[200px] md:min-h-[min(340px,42vh)]",
    gradient: "from-primary/25 via-cyan-500/12 to-transparent",
  },
  {
    href: "/about",
    label: "About",
    sub: "Who I am",
    icon: Cpu,
    layout: "md:col-start-3 md:row-start-1",
    gradient: "from-muted/90 to-transparent",
  },
  {
    href: "/blog",
    label: "Writing",
    sub: "Short notes",
    icon: PenLine,
    layout: "md:col-start-3 md:row-start-2",
    gradient: "from-primary/18 to-transparent",
  },
] as const;

export function FeatureStrip() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid auto-rows-fr gap-4 md:grid-cols-3 md:grid-rows-2 md:gap-5">
          {tiles.map((tile, i) => (
            <motion.div
              key={tile.href}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              className={tile.layout}
            >
              <Link
                href={tile.href}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-muted/35 p-6 shadow-none transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:bg-muted/50 hover:shadow-lg hover:shadow-black/[0.04] dark:hover:shadow-black/30 md:p-8"
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${tile.gradient}`}
                  aria-hidden
                />
                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between md:flex-col md:gap-8">
                  <div>
                    <p className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-none">
                      {tile.label}
                    </p>
                    <p className="mt-2 text-sm font-medium text-muted-foreground">
                      {tile.sub}
                    </p>
                  </div>
                  <div className="shrink-0 self-start rounded-2xl bg-background/70 p-4 text-primary shadow-sm backdrop-blur-sm transition-transform group-hover:scale-[1.02] dark:bg-white/[0.06] sm:p-5">
                    <tile.icon
                      className="size-10 sm:size-12 md:size-14"
                      strokeWidth={1.1}
                      aria-hidden
                    />
                  </div>
                </div>
                <span className="relative mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary">
                  Enter
                  <span className="text-lg transition-transform group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
