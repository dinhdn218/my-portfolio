# dnd-portfolio

Portfolio of **Đinh Ngọc Định**, fullstack developer (frontend-first) in Hà Nội.

The page opens with a production log: a heatmap of my commits to each company repo's `prod` branch, month by month. Every project entry below it carries its own commit strip and a feature list taken from those commits.

**Stack:** Next.js 16 (App Router, every route prerendered as static HTML), React 19, TypeScript, Tailwind CSS 4, self-hosted fonts via Fontsource (Archivo, Be Vietnam Pro, JetBrains Mono). No UI library and no runtime data fetching: the whole site is prerendered.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck
```

## Edit the content

All copy lives in `src/data/`, separate from the components:

| File | What it holds |
| --- | --- |
| `profile.ts` | Name, role, contact links, current company, optional CV path |
| `projects.ts` | Company projects, filter categories and feature lists |
| `side-projects.ts` | Side projects and the "Earlier" line |
| `experience.ts` | Jobs, education, awards, skills |
| `commits.json` | Commit counts per repo per month (generated, see below) |

Each company project points at a repo folder name through its `repo` field; that name must exist in `commits.json`.

## Refresh the commit counts

`scripts/count-commits.mjs` reads your local clones and rewrites `src/data/commits.json`. It counts non-merge commits by one author on `origin/prod` (or `prod`), and falls back to the current branch when a repo has no prod branch.

```bash
# fetch first so origin/prod is up to date, then:
npm run commits -- "D:\projects-in-company" --author dinhdn218@gmail.com --since 2025-04-01
```

Totals, month range, repo count, the heatmap and each project's "Active" period all update from that file.

## Add a CV download

Export the CV to PDF, save it as `public/cv.pdf`, then set `cvPath: "/cv.pdf"` in `src/data/profile.ts`. A "Download CV" button appears in the hero.

## Deploy on Vercel

1. Push this folder to GitHub.
2. Import the repo in Vercel (framework preset: Next.js, no extra settings).
3. Set `NEXT_PUBLIC_SITE_URL` to the final URL (used for metadata, sitemap and robots).

To keep the existing address `dnd-portfolio.vercel.app`, either push this code to the `my-portfolio` repo that project is already linked to, or move that domain to the new project under **Settings → Domains**.
