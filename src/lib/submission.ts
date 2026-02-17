const STORAGE_KEY = "jobTrackerSubmission";

export interface SubmissionLinks {
  lovableUrl: string;
  githubUrl: string;
  deployedUrl: string;
}

export function getSubmissionLinks(): SubmissionLinks {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { lovableUrl: "", githubUrl: "", deployedUrl: "" };
    return JSON.parse(raw) as SubmissionLinks;
  } catch {
    return { lovableUrl: "", githubUrl: "", deployedUrl: "" };
  }
}

export function setSubmissionLinks(links: SubmissionLinks): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
}

export function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function allLinksValid(links: SubmissionLinks): boolean {
  return (
    isValidUrl(links.lovableUrl) &&
    isValidUrl(links.githubUrl) &&
    isValidUrl(links.deployedUrl)
  );
}

export function generateSubmissionText(links: SubmissionLinks): string {
  return `Job Notification Tracker — Final Submission

Lovable Project:
${links.lovableUrl}

GitHub Repository:
${links.githubUrl}

Live Deployment:
${links.deployedUrl}

Core Features:
- Intelligent match scoring
- Daily digest simulation
- Status tracking
- Test checklist enforced`;
}
