/**
 * The three projects, ordered by what Juan wants to be hired for — HiCami
 * leads because bespoke portfolio sites are the offer; the two platforms
 * follow as evidence of range.
 *
 * Each project carries a `demo` key naming the interactive panel that renders
 * beside it (see components/demos/). The panel is the argument: a card with a
 * screenshot cannot show that Merkahorro has 38 internal modules.
 *
 * Screenshots live in /public/projects/ as WebP at 1400px wide (~92 KB for
 * all three, down from 2.7 MB as PNG). Regenerate with:
 *   ffmpeg -i shot.png -vf scale=1400:-2 -c:v libwebp -quality 80 shot.webp
 */
export const projects = [
  {
    id: "hicami",
    demo: "hicami",
    title: "HiCami",
    type: "Portafolio audiovisual",
    year: "2026",
    url: "https://hi-cami.vercel.app",
    image: "/projects/hi-cami.webp",
    summary:
      "Portafolio para Camila, directora y editora audiovisual. Aquí el video manda y el diseño se hace a un lado: galería con reproducción integrada, filtros por categoría y una tira donde cada pieza mantiene su formato original, sea vertical, horizontal o cuadrada.",
    note: "Es del tipo de sitio que más disfruto hacer ",
    stack: ["React", "Vite", "Tailwind", "Framer Motion"],
    // Real pieces from the live site.
    pieces: [
      { title: "Un Partido en el Barrio", kind: "Cortometraje", year: "2026", place: "Medellín" },
      { title: "Memoria de la Mejor Mamita", kind: "Documental", year: "2025", place: "Antioquia" },
      { title: "Dream Wear", kind: "Comercial", year: "2026", place: "Medellín" },
    ],
    filters: ["Todo", "Cortometraje", "Documental", "Comercial"],
  },

  {
    id: "merkahorro",
    demo: "merkahorro",
    title: "Merkahorro",
    type: "Plataforma corporativa",
    year: "2025",
    url: "https://merkahorro.com",
    image: "/projects/merkahorro.webp",
    summary:
      "Plataforma de una cadena de supermercados, con dos caras: el sitio que ve el cliente y la intranet que usa la empresa entera todos los días. La segunda creció hasta 38 módulos conectados al ERP.",
    note: "Fue mi primer acercamiento al desarrollo escalable de ahí salieron casi todas las herramientas que uso hoy.",
    stack: ["React", "Node.js", "Express", "PostgreSQL", "Supabase", "amCharts", "Cloudflare R2", "Vercel"],
    scale: [
      { k: "38", v: "módulos internos" },
      { k: "19", v: "backends desplegados" },
      { k: "25 K", v: "líneas de código" },
    ],
    faces: {
      publica: {
        label: "Cara pública",
      
        items: [
          { t: "Promociones", s: "catálogo semanal por sede" },
          { t: "Sedes", s: "ubicación, horarios y contacto" },
          { t: "Postulaciones", s: "vacantes y envío de hoja de vida" },
        ],
      },
      interna: {
        label: "Cara interna",
        hint: "// intranet · un módulo por área",
        modules: [
          "Portal de proveedores", "Despacho Mega", "Traslados",
          "Trazabilidad contable", "Picking Ecommerce", "Reserva de salones",
          "Entrevistas GH", "Autogestión", "Dotación",
          "Flujo de gastos", "Inventario", "Gestor de ecommerce",
        ],
        foot: "roles y permisos · flujos de aprobación · auditoría",
      },
      datos: {
        label: "Integraciones",
        hint: "// de dónde salen los números",
        items: [
          { t: "SIESA (ERP)", s: "sincronización de ecommerce, omnicanalidad y ventas POS" },
          { t: "WooCommerce", s: "catálogo, pedidos y sesiones de la tienda en línea" },
          { t: "Cloudflare R2", s: "almacenamiento de imágenes de producto" },
        ],
      },
    },
  },

  {
    id: "escuela",
    demo: "escuela",
    title: "Escuela de la Riqueza",
    type: "Plataforma educativa",
    year: "2026",
    url: "https://escuela-riqueza.vercel.app",
    image: "/projects/escuela-riqueza.webp",
    summary:
      "Escuela digital de Iván Mazo, con formato tipo Platzi. Enseña seis inteligencias —mental, riqueza, emocional, comercial, estratégica y espiritual— sobre una ruta de aprender, practicar y transformar.",
    note: "El proyecto donde más me cuidé la espalda: TypeScript, esquemas validados y pruebas. Con gente usándolo de verdad, adivinar sale caro.",
    stack: ["TypeScript", "React", "Supabase", "Stripe", "Cloudflare Stream", "TanStack Query"],

    // What holds it up.
    plataforma: [
      { t: "Planes", s: "Free, Individual y VIP con suscripciones en Stripe" },
      { t: "Video", s: "cursos y lives por Cloudflare Stream, grabaciones archivadas en R2" },
      { t: "Modo podcast", s: "escuchar las lecciones sin pantalla" },
      { t: "Comunidad", s: "feed de publicaciones entre alumnos" },
      { t: "Lives VIP", s: "sesiones 1:1 y grupales con Iván" },
      { t: "Panel self-service", s: "Iván carga contenido y usuarios sin tocar código" },
    ],
  },
];
