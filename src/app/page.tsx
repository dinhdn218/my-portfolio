import { Hero } from "@/components/Hero";
import { ProductionLog, type LogRow } from "@/components/ProductionLog";
import { WorkIntro } from "@/components/WorkIntro";
import { Contact, Experience, SideProjects, Skills } from "@/components/Sections";
import { SiteHeader } from "@/components/SiteHeader";
import { WorkFilters, type ProjectWithStats } from "@/components/WorkSection";
import { categories, companyProjects } from "@/data/projects";
import { commitSummary, monthRange, repoStats } from "@/lib/commits";

export default function Home() {
  const months = monthRange();
  const summary = commitSummary();

  const projects: ProjectWithStats[] = companyProjects.map((p) => ({ ...p, stats: repoStats(p.repo, months) }));

  // Heatmap rows run in the order I started each product, which draws the career as a diagonal.
  const rows: LogRow[] = projects
    .map((p) => ({ id: p.id, name: p.shortName ?? p.name, ...p.stats }))
    .sort((a, b) => a.first.localeCompare(b.first) || b.total - a.total);

  return (
    <>
      <SiteHeader />
      <main id="top">
        <Hero />
        <ProductionLog months={months} rows={rows} totalCommits={summary.total} />

        <section id="work" aria-labelledby="work-title" className="border-t border-line py-[clamp(56px,8vw,96px)]">
          <div className="wrap">
            <WorkIntro />
            <WorkFilters categories={categories} projects={projects} />
          </div>
        </section>

        <SideProjects />
        <Experience />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
