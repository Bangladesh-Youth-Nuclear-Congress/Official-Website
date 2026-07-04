import type { ComponentType, ReactNode, SVGProps } from "react";
import Reveal from "@/components/Reveal";

export default function Card({
  icon: Icon,
  title,
  children,
  delay = 0,
}: {
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  title: ReactNode;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <Reveal
      delay={delay}
      className="group relative h-full overflow-hidden rounded-2xl border border-line bg-bg3/60 p-7 transition-colors hover:border-line2"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
      {Icon && (
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-cyan/10 text-cyan transition-colors group-hover:bg-coral/10 group-hover:text-coral">
          <Icon width={24} height={24} />
        </div>
      )}
      <h3 className="mt-5 font-display text-lg font-semibold text-ink">{title}</h3>
      <div className="mt-3 text-sm leading-relaxed text-muted">{children}</div>
    </Reveal>
  );
}
