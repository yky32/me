import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { InnerPageSurface } from "@/components/layout/inner-page-surface";

export function ToolPageShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <InnerPageSurface>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden />
          All tools
        </Link>
        <header className="mt-8 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Tools
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-[2.5rem] sm:leading-tight">
            {title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        </header>
        <div className="mt-12">{children}</div>
      </div>
    </InnerPageSurface>
  );
}
