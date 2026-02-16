import React, { useState, useCallback } from "react";
import { AlertTriangle, CheckCircle2, RotateCcw } from "lucide-react";
import TestChecklist, { testItems, getCheckedTests, setCheckedTests } from "@/components/TestChecklist";
import { Button } from "@/components/ui/button";

const ProofPage: React.FC = () => {
  const [checked, setChecked] = useState<string[]>(getCheckedTests);

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

  const total = testItems.length;
  const passed = checked.length;
  const allPassed = passed === total;

  return (
    <div className="flex flex-1 flex-col px-sp-3 py-sp-4 mx-auto w-full max-w-4xl">
      <h1 className="text-3xl font-semibold text-foreground md:text-4xl">Proof</h1>
      <p className="mt-sp-1 text-base text-muted-foreground">Verify every feature before shipping.</p>

      {/* Summary */}
      <div className={`mt-sp-3 flex items-center gap-sp-2 rounded-md border px-sp-3 py-sp-2 ${
        allPassed
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-border bg-muted text-foreground"
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

      {/* Checklist card */}
      <div className="mt-sp-3 rounded-md border border-border bg-popover p-sp-4 shadow-sm">
        <TestChecklist checked={checked} onToggle={handleToggle} />
      </div>

      {/* Reset */}
      <div className="mt-sp-3">
        <Button variant="ghost" size="sm" onClick={handleReset}>
          <RotateCcw className="h-4 w-4" /> Reset Test Status
        </Button>
      </div>
    </div>
  );
};

export default ProofPage;
