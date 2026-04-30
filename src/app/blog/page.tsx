import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";

import { InnerPageSurface } from "@/components/layout/inner-page-surface";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { blogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Essays on distributed systems, shipping, and developer tools.",
};

const cardSurface =
  "h-full rounded-3xl border-0 bg-muted/30 shadow-none ring-1 ring-border/50 transition-all duration-300 dark:bg-muted/25 dark:ring-white/[0.06]";

export default function BlogPage() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <InnerPageSurface>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          Blog
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Essays &amp; notes
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Notes on systems, teams, and tools — useful first, loud never.
        </p>
        </div>
        <ul className="mx-auto mt-14 grid max-w-2xl gap-6">
        {sorted.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <Card
                className={`${cardSurface} hover:-translate-y-1 hover:scale-[1.01] hover:bg-muted/45 hover:shadow-lg hover:shadow-primary/10 dark:hover:shadow-black/25`}
              >
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="size-3.5" aria-hidden />
                      {new Date(post.date).toLocaleDateString("en-HK", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3.5" aria-hidden />
                      {post.readTimeMinutes} min read
                    </span>
                  </div>
                  <CardTitle className="text-xl transition-colors group-hover:text-primary sm:text-2xl">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {post.excerpt}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {post.tags.map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="rounded-full font-normal"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <span className="text-sm font-medium text-primary">
                    Continue reading →
                  </span>
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
        </ul>
      </div>
    </InnerPageSurface>
  );
}
