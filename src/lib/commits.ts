import data from "@/data/commits.json";

export { level, monthLabel, monthInitial, periodLabel } from "./months";

type RepoCommits = { branch: string; months: Record<string, number> };

const repos = data.repos as Record<string, RepoCommits>;

/** Every month from the earliest to the latest commit across all repos, as "YYYY-MM". */
export function monthRange(): string[] {
  const keys = Object.values(repos).flatMap((r) => Object.keys(r.months)).sort();
  if (keys.length === 0) return [];
  const [y0, m0] = keys[0].split("-").map(Number);
  const [y1, m1] = keys[keys.length - 1].split("-").map(Number);
  const out: string[] = [];
  for (let y = y0, m = m0; y < y1 || (y === y1 && m <= m1); ) {
    out.push(`${y}-${String(m).padStart(2, "0")}`);
    m += 1;
    if (m > 12) {
      m = 1;
      y += 1;
    }
  }
  return out;
}

export type RepoStats = {
  branch: string;
  total: number;
  first: string;
  last: string;
  series: number[];
};

export function repoStats(repo: string, months = monthRange()): RepoStats {
  const r = repos[repo];
  if (!r) throw new Error(`No commit data for repo "${repo}". Check src/data/commits.json.`);
  const keys = Object.keys(r.months).filter((k) => r.months[k] > 0).sort();
  return {
    branch: r.branch,
    total: Object.values(r.months).reduce((a, b) => a + b, 0),
    first: keys[0],
    last: keys[keys.length - 1],
    series: months.map((k) => r.months[k] ?? 0),
  };
}

/** Totals across every repo in commits.json. */
export function commitSummary() {
  const months = monthRange();
  const all = Object.values(repos);
  const total = all.reduce((sum, r) => sum + Object.values(r.months).reduce((a, b) => a + b, 0), 0);
  return { repos: all.length, total, months: months.length, first: months[0], last: months[months.length - 1] };
}
