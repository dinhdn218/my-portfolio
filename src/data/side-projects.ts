import type { SideProject } from "@/lib/types";

const gh = (repo: string) => ({ label: "GitHub", href: `https://github.com/dinhdn218/${repo}` });
const live = (href: string) => ({ label: href.replace(/^https?:\/\//, ""), href });

export const sideProjects: SideProject[] = [
  {
    name: "MTTQ Phong Hải",
    kind: "Freelance · Fullstack · 2026",
    live: true,
    description:
      "News and outreach website for the Vietnam Fatherland Front Committee of Phong Hải commune, Lào Cai. Handed over with technical docs and a user guide for commune staff.",
    bullets: [
      "Three roles on Auth.js, a Tiptap editor and a review-then-publish workflow.",
      "Bulk import of past Facebook posts; images pasted from other sites are re-hosted to Cloudinary automatically.",
      "Vietnamese and English, sitemap, branded share images, brute-force protection and hardened sessions.",
    ],
    stack: ["Next.js 16", "PostgreSQL", "Prisma 7", "Auth.js", "Tiptap", "Cloudinary"],
    links: [live("https://mttqphonghailangnghe.com"), gh("mttqphonghailangnghe")],
  },
  {
    name: "Sunny Farm 3D",
    kind: "Personal · 3D & realtime · 2026",
    live: true,
    description: "A multiplayer farming world that runs in the browser, built in four days and 53 commits.",
    bullets: [
      "React Three Fiber scenes with GLB models and animations, weather, four seasons and festival events.",
      "Supabase Realtime presence and broadcast split into zones of up to 50 players, Google sign-in with cloud saves.",
      "Crops, fruit trees, animals, seasonal fishing, crafting, neighbor visits, a weekly leaderboard and a mobile joystick.",
    ],
    stack: ["Next.js", "Three.js", "React Three Fiber", "Supabase", "Zustand"],
    links: [live("https://sunny-farm-3d.vercel.app"), gh("sunny-farm-3d")],
  },
  {
    name: "Ví Của Tôi",
    kind: "Personal · PWA · 2026",
    live: true,
    description: "A personal expense tracker designed so that logging a payment takes a few seconds, one-handed, right after paying.",
    bullets: [
      "Opens straight to a numeric keypad; tap a category and save.",
      "Balance derived from confirmed checkpoints, a monthly report of where the money went, splitting when paying for a group.",
      "Supabase Postgres with magic-link login; logic tested with Vitest, flows with Playwright.",
    ],
    stack: ["Next.js", "Supabase", "Zustand", "Recharts", "Playwright"],
    links: [live("https://vicuatoi.vercel.app"), gh("my-wallet")],
  },
  {
    name: "Ting Ting",
    kind: "Personal · Realtime · 2025–2026",
    live: true,
    description:
      "A shared expense book for a group of friends. Members open a link, pick their name and see what they owe, with a payment QR for the exact amount.",
    bullets: [
      "Split equally, by percentage or by exact amounts; mark paid per expense or per person.",
      "Realtime sync over Firestore, PIN-protected admin mode, export to Excel, CSV and JSON.",
    ],
    stack: ["Next.js 16", "Firestore", "GSAP", "Tailwind CSS"],
    links: [live("https://tingting-money.vercel.app"), gh("ting-ting")],
  },
  {
    name: "Amor Florist",
    kind: "Online shop · 2025–2026",
    live: true,
    description: "An online flower shop for a florist in Hà Nội.",
    bullets: [
      "Occasion categories, product gallery, related products, cart and an ordering flow.",
      "Orders stored in Vercel KV (Upstash Redis), with policy and ordering-guide pages.",
    ],
    stack: ["Next.js 16", "TypeScript", "Tailwind CSS", "Vercel KV"],
    links: [live("https://amor-florist.shop"), gh("flower-shop")],
  },
  {
    name: "Seismic",
    kind: "Personal · Data viz · 2026",
    live: true,
    description: "A dashboard of USGS earthquakes drawn as a seismogram trace, so the logarithmic magnitude scale reads the way it should.",
    bullets: [
      "Magnitude filters dim the trace instead of removing events; the readout states the energy gap between events.",
      "One typed parse boundary between the USGS GeoJSON and the UI; invalid events are counted and shown.",
    ],
    stack: ["React 19", "Vite", "TypeScript", "Tailwind CSS 4", "Motion"],
    links: [live("https://seismic-peach.vercel.app"), gh("seismic")],
  },
  {
    name: "Yoom",
    kind: "Personal · Video calls · 2024",
    description: "A video conferencing app in the style of Zoom.",
    bullets: [
      "Instant and scheduled meetings, a personal room, upcoming and previous meetings and recordings.",
      "Social login with Clerk; calls on the Stream Video SDK.",
    ],
    stack: ["Next.js 14", "Clerk", "Stream Video", "shadcn/ui"],
    links: [gh("Yoom")],
  },
  {
    name: "MERN Posts",
    kind: "Personal · Fullstack · 2022",
    description: "A fullstack posts app with an Express and MongoDB API and a React client.",
    bullets: ["Register and login with JWT and argon2, protected routes, create, edit and delete posts.", "Later packaged with Docker."],
    stack: ["React", "Express", "MongoDB", "JWT", "Docker"],
    links: [gh("mern-app")],
  },
];

export const earlierProjects = [
  { name: "MP3 Player", note: "vanilla JS, 2021", live: "https://mp-3-player.vercel.app", repo: "MP3-Player" },
  { name: "PSD to HTML landing page", note: "2021", live: "https://psd-2-html.vercel.app", repo: "PSD2HTML" },
  { name: "EcoPro Nettoyage", note: "static business site, 2025", live: "https://ecopro-site.vercel.app", repo: "ecopro-site" },
];
