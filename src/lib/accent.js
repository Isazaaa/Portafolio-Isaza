// Runtime accent theming. The whole palette hangs off --color-accent, so
// overriding it on :root (inline style beats the stylesheet) re-skins the site.

export const ACCENTS = [
  { name: "menta", hex: "#4ef0c0" },
  { name: "azul eléctrico", hex: "#5aa9ff" },
  { name: "cian", hex: "#22d3ee" },
  { name: "violeta", hex: "#c08bff" },
];

const KEY = "portafolio-accent-index";

export function applyAccent(hex) {
  const root = document.documentElement;
  root.style.setProperty("--color-accent", hex);
  root.style.setProperty("--color-accent-soft", `${hex}1a`); // 1a = ~10% alpha
}

export function getStoredIndex() {
  if (typeof window === "undefined") return 0;
  const raw = Number(window.localStorage.getItem(KEY));
  return Number.isInteger(raw) && raw >= 0 && raw < ACCENTS.length ? raw : 0;
}

export function storeIndex(i) {
  window.localStorage.setItem(KEY, String(i));
}
