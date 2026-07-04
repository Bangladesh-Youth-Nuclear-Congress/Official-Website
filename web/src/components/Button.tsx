import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-[#FF8163] to-[#EE5A38] text-[#15110c] shadow-[0_6px_18px_-10px_rgba(238,90,56,0.5)] hover:brightness-[1.05]",
  secondary: "border border-cyan/45 bg-cyan/15 text-cyan2 hover:bg-cyan/25",
};

export default function Button({
  href,
  children,
  variant = "primary",
  external = false,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
}) {
  const cls = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-display text-base font-semibold transition",
    variants[variant],
    className
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
