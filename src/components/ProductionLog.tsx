"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { level, monthInitial, monthLabel } from "@/lib/months";
import { useLanguage } from "./LanguageProvider";

export type LogRow = {
  id: string;
  name: string;
  branch: string;
  total: number;
  first: string;
  last: string;
  series: number[];
};

type Props = {
  months: string[];
  rows: LogRow[];
  totalCommits: number;
};

const DEFAULT_READOUT = "Point at or tap a cell to see the count.";
type Readout = { name: string | null; month: string; count: number };

export function ProductionLog({ months, rows, totalCommits }: Props) {
  const { t, language } = useLanguage();
  const [readout, setReadout] = useState<Readout | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setBooting(false), 1800);
    return () => window.clearTimeout(t);
  }, []);

  const totals = months.map((_, i) => rows.reduce((sum, r) => sum + r.series[i], 0));
  const peak = Math.max(...totals);
  const years = months.reduce<{ year: string; span: number }[]>((acc, m) => {
    const y = m.slice(0, 4);
    const last = acc[acc.length - 1];
    if (last && last.year === y) last.span += 1;
    else acc.push({ year: y, span: 1 });
    return acc;
  }, []);
  const offBranch = rows.filter((r) => r.branch !== "prod");

  // Below md each product takes two lines (name and total, then a full-width strip), so all months fit without sideways scrolling.
  const grid =
    "grid grid-cols-[repeat(var(--months),minmax(0,1fr))] gap-x-[3px] gap-y-1 tabular-nums md:grid-cols-[minmax(110px,172px)_repeat(var(--months),minmax(18px,1fr))_44px] md:gap-1";
  const labelCell = "max-md:hidden";
  // stagger index for the load animation, counted over non-empty cells row by row
  const offsets = rows.map((_, idx) => rows.slice(0, idx).reduce((n, r) => n + r.series.filter(Boolean).length, 0));

  return (
    <section className="wrap pt-2 pb-[clamp(56px,8vw,96px)]" aria-labelledby="log-title">
      <div className="rounded-[14px] border border-line bg-surface p-[clamp(16px,2.6vw,28px)]">
        <div className="mb-[22px] grid items-end gap-x-8 gap-y-3 md:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <h2 id="log-title" className="font-display text-[clamp(22px,2.4vw,28px)] font-extrabold tracking-[-0.01em] [font-stretch:112%]">
              {t("Production log")}
            </h2>
            <p className="mt-1.5 max-w-[60ch] text-[15px] text-ink-2">
              {t("Every non-merge commit I made to a")}{" "}<code>prod</code>{" "}
              {t("branch at NetSpace, by month. Darker cells mean more commits. Click a product to read what I built.")}
            </p>
          </div>
          <dl className="flex flex-wrap gap-[22px] font-mono text-[13px] text-ink-2">
            {[
              [totalCommits.toLocaleString(language === "vi" ? "vi-VN" : "en-US"), "commits"],
              [String(rows.length), "repositories"],
              [String(months.length), "months"],
            ].map(([value, label]) => (
              <div key={label} className="flex flex-col-reverse">
                <dt>{t(label)}</dt>
                <dd className="font-display text-[28px] leading-[1.1] font-extrabold tracking-[-0.01em] text-ink tabular-nums [font-stretch:110%]">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          className={`${grid} ${booting ? "heat-boot" : ""}`}
          style={{ "--months": months.length } as CSSProperties}
          onMouseLeave={() => !pinned && setReadout(null)}
        >
          {/* monthly totals */}
          <div className="flex items-end pb-0.5 font-mono text-[11.5px] text-ink-3 max-md:col-span-full">{t("All / month")}</div>
          {totals.map((v, i) => (
            <div
              key={months[i]}
              title={t("All products · {month} · {count} commits", { month: monthLabel(months[i], language), count: v })}
              onMouseEnter={() => setReadout({ name: null, month: months[i], count: v })}
              className="relative flex h-14 flex-col justify-end"
            >
              {v === peak && (
                <em className="absolute -top-0.5 left-1/2 -translate-x-1/2 font-mono text-[11px] font-semibold text-ink not-italic">{v}</em>
              )}
              <i
                className={`block min-h-0.5 rounded-t-[3px] rounded-b-[1px] ${v === peak ? "bg-heat-4" : "bg-heat-2"}`}
                style={{ height: `${Math.max(2, Math.round((v / peak) * 40))}px` }}
              />
            </div>
          ))}
          <div className={`${labelCell} flex items-end justify-end font-mono text-[11px] tracking-[0.06em] text-ink-3 uppercase`}>{t("total")}</div>

          {/* years */}
          <div className={labelCell} />
          {years.map((y) => (
            <div key={y.year} style={{ gridColumn: `span ${y.span}` }} className="border-l border-line pl-1.5 font-mono text-[11.5px] tracking-[0.04em] text-ink-3">
              {y.year}
            </div>
          ))}
          <div className={labelCell} />

          {/* month initials */}
          <div className={labelCell} />
          {months.map((m) => (
            <div key={m} className="text-center font-mono text-[11px] text-ink-3">
              {monthInitial(m, language)}
            </div>
          ))}
          <div className={labelCell} />

          {rows.map((r, ri) => (
            <Row key={r.id} row={r} months={months} pinned={pinned} startIndex={offsets[ri]} onRead={setReadout} onPin={(key, msg) => { setPinned(key); setReadout(msg); }} />
          ))}
        </div>

        <div className="mt-4 flex flex-wrap justify-between gap-x-6 gap-y-3 text-[13px] text-ink-2">
          <div className="flex items-center gap-1.5 font-mono text-xs" aria-label={t("Legend")}>
            <span>0</span>
            {[0, 1, 2, 3, 4].map((l) => (
              <span key={l} data-l={l} className="inline-block size-3.5 rounded-[3px]" />
            ))}
            <span>{t("50+ commits")}</span>
          </div>
          <p className="min-h-[1.5em] font-mono text-[12.5px] text-ink" aria-live="polite">
            {readout ? t(readout.name ? "{name} · {month} · {count} commits" : "All products · {month} · {count} commits", {
              name: readout.name ?? "", month: monthLabel(readout.month, language), count: readout.count,
            }) : t(DEFAULT_READOUT)}
          </p>
        </div>
        <p className="mt-2 text-[12.5px] text-ink-3">
          {offBranch.length > 0 && (
            <>
              {t(offBranch.length === 1 ? "* {names} has no prod branch, so the count comes from" : "* {names} have no prod branch, so the count comes from", { names: offBranch.map((r) => r.name).join(", ") })}{" "}
              <code>{offBranch[0].branch}</code>.{" "}
            </>
          )}
          {t("Feb 2026 is quiet because of Tết.")}
        </p>
      </div>
    </section>
  );
}

function Row({
  row,
  months,
  pinned,
  startIndex,
  onRead,
  onPin,
}: {
  row: LogRow;
  months: string[];
  pinned: string | null;
  startIndex: number;
  onRead: (msg: Readout) => void;
  onPin: (key: string, msg: Readout) => void;
}) {
  const { t, language } = useLanguage();
  let i = startIndex;
  return (
    <>
      <a
        href={`#p-${row.id}`}
        aria-label={t("{name}, {count} commits, {first} to {last}", { name: row.name, count: row.total, first: monthLabel(row.first, language), last: monthLabel(row.last, language) })}
        className="flex min-w-0 items-center gap-2 rounded pr-2 text-[13.5px] font-medium whitespace-nowrap text-ink no-underline hover:text-accent max-md:col-span-full max-md:mt-2 max-md:pr-0"
      >
        <span className="truncate">
          {row.name}
          {row.branch !== "prod" && <small className="ml-1 font-normal text-ink-3">*</small>}
        </span>
        <span className="ml-auto font-mono text-[12.5px] font-normal text-ink-2 md:hidden">{row.total}</span>
      </a>
      {row.series.map((v, ci) => {
        const key = `${row.id}:${months[ci]}`;
        const msg = { name: row.name, month: months[ci], count: v };
        const title = t("{name} · {month} · {count} commits", { name: row.name, month: monthLabel(months[ci], language), count: v });
        const style = v ? ({ "--i": i++ } as CSSProperties) : undefined;
        return (
          <span
            key={key}
            data-l={level(v)}
            data-on={pinned === key}
            title={title}
            style={style}
            className="heat-cell"
            onMouseEnter={() => onRead(msg)}
            onClick={() => onPin(key, msg)}
          />
        );
      })}
      <span className="flex items-center justify-end font-mono text-[12.5px] text-ink-2 max-md:hidden">{row.total}</span>
    </>
  );
}
