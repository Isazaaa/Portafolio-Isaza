export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col justify-between gap-3 py-6 font-mono text-[11px] text-faint sm:flex-row">
        <span>© {new Date().getFullYear()} Juan Isaza · Desarrollador Full-Stack</span>
        <span className="flex items-center gap-2">
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-accent"
            style={{ animation: "blink-soft 2.4s infinite" }}
          />
          disponible para proyectos
        </span>
      </div>
    </footer>
  );
}
