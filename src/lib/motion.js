// Centralized motion language. Keep durations 0.3s–0.5s, ease-out / anticipate
// so interactions feel fast and organic, never heavy.

export const EASE = [0.22, 1, 0.36, 1]; // soft ease-out
export const ANTICIPATE = [0.7, -0.4, 0.4, 1.4];

// Container that staggers its children for asymmetric, sequential entrances.
export const stagger = (gap = 0.12, delay = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: gap, delayChildren: delay },
  },
});

// Slide up + blur-in reveal — the signature entrance.
export const blurUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(12px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE },
  },
};

// Text-mask reveal: child slides up from behind an overflow-hidden parent.
export const maskRise = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 0.7, ease: EASE },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
};

// Shared viewport config so reveals trigger slightly before fully in view.
export const inView = { once: true, margin: "-12% 0px -12% 0px" };
