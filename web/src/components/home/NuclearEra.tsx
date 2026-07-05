"use client";

import { motion } from "framer-motion";

const ease = [0.22, 0.61, 0.36, 1] as const;

const facts = [
  ["$12B+", "Infrastructure transformation underway"],
  ["Rooppur", "Bangladesh's first nuclear power plant"],
  ["Talent", "Demand for a globally trained workforce"],
  ["BYNC", "Building the youth pipeline to lead it"],
];

export default function NuclearEra() {
  return (
    <section className="border-y border-line bg-bg2/45 px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-coral">
            Why Now
          </span>
          <h2 className="mt-3 text-[clamp(1.9rem,4vw,3rem)] font-semibold text-ink">
            Bangladesh&apos;s nuclear era has begun
          </h2>
          <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-silver">
            A $12B+ transformation needs a globally literate young workforce. BYNC exists to build it.
          </p>
        </motion.div>

        <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map(([value, label], i) => (
            <motion.div
              key={value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease }}
              className="rounded-2xl border border-line bg-bg3/70 p-6 text-center"
            >
              <div className="text-2xl font-semibold text-cyan">{value}</div>
              <p className="mt-2 text-xs leading-relaxed text-muted">{label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="mx-auto mt-10 max-w-3xl rounded-2xl border border-line2 bg-cyan/10 p-6 text-center text-silver"
        >
          Bangladesh currently lacks an established pipeline of young, globally literate,
          SDG-aligned nuclear professionals equipped to participate in and lead the post-Rooppur
          era. <span className="font-semibold text-cyan2">I4N Bangladesh 2026 is designed to begin closing that gap.</span>
        </motion.div>
      </div>
    </section>
  );
}