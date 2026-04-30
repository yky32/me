"use client";

import { motion } from "framer-motion";
import {
  SiDocker,
  SiGithub,
  SiKubernetes,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTypescript,
} from "react-icons/si";

const stack = [
  { Icon: SiTypescript, label: "TypeScript" },
  { Icon: SiReact, label: "React" },
  { Icon: SiNextdotjs, label: "Next.js" },
  { Icon: SiNodedotjs, label: "Node.js" },
  { Icon: SiDocker, label: "Docker" },
  { Icon: SiKubernetes, label: "Kubernetes" },
  { Icon: SiPostgresql, label: "PostgreSQL" },
  { Icon: SiGithub, label: "GitHub" },
] as const;

export function TechStrip() {
  return (
    <section
      className="border-y border-dashed border-primary/15 bg-gradient-to-b from-primary/[0.06] via-transparent to-cyan-500/[0.04] py-10 dark:border-primary/20 dark:from-primary/10 dark:to-cyan-500/5"
      aria-label="Technologies and platforms"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-6 text-center text-sm font-bold uppercase tracking-[0.25em] text-primary"
        >
          <span className="mr-2 inline-block" aria-hidden>
            ⚡
          </span>
          Stack energy
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-12 md:gap-x-14">
          {stack.map(({ Icon, label }, i) => (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 22,
                delay: i * 0.05,
              }}
              whileHover={{
                scale: 1.18,
                rotate: [0, -4, 4, 0],
                transition: { duration: 0.45 },
              }}
              className="group relative flex flex-col items-center gap-2"
            >
              <Icon
                className="size-9 text-foreground/35 grayscale transition-all duration-300 group-hover:scale-110 group-hover:grayscale-0 sm:size-10 md:size-11"
                aria-hidden
                title={label}
              />
              <span className="pointer-events-none absolute -bottom-6 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-full bg-foreground/90 px-2 py-0.5 text-[10px] font-medium text-background opacity-0 transition-opacity group-hover:opacity-100 sm:block">
                {label}
              </span>
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
