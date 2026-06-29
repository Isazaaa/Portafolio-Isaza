import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { EASE } from "../lib/motion.js";

/**
 * Code-window frame for the hero visual.
 *
 * Renders in priority order:
 *   1. Video  → /hero.mp4  (autoplay, muted, loop)
 *   2. Photo  → /hero.jpg  (fallback if video absent)
 *   3. Placeholder → animated gradient + terminal text (no media)
 *
 * Drop any file into /public and it Just Works.
 */

/* ── Elegant terminal placeholder for when no media exists ── */
const PLACEHOLDER_LINES = [
  { text: "npm create portfolio@latest", delay: 0 },
  { text: "✓  READY in 0.42s", delay: 0.7 },
  { text: "", delay: 0.9 },
  { text: "> dev@1.0.0 start", delay: 1.1 },
  { text: "> Full-stack · UI/UX · Performance", delay: 1.3 },
];

function TerminalPlaceholder() {
  const [visibleLines, setVisibleLines] = useState([true]);

  useEffect(() => {
    const timers = PLACEHOLDER_LINES.map(
      (_, i) =>
        setTimeout(
          () => setVisibleLines((prev) => [...prev, true]),
          PLACEHOLDER_LINES[i].delay * 1000,
        ),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {/* Animated gradient canvas */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-soft)]/60 via-[var(--color-surface)] to-[var(--color-surface-2)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,var(--color-accent-soft)/40%,transparent_60%)]" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Terminal text */}
      <pre className="relative z-10 select-none font-mono text-xs leading-6 tracking-tight md:text-sm md:leading-7">
        {PLACEHOLDER_LINES.map((line, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={
              visibleLines[i]
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 6 }
            }
            transition={{ duration: 0.35, ease: EASE }}
            className={`block ${
              line.text.startsWith("✓")
                ? "text-[var(--color-accent)]"
                : line.text.startsWith(">")
                  ? "text-[var(--color-ink)]"
                  : line.text.startsWith("npm")
                    ? "text-[var(--color-muted)]"
                    : "text-[var(--color-faint)]"
            }`}
          >
            {line.text || "\u00A0"}
          </motion.span>
        ))}
        {/* Blinking cursor */}
        {visibleLines.length >= PLACEHOLDER_LINES.length && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="inline-block h-4 w-2 translate-y-0.5 bg-[var(--color-accent)] md:h-5"
          />
        )}
      </pre>
    </div>
  );
}

export default function VisualFrame() {
  const [status, setStatus] = useState("loading"); // "video" | "image" | "placeholder"
  const videoRef = useRef(null);

  /* ── Detect available media ── */
  useEffect(() => {
    let cancelled = false;

    const checkVideo = async () => {
      // Quick HEAD request to check if hero.mp4 exists
      try {
        const res = await fetch("/hero.mp4", { method: "HEAD" });
        if (!cancelled) {
          if (res.ok) {
            setStatus("video");
            // Force video reload now that we know it exists
            if (videoRef.current) videoRef.current.load();
          } else {
            setStatus("image");
          }
        }
      } catch {
        if (!cancelled) setStatus("image");
      }
    };

    checkVideo();
    return () => { cancelled = true; };
  }, []);

  /* ── If video failed / doesn't exist, try image ── */
  const handleVideoError = () => setStatus("image");

  const handleImgError = () => setStatus("placeholder");

  return (
    <motion.div
      whileHover={{ y: -4, borderColor: "var(--color-accent)" }}
      transition={{ duration: 0.4, ease: EASE }}
      className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-2)] shadow-2xl shadow-[var(--color-base)/60] transition-shadow duration-500 hover:shadow-[var(--color-accent-soft)]/20"
    >
      {/* ── Window chrome — three dots ── */}
      <div className="relative z-20 flex items-center gap-1.5 border-b border-[var(--color-border)] bg-[var(--color-surface)]/80 px-4 py-3 backdrop-blur-sm">
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-faint)] opacity-40" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-faint)] opacity-40" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-faint)] opacity-40" />
        <span className="ml-3 font-mono text-[10px] tracking-wide text-[var(--color-faint)]">
          hero — developer-portfolio
        </span>
      </div>

      {/* ── Media area (4:3 aspect) ── */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-base)]">
        {/* Video (autoplay, muted) */}
        {(status === "video" || status === "loading") && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            onError={handleVideoError}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              status === "video" ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        )}

        {/* Image fallback */}
        {(status === "image" || status === "loading") && (
          <img
            src="/hero.jpg"
            alt="Hero visual"
            onError={handleImgError}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              status === "image" ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Placeholder (no media) */}
        {status === "placeholder" && <TerminalPlaceholder />}

        {/* ── Hover overlay hint ── */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-base)]/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* ── Bottom accent strip ── */}
      <div className="h-0.5 w-0 bg-[var(--color-accent)] transition-all duration-500 group-hover:w-full" />
    </motion.div>
  );
}
