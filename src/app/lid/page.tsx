import type { Metadata } from "next";
import Link from "next/link";

import { InnerPageSurface } from "@/components/layout/inner-page-surface";

export const metadata: Metadata = {
  title: "LiD",
  description:
    "LiD is one letter between two people. Their face as they open it. Then it's gone.",
};

export default function LidPage() {
  return (
    <InnerPageSurface>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          One of the works
        </p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
          LiD
        </h1>
        <p className="mt-3 text-lg text-foreground">LiD: Watch Them Open</p>
        <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
          One letter between two people. Their face as they open it. Then
          it&apos;s gone.
        </p>
        <div className="mt-10 space-y-4 text-pretty leading-relaxed text-muted-foreground">
          <p>
            You send one line. They see only an envelope until they open it.
            Opening turns the front camera on. You get their face. Then the
            letter and the face are gone.
          </p>
          <p>Nothing is saved on the phone. Nothing is kept as an archive.</p>
          <p>Not a thread. Not a camera roll.</p>
        </div>
        <p className="mt-10 text-sm text-muted-foreground">
          Data practices are on the{" "}
          <Link
            href="/privacy"
            className="font-medium text-foreground underline decoration-primary/40 underline-offset-4"
          >
            privacy page
          </Link>
          . Questions go to{" "}
          <Link
            href="/support"
            className="font-medium text-foreground underline decoration-primary/40 underline-offset-4"
          >
            support
          </Link>
          .
        </p>
      </div>
    </InnerPageSurface>
  );
}
