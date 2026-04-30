import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Soft hero-style wash so inner routes share the same atmospheric feel as home */
export function InnerPageSurface({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[min(42vh,420px)] mesh-hero-light dark:mesh-hero-dark"
        aria-hidden
      />
      {children}
    </div>
  );
}
