import { site } from "../data/site";
import { allAvailableApps, productLines } from "../data/products";
import { getContent, htmlLang, pagePath, type Locale, type SiteContent } from "../i18n";

export interface SeoInput {
  locale: Locale;
  /** Canonical path for this page. Defaults to the locale root. */
  path?: string;
  title?: string;
  description?: string;
  noindex?: boolean;
}

export interface Seo {
  content: SiteContent;
  lang: string;
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  alternates: { hreflang: string; href: string }[];
  robots: string;
  schema: Record<string, unknown>;
}

/** Single source of truth for everything that goes into <head>. */
export function buildSeo({ locale, path, title, description, noindex = false }: SeoInput): Seo {
  const content = getContent(locale);
  const canonical = new URL(path ?? pagePath(locale), site.url).href;

  return {
    content,
    lang: htmlLang(locale),
    title: title ?? content.meta.title,
    description: description ?? content.meta.description,
    canonical,
    ogImage: `${site.url}${locale === "en" ? "/og-en.png" : "/og.png"}`,
    alternates: [
      { hreflang: "pt-BR", href: `${site.url}/` },
      { hreflang: "en", href: `${site.url}/en/` },
      { hreflang: "x-default", href: `${site.url}/` },
    ],
    robots: noindex
      ? "noindex, follow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    schema: buildSchema(content, locale),
  };
}

/** Organization + WebSite + available apps, as a single @graph. */
function buildSchema(content: SiteContent, locale: Locale): Record<string, unknown> {
  const organization = {
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    description: content.meta.description,
    sameAs: [site.githubOrg, ...site.sisters.map((sister) => sister.url)],
    knowsAbout: [
      "Open-source software",
      "Consumer apps",
      "Family apps",
      "Kids launchers",
      "Privacy-first software",
      "Android",
      "Screen time",
    ],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: ["pt-BR", "en"],
    publisher: { "@id": `${site.url}/#organization` },
  };

  const apps = allAvailableApps().map((app, index) => {
    const line = productLines.find((entry) => entry.apps.some((item) => item.id === app.id));
    const lineCopy = line ? content.lines.catalog[line.id] : undefined;
    const appCopy = lineCopy?.apps[app.id];

    return {
      "@type": "SoftwareApplication",
      "@id": `${site.url}/#app-${app.id}`,
      name: appCopy?.name ?? app.id,
      description: appCopy?.description,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Android",
      url: app.links.repo,
      downloadUrl: app.links.download,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      position: index + 1,
    };
  });

  const productList = {
    "@type": "ItemList",
    "@id": `${site.url}/#products`,
    name: locale === "en" ? "Apps" : "Apps",
    itemListElement: apps.map((app, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: { "@id": app["@id"] },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website, productList, ...apps],
  };
}
