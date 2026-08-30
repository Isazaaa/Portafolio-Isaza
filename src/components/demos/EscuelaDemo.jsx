import { useState } from "react";
import Tabs from "../ui/Tabs.jsx";
import ShotFrame from "../ui/ShotFrame.jsx";

const TABS = [
  { id: "vista", label: "El sitio" },
  { id: "plataforma", label: "Plataforma" },
];

/**
 * Escuela de la Riqueza demo.
 *
 * "El sitio" is the real screenshot. "Plataforma" is the engineering argument — a learning path looks simple from
 * outside; this is the payments, streaming, community and self-service admin
 * holding it up.
 */
export default function EscuelaDemo({ project }) {
  const [tab, setTab] = useState("vista");

  return (
    <div className="overflow-hidden rounded border border-border-strong bg-surface">
      <Tabs options={TABS} value={tab} onChange={setTab} label="Vistas del proyecto" />

      <div className="min-h-[19rem] p-5">
        {tab === "vista" && (
          <div>
            <p className="mb-3 font-mono text-[11px] text-faint">
              // aprender · practicar · transformar
            </p>
            <ShotFrame project={project} caption="planes free · individual · vip" />
          </div>
        )}

        {tab === "plataforma" && (
          <div>
            <p className="mb-3.5 font-mono text-[11px] text-faint">
              // lo que sostiene la escuela
            </p>
            <div className="grid gap-1.5 sm:grid-cols-2">
              {project.plataforma.map((p, i) => (
                <div
                  key={p.t}
                  style={{
                    animation: `rise-in 0.4s ${i * 0.04}s both cubic-bezier(0.16,1,0.3,1)`,
                  }}
                  className="rounded-sm border border-border bg-card p-3.5"
                >
                  <div className="font-mono text-[11px] text-accent">{p.t}</div>
                  <div className="mt-1.5 text-[12px] leading-snug text-muted">{p.s}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
