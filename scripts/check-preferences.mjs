import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// An isolated browser profile keeps these checks separate from personal browsing.
const profile = mkdtempSync(join(tmpdir(), "portfolio-preferences-"));
const port = 9600 + Math.floor(Math.random() * 300);
const proc = spawn("C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", [
  "--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  "--no-first-run", "about:blank",
], { stdio: "ignore", windowsHide: true });
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let ws;
try {
  let tabs;
  for (let i = 0; i < 60; i++) {
    try { tabs = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); break; }
    catch { await delay(100); }
  }
  assert.ok(tabs, "Headless browser started");
  ws = new WebSocket(tabs.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((resolve) => ws.addEventListener("open", resolve, { once: true }));
  let id = 0;
  const pending = new Map();
  const errors = [];
  ws.addEventListener("message", ({ data }) => {
    const msg = JSON.parse(data);
    if (msg.id) { pending.get(msg.id)?.(msg); pending.delete(msg.id); }
    if (msg.method === "Runtime.exceptionThrown") errors.push(msg.params.exceptionDetails.text);
    if (msg.method === "Log.entryAdded" && msg.params.entry.level === "error") errors.push(msg.params.entry.text);
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const n = ++id;
    pending.set(n, (msg) => msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result));
    ws.send(JSON.stringify({ id: n, method, params }));
  });
  const evaluate = async (expression) => {
    const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description ?? result.exceptionDetails.text);
    return result.result.value;
  };
  const until = async (expression) => {
    for (let i = 0; i < 100; i++) {
      if (await evaluate(expression)) return;
      await delay(100);
    }
    assert.fail(`Timed out: ${expression}\nPage: ${await evaluate('JSON.stringify({url: location.href, title: document.title, text: document.body?.innerText?.slice(0, 1200)})')}`);
  };
  const media = (value) => send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-color-scheme", value }] });
  const width = (value) => send("Emulation.setDeviceMetricsOverride", { width: value, height: 900, deviceScaleFactor: 1, mobile: value < 600 });
  await send("Runtime.enable");
  await send("Log.enable");
  await width(1280);
  await media("light");
  await send("Page.navigate", { url: process.argv[2] ?? "http://localhost:3000" });
  await until('document.readyState === "complete"');
  await until('Boolean(document.querySelector("[data-language-toggle]"))');
  assert.equal(await evaluate('document.documentElement.lang'), "en");
  await until('document.querySelector("[data-theme-toggle]").getAttribute("aria-label") === "Switch to dark theme"');
  assert.equal(await evaluate('getComputedStyle(document.querySelector("[data-theme-icon=moon]")).display !== "none"'), true);
  await media("dark");
  await until('document.querySelector("[data-theme-toggle]").getAttribute("aria-label") === "Switch to light theme"');
  assert.equal(await evaluate('getComputedStyle(document.querySelector("[data-theme-icon=sun]")).display !== "none"'), true);
  await evaluate('document.querySelector("[data-theme-toggle]").click()');
  assert.equal(await evaluate('localStorage.getItem("dnd-theme")'), "light");
  await evaluate('document.querySelector("[data-language-toggle]").click()');
  await until('document.documentElement.lang === "vi"');
  assert.equal(await evaluate('localStorage.getItem("dnd-language")'), "vi");
  assert.match(await evaluate('document.querySelector("#work-title").textContent'), /Sản phẩm/);
  assert.match(await evaluate('document.querySelector("#p-netevent").textContent'), /nền tảng/i);
  assert.match(await evaluate('document.querySelector("#experience").textContent'), /Lập trình/);
  assert.equal(await evaluate('document.querySelector("[data-theme-toggle]").getAttribute("aria-label")'), "Chuyển sang giao diện tối");
  assert.equal(await evaluate(`document.querySelector('a[href="/cv.pdf"]').textContent.trim()`), "Tải CV");
  await evaluate('location.reload()');
  await until('document.readyState === "complete" && document.documentElement.lang === "vi" && Boolean(document.querySelector("[data-language-toggle]"))');
  await until('document.querySelector("[data-theme-toggle]").getAttribute("aria-label") === "Chuyển sang giao diện tối"');
  assert.equal(await evaluate('document.documentElement.getAttribute("data-theme")'), "light");
  await evaluate('document.querySelector("[data-theme-toggle]").click()');
  await until('document.querySelector("[data-theme-toggle]").getAttribute("aria-label") === "Chuyển sang giao diện sáng"');
  assert.equal(await evaluate('getComputedStyle(document.querySelector("[data-theme-icon=sun]")).display !== "none"'), true);
  await evaluate('location.reload()');
  await until('document.readyState === "complete" && document.documentElement.lang === "vi" && document.querySelector("[data-theme-toggle]")?.getAttribute("aria-label") === "Chuyển sang giao diện sáng"');
  assert.equal(await evaluate('localStorage.getItem("dnd-theme")'), "dark");
  await evaluate('document.querySelector("[data-theme-toggle]").click()');
  await until('document.documentElement.getAttribute("data-theme") === "light"');
  for (const viewport of [320, 390, 640, 768, 1280]) {
    await width(viewport);
    await delay(100);
    assert.equal(await evaluate('document.documentElement.scrollWidth <= innerWidth'), true, `No page overflow at ${viewport}px`);
    assert.equal(await evaluate('document.querySelector("header").scrollWidth <= innerWidth'), true, `Header fits at ${viewport}px`);
    if ([390, 1280].includes(viewport)) {
      const shot = await send("Page.captureScreenshot", { format: "png" });
      writeFileSync(join(tmpdir(), `portfolio-vi-${viewport}.png`), Buffer.from(shot.data, "base64"));
    }
  }
  await evaluate('document.querySelector("[data-language-toggle]").click()');
  await until('document.documentElement.lang === "en"');
  assert.match(await evaluate('document.querySelector("#work-title").textContent'), /Products I shipped/);
  await evaluate(`document.querySelector('[aria-label="Filter projects"] button:nth-child(3)').click()`);
  assert.equal(await evaluate('document.querySelector("#p-netevent").hidden'), true);
  await evaluate('document.querySelector("[data-language-toggle]").click()');
  await until('document.documentElement.lang === "vi"');
  assert.equal(await evaluate('document.querySelector("#p-netevent").hidden'), true, "Changing language preserves project filters");
  assert.deepEqual(errors, [], "No browser runtime or hydration errors");
  console.log("PASS: theme icons/system changes, EN/VI content, saved preferences, reload, responsive widths, and browser errors");
} finally {
  ws?.close();
  proc.kill();
}
