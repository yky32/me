"use client";

import { motion } from "framer-motion";

/** Neutral “systems” illustration — grayscale only. */
export function HeroGraphic() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[min(100%,420px)] select-none">
      <motion.div
        className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-foreground/8 via-foreground/4 to-transparent blur-3xl dark:from-white/10 dark:via-white/5"
        animate={{ opacity: [0.65, 1, 0.65] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <svg
        viewBox="0 0 440 440"
        className="relative h-full w-full text-foreground drop-shadow-sm"
        aria-hidden
      >
        <defs>
          <linearGradient id="hero-grad-ring" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0.32" />
            <stop offset="100%" stopColor="var(--foreground)" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="hero-grad-fill" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0.055" />
            <stop offset="100%" stopColor="var(--foreground)" stopOpacity="0.018" />
          </linearGradient>
        </defs>
        <rect
          x="48"
          y="48"
          width="344"
          height="344"
          rx="36"
          fill="url(#hero-grad-fill)"
          stroke="currentColor"
          strokeWidth="1"
          className="text-foreground/15 dark:text-white/20"
        />
        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 8 }).map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={88 + col * 36}
              cy={88 + row * 36}
              r="1.5"
              className="fill-foreground/15 dark:fill-white/20"
            />
          )),
        )}
        <ellipse
          cx="220"
          cy="220"
          rx="140"
          ry="72"
          fill="none"
          stroke="url(#hero-grad-ring)"
          strokeWidth="1.5"
          strokeDasharray="8 14"
          transform="rotate(-18 220 220)"
        />
        {[
          [120, 168],
          [220, 128],
          [320, 188],
          [200, 268],
          [288, 292],
        ].map(([cx, cy], i) => (
          <motion.g key={i}>
            <motion.circle
              cx={cx}
              cy={cy}
              r="28"
              className="fill-background stroke-foreground/25 dark:stroke-white/30"
              strokeWidth="1.5"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15 + i * 0.06, duration: 0.5 }}
            />
            <motion.circle
              cx={cx}
              cy={cy}
              r="8"
              className="fill-foreground/70 dark:fill-white/75"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.35 + i * 0.06, type: "spring", stiffness: 260 }}
            />
          </motion.g>
        ))}
        <path
          d="M148 168 L200 148 L292 188 L228 260 L288 292"
          fill="none"
          className="stroke-foreground/25 dark:stroke-white/25"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="6 10"
        />
        <path
          d="M72 100 L100 72"
          className="stroke-foreground/35 dark:stroke-white/35"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M368 72 L400 100"
          className="stroke-foreground/35 dark:stroke-white/35"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M72 340 L100 368"
          className="stroke-foreground/25 dark:stroke-white/25"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M368 368 L400 340"
          className="stroke-foreground/25 dark:stroke-white/25"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
