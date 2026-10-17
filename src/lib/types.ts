export type Bullet = { label: string; text: string };

export type ProjectCategory = "media" | "gov" | "saas" | "commerce" | "buddhist" | "internal";

export type CompanyProject = {
  /** Anchor id on the page, e.g. "netevent" → #p-netevent */
  id: string;
  /** Folder name of the git repo; must match a key in src/data/commits.json */
  repo: string;
  name: string;
  /** Short label shown in the production log */
  shortName?: string;
  kind: string;
  category: ProjectCategory;
  url?: string;
  /** Shown instead of a link when the product has no public URL */
  urlNote?: string;
  intro: string;
  bullets: Bullet[];
  stack: string[];
  extraFacts?: { label: string; value: string }[];
};

export type SideProject = {
  name: string;
  kind: string;
  live?: boolean;
  description: string;
  bullets: string[];
  stack: string[];
  links: { label: string; href: string }[];
};

export type Job = {
  period: string;
  current?: boolean;
  company: string;
  companyNote?: string;
  title: string;
  bullets: string[];
};

export type SkillGroup = { title: string; main?: boolean; items: string };
