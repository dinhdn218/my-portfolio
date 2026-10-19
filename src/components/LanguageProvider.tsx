"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { uiVi } from "@/data/ui-vi";
import { contentVi } from "@/data/content-vi";

type Language = "en" | "vi";
type Translator = (text: string, values?: Record<string, string | number>) => string;
const translations: Record<string, string> = { ...contentVi, ...uiVi };
const LanguageContext = createContext<{ language: Language; toggleLanguage: () => void; t: Translator } | null>(null);
let visitLanguage: Language | undefined;

function snapshot(): Language {
  if (visitLanguage) return visitLanguage;
  try { return localStorage.getItem("dnd-language") === "vi" ? "vi" : "en"; }
  catch { return "en"; }
}

function subscribe(notify: () => void) {
  const sync = () => { visitLanguage = undefined; notify(); };
  window.addEventListener("dnd-language-change", notify);
  window.addEventListener("storage", sync);
  return () => {
    window.removeEventListener("dnd-language-change", notify);
    window.removeEventListener("storage", sync);
  };
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(subscribe, snapshot, () => "en" as const);
  useEffect(() => { document.documentElement.lang = language; }, [language]);

  function toggleLanguage() {
    const next = language === "en" ? "vi" : "en";
    visitLanguage = next;
    try { localStorage.setItem("dnd-language", next); } catch { /* Keep the choice for this visit. */ }
    window.dispatchEvent(new Event("dnd-language-change"));
  }

  const t: Translator = (text, values) => {
    const translated = language === "vi" ? translations[text] ?? text : text;
    return translated.replace(/\{(\w+)\}/g, (match, key) => values?.[key] !== undefined ? String(values[key]) : match);
  };

  return <LanguageContext.Provider value={{ language, toggleLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be inside LanguageProvider");
  return context;
}

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  return (
    <button type="button" data-language-toggle onClick={toggleLanguage}
      aria-label={language === "en" ? "Switch to Vietnamese" : "Chuyển sang tiếng Anh"}
      title={language === "en" ? "Tiếng Việt" : "English"}
      className="inline-flex h-9 flex-none cursor-pointer items-center gap-1 rounded-[9px] border border-line bg-surface px-2 font-mono text-xs font-semibold hover:border-ink-3">
      <span lang="en" className={language === "en" ? "text-accent" : "text-ink-3"}>EN</span>
      <span aria-hidden="true" className="text-ink-3">/</span>
      <span lang="vi" className={language === "vi" ? "text-accent" : "text-ink-3"}>VI</span>
    </button>
  );
}
