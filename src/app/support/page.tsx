import type { Metadata } from "next";
import Link from "next/link";

import { InnerPageSurface } from "@/components/layout/inner-page-surface";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Contact Wayne Yu about yky.app or any of the work shipped from here.",
};

export default function SupportPage() {
  return (
    <InnerPageSurface>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          Support
        </p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
          Wayne Yu
        </h1>
        <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
          yky.app is me, and the work I ship. If something on the site or in
          one of the apps needs a hand, send a note with the name and what
          happened. I read these myself.
        </p>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          Some products also have their own site. Those are listed on{" "}
          <Link
            href="/products"
            className="font-medium text-foreground underline decoration-primary/40 underline-offset-4"
          >
            Products
          </Link>
          .
        </p>
        <ul className="mt-8 space-y-3 text-lg">
          <li>
            <a
              href="https://github.com/yky32"
              className="font-medium text-foreground underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub @yky32
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/wayneyu-dev"
              className="font-medium text-foreground underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
        </ul>
        <p className="mt-10 text-sm text-muted-foreground">
          Privacy details are on the{" "}
          <Link
            href="/privacy"
            className="font-medium text-foreground underline decoration-primary/40 underline-offset-4"
          >
            privacy page
          </Link>
          .
        </p>
      </div>
    </InnerPageSurface>
  );
}
