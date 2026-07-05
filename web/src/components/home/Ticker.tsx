const words = [
  "Innovation for Nuclear",
  "The Rooppur Era",
  "IYNC · 49th Member Nation",
  "Young-Generation-Led, Bangladesh-Born",
  "Compete · Connect · Represent",
];

function Row() {
  return (
    <div className="flex shrink-0 items-center gap-8 px-4">
      {words.map((w) => (
        <span key={w} className="flex items-center gap-8">
          <span className="text-sm font-semibold uppercase tracking-[0.22em] text-silver/70">
            {w}
          </span>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
        </span>
      ))}
    </div>
  );
}

export default function Ticker() {
  return (
    <div className="relative overflow-hidden border-y border-line bg-bg2/60 py-4">
      <div className="flex w-max animate-marquee">
        <Row />
        <Row />
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent" />
    </div>
  );
}
