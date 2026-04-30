import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Wayne Yu — Hong Kong software engineer at altech, focused on distributed systems and customer-centric products.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
        <div className="relative mx-auto w-full max-w-sm lg:mx-0">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/25 via-cyan-400/15 to-transparent blur-2xl dark:from-primary/30" />
          <div className="relative overflow-hidden rounded-[1.75rem] bg-muted/15 shadow-2xl shadow-black/[0.05] dark:bg-white/[0.03] dark:shadow-black/50">
            <Image
              src="/wayne-avatar.svg"
              alt="Wayne Yu — portrait placeholder"
              width={400}
              height={400}
              className="aspect-square w-full object-cover"
              priority
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
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            I&apos;m a Hong Kong–based software engineer at{" "}
            <span className="font-medium text-foreground">altech</span>, where I
            help build systems that need to stay fast, observable, and honest
            under real-world load. My work sits at the intersection of{" "}
            <span className="text-foreground">distributed backends</span>,{" "}
            <span className="text-foreground">platform ergonomics</span>, and{" "}
            <span className="text-foreground">product impact</span> — because
            great engineering is measured in outcomes, not abstractions alone.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
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
  );
}
