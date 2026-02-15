import React from "react";
import { allLocations, allModes, allExperiences, allSources } from "@/data/jobs";
import { Search } from "lucide-react";

export interface Filters {
  keyword: string;
  location: string;
  mode: string;
  experience: string;
  source: string;
  sort: "latest" | "oldest" | "matchScore" | "salary";
}

interface FilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  hasPreferences?: boolean;
}

const selectClass =
  "rounded-md border border-input bg-background px-sp-2 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all duration-[180ms]";

const FilterBar: React.FC<FilterBarProps> = ({ filters, onChange, hasPreferences }) => {
  const set = (key: keyof Filters, value: string) => onChange({ ...filters, [key]: value });

  return (
    <div className="flex flex-wrap items-end gap-sp-2 border-b border-border pb-sp-3">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by title or company…"
          value={filters.keyword}
          onChange={(e) => set("keyword", e.target.value)}
          className={`${selectClass} w-full pl-9`}
        />
      </div>
      <select value={filters.location} onChange={(e) => set("location", e.target.value)} className={selectClass}>
        <option value="">All Locations</option>
        {allLocations.map((l) => <option key={l} value={l}>{l}</option>)}
      </select>
      <select value={filters.mode} onChange={(e) => set("mode", e.target.value)} className={selectClass}>
        <option value="">All Modes</option>
        {allModes.map((m) => <option key={m} value={m}>{m}</option>)}
      </select>
      <select value={filters.experience} onChange={(e) => set("experience", e.target.value)} className={selectClass}>
        <option value="">All Experience</option>
        {allExperiences.map((e) => <option key={e} value={e}>{e}</option>)}
      </select>
      <select value={filters.source} onChange={(e) => set("source", e.target.value)} className={selectClass}>
        <option value="">All Sources</option>
        {allSources.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
      <select value={filters.sort} onChange={(e) => set("sort", e.target.value as Filters["sort"])} className={selectClass}>
        <option value="latest">Latest First</option>
        <option value="oldest">Oldest First</option>
        {hasPreferences && <option value="matchScore">Match Score</option>}
        <option value="salary">Salary</option>
      </select>
    </div>
  );
};

export default FilterBar;
