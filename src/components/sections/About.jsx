import Reveal from "../ui/Reveal.jsx";
import ParticlePortrait from "../ui/ParticlePortrait.jsx";
import { stackAll } from "../../data/services.js";

/**
 * Sobre mí. Sits after the work on purpose: the projects already introduced
 * him, so this section only has to introduce the person. No method, no
 * numbered principles — those belong in a conversation, not on a wall.
 */
export default function About() {
  return (
    <section id="sobre-mi" className="section-pad">
      <div className="container-page">
        <Reveal as="h2" className="label-mono mb-11">
          Sobre mí
        </Reveal>

        <div className="grid gap-10 md:grid-cols-12 md:gap-14">
          <Reveal className="md:col-span-5">
            <ParticlePortrait />

            <p className="mt-8 max-w-[18ch] text-[clamp(1.6rem,3.2vw,2.3rem)] leading-[1.2] font-semibold tracking-[-0.025em] text-balance">
              Soy Juan Manuel Isaza
            </p>
          </Reveal>

          <div className="flex flex-col gap-6 md:col-span-7">
            <Reveal
              as="p"
              delay={0.06}
              className="max-w-[52ch] text-base leading-relaxed text-muted text-pretty"
            >
              Me gusta crear experiencias web con diseños a la medida y
              convertir tus ideas en algo que valga la pena mostrar.
            </Reveal>

            <Reveal
              as="p"
              delay={0.1}
              className="max-w-[52ch] text-base leading-relaxed text-muted text-pretty"
            >
              Disfruto trabajar en cada capa de una aplicación: diseñar la
              interfaz, construir lo que hay detrás y asegurarme de que todo
              funcione rápido. Es la parte del trabajo con la que se me va la
              tarde sin darme cuenta.
            </Reveal>

            {/* The closing line is the point of the section, so it gets the
                weight of a statement instead of a third paragraph. */}
            <Reveal
              as="p"
              delay={0.14}
              className="max-w-[34ch] border-l-2 border-accent pl-4 text-[clamp(1.05rem,1.7vw,1.25rem)] leading-snug font-semibold tracking-[-0.015em] text-ink text-balance"
            >
              Pero lo que más me importa es que la persona para la que lo hago
              quede contenta con el resultado.
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.08} className="mt-14 border-t border-border pt-10">
          <p className="label-mono mb-4">Stack tecnológico</p>
          <div className="flex flex-wrap gap-1.5">
            {stackAll.map((t) => (
              <span
                key={t}
                className="rounded-sm border border-border-strong px-3 py-2 font-mono text-xs text-muted transition-colors duration-250 hover:border-accent hover:text-accent"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
