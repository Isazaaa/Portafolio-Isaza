import { layers } from "../../data/services.js";

/**
 * Hero.
 *
 * Two columns from the headline down. The left one carries the argument —
 * headline, offer, and where to go next. The right one carries the proof: the
 * four layers of the work, stepped one notch at a time so the shape of the
 * widget IS the claim, and a one-line note that something of it is live.
 *
 * Entrances are CSS keyframes, not JS, so the first paint never waits on
 * hydration.
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

      <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] md:items-center md:gap-14">
        {/* Argument */}
        <div>
          {/* Short enough to run large: the measure is tight so it breaks into
              two balanced lines rather than one thin ribbon across the column. */}
          <h1
            className="max-w-[13ch] text-[clamp(2.8rem,7.6vw,5.8rem)] leading-[0.95] font-semibold tracking-[-0.035em] text-balance"
            style={{ animation: "wipe-in 0.9s 0.15s both cubic-bezier(0.16,1,0.3,1)" }}
          >
            De la idea al primer clic
          </h1>

          <p
            className="mt-8 max-w-[46ch] text-lg leading-relaxed text-muted text-pretty"
            style={{ animation: "rise-in 0.7s 0.5s both cubic-bezier(0.16,1,0.3,1)" }}
          >
            Portafolios y sitios a medida: diseño y desarrollo de punta a punta.
            Y cuando el proyecto pide más, sostengo plataformas con módulos,
            integraciones y datos en producción.
          </p>

          <div
            className="mt-9 flex flex-wrap gap-2.5"
            style={{ animation: "rise-in 0.7s 0.62s both cubic-bezier(0.16,1,0.3,1)" }}
          >
            <a
              href="#trabajo"
              className="rounded-sm border border-deep bg-deep px-5 py-3.5 font-mono text-sm text-base no-underline transition-all duration-250 hover:-translate-y-0.5 hover:border-accent hover:bg-accent"
            >
              Ver los trabajos
            </a>
            <a
              href="#contacto"
              className="rounded-sm border border-border-strong px-5 py-3.5 font-mono text-sm no-underline transition-all duration-250 hover:-translate-y-0.5 hover:border-accent"
            >
              Hablemos
            </a>
          </div>
        </div>

        {/* Proof */}
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

          {/* A teaser, not a list. Naming the three sites here would spend the
              reveal that the Trabajo section is built around: by the time a
              visitor got down there, the domains would already be old news. */}
          <div className="mt-7 border-t border-border pt-5">
           
           
          </div>
        </div>
      </div>
    </section>
  );
}
