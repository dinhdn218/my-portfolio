import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile, yearsOfExperience } from "@/data/profile";
import { companyProjects } from "@/data/projects";
import { commitSummary, level, monthRange, periodLabel, repoStats } from "@/lib/commits";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dnd-portfolio.vercel.app";
const summary = commitSummary();

export const alt = `${profile.name}, ${profile.role} in Hà Nội. Production log: ${summary.total.toLocaleString("en-US")} commits to prod across ${summary.repos} repositories.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Light-theme values from globals.css; the image is a PNG, so it cannot read the CSS variables. */
const c = {
  paper: "#f2f4f7",
  surface: "#ffffff",
  ink: "#111621",
  ink2: "#4a5464",
  ink3: "#778193",
  line: "#dadfe6",
  accent: "#2340d8",
  heat: ["#e5e9ef", "#c9d3fa", "#8fa3f3", "#516de6", "#2340d8"],
};

/** Static TTFs: the renderer behind next/og reads neither woff2 nor variable fonts. */
const font = (file: string) => readFile(join(process.cwd(), "src/assets/og", file));

export default async function OpenGraphImage() {
  const [display, sans, mono, monoMedium] = await Promise.all([
    font("archivo-expanded-800.ttf"),
    font("be-vietnam-pro-700.ttf"),
    font("jetbrains-mono-400.ttf"),
    font("jetbrains-mono-500.ttf"),
  ]);

  const months = monthRange();
  // Same row order as the heatmap on the page: by first month, so the career reads as a diagonal.
  const rows = companyProjects.map((p) => repoStats(p.repo, months)).sort((a, b) => a.first.localeCompare(b.first) || b.total - a.total);
  const stats = [
    [summary.total.toLocaleString("en-US"), "commits"],
    [String(summary.repos), "repositories"],
    [String(summary.months), "months"],
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 72px 58px",
          background: c.paper,
          color: c.ink,
          fontFamily: "Be Vietnam Pro",
        }}
      >
        <span style={{ fontFamily: "JetBrains Mono", fontSize: 20, letterSpacing: 1.6, textTransform: "uppercase", color: c.ink2 }}>
          {`${profile.location} · ${yearsOfExperience()} years building for the web`}
        </span>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "column", fontFamily: "Archivo", fontSize: 98, lineHeight: 1, letterSpacing: -2.4 }}>
              <span>{profile.nameLines[0]}</span>
              <span style={{ color: c.accent }}>{profile.nameLines[1]}</span>
            </div>
            <span style={{ marginTop: 30, fontSize: 36, fontWeight: 700, letterSpacing: -0.4 }}>{profile.role}</span>
            <span style={{ marginTop: 6, fontFamily: "JetBrains Mono", fontSize: 20, color: c.ink2 }}>{profile.roleNote}</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "24px 26px",
              background: c.surface,
              border: `1px solid ${c.line}`,
              borderRadius: 16,
            }}
          >
            <span style={{ fontFamily: "Archivo", fontSize: 22 }}>Production log</span>
            <span style={{ marginTop: 2, fontFamily: "JetBrains Mono", fontSize: 14, color: c.ink3 }}>
              {`Commits to prod · ${periodLabel(months[0], months[months.length - 1])}`}
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 18 }}>
              {rows.map((r, ri) => (
                <div key={ri} style={{ display: "flex", gap: 4 }}>
                  {r.series.map((v, ci) => (
                    <div key={ci} style={{ width: 13, height: 13, borderRadius: 3, background: c.heat[level(v)] }} />
                  ))}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 24, marginTop: 20 }}>
              {stats.map(([value, label]) => (
                <div key={label} style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontFamily: "Archivo", fontSize: 26, lineHeight: 1.1 }}>{value}</span>
                  <span style={{ fontFamily: "JetBrains Mono", fontSize: 14, color: c.ink2 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <span style={{ fontFamily: "JetBrains Mono", fontWeight: 500, fontSize: 21, color: c.accent }}>{new URL(siteUrl).host}</span>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: display, weight: 800, style: "normal" },
        { name: "Be Vietnam Pro", data: sans, weight: 700, style: "normal" },
        { name: "JetBrains Mono", data: mono, weight: 400, style: "normal" },
        { name: "JetBrains Mono", data: monoMedium, weight: 500, style: "normal" },
      ],
    },
  );
}
