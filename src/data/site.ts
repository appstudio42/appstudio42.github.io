/**
 * Site-wide configuration: canonical URL, org links and sister studios.
 * Single source of truth for the whole page.
 */
export const site = {
  url: "https://appstudio42.github.io",
  name: "App Studio 42",
  legalName: "App Studio 42",
  githubOrg: "https://github.com/appstudio42",
  license: "MIT",
  licenseUrl: "https://github.com/appstudio42/appstudio42.github.io/blob/main/LICENSE",
  locale: "pt-BR",
  themeColorLight: "#FFF8F3",
  themeColorDark: "#1A1C24",
  sisters: [
    {
      id: "gamestudio42",
      name: "Game Studio 42",
      url: "https://gamestudio42.github.io",
    },
    {
      id: "id42studio",
      name: "ID42 Studio",
      url: "https://id42studio.github.io",
    },
  ],
} as const;

/** Path for a locale: pt-BR lives at the root, English under /en/. */
export const pathFor = (locale: "pt-BR" | "en", hash = ""): string =>
  locale === "en" ? `/en/${hash}` : `/${hash}`;
