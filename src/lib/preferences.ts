export interface Preferences {
  roleKeywords: string;
  preferredLocations: string[];
  preferredModes: string[];
  experienceLevel: string;
  skills: string;
  minMatchScore: number;
}

const STORAGE_KEY = "jobTrackerPreferences";

const defaultPreferences: Preferences = {
  roleKeywords: "",
  preferredLocations: [],
  preferredModes: [],
  experienceLevel: "",
  skills: "",
  minMatchScore: 40,
};

export function getPreferences(): Preferences | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Preferences;
  } catch {
    return null;
  }
}

export function savePreferences(prefs: Preferences): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

export function getDefaultPreferences(): Preferences {
  return { ...defaultPreferences };
}
