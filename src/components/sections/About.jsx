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
              Empecé haciendo sitios para que otros mostraran su trabajo.
              Terminé sosteniendo la plataforma interna de una cadena de
              supermercados: decenas de módulos, un ERP detrás y gente entrando
              todos los días.
            </Reveal>

            <Reveal
              as="p"
              delay={0.1}
              className="max-w-[52ch] text-base leading-relaxed text-muted text-pretty"
            >
              Esa plataforma me enseñó a construir cosas que aguantan. Los
              portafolios me enseñaron a que se vean bien.
            </Reveal>

            {/* The closing line is the point of the section, so it gets the
                weight of a statement instead of a third paragraph. */}
            <Reveal
              as="p"
              delay={0.14}
              className="max-w-[24ch] border-l-2 border-accent pl-4 text-[clamp(1.1rem,1.9vw,1.35rem)] leading-snug font-semibold tracking-[-0.015em] text-ink text-balance"
            >
              Trato de no soltar ninguna de las dos.
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
