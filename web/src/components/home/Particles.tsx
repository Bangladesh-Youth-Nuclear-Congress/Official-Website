"use client";

import { motion, useReducedMotion } from "framer-motion";

// Deterministic positions so server and client markup match (no hydration drift).
const pts = [
  { l: "8%", t: "22%", s: 4, d: 0.0, dur: 7, c: "var(--color-cyan)" },
  { l: "18%", t: "70%", s: 3, d: 1.2, dur: 9, c: "var(--color-cyan2)" },
  { l: "30%", t: "40%", s: 2, d: 0.6, dur: 8, c: "var(--color-cyan)" },
  { l: "42%", t: "80%", s: 5, d: 2.0, dur: 11, c: "var(--color-coral)" },
  { l: "55%", t: "18%", s: 3, d: 0.4, dur: 8, c: "var(--color-cyan2)" },
  { l: "63%", t: "62%", s: 4, d: 1.6, dur: 10, c: "var(--color-coral2)" },
  { l: "72%", t: "30%", s: 2, d: 0.9, dur: 7, c: "var(--color-cyan)" },
  { l: "80%", t: "75%", s: 3, d: 2.4, dur: 9, c: "var(--color-cyan2)" },
  { l: "88%", t: "45%", s: 4, d: 1.0, dur: 12, c: "var(--color-coral)" },
  { l: "92%", t: "15%", s: 2, d: 0.3, dur: 8, c: "var(--color-cyan)" },
  { l: "12%", t: "50%", s: 3, d: 1.8, dur: 10, c: "var(--color-cyan2)" },
  { l: "48%", t: "55%", s: 2, d: 0.7, dur: 9, c: "var(--color-coral2)" },
];

export default function Particles() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {pts.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.l,
            top: p.t,
            width: p.s,
            height: p.s,
            background: p.c,
            boxShadow: `0 0 ${p.s * 2}px ${p.s * 0.5}px ${p.c}`,
          }}
          animate={reduce ? { opacity: 0.4 } : { y: [0, -26, 0], opacity: [0.1, 0.6, 0.1] }}
          transition={{ duration: p.dur, delay: p.d, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
