export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="container-page flex flex-col items-center justify-between gap-4 py-8 text-sm text-[var(--color-faint)] sm:flex-row">
        <span>© {new Date().getFullYear()} — Desarrollador Full-Stack & UI/UX</span>

      </div>
    </footer>
  );
}
