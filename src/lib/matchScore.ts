import { Job } from "@/data/jobs";
import { Preferences } from "./preferences";

function parseCSV(value: string): string[] {
  return value
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export function computeMatchScore(job: Job, prefs: Preferences): number {
  let score = 0;

  const roleKeywords = parseCSV(prefs.roleKeywords);
  const userSkills = parseCSV(prefs.skills);
  const titleLower = job.title.toLowerCase();
  const descLower = job.description.toLowerCase();

  // +25 if any roleKeyword appears in job.title
  if (roleKeywords.some((kw) => titleLower.includes(kw))) {
    score += 25;
  }

  // +15 if any roleKeyword appears in job.description
  if (roleKeywords.some((kw) => descLower.includes(kw))) {
    score += 15;
  }

  // +15 if job.location matches preferredLocations
  if (prefs.preferredLocations.length > 0 && prefs.preferredLocations.includes(job.location)) {
    score += 15;
  }

  // +10 if job.mode matches preferredMode
  if (prefs.preferredModes.length > 0 && prefs.preferredModes.includes(job.mode)) {
    score += 10;
  }

  // +10 if job.experience matches experienceLevel
  if (prefs.experienceLevel && job.experience === prefs.experienceLevel) {
    score += 10;
  }

  // +15 if overlap between job.skills and user.skills
  if (
    userSkills.length > 0 &&
    job.skills.some((s) => userSkills.includes(s.toLowerCase()))
  ) {
    score += 15;
  }

  // +5 if postedDaysAgo <= 2
  if (job.postedDaysAgo <= 2) {
    score += 5;
  }

  // +5 if source is LinkedIn
  if (job.source === "LinkedIn") {
    score += 5;
  }

  return Math.min(score, 100);
}
