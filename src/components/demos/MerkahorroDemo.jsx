import { useState } from "react";
import Tabs from "../ui/Tabs.jsx";
import ShotFrame from "../ui/ShotFrame.jsx";

/**
 * Merkahorro demo.
 *
 * Three tabs, one per face. "Cara pública" IS the website, so it shows the
 * real screenshot; the other two describe what a screenshot cannot — an
 * intranet of 38 modules feeding off an ERP. The counter strip sits above all
 * three so the numbers arrive before the reading.
 */
export default function MerkahorroDemo({ project }) {
  const [face, setFace] = useState("publica");
  const { publica, interna, datos } = project.faces;

  const tabs = [
    { id: "publica", label: publica.label },
    { id: "interna", label: interna.label },
    { id: "datos", label: datos.label },
  ];

  return (
    <div className="overflow-hidden rounded border border-border-strong bg-surface">
      <Tabs
        options={tabs}
        value={face}
        onChange={setFace}
        label="Caras de la plataforma"
      />

      {/* Scale strip — the numbers do the arguing */}
      <div className="grid grid-cols-3 border-b border-border">
        {project.scale.map((s) => (
          <div key={s.v} className="border-r border-border px-4 py-3 last:border-r-0">
            <div className="font-mono text-lg leading-none font-medium text-accent tabular-nums">
              {s.k}
            </div>
            <div className="mt-1 font-mono text-[10px] text-faint">{s.v}</div>
          </div>
        ))}
      </div>

      <div className="min-h-[19rem] p-5">
        {face === "publica" && (
          <div>
            <p className="mb-3 font-mono text-[11px] text-faint">{publica.hint}</p>
            <ShotFrame
              project={project}
              caption={publica.items.map((it) => it.t.toLowerCase()).join(" · ")}
            />
          </div>
        )}

        {face === "interna" && (
          <div>
            <p className="mb-3.5 font-mono text-[11px] text-faint">{interna.hint}</p>
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
              {interna.modules.map((m, i) => (
                <div
                  key={m}
                  style={{
                    animation: `rise-in 0.4s ${i * 0.03}s both cubic-bezier(0.16,1,0.3,1)`,
                  }}
                  className="rounded-sm border border-border bg-card px-2.5 py-3 text-center text-xs leading-tight text-muted"
                >
                  {m}
                </div>
              ))}
            </div>
            <p className="mt-3.5 font-mono text-[11px] leading-relaxed text-faint">
              {interna.foot}
            </p>
            <p className="mt-1 font-mono text-[11px] text-faint">
              // y 26 módulos más
            </p>
          </div>
        )}

        {face === "datos" && (
          <div>
            <p className="mb-3 font-mono text-[11px] text-faint">{datos.hint}</p>
            <div className="flex flex-col gap-2.5">
              {datos.items.map((it, i) => (
                <div
                  key={it.t}
                  style={{
                    animation: `rise-in 0.45s ${i * 0.06}s both cubic-bezier(0.16,1,0.3,1)`,
                  }}
                  className="grid grid-cols-[auto_1fr] items-baseline gap-3 rounded-sm border border-border bg-card p-4"
                >
                  <span className="font-mono text-[11px] whitespace-nowrap text-accent">
                    {it.t}
                  </span>
                  <span className="text-[13px] leading-snug text-muted">{it.s}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
