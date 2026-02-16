import React, { useState, useMemo, useCallback } from "react";
import { jobs, Job } from "@/data/jobs";
import JobCard from "@/components/JobCard";
import JobDetailModal from "@/components/JobDetailModal";
import { getSavedJobIds, toggleSavedJob } from "@/lib/savedJobs";
import { getAllStatuses, setJobStatus, JobStatus } from "@/lib/jobStatus";
import { Bookmark } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SavedPage: React.FC = () => {
  const [savedIds, setSavedIds] = useState<string[]>(getSavedJobIds);
  const [viewJob, setViewJob] = useState<Job | null>(null);
  const [statuses, setStatuses] = useState<Record<string, JobStatus>>(getAllStatuses);
  const { toast } = useToast();

  const handleToggleSave = useCallback((id: string) => {
    setSavedIds(toggleSavedJob(id));
  }, []);

  const handleStatusChange = useCallback((jobId: string, status: JobStatus) => {
    const job = jobs.find((j) => j.id === jobId);
    setJobStatus(jobId, status, job?.title ?? "", job?.company ?? "");
    setStatuses(getAllStatuses());
    if (status !== "Not Applied") {
      toast({ title: `Status updated: ${status}` });
    }
  }, [toast]);

  const savedJobs = useMemo(() => jobs.filter((j) => savedIds.includes(j.id)), [savedIds]);

  if (savedJobs.length === 0) {
    return (
      <div className="flex flex-1 flex-col px-sp-3 py-sp-4 mx-auto w-full max-w-4xl">
        <h1 className="text-3xl font-semibold text-foreground md:text-4xl">Saved</h1>
        <p className="mt-sp-1 text-base text-muted-foreground">Jobs you've bookmarked for later review.</p>
        <div className="mt-sp-4 flex flex-1 flex-col items-center justify-center rounded-md border border-border bg-background p-sp-5 text-center">
          <Bookmark className="h-10 w-10 text-muted-foreground/40" />
          <p className="mt-sp-3 text-lg font-medium text-foreground">Nothing saved yet</p>
          <p className="mt-sp-1 text-sm text-muted-foreground">When you save jobs from your dashboard, they'll appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col px-sp-3 py-sp-4 mx-auto w-full max-w-5xl">
      <h1 className="text-3xl font-semibold text-foreground md:text-4xl">Saved</h1>
      <p className="mt-sp-1 text-base text-muted-foreground mb-sp-3">
        {savedJobs.length} saved job{savedJobs.length !== 1 ? "s" : ""}
      </p>
      <div className="grid gap-sp-2 sm:grid-cols-2">
        {savedJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isSaved
            onView={setViewJob}
            onToggleSave={handleToggleSave}
            status={statuses[job.id] ?? "Not Applied"}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
      {viewJob && <JobDetailModal job={viewJob} onClose={() => setViewJob(null)} />}
    </div>
  );
};

export default SavedPage;
