"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const scenes = ["Split", "Capture", "Record"] as const;

export function RefraemStage() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setIndex((value) => (value + 1) % scenes.length), 6200);
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
          <div key={scene} className="absolute inset-0">
            {scene === "Split" ? <Split still={!!reduce} /> : null}
            {scene === "Capture" ? <Capture /> : null}
            {scene === "Record" ? <Record /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

const splitTimes = [0, 0.09, 0.22, 0.38, 0.52, 0.64, 1];

function Split({ still }: { still: boolean }) {
  const travel = still ? { duration: 0 } : { duration: 5.6, times: splitTimes, ease: "easeInOut" as const };

  return (
    <div className="relative h-full">
      <motion.div
        className="absolute bottom-3 top-3 overflow-hidden rounded-xl bg-white ring-1 ring-black/10"
        initial={{ left: "51%", width: "47%", opacity: 1 }}
        animate={
          still
            ? { left: "51%", width: "47%", opacity: 1 }
            : {
                left: ["51%", "72%", "71%", "2%", "3%", "78%", "80%"],
                width: ["47%", "26%", "27%", "66%", "64%", "8%", "6%"],
                opacity: [1, 0.98, 1, 0.97, 0.95, 0, 0.02],
              }
        }
        transition={travel}
      >
        <div className="flex h-full flex-col justify-between p-4">
          <span className="text-[11px] font-medium text-black/40">Right</span>
          <RightWord still={still} />
          <div className="space-y-2">
            <div className="h-2 rounded-full bg-black/10" />
            <div className="h-2 w-2/3 rounded-full bg-black/10" />
          </div>
        </div>
      </motion.div>
      <motion.div
        className="absolute bottom-3 top-3 z-10 flex flex-col justify-between overflow-hidden rounded-xl bg-black p-4 text-white"
        initial={{ left: "2%", width: "47%" }}
        animate={
          still
            ? { left: "2%", width: "47%" }
            : {
                left: ["2%", "3%", "3.4%", "70%", "68%", "2%", "2.4%"],
                width: ["47%", "68%", "67%", "28%", "30%", "96%", "95%"],
              }
        }
        transition={travel}
      >
        <SplitWord still={still} />
      </motion.div>
    </div>
  );
}

function SplitWord({ still }: { still: boolean }) {
  const [phase, setPhase] = useState<"Left" | "Maximize">("Left");

  useEffect(() => {
    if (still) return;
    const timer = window.setTimeout(() => setPhase("Maximize"), 3300);
    return () => window.clearTimeout(timer);
  }, [still]);

  const label = still ? "Left" : phase;

  return (
    <>
      <span className="text-[11px] font-medium text-white/60">{label}</span>
      <span className="text-2xl font-semibold tracking-tight">{label}</span>
    </>
  );
}

function RightWord({ still }: { still: boolean }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (still) return;
    const on = window.setTimeout(() => setShow(true), 1700);
    const off = window.setTimeout(() => setShow(false), 3200);
    return () => {
      window.clearTimeout(on);
      window.clearTimeout(off);
    };
  }, [still]);

  return (
    <span className="text-2xl font-semibold tracking-tight text-black">{show && !still ? "Right" : "\u00a0"}</span>
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
