"use client";

import { useEffect, useState } from "react";
import { level, periodLabel } from "@/lib/months";
import type { CompanyProject, ProjectCategory } from "@/lib/types";
import { Stack } from "./SectionHead";
import { useLanguage } from "./LanguageProvider";

export type ProjectWithStats = CompanyProject & {
  stats: { branch: string; total: number; first: string; last: string; series: number[] };
};

type Filter = "all" | ProjectCategory;

export function WorkFilters({
  categories,
  projects,
}: {
  categories: { id: Filter; label: string }[];
  projects: ProjectWithStats[];
}) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");
  const visibleIds = projects.filter((p) => filter === "all" || p.category === filter).map((p) => p.id);

  // Jumping to a project from the heatmap clears a filter that hides it.
  useEffect(() => {
    function onHash() {
      const id = window.location.hash.replace(/^#p-/, "");
      const target = projects.find((p) => p.id === id);
      if (!target) return;
      setFilter((f) => (f === "all" || f === target.category ? f : "all"));
      requestAnimationFrame(() => document.getElementById(`p-${id}`)?.scrollIntoView());
    }
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [projects]);

  return (
    <>
      <div className="mb-7 flex flex-wrap gap-2" role="group" aria-label={t("Filter projects")}>
        {categories.map((c) => {
          const count = c.id === "all" ? projects.length : projects.filter((p) => p.category === c.id).length;
          if (count === 0) return null;
          const active = filter === c.id;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(c.id)}
              className={`inline-flex cursor-pointer items-center gap-[7px] rounded-full border px-[13px] py-[7px] text-sm font-medium ${
                active ? "border-ink bg-ink text-paper" : "border-line bg-surface text-ink-2 hover:border-ink-3 hover:text-ink"
              }`}
            >
              {t(c.label)}
              <span className={`font-mono text-xs ${active ? "text-paper/70" : "text-ink-3"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <div>
        {projects.map((p) => (
          <ProjectEntry key={p.id} project={p} hidden={!visibleIds.includes(p.id)} first={visibleIds[0] === p.id} />
        ))}
      </div>
    </>
  );
}

function ProjectEntry({ project: p, first, hidden }: { project: ProjectWithStats; first: boolean; hidden: boolean }) {
  const { t, language } = useLanguage();
  const facts = [
    { label: "Commits", value: t("{count} to {branch}", { count: p.stats.total, branch: p.stats.branch }) },
    { label: "Active", value: periodLabel(p.stats.first, p.stats.last, language) },
    ...(p.extraFacts ?? []),
  ];

  return (
    <article
      id={`p-${p.id}`}
      hidden={hidden}
      className={`grid gap-4 md:grid-cols-[minmax(220px,300px)_minmax(0,1fr)] md:gap-x-[clamp(24px,4vw,56px)] md:gap-y-5 ${
        first ? "pt-1 pb-[34px]" : "border-t border-line py-[34px]"
      }`}
    >
      <div className="flex min-w-0 flex-col gap-2.5">
        <p className="font-mono text-xs tracking-[0.06em] text-ink-2 uppercase">{t(p.kind)}</p>
        <h3 className="font-display text-[clamp(22px,2.4vw,28px)] leading-[1.12] font-extrabold tracking-[-0.01em] [font-stretch:110%]">{p.name}</h3>
        {p.url ? (
          <a href={p.url} target="_blank" rel="noopener" className="font-mono text-sm font-medium break-all">
            {p.url.replace(/^https?:\/\//, "")} ↗
          </a>
        ) : (
          <span className="font-mono text-sm text-ink-3">{p.urlNote && t(p.urlNote)}</span>
        )}
        <dl className="mt-1 grid grid-cols-[auto_1fr] gap-x-3.5 gap-y-1 text-[13.5px]">
          {facts.map((f) => (
            <div key={f.label} className="contents">
              <dt className="text-ink-3">{t(f.label)}</dt>
              <dd className="font-mono text-[13px] text-ink tabular-nums">{t(f.value)}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-0.5 grid max-w-[240px] gap-0.5" style={{ gridTemplateColumns: `repeat(${p.stats.series.length}, 1fr)` }} aria-hidden="true">
          {p.stats.series.map((v, i) => (
            <i key={i} data-l={level(v)} className="aspect-square rounded-[2px]" />
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-4">
        <p className="max-w-[66ch] text-[17px] leading-relaxed text-ink">{t(p.intro)}</p>
        <ul className="bullets max-w-[72ch] text-[15.5px] leading-[1.58]">
          {p.bullets.map((b) => (
            <li key={b.label}>
              <b>{t(b.label)}.</b> {t(b.text)}
            </li>
          ))}
        </ul>
        <Stack items={p.stack} />
      </div>
    </article>
  );
}
