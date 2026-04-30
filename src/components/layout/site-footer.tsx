import Link from "next/link";

import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/50 bg-muted/15">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-16 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-20 lg:px-8">
        <div>
          <p className="font-medium text-foreground">{siteConfig.name}</p>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            {siteConfig.description}
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm sm:items-end">
          <Link
            href={siteConfig.links.github}
            className="text-muted-foreground transition-colors hover:text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
          <p className="text-muted-foreground">© {year} {siteConfig.name}</p>
        </div>
      </div>
    </footer>
  );
}
