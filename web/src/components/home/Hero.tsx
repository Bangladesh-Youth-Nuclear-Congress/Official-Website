"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { IconArrow, IconFlag } from "@/components/icons";

const ease = [0.22, 0.61, 0.36, 1] as const;
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

function Magnetic({ children }: { children: ReactNode }) {
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  return (
    <motion.span
      style={{ x, y, display: "inline-block" }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.3);
        y.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

const stats = [
  ["49th", "IYNC member nation"],
  ["300+", "I4N participants"],
  ["3", "International keynotes"],
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-4 pt-24 pb-16 sm:px-6 lg:px-10">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-10 h-[42rem] w-[42rem] rounded-full bg-cyan/20 blur-[120px]"
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-[34rem] w-[34rem] rounded-full bg-coral/15 blur-[120px]"
        animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-coral/35 bg-coral/10 px-4 py-1.5 text-xs font-semibold text-coral2"
          >
            <span className="h-2 w-2 rounded-full bg-coral" />
            <IconFlag /> Official National Partner of IYNC
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 text-[clamp(2.6rem,7vw,5.5rem)] font-bold leading-[1.02] tracking-tight text-ink"
          >
            Powering Bangladesh&apos;s <span className="hl">Nuclear Future</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-silver">
            Bangladesh&apos;s first youth-led nuclear organisation — connecting the nation&apos;s
            brightest STEM minds to the global nuclear community as we enter the post-Rooppur era.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <Magnetic>
              <Link
                href="/get-involved"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-coral px-7 py-3.5 font-display text-base font-semibold text-bg shadow-[0_10px_40px_-8px_rgba(255,92,59,0.5)] transition hover:opacity-95"
              >
                Join the Movement <IconArrow width={18} height={18} />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="/sponsors"
                className="inline-flex items-center gap-2 rounded-full border border-line2 bg-cyan/5 px-7 py-3.5 font-display text-base font-semibold text-cyan2 transition hover:bg-cyan/10"
              >
                Partner With Us
              </Link>
            </Magnetic>
          </motion.div>

          <motion.div variants={item} className="mt-12 flex flex-wrap gap-8">
            {stats.map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-2xl font-bold text-ink">{n}</div>
                <div className="mt-0.5 text-xs text-muted">{l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mx-auto hidden aspect-square w-full max-w-md place-items-center lg:grid"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease, delay: 0.2 }}
        >
          <div className="animate-spin-slow absolute inset-0 rounded-full border border-line" />
          <div className="animate-spin-rev absolute inset-[12%] rounded-full border border-coral/25" />
          <div className="animate-spin-slow absolute inset-[26%] rounded-full border border-line2" />
          <div className="absolute inset-[18%] rounded-full bg-cyan/15 blur-2xl" />
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <Image
              src="/assets/bync-logo.png"
              alt="BYNC emblem"
              width={300}
              height={300}
              priority
              className="drop-shadow-[0_0_40px_rgba(79,195,247,0.45)]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
