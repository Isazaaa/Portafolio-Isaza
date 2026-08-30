// Runtime accent theming. The whole palette hangs off --color-accent, so
// overriding it on :root (inline style beats the stylesheet) re-skins the site.
//
// Every option is authored at the same OKLCH lightness and chroma as the
// default, so each one sits on the paper ground with identical weight — only
// the hue changes. That is what keeps the cycler from breaking the design.

export const ACCENTS = [
  { name: "verde", hex: "oklch(0.52 0.12 145)", soft: "oklch(0.94 0.035 145)" },
  { name: "azul", hex: "oklch(0.52 0.12 250)", soft: "oklch(0.94 0.035 250)" },
  { name: "terracota", hex: "oklch(0.55 0.13 40)", soft: "oklch(0.94 0.035 40)" },
  { name: "vino", hex: "oklch(0.50 0.12 15)", soft: "oklch(0.94 0.035 15)" },
];

const KEY = "portafolio-accent-index";

export function applyAccent(index) {
  const a = ACCENTS[index] ?? ACCENTS[0];
  const root = document.documentElement;
  root.style.setProperty("--color-accent", a.hex);
  root.style.setProperty("--color-accent-soft", a.soft);
}

export function getStoredIndex() {
  if (typeof window === "undefined") return 0;
  try {
    const raw = Number(window.localStorage.getItem(KEY));
    return Number.isInteger(raw) && raw >= 0 && raw < ACCENTS.length ? raw : 0;
  } catch {
    // Private browsing / blocked storage — fall back to the default accent.
    return 0;
  }
}

export function storeIndex(i) {
  try {
    window.localStorage.setItem(KEY, String(i));
  } catch {
    /* non-fatal: the accent still applies for this session */
  }
}
