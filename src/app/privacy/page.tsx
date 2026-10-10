import type { Metadata } from "next";
import Link from "next/link";

import { InnerPageSurface } from "@/components/layout/inner-page-surface";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How LiD and this site handle an account, the camera, notifications, and a letter that is gone after it is watched.",
};

export default function PrivacyPage() {
  return (
    <InnerPageSurface>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          Privacy
        </p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
          Privacy
        </h1>
        <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
          This page covers yky.app and the LiD app. Last updated 10 October 2026.
        </p>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">LiD</h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            LiD is one letter between two people. You sign in with Apple or
            with an email code. The app stores the name you choose, and a
            device token so it can send a notification. The notification does
            not include the words in the letter.
          </p>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Opening a lid turns on the front camera and records a short face.
            The clip has no sound. The letter and the face stay only until
            they are watched. Then they are deleted. The app does not keep a
            gallery, and the server is not an archive. The pair between the
            two people stays.
          </p>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            LiD does not sell this data and does not show ads. Sign-in is
            handled by Apple or the email provider. The temporary letter, face,
            and account row sit on a hosted backend.
          </p>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">This site</h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            yky.app is a personal site. It does not ask you to create an
            account. The host may keep ordinary server logs, such as the page
            requested and the time.
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
