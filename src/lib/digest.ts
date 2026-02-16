import { jobs, Job } from "@/data/jobs";
import { Preferences, getPreferences } from "./preferences";
import { computeMatchScore } from "./matchScore";

export interface DigestEntry {
  job: Job;
  matchScore: number;
}

export interface Digest {
  date: string;
  entries: DigestEntry[];
  generatedAt: string;
}

function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function storageKey(date: string): string {
  return `jobTrackerDigest_${date}`;
}

export function getTodayDigest(): Digest | null {
  try {
    const raw = localStorage.getItem(storageKey(todayKey()));
    if (!raw) return null;
    return JSON.parse(raw) as Digest;
  } catch {
    return null;
  }
}

export function generateDigest(prefs: Preferences): Digest {
  const today = todayKey();

  // Check if already exists
  const existing = getTodayDigest();
  if (existing) return existing;

  const scored = jobs
    .map((job) => ({ job, matchScore: computeMatchScore(job, prefs) }))
    .sort((a, b) => {
      if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
      return a.job.postedDaysAgo - b.job.postedDaysAgo;
    })
    .slice(0, 10);

  const digest: Digest = {
    date: today,
    entries: scored,
    generatedAt: new Date().toISOString(),
  };

  localStorage.setItem(storageKey(today), JSON.stringify(digest));
  return digest;
}

export function digestToPlainText(digest: Digest): string {
  const lines = [
    `Top 10 Jobs For You — 9AM Digest`,
    `Date: ${digest.date}`,
    ``,
  ];

  digest.entries.forEach((entry, i) => {
    lines.push(`${i + 1}. ${entry.job.title} at ${entry.job.company}`);
    lines.push(`   Location: ${entry.job.location} · ${entry.job.mode}`);
    lines.push(`   Experience: ${entry.job.experience === "Fresher" ? "Fresher" : entry.job.experience + " yrs"}`);
    lines.push(`   Match Score: ${entry.matchScore}%`);
    lines.push(`   Apply: ${entry.job.applyUrl}`);
    lines.push(``);
  });

  lines.push(`This digest was generated based on your preferences.`);
  return lines.join("\n");
}
