import { useState } from "react";
import Reveal from "./Reveal.jsx";

const FIELD =
  "w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-faint)] outline-none transition-colors duration-300 focus:border-[var(--color-accent)]";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wire this to your backend / Formspree / email service.
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contacto" className="section-pad">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Intro column */}
          <div className="lg:col-span-5">
            <Reveal as="span" className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[var(--color-accent)]" />
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--color-muted)]">
                Contacto
              </span>
            </Reveal>
            <Reveal
              as="h2"
              delay={0.05}
              className="text-balance text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-tight tracking-tight"
            >
              ¿Tenés un producto en mente?
            </Reveal>
            <Reveal
              as="p"
              delay={0.1}
              className="mt-5 max-w-sm text-base leading-relaxed text-[var(--color-muted)]"
            >
              Contame qué querés construir. Respondo personalmente y, si aplica,
              coordinamos una demo privada de los proyectos.
            </Reveal>

            <Reveal delay={0.15} className="mt-8 space-y-3">
              <a
                href="mailto:hola@tudominio.com"
                className="block text-sm text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent)]"
              >
                hola@tudominio.com
              </a>
              <div className="flex gap-4 pt-2 text-sm text-[var(--color-muted)]">
                <a href="#" className="transition-colors hover:text-[var(--color-accent)]">
                  GitHub
                </a>
                <a href="#" className="transition-colors hover:text-[var(--color-accent)]">
                  LinkedIn
                </a>
                <a href="#" className="transition-colors hover:text-[var(--color-accent)]">
                  X
                </a>
              </div>
            </Reveal>
          </div>

          {/* Form column */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/50 p-6 md:p-8"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-medium text-[var(--color-muted)]">
                    Nombre
                  </label>
                  <input className={FIELD} type="text" name="name" placeholder="Tu nombre" required />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium text-[var(--color-muted)]">
                    Email
                  </label>
                  <input className={FIELD} type="email" name="email" placeholder="tu@email.com" required />
                </div>
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-xs font-medium text-[var(--color-muted)]">
                  Asunto
                </label>
                <input className={FIELD} type="text" name="subject" placeholder="Proyecto / demo privada / consulta" />
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-xs font-medium text-[var(--color-muted)]">
                  Mensaje
                </label>
                <textarea
                  className={`${FIELD} min-h-32 resize-y`}
                  name="message"
                  placeholder="Contame sobre tu proyecto…"
                  required
                />
              </div>

              <button
                type="submit"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-sm font-semibold text-[#06120e] transition-transform duration-300 hover:-translate-y-0.5"
              >
                {sent ? "¡Mensaje enviado!" : "Enviar mensaje"}
                <span>→</span>
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
