import React from "react";
import { Job } from "@/data/jobs";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface JobDetailModalProps {
  job: Job;
  onClose: () => void;
}

const JobDetailModal: React.FC<JobDetailModalProps> = ({ job, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40" onClick={onClose}>
      <div
        className="relative mx-sp-2 w-full max-w-lg rounded-md border border-border bg-background p-sp-4 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute right-sp-2 top-sp-2 text-muted-foreground hover:text-foreground transition-colors duration-[180ms]">
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-2xl font-semibold text-foreground pr-sp-4">{job.title}</h2>
        <p className="text-base text-muted-foreground mt-sp-1">{job.company} · {job.location} · {job.mode}</p>

        <div className="mt-sp-3 space-y-sp-3">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-sp-1">Description</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{job.description}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-sp-1">Skills</h4>
            <div className="flex flex-wrap gap-sp-1">
              {job.skills.map((skill) => (
                <span key={skill} className="rounded-md border border-border bg-muted px-2 py-0.5 text-xs text-foreground">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{job.experience === "Fresher" ? "Fresher" : `${job.experience} yrs experience`}</span>
            <span>{job.salaryRange}</span>
          </div>

          <Button asChild className="w-full">
            <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
              Apply on {job.source}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailModal;
