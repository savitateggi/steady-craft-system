import React from "react";
import { Briefcase } from "lucide-react";

const DashboardPage: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col px-sp-3 py-sp-4 mx-auto w-full max-w-4xl">
      <h1 className="text-3xl font-semibold text-foreground md:text-4xl">Dashboard</h1>
      <p className="mt-sp-1 text-base text-muted-foreground">Your matched job notifications appear here.</p>

      <div className="mt-sp-4 flex flex-1 flex-col items-center justify-center rounded-md border border-border bg-background p-sp-5 text-center">
        <Briefcase className="h-10 w-10 text-muted-foreground/40" />
        <p className="mt-sp-3 text-lg font-medium text-foreground">No jobs yet</p>
        <p className="mt-sp-1 text-sm text-muted-foreground prose-width">
          In the next step, you will load a realistic dataset.
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
