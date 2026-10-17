#!/usr/bin/env node
/**
 * Regenerates src/data/commits.json from local git repositories.
 *
 * Counts your non-merge commits per month on each repo's prod branch
 * (origin/prod, then prod), falling back to the current HEAD when a repo
 * has no prod branch. Run `git fetch` in each repo first so the counts are fresh.
 *
 * Usage:
 *   npm run commits -- <folder with repos> [--author you@example.com] [--since 2025-04-01]
 *
 * Example (Windows):
 *   npm run commits -- "D:\projects-in-company" --author dinhdn218@gmail.com --since 2025-04-01
 */
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const root = args.find((a, i) => !a.startsWith("--") && !args[i - 1]?.startsWith("--"));
const author = flag("author", "dinhdn218@gmail.com");
const since = flag("since", "2025-04-01");

if (!root || !existsSync(root)) {
  console.error("Pass the folder that contains your company repos, e.g. npm run commits -- \"D:\\projects-in-company\"");
  process.exit(1);
}

const git = (cwd, ...a) => execFileSync("git", a, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
const hasRef = (cwd, ref) => {
  try {
    git(cwd, "rev-parse", "--verify", "-q", ref);
    return true;
  } catch {
    return false;
  }
};

const repos = {};
for (const name of readdirSync(root).sort()) {
  const dir = join(root, name);
  if (!statSync(dir).isDirectory() || !existsSync(join(dir, ".git"))) continue;

  let ref = "HEAD";
  let branch;
  if (hasRef(dir, "origin/prod")) [ref, branch] = ["origin/prod", "prod"];
  else if (hasRef(dir, "prod")) [ref, branch] = ["prod", "prod"];
  else branch = git(dir, "rev-parse", "--abbrev-ref", "HEAD");

  const out = git(dir, "log", ref, "--no-merges", `--author=${author}`, `--since=${since}`, "--date=format:%Y-%m", "--format=%ad");
  const months = {};
  for (const m of out.split("\n").filter(Boolean).sort()) months[m] = (months[m] ?? 0) + 1;
  if (Object.keys(months).length === 0) continue;

  repos[name] = { branch, months };
  const total = Object.values(months).reduce((a, b) => a + b, 0);
  console.log(`${name.padEnd(32)} ${branch.padEnd(6)} ${String(total).padStart(5)} commits`);
}

const here = dirname(fileURLToPath(import.meta.url));
const target = resolve(here, "../src/data/commits.json");
const data = { author, generatedAt: new Date().toISOString().slice(0, 10), repos };
writeFileSync(target, JSON.stringify(data, null, 2) + "\n");
console.log(`\nWrote ${Object.keys(repos).length} repos to ${target}`);
