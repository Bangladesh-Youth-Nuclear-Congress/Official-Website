import type { SVGProps } from "react";

const base: SVGProps<SVGSVGElement> = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function IconAtom(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="1.6" />
      <ellipse cx="12" cy="12" rx="10" ry="4.3" />
      <ellipse cx="12" cy="12" rx="10" ry="4.3" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.3" transform="rotate(120 12 12)" />
    </svg>
  );
}

export function IconGlobe(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M2.5 12h19" />
      <path d="M12 2.5c3 3 3 16 0 19c-3-3-3-16 0-19Z" />
    </svg>
  );
}

export function IconNetwork(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <circle cx="6" cy="6" r="2.4" />
      <circle cx="18" cy="6" r="2.4" />
      <circle cx="12" cy="18" r="2.4" />
      <path d="M7.7 7.7 10.6 16M16.3 7.7 13.4 16M8.4 6h7.2" />
    </svg>
  );
}

export function IconArrow(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconFlag(p: SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden {...p}>
      <rect width="20" height="14" rx="2" fill="#06A651" />
      <circle cx="9" cy="7" r="4" fill="#F4263F" />
    </svg>
  );
}

export function IconTarget(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function IconEye(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  );
}

export function IconUsers(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.2a3.2 3.2 0 0 1 0 6" />
      <path d="M17.4 13.6A5.5 5.5 0 0 1 20.5 19" />
    </svg>
  );
}

export function IconCalendar(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
      <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
    </svg>
  );
}

export function IconPin(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function IconTrophy(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
      <path d="M8 5.2H5.6A1.6 1.6 0 0 0 4 6.8C4 9 6 10.2 8 10.2" />
      <path d="M16 5.2h2.4A1.6 1.6 0 0 1 20 6.8C20 9 18 10.2 16 10.2" />
      <path d="M12 13v3M9 20h6M10.2 20l.4-4h2.8l.4 4" />
    </svg>
  );
}

export function IconCheck(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M4 12.5l5 5 11-11" />
    </svg>
  );
}

export function IconBuilding(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M8 7h2M14 7h2M8 11h2M14 11h2M10 21v-3.5h4V21" />
    </svg>
  );
}

export function IconTicket(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M9 6v12" strokeDasharray="2 2" />
    </svg>
  );
}

export function IconMegaphone(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M4 10v4l4 1 6 4V5L8 9H5a1 1 0 0 0-1 1Z" />
      <path d="M17 9.2a4 4 0 0 1 0 5.6" />
    </svg>
  );
}

export function IconBook(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M12 5.5C10.5 4.4 8.5 4 5.5 4H4v14h1.5c3 0 5 .4 6.5 1.5" />
      <path d="M12 5.5C13.5 4.4 15.5 4 18.5 4H20v14h-1.5c-3 0-5 .4-6.5 1.5" />
      <path d="M12 5.5v14" />
    </svg>
  );
}

export function IconMedal(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M8.5 8 6 3M15.5 8 18 3" />
      <circle cx="12" cy="14" r="5.5" />
      <path d="M12 11.6l1 2.1 2.2.2-1.7 1.5.5 2.2L12 16.7l-2 1.1.5-2.2-1.7-1.5 2.2-.2Z" />
    </svg>
  );
}

export function IconNewspaper(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M17 20H6a2 2 0 0 1-2-2V4h13v14a2 2 0 0 0 2 2 2 2 0 0 0 2-2V9h-3" />
      <path d="M7.5 8h6M7.5 11.5h6M7.5 15h4" />
    </svg>
  );
}

export function IconShield(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function IconClock(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function IconMail(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M4 7.5l8 5.5 8-5.5" />
    </svg>
  );
}

export function IconChevronDown(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
