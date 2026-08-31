import Reveal from "../ui/Reveal.jsx";
import { contact } from "../../data/services.js";

/**
 * Contacto.
 *
 * The last thing a visitor reads, and the plainest block on the site. The dot
 * field behind it is the one echo of the particle portrait: texture, not a
 * second figure, so it belongs to the same family without repeating the moment
 * that makes "sobre mí" work. It drifts in from the right, where the layout is
 * empty anyway, and never gets dense enough to sit under the text.
 */
export default function Contact() {
  return (
    <section
      id="contacto"
      className="section-pad relative overflow-hidden border-t border-border"
    >
      <div aria-hidden className="dot-field pointer-events-none absolute inset-0" />

      <div className="container-page relative">
        <Reveal as="h2" className="label-mono mb-8">
          Contacto
        </Reveal>

        <Reveal
          as="p"
          delay={0.05}
          className="max-w-[20ch] text-[clamp(1.75rem,4vw,2.9rem)] leading-[1.15] font-semibold tracking-[-0.03em] text-balance"
        >
          ¿Tienes algo en mente? Escríbeme y lo hablamos.
        </Reveal>

        <Reveal delay={0.1} className="mt-9 flex flex-wrap gap-2.5">
          <a
            href={`mailto:${contact.email}`}
            className="rounded-sm border border-deep bg-deep px-5 py-3.5 font-mono text-sm text-base no-underline transition-all duration-250 hover:-translate-y-0.5 hover:border-accent hover:bg-accent"
          >
            {contact.email}
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm border border-border-strong px-5 py-3.5 font-mono text-sm no-underline transition-all duration-250 hover:-translate-y-0.5 hover:border-accent"
          >
            GitHub ↗
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm border border-border-strong px-5 py-3.5 font-mono text-sm no-underline transition-all duration-250 hover:-translate-y-0.5 hover:border-accent"
          >
            LinkedIn ↗
          </a>
        </Reveal>
      </div>
    </section>
  );
}
