import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { InnerPageSurface } from "@/components/layout/inner-page-surface";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Wayne Yu — Hong Kong software engineer at altech, focused on distributed systems and customer-centric products.",
};

export default function AboutPage() {
  return (
    <InnerPageSurface>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
        <div className="group relative mx-auto w-full max-w-sm lg:mx-0">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-8 -z-10 rounded-[2.75rem] bg-gradient-to-br from-primary/[0.22] via-cyan-400/[0.06] to-transparent opacity-90 blur-3xl dark:from-primary/[0.28] dark:via-cyan-400/[0.09]"
          />
          <div
            className={cn(
              "relative overflow-hidden rounded-2xl rounded-tr-[2.4rem] rounded-bl-[2.4rem]",
              "shadow-[0_20px_50px_-14px_rgba(15,23,42,0.18),0_6px_18px_-6px_rgba(15,23,42,0.09)]",
              "dark:shadow-[0_26px_64px_-18px_rgba(0,0,0,0.72),0_10px_28px_-12px_rgba(0,0,0,0.45)]",
              "transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "motion-safe:group-hover:-translate-y-1",
              "motion-safe:group-hover:shadow-[0_28px_60px_-14px_rgba(15,23,42,0.22),0_10px_24px_-8px_rgba(15,23,42,0.11)]",
              "motion-safe:dark:group-hover:shadow-[0_32px_72px_-16px_rgba(0,0,0,0.78),0_14px_32px_-10px_rgba(0,0,0,0.5)]",
            )}
          >
            <Image
              src="/wayne-portrait.png"
              alt="Wayne Yu — portrait"
              width={800}
              height={800}
              className="aspect-[4/5] w-full object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 384px"
            />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            About
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Wayne Yu <span className="text-muted-foreground">伊斯高</span>
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            I&apos;m a Hong Kong–based software engineer at{" "}
            <span className="font-medium text-foreground">altech</span>, where I
            help build systems that need to stay fast, observable, and honest
            under real-world load. My work sits at the intersection of{" "}
            <span className="text-foreground">distributed backends</span>,{" "}
            <span className="text-foreground">platform ergonomics</span>, and{" "}
            <span className="text-foreground">product impact</span> — because
            great engineering is measured in outcomes, not abstractions alone.
          </p>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            I care about{" "}
            <span className="text-foreground">developer experience</span> as much
            as runtime performance: clear APIs, thoughtful defaults, and tools
            that make the next person&apos;s day a little easier. Outside of
            work, I enjoy refining small utilities (like the ones on this site)
            that turn repetitive tasks into calm, predictable workflows.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/tools"
              className={cn(buttonVariants(), "rounded-full px-6")}
            >
              Try the tools
            </Link>
            <Link
              href="/blog"
              className={cn(buttonVariants({ variant: "outline" }), "rounded-full px-6")}
            >
              Read the blog
            </Link>
          </div>
        </div>
        </div>
      </div>
    </InnerPageSurface>
  );
}
