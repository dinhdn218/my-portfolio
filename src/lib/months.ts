export const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Heat level 0–4 used by the heatmap and the per-project strips. */
export function level(count: number): 0 | 1 | 2 | 3 | 4 {
  if (!count) return 0;
  if (count < 10) return 1;
  if (count < 25) return 2;
  if (count < 50) return 3;
  return 4;
}

export function monthLabel(key: string): string {
  const [y, m] = key.split("-").map(Number);
  return `${MONTH_NAMES[m - 1]} ${y}`;
}

export function monthInitial(key: string): string {
  return MONTH_NAMES[Number(key.split("-")[1]) - 1].charAt(0);
}

/** "Jul – Oct 2026", "Apr 2025", "Jul 2025 – Oct 2026" */
export function periodLabel(first: string, last: string): string {
  if (first === last) return monthLabel(first);
  const [fy] = first.split("-");
  const [ly] = last.split("-");
  const fm = monthLabel(first).split(" ")[0];
  return fy === ly ? `${fm} – ${monthLabel(last)}` : `${monthLabel(first)} – ${monthLabel(last)}`;
}

