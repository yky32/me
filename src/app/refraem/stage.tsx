"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const scenes = ["Split", "Capture", "Record"] as const;

export function RefraemStage() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setIndex((value) => (value + 1) % scenes.length), 7000);
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
          {scene === "Split" ? <ShortcutCue still={!!reduce} /> : null}
          {scene === "Capture" ? <CaptureCue still={!!reduce} /> : null}
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

const splitTimes = [0, 0.08, 0.22, 0.4, 0.48, 0.6, 0.78, 1];

function Split({ still }: { still: boolean }) {
  const travel = still ? { duration: 0 } : { duration: 6.2, times: splitTimes, ease: "easeInOut" as const };

  return (
    <div className="relative h-full">
      <motion.div
        className="absolute z-10 flex flex-col justify-end overflow-hidden rounded-xl bg-black p-4 text-white shadow-[0_16px_36px_rgba(0,0,0,0.18)]"
        initial={{ left: "8%", top: "8%", width: "84%", height: "84%" }}
        animate={
          still
            ? { left: "3%", top: "4%", width: "47%", height: "92%" }
            : {
                left: ["8%", "8.4%", "3%", "3.4%", "36%", "36.4%", "3%", "3.4%"],
                top: ["8%", "7.6%", "4%", "4.4%", "34%", "33.4%", "4%", "4.4%"],
                width: ["84%", "83.2%", "47%", "47.4%", "28%", "28.4%", "94%", "93.2%"],
                height: ["84%", "83.4%", "92%", "91.4%", "32%", "32.6%", "92%", "91.2%"],
              }
        }
        transition={travel}
      >
        <WindowLabel still={still} />
      </motion.div>
    </div>
  );
}

function WindowLabel({ still }: { still: boolean }) {
  const [label, setLabel] = useState(still ? "Left" : "");

  useEffect(() => {
    if (still) return;
    const timers = [
      window.setTimeout(() => setLabel("Left"), 1600),
      window.setTimeout(() => setLabel(""), 2900),
      window.setTimeout(() => setLabel("Maximize"), 4700),
    ];
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [still]);

  return <span className="text-2xl font-semibold tracking-tight">{label || "\u00a0"}</span>;
}

function ShortcutCue({ still }: { still: boolean }) {
  const [step, setStep] = useState<"left" | "press-left" | "max" | "press-max" | "hide">(
    still ? "press-left" : "left",
  );

  useEffect(() => {
    if (still) return;
    const timers = [
      window.setTimeout(() => setStep("press-left"), 280),
      window.setTimeout(() => setStep("hide"), 1900),
      window.setTimeout(() => setStep("max"), 3000),
      window.setTimeout(() => setStep("press-max"), 3400),
      window.setTimeout(() => setStep("hide"), 5200),
    ];
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [still]);

  if (step === "hide") return null;

  const maximizing = step === "max" || step === "press-max";
  const pressed = step === "press-left" || step === "press-max";

  return (
    <div className="ml-auto flex items-center gap-1.5">
      <Key pressed={pressed}>Ctrl</Key>
      <Key pressed={pressed}>Opt</Key>
      <Key pressed={pressed}>{maximizing ? "Enter" : "←"}</Key>
    </div>
  );
}

function Key({ children, pressed = false }: { children: string; pressed?: boolean }) {
  return (
    <motion.span
      className="inline-flex h-7 min-w-7 items-center justify-center rounded-md px-1.5 text-[11px] font-semibold shadow-sm ring-1 ring-black/10"
      animate={
        pressed
          ? { y: 2, scale: 0.94, backgroundColor: "#111111", color: "#ffffff" }
          : { y: 0, scale: 1, backgroundColor: "#ffffff", color: "#111111" }
      }
      transition={{ duration: 0.12 }}
    >
      {children}
    </motion.span>
  );
}

function CaptureCue({ still }: { still: boolean }) {
  const [pressed, setPressed] = useState(still);

  useEffect(() => {
    if (still) return;
    const timer = window.setTimeout(() => setPressed(true), 180);
    return () => window.clearTimeout(timer);
  }, [still]);

  return (
    <div className="ml-auto flex items-center gap-1.5">
      <Key pressed={pressed}>Shift</Key>
      <Key pressed={pressed}>Cmd</Key>
      <Key pressed={pressed}>1</Key>
    </div>
  );
}

function Capture() {
  return (
    <div className="relative h-full overflow-hidden">
      <div className="absolute inset-3 flex flex-col rounded-xl bg-white p-4 ring-1 ring-black/10">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-black/15" />
          <span className="size-2 rounded-full bg-black/15" />
          <span className="size-2 rounded-full bg-black/15" />
          <span className="ml-2 h-2 w-16 rounded-full bg-black/10" />
        </div>
        <div className="mt-4 h-3 w-2/5 rounded-full bg-black" />
        <div className="mt-3 space-y-2">
          <div className="h-2 rounded-full bg-black/15" />
          <div className="h-2 w-11/12 rounded-full bg-black/10" />
          <div className="h-2 w-4/5 rounded-full bg-black/10" />
          <div className="h-2 w-9/12 rounded-full bg-black/10" />
        </div>
        <div className="mt-4 grid flex-1 grid-cols-3 gap-2">
          <div className="rounded-lg bg-black/5" />
          <div className="rounded-lg bg-black/10" />
          <div className="rounded-lg bg-black" />
        </div>
      </div>
      <motion.div
        className="pointer-events-none absolute z-10 border-2 border-white"
        style={{ boxShadow: "0 0 0 2400px rgba(0,0,0,0.55)" }}
        initial={{ top: "46%", left: "42%", width: "8%", height: "10%", opacity: 0 }}
        animate={{ top: "14%", left: "7%", width: "54%", height: "70%", opacity: 1 }}
        transition={{ duration: 0.95, delay: 0.28, ease: [0.16, 0.8, 0.2, 1] }}
      >
        <span className="absolute -left-[5px] -top-[5px] size-2.5 rounded-[2px] bg-white ring-1 ring-black" />
        <span className="absolute -right-[5px] -top-[5px] size-2.5 rounded-[2px] bg-white ring-1 ring-black" />
        <span className="absolute -bottom-[5px] -left-[5px] size-2.5 rounded-[2px] bg-white ring-1 ring-black" />
        <span className="absolute -right-[5px] -bottom-[5px] size-2.5 rounded-[2px] bg-white ring-1 ring-black" />
        <motion.span
          className="absolute left-1/2 top-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/80 px-2 py-0.5 text-[10px] font-semibold text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.2 }}
        >
          1280 × 800
        </motion.span>
      </motion.div>
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.92, 0] }}
        transition={{ delay: 1.35, duration: 0.32, times: [0, 0.28, 1] }}
      />
      <motion.div
        className="absolute bottom-3 right-3 z-30 w-[34%] overflow-hidden rounded-lg bg-white shadow-[0_18px_36px_rgba(0,0,0,0.28)] ring-1 ring-black/15"
        initial={{ opacity: 0, y: 18, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 280, damping: 22 }}
      >
        <div className="p-2">
          <div className="h-1.5 w-2/5 rounded-full bg-black" />
          <div className="mt-1.5 h-1.5 rounded-full bg-black/15" />
          <div className="mt-1 h-1.5 w-4/5 rounded-full bg-black/10" />
          <div className="mt-1.5 h-5 rounded bg-black" />
        </div>
        <div className="bg-black px-2 py-1 text-[10px] font-semibold text-white">Copied</div>
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
