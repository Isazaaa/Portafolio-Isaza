/**
 * Segmented control used by the project demos. Kept deliberately plain: the
 * demos below it are the interesting part, so the switch itself stays quiet.
 */
export default function Tabs({ options, value, onChange, label }) {
  return (
    <div role="tablist" aria-label={label} className="flex border-b border-border">
      {options.map((opt) => {
        const active = opt.id === value;
        return (
          <button
            key={opt.id}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(opt.id)}
            className={`flex-1 border-r border-border px-4 py-3 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors duration-300 last:border-r-0 ${
              active
                ? "bg-deep text-base"
                : "text-faint hover:bg-surface hover:text-ink"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
