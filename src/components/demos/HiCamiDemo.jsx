import ShotFrame from "../ui/ShotFrame.jsx";

/**
 * HiCami panel — the screenshot, and nothing else.
 *
 * This is the project that shows what Juan is hired for, and the site itself
 * is the argument: a visual portfolio judged on how it looks. Abstracting it
 * into a widget would hide the very thing a client wants to see.
 */
export default function HiCamiDemo({ project }) {
  return (
    <div className="rounded border border-border-strong bg-surface p-4">
      <ShotFrame project={project} />

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.filters
          .filter((f) => f !== "Todo")
          .map((f) => (
            <span
              key={f}
              className="rounded-full border border-border px-3 py-1.5 font-mono text-[11px] text-faint"
            >
              {f}
            </span>
          ))}
      </div>

      <p className="mt-3 font-mono text-[11px] leading-relaxed text-faint">
        // galería filtrable por categoría, video integrado y una tira donde
        cada pieza conserva su formato
      </p>
    </div>
  );
}
