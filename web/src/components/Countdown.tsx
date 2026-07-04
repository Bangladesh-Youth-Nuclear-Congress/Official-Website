"use client";

import { useEffect, useState } from "react";

const target = new Date("2026-06-25T23:59:59+06:00").getTime();

export default function Countdown() {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setLeft(Math.max(0, target - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const parts =
    left == null
      ? null
      : {
          Days: Math.floor(left / 864e5),
          Hours: Math.floor((left % 864e5) / 36e5),
          Mins: Math.floor((left % 36e5) / 6e4),
          Secs: Math.floor((left % 6e4) / 1e3),
        };

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {(["Days", "Hours", "Mins", "Secs"] as const).map((label) => (
        <div key={label} className="min-w-[72px] rounded-xl border border-line bg-cyan/5 px-3 py-3">
          <div className="font-display text-2xl font-bold text-cyan2">
            {parts == null ? "--" : String(parts[label]).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-muted">{label}</div>
        </div>
      ))}
    </div>
  );
}
