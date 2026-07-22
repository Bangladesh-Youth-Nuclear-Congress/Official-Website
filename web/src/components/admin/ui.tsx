"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Panel({
  title,
  action,
  children,
  className,
}: {
  title?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-2xl border border-line bg-bg3/60", className)}>
      {(title || action) && (
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
          {typeof title === "string" ? (
            <h2 className="font-display text-base font-semibold text-ink">{title}</h2>
          ) : (
            title
          )}
          {action}
        </header>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}

export function Btn({
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger";
}) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" &&
          "bg-gradient-to-br from-[#4C93F2] to-[#2563EB] text-white hover:brightness-105",
        variant === "ghost" && "border border-line text-silver hover:border-line2 hover:text-ink",
        variant === "danger" && "border border-red-500/40 text-red-300 hover:bg-red-500/10",
        className
      )}
    />
  );
}

export const inputCls =
  "w-full rounded-lg border border-line bg-bg2 px-3 py-2 text-sm text-ink outline-none transition placeholder:text-muted focus:border-cyan/60";

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-muted">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

const badgeTones: Record<string, string> = {
  new: "border-cyan/40 bg-cyan/10 text-cyan2",
  pending: "border-cyan/40 bg-cyan/10 text-cyan2",
  read: "border-line2 bg-bg2 text-silver",
  archived: "border-line2 bg-bg2 text-muted",
  confirmed: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  approved: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  waitlisted: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  rejected: "border-red-500/40 bg-red-500/10 text-red-300",
};

export function Badge({ value }: { value: string }) {
  return (
    <span
      className={cn(
        "inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-semibold capitalize",
        badgeTones[value] ?? "border-line2 bg-bg2 text-silver"
      )}
    >
      {value}
    </span>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-line2 bg-bg2/40 px-6 py-12 text-center text-sm text-muted">
      {children}
    </div>
  );
}

export function ErrorNote({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
      {children}
    </div>
  );
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Builds a CSV from rows and triggers a download, entirely client-side. */
export function downloadCsv(filename: string, rows: Record<string, unknown>[]) {
  if (!rows.length) return;
  const cols = Object.keys(rows[0]);
  const esc = (v: unknown) => {
    const s = v === null || v === undefined ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const csv = [cols.join(","), ...rows.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\n");
  const url = URL.createObjectURL(new Blob([`﻿${csv}`], { type: "text/csv;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
