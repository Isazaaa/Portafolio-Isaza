import Reveal from "./Reveal.jsx";
import { motion } from "motion/react";
import { EASE } from "../lib/motion.js";

const FOCUS = [
  { label: "Rendimiento real", desc: "Cada request, cada frame cuenta" },
  { label: "UX sin fricción", desc: "Si no se siente natural, no está listo" },
  { label: "Mejora continua", desc: "Cada proyecto me enseña algo nuevo" },
];

export default function About() {
  return (
    <section id="sobre-mi" className="section-pad">
      <div className="container-page">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Asymmetric portrait column */}
          <Reveal className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-[var(--color-accent)] opacity-[0.06] blur-2xl" />
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-2)]"
              >
                {/* Replace with a real photo: /public/profile.jpg */}
                <img
                  src="/profile.jpg"
                  alt="Foto de perfil"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  className="h-full w-full object-cover"
                />
                <div className="grid h-full w-full place-items-center bg-[radial-gradient(120%_120%_at_50%_0%,var(--color-accent-soft)_0%,transparent_55%)]">
                  <span className="text-7xl font-extrabold tracking-tight text-[var(--color-faint)] opacity-30">
                    YO
                  </span>
                </div>
              </motion.div>
            </div>
          </Reveal>

          {/* Bio column */}
          <div className="lg:col-span-7">
            <Reveal as="span" className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[var(--color-accent)]" />
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--color-muted)]">
                Sobre mí
              </span>
            </Reveal>

            <Reveal
              as="h2"
              delay={0.05}
              className="text-balance text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-tight tracking-tight"
            >
              Construyo software que se siente{" "}
              <span className="text-[var(--color-accent)]">rápido, claro y vivo.</span>
            </Reveal>

            <Reveal
              as="p"
              delay={0.1}
              className="mt-6 max-w-xl text-base leading-relaxed text-ink"
            >
              Soy desarrollador Full-Stack con poco más de un año construyendo
              aplicaciones web completas. Este portfolio es mi tercer proyecto
              real — y lo hice desde cero, con React, Node y mucho aprendizaje
              en el camino. Lo que me falta de experiencia lo compenso con
              obsesión por los detalles: priorizo el rendimiento, la claridad
              del código y que cada interacción se sienta pensada para quien la
              usa.
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
              {FOCUS.map((f, i) => (
                <Reveal key={f.label} delay={0.12 + i * 0.06}>
                  <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] p-4">
                    <div className="text-sm font-semibold text-[var(--color-ink)]">
                      {f.label}
                    </div>
                    <div className="mt-1 text-xs text-[var(--color-muted)]">{f.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
