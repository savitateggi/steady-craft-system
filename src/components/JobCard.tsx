import React from "react";
import { Job } from "@/data/jobs";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck, ExternalLink, Eye } from "lucide-react";

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  onView: (job: Job) => void;
  onToggleSave: (jobId: string) => void;
}

const sourceBadgeStyles: Record<Job["source"], string> = {
  LinkedIn: "bg-blue-50 text-blue-700 border-blue-200",
  Naukri: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Indeed: "bg-violet-50 text-violet-700 border-violet-200",
};

function formatPosted(days: number): string {
  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

const JobCard: React.FC<JobCardProps> = ({ job, isSaved, onView, onToggleSave }) => {
  return (
    <article className="rounded-md border border-border bg-background p-sp-3 flex flex-col gap-sp-2 transition-all duration-[180ms] hover:border-muted-foreground/30">
      <div className="flex items-start justify-between gap-sp-2">
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-medium text-foreground leading-snug">{job.title}</h3>
          <p className="text-sm text-muted-foreground mt-0.5">{job.company}</p>
        </div>
        <span className={`shrink-0 rounded-md border px-2 py-0.5 text-xs font-medium ${sourceBadgeStyles[job.source]}`}>
          {job.source}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-x-sp-2 gap-y-1 text-sm text-muted-foreground">
        <span>{job.location} · {job.mode}</span>
        <span className="text-border">|</span>
        <span>{job.experience === "Fresher" ? "Fresher" : `${job.experience} yrs`}</span>
        <span className="text-border">|</span>
        <span>{job.salaryRange}</span>
      </div>

      <div className="flex items-center justify-between pt-sp-1 border-t border-border">
        <span className="text-xs text-muted-foreground">{formatPosted(job.postedDaysAgo)}</span>
        <div className="flex gap-sp-1">
          <Button variant="ghost" size="sm" onClick={() => onView(job)}>
            <Eye className="h-4 w-4" />
            View
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onToggleSave(job.id)}>
            {isSaved ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
            {isSaved ? "Saved" : "Save"}
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              Apply
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
};

export default JobCard;
