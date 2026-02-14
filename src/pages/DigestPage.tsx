import React from "react";
import { Mail } from "lucide-react";

const DigestPage: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col px-sp-3 py-sp-4 mx-auto w-full max-w-4xl">
      <h1 className="text-3xl font-semibold text-foreground md:text-4xl">Digest</h1>
      <p className="mt-sp-1 text-base text-muted-foreground">Your daily summary of matched opportunities.</p>

      <div className="mt-sp-4 flex flex-1 flex-col items-center justify-center rounded-md border border-border bg-background p-sp-5 text-center">
        <Mail className="h-10 w-10 text-muted-foreground/40" />
        <p className="mt-sp-3 text-lg font-medium text-foreground">No digest available</p>
        <p className="mt-sp-1 text-sm text-muted-foreground">
          Your first digest will be generated once preferences are configured.
        </p>
      </div>
    </div>
  );
};

export default DigestPage;
