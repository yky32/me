"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import * as React from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/tools", label: "Tools" },
  { href: "/blog", label: "Blog" },
] as const;

function NavLinks({
  className,
  onNavigate,
  orientation = "row",
}: {
  className?: string;
  onNavigate?: () => void;
  orientation?: "row" | "column";
}) {
  const pathname = usePathname();
  return (
    <nav
      className={cn(
        "flex gap-1",
        orientation === "row" ? "flex-row items-center" : "flex-col items-stretch",
        className,
      )}
    >
      {nav.map((item) => {
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "px-3 py-2 text-sm font-medium transition-colors",
              orientation === "row" ? "rounded-full" : "rounded-xl",
              orientation === "column" && "w-full",
              active
                ? "font-semibold text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

/**
 * Hide bar when scrolling down, show when scrolling up (past a small threshold).
 * Near top of page the bar always stays visible. Paused while mobile menu is open.
 */
function useHeaderScrollReveal(freeze: boolean) {
  const [visible, setVisible] = React.useState(true);
  const lastY = React.useRef(0);
  const frame = React.useRef(0);

  React.useEffect(() => {
    if (freeze) {
      setVisible(true);
      return;
    }

    const TOP_ALWAYS_VISIBLE = 32;
    const DELTA = 8;

    const tick = () => {
      frame.current = 0;
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      const prev = lastY.current;
      const dy = y - prev;

      if (y <= TOP_ALWAYS_VISIBLE) {
        setVisible(true);
      } else if (dy > DELTA) {
        setVisible(false);
      } else if (dy < -DELTA) {
        setVisible(true);
      }

      lastY.current = y;
    };

    const onScroll = () => {
      if (frame.current) return;
      frame.current = window.requestAnimationFrame(tick);
    };

    lastY.current = window.scrollY || document.documentElement.scrollTop || 0;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame.current) window.cancelAnimationFrame(frame.current);
    };
  }, [freeze]);

  return visible;
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const headerVisible = useHeaderScrollReveal(mobileOpen);

  return (
    <header
      className={cn(
        "chrome-blur chrome-hairline fixed inset-x-0 top-0 z-50 w-full transform-gpu will-change-transform",
        "transition-[opacity,transform] duration-[650ms] ease-in-out",
        "motion-reduce:transition-opacity motion-reduce:duration-500 motion-reduce:ease-in-out",
        headerVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-full opacity-0 motion-reduce:translate-y-0",
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2 font-semibold tracking-tight"
        >
          <span className="inline-flex size-2 rounded-full bg-primary/90 ring-2 ring-primary/20" />
          <span className="text-foreground transition-colors group-hover:text-primary">
            {siteConfig.name}
          </span>
          <span className="hidden text-muted-foreground sm:inline">
            · {siteConfig.nameZh}
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <NavLinks className="mr-2" />
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "rounded-full",
              )}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,320px)]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-2">
                <NavLinks
                  orientation="column"
                  className="gap-2"
                  onNavigate={() => setMobileOpen(false)}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
