import type { Metadata } from "next";
import Link from "next/link";

import { refraemJsonLd, refraemMetadata, refraemPage } from "@/lib/seo";
import { RefraemStage } from "./stage";
import { RefraemTabIcon } from "./tab-icon";

export const metadata: Metadata = refraemMetadata();

export default function RefraemPage() {
  return (
    <div className="fixed inset-0 z-[80] flex min-h-dvh flex-col overflow-x-hidden overflow-y-auto bg-[#F3F2EF] text-[#111111]">
      <RefraemTabIcon />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(refraemJsonLd()) }}
      />
      <style>{`
        @keyframes refraem-pop {
          0% { transform: translateY(10px) scale(0.96); opacity: 0; }
          100% { transform: none; opacity: 1; }
        }
        @keyframes refraem-ring {
          0% { transform: scale(1); opacity: 0.55; }
          100% { transform: scale(1.28); opacity: 0; }
        }
        .refraem-title { animation: refraem-pop 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
        .refraem-download { position: relative; }
        .refraem-download::before {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: 9999px;
          background: #111;
          animation: refraem-ring 2s ease-out infinite;
          z-index: -1;
        }
        @media (prefers-reduced-motion: reduce) {
          .refraem-title, .refraem-download::before { animation: none; }
        }
      `}</style>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[46%] h-[720px] w-[min(1100px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0)_68%)]" />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: "radial-gradient(rgba(17,17,17,0.045) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse at 50% 46%, black 20%, transparent 72%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 46%, black 20%, transparent 72%)",
          }}
        />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-[920px] flex-1 flex-col items-center px-6 pb-36 pt-[max(1.25rem,env(safe-area-inset-top,0px))] sm:pt-8">
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

        <div className="my-auto grid w-full items-center gap-8 pt-2 md:grid-cols-[minmax(0,1.4fr)_minmax(220px,0.62fr)] md:gap-10">
          <RefraemStage />
          <Details />
        </div>
      </main>

      <div className="pointer-events-none sticky bottom-0 z-20 mt-auto bg-gradient-to-t from-[#F3F2EF] via-[#F3F2EF]/95 to-transparent pt-8">
        <div className="pointer-events-auto flex flex-col items-center gap-3 px-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))]">
          <a
            href={refraemPage.download}
            className="refraem-download inline-flex h-[52px] items-center gap-2 rounded-full bg-black px-7 text-[16px] font-semibold text-white shadow-[0_16px_36px_rgba(0,0,0,0.28)] transition-transform hover:scale-[1.04]"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
              <path d="M8 1.5v8.2M4.8 7.2 8 10.6l3.2-3.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2.5 13.5h11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            Download for Mac
          </a>
          <p className="max-w-[18rem] text-center text-[11px] leading-snug text-black/45">
            macOS 14 or later, Apple Silicon. Drag it into Applications.
          </p>
          <footer className="flex justify-center gap-4 text-[11px] text-black/45">
            <Link href="/privacy" className="hover:text-black">
              Privacy
            </Link>
            <Link href="/support" className="hover:text-black">
              Support
            </Link>
          </footer>
        </div>
      </div>
    </div>
  );
}

const details = [
  { title: "Snap", cue: "Ctrl Opt", body: "Halves, thirds, and the next display." },
  { title: "Grab", cue: "Shift Cmd 1", body: "A screen, a window, or one long page." },
  { title: "Mark", cue: "Esc", body: "Draw on it, then copy the finished image." },
] as const;

function Details() {
  return (
    <section className="refraem-title w-full [animation-delay:0.16s]">
      <ul className="flex flex-col gap-4 text-left">
        {details.map((item) => (
          <li key={item.title} className="border-l border-black/15 pl-4">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-[14px] font-semibold tracking-wide">{item.title}</p>
              <p className="font-mono text-[11px] tracking-wide text-black/35">{item.cue}</p>
            </div>
            <p className="mt-1 text-[15px] leading-snug text-black/55">{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

