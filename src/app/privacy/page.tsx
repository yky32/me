import type { Metadata } from "next";
import Link from "next/link";

import { InnerPageSurface } from "@/components/layout/inner-page-surface";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Wayne Yu handles yky.app, and the apps that point here. LiD is one of those apps.",
};

export default function PrivacyPage() {
  return (
    <InnerPageSurface>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          Privacy
        </p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
          Wayne Yu
        </h1>
        <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
          yky.app is my site. It is me, and the work I ship. This page covers
          the site, and any app that uses it as its privacy or support address.
          Last updated 10 October 2026.
        </p>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">This site</h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            The site does not ask you to create an account. The host may keep
            ordinary server logs, such as the page requested and the time. I
            do not sell that, and the site does not show ads.
          </p>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">The work</h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Products with their own site keep their own privacy details. Those
            sites are on{" "}
            <Link
              href="/products"
              className="font-medium text-foreground underline decoration-primary/40 underline-offset-4"
            >
              Products
            </Link>
            . An app that points here is covered below.
          </p>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">LiD</h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            LiD is one of the apps. The page is{" "}
            <Link
              href="/lid"
              className="font-medium text-foreground underline decoration-primary/40 underline-offset-4"
            >
              yky.app/lid
            </Link>
            . It is one letter between two people. You
            sign in with Apple or with an email code. The app stores the name
            you choose, and a device token so it can send a notification. The
            notification does not include the words in the letter.
          </p>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Opening a lid turns on the front camera and records a short face.
            The clip has no sound. The letter and the face stay only until
            they are watched. Then they are deleted. The app does not keep a
            gallery, and the server is not an archive. The pair between the
            two people stays.
          </p>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            LiD does not sell this data and does not show ads.
          </p>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Contact</h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Questions go to the{" "}
            <Link
              href="/support"
              className="font-medium text-foreground underline decoration-primary/40 underline-offset-4"
            >
              support page
            </Link>
            .
          </p>
        </section>
      </div>
    </InnerPageSurface>
  );
}
