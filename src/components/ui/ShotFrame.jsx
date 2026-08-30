import { useState } from "react";

/**
 * The project's real screenshot, framed as a browser window and linked to the
 * live site.
 *
 * This lives INSIDE the demo panels rather than under the prose: one project,
 * one panel. The screenshot is simply the first view of that panel — what the
 * site looks like — and the other tabs show what is behind it.
 */
export default function ShotFrame({ project, caption }) {
  const [failed, setFailed] = useState(false);
  const host = project.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

  return (
    <figure className="m-0">
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block overflow-hidden rounded-sm border border-border bg-card no-underline transition-colors duration-300 hover:border-accent"
      >
        <div className="flex items-center gap-2 border-b border-border px-3 py-2">
          <span aria-hidden className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-border-strong" />
            <span className="h-2 w-2 rounded-full bg-border-strong" />
            <span className="h-2 w-2 rounded-full bg-border-strong" />
          </span>
          <span className="ml-1 flex-1 truncate rounded-sm bg-base px-2.5 py-1 font-mono text-[10px] text-faint">
            {host}
          </span>
          <span className="font-mono text-[10px] whitespace-nowrap text-faint transition-colors duration-300 group-hover:text-accent">
            abrir ↗
          </span>
        </div>

        <div className="relative aspect-[16/10] overflow-hidden bg-surface">
          {failed ? (
            <div className="grid h-full w-full place-items-center">
              <span className="text-2xl font-semibold tracking-tight text-border-strong">
                {project.title}
              </span>
            </div>
          ) : (
            <img
              src={project.image}
              alt={`Vista del sitio ${project.title}`}
              loading="lazy"
              onError={() => setFailed(true)}
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-out-soft group-hover:scale-[1.02]"
            />
          )}
        </div>
      </a>

      {caption && (
        <figcaption className="mt-3 font-mono text-[11px] text-faint">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
