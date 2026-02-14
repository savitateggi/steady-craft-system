import React from "react";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Check, AlertCircle, Camera } from "lucide-react";

interface SecondaryPanelProps {
  stepTitle: string;
  stepDescription: string;
  promptText: string;
}

const SecondaryPanel: React.FC<SecondaryPanelProps> = ({ stepTitle, stepDescription, promptText }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside className="flex flex-col gap-sp-3 border-l border-border p-sp-3">
      <div>
        <h3 className="text-lg font-semibold text-foreground">{stepTitle}</h3>
        <p className="mt-sp-1 text-sm text-muted-foreground leading-relaxed">{stepDescription}</p>
      </div>

      <div className="rounded-md border border-border bg-background p-sp-2">
        <p className="text-sm text-foreground font-mono leading-relaxed whitespace-pre-wrap">{promptText}</p>
      </div>

      <div className="flex flex-col gap-sp-1">
        <Button variant="default" size="sm" onClick={handleCopy}>
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied" : "Copy Prompt"}
        </Button>
        <Button variant="outline" size="sm">
          <ExternalLink className="h-4 w-4" />
          Build in Lovable
        </Button>
      </div>

      <div className="mt-auto flex flex-col gap-sp-1 border-t border-border pt-sp-3">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-sp-1">Verification</p>
        <Button variant="success" size="sm">
          <Check className="h-4 w-4" />
          It Worked
        </Button>
        <Button variant="outline" size="sm">
          <AlertCircle className="h-4 w-4" />
          Error
        </Button>
        <Button variant="outline" size="sm">
          <Camera className="h-4 w-4" />
          Add Screenshot
        </Button>
      </div>
    </aside>
  );
};

export default SecondaryPanel;
