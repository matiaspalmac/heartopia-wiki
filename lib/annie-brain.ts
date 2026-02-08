
export interface AnnieEmotionalState {
  carino: number;
  curiosidad: number;
  cansancio: number;
}

export interface AnnieBehaviorMemory {
  totalVisits: number;
  sessionCount: number;
  searchCount: number;
  pageVisits: Record<string, number>;
  lastPaths: string[];
  sessionStartTime: number;
  lastNavTime: number;
  navTimings: number[];
  pagesThisSession: number;
}

const STORAGE_KEY_EMOTION = "annie_emotion";
const STORAGE_KEY_BEHAVIOR = "annie_behavior";
const STORAGE_KEY_SESSION = "annie_session_id";

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeSet(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch { }
}

const DEFAULT_EMOTION: AnnieEmotionalState = {
  carino: 20,
  curiosidad: 30,
  cansancio: 0,
};

const DEFAULT_BEHAVIOR: AnnieBehaviorMemory = {
  totalVisits: 0,
  sessionCount: 0,
  searchCount: 0,
  pageVisits: {},
  lastPaths: [],
  sessionStartTime: Date.now(),
  lastNavTime: Date.now(),
  navTimings: [],
  pagesThisSession: 0,
};

export function getEmotion(): AnnieEmotionalState {
  return safeGet(STORAGE_KEY_EMOTION, DEFAULT_EMOTION);
}

export function getBehavior(): AnnieBehaviorMemory {
  return safeGet(STORAGE_KEY_BEHAVIOR, DEFAULT_BEHAVIOR);
}

function clamp(v: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, v));
}

export function ensureSession() {
  const currentSession = sessionStorage.getItem(STORAGE_KEY_SESSION);
  if (!currentSession) {
    sessionStorage.setItem(STORAGE_KEY_SESSION, Date.now().toString());
    const b = getBehavior();
    b.sessionCount += 1;
    b.sessionStartTime = Date.now();
    b.searchCount = 0;
    b.pagesThisSession = 0;
    b.navTimings = [];
    safeSet(STORAGE_KEY_BEHAVIOR, b);

    if (b.totalVisits > 0) {
      const e = getEmotion();
      e.carino = clamp(e.carino + 8);
      e.cansancio = clamp(e.cansancio - 30);
      safeSet(STORAGE_KEY_EMOTION, e);
    }
  }
}

export function recordPageVisit(path: string) {
  const b = getBehavior();
  const now = Date.now();

  b.totalVisits += 1;
  b.pagesThisSession += 1;
  b.pageVisits[path] = (b.pageVisits[path] || 0) + 1;

  if (b.lastNavTime) {
    const delta = now - b.lastNavTime;
    b.navTimings = [...b.navTimings.slice(-9), delta];
  }
  b.lastNavTime = now;

  b.lastPaths = [...b.lastPaths.slice(-19), path];

  safeSet(STORAGE_KEY_BEHAVIOR, b);

  updateEmotionsFromBehavior(b);
}

export function recordSearch() {
  const b = getBehavior();
  b.searchCount += 1;
  safeSet(STORAGE_KEY_BEHAVIOR, b);

  const e = getEmotion();
  e.curiosidad = clamp(e.curiosidad + 3);
  safeSet(STORAGE_KEY_EMOTION, e);
}

function updateEmotionsFromBehavior(b: AnnieBehaviorMemory) {
  const e = getEmotion();

  const sessionMinutes = (Date.now() - b.sessionStartTime) / 60000;
  if (sessionMinutes > 15) {
    e.cansancio = clamp(e.cansancio + 2);
  }
  if (sessionMinutes > 30) {
    e.cansancio = clamp(e.cansancio + 3);
  }

  const currentPath = b.lastPaths[b.lastPaths.length - 1];
  if (currentPath && (b.pageVisits[currentPath] || 0) >= 3) {
    e.carino = clamp(e.carino + 2);
  }

  if (b.searchCount > 5) {
    e.curiosidad = clamp(e.curiosidad + 2);
  }

  if (b.pagesThisSession > 8) {
    e.carino = clamp(e.carino + 1);
  }

  safeSet(STORAGE_KEY_EMOTION, e);
}

export type ExplorationSpeed = "slow" | "normal" | "fast";

export function getExplorationSpeed(b: AnnieBehaviorMemory): ExplorationSpeed {
  if (b.navTimings.length < 3) return "normal";
  const avg = b.navTimings.reduce((a, c) => a + c, 0) / b.navTimings.length;
  if (avg < 5000) return "fast";
  if (avg > 20000) return "slow";
  return "normal";
}

export function isRepeatingPage(b: AnnieBehaviorMemory): boolean {
  const last3 = b.lastPaths.slice(-3);
  if (last3.length < 2) return false;
  const current = last3[last3.length - 1];
  return last3.filter((p) => p === current).length >= 2;
}

export function isHeavySearcher(b: AnnieBehaviorMemory): boolean {
  return b.searchCount >= 4;
}

export function isBrowsingWithoutSearch(b: AnnieBehaviorMemory): boolean {
  return b.pagesThisSession >= 5 && b.searchCount === 0;
}

export function getSessionMinutes(b: AnnieBehaviorMemory): number {
  return (Date.now() - b.sessionStartTime) / 60000;
}

export function isNightTime(): boolean {
  const hour = new Date().getHours();
  return hour < 6 || hour >= 22;
}

export function isLateNight(): boolean {
  const hour = new Date().getHours();
  return hour >= 0 && hour < 5;
}

export function getTimeOfDay(): "morning" | "afternoon" | "evening" | "night" {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return "morning";
  if (hour >= 12 && hour < 18) return "afternoon";
  if (hour >= 18 && hour < 22) return "evening";
  return "night";
}

const CATEGORY_NAMES: Record<string, string> = {
  "/wiki/peces": "los peces",
  "/wiki/insectos": "los insectos",
  "/wiki/aves": "las aves",
  "/wiki/animales": "los animales",
  "/wiki/cultivos": "los cultivos",
  "/wiki/recolectables": "los recolectables",
  "/wiki/habitantes": "los habitantes",
  "/wiki/recetas": "las recetas",
  "/wiki/logros": "los logros",
  "/wiki/codigos": "los codigos",
  "/eventos": "los eventos",
  "/guias": "las guias",
};

const ALL_CATEGORY_PATHS = Object.keys(CATEGORY_NAMES);

export function getSoftMission(b: AnnieBehaviorMemory, currentPath: string): string | null {
  const visitedCategories = new Set(
    Object.keys(b.pageVisits).filter((p) => ALL_CATEGORY_PATHS.includes(p))
  );
  const unvisited = ALL_CATEGORY_PATHS.filter((p) => !visitedCategories.has(p) && p !== currentPath);

  if (unvisited.length === 0) return null;

  const suggestion = unvisited[Math.floor(Math.random() * unvisited.length)];
  const name = CATEGORY_NAMES[suggestion];
  if (!name) return null;

  const templates = [
    `Hoy podrias explorar ${name}...`,
    `Todavia no has visitado ${name}. Te espero ahi.`,
    `Hay un rincon que no conoces: ${name}.`,
    `Si te animas, podemos ir a ver ${name}.`,
  ];
  return templates[Math.floor(Math.random() * templates.length)];
}
