import type { Metadata } from "next";
import Link from "next/link";

import { lidJsonLd, lidMetadata } from "@/lib/seo";

export const metadata: Metadata = lidMetadata();

export default function LidPage() {
  return (
    <div className="fixed inset-0 z-[80] overflow-hidden bg-[#F3EFEB] text-[#4B372F]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lidJsonLd()) }}
      />
      <style>{`
        @keyframes lid-float {
          0%, 100% { transform: translateY(0) rotate(var(--lid-rot, 0deg)); }
          50% { transform: translateY(-10px) rotate(calc(var(--lid-rot, 0deg) + 6deg)); }
        }
        @keyframes lid-pop {
          0% { transform: translateY(10px) scale(0.92); opacity: 0; }
          70% { transform: translateY(-2px) scale(1.03); opacity: 1; }
          100% { transform: none; opacity: 1; }
        }
        @keyframes lid-bob {
          0%, 100% { transform: translateY(0) rotate(-1.5deg); }
          50% { transform: translateY(-8px) rotate(1.5deg); }
        }
        @keyframes lid-blink {
          0%, 70%, 100% { opacity: 0.45; }
          85% { opacity: 1; }
        }
        .lid-sticker { animation: lid-float 4.8s ease-in-out infinite; }
        .lid-title { animation: lid-pop 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
        .lid-phone { animation: lid-bob 5.4s ease-in-out infinite; }
        .lid-dot { animation: lid-blink 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .lid-sticker, .lid-title, .lid-phone, .lid-dot { animation: none; }
        }
      `}</style>
      <Star className="lid-sticker absolute left-[8%] top-[10%] h-10 w-10 text-[#C97C7D] sm:left-[18%] sm:top-[14%]" />
      <Heart className="lid-sticker absolute right-[10%] top-[16%] h-7 w-7 text-[#C97C7D] [animation-delay:-1.2s] sm:right-[20%]" />
      <Spark className="lid-sticker absolute right-[16%] top-[28%] h-5 w-5 text-[#E0A060] [animation-delay:-2.4s] sm:right-[24%]" />
      <Envelope className="lid-sticker absolute bottom-[22%] left-[7%] h-12 w-12 text-[#C97C7D] [animation-delay:-0.8s] [--lid-rot:-12deg] sm:left-[16%]" />
      <Moon className="lid-sticker absolute bottom-[18%] right-[8%] h-8 w-8 text-[#4B372F]/70 [animation-delay:-3s] sm:right-[18%]" />

      <div className="absolute left-1/2 top-[38%] flex w-[min(82vw,420px)] -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <div className="lid-title flex items-center gap-3 text-[clamp(3.4rem,12vw,5.4rem)]">
          <img
            src="/lid-logo.png?v=2"
            alt="LiD"
            className="h-[0.86em] w-[0.86em] rounded-[0.22em] shadow-[0_10px_24px_rgba(0,0,0,0.16)]"
          />
          <p
            className="font-semibold leading-none text-[#4B372F]"
            style={{
              fontFamily: 'ui-rounded, "SF Pro Rounded", sans-serif',
              fontWeight: 600,
              letterSpacing: 0,
            }}
          >
            LiD
          </p>
        </div>
        <p className="mt-2 max-w-[16rem] text-center text-[15px] font-semibold leading-snug text-[#6B4CFF] sm:max-w-none sm:text-lg">
          Their face as they open it.
          <br />
          Then it&apos;s gone.
        </p>
        <p className="mt-3 text-center text-[13px] font-medium text-[#4B372F]/70">
          Write one line
          <span className="lid-dot px-1.5 text-[#C97C7D]">·</span>
          they lift it
          <span className="lid-dot px-1.5 text-[#C97C7D] [animation-delay:-1.2s]">·</span>
          you get their face
        </p>

        <div className="lid-phone relative mt-5 w-[min(46vw,210px)]">
          <div className="rounded-[2rem] bg-[#F6C7C8] p-[7px] shadow-[0_18px_40px_rgba(75,55,47,0.12)]">
            <img
              src="/lid-screen.png"
              alt="LiD sign-in screen"
              className="block aspect-[414/900] w-full rounded-[1.55rem] object-cover object-top"
            />
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-4 pb-4">
        <img
          src="/app-store.svg"
          alt="Download on the App Store"
          className="h-11 w-auto"
        />
        <footer className="flex justify-center gap-4 text-[11px] text-[#4B372F]/55">
          <Link href="/privacy" className="hover:text-[#4B372F]">
            Privacy
          </Link>
          <Link href="/support" className="hover:text-[#4B372F]">
            Support
          </Link>
        </footer>
      </div>
    </div>
  );
}

function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M24 4l4.2 12.2L40 18l-9.4 7.2L33.6 40 24 32.8 14.4 40l3-14.8L8 18l11.8-1.8z"
      />
    </svg>
  );
}

function Heart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z"
      />
    </svg>
  );
}

function Spark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="currentColor" d="M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6z" />
    </svg>
  );
}

function Envelope({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <rect x="6" y="12" width="36" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <path d="M8 14l16 12L40 14" fill="none" stroke="currentColor" strokeWidth="2.4" />
    </svg>
  );
}

function Moon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M14 3a8 8 0 1 0 7 12 7 7 0 1 1-7-12z"
      />
    </svg>
  );
}
