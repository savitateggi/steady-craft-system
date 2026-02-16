export type JobStatus = "Not Applied" | "Applied" | "Rejected" | "Selected";

export interface StatusChange {
  jobId: string;
  jobTitle: string;
  company: string;
  status: JobStatus;
  date: string; // ISO string
}

const STATUS_KEY = "jobTrackerStatus";
const LOG_KEY = "jobTrackerStatusLog";

export function getJobStatus(jobId: string): JobStatus {
  try {
    const raw = localStorage.getItem(STATUS_KEY);
    if (!raw) return "Not Applied";
    const map = JSON.parse(raw) as Record<string, JobStatus>;
    return map[jobId] ?? "Not Applied";
  } catch {
    return "Not Applied";
  }
}

export function getAllStatuses(): Record<string, JobStatus> {
  try {
    const raw = localStorage.getItem(STATUS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, JobStatus>;
  } catch {
    return {};
  }
}

export function setJobStatus(
  jobId: string,
  status: JobStatus,
  jobTitle: string,
  company: string
): void {
  const map = getAllStatuses();
  if (status === "Not Applied") {
    delete map[jobId];
  } else {
    map[jobId] = status;
  }
  localStorage.setItem(STATUS_KEY, JSON.stringify(map));

  // Log the change
  if (status !== "Not Applied") {
    const log = getStatusLog();
    log.unshift({ jobId, jobTitle, company, status, date: new Date().toISOString() });
    // Keep only last 50 entries
    localStorage.setItem(LOG_KEY, JSON.stringify(log.slice(0, 50)));
  }
}

export function getStatusLog(): StatusChange[] {
  try {
    const raw = localStorage.getItem(LOG_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StatusChange[];
  } catch {
    return [];
  }
}

export const allJobStatuses: JobStatus[] = ["Not Applied", "Applied", "Rejected", "Selected"];

export function getStatusStyle(status: JobStatus): string {
  switch (status) {
    case "Applied":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "Rejected":
      return "bg-red-50 text-red-700 border-red-200";
    case "Selected":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
}
