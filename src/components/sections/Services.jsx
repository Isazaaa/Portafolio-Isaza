import Reveal from "../ui/Reveal.jsx";
import { services } from "../../data/services.js";

/**
 * What Juan is hired for. Sits above the project list on purpose: a visitor
 * should know what is on offer before they start judging the evidence.
 */
export default function Services() {
  return (
    <section id="servicios" className="section-pad border-t border-border">
      <div className="container-page">
        <Reveal as="h2" className="label-mono mb-10">
          Qué hago
        </Reveal>

        <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.06}>
              <div className="h-px w-8 bg-accent" />
              <h3 className="mt-4 text-lg font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted text-pretty">
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
