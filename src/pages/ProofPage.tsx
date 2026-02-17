import React, { useState, useCallback, useEffect } from "react";
import { AlertTriangle, CheckCircle2, RotateCcw, Copy, ExternalLink } from "lucide-react";
import TestChecklist, { testItems, getCheckedTests, setCheckedTests, allTestsPassed } from "@/components/TestChecklist";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {
  getSubmissionLinks,
  setSubmissionLinks,
  isValidUrl,
  allLinksValid,
  generateSubmissionText,
  type SubmissionLinks,
} from "@/lib/submission";

const STEPS = [
  "Job Data Model",
  "Preferences Engine",
  "Match Scoring",
  "Dashboard UI",
  "Save & Apply",
  "Status Tracking",
  "Daily Digest",
  "Test Checklist",
];

type ShipStatus = "not-started" | "in-progress" | "shipped";

function deriveStatus(checked: string[], links: SubmissionLinks): ShipStatus {
  const testsOk = checked.length === testItems.length;
  const linksOk = allLinksValid(links);
  if (testsOk && linksOk) return "shipped";
  if (checked.length > 0 || links.lovableUrl || links.githubUrl || links.deployedUrl) return "in-progress";
  return "not-started";
}

const statusLabel: Record<ShipStatus, string> = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  shipped: "Shipped",
};
const statusStyle: Record<ShipStatus, string> = {
  "not-started": "bg-muted text-muted-foreground",
  "in-progress": "bg-warning/15 text-warning",
  shipped: "bg-success/15 text-success",
};

const ProofPage: React.FC = () => {
  const [checked, setChecked] = useState<string[]>(getCheckedTests);
  const [links, setLinks] = useState<SubmissionLinks>(getSubmissionLinks);

  const handleToggle = useCallback((id: string) => {
    setChecked((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      setCheckedTests(next);
      return next;
    });
  }, []);

  const handleReset = () => {
    setCheckedTests([]);
    setChecked([]);
  };

  const handleLinkChange = (field: keyof SubmissionLinks, value: string) => {
    setLinks((prev) => {
      const next = { ...prev, [field]: value };
      setSubmissionLinks(next);
      return next;
    });
  };

  const total = testItems.length;
  const passed = checked.length;
  const allPassed = passed === total;
  const status = deriveStatus(checked, links);
  const canShip = status === "shipped";

  const handleCopy = async () => {
    if (!canShip) return;
    try {
      await navigator.clipboard.writeText(generateSubmissionText(links));
      toast({ title: "Copied to clipboard", description: "Final submission text copied." });
    } catch {
      toast({ title: "Copy failed", description: "Please copy manually.", variant: "destructive" });
    }
  };

  const linkFields: { key: keyof SubmissionLinks; label: string; placeholder: string }[] = [
    { key: "lovableUrl", label: "Lovable Project Link", placeholder: "https://lovable.dev/projects/..." },
    { key: "githubUrl", label: "GitHub Repository Link", placeholder: "https://github.com/..." },
    { key: "deployedUrl", label: "Deployed URL", placeholder: "https://your-app.vercel.app" },
  ];

  return (
    <div className="flex flex-1 flex-col px-sp-3 py-sp-4 mx-auto w-full max-w-4xl">
      {/* Header with status */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground md:text-4xl">Proof & Submission</h1>
          <p className="mt-sp-1 text-base text-muted-foreground">Project 1 — Job Notification Tracker</p>
        </div>
        <span className={`inline-flex items-center rounded-md px-sp-2 py-1 text-xs font-medium ${statusStyle[status]}`}>
          {statusLabel[status]}
        </span>
      </div>

      {/* A) Step Completion Summary */}
      <section className="mt-sp-4">
        <h2 className="text-lg font-semibold text-foreground font-serif-display">Step Completion Summary</h2>
        <div className="mt-sp-2 grid grid-cols-1 sm:grid-cols-2 gap-sp-1">
          {STEPS.map((step, i) => (
            <div key={step} className="flex items-center gap-sp-2 rounded-md border border-border bg-popover px-sp-3 py-sp-2">
              <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
              <span className="text-sm text-foreground">
                Step {i + 1}: {step}
              </span>
              <span className="ml-auto text-xs text-success font-medium">Completed</span>
            </div>
          ))}
        </div>
      </section>

      {/* B) Artifact Collection */}
      <section className="mt-sp-4">
        <h2 className="text-lg font-semibold text-foreground font-serif-display">Artifact Links</h2>
        <div className="mt-sp-2 space-y-sp-2">
          {linkFields.map(({ key, label, placeholder }) => {
            const value = links[key];
            const valid = !value || isValidUrl(value);
            return (
              <div key={key}>
                <label className="text-sm font-medium text-foreground">{label}</label>
                <Input
                  className={`mt-1 ${!valid ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  placeholder={placeholder}
                  value={value}
                  onChange={(e) => handleLinkChange(key, e.target.value)}
                />
                {!valid && <p className="mt-1 text-xs text-destructive">Please enter a valid URL.</p>}
              </div>
            );
          })}
        </div>
      </section>

      {/* C) Test Checklist */}
      <section className="mt-sp-4">
        <h2 className="text-lg font-semibold text-foreground font-serif-display">Test Checklist</h2>
        <div className={`mt-sp-2 flex items-center gap-sp-2 rounded-md border px-sp-3 py-sp-2 ${
          allPassed ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-border bg-muted text-foreground"
        }`}>
          {allPassed ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-warning shrink-0" />
          )}
          <span className="text-sm font-medium">
            Tests Passed: {passed} / {total}
          </span>
          {!allPassed && (
            <span className="text-xs text-muted-foreground ml-1">— Resolve all issues before shipping.</span>
          )}
        </div>
        <div className="mt-sp-2 rounded-md border border-border bg-popover p-sp-4 shadow-sm">
          <TestChecklist checked={checked} onToggle={handleToggle} />
        </div>
        <div className="mt-sp-2">
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" /> Reset Test Status
          </Button>
        </div>
      </section>

      {/* D) Final Submission */}
      <section className="mt-sp-4 rounded-md border border-border bg-popover p-sp-4 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground font-serif-display">Final Submission</h2>
        {!canShip ? (
          <p className="mt-sp-2 text-sm text-muted-foreground">
            Complete all 10 test items and provide all 3 artifact links to unlock submission.
          </p>
        ) : (
          <>
            <p className="mt-sp-2 text-sm text-success font-medium">Project 1 Shipped Successfully.</p>
            <div className="mt-sp-3">
              <Button onClick={handleCopy}>
                <Copy className="h-4 w-4" /> Copy Final Submission
              </Button>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default ProofPage;
