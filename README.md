# App Studio 42 — website

Static, bilingual (pt-BR / en) site for **App Studio 42**, built with
[Astro](https://astro.build) and Tailwind CSS v4, deployed to GitHub Pages at
<https://appstudio42.github.io>.

Open-source apps with no tracking and no ads. Sister studios:
[Game Studio 42](https://gamestudio42.github.io) and
[ID42 Studio](https://id42studio.github.io).

No server, no runtime framework, no third-party requests or analytics.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Astro (static output) |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` + tokens in `src/styles/global.css` |
| Fonts | Self-hosted `@fontsource-variable` subsets (Outfit, Nunito Sans) |
| Copy / i18n | Typed dictionaries in `src/i18n/` (`pt-BR.ts`, `en.ts`) |
| Catalog | Typed product lines + apps in `src/data/products.ts` |
| SEO | Canonical + hreflang, Open Graph, JSON-LD, `@astrojs/sitemap`, `robots.txt` |
| Deploy | GitHub Actions → GitHub Pages (`upload-pages-artifact` + `deploy-pages`) |

## Commands

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview  # serve dist/ locally
npm run check    # astro check (types + template diagnostics)
npm run verify   # asserts on dist/: SEO, assets, i18n parity, budgets
npm run ship     # check + build + verify (what CI runs)
npm run assets   # re-render og.png, og-en.png and the app icons
```

## Structure

```
src/
  components/
    Landing.astro
    sections/           # Header, Hero, Principles, Lines, Sisters, Footer
    ui/                 # Brand, LocaleSwitch, SectionHead, ThemeToggle
  data/
    site.ts             # canonical URL, GitHub org, sister studios
    products.ts         # typed product lines + apps (URLs live here)
  i18n/                 # types + pt-BR / en copy
  layouts/Base.astro
  lib/seo.ts
  pages/
    index.astro         # pt-BR at /
    en/index.astro      # English at /en/
    404.astro
  scripts/site.ts       # progressive enhancement
  styles/global.css
public/
  fonts/                # latin variable woff2 (preloaded)
  screenshots/kidshome/ # real captures from the KidsHome repo
  media/                # setup.gif
  og.png, og-en.png, favicon.svg, icons, robots.txt, llms.txt
scripts/
  verify-site.mjs
  render-assets.sh
  og-card.html, icon-card.html
```

## Adding a product line or app

1. Edit `src/data/products.ts` — append a `ProductLine` or an `AppDefinition`.
   Keep repo and download URLs only in this file.
2. Add matching copy under `lines.catalog` in both `src/i18n/pt-BR.ts` and
   `src/i18n/en.ts` (same keys; TypeScript enforces the shared shape).
3. If the app has screenshots, drop them under `public/screenshots/<app-id>/`
   and reference the paths from the app entry.
4. Run `npm run ship` to type-check, build, and verify.

## GitHub Pages

After the first merge to `main`, set the repository Pages source to
**GitHub Actions** (Settings → Pages → Build and deployment → Source).

## License

MIT — see [LICENSE](./LICENSE).
