"use client";

import { motion } from "framer-motion";
import { Boxes, Cpu, Users } from "lucide-react";

const items = [
  {
    icon: Cpu,
    title: "Distributed systems",
    body: "Designing reliable services that scale with traffic and complexity.",
  },
  {
    icon: Boxes,
    title: "Backend craft",
    body: "Performance, observability, and pragmatic architecture decisions.",
  },
  {
    icon: Users,
    title: "Customer-centric",
    body: "Shipping products that respect both users and the teams building them.",
  },
] as const;

export function FeatureStrip() {
  return (
    <section className="border-b border-border/60 bg-muted/20 py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-3 sm:gap-8 sm:px-6 lg:px-8">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="rounded-2xl border border-border/80 bg-card/80 p-6 shadow-sm backdrop-blur-sm"
          >
            <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <item.icon className="size-5" aria-hidden />
            </div>
            <h2 className="text-lg font-semibold tracking-tight">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {item.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
