import type { Metadata } from "next";
import Link from "next/link";

import { refraemJsonLd, refraemMetadata, refraemPage } from "@/lib/seo";
import { RefraemTabIcon } from "./tab-icon";

export const metadata: Metadata = refraemMetadata();

export default function RefraemPage() {
  return (
    <div className="fixed inset-0 z-[80] flex min-h-dvh flex-col overflow-x-hidden overflow-y-auto bg-[#F6F6F4] text-[#111111]">
      <RefraemTabIcon />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(refraemJsonLd()) }}
      />
      <style>{`
        @keyframes refraem-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes refraem-pop {
          0% { transform: translateY(10px) scale(0.96); opacity: 0; }
          100% { transform: none; opacity: 1; }
        }
        .refraem-mark { animation: refraem-float 5.2s ease-in-out infinite; }
        .refraem-title { animation: refraem-pop 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
        @media (prefers-reduced-motion: reduce) {
          .refraem-mark, .refraem-title { animation: none; }
        }
      `}</style>
      <Frame className="refraem-mark absolute left-[7%] top-[12%] h-14 w-14 text-black/15 sm:left-[16%]" />
      <Frame className="refraem-mark absolute right-[8%] top-[18%] h-10 w-10 text-black/20 [animation-delay:-1.6s] sm:right-[18%]" />
      <Lens className="refraem-mark absolute bottom-[24%] left-[10%] h-8 w-8 text-black/25 [animation-delay:-2.4s] sm:left-[18%]" />
      <Lens className="refraem-mark absolute bottom-[20%] right-[9%] h-6 w-6 text-black/20 [animation-delay:-0.8s] sm:right-[20%]" />

      <main className="relative z-10 mx-auto flex w-full max-w-[560px] flex-1 flex-col items-center px-4 pb-40 pt-[max(1.5rem,env(safe-area-inset-top,0px))] sm:pt-10">
        <div className="refraem-title flex shrink-0 items-center gap-3 text-[clamp(2.75rem,10vw,4.25rem)]">
          <img
            src="/refraem-logo.png"
            alt=""
            width={256}
            height={256}
            className="h-[0.82em] w-[0.82em] shrink-0 rounded-[0.22em] object-contain shadow-[0_12px_28px_rgba(0,0,0,0.16)]"
          />
          <h1
            className="font-semibold leading-none tracking-tight"
            style={{ fontFamily: 'ui-rounded, "SF Pro Rounded", sans-serif' }}
          >
            Refraem
          </h1>
        </div>
        <p className="mt-3 text-center text-[13px] font-medium tracking-wide text-black/45">
          Pronounced Reframe (ree-FRAME)
        </p>
        <p className="mt-4 max-w-[18rem] text-center text-[17px] font-semibold leading-snug sm:max-w-none sm:text-xl">
          Window layout and screen capture
          <br />
          for Mac.
        </p>
        <p className="mt-3 text-center text-[13px] font-medium text-black/55">
          Snap a window
          <span className="px-1.5 text-black/30">·</span>
          grab the screen
          <span className="px-1.5 text-black/30">·</span>
          mark it up
        </p>

        <MacStage />
      </main>

      <div className="pointer-events-none sticky bottom-0 z-20 mt-auto bg-gradient-to-t from-[#F6F6F4] via-[#F6F6F4]/95 to-transparent pt-8">
        <div className="pointer-events-auto flex flex-col items-center gap-3 px-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))]">
          <a
            href={refraemPage.download}
            className="inline-flex h-11 items-center rounded-full bg-black px-6 text-[15px] font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.16)] hover:bg-black/85"
          >
            Download for Mac
          </a>
          <p className="max-w-[18rem] text-center text-[11px] leading-snug text-black/45">
            macOS 14 or later. First open: right-click the app, then Open.
          </p>
          <footer className="flex justify-center gap-4 text-[11px] text-black/45">
            <Link href="/privacy" className="hover:text-black">
              Privacy
            </Link>
            <Link href="/support" className="hover:text-black">
              Support
            </Link>
            <a href="https://github.com/yky32/refraem" className="hover:text-black">
              GitHub
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
}

function MacStage() {
  return (
    <div className="refraem-title relative mt-8 w-full max-w-[440px] [animation-delay:0.08s]">
      <div className="mb-2 flex items-center gap-3 rounded-xl bg-white/80 px-3 py-2 text-[11px] text-black/55 shadow-[0_8px_20px_rgba(0,0,0,0.05)] ring-1 ring-black/5">
        <span className="size-3 rounded-[4px] bg-black" />
        <span>Refraem</span>
        <span className="ml-auto font-medium tracking-wide text-black/35">⇧⌘1</span>
      </div>
      <div className="overflow-hidden rounded-[22px] bg-white shadow-[0_22px_50px_rgba(0,0,0,0.12)] ring-1 ring-black/10">
        <div className="flex h-9 items-center gap-1.5 border-b border-black/8 px-3">
          <span className="size-2.5 rounded-full bg-[#FF5F57]" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-2.5 rounded-full bg-[#28C840]" />
          <span className="ml-2 text-[12px] font-medium text-black/45">Capture</span>
        </div>
        <div className="grid grid-cols-5 gap-2 bg-[#F3F3F1] p-3">
          <div className="col-span-3 flex min-h-[148px] flex-col justify-between rounded-xl bg-black p-3 text-white">
            <span className="text-[11px] font-medium text-white/60">Left half</span>
            <span className="text-2xl font-semibold tracking-tight">Snap</span>
          </div>
          <div className="relative col-span-2 min-h-[148px] overflow-hidden rounded-xl bg-white ring-1 ring-black/10">
            <div className="absolute inset-x-3 top-3 h-2 rounded-full bg-black/10" />
            <div className="absolute inset-x-3 top-7 h-2 w-2/3 rounded-full bg-black/8" />
            <svg viewBox="0 0 80 90" className="absolute inset-0 h-full w-full text-black" aria-hidden>
              <path d="M56 16 L36 52" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="butt" />
              <path d="M22 70 L30 48 L44 58 Z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <rect x="8" y="14" width="28" height="34" rx="6" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.55" />
      <rect x="22" y="14" width="32" height="36" rx="7" fill="none" stroke="currentColor" strokeWidth="3.2" />
    </svg>
  );
}

function Lens({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="16" cy="16" r="10" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="16" cy="16" r="3.2" fill="currentColor" />
    </svg>
  );
}
