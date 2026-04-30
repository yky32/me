import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { InnerPageSurface } from "@/components/layout/inner-page-surface";
import { Badge } from "@/components/ui/badge";
import { blogPosts, getPostBySlug } from "@/lib/blog-posts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <InnerPageSurface>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Back to blog
      </Link>
      <header className="mt-8">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          Blog
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="size-4" aria-hidden />
            {new Date(post.date).toLocaleDateString("en-HK", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-4" aria-hidden />
            {post.readTimeMinutes} min read
          </span>
        </div>
        <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-xl leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <Badge key={t} variant="secondary" className="rounded-full">
              {t}
            </Badge>
          ))}
        </div>
      </header>
      <div className="prose prose-neutral prose-lg mt-12 max-w-none dark:prose-invert prose-headings:scroll-mt-28 prose-headings:font-semibold prose-a:text-primary prose-pre:rounded-xl prose-pre:bg-muted/80 prose-pre:ring-1 prose-pre:ring-border/50">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>
    </article>
    </InnerPageSurface>
  );
}
