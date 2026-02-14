import React, { useState, useMemo, useCallback } from "react";
import { jobs, Job } from "@/data/jobs";
import FilterBar, { Filters } from "@/components/FilterBar";
import JobCard from "@/components/JobCard";
import JobDetailModal from "@/components/JobDetailModal";
import { getSavedJobIds, toggleSavedJob } from "@/lib/savedJobs";

const DashboardPage: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    keyword: "",
    location: "",
    mode: "",
    experience: "",
    source: "",
    sort: "latest",
  });
  const [savedIds, setSavedIds] = useState<string[]>(getSavedJobIds);
  const [viewJob, setViewJob] = useState<Job | null>(null);

  const handleToggleSave = useCallback((id: string) => {
    setSavedIds(toggleSavedJob(id));
  }, []);

  const filtered = useMemo(() => {
    let result = [...jobs];
    const kw = filters.keyword.toLowerCase();
    if (kw) result = result.filter((j) => j.title.toLowerCase().includes(kw) || j.company.toLowerCase().includes(kw));
    if (filters.location) result = result.filter((j) => j.location === filters.location);
    if (filters.mode) result = result.filter((j) => j.mode === filters.mode);
    if (filters.experience) result = result.filter((j) => j.experience === filters.experience);
    if (filters.source) result = result.filter((j) => j.source === filters.source);
    result.sort((a, b) => filters.sort === "latest" ? a.postedDaysAgo - b.postedDaysAgo : b.postedDaysAgo - a.postedDaysAgo);
    return result;
  }, [filters]);

  return (
    <div className="flex flex-1 flex-col px-sp-3 py-sp-4 mx-auto w-full max-w-5xl">
      <h1 className="text-3xl font-semibold text-foreground md:text-4xl">Dashboard</h1>
      <p className="mt-sp-1 text-base text-muted-foreground mb-sp-3">
        {filtered.length} job{filtered.length !== 1 ? "s" : ""} found
      </p>

      <FilterBar filters={filters} onChange={setFilters} />

      <div className="mt-sp-3 grid gap-sp-2 sm:grid-cols-2">
        {filtered.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isSaved={savedIds.includes(job.id)}
            onView={setViewJob}
            onToggleSave={handleToggleSave}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-1 flex-col items-center justify-center py-sp-5 text-center">
          <p className="text-lg font-medium text-foreground">No matching jobs</p>
          <p className="mt-sp-1 text-sm text-muted-foreground">Try adjusting your filters.</p>
        </div>
      )}

      {viewJob && <JobDetailModal job={viewJob} onClose={() => setViewJob(null)} />}
    </div>
  );
};

export default DashboardPage;
