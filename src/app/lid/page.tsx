import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "LiD",
  description:
    "One letter between two people. Their face as they open it. Then it's gone.",
};

export default function LidPage() {
  return (
    <div className="fixed inset-0 z-[80] overflow-hidden bg-[#F3EFEB] text-[#4B372F]">
      <Star className="absolute left-[8%] top-[10%] h-10 w-10 text-[#C97C7D] sm:left-[18%] sm:top-[14%]" />
      <Heart className="absolute right-[10%] top-[16%] h-7 w-7 text-[#C97C7D] sm:right-[20%]" />
      <Spark className="absolute right-[16%] top-[28%] h-5 w-5 text-[#E0A060] sm:right-[24%]" />
      <Envelope className="absolute bottom-[22%] left-[7%] h-12 w-12 -rotate-12 text-[#C97C7D] sm:left-[16%]" />
      <Moon className="absolute bottom-[18%] right-[8%] h-8 w-8 text-[#4B372F]/70 sm:right-[18%]" />

      <div className="absolute left-1/2 top-[42%] flex w-[min(82vw,420px)] -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <p className="font-sans text-[clamp(3.4rem,12vw,5.4rem)] font-black leading-none tracking-tight text-[#3D6BFF]">
          LiD
        </p>
        <p className="mt-2 max-w-[16rem] text-center text-[15px] font-semibold leading-snug text-[#6B4CFF] sm:max-w-none sm:text-lg">
          Their face as they open it.
          <br />
          Then it&apos;s gone.
        </p>

        <div className="relative mt-5 w-[min(46vw,210px)]">
          <div className="rounded-[2rem] bg-[#F6C7C8] p-[7px] shadow-[0_18px_40px_rgba(75,55,47,0.12)]">
            <img
              src="/lid-screen.png"
              alt="LiD sign-in screen"
              className="block aspect-[414/900] w-full rounded-[1.55rem] object-cover object-top"
            />
          </div>
        </div>
      </div>

      <footer className="absolute inset-x-0 bottom-0 flex justify-center gap-4 px-4 pb-4 text-[11px] text-[#4B372F]/55">
        <Link href="/privacy" className="hover:text-[#4B372F]">
          Privacy
        </Link>
        <Link href="/support" className="hover:text-[#4B372F]">
          Support
        </Link>
      </footer>
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
