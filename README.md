# Portafolio — Juan Isaza

Portafolio personal de un desarrollador Full-Stack. Página única, en español,
construida alrededor de una idea: **cada proyecto se muestra con un panel
interactivo propio en vez de una tarjeta genérica**, porque una captura no puede
explicar que detrás de un sitio hay 38 módulos internos y 19 servicios.

🔗 **En vivo:** _(pendiente de despliegue — agregar la URL aquí)_

<!-- Cuando tengas una captura del sitio, guardala en docs/preview.webp y
     descomentá la línea siguiente:
![Vista del portafolio](docs/preview.webp)
-->

---

## Stack

| Capa | Herramienta |
|---|---|
| Build | Vite 6 |
| UI | React 19 |
| Estilos | Tailwind CSS 4 (`@theme`, tokens en OKLCH) |
| Tipografía | Libre Franklin + JetBrains Mono (Google Fonts) |
| Animación | CSS + Canvas 2D — sin librería |

> `motion` sigue declarado en `package.json` pero **ya no se usa**: toda la
> animación es CSS y canvas. Se puede quitar con `npm uninstall motion`.

## Arranque

```bash
npm install
npm run dev
```

Vite imprime la URL (por defecto `http://localhost:5173`).

```bash
npm run build     # build de producción a dist/
npm run preview   # sirve el build local
```

---

## Estructura

```
public/
  avatar.png              # Fuente del retrato de partículas
  hollow.jpg              # Segunda figura del retrato
  favicon.svg             # Monograma JI en el acento del sitio
  projects/*.webp         # Capturas de los proyectos

src/
  App.jsx                 # Orden de secciones
  index.css               # Tokens @theme, utilidades, reveals, reduced-motion

  data/
    projects.js           # Los 3 proyectos: copy, stack, y datos de cada demo
    services.js           # Servicios, capas del hero, stack y contacto

  lib/
    accent.js             # Ciclador de acento, persistido en localStorage
    useScrollReveal.js    # Reveals de scroll para toda la página

  components/
    sections/             # Header, Hero, About, Services, Works, ProjectRow,
                          # Contact, Footer
    demos/                # Un panel interactivo por proyecto
    ui/                   # Reveal, ShotFrame, Tabs, ParticlePortrait
```

---

## Personalización

### Contenido

| Qué | Dónde |
|---|---|
| Proyectos, copy y datos de las demos | `src/data/projects.js` |
| Servicios, capas del hero, stack, contacto | `src/data/services.js` |
| Textos del hero y del "sobre mí" | `sections/Hero.jsx`, `sections/About.jsx` |

Cada proyecto declara un `demo` que apunta al panel que se renderiza a su lado
(`hicami`, `merkahorro`, `escuela`). El mapeo vive en `sections/ProjectRow.jsx`.

### Color de acento

Todo el sitio cuelga de `--color-accent`. Las opciones están en
`src/lib/accent.js` y el valor por defecto en el bloque `@theme` de
`src/index.css`. El punto verde del header las cicla y guarda la elección.

Están todas escritas con la misma claridad y croma en OKLCH, solo cambia el
matiz — por eso ninguna desequilibra el diseño.

### Figuras del retrato de partículas

Poné la imagen en `public/` y agregá una línea en `IMAGES`, arriba de
`ui/ParticlePortrait.jsx`:

```js
const IMAGES = [
  { src: "/avatar.png", name: "retrato", grid: 52 },
  { src: "/hollow.jpg", name: "hollow" },
];
```

`grid` es opcional y solo importa para pixel art: si la resolución de muestreo
no coincide con la grilla nativa del dibujo, cada celda cae entre dos bloques y
el resultado sale con ruido.

### Capturas de proyectos

Van en `public/projects/` como WebP a 1400px:

```bash
ffmpeg -i captura.png -vf scale=1400:-2 -c:v libwebp -quality 80 captura.webp
```

---

## Decisiones que no son obvias

Cosas que parecen arbitrarias y no lo son. Cambiar cualquiera de estas rompe algo:

- **`overflow-x: clip` en `body`, no `hidden`.** `hidden` convierte al body en
  contenedor de scroll: desincroniza `window.scrollTo` y rompe `position: sticky`.

- **Los reveals se arman desde JavaScript, no desde CSS.** El estado oculto se
  aplica solo después de confirmar que el `IntersectionObserver` existe, con un
  temporizador de respaldo. Sin eso, un observer que no dispara deja la página
  entera en blanco.

- **`--color-accent` no se registra con `@property` ni se transiciona.** Esa
  combinación deja el valor *computado* clavado en el color inicial: React
  actualiza, el inline style actualiza, y en pantalla no cambia nada. Los
  colores se transicionan en los elementos que los consumen.

- **No hay barra de progreso.** El nav *es* el indicador: cada ítem se dimensiona
  según la proporción real que ocupa esa sección en el documento, y el activo se
  llena mientras se lee. La sección activa se detecta como "la última que empieza
  por encima de la línea de lectura", porque el documento se acaba antes de que
  la última pueda cruzarla.

- **El favicon es un SVG sin comentarios XML.** Un comentario con dos guiones
  seguidos (`--`) invalida el XML y el navegador se niega a renderizarlo.

---

## Accesibilidad

- Respeta `prefers-reduced-motion` a nivel de sistema operativo.
- El contenido nunca depende de que una animación se ejecute: si nada corre,
  la página se lee completa.
- Foco visible en todo elemento interactivo.
- Contraste WCAG AA en los tres niveles de texto sobre el fondo de papel.
- El retrato de partículas es un botón con etiqueta, operable por teclado.

## Rendimiento

| | |
|---|---|
| JS | ~222 KB (~70 KB gzip) |
| CSS | ~22 KB (~5 KB gzip) |
| Capturas de proyectos | 89 KB las tres (WebP a 1400px) |
| `public/` completo | 204 KB |

Sin librería de animación y sin dependencias de UI.

> **Pendiente:** `avatar.png` pesa 100 KB, la mitad de `public/`, y solo se usa
> para muestrearlo en una grilla de 52×52 — nunca se muestra a tamaño real.
> Reducirlo bajaría el peso a la mitad. Ojo al hacerlo: si el nuevo tamaño no es
> múltiplo de la grilla nativa del pixel art, vuelve el ruido en el retrato.

## Despliegue

El build es estático: `npm run build` genera `dist/`, que se puede servir desde
cualquier hosting estático (Vercel, Netlify, Cloudflare Pages, o un hosting
tradicional por FTP/SCP).
