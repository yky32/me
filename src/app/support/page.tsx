import type { Metadata } from "next";
import Link from "next/link";

import { InnerPageSurface } from "@/components/layout/inner-page-surface";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get help with Wayne Yu's apps, including LiD. Contact via GitHub or LinkedIn.",
};

export default function SupportPage() {
  return (
    <InnerPageSurface>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          Support
        </p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
          Get help
        </h1>
        <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
          For LiD, or any other app on this site, send a note with the app
          name and what happened. I read these myself.
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
