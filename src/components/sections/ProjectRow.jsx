import Reveal from "../ui/Reveal.jsx";
import HiCamiDemo from "../demos/HiCamiDemo.jsx";
import MerkahorroDemo from "../demos/MerkahorroDemo.jsx";
import EscuelaDemo from "../demos/EscuelaDemo.jsx";

const DEMOS = {
  hicami: HiCamiDemo,
  merkahorro: MerkahorroDemo,
  escuela: EscuelaDemo,
};

/**
 * One project: the written case on the left, the panel on the right.
 *
 * The screenshot lives inside that panel as its first view rather than under
 * the prose — one project, one visual anchor. Stacking a screenshot AND a
 * separate widget made every row say the same thing twice.
 */
export default function ProjectRow({ project, index }) {
  const Demo = DEMOS[project.demo];

  return (
    <article className="border-b border-border py-14 md:py-16">
      <div className="grid gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] md:gap-14">
        <Reveal>
          <div className="mb-4 flex items-baseline gap-3.5">
            <span className="font-mono text-xs text-accent tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-mono text-xs text-faint">
              {project.year} · {project.type.toLowerCase()}
            </span>
          </div>

          <h3 className="text-[clamp(1.8rem,3.4vw,2.4rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
            {project.title}
          </h3>

          <p className="mt-4 max-w-[44ch] text-[15px] leading-relaxed text-muted text-pretty">
            {project.summary}
          </p>

          <p className="mt-3.5 max-w-[44ch] border-l-2 border-accent pl-3.5 text-[14px] leading-relaxed text-faint italic">
            {project.note}
          </p>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.stack.map((t) => (
              <span
                key={t}
                className="rounded-sm border border-border-strong px-2.5 py-1 font-mono text-[11px] text-muted"
              >
                {t}
              </span>
            ))}
          </div>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-block font-mono text-xs tracking-[0.04em]"
          >
            visitar el sitio ↗
          </a>
        </Reveal>

        <Reveal delay={0.08}>{Demo ? <Demo project={project} /> : null}</Reveal>
      </div>
    </article>
  );
}
