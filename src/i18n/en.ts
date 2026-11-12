import type { SiteContent } from "./types";

export const en: SiteContent = {
  meta: {
    title: "App Studio 42 — open-source apps with no tracking",
    description:
      "App Studio 42 builds open-source apps with no ads and no tracking. We start with the Family line: KidsHome and safe apps for kids and families.",
    ogLocale: "en_US",
  },
  a11y: {
    skip: "Skip to content",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    themeToLight: "Use light theme",
    themeToDark: "Use dark theme",
  },
  brand: {
    name: "App Studio 42",
    wordmark: "App Studio 42",
  },
  nav: [
    { label: "Principles", href: "#principles" },
    { label: "Lines", href: "#lines" },
    { label: "KidsHome", href: "#kidshome" },
    { label: "Studios", href: "#studios" },
  ],
  hero: {
    brand: "App Studio 42",
    title: "Open-source apps.\nNo tracking.\nMade for real life.",
    tagline:
      "An open-source app studio for everyday life — no ads, no analytics, with code you can audit.",
    ctaPrimary: "Meet KidsHome",
    ctaSecondary: "View on GitHub",
  },
  principles: {
    index: "01",
    eyebrow: "Principles",
    title: "Made with care, built to trust.",
    subtitle:
      "Every app starts from the same rules: open code, local data, and distribution you control.",
    items: [
      {
        id: "open-source",
        title: "Open source",
        text: "Public code, clear licenses, and welcome contributions. You can read, fork, and audit.",
      },
      {
        id: "privacy",
        title: "Privacy first",
        text: "Offline and local data whenever possible. No analytics, no trackers, no hidden telemetry.",
      },
      {
        id: "free",
        title: "Free and auditable",
        text: "Use it without paying and without surprises. What the app does is in the code — not an opaque policy.",
      },
      {
        id: "distribute",
        title: "Releases, and soon F-Droid",
        text: "Download from GitHub Releases today. F-Droid publishing is on the way.",
      },
    ],
  },
  lines: {
    index: "02",
    eyebrow: "Product lines",
    title: "We start with family. More lines come later.",
    subtitle:
      "Each line groups apps for the same audience. Family is first; Utilities and Productivity will follow.",
    availableLabel: "Available",
    plannedLabel: "Planned",
    catalog: {
      family: {
        name: "Family",
        tagline: "Kids and family",
        description:
          "Safe devices, screen time, routines, and age-appropriate AI — with parents in control.",
        apps: {
          kidshome: {
            name: "KidsHome",
            tagline: "Kids launcher for Android and Fire",
            description:
              "Turns a tablet or phone into a safe home for kids: allowed apps only, a daily screen-time limit, and a PIN-protected parent area. Works on Amazon Fire tablets (accessibility mode), as the default launcher on regular Android, and as a Device Owner kiosk.",
            features: {
              pin: {
                title: "PIN-protected parent area",
                text: "Emergency escape and settings locked behind a PIN, with lockout after failed attempts.",
              },
              timeRing: {
                title: "Daily limit with a time ring",
                text: "Remaining time shows on the home screen ring. When it runs out, the home locks gently.",
              },
              allowedApps: {
                title: "Allowed apps only",
                text: "Build the grid with what your child can use. Everything else stays out of reach.",
              },
              material: {
                title: "Material 3 pastels",
                text: "Cheerful UI in 5 languages (en, pt-BR, es, fr, de), with light and dark parent themes.",
              },
            },
            upcoming: {
              schedules: "Schedules and day windows",
              perApp: "Per-app limits",
              stars: "Earn-time stars",
              report: "Local weekly report",
            },
            modes: {
              fire: "Amazon Fire via accessibility",
              launcher: "Default launcher on Android",
              kiosk: "Device Owner kiosk",
            },
            screenshots: {
              kidHome: "Kid home with apps and time ring",
              screenTime: "Screen-time and bedtime settings",
              allowedApps: "Allowed apps picker",
              pin: "Parent area PIN keypad",
            },
            ctaDownload: "Download APK",
            ctaRepo: "View repository",
            upcomingLabel: "Coming in 1.4.0",
            modesLabel: "Protection modes",
            setupCaption: "Setup flow — PIN, apps, screen time, and kid mode",
          },
        },
        roadmapTitle: "Coming next in Family",
        roadmapHint: "Planned — not available yet",
        roadmap: {
          "kidshome-tv": {
            title: "KidsHome TV",
            text: "Profiles and screen time for Android TV and Fire TV.",
          },
          "kid-safe-ai": {
            title: "Kid-safe AI assistant",
            text: "Age-appropriate, parent-controlled, local or bring-your-own-key — no child data collected.",
          },
          routines: {
            title: "Visual routines with stars",
            text: "A visual daily-routine app with star rewards.",
          },
          "fire-setup-kit": {
            title: "Fire tablet setup kit",
            text: "Guides and tools to prepare Fire tablets in minutes.",
          },
        },
      },
    },
  },
  sisters: {
    eyebrow: "The 42 family",
    title: "Three studios, the same open-source spirit.",
    subtitle: "App Studio 42 builds everyday apps. Sister studios cover games and B2B engineering.",
    items: {
      gamestudio42: {
        blurb: "Open-source games for browser, desktop, and mobile.",
      },
      id42studio: {
        blurb: "B2B software and AI engineering.",
      },
    },
  },
  footer: {
    tagline: "Open-source apps with no tracking.",
    org: "GitHub organization",
    license: "MIT License",
    sistersLabel: "Sister studios",
    rights: "App Studio 42. Site code under MIT.",
  },
  notFound: {
    title: "Page not found",
    text: "That path does not exist on this site.",
    cta: "Back to home",
  },
};
