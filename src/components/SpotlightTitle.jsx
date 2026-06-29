import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionTemplate, animate } from "motion/react";
import { EASE } from "../lib/motion.js";

const TITLE = ["SI PUEDES", "IMAGINARLO,", "PUEDO", "PROGRAMARLO."];

// Min lowered to 2.3rem so the longest word ("PROGRAMARLO.") never clips on
// 320px phones; still monumental up to 7rem on large screens.
const TITLE_CLASS =
  "text-[clamp(2.3rem,9vw,7rem)] font-extrabold leading-[0.85] -tracking-[0.03em]";

// Lines render identically in every layer (explicit <span> blocks => deterministic
// wrapping, so the stacked copies always line up).
function Lines({ variant }) {
  return TITLE.map((line, i) => {
    let color;
    if (variant === "dim") color = "text-transparent [-webkit-text-stroke:1px_#3a3a45]";
    else if (variant === "accent") color = "text-[var(--color-accent)]";
    else color = i === 3 ? "text-[var(--color-accent)]" : "text-[var(--color-ink)]";

    return (
      <span key={line} className={`block py-[0.02em] ${i < 3 ? "tracking-[0.06em]" : ""}`}>
        <span className={color}>{line}</span>
      </span>
    );
  });
}

export default function SpotlightTitle() {
  const ref = useRef(null);

  // Resolve the animation mode once, synchronously, to avoid a first-paint flash.
  //   spotlight → desktop pointer follows the cursor
  //   sheen     → touch devices get an auto-looping accent sweep
  //   static    → prefers-reduced-motion: no motion at all
  const [mode] = useState(() => {
    if (typeof window === "undefined") return "static";
    const mm = (q) => window.matchMedia?.(q).matches;
    if (mm("(prefers-reduced-motion: reduce)")) return "static";
    return mm("(hover: hover)") ? "spotlight" : "sheen";
  });
  const spotlight = mode === "spotlight";

  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const mask = useMotionTemplate`radial-gradient(260px circle at ${x}px ${y}px, #000 0%, #000 22%, transparent 76%)`;

  // Intro sweep, then rest in the center (so the title is never left dim).
  useEffect(() => {
    if (!spotlight) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    y.set(rect.height / 2);
    const controls = animate(x, [-rect.width * 0.1, rect.width * 1.1, rect.width / 2], {
      duration: 1.7,
      ease: "easeInOut",
      delay: 0.7,
    });
    return () => controls.stop();
  }, [spotlight, x, y]);

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  const handleLeave = () => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    animate(x, rect.width / 2, { duration: 0.6, ease: EASE });
    animate(y, rect.height / 2, { duration: 0.6, ease: EASE });
  };

  return (
    <div
      ref={ref}
      onMouseMove={spotlight ? handleMove : undefined}
      onMouseLeave={spotlight ? handleLeave : undefined}
      className="relative w-fit"
    >
      {/* Real, accessible headline. Dim only in spotlight mode; fully bright otherwise. */}
      <h1 className={`${TITLE_CLASS} relative`}>
        <Lines variant={spotlight ? "dim" : "bright"} />
      </h1>

      {/* Desktop: bright copy revealed by the cursor spotlight. */}
      {spotlight && (
        <motion.h1
          aria-hidden="true"
          className={`${TITLE_CLASS} pointer-events-none absolute inset-0`}
          style={{ WebkitMaskImage: mask, maskImage: mask }}
        >
          <Lines variant="bright" />
        </motion.h1>
      )}

      {/* Touch: looping accent sheen over the bright base — alive AND fully readable. */}
      {mode === "sheen" && (
        <h1
          aria-hidden="true"
          className={`${TITLE_CLASS} title-sheen pointer-events-none absolute inset-0`}
        >
          <Lines variant="accent" />
        </h1>
      )}
    </div>
  );
}
