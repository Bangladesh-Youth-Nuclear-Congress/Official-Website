"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IconAtom, IconGlobe, IconNetwork, IconBook, IconArrow } from "@/components/icons";
import type { ComponentType, SVGProps } from "react";

const ease = [0.22, 0.61, 0.36, 1] as const;

const fronts: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  body: string;
}[] = [
  {
    icon: IconAtom,
    title: "Innovation for Nuclear",
    body: "I4N Bangladesh 2026 — the national qualifying round of IYNC's flagship competition. 1 August 2026, Russian House, Dhaka.",
  },
  {
    icon: IconGlobe,
    title: "Global Representation",
    body: "As IYNC's 49th member nation, BYNC takes Bangladesh's first delegation to IYNC 2026 in Avignon, France.",
  },
  {
    icon: IconNetwork,
    title: "Industry & Institutions",
    body: "Bridging students with BAEC, NPCBL at Rooppur, Rosatom, Russian House and the worldwide nuclear network.",
  },
  {
    icon: IconBook,
    title: "Knowledge Transfer",
    body: "Campus sessions, international keynotes and workshops connecting youth to senior nuclear experts.",
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
        className="mx-auto max-w-3xl text-center"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-coral">
          What We Do
        </span>
        <h2 className="mt-3 text-[clamp(1.9rem,4vw,3rem)] font-semibold text-ink">
          Fronts of impact
        </h2>
        <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-silver">
          From a national innovation competition to a global delegation, BYNC builds the youth
          pipeline for Bangladesh&apos;s nuclear era.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {fronts.map((front, i) => (
          <motion.article
            key={front.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.08, ease }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-panel to-bg3 p-6 transition-colors hover:border-line2"
          >
            <div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-cyan/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-cyan/10 text-cyan">
              <front.icon width={25} height={25} />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-ink">{front.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{front.body}</p>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-10 text-center"
      >
        <Link
          href="/about"
          className="inline-flex items-center gap-2 text-sm font-semibold text-cyan2 transition hover:gap-3"
        >
          Read the full story <IconArrow width={16} height={16} />
        </Link>
      </motion.div>
    </section>
  );
}