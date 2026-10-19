"use client";

import { awards, education, jobs, skills } from "@/data/experience";
import { useLanguage } from "./LanguageProvider";
import { profile } from "@/data/profile";
import { earlierProjects, sideProjects } from "@/data/side-projects";
import { CopyChip } from "./CopyChip";
import { SectionHead, Stack } from "./SectionHead";

export function SideProjects() {
  const { t } = useLanguage();
  return (
    <section id="side" aria-labelledby="side-title" className="border-t border-line py-[clamp(56px,8vw,96px)]">
      <div className="wrap">
        <SectionHead id="side-title" eyebrow="Outside work" title="Side projects">
          {t("Freelance builds and things I make to try a new stack or solve my own problem.")}
        </SectionHead>
        <div className="grid gap-4 md:grid-cols-2">
          {sideProjects.map((p) => (
            <article key={p.name} className="flex min-w-0 flex-col gap-3 rounded-[10px] border border-line bg-surface p-[22px]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-[21px] leading-tight font-extrabold tracking-[-0.01em] [font-stretch:108%]">{p.name}</h3>
                  <p className="mt-1 font-mono text-xs text-ink-3">{t(p.kind)}</p>
                </div>
                <span
                  className={`flex-none rounded-md px-2 py-1 font-mono text-[11.5px] font-semibold tracking-[0.04em] whitespace-nowrap uppercase ${
                    p.live ? "bg-live-soft text-live" : "bg-heat-0 text-ink-2"
                  }`}
                >
                  {p.live ? t("Live") : "GitHub"}
                </span>
              </div>
              <p className="text-[15.5px] text-ink">{t(p.description)}</p>
              <ul className="bullets text-[14.5px] leading-[1.55]">
                {p.bullets.map((b) => (
                  <li key={b}>{t(b)}</li>
                ))}
              </ul>
              <Stack items={p.stack} />
              <div className="mt-auto flex flex-wrap gap-3.5 pt-1.5 font-mono text-[13.5px]">
                {p.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener">
                    {l.label} ↗
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
        <p className="mt-[22px] text-[14.5px] text-ink-2">
          {t("Earlier:")}{" "}
          {earlierProjects.map((e, i) => (
            <span key={e.name}>
              {e.name}, {t(e.note)} (
              <a href={e.live} target="_blank" rel="noopener">
                {t("live")}
              </a>{" "}
              ·{" "}
              <a href={`https://github.com/dinhdn218/${e.repo}`} target="_blank" rel="noopener">
                GitHub
              </a>
              ){i < earlierProjects.length - 1 ? "; " : "."}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

export function Experience() {
  const { t } = useLanguage();
  return (
    <section id="experience" aria-labelledby="exp-title" className="border-t border-line py-[clamp(56px,8vw,96px)]">
      <div className="wrap">
        <SectionHead id="exp-title" eyebrow="Since 2021" title="Experience" />
        <ol>
          {jobs.map((j, i) => (
            <li
              key={j.company}
              className={`grid gap-x-[clamp(24px,4vw,56px)] gap-y-2 md:grid-cols-[200px_minmax(0,1fr)] ${i === 0 ? "pb-[26px]" : "border-t border-line py-[26px]"}`}
            >
              <p className="pt-1 font-mono text-[13.5px] text-ink-2 tabular-nums">
                {t(j.period)}
                {j.current && <span className="ml-1.5 inline-block rounded bg-mark px-1.5 font-semibold text-mark-ink">{t("current")}</span>}
              </p>
              <div>
                <h3 className="font-display text-[22px] leading-tight font-extrabold tracking-[-0.01em] [font-stretch:108%]">{j.company}</h3>
                {j.companyNote && <p className="mt-0.5 text-sm text-ink-3">{j.companyNote}</p>}
                <p className="mt-1.5 font-semibold">{t(j.title)}</p>
                <ul className="bullets mt-3 text-[15.5px] leading-[1.58]">
                  {j.bullets.map((b) => (
                    <li key={b}>{t(b)}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <div className="grid gap-x-[clamp(24px,4vw,56px)] gap-y-10 border-t border-line pt-8 md:grid-cols-2 md:pt-10">
          <div>
            <h3 className="eyebrow mb-4 text-[12.5px] font-semibold text-ink-2">{t("Education")}</h3>
            <ul className="grid gap-5">
              {education.map((e) => (
                <li key={e.name} className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-1">
                  <strong className="leading-snug font-semibold">{t(e.name)}</strong>
                  <span className="font-mono text-[13px] whitespace-nowrap text-ink-3 tabular-nums">{e.years}</span>
                  <small className="col-span-2 max-w-[56ch] text-sm leading-relaxed text-ink-2">{t(e.note)}</small>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="eyebrow mb-4 text-[12.5px] font-semibold text-ink-2">{t("Awards")}</h3>
            <ul className="grid gap-4">
              {awards.map((a) => (
                <li key={a.name} className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4">
                  <strong className="leading-snug font-semibold">{t(a.name)}</strong>
                  <span className="font-mono text-[13px] whitespace-nowrap text-ink-3 tabular-nums">{a.year}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  const { t } = useLanguage();
  return (
    <section id="skills" aria-labelledby="skills-title" className="border-t border-line py-[clamp(56px,8vw,96px)]">
      <div className="wrap">
        <SectionHead id="skills-title" eyebrow="Toolbox" title="Skills">
          {t("Everything here has shipped to production in at least one of the projects above.")}
        </SectionHead>
        <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s) => (
            <div key={s.title}>
              <h3 className="flex items-center gap-2 font-display text-lg font-extrabold [font-stretch:108%]">
                {t(s.title)}
                {s.main && <span className="rounded bg-mark px-1.5 py-0.5 font-mono text-[11px] font-semibold tracking-[0.05em] text-mark-ink uppercase">{t("main")}</span>}
              </h3>
              <p className="mt-2 text-[15px] leading-[1.7] text-ink-2">{t(s.items)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const { t } = useLanguage();
  const links = [profile.links.github, profile.links.linkedin, profile.links.facebook];
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line py-[clamp(56px,9vw,112px)]">
      <div className="wrap">
        <h2 id="contact-title" className="display text-[clamp(36px,7vw,84px)] leading-none font-[850] tracking-[-0.025em]">
          {t("Let's build something.")}
        </h2>
        <p className="mt-3.5 max-w-[56ch] text-[19px] text-ink-2">
          {t("Based in Hà Nội. Happy to talk about frontend-heavy or fullstack roles and freelance work.")}
        </p>
        <div className="mt-7 flex flex-wrap gap-2.5">
          <CopyChip value={profile.email} label="Copy email" />
          <CopyChip value={profile.phone} display={profile.phoneDisplay} label="Copy phone" />
        </div>
        <div className="mt-[22px] flex flex-wrap gap-[18px] font-mono text-sm">
          {links.map((href) => (
            <a key={href} href={href} target="_blank" rel="noopener">
              {href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")} ↗
            </a>
          ))}
        </div>
        <footer className="mt-14 flex flex-wrap justify-between gap-x-6 gap-y-2 text-[13px] text-ink-3">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span>{t("Built with Next.js and Tailwind CSS · commit data from prod branches")}</span>
        </footer>
      </div>
    </section>
  );
}
