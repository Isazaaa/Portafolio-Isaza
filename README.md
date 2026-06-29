# Portafolio — Full-Stack & UI/UX

Single-page portfolio. **Vite + React 19 + Tailwind CSS v4 + Motion** (Framer Motion).

## Arranque

```bash
npm install
npm run dev
```

Abre la URL que imprime Vite (por defecto http://localhost:5173).

## Estructura

```
src/
  App.jsx                 # Layout principal y orden de secciones
  index.css               # Tokens de diseño (@theme) + utilidades
  lib/motion.js           # Lenguaje de animación centralizado (variants, ease)
  data/projects.js        # Datos de los 3 proyectos
  components/
    Header.jsx            # Nav fija, glass al hacer scroll, sección activa
    Hero.jsx              # Título con máscara de texto + blur-in
    Reveal.jsx            # Wrapper reutilizable para scroll-reveals
    ProjectCard.jsx       # Tarjeta premium: hover elevación/escala/glow, zoom imagen
    Works.jsx             # Grid asimétrico de proyectos
    About.jsx             # Bloque asimétrico foto + bio
    Contact.jsx           # Formulario minimalista
    Footer.jsx
```

## Personalización rápida

- **Color de acento:** cambia `--color-accent` en `src/index.css` (`@theme`). Re-skinea todo el sitio.
- **Proyectos:** edita `src/data/projects.js`.
- **Capturas:** coloca imágenes en `public/projects/` (ej. `merkahorro.png`) y apunta `image` ahí. Sin imagen, se muestra un placeholder con marca.
- **Foto de perfil:** `public/profile.jpg`.
- **Formulario:** `Contact.jsx` tiene un `handleSubmit` listo para conectar a tu backend / Formspree / servicio de email.

## Accesibilidad

Respeta `prefers-reduced-motion`: si el usuario pide menos movimiento, las animaciones se desactivan.
