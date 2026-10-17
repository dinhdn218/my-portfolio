"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { level, monthInitial, monthLabel } from "@/lib/months";

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

const DEFAULT_READOUT = "Point at a cell to see the count.";

export function ProductionLog({ months, rows, totalCommits }: Props) {
  const [readout, setReadout] = useState(DEFAULT_READOUT);
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

  const grid = { gridTemplateColumns: `172px repeat(${months.length}, minmax(22px, 1fr)) 52px` };
  const sticky = "sticky left-0 z-[1] bg-surface";
  // stagger index for the load animation, counted over non-empty cells row by row
  const offsets = rows.map((_, idx) => rows.slice(0, idx).reduce((n, r) => n + r.series.filter(Boolean).length, 0));

  return (
    <section className="wrap pt-2 pb-[clamp(56px,8vw,96px)]" aria-labelledby="log-title">
      <div className="rounded-[14px] border border-line bg-surface p-[clamp(16px,2.6vw,28px)]">
        <div className="mb-[22px] grid items-end gap-x-8 gap-y-3 md:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <h2 id="log-title" className="font-display text-[clamp(22px,2.4vw,28px)] font-extrabold tracking-[-0.01em] [font-stretch:112%]">
              Production log
            </h2>
            <p className="mt-1.5 max-w-[60ch] text-[15px] text-ink-2">
              Every non-merge commit I made to a <code>prod</code> branch at NetSpace, by month. Darker cells mean more commits. Click a product to
              read what I built.
            </p>
          </div>
          <dl className="flex flex-wrap gap-[22px] font-mono text-[13px] text-ink-2">
            {[
              [totalCommits.toLocaleString("en-US"), "commits"],
              [String(rows.length), "repositories"],
              [String(months.length), "months"],
            ].map(([value, label]) => (
              <div key={label} className="flex flex-col-reverse">
                <dt>{label}</dt>
                <dd className="font-display text-[28px] leading-[1.1] font-extrabold tracking-[-0.01em] text-ink tabular-nums [font-stretch:110%]">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="-mx-1 overflow-x-auto p-1 [scrollbar-width:thin]" tabIndex={0} aria-label="Commit heatmap. Scrolls sideways on small screens.">
          <div
            className={`grid min-w-[760px] gap-1 tabular-nums ${booting ? "heat-boot" : ""}`}
            style={grid}
            onMouseLeave={() => !pinned && setReadout(DEFAULT_READOUT)}
          >
            {/* monthly totals */}
            <div className={`${sticky} flex items-end pb-0.5 font-mono text-[11.5px] text-ink-3`}>All / month</div>
            {totals.map((v, i) => (
              <div
                key={months[i]}
                title={`${monthLabel(months[i])} · ${v} commits`}
                onMouseEnter={() => setReadout(`All products · ${monthLabel(months[i])} · ${v} commits`)}
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
            <div className="flex items-end justify-end font-mono text-[11px] tracking-[0.06em] text-ink-3 uppercase">total</div>

            {/* years */}
            <div className={sticky} />
            {years.map((y) => (
              <div key={y.year} style={{ gridColumn: `span ${y.span}` }} className="border-l border-line pl-1.5 font-mono text-[11.5px] tracking-[0.04em] text-ink-3">
                {y.year}
              </div>
            ))}
            <div />

            {/* month initials */}
            <div className={sticky} />
            {months.map((m) => (
              <div key={m} className="text-center font-mono text-[11px] text-ink-3">
                {monthInitial(m)}
              </div>
            ))}
            <div />

            {rows.map((r, ri) => (
              <Row key={r.id} row={r} months={months} sticky={sticky} pinned={pinned} startIndex={offsets[ri]} onRead={setReadout} onPin={(key, msg) => { setPinned(key); setReadout(msg); }} />
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap justify-between gap-x-6 gap-y-3 text-[13px] text-ink-2">
          <div className="flex items-center gap-1.5 font-mono text-xs" aria-label="Legend">
            <span>0</span>
            {[0, 1, 2, 3, 4].map((l) => (
              <span key={l} data-l={l} className="inline-block size-3.5 rounded-[3px]" />
            ))}
            <span>50+ commits</span>
          </div>
          <p className="min-h-[1.5em] font-mono text-[12.5px] text-ink" aria-live="polite">
            {readout}
          </p>
        </div>
        <p className="mt-2 text-[12.5px] text-ink-3">
          {offBranch.length > 0 && (
            <>
              * {offBranch.map((r) => r.name).join(", ")} {offBranch.length === 1 ? "has" : "have"} no prod branch, so the count comes from{" "}
              <code>{offBranch[0].branch}</code>.{" "}
            </>
          )}
          Feb 2026 is quiet because of Tết.
        </p>
      </div>
    </section>
  );
}

function Row({
  row,
  months,
  sticky,
  pinned,
  startIndex,
  onRead,
  onPin,
}: {
  row: LogRow;
  months: string[];
  sticky: string;
  pinned: string | null;
  startIndex: number;
  onRead: (msg: string) => void;
  onPin: (key: string, msg: string) => void;
}) {
  let i = startIndex;
  return (
    <>
      <a
        href={`#p-${row.id}`}
        aria-label={`${row.name}, ${row.total} commits, ${monthLabel(row.first)} to ${monthLabel(row.last)}`}
        className={`${sticky} flex items-center overflow-hidden rounded pr-2 text-[13.5px] font-medium text-ellipsis whitespace-nowrap text-ink no-underline hover:text-accent`}
      >
        {row.name}
        {row.branch !== "prod" && <small className="ml-1 font-normal text-ink-3">*</small>}
      </a>
      {row.series.map((v, ci) => {
        const key = `${row.id}:${months[ci]}`;
        const msg = `${row.name} · ${monthLabel(months[ci])} · ${v} ${v === 1 ? "commit" : "commits"}`;
        const style = v ? ({ "--i": i++ } as CSSProperties) : undefined;
        return (
          <span
            key={key}
            data-l={level(v)}
            data-on={pinned === key}
            title={msg}
            style={style}
            className="heat-cell"
            onMouseEnter={() => onRead(msg)}
            onClick={() => onPin(key, msg)}
          />
        );
      })}
      <span className="flex items-center justify-end font-mono text-[12.5px] text-ink-2">{row.total}</span>
    </>
  );
}
