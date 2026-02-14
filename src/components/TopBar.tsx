import React from "react";

interface TopBarProps {
  projectName: string;
  currentStep: number;
  totalSteps: number;
  status: "not-started" | "in-progress" | "shipped";
}

const statusLabels: Record<TopBarProps["status"], string> = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  "shipped": "Shipped",
};

const statusStyles: Record<TopBarProps["status"], string> = {
  "not-started": "bg-muted text-muted-foreground",
  "in-progress": "bg-warning/15 text-warning",
  "shipped": "bg-success/15 text-success",
};

const TopBar: React.FC<TopBarProps> = ({ projectName, currentStep, totalSteps, status }) => {
  return (
    <header className="flex items-center justify-between border-b border-border px-sp-4 py-sp-2">
      <span className="text-sm font-medium text-foreground">{projectName}</span>
      <span className="text-sm text-muted-foreground">
        Step {currentStep} / {totalSteps}
      </span>
      <span className={`inline-flex items-center rounded-md px-sp-2 py-1 text-xs font-medium ${statusStyles[status]}`}>
        {statusLabels[status]}
      </span>
    </header>
  );
};

export default TopBar;
