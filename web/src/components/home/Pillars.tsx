"use client";

import { motion } from "framer-motion";
import { IconAtom, IconGlobe, IconNetwork, IconArrow } from "@/components/icons";
import type { ComponentType, SVGProps } from "react";

const ease = [0.22, 0.61, 0.36, 1] as const;

const pillars: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  body: string;
}[] = [
  {
    icon: IconAtom,
    title: "We run the competition",
    body: "I4N Bangladesh 2026 is the national qualifier for IYNC's flagship challenge — three days of ideas, prototypes and posters. 25 July, Russian House, Dhaka.",
  },
  {
    icon: IconGlobe,
    title: "We carry the flag",
    body: "As IYNC's 49th member nation, we take Bangladesh's very first delegation to the world congress in Avignon, France — putting our names on the global map.",
  },
  {
    icon: IconNetwork,
    title: "We open the doors",
    body: "We bridge students with the people who actually run the field — BAEC, NPCBL at Rooppur, Rosatom, Russian House and the wider nuclear community.",
  },
];

export default function Pillars() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease }}
        className="max-w-2xl"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-coral">
          What we actually do
        </span>
        <h2 className="mt-3 text-[clamp(1.9rem,4vw,3rem)] font-bold text-ink">
          Three ways we&apos;re building the next generation of nuclear leaders
        </h2>
      </motion.div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {pillars.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease }}
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden rounded-2xl border border-line bg-bg3/60 p-7 transition-colors hover:border-line2"
          >
            {/* hover glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-coral/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

            <div className="flex items-center justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-cyan/10 text-cyan transition-colors group-hover:bg-coral/10 group-hover:text-coral">
                <p.icon width={26} height={26} />
              </div>
              <span className="font-display text-3xl font-bold text-line2/60 transition-colors group-hover:text-coral/40">
                0{i + 1}
              </span>
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold text-ink">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-10"
      >
        <a
          href="/about"
          className="inline-flex items-center gap-2 font-display text-sm font-semibold text-cyan2 transition hover:gap-3"
        >
          Read the full story <IconArrow width={16} height={16} />
        </a>
      </motion.div>
    </section>
  );
}
