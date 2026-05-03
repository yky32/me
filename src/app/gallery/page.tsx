import type { Metadata } from "next";

import { PhotoMosaic } from "@/components/gallery/photo-mosaic";
import { InnerPageSurface } from "@/components/layout/inner-page-surface";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Travel photos from places I've been — moments I want to share. A loose, Instagram-style grid.",
};

export default function GalleryPage() {
  return (
    <InnerPageSurface>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Gallery
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Places I&apos;ve been
          </h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Travel photos from trips and weekends — the kind of light, texture,
            and scale I like to remember and share.
          </p>
          <p className="mx-auto mt-3 max-w-lg text-pretty text-sm text-muted-foreground/80">
            Uneven tiles on purpose — closer to a photo wall than a uniform
            grid.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-6xl">
          <PhotoMosaic />
        </div>
      </div>
    </InnerPageSurface>
  );
}
