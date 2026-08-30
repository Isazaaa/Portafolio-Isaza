import { layers } from "../../data/services.js";

/**
 * Hero.
 *
 * The headline states the offer and the panel beside it shows the four layers
 * of the work, stepped to the right one notch at a time. The shape of the
 * widget IS the claim: the sentence says "cada capa", the stack looks like
 * capas. Entrances are CSS keyframes, not Motion, so the first paint never
 * waits on hydration.
 */
export default function Hero() {
  return (
    <section id="inicio" className="container-page pt-24 pb-20 md:pt-32 md:pb-24">
      <p
        className="label-mono mb-7"
        style={{ animation: "rise-in 0.6s 0.05s both cubic-bezier(0.16,1,0.3,1)" }}
      >
        Desarrollador Full-Stack · Medellín, Colombia
      </p>

      {/* Short enough to run large: the measure is tight so it breaks into two
          balanced lines rather than one thin ribbon across the column. */}
      <h1
        className="max-w-[13ch] text-[clamp(2.8rem,7.6vw,5.8rem)] leading-[0.95] font-semibold tracking-[-0.035em] text-balance"
        style={{ animation: "wipe-in 0.9s 0.15s both cubic-bezier(0.16,1,0.3,1)" }}
      >
        De la idea al primer clic
      </h1>

      <div className="mt-12 grid items-end gap-10 md:mt-14 md:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] md:gap-12">
        <p
          className="max-w-[46ch] text-lg leading-relaxed text-muted text-pretty"
          style={{ animation: "rise-in 0.7s 0.5s both cubic-bezier(0.16,1,0.3,1)" }}
        >
          Portafolios y sitios a medida: diseño y desarrollo de punta a punta.
          Y cuando el proyecto pide más, sostengo plataformas con
          módulos, integraciones y datos en producción.
        </p>

        <div
          className="flex flex-col gap-1.5"
          style={{ animation: "rise-in 0.7s 0.65s both cubic-bezier(0.16,1,0.3,1)" }}
        >
          {layers.map((l, i) => (
            <div
              key={l.n}
              // Each layer steps one notch further right than the one above.
              // The step is applied from md up only (see .layer-step): on a
              // phone the column is already full-bleed and it would overflow.
              style={{ "--step": `${i * 8}px` }}
              className="layer-step grid grid-cols-[1.4rem_1fr_auto] items-center gap-3.5 rounded-sm border border-border-strong bg-surface px-3.5 py-2.5 transition-colors duration-300 hover:border-accent"
            >
              <span className="font-mono text-[11px] text-accent">{l.n}</span>
              <span className="text-sm font-medium">{l.name}</span>
              <span className="font-mono text-[11px] text-faint">{l.tools}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
