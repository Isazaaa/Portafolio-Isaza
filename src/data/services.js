/**
 * What Juan offers, in the order he wants to be hired for it. The last entry
 * is deliberately open-ended: most enquiries arrive as "can you also build…?".
 */
export const services = [
  {
    id: "portafolios",
    title: "Portafolios",
    body: "Para creativos que necesitan que su trabajo se VEA, no que se lea. Galería, video, ritmo y una identidad",
  },
  {
    id: "sitios",
    title: "Sitios a medida",
    body: "Presentación, catálogo, landing. Diseño propio de punta a punta, desde la dirección visual hasta el dominio andando.",
  },
  {
    id: "resto",
    title: "Y lo que haga falta",
    body: "Dashboards, integraciones, plataformas internas. Si se puede desarrollar, se puede conversar.",
  },
];

/** The four layers, ordered the way the work actually happens. */
export const layers = [
  { n: "01", name: "Diseño", tools: "dirección visual · UX" },
  { n: "02", name: "Interfaz", tools: "React · Tailwind · Motion" },
  { n: "03", name: "Datos", tools: "Supabase · Postgres · APIs" },
  { n: "04", name: "Producción", tools: "deploy · dominio · monitoreo" },
];

export const stackAll = [
  // Languages first, then what they are used with, then where it runs.
  "JavaScript", "TypeScript", "Python",
  "React", "Next.js", "Node.js", "Vite", "Tailwind CSS", "Motion",
  "Supabase", "Postgres", "Cloudflare Stream", "Vercel", "Git",
];

export const contact = {
  email: "isazamanuel04@gmail.com",
  github: "https://github.com/Isazaaa",
  linkedin: "https://www.linkedin.com/in/juan-isaza-a685ba30a/",
};
