"use client";

import { useLanguage } from "./LanguageProvider";

export function SectionHead({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children?: React.ReactNode }) {
  const { t } = useLanguage();
  return (
    <div className="mb-8 grid max-w-[760px] gap-2.5">
      <p className="eyebrow text-accent">{t(eyebrow)}</p>
      <h2 id={id} className="display text-[clamp(30px,4.4vw,48px)] leading-[1.05] font-[850] tracking-[-0.02em] [font-stretch:118%]">
        {t(title)}
      </h2>
      {children && <p className="max-w-[64ch] text-ink-2">{children}</p>}
    </div>
  );
}

export function Stack({ items }: { items: string[] }) {
  const { t } = useLanguage();
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label={t("Tech stack")}>
      {items.map((s) => (
        <li key={s} className="rounded-md bg-accent-soft px-2 py-[3px] font-mono text-xs text-ink">
          {s}
        </li>
      ))}
    </ul>
  );
}
