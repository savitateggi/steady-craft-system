const STORAGE_KEY = "jnt_saved_jobs";

export function getSavedJobIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleSavedJob(id: string): string[] {
  const ids = getSavedJobIds();
  const next = ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}
