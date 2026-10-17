import { profile, yearsOfExperience } from "@/data/profile";
import { CopyChip } from "./CopyChip";

const btn =
  "inline-flex items-center gap-2 rounded-[9px] border px-4 py-2.5 text-[15px] leading-tight font-semibold no-underline hover:no-underline";

export function Hero() {
  return (
    <section className="wrap pt-[clamp(44px,8vw,104px)] pb-[clamp(28px,4vw,44px)]">
      <p className="eyebrow text-ink-2">
        {profile.location} · {yearsOfExperience()} years building for the web
      </p>
      <h1 className="display mt-[18px] text-[clamp(44px,10vw,132px)] leading-none font-[850] tracking-[-0.025em]">
        {profile.nameLines[0]} <span className="block text-accent">{profile.nameLines[1]}</span>
      </h1>
      <p className="mt-[22px] flex flex-wrap items-baseline gap-x-4 gap-y-1.5">
        <span className="font-display text-[clamp(22px,2.4vw,28px)] font-bold tracking-[-0.01em]">{profile.role}</span>
        <span className="font-mono text-sm text-ink-2">{profile.roleNote}</span>
      </p>
      <p className="mt-[18px] max-w-[62ch] text-[19px] leading-relaxed text-ink-2">
        I build web products end to end and spend most of my effort on the <mark className="hl">interface</mark>. At{" "}
        {profile.company.name} I ship news platforms, a national KOL portal and an event SaaS, from the editor UI down to the API, the
        email pipeline and the database schema.
      </p>
      <div className="mt-7 flex flex-wrap items-center gap-2.5">
        <a href="#work" className={`${btn} border-accent bg-accent text-on-accent hover:brightness-110`}>
          See the work
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </a>
        <CopyChip value={profile.email} />
        <a href={profile.links.github} target="_blank" rel="noopener" className={`${btn} border-line bg-surface text-ink hover:border-ink-3`}>
          GitHub
        </a>
        <a href={profile.links.linkedin} target="_blank" rel="noopener" className={`${btn} border-line bg-surface text-ink hover:border-ink-3`}>
          LinkedIn
        </a>
        {profile.cvPath && (
          <a href={profile.cvPath} target="_blank" rel="noopener" className={`${btn} border-line bg-surface text-ink hover:border-ink-3`}>
            Download CV
          </a>
        )}
      </div>
    </section>
  );
}
