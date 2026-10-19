"use client";

import { profile } from "@/data/profile";
import { LanguageToggle, useLanguage } from "./LanguageProvider";
import { ThemeToggle } from "./ThemeToggle";

const nav = [
  { href: "#work", label: "Work" },
  { href: "#side", label: "Side projects", wide: true },
  { href: "#experience", label: "Experience", wide: true },
  { href: "#skills", label: "Skills", wide: true },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const { t } = useLanguage();
  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-20 border-b border-line bg-[var(--bar-glass)] backdrop-blur-md backdrop-saturate-150">
      <div className="wrap flex min-h-[58px] items-center gap-2 sm:gap-4">
        <a href="#top" className="display text-[17px] font-extrabold tracking-[-0.01em] whitespace-nowrap text-ink no-underline">
          {profile.shortName}
          <span className="text-accent">.</span>
        </a>
        <nav aria-label={t("Sections")} className="ml-auto flex min-w-0 gap-0.5 overflow-x-auto [scrollbar-width:none]">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`rounded-[7px] px-1.5 py-1.5 text-[13px] font-medium whitespace-nowrap text-ink-2 no-underline hover:bg-accent-soft hover:text-ink sm:px-2.5 sm:text-sm ${item.wide ? "max-lg:hidden" : ""}`}
            >
              {t(item.label)}
            </a>
          ))}
        </nav>
        <div className="flex flex-none items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
