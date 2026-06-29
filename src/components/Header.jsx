import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { EASE } from "../lib/motion.js";
import { ACCENTS, applyAccent, getStoredIndex, storeIndex } from "../lib/accent.js";

const NAV = [
  { id: "inicio", label: "Inicio" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "trabajos", label: "Trabajos" },
  { id: "contacto", label: "Contacto" },
];

export default function Header() {
  const [active, setActive] = useState("inicio");
  const [navRevealed, setNavRevealed] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();

  /* ── Accent theming: clicking the logo cycles the global accent color ── */
  const [accentIndex, setAccentIndex] = useState(getStoredIndex);

  useEffect(() => {
    applyAccent(ACCENTS[accentIndex].hex);
    storeIndex(accentIndex);
  }, [accentIndex]);

  const cycleAccent = () => setAccentIndex((i) => (i + 1) % ACCENTS.length);

  /* ── Scroll-direction: hide on scroll-down, reveal on scroll-up ── */
  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastScrollY.current;
    if (diff > 10) setNavRevealed(false);
    else if (diff < -4) setNavRevealed(true);
    lastScrollY.current = latest;
  });

  /* ── Active section via IntersectionObserver ── */
  useEffect(() => {
    const ids = NAV.map((n) => n.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const showNav = navRevealed || isHovering;
  const activeItem = NAV.find((n) => n.id === active);
  const activeIdx = NAV.findIndex((n) => n.id === active);

  /* ── Dot position as a percentage along the vertical line ── */
  const dotPosition = activeIdx >= 0 ? ((activeIdx + 0.5) / NAV.length) * 100 : 50;

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
           TOP-LEFT CORNER — micro brand, barely there
         ═══════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, x: -16, y: -16 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
        className="fixed left-5 top-5 z-50 md:left-7 md:top-7"
      >
        <motion.button
          onClick={cycleAccent}
          whileTap={{ scale: 0.82 }}
          transition={{ duration: 0.2, ease: EASE }}
          className="group grid h-9 w-9 place-items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/50 text-xs font-bold text-[var(--color-accent)] backdrop-blur-md transition-colors duration-300 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-soft)]"
          aria-label={`Cambiar color de acento (actual: ${ACCENTS[accentIndex].name})`}
          title="Tocá para cambiar el color"
        >
          {/* Re-keys on each change so the glyph gives a quick pop */}
          <motion.span
            key={accentIndex}
            initial={{ scale: 0.6, opacity: 0.4 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {"</>"}
          </motion.span>
        </motion.button>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════
           RIGHT-EDGE NAV — vertical line + blooming items (desktop)
         ═══════════════════════════════════════════════════════════════ */}
      <div
        className="fixed right-0 top-0 z-50 hidden h-full md:block"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* ── Vertical accent line (always present) ── */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
          className="absolute right-6 top-24 h-[calc(100%-12rem)] w-px origin-top"
        >
          <div className="h-full w-full bg-gradient-to-b from-transparent via-[var(--color-border)] to-transparent" />

          {/* Floating indicator dot — slides along the line */}
          <motion.div
            layoutId="edge-dot"
            className="absolute -right-[3.5px] h-2 w-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_10px_var(--color-accent-soft)]"
            style={{ top: `${dotPosition}%` }}
            transition={{ duration: 0.5, ease: EASE }}
          />
        </motion.div>

        {/* ── Nav items / section label (swap via AnimatePresence) ── */}
        <AnimatePresence mode="wait">
          {showNav ? (
            /* ── Bloomed state — items fan out from the line ── */
            <motion.nav
              key="nav-open"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="flex h-full flex-col items-end justify-center gap-5 pr-[2.25rem]"
            >
              {NAV.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: 16, filter: "blur(4px)" }}
                  transition={{
                    duration: 0.35,
                    ease: EASE,
                    delay: showNav ? i * 0.06 : 0,
                  }}
                  onClick={() => go(item.id)}
                  className={`group relative text-right text-sm font-medium tracking-tight transition-colors duration-300 ${
                    active === item.id
                      ? "text-[var(--color-ink)]"
                      : "text-[var(--color-faint)] hover:text-[var(--color-muted)]"
                  }`}
                >
                  <span className="relative inline-block py-1">
                    {item.label}
                    {/* Dot that sits ON the vertical line */}
                    <span
                      className={`absolute -right-3 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full transition-all duration-300 ${
                        active === item.id
                          ? "bg-[var(--color-accent)] opacity-100"
                          : "bg-[var(--color-border)] opacity-0 group-hover:opacity-60"
                      }`}
                    />
                  </span>
                </motion.button>
              ))}

            </motion.nav>
          ) : (
            /* ── Compressed state — just the section label ── */
            <motion.div
              key="nav-closed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="flex h-full flex-col items-center justify-end pb-32 pr-6"
            >
              <span className="select-none text-[10px] font-medium leading-none uppercase tracking-[0.15em] text-[var(--color-faint)] [writing-mode:vertical-rl]">
                {activeItem?.label ?? ""}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
           MOBILE — floating pill (bottom-right)
         ═══════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
        className="fixed bottom-6 right-5 z-50 md:hidden"
      >
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/80 px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--color-muted)] shadow-lg shadow-[var(--color-base)/50] backdrop-blur-xl transition-all duration-300 active:scale-90"
          aria-label="Abrir navegación"
        >
          <motion.span
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"
          />
          {activeItem?.label ?? ""}
        </button>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════
           MOBILE OVERLAY — bottom sheet con route
         ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-end bg-[var(--color-base)]/70 backdrop-blur-2xl md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.nav
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4, ease: EASE }}
              className="w-full rounded-t-3xl border-t border-[var(--color-border)] bg-[var(--color-surface)] p-7 pb-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Handle */}
              <div className="mx-auto mb-6 h-1 w-10 rounded-full bg-[var(--color-border)]" />

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-faint)]">
                  Navegación
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="grid h-7 w-7 place-items-center rounded-lg border border-[var(--color-border)] text-xs text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                  aria-label="Cerrar menú"
                >
                  ✕
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-1.5">
                {NAV.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3, ease: EASE }}
                    onClick={() => go(item.id)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-left text-base font-semibold tracking-tight transition-all duration-200 ${
                      active === item.id
                        ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                        : "text-[var(--color-muted)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-ink)]"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300 ${
                        active === item.id ? "bg-[var(--color-accent)]" : "bg-[var(--color-border)]"
                      }`}
                    />
                    {item.label}
                  </motion.button>
                ))}
              </div>

            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
