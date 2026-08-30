import { useEffect } from "react";

/**
 * Scroll reveals, wired once for the whole page.
 *
 * The critical rule: content is visible by default. This effect ARMS the
 * hidden state (by putting `reveal-armed` on <html>) only after it has
 * confirmed IntersectionObserver exists — so if JavaScript never runs, or the
 * observer never fires, the visitor reads a complete page instead of a blank
 * one. A timer un-arms everything as a second safety net.
 *
 * One observer for every element beats one per component: fewer objects, and
 * nothing depends on React state that a remount could reset.
 */
export function useScrollReveal({ fallbackMs = 2000 } = {}) {
  useEffect(() => {
    const root = document.documentElement;
    const nodes = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!nodes.length || typeof IntersectionObserver === "undefined") return;

    root.classList.add("reveal-armed");

    const show = (el) => el.classList.add("is-visible");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          show(e.target);
          observer.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    nodes.forEach((el) => observer.observe(el));

    // Anything still hidden after this simply gets shown. A reveal that never
    // fires must never cost the visitor the content.
    const timer = setTimeout(() => nodes.forEach(show), fallbackMs);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      root.classList.remove("reveal-armed");
    };
  }, [fallbackMs]);
}
