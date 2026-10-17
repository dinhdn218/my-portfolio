"use client";

export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    let current = root.getAttribute("data-theme");
    if (!current) current = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("dnd-theme", next);
    } catch {
      /* storage blocked: the choice lasts for this visit only */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark theme"
      className="grid size-9 flex-none cursor-pointer place-items-center rounded-[9px] border border-line bg-surface text-ink hover:border-ink-3"
    >
      <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9Z" />
      </svg>
    </button>
  );
}
