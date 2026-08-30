import Reveal from "../ui/Reveal.jsx";
import ProjectRow from "./ProjectRow.jsx";
import { projects } from "../../data/projects.js";

export default function Works() {
  return (
    <section id="trabajo" className="border-t border-border pt-[clamp(4.5rem,10vw,7rem)]">
      <div className="container-page">
        <Reveal className="flex items-baseline justify-between gap-5">
          <h2 className="label-mono">Trabajo</h2>
          <span className="font-mono text-xs text-faint">
            {projects.length} proyectos · en producción
          </span>
        </Reveal>

        {projects.map((p, i) => (
          <ProjectRow key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
