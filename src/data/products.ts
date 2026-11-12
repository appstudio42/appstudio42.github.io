/**
 * Typed catalog of product lines and apps.
 *
 * To add a new line: append a ProductLine entry here, then add matching
 * copy under `lines` in both i18n dictionaries.
 *
 * To add a new app: append an App entry to the line's `apps` array and
 * add matching copy under that line's `apps` map in both i18n files.
 *
 * Repo / download URLs live only here so a future org move is a one-line edit.
 */

export type AppStatus = "available" | "planned";

export interface AppLinks {
  /** Canonical repository URL (single source of truth). */
  repo: string;
  /** Latest release / download page. */
  download?: string;
}

export interface AppScreenshot {
  /** Path under /public, e.g. /screenshots/kidshome/01-kid-home.png */
  src: string;
  /** i18n key looked up under the app's `screenshots` map. */
  altKey: string;
}

export interface AppDefinition {
  id: string;
  status: AppStatus;
  /** Accent used for the app card (CSS custom property name). */
  accent: "coral" | "mint" | "sky" | "sun" | "lilac";
  links: AppLinks;
  /** Optional hero media under /public. */
  setupMedia?: string;
  screenshots?: AppScreenshot[];
  /** Feature keys looked up in i18n under the app's `features` map. */
  featureKeys: string[];
  /** Upcoming feature keys looked up under the app's `upcoming` map. */
  upcomingKeys?: string[];
  /** Platform / mode keys looked up under the app's `modes` map. */
  modeKeys?: string[];
}

export interface RoadmapItem {
  id: string;
  /** Accent for the roadmap tile. */
  accent: "coral" | "mint" | "sky" | "sun" | "lilac";
}

export interface ProductLine {
  id: string;
  /** Accent used for the line badge. */
  accent: "coral" | "mint" | "sky" | "sun" | "lilac";
  apps: AppDefinition[];
  roadmap: RoadmapItem[];
}

/**
 * KidsHome currently lives under marcelsavegnago; it will move to
 * github.com/appstudio42/KidsHome. Keep both URLs here only.
 */
const KIDSHOME_REPO = "https://github.com/marcelsavegnago/KidsHome";
const KIDSHOME_DOWNLOAD = `${KIDSHOME_REPO}/releases/latest`;

export const productLines: ProductLine[] = [
  {
    id: "family",
    accent: "coral",
    apps: [
      {
        id: "kidshome",
        status: "available",
        accent: "coral",
        links: {
          repo: KIDSHOME_REPO,
          download: KIDSHOME_DOWNLOAD,
        },
        setupMedia: "/media/kidshome-setup.gif",
        screenshots: [
          { src: "/screenshots/kidshome/hero-kid-home.png", altKey: "kidHome" },
          { src: "/screenshots/kidshome/05-screen-time-settings.png", altKey: "screenTime" },
          { src: "/screenshots/kidshome/07-allowed-apps.png", altKey: "allowedApps" },
          { src: "/screenshots/kidshome/03-pin-entry.png", altKey: "pin" },
        ],
        featureKeys: ["pin", "timeRing", "allowedApps", "material"],
        upcomingKeys: ["schedules", "perApp", "stars", "report"],
        modeKeys: ["fire", "launcher", "kiosk"],
      },
    ],
    roadmap: [
      { id: "kidshome-tv", accent: "sky" },
      { id: "kid-safe-ai", accent: "lilac" },
      { id: "routines", accent: "sun" },
      { id: "fire-setup-kit", accent: "mint" },
    ],
  },
];

/** Flat lookup helpers. */
export function getLine(id: string): ProductLine | undefined {
  return productLines.find((line) => line.id === id);
}

export function getApp(lineId: string, appId: string): AppDefinition | undefined {
  return getLine(lineId)?.apps.find((app) => app.id === appId);
}

export function allAvailableApps(): AppDefinition[] {
  return productLines.flatMap((line) => line.apps.filter((app) => app.status === "available"));
}
