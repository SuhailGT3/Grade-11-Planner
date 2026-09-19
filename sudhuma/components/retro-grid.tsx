type RetroGridProps = {
  /** Extra classes for the wrapper, e.g. to reposition it. */
  className?: string;
};

/*
  RetroGrid — Sudhuma's subtle hero backdrop.
  Inspired by the Magic UI "Retro Grid" pattern, but restrained:
  faint warm lines, a soft gold glow, slow drift, fading to
  nothing behind the headline. Decorative only (aria-hidden),
  so screen readers skip it.
*/
export function RetroGrid({ className = "" }: RetroGridProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Soft gold glow behind the headline */}
      <div className="absolute top-[-25%] left-1/2 h-[65%] w-[85%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(233,161,59,0.18),transparent)]" />
      {/* Perspective grid floor (see .retro-grid-floor in globals.css) */}
      <div className="retro-grid-floor" />
    </div>
  );
}
