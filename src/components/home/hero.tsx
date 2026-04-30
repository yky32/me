"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.08 * i,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div
        className="pointer-events-none absolute inset-0 mesh-hero-light dark:mesh-hero-dark"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-16 sm:px-6 sm:pb-28 sm:pt-20 lg:px-8 lg:pb-32 lg:pt-24">
        <motion.div
          initial="hidden"
          animate="show"
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            custom={0}
            variants={fade}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
          >
            <Sparkles className="size-3.5" aria-hidden />
            Hong Kong · Distributed systems · Practical tools
          </motion.div>
          <motion.h1
            custom={1}
            variants={fade}
            className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            <span className="text-gradient-hero">{siteConfig.name}</span>
            <span className="mt-2 block text-2xl font-normal text-muted-foreground sm:text-3xl">
              {siteConfig.nameZh}
            </span>
          </motion.h1>
          <motion.p
            custom={2}
            variants={fade}
            className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            Software engineer at{" "}
            <span className="font-medium text-foreground">altech</span> — I
            design and ship{" "}
            <span className="text-foreground">large-scale distributed systems</span>
            , resilient backends, and{" "}
            <span className="text-foreground">developer tools</span> people
            actually enjoy using.
          </motion.p>
          <motion.div
            custom={3}
            variants={fade}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <Link
              href="/tools"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 rounded-full px-8 text-base shadow-lg shadow-primary/20",
              )}
            >
              Explore my tools
              <ArrowRight className="ms-1 size-4" aria-hidden />
            </Link>
            <Link
              href="/about"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 rounded-full px-8 text-base",
              )}
            >
              Learn about me
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
