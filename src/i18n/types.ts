export type Locale = "pt-BR" | "en";

export interface NavLink {
  label: string;
  href: string;
}

export interface Principle {
  id: string;
  title: string;
  text: string;
}

export interface AppCopy {
  name: string;
  tagline: string;
  description: string;
  features: Record<string, { title: string; text: string }>;
  upcoming?: Record<string, string>;
  modes?: Record<string, string>;
  screenshots: Record<string, string>;
  ctaDownload: string;
  ctaRepo: string;
  upcomingLabel: string;
  modesLabel: string;
  setupCaption?: string;
}

export interface RoadmapCopy {
  title: string;
  text: string;
}

export interface LineCopy {
  name: string;
  tagline: string;
  description: string;
  apps: Record<string, AppCopy>;
  roadmapTitle: string;
  roadmapHint: string;
  roadmap: Record<string, RoadmapCopy>;
}

export interface SiteContent {
  meta: {
    title: string;
    description: string;
    ogLocale: string;
  };
  a11y: {
    skip: string;
    menuOpen: string;
    menuClose: string;
    themeToLight: string;
    themeToDark: string;
  };
  brand: {
    name: string;
    wordmark: string;
  };
  nav: NavLink[];
  hero: {
    brand: string;
    title: string;
    tagline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  principles: {
    index: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Principle[];
  };
  lines: {
    index: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    availableLabel: string;
    plannedLabel: string;
    catalog: Record<string, LineCopy>;
  };
  sisters: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Record<string, { blurb: string }>;
  };
  footer: {
    tagline: string;
    org: string;
    license: string;
    sistersLabel: string;
    rights: string;
  };
  notFound: {
    title: string;
    text: string;
    cta: string;
  };
}
