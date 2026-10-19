const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

// Evaluate data-only TS modules with the project's @ alias, without a test dependency.
const cache = new Map();
function load(filename) {
  if (cache.has(filename)) return cache.get(filename);
  if (filename.endsWith(".json")) return JSON.parse(fs.readFileSync(filename, "utf8"));
  const source = fs.readFileSync(filename, "utf8");
  const result = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } });
  const module = { exports: {} };
  cache.set(filename, module.exports);
  function requireData(specifier) {
    const base = specifier.startsWith("@/") ? path.resolve("src", specifier.slice(2)) : path.resolve(path.dirname(filename), specifier);
    return load(path.extname(base) ? base : `${base}.ts`);
  }
  new Function("require", "module", "exports", result.outputText)(requireData, module, module.exports);
  return module.exports;
}

const { contentVi } = load(path.resolve("src/data/content-vi.ts"));
const { uiVi } = load(path.resolve("src/data/ui-vi.ts"));
const dictionary = { ...contentVi, ...uiVi };
const check = (value) => {
  if (value) assert.ok(dictionary[value]?.trim(), `Missing Vietnamese translation: ${value}`);
};
const { companyProjects, categories } = load(path.resolve("src/data/projects.ts"));
for (const category of categories) check(category.label);
for (const project of companyProjects) {
  [project.kind, project.intro, project.urlNote].forEach(check);
  project.bullets.forEach((bullet) => { check(bullet.label); check(bullet.text); });
  project.extraFacts?.forEach((fact) => { check(fact.label); check(fact.value); });
}
const { sideProjects, earlierProjects } = load(path.resolve("src/data/side-projects.ts"));
for (const project of sideProjects) [project.kind, project.description, ...project.bullets].forEach(check);
earlierProjects.forEach((project) => { if (/[a-z]/i.test(project.note)) check(project.note); });
const { jobs, education, awards, skills } = load(path.resolve("src/data/experience.ts"));
jobs.forEach((job) => [job.title, job.period, ...job.bullets].forEach(check));
education.forEach((entry) => { check(entry.note); if (entry.name !== "Agile Academy") check(entry.name); });
awards.forEach((entry) => check(entry.name));
skills.forEach((entry) => { check(entry.title); check(entry.items); });

for (const filename of fs.readdirSync("src/components").filter((file) => file.endsWith(".tsx"))) {
  const source = ts.createSourceFile(filename, fs.readFileSync(path.join("src/components", filename), "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  function walk(node) {
    if (ts.isCallExpression(node) && node.expression.getText(source) === "t" && ts.isStringLiteral(node.arguments[0])) check(node.arguments[0].text);
    ts.forEachChild(node, walk);
  }
  walk(source);
}
for (const [english, vietnamese] of Object.entries(dictionary)) {
  const placeholders = (value) => [...value.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();
  assert.deepEqual(placeholders(vietnamese), placeholders(english), `Mismatched placeholders: ${english}`);
}
const { monthLabel, monthInitial, periodLabel } = load(path.resolve("src/lib/months.ts"));
assert.equal(monthLabel("2026-10", "vi"), "Tháng 10/2026");
assert.equal(monthInitial("2026-10", "vi"), "10");
assert.equal(periodLabel("2025-04", "2026-10", "vi"), "04/2025 – 10/2026");
assert.equal(periodLabel("2026-10", "2026-10", "vi"), "10/2026");
assert.equal(periodLabel("2026-07", "2026-10"), "Jul – Oct 2026");
console.log(`PASS: ${Object.keys(dictionary).length} translations, content coverage, placeholders, and localized dates`);
