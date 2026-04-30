import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";

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

export default function BlogPage() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Blog</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Notes on systems, teams, and tools — written to be useful, not loud.
        </p>
      </div>
      <ul className="mx-auto mt-14 grid max-w-3xl gap-6">
        {sorted.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <Card className="h-full border-border/80 bg-card/90 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg">
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
  );
}
