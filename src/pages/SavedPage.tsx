import React, { useState, useMemo, useCallback } from "react";
import { jobs, Job } from "@/data/jobs";
import JobCard from "@/components/JobCard";
import JobDetailModal from "@/components/JobDetailModal";
import { getSavedJobIds, toggleSavedJob } from "@/lib/savedJobs";
import { Bookmark } from "lucide-react";

const SavedPage: React.FC = () => {
  const [savedIds, setSavedIds] = useState<string[]>(getSavedJobIds);
  const [viewJob, setViewJob] = useState<Job | null>(null);

  const handleToggleSave = useCallback((id: string) => {
    setSavedIds(toggleSavedJob(id));
  }, []);

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
          <JobCard key={job.id} job={job} isSaved onView={setViewJob} onToggleSave={handleToggleSave} />
        ))}
      </div>
      {viewJob && <JobDetailModal job={viewJob} onClose={() => setViewJob(null)} />}
    </div>
  );
};

export default SavedPage;
