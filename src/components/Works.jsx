import Reveal from "./Reveal.jsx";
import ProjectCard from "./ProjectCard.jsx";
import { projects } from "../data/projects.js";

export default function Works() {
  return (
    <section id="trabajos" className="section-pad">
      <div className="container-page">
        {/* Section heading */}
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal as="span" className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[var(--color-accent)]" />
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--color-muted)]">
                Trabajos seleccionados
              </span>
            </Reveal>
            <Reveal
              as="h2"
              delay={0.05}
              className="text-balance text-[clamp(2rem,5vw,3.4rem)] font-extrabold leading-tight tracking-tight"
            >
              Productos reales, en producción.
            </Reveal>
          </div>
          <Reveal
            as="p"
            delay={0.1}
            className="max-w-sm text-sm leading-relaxed text-[var(--color-muted)]"
          >
            Proyectos que van de plataformas educativas y marketplaces hasta
            portafolios audiovisuales — cada uno con su propio stack y personalidad.
          </Reveal>
        </div>

        {/* Uniform grid — three equal cards. Asymmetry lives in the entrance,
            not the size: each card reveals a beat after the previous one. */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-7">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.1} className="h-full">
              <ProjectCard project={project} className="h-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
