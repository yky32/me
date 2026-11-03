"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const scenes = ["Split", "Capture", "Record"] as const;

export function RefraemStage() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setIndex((value) => (value + 1) % scenes.length), 3400);
    return () => window.clearInterval(id);
  }, [reduce]);

  const scene = scenes[reduce ? 0 : index];

  return (
    <div className="flex h-full min-h-[460px] w-full flex-col">
      <div className="mb-3 flex items-center gap-3 px-1 text-[12px] font-medium text-black/40">
        {scenes.map((name) => (
          <span key={name} className={name === scene ? "text-black" : ""}>
            {name}
          </span>
        ))}
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_22px_50px_rgba(0,0,0,0.12)] ring-1 ring-black/10">
        <div className="flex h-10 items-center gap-1.5 border-b border-black/8 px-3">
          <span className="size-2.5 rounded-full bg-[#FF5F57]" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-2.5 rounded-full bg-[#28C840]" />
          <span className="ml-2 text-[12px] font-medium text-black/45">{scene}</span>
        </div>
        <div className="relative min-h-[320px] flex-1 bg-[#F3F3F1]">
          <AnimatePresence mode="wait">
            <motion.div
              key={scene}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {scene === "Split" ? <Split still={!!reduce} /> : null}
              {scene === "Capture" ? <Capture /> : null}
              {scene === "Record" ? <Record /> : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Split({ still }: { still: boolean }) {
  return (
    <div className="flex h-full items-stretch justify-center gap-2 p-3">
      <motion.div
        className="flex h-full flex-col justify-between overflow-hidden rounded-xl bg-black p-4 text-white"
        initial={false}
        animate={still ? { width: "48%" } : { width: ["46%", "72%", "26%", "46%"] }}
        transition={still ? { duration: 0 } : { duration: 3.1, ease: "easeInOut" }}
      >
        <span className="text-[11px] font-medium text-white/60">Left</span>
        <span className="text-2xl font-semibold tracking-tight">Snap</span>
      </motion.div>
      <motion.div
        className="h-full overflow-hidden rounded-xl bg-white ring-1 ring-black/10"
        initial={false}
        animate={still ? { width: "48%" } : { width: ["46%", "26%", "72%", "46%"] }}
        transition={still ? { duration: 0 } : { duration: 3.1, ease: "easeInOut" }}
      >
        <div className="flex h-full flex-col justify-between p-4">
          <span className="text-[11px] font-medium text-black/40">Right</span>
          <div className="space-y-2">
            <div className="h-2 rounded-full bg-black/10" />
            <div className="h-2 w-2/3 rounded-full bg-black/10" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Capture() {
  return (
    <div className="relative h-full p-4">
      <div className="space-y-2 pt-1">
        <div className="h-2 rounded-full bg-black/10" />
        <div className="h-2 w-4/5 rounded-full bg-black/10" />
        <div className="h-2 w-3/5 rounded-full bg-black/8" />
        <div className="h-2 w-2/3 rounded-full bg-black/8" />
      </div>
      <motion.div
        className="absolute rounded-lg ring-2 ring-black"
        initial={{ top: "42%", left: "42%", width: "6%", height: "8%" }}
        animate={{ top: "18%", left: "10%", width: "80%", height: "64%" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.9, 0] }}
        transition={{ delay: 0.85, duration: 0.4, times: [0, 0.3, 1] }}
      />
      <motion.div
        className="absolute bottom-4 right-4 flex h-20 w-28 flex-col justify-between rounded-xl bg-black p-2 text-white shadow-[0_12px_28px_rgba(0,0,0,0.2)]"
        initial={{ opacity: 0, y: 12, scale: 0.86 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.05, type: "spring", stiffness: 260, damping: 22 }}
      >
        <span className="text-[10px] text-white/60">Copied</span>
        <span className="text-sm font-semibold">Shot</span>
      </motion.div>
    </div>
  );
}

function Record() {
  const [seconds, setSeconds] = useState(1);

  useEffect(() => {
    const id = window.setInterval(() => setSeconds((value) => value + 1), 700);
    return () => window.clearInterval(id);
  }, []);

  const clock = `00:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <div className="relative h-full p-3">
      <motion.div
        className="absolute inset-3 rounded-xl ring-2 ring-[#FF3B30]"
        animate={{ opacity: [1, 0.35, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-black px-2.5 py-1 text-[11px] font-semibold text-white">
        <motion.span
          className="size-2 rounded-full bg-[#FF3B30]"
          animate={{ opacity: [1, 0.15, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        REC {clock}
      </div>
      <motion.div
        className="absolute inset-x-8 top-16 space-y-2"
        animate={{ y: [0, -28, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="h-2 rounded-full bg-black/15" />
        <div className="h-2 w-4/5 rounded-full bg-black/10" />
        <div className="h-2 w-3/5 rounded-full bg-black/10" />
        <div className="h-2 w-11/12 rounded-full bg-black/10" />
        <div className="h-2 w-2/3 rounded-full bg-black/10" />
      </motion.div>
    </div>
  );
}
