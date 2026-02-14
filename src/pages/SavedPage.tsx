import React from "react";
import { Bookmark } from "lucide-react";

const SavedPage: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col px-sp-3 py-sp-4 mx-auto w-full max-w-4xl">
      <h1 className="text-3xl font-semibold text-foreground md:text-4xl">Saved</h1>
      <p className="mt-sp-1 text-base text-muted-foreground">Jobs you've bookmarked for later review.</p>

      <div className="mt-sp-4 flex flex-1 flex-col items-center justify-center rounded-md border border-border bg-background p-sp-5 text-center">
        <Bookmark className="h-10 w-10 text-muted-foreground/40" />
        <p className="mt-sp-3 text-lg font-medium text-foreground">Nothing saved yet</p>
        <p className="mt-sp-1 text-sm text-muted-foreground">
          When you save jobs from your dashboard, they'll appear here.
        </p>
      </div>
    </div>
  );
};

export default SavedPage;
