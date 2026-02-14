import React from "react";
import { FileCheck } from "lucide-react";

const ProofPage: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col px-sp-3 py-sp-4 mx-auto w-full max-w-4xl">
      <h1 className="text-3xl font-semibold text-foreground md:text-4xl">Proof</h1>
      <p className="mt-sp-1 text-base text-muted-foreground">Collect and present build artifacts and evidence.</p>

      <div className="mt-sp-4 flex flex-1 flex-col items-center justify-center rounded-md border border-border bg-background p-sp-5 text-center">
        <FileCheck className="h-10 w-10 text-muted-foreground/40" />
        <p className="mt-sp-3 text-lg font-medium text-foreground">No artifacts collected</p>
        <p className="mt-sp-1 text-sm text-muted-foreground">
          Screenshots, test results, and deployment evidence will be stored here.
        </p>
      </div>
    </div>
  );
};

export default ProofPage;
