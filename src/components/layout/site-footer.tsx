import Link from "next/link";

import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const linkedin = siteConfig.links.linkedin;

  return (
    <footer className="border-t border-border/50 bg-muted/15">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-14 sm:flex-row sm:items-start sm:justify-between sm:gap-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="min-w-0 max-w-md">
          <p className="font-medium text-foreground">{siteConfig.name}</p>
          <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground">
            {siteConfig.description}
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 text-sm sm:items-end">
          <nav
            className="flex flex-wrap gap-x-4 gap-y-2 sm:justify-end"
            aria-label="Footer"
          >
            {linkedin ? (
              <a
                href={linkedin}
                className="text-muted-foreground transition-colors hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            ) : null}
            <Link
              href="/gallery"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Gallery
            </Link>
            <Link
              href="/blog"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Blog
            </Link>
            <Link
              href="/support"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Support
            </Link>
            <Link
              href="/privacy"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Privacy
            </Link>
            <Link
              href={siteConfig.links.github}
              className="text-muted-foreground transition-colors hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
          </nav>
          <p className="text-muted-foreground">© {year} {siteConfig.name}</p>
        </div>
      </div>
    </footer>
  );
}
