import { useEffect, useState } from "react";
import { ACCENTS, applyAccent, getStoredIndex, storeIndex } from "../../lib/accent.js";

const NAV = [
  { id: "sobre-mi", label: "sobre mí" },
  { id: "servicios", label: "servicios" },
  { id: "trabajo", label: "trabajo" },
  { id: "contacto", label: "contacto" },
];

/**
 * Sticky header — and the page's only position indicator.
 *
 * There is no progress bar anywhere on this site. A bar is a poor instrument:
 * it reports one number and tells you nothing about what is left. The nav does
 * the job better by becoming a SCALE MAP of the document.
 *
 * From `md` up, each nav item is sized to its section's real share of the page
 * height. "trabajo" is most of the site, so it takes most of the rail;
 * "contacto" is short, so it is a sliver. Reading the nav, you can see the
 * shape of the page before you scroll a pixel.
 *
 * On top of that geometry:
 *   - the ACTIVE item fills left to right as you read through its section
 *   - items you already PASSED stay filled
 *   - so the fill sweeping across the whole rail IS total progress, without a
 *     separate bar drawing it again
 *
 * Position, local progress, global progress, document structure and navigation
 * — one element, no extra furniture.
 */
export default function Header() {
  const [active, setActive] = useState(-1);
  const [within, setWithin] = useState(0);
  const [shares, setShares] = useState(() => NAV.map(() => 1));
  const [accentIndex, setAccentIndex] = useState(getStoredIndex);

  useEffect(() => {
    applyAccent(accentIndex);
    storeIndex(accentIndex);
  }, [accentIndex]);

  useEffect(() => {
    // A plain scroll listener rather than IntersectionObserver: four
    // getBoundingClientRect calls are cheap, and this needs a continuous ratio
    // anyway, which an observer does not give.
    const onScroll = () => {
      const doc = document.documentElement;
      const mid = window.innerHeight * 0.42;

      let found = -1;
      let ratio = 0;

      // "The last section that starts above the reading line." A straddle test
      // fails on the final section: the document runs out before it can cross
      // the line, so that section would never register.
      NAV.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top <= mid) {
          found = i;
          ratio = Math.min(1, Math.max(0, (mid - r.top) / Math.max(r.height, 1)));
        }
      });

      // Bottom of the page means the last section is done, whatever the maths.
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
        found = NAV.length - 1;
        ratio = 1;
      }

      setActive(found);
      setWithin(ratio);

      // Segment widths mirror how much of the page each section actually is.
      // Clamped so a very short section still shows a readable label.
      const heights = NAV.map((s2) => {
        const el = document.getElementById(s2.id);
        return el ? el.getBoundingClientRect().height : 1;
      });
      const sum = heights.reduce((a, b) => a + b, 0) || 1;
      setShares(heights.map((h) => Math.max(0.6, (h / sum) * NAV.length)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const cycleAccent = () => setAccentIndex((i) => (i + 1) % ACCENTS.length);
  const next = ACCENTS[(accentIndex + 1) % ACCENTS.length];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-base/85 backdrop-blur-md">
      <div className="container-page flex items-center justify-between gap-4 py-3.5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={cycleAccent}
            title={`Cambiar acento a ${next.name}`}
            aria-label={`Cambiar el color de acento. Actual: ${ACCENTS[accentIndex].name}`}
            className="h-3.5 w-3.5 shrink-0 rounded-full bg-accent transition-transform duration-300 hover:scale-125 active:scale-90"
          />
          <a href="#inicio" className="font-semibold tracking-tight whitespace-nowrap no-underline">
            Juan Isaza
          </a>
        </div>

        <nav className="scrollbar-none flex min-w-0 flex-1 items-stretch justify-end gap-3 overflow-x-auto font-mono text-xs tracking-[0.04em] md:ml-10 md:justify-start md:gap-2">
          {NAV.map((item, i) => {
            const isActive = i === active;
            const passed = i < active;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                style={{ "--share": shares[i] }}
                className={`nav-seg group relative min-w-0 pt-1 pb-2 whitespace-nowrap no-underline transition-colors duration-300 ${
                  isActive ? "text-ink" : passed ? "text-muted" : "text-faint hover:text-ink"
                }`}
              >
                <span className="block truncate">{item.label}</span>

                {/* Track: as wide as this section's share of the document */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 block h-[2px] rounded-full bg-border"
                >
                  <span
                    className={`block h-full rounded-full transition-[width] duration-200 ease-out-soft ${
                      isActive ? "bg-accent" : "bg-border-strong"
                    }`}
                    style={{ width: isActive ? `${within * 100}%` : passed ? "100%" : "0%" }}
                  />
                </span>
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
