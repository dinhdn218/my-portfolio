"use client";

import { useSyncExternalStore } from "react";
import { useLanguage } from "./LanguageProvider";

function isDark() {
  const theme = document.documentElement.getAttribute("data-theme");
  return theme === "dark" || (theme !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches);
}

function subscribe(notify: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const observer = new MutationObserver(notify);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const sync = (event: StorageEvent) => {
    if (event.key !== "dnd-theme" && event.key !== null) return;
    if (event.newValue === "dark" || event.newValue === "light") document.documentElement.setAttribute("data-theme", event.newValue);
    else document.documentElement.removeAttribute("data-theme");
  };
  media.addEventListener("change", notify);
  window.addEventListener("storage", sync);
  return () => {
    observer.disconnect();
    media.removeEventListener("change", notify);
    window.removeEventListener("storage", sync);
  };
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);
  const { t } = useLanguage();
  const label = t(dark ? "Switch to light theme" : "Switch to dark theme");
  function toggle() {
    const root = document.documentElement;
    const next = isDark() ? "light" : "dark";
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
      data-theme-toggle
      onClick={toggle}
      aria-label={label}
      title={label}
      className="grid size-9 flex-none cursor-pointer place-items-center rounded-[9px] border border-line bg-surface text-ink hover:border-ink-3"
    >
      <svg data-theme-icon="moon" viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9Z" />
      </svg>
      <svg data-theme-icon="sun" viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
      </svg>
    </button>
  );
}
