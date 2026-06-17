"use client";

import { motion } from "framer-motion";
import { IconAtom, IconGlobe, IconNetwork } from "@/components/icons";
import type { ComponentType, SVGProps } from "react";

const ease = [0.22, 0.61, 0.36, 1] as const;

const pillars: { icon: ComponentType<SVGProps<SVGSVGElement>>; title: string; body: string }[] = [
  {
    icon: IconAtom,
    title: "Innovation for Nuclear",
    body: "I4N Bangladesh 2026 — the national qualifying round of IYNC's flagship competition. 25 July, Russian House, Dhaka.",
  },
  {
    icon: IconGlobe,
    title: "Global Representation",
    body: "As IYNC's 49th member nation, BYNC takes Bangladesh's first delegation to IYNC 2026 in Avignon, France.",
  },
  {
    icon: IconNetwork,
    title: "Industry & Institutions",
    body: "Bridging students with BAEC, NPCBL (Rooppur), Rosatom, Russian House and the worldwide nuclear network.",
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
        <span className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-coral">
          What we do
        </span>
        <h2 className="mt-3 text-[clamp(1.9rem,4vw,3rem)] font-bold text-ink">
          A national platform for the next generation of nuclear leaders
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
            className="group rounded-2xl border border-line bg-bg3/60 p-7 transition-colors hover:border-line2"
          >
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-cyan/10 text-cyan transition-colors group-hover:bg-coral/10 group-hover:text-coral">
              <p.icon width={26} height={26} />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold text-ink">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
