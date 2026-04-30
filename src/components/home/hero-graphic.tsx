"use client";

import { motion } from "framer-motion";

/** Abstract “systems / nodes” artwork — decorative only. */
export function HeroGraphic() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[min(100%,420px)] select-none">
      <motion.div
        className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-primary/12 via-cyan-500/6 to-transparent blur-3xl dark:from-primary/18"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <svg
        viewBox="0 0 440 440"
        className="relative h-full w-full drop-shadow-sm"
        aria-hidden
      >
        <defs>
          <linearGradient id="hero-grad-ring" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
          <linearGradient id="hero-grad-fill" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.06" />
          </linearGradient>
        </defs>
        {/* Soft panel */}
        <rect
          x="48"
          y="48"
          width="344"
          height="344"
          rx="36"
          fill="url(#hero-grad-fill)"
          stroke="currentColor"
          strokeWidth="1"
          className="text-primary/12 dark:text-primary/22"
        />
        {/* Grid dots */}
        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 8 }).map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={88 + col * 36}
              cy={88 + row * 36}
              r="1.5"
              className="fill-primary/25 dark:fill-primary/35"
            />
          )),
        )}
        {/* Orbit */}
        <ellipse
          cx="220"
          cy="220"
          rx="140"
          ry="72"
          fill="none"
          stroke="url(#hero-grad-ring)"
          strokeWidth="1.5"
          strokeOpacity="0.4"
          strokeDasharray="8 14"
          transform="rotate(-18 220 220)"
        />
        {/* Nodes */}
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
              className="fill-background stroke-primary/40 dark:stroke-primary/50"
              strokeWidth="1.5"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15 + i * 0.06, duration: 0.5 }}
            />
            <motion.circle
              cx={cx}
              cy={cy}
              r="8"
              className="fill-primary"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.35 + i * 0.06, type: "spring", stiffness: 260 }}
            />
          </motion.g>
        ))}
        {/* Connectors */}
        <path
          d="M148 168 L200 148 L292 188 L228 260 L288 292"
          fill="none"
          className="stroke-primary/35 dark:stroke-primary/45"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="6 10"
        />
        {/* Corner accents */}
        <path
          d="M72 100 L100 72"
          className="stroke-primary/50"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M368 72 L400 100"
          className="stroke-primary/50"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M72 340 L100 368"
          className="stroke-cyan-500/50"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M368 368 L400 340"
          className="stroke-cyan-500/50"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
