import { motion } from "motion/react";
import { stagger, blurUp, EASE } from "../lib/motion.js";
import SpotlightTitle from "./SpotlightTitle.jsx";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* ── Ambient depth — grid + glow ── */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.15]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[var(--color-accent)] opacity-[0.06] blur-[120px]" />

      <div className="container-page relative">
        <motion.div
          variants={stagger(0.16, 0.12)}
          initial="hidden"
          animate="show"
          className="max-w-5xl"
        >
          {/* ── Eyebrow ── */}
          <motion.div
            variants={blurUp}
            className="mb-8 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-[var(--color-accent)]" />
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--color-muted)]">
              Disponible para nuevos proyectos
            </span>
          </motion.div>

          {/* ── Monumental title with cursor-spotlight reveal ── */}
          <motion.div variants={blurUp}>
            <SpotlightTitle />
          </motion.div>

        </motion.div>
      </div>

      {/* ── Scroll hint ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6, ease: EASE }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-[var(--color-border)] p-1.5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-muted)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
