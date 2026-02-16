import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import React from "react";

interface TestItem {
  id: string;
  label: string;
  howToTest: string;
}

export const testItems: TestItem[] = [
  { id: "prefs_persist", label: "Preferences persist after refresh", howToTest: "Go to Settings, save preferences, refresh the page, and confirm they're still there." },
  { id: "match_score", label: "Match score calculates correctly", howToTest: "Set preferences, go to Dashboard, verify score badges appear on job cards." },
  { id: "match_toggle", label: '"Show only matches" toggle works', howToTest: "Enable the toggle on Dashboard and confirm only jobs above your threshold appear." },
  { id: "save_persist", label: "Save job persists after refresh", howToTest: "Save a job on Dashboard, refresh, then check it still appears on Saved page." },
  { id: "apply_tab", label: "Apply opens in new tab", howToTest: 'Click "Apply" on any job card and confirm a new tab opens with the URL.' },
  { id: "status_persist", label: "Status update persists after refresh", howToTest: "Change a job status to Applied, refresh, and confirm it remains Applied." },
  { id: "status_filter", label: "Status filter works correctly", howToTest: 'Set a job to Applied, then use the status filter dropdown to filter by "Applied".' },
  { id: "digest_top10", label: "Digest generates top 10 by score", howToTest: "Generate a digest and verify 10 jobs are listed sorted by match score." },
  { id: "digest_persist", label: "Digest persists for the day", howToTest: "Generate a digest, refresh the page, and confirm it loads without regenerating." },
  { id: "no_console_errors", label: "No console errors on main pages", howToTest: "Open browser DevTools Console and navigate through all pages." },
];

const STORAGE_KEY = "jobTrackerTestChecklist";

export function getCheckedTests(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

export function setCheckedTests(ids: string[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function allTestsPassed(): boolean {
  const checked = getCheckedTests();
  return testItems.every((t) => checked.includes(t.id));
}

interface TestChecklistProps {
  checked: string[];
  onToggle: (id: string) => void;
}

const TestChecklist: React.FC<TestChecklistProps> = ({ checked, onToggle }) => {
  return (
    <div className="divide-y divide-border">
      {testItems.map((item) => {
        const isChecked = checked.includes(item.id);
        return (
          <label
            key={item.id}
            className="flex items-center gap-sp-2 py-sp-2 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => onToggle(item.id)}
              className="h-4 w-4 rounded border-border text-primary accent-primary focus:ring-ring"
            />
            <span className={`text-sm flex-1 ${isChecked ? "text-muted-foreground line-through" : "text-foreground"}`}>
              {item.label}
            </span>
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" className="text-muted-foreground/40 hover:text-muted-foreground transition-colors">
                  <HelpCircle className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-[260px] text-xs">
                {item.howToTest}
              </TooltipContent>
            </Tooltip>
          </label>
        );
      })}
    </div>
  );
};

export default TestChecklist;
