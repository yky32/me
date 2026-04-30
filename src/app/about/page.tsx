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
        <div className="mx-auto w-full max-w-sm lg:mx-0">
          <div
            className="overflow-hidden rounded-3xl shadow-[0_22px_44px_-14px_rgba(15,23,42,0.14)] dark:shadow-[0_28px_56px_-16px_rgba(0,0,0,0.55)]"
          >
            <Image
              src="/wayne-portrait.png"
              alt="Wayne Yu — portrait"
              width={800}
              height={800}
              className="aspect-[4/5] w-full object-cover object-center [mask-image:radial-gradient(ellipse_92%_90%_at_50%_44%,#000_58%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_92%_90%_at_50%_44%,#000_58%,transparent_100%)]"
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
