"use client";

import { profile } from "@/data/profile";
import { useLanguage } from "./LanguageProvider";
import { SectionHead } from "./SectionHead";

export function WorkIntro() {
  const { t, language } = useLanguage();
  return (
    <SectionHead id="work-title"
      eyebrow={t("{company} · {since} – now", { company: profile.company.name, since: language === "vi" ? "04/2025" : profile.company.since })}
      title={t("Products I shipped at {company}", { company: profile.company.name })}>
      {t("{company} ({legalName}) builds media, PR and creator-economy products in Hà Nội. Each feature list below comes from my own commits on the production branch.", {
        company: profile.company.name, legalName: profile.company.legalName,
      })}
    </SectionHead>
  );
}
