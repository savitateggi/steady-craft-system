import React, { useState, useMemo, useCallback } from "react";
import { jobs, Job } from "@/data/jobs";
import FilterBar, { Filters } from "@/components/FilterBar";
import JobCard from "@/components/JobCard";
import JobDetailModal from "@/components/JobDetailModal";
import { getSavedJobIds, toggleSavedJob } from "@/lib/savedJobs";
import { getPreferences } from "@/lib/preferences";
import { computeMatchScore } from "@/lib/matchScore";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";

function extractSalaryNum(s: string): number {
  const match = s.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

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
  const [showOnlyMatches, setShowOnlyMatches] = useState(false);

  const prefs = useMemo(() => getPreferences(), []);
  const hasPreferences = prefs !== null;

  const handleToggleSave = useCallback((id: string) => {
    setSavedIds(toggleSavedJob(id));
  }, []);

  const jobsWithScores = useMemo(() => {
    return jobs.map((job) => ({
      job,
      matchScore: prefs ? computeMatchScore(job, prefs) : null,
    }));
  }, [prefs]);

  const filtered = useMemo(() => {
    let result = [...jobsWithScores];
    const kw = filters.keyword.toLowerCase();
    if (kw) result = result.filter(({ job: j }) => j.title.toLowerCase().includes(kw) || j.company.toLowerCase().includes(kw));
    if (filters.location) result = result.filter(({ job: j }) => j.location === filters.location);
    if (filters.mode) result = result.filter(({ job: j }) => j.mode === filters.mode);
    if (filters.experience) result = result.filter(({ job: j }) => j.experience === filters.experience);
    if (filters.source) result = result.filter(({ job: j }) => j.source === filters.source);

    if (showOnlyMatches && prefs) {
      result = result.filter(({ matchScore }) => matchScore !== null && matchScore >= prefs.minMatchScore);
    }

    result.sort((a, b) => {
      switch (filters.sort) {
        case "latest":
          return a.job.postedDaysAgo - b.job.postedDaysAgo;
        case "oldest":
          return b.job.postedDaysAgo - a.job.postedDaysAgo;
        case "matchScore":
          return (b.matchScore ?? 0) - (a.matchScore ?? 0);
        case "salary":
          return extractSalaryNum(b.job.salaryRange) - extractSalaryNum(a.job.salaryRange);
        default:
          return 0;
      }
    });

    return result;
  }, [filters, jobsWithScores, showOnlyMatches, prefs]);

  return (
    <div className="flex flex-1 flex-col px-sp-3 py-sp-4 mx-auto w-full max-w-5xl">
      <h1 className="text-3xl font-semibold text-foreground md:text-4xl">Dashboard</h1>
      <p className="mt-sp-1 text-base text-muted-foreground mb-sp-3">
        {filtered.length} job{filtered.length !== 1 ? "s" : ""} found
      </p>

      {!hasPreferences && (
        <Link
          to="/settings"
          className="mb-sp-3 flex items-center gap-sp-2 rounded-md border border-border bg-muted px-sp-3 py-sp-2 text-sm text-foreground hover:border-muted-foreground/30 transition-all duration-[180ms]"
        >
          <Settings className="h-4 w-4 text-primary" />
          <span>Set your preferences to activate intelligent matching.</span>
        </Link>
      )}

      <FilterBar filters={filters} onChange={setFilters} hasPreferences={hasPreferences} />

      {hasPreferences && (
        <div className="mt-sp-2 flex items-center gap-sp-2">
          <Switch checked={showOnlyMatches} onCheckedChange={setShowOnlyMatches} />
          <span className="text-sm text-foreground">
            Show only jobs above my threshold ({prefs!.minMatchScore}%)
          </span>
        </div>
      )}

      <div className="mt-sp-3 grid gap-sp-2 sm:grid-cols-2">
        {filtered.map(({ job, matchScore }) => (
          <JobCard
            key={job.id}
            job={job}
            isSaved={savedIds.includes(job.id)}
            onView={setViewJob}
            onToggleSave={handleToggleSave}
            matchScore={matchScore}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-1 flex-col items-center justify-center py-sp-5 text-center">
          <p className="text-lg font-medium text-foreground">No roles match your criteria</p>
          <p className="mt-sp-1 text-sm text-muted-foreground">Adjust filters or lower your threshold.</p>
        </div>
      )}

      {viewJob && <JobDetailModal job={viewJob} onClose={() => setViewJob(null)} />}
    </div>
  );
};

export default DashboardPage;
