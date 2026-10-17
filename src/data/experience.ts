import { commitSummary } from "@/lib/commits";
import type { Job, SkillGroup } from "@/lib/types";

const shipped = commitSummary();

export const jobs: Job[] = [
  {
    period: "Apr 2025 – now",
    current: true,
    company: "NetSpace",
    companyNote: "Công ty CP Công nghệ & Truyền thông Không gian số · Hà Nội",
    title: "Fullstack Developer",
    bullets: [
      `Shipped ${shipped.repos} repositories to production in ${shipped.months} months: news platforms, a government portal, an event SaaS, e-commerce, corporate sites and an internal LMS.`,
      "Main developer of the AntCMS React post editor, and a core developer of the reader-facing Next.js sites that run on it.",
      "Fullstack on NetEvent and kol.gov.vn: Next.js apps, Prisma schemas, email delivery, a Laravel and Filament admin and scheduled jobs.",
      "Technical SEO, i18n and performance across tenant sites.",
    ],
  },
  {
    period: "Nov 2023 – Mar 2025",
    company: "Sunteco JSC",
    title: "Middle Frontend Developer",
    bullets: [
      "Cloud console for enterprise customers covering containers, Kafka event streaming and virtual machines.",
      "Dashboards and monitoring views for real-time resource usage and performance metrics.",
      "Worked with the UX/UI team on a responsive console for desktop and mobile.",
    ],
  },
  {
    period: "Sep 2022 – Nov 2023",
    company: "JMango360",
    title: "Frontend Developer",
    bullets: [
      "Storefront UI for business e-commerce websites: product pages with pricing, promotions and reviews, cart, checkout and profile.",
      "Performance and responsiveness across devices; planned new features with the product team.",
    ],
  },
  {
    period: "Oct 2021 – Aug 2022",
    company: "Rikkeisoft",
    title: "Frontend Developer",
    bullets: [
      "Frontend of a matching platform that connects hospitals and clinics with doctors, nurses and healthcare staff.",
      "Management interface for job postings, recruitment progress and personnel records.",
    ],
  },
  {
    period: "Jun – Aug 2021",
    company: "MISA JSC",
    title: "Fullstack Developer Intern",
    bullets: ["A fullstack project with VueJS, C#/.NET and SQL Server, presented to a review panel at the end of the internship."],
  },
];

export const education = [
  {
    name: "University of Transport Technology",
    years: "2017 – 2021",
    note: "Information Systems · GPA 3.68 / 4.0 · Thesis: document management app with digital signatures",
  },
  { name: "Agile Academy", years: "2021", note: "Certified Pragmatic Scrum" },
];

export const awards = [
  { name: "Second Prize, Ricode Challenge", year: "2021" },
  { name: "Outstanding Student in Youth Union Activities", year: "2019" },
  { name: "Outstanding Student Award", year: "2018" },
];

export const skills: SkillGroup[] = [
  {
    title: "Frontend",
    main: true,
    items:
      "TypeScript, React, Next.js (App Router, SSR, metadata), Tailwind CSS, shadcn/ui, Radix, MUI, Ant Design, TanStack Query and Table, Zustand, React Hook Form, Zod, next-intl, Vue.js",
  },
  {
    title: "Rich UI",
    items: "BlockNote and Tiptap editors, Framer Motion, GSAP, Three.js and React Three Fiber, Leaflet maps, Recharts, drag and drop with dnd-kit, QR scanning",
  },
  { title: "Mobile", items: "React Native with Expo, Expo Router, React Query on mobile" },
  {
    title: "Backend",
    items: "Node.js, Next.js route handlers, ElysiaJS, oRPC, Express, Laravel with Filament and Inertia, REST APIs, scheduled jobs, transactional email (SMTP, Brevo, Resend)",
  },
  { title: "Data & auth", items: "PostgreSQL, Prisma, Drizzle, MongoDB, SQL Server, Supabase, Firebase, Redis, better-auth, Auth.js, JWT, S3 storage" },
  { title: "Delivery", items: "Docker, Turborepo with pnpm and Bun, GitLab CI, Vercel, Caddy, Vitest, Playwright, Jest, technical SEO, i18n, Scrum" },
];
