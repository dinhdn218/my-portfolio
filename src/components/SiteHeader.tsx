import { profile } from "@/data/profile";
import { ThemeToggle } from "./ThemeToggle";

const nav = [
  { href: "#work", label: "Work" },
  { href: "#side", label: "Side projects", wide: true },
  { href: "#experience", label: "Experience", wide: true },
  { href: "#skills", label: "Skills", wide: true },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-20 border-b border-line bg-[var(--bar-glass)] backdrop-blur-md backdrop-saturate-150">
      <div className="wrap flex min-h-[58px] items-center gap-5">
        <a href="#top" className="display text-[17px] font-extrabold tracking-[-0.01em] whitespace-nowrap text-ink no-underline">
          {profile.shortName}
          <span className="text-accent">.</span>
        </a>
        <nav aria-label="Sections" className="ml-auto flex min-w-0 gap-1 overflow-x-auto [scrollbar-width:none]">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`rounded-[7px] px-2.5 py-1.5 text-sm font-medium whitespace-nowrap text-ink-2 no-underline hover:bg-accent-soft hover:text-ink ${item.wide ? "max-sm:hidden" : ""}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
