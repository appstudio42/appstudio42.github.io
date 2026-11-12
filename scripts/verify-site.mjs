#!/usr/bin/env node
/**
 * Post-build verification gate for App Studio 42.
 *
 * Asserts both locales, SEO, structured data, assets on disk, no external
 * requests, i18n parity, and a sane first-load budget.
 */
import { readFileSync, statSync, existsSync, readdirSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

const failures = [];
const checks = [];

function check(name, fn) {
  try {
    const detail = fn();
    checks.push({ ok: true, name, detail });
  } catch (error) {
    checks.push({ ok: false, name, detail: error.message });
    failures.push(`${name}: ${error.message}`);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const read = (file) => readFileSync(join(dist, file), "utf8");

function count(html, regex) {
  return (html.match(regex) ?? []).length;
}

function meta(html, attribute, value) {
  const pattern = new RegExp(
    `<meta[^>]*${attribute}="${value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^>]*content="([^"]*)"`,
    "i",
  );
  const match = html.match(pattern);
  if (match) return match[1];
  const reversed = new RegExp(
    `<meta[^>]*content="([^"]*)"[^>]*${attribute}="${value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`,
    "i",
  );
  return reversed.exec(html)?.[1];
}

function link(html, rel) {
  const pattern = new RegExp(`<link[^>]*rel="${rel}"[^>]*href="([^"]*)"`, "i");
  return pattern.exec(html)?.[1];
}

const SITE = "https://appstudio42.github.io";

const pages = [
  { file: "index.html", lang: "pt-BR", canonical: `${SITE}/`, robotsIndex: true },
  { file: "en/index.html", lang: "en", canonical: `${SITE}/en/`, robotsIndex: true },
];

const anchorsByLocale = {
  "index.html": ["inicio", "principios", "linhas", "kidshome", "estudios"],
  "en/index.html": ["home", "principles", "lines", "kidshome", "studios"],
};

check("both locales rendered", () => {
  for (const page of pages) assert(existsSync(join(dist, page.file)), `${page.file} missing`);
  return `${pages.length} pages`;
});

check("404 page rendered", () => {
  assert(existsSync(join(dist, "404.html")), "404.html missing");
  const html = read("404.html");
  assert(/noindex/i.test(meta(html, "name", "robots") ?? ""), "404 must be noindex");
  return "noindex ok";
});

for (const page of pages) {
  check(`${page.file}: document basics`, () => {
    const html = read(page.file);
    assert(html.includes(`<html lang="${page.lang}"`), `expected lang=${page.lang}`);
    assert(count(html, /<h1[\s>]/g) === 1, "expected exactly one <h1>");
    assert((link(html, "canonical") ?? "") === page.canonical, "canonical mismatch");

    const title = /<title>([^<]*)<\/title>/.exec(html)?.[1] ?? "";
    assert(title.length >= 15 && title.length <= 70, `title length ${title.length}`);

    const description = meta(html, "name", "description") ?? "";
    assert(
      description.length >= 70 && description.length <= 180,
      `description length ${description.length}`,
    );

    const robots = meta(html, "name", "robots") ?? "";
    assert(page.robotsIndex ? robots.includes("index") : robots.includes("noindex"), "robots directive wrong");
    return `${title.length}c title, ${description.length}c description`;
  });

  check(`${page.file}: social + alternates`, () => {
    const html = read(page.file);
    for (const tag of ["og:title", "og:description", "og:url", "og:image", "twitter:card"]) {
      assert(meta(html, "property", tag) || meta(html, "name", tag), `missing ${tag}`);
    }

    const hreflangs = [...html.matchAll(/hreflang="([^"]+)"/g)].map((m) => m[1]).sort();
    assert(
      ["en", "pt-BR", "x-default"].every((value) => hreflangs.includes(value)),
      `hreflang set incomplete: ${hreflangs.join(", ")}`,
    );

    const image = meta(html, "property", "og:image") ?? "";
    const imagePath = image.replace(`${SITE}/`, "");
    assert(existsSync(join(dist, imagePath)), `og image missing: ${imagePath}`);
    return imagePath;
  });

  check(`${page.file}: sections`, () => {
    const html = read(page.file);
    const anchors = anchorsByLocale[page.file];
    const missing = anchors.filter((id) => !html.includes(`id="${id}"`));
    assert(missing.length === 0, `missing ids: ${missing.join(", ")}`);

    const duplicates = [...html.matchAll(/\sid="([^"]+)"/g)]
      .map((match) => match[1])
      .filter((id, index, all) => all.indexOf(id) !== index);
    assert(duplicates.length === 0, `duplicate ids: ${[...new Set(duplicates)].join(", ")}`);
    return `${anchors.length} sections`;
  });

  check(`${page.file}: internal links resolve`, () => {
    const html = read(page.file);
    const targets = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
    const refs = [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
    const broken = [...new Set(refs)].filter((ref) => !targets.has(ref));
    assert(broken.length === 0, `broken anchors: ${broken.join(", ")}`);
    return `${new Set(refs).size} anchors`;
  });

  check(`${page.file}: structured data`, () => {
    const html = read(page.file);
    const raw = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(html)?.[1];
    assert(raw, "no JSON-LD block");
    const data = JSON.parse(raw);
    const types = data["@graph"].map((node) => node["@type"]);
    assert(types.includes("Organization") && types.includes("WebSite"), `graph types: ${types.join(", ")}`);
    assert(types.includes("SoftwareApplication"), "missing SoftwareApplication");
    return types.join(" + ");
  });

  check(`${page.file}: product content`, () => {
    const html = read(page.file);
    assert(html.includes("KidsHome"), "KidsHome missing");
    assert(html.includes("appstudio42/KidsHome"), "KidsHome repo URL missing");
    assert(!html.includes("marcelsavegnago/KidsHome"), "old KidsHome owner URL still present");
    assert(html.includes("gamestudio42.github.io"), "Game Studio link missing");
    assert(html.includes("id42studio.github.io"), "ID42 Studio link missing");
    return "apps + sisters";
  });
}

check("every referenced asset exists", () => {
  const html = `${read("index.html")}${read("en/index.html")}`;
  const urls = new Set(
    [...html.matchAll(/(?:href|src)="(\/[^"#?]+)"/g)]
      .map((match) => match[1])
      .filter((url) => !url.endsWith("/"))
      .filter((url) => !url.startsWith("//")),
  );

  const missing = [...urls].filter((url) => !existsSync(join(dist, url)));
  assert(missing.length === 0, `missing on disk: ${missing.join(", ")}`);
  return `${urls.size} assets`;
});

check("no external requests", () => {
  const html = `${read("index.html")}${read("en/index.html")}`;
  const resourcePatterns = [
    /<script[^>]*\ssrc="([^"]+)"/g,
    /<link[^>]*\shref="([^"]+)"/g,
    /<img[^>]*\ssrc="([^"]+)"/g,
    /<iframe[^>]*\ssrc="([^"]+)"/g,
  ];

  const external = resourcePatterns
    .flatMap((pattern) => [...html.matchAll(pattern)].map((match) => match[1]))
    .filter((url) => /^(https?:)?\/\//.test(url))
    .filter((url) => !url.startsWith(`${SITE}/`));

  assert(external.length === 0, `external resources: ${external.join(", ")}`);
  return "self-hosted only";
});

check("no analytics or trackers", () => {
  const html = `${read("index.html")}${read("en/index.html")}`.toLowerCase();
  const banned = ["google-analytics", "gtag(", "googletagmanager", "plausible", "segment.com", "hotjar", "facebook.net"];
  for (const term of banned) {
    assert(!html.includes(term), `found ${term}`);
  }
  return "clean";
});

check("sitemap lists both locales", () => {
  const sitemap = read("sitemap-0.xml");
  assert(sitemap.includes(`${SITE}/`), "missing pt-BR url");
  assert(sitemap.includes(`${SITE}/en/`), "missing en url");
  return "2 urls";
});

check("robots.txt points at the sitemap", () => {
  const robots = read("robots.txt");
  assert(/Sitemap: https:\/\/appstudio42\.github\.io\/sitemap-index\.xml/.test(robots), "sitemap line missing");
  return "ok";
});

check("page weight budget", () => {
  const html = read("index.html");
  const gz = gzipSync(Buffer.from(html)).length;
  assert(gz < 40 * 1024, `index.html is ${(gz / 1024).toFixed(1)} KB gzipped (budget 40)`);

  const inlineCss = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].reduce(
    (total, match) => total + match[1].length,
    0,
  );

  const cssDir = join(dist, "_astro");
  const externalCss = existsSync(cssDir)
    ? readdirSync(cssDir)
        .filter((file) => file.endsWith(".css"))
        .reduce((total, file) => total + statSync(join(cssDir, file)).size, 0)
    : 0;

  const css = inlineCss + externalCss;
  assert(css < 90 * 1024, `CSS is ${(css / 1024).toFixed(1)} KB (budget 90)`);

  const fontDir = join(dist, "fonts");
  const fonts = existsSync(fontDir)
    ? readdirSync(fontDir)
        .filter((file) => file.endsWith(".woff2"))
        .reduce((total, file) => total + statSync(join(fontDir, file)).size, 0)
    : 0;
  assert(fonts < 120 * 1024, `fonts are ${(fonts / 1024).toFixed(1)} KB (budget 120)`);

  return `html ${(gz / 1024).toFixed(1)} KB gz · css ${(css / 1024).toFixed(1)} KB · fonts ${(fonts / 1024).toFixed(1)} KB`;
});

function shapeKeys(value, prefix = "") {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      typeof item === "object" && item !== null ? shapeKeys(item, `${prefix}[${index}]`) : [],
    );
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) =>
      child && typeof child === "object" ? shapeKeys(child, `${prefix}${key}.`) : [`${prefix}${key}`],
    );
  }
  return [prefix.replace(/\.$/, "")];
}

const [{ ptBR }, { en }] = await Promise.all([
  import(pathToFileURL(join(root, "src/i18n/pt-BR.ts")).href),
  import(pathToFileURL(join(root, "src/i18n/en.ts")).href),
]);

check("locales have identical shape", () => {
  const ptKeys = shapeKeys(ptBR).sort();
  const enKeys = shapeKeys(en).sort();

  const missingInEn = ptKeys.filter((key) => !enKeys.includes(key));
  const missingInPt = enKeys.filter((key) => !ptKeys.includes(key));

  assert(
    missingInEn.length === 0 && missingInPt.length === 0,
    `missing in en: [${missingInEn.join(", ")}] · missing in pt-BR: [${missingInPt.join(", ")}]`,
  );

  const lookup = (source, key) =>
    key
      .replace(/\[(\d+)\]/g, ".$1")
      .split(".")
      .reduce((node, part) => (node == null ? node : node[part]), source);

  const empty = enKeys.filter((key) =>
    [ptBR, en].some((source) => {
      const value = lookup(source, key);
      return typeof value === "string" && value.trim() === "";
    }),
  );

  assert(empty.length === 0, `empty strings: ${empty.join(", ")}`);
  return `${ptKeys.length} keys`;
});

const { productLines } = await import(pathToFileURL(join(root, "src/data/products.ts")).href);

check("product catalog is wired", () => {
  assert(productLines.length >= 1, "expected at least one product line");
  const family = productLines.find((line) => line.id === "family");
  assert(family, "family line missing");
  assert(family.apps.some((app) => app.id === "kidshome"), "kidshome missing");
  assert(family.roadmap.length >= 4, "family roadmap incomplete");
  for (const line of productLines) {
    assert(ptBR.lines.catalog[line.id], `pt-BR missing line ${line.id}`);
    assert(en.lines.catalog[line.id], `en missing line ${line.id}`);
    for (const app of line.apps) {
      assert(ptBR.lines.catalog[line.id].apps[app.id], `pt-BR missing app ${app.id}`);
      assert(en.lines.catalog[line.id].apps[app.id], `en missing app ${app.id}`);
    }
    for (const item of line.roadmap) {
      assert(ptBR.lines.catalog[line.id].roadmap[item.id], `pt-BR missing roadmap ${item.id}`);
      assert(en.lines.catalog[line.id].roadmap[item.id], `en missing roadmap ${item.id}`);
    }
  }
  return `${productLines.length} lines`;
});

for (const entry of checks) {
  const mark = entry.ok ? "✓" : "✗";
  console.log(`${mark} ${entry.name}${entry.detail ? ` — ${entry.detail}` : ""}`);
}

if (failures.length > 0) {
  console.error(`\n${failures.length} check(s) failed.`);
  process.exit(1);
}

console.log(`\nAll ${checks.length} checks passed.`);
