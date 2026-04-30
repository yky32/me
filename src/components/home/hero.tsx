"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { HeroGraphic } from "@/components/home/hero-graphic";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 * i, duration: 0.5, ease },
  }),
};

const tags = ["Systems", "Backend", "DX"] as const;

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div
        className="pointer-events-none absolute inset-0 mesh-hero-light dark:mesh-hero-dark"
        aria-hidden
      />
      {/* Large ambient shapes */}
      <div
        className="pointer-events-none absolute -right-24 top-0 h-[min(70vh,520px)] w-[min(90vw,520px)] rounded-full bg-gradient-to-bl from-primary/15 via-cyan-500/10 to-transparent blur-3xl dark:from-primary/20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl dark:bg-primary/15"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:gap-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-8 lg:py-24">
        <motion.div
          initial="hidden"
          animate="show"
          className="text-center lg:text-left"
        >
          <motion.p
            custom={0}
            variants={fade}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-primary"
          >
            Hong Kong · altech
          </motion.p>
          <motion.h1
            custom={1}
            variants={fade}
            className="mt-4 text-balance text-[clamp(2.5rem,6vw,4.25rem)] font-semibold leading-[1.05] tracking-tight"
          >
            <span className="text-gradient-hero">{siteConfig.name}</span>
          </motion.h1>
          <motion.p
            custom={2}
            variants={fade}
            className="mt-2 text-2xl font-light tracking-wide text-muted-foreground sm:text-3xl"
          >
            {siteConfig.nameZh}
          </motion.p>

          <motion.ul
            custom={3}
            variants={fade}
            className="mt-8 flex flex-wrap justify-center gap-2 lg:justify-start"
            aria-label="Focus areas"
          >
            {tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-border/80 bg-background/80 px-4 py-1.5 text-sm font-medium text-foreground shadow-sm backdrop-blur-sm"
              >
                {t}
              </li>
            ))}
          </motion.ul>

          <motion.div
            custom={4}
            variants={fade}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Link
              href="/tools"
              className={cn(
                buttonVariants({ size: "lg" }),
                "group h-12 gap-2 rounded-full px-8 text-base shadow-lg shadow-primary/25",
              )}
            >
              Tools
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/about"
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "group h-12 gap-1 rounded-full px-6 text-base text-muted-foreground hover:text-foreground",
              )}
            >
              Profile
              <ArrowUpRight className="size-4 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease }}
          className="flex justify-center lg:justify-end"
        >
          <HeroGraphic />
        </motion.div>
      </div>
    </section>
  );
}
