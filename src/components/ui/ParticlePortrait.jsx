import { useEffect, useRef, useState } from "react";

/**
 * Interactive particle portrait.
 *
 * A field of particles settles into a shape, scatters away from the pointer,
 * and morphs between shapes on click. Shapes come from two sources: the images
 * listed in IMAGES below, and text glyphs rendered offscreen.
 *
 * The image sampler is deliberately tolerant, so dropping a new picture into
 * IMAGES just works:
 *
 *  - COVER CROP. Non-square sources are centre-cropped instead of squashed,
 *    which keeps proportions honest and trims whatever sits in the far edges,
 *    watermarks included.
 *  - AUTO POLARITY. Weight is "how far this pixel is from the background", not
 *    "how dark it is". A dark subject on a light ground and a light subject on
 *    a dark ground both come out solid, instead of one of them vanishing.
 *  - NARROW RADIUS BAND. Weight maps to a band that starts at a visible size.
 *    Starting at zero makes light areas — a face — disappear and leaves a
 *    silhouette with a hole where the features belong.
 *
 * Design notes:
 *  - Particles draw in --color-accent, so the header's accent cycler reskins
 *    this too.
 *  - Points are sorted by angle around the centre before being handed to
 *    particles, so a morph reads as a rotation rather than a scramble.
 *  - The first painted frame is already the resting shape; the loop is an
 *    enhancement. If it never runs, morphs snap instead of animating.
 */

/**
 * Drop a file in /public and add a line here. Missing files are skipped.
 *
 * `grid` overrides the sampling resolution for that image, and it matters for
 * pixel art: sample off the artwork's native block grid and every cell straddles
 * two blocks, so the average lands between two colours and the result speckles.
 * Measured run lengths in avatar.png cluster around 13-15px on a 736px canvas,
 * which puts its native grid near 52.
 */
const IMAGES = [
  { src: "/avatar.png", name: "retrato", grid: 52 },
  { src: "/hollow.jpg", name: "hollow" },
];

const SIZE = 300; // logical canvas size, square
const GRID = 76; // sampling resolution
const COUNT = 2300; // particles
const POINTER_RADIUS = 74;
const PAD = SIZE * 0.06;
const SPAN = SIZE - PAD * 2;

const lumOf = (r, g, b) => (0.299 * r + 0.587 * g + 0.114 * b) / 255;

/** Sorting by angle keeps morphs from turning into a scramble. */
function sortRadially(pts) {
  return pts
    .map((p) => ({ ...p, a: Math.atan2(p.y - 0.5, p.x - 0.5) }))
    .sort((m, n) => m.a - n.a);
}

function shapeFromImage(img, grid = GRID) {
  const c = document.createElement("canvas");
  c.width = grid;
  c.height = grid;
  const ctx = c.getContext("2d", { willReadFrequently: true });

  // Centre crop to a square: never distort the subject, and drop what sits in
  // the far edges (watermarks, letterboxing).
  const side = Math.min(img.naturalWidth, img.naturalHeight);
  const sx = (img.naturalWidth - side) / 2;
  const sy = (img.naturalHeight - side) / 2;
  ctx.drawImage(img, sx, sy, side, side, 0, 0, grid, grid);

  const { data } = ctx.getImageData(0, 0, grid, grid);
  const bg = [data[0], data[1], data[2]];
  const bgLum = lumOf(bg[0], bg[1], bg[2]);

  // First pass: which pixels belong to the subject, and how bright are they?
  const fg = [];
  let lumSum = 0;
  for (let y = 0; y < grid; y++) {
    for (let x = 0; x < grid; x++) {
      const i = (y * grid + x) * 4;
      if (data[i + 3] < 40) continue;
      const dist =
        Math.abs(data[i] - bg[0]) +
        Math.abs(data[i + 1] - bg[1]) +
        Math.abs(data[i + 2] - bg[2]);
      if (dist < 56) continue;
      const lum = lumOf(data[i], data[i + 1], data[i + 2]);
      lumSum += lum;
      fg.push({ x: (x + 0.5) / grid, y: (y + 0.5) / grid, lum });
    }
  }
  if (!fg.length) return [];

  // Second pass: pick the direction. If the subject is brighter than its
  // background, bright pixels are the ink; otherwise the dark ones are.
  const subjectIsLight = lumSum / fg.length > bgLum;
  const STEPS = 4; // five levels of dot weight, like a print halftone
  return sortRadially(
    fg.map((p) => {
      const raw = subjectIsLight ? p.lum : 1 - p.lum;
      return { x: p.x, y: p.y, w: Math.round(raw * STEPS) / STEPS };
    }),
  );
}

function shapeFromText(text, weight, scale) {
  const c = document.createElement("canvas");
  c.width = GRID;
  c.height = GRID;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  ctx.clearRect(0, 0, GRID, GRID);
  ctx.fillStyle = "#000";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font =
    weight + " " + Math.round(GRID * scale) + 'px "Libre Franklin", system-ui, sans-serif';
  ctx.fillText(text, GRID / 2, GRID / 2 + GRID * 0.02);

  const { data } = ctx.getImageData(0, 0, GRID, GRID);
  const pts = [];
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      if (data[(y * GRID + x) * 4 + 3] > 90) {
        pts.push({ x: (x + 0.5) / GRID, y: (y + 0.5) / GRID, w: 0.62 });
      }
    }
  }
  return sortRadially(pts);
}

function shapeRing() {
  const pts = [];
  for (let i = 0; i < 300; i++) {
    const a = (i / 300) * Math.PI * 2;
    const r = 0.38 + (i % 3) * 0.018;
    pts.push({ x: 0.5 + Math.cos(a) * r, y: 0.5 + Math.sin(a) * r, w: 0.6 });
  }
  return sortRadially(pts);
}

/** Point a whole particle field at one shape. */
function retarget(particles, points) {
  const n = points.length;
  if (!n) return;
  for (let i = 0; i < particles.length; i++) {
    const q = points[Math.floor((i * n) / particles.length) % n];
    particles[i].tx = PAD + q.x * SPAN;
    particles[i].ty = PAD + q.y * SPAN;
    particles[i].tr = 0.95 + q.w * 1.35;
  }
}

/** Load an image, resolving to null instead of throwing when it is missing. */
function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

export default function ParticlePortrait({ className = "" }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    shapes: [],
    particles: [],
    pointer: { x: -999, y: -999 },
    raf: 0,
    // Stamped every animation frame. If it goes stale the loop is not actually
    // running — reduced motion, a background tab, a view that never composites
    // — and a morph has to paint itself instead of waiting for a frame.
    lastTick: 0,
    draw: null,
  });
  const [shapes, setShapes] = useState([]);
  const [shapeIndex, setShapeIndex] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const st = stateRef.current;
    let cancelled = false;

    const reduced = window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

    const accent = () => {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-accent")
        .trim();
      return v || "#357a3a";
    };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    st.particles = Array.from({ length: COUNT }, () => ({
      x: SIZE / 2,
      y: SIZE / 2,
      vx: 0,
      vy: 0,
      tx: SIZE / 2,
      ty: SIZE / 2,
      r: 1,
      tr: 1,
      // Per-particle stiffness gives the morph a little natural spread.
      k: 0.045 + Math.random() * 0.05,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.fillStyle = accent();
      for (const p of st.particles) {
        ctx.globalAlpha = Math.min(1, 0.34 + p.r * 0.42);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    st.draw = draw;

    const step = () => {
      st.lastTick = performance.now();
      const pointer = st.pointer;
      for (const p of st.particles) {
        p.vx += (p.tx - p.x) * p.k;
        p.vy += (p.ty - p.y) * p.k;

        // Push away from the pointer — the distortion that follows the mouse
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < POINTER_RADIUS * POINTER_RADIUS && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const f = (1 - d / POINTER_RADIUS) ** 2 * 6.5;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }

        p.vx *= 0.86;
        p.vy *= 0.86;
        p.x += p.vx;
        p.y += p.vy;
        p.r += (p.tr - p.r) * 0.12;
      }
      draw();
      st.raf = requestAnimationFrame(step);
    };

    Promise.all(IMAGES.map((entry) => loadImage(entry.src))).then((loaded) => {
      if (cancelled) return;

      const fromImages = loaded
        .map((img, i) =>
          img ? { name: IMAGES[i].name, points: shapeFromImage(img, IMAGES[i].grid) } : null,
        )
        .filter(Boolean);

      const built = [
        ...fromImages,
        { name: "JI", points: shapeFromText("JI", 800, 0.62) },
        { name: "</>", points: shapeFromText("</>", 700, 0.46) },
        { name: "anillo", points: shapeRing() },
      ].filter((s) => s.points.length > 20);

      st.shapes = built;
      setShapes(built);
      retarget(st.particles, built[0].points);

      // Settle instantly so the very first frame is already the shape.
      for (const p of st.particles) {
        p.x = p.tx;
        p.y = p.ty;
        p.r = p.tr;
      }
      draw();

      if (!reduced) st.raf = requestAnimationFrame(step);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(st.raf);
    };
  }, []);

  useEffect(() => {
    const st = stateRef.current;
    const shape = st.shapes[shapeIndex];
    if (!shape) return;

    retarget(st.particles, shape.points);

    // If the loop is not ticking, the spring will never run and the picture
    // would sit on the old shape while the button claims a new one. Snap and
    // repaint instead: no animation, but the control still works.
    if (performance.now() - st.lastTick > 250 && st.draw) {
      for (const p of st.particles) {
        p.x = p.tx;
        p.y = p.ty;
        p.r = p.tr;
        p.vx = 0;
        p.vy = 0;
      }
      st.draw();
    }
  }, [shapeIndex]);

  const move = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    stateRef.current.pointer = {
      x: ((e.clientX - rect.left) / rect.width) * SIZE,
      y: ((e.clientY - rect.top) / rect.height) * SIZE,
    };
  };

  const leave = () => {
    stateRef.current.pointer = { x: -999, y: -999 };
  };

  const nextShape = () => {
    if (shapes.length) setShapeIndex((i) => (i + 1) % shapes.length);
  };

  const current = shapes[shapeIndex];

  return (
    <div className={className}>
      <button
        type="button"
        onPointerMove={move}
        onPointerLeave={leave}
        onClick={nextShape}
        aria-label={
          "Retrato de partículas interactivo. Clic para cambiar de figura." +
          (current ? " Figura actual: " + current.name + "." : "")
        }
        className="block w-full max-w-[300px] overflow-hidden rounded border border-border bg-surface p-0 transition-colors duration-300 hover:border-accent"
      >
        <canvas ref={canvasRef} className="block h-auto w-full" style={{ aspectRatio: "1 / 1" }} />
      </button>

    </div>
  );
}
