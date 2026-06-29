import { useState } from "react";
import { motion } from "motion/react";
import { EASE } from "../lib/motion.js";

// Cover image with graceful fallback. Full-page screenshots read best when
// anchored to the top of a fixed-ratio viewport (that's where each site's hero is).
function CoverImage({ src, title, tint, hovered }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className="grid h-full w-full place-items-center"
        style={{
          background: `radial-gradient(120% 120% at 50% 0%, ${tint}1f 0%, transparent 60%), var(--color-surface-2)`,
        }}
      >
        <span
          className="text-4xl font-extrabold tracking-tight opacity-20"
          style={{ color: tint }}
        >
          {title}
        </span>
      </div>
    );
  }

  return (
    <motion.img
      src={src}
      alt={`Vista del sitio ${title}`}
      loading="lazy"
      onError={() => setFailed(true)}
      animate={{ scale: hovered ? 1.05 : 1, y: hovered ? "-4%" : "0%" }}
      transition={{ duration: 0.6, ease: EASE }}
      className="h-full w-full object-cover object-top"
    />
  );
}

export default function ProjectCard({ project, className = "" }) {
  const [hovered, setHovered] = useState(false);
  const tint = project.accentTint ?? "var(--color-accent)";

  // Pretty host for the fake browser url bar.
  let host = project.url ?? "";
  try {
    host = new URL(project.url).host.replace(/^www\./, "");
  } catch {
    /* keep raw value if not a valid URL */
  }

  return (
    <motion.article
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: EASE }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] ${className}`}
      style={{
        boxShadow: hovered
          ? `0 24px 60px -24px ${tint}55, 0 0 0 1px ${tint}66 inset`
          : "0 0 0 1px transparent inset",
        transition: "box-shadow 0.4s var(--ease-out-soft)",
      }}
    >
      {/* Cover framed as a browser window — makes full-page captures read as polished site previews */}
      <div className="p-3 pb-0">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)]"
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-3 py-2">
            <span className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[var(--color-border)]" />
              <span className="h-2 w-2 rounded-full bg-[var(--color-border)]" />
              <span className="h-2 w-2 rounded-full bg-[var(--color-border)]" />
            </span>
            <span className="ml-1 flex-1 truncate rounded-md bg-[var(--color-base)] px-2.5 py-1 text-[10px] text-[var(--color-faint)]">
              {host}
            </span>
          </div>

          {/* Screenshot viewport — identical ratio across every card */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <CoverImage src={project.image} title={project.title} tint={tint} hovered={hovered} />

            {/* Hover overlay with live CTA */}
            <motion.div
              initial={false}
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="pointer-events-none absolute inset-0 flex items-end justify-end bg-gradient-to-t from-[var(--color-base)]/75 via-transparent to-transparent p-3"
            >
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-[#06120e]"
                style={{ background: tint }}
              >
                Visitar sitio →
              </span>
            </motion.div>
          </div>
        </a>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-faint)]">
            {project.type}
          </span>
          <span className="text-xs text-[var(--color-faint)]">{project.year}</span>
        </div>

        <h3 className="mt-3 text-xl font-bold tracking-tight text-[var(--color-ink)]">
          {project.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
          {project.summary}
        </p>

        {/* Tags */}
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-1 text-xs text-[var(--color-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA — pinned to the bottom so every card aligns identically */}
        <div className="mt-auto pt-7">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/cta inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
            style={{ color: tint }}
          >
            Visitar sitio
            <span className="transition-transform duration-300 group-hover/cta:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}
