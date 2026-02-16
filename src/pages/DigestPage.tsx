import React, { useState, useEffect, useMemo } from "react";
import { getPreferences } from "@/lib/preferences";
import { getTodayDigest, generateDigest, digestToPlainText, Digest } from "@/lib/digest";
import { Button } from "@/components/ui/button";
import { Mail, Copy, Sparkles, Settings, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-");
  const date = new Date(Number(y), Number(m) - 1, Number(d));
  return date.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

function getScoreStyle(score: number): string {
  if (score >= 80) return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (score >= 60) return "bg-amber-50 text-amber-700 border-amber-200";
  if (score >= 40) return "bg-secondary text-secondary-foreground border-border";
  return "bg-muted text-muted-foreground border-border";
}

const DigestPage: React.FC = () => {
  const prefs = useMemo(() => getPreferences(), []);
  const [digest, setDigest] = useState<Digest | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const existing = getTodayDigest();
    if (existing) setDigest(existing);
  }, []);

  const handleGenerate = () => {
    if (!prefs) return;
    const d = generateDigest(prefs);
    setDigest(d);
  };

  const handleCopy = async () => {
    if (!digest) return;
    const text = digestToPlainText(digest);
    await navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard", description: "Digest text copied successfully." });
  };

  const handleEmailDraft = () => {
    if (!digest) return;
    const text = digestToPlainText(digest);
    const subject = encodeURIComponent("My 9AM Job Digest");
    const body = encodeURIComponent(text);
    window.open(`mailto:?subject=${subject}&body=${body}`, "_self");
  };

  // No preferences set
  if (!prefs) {
    return (
      <div className="flex flex-1 flex-col px-sp-3 py-sp-4 mx-auto w-full max-w-4xl">
        <h1 className="text-3xl font-semibold text-foreground md:text-4xl">Digest</h1>
        <p className="mt-sp-1 text-base text-muted-foreground">Your daily summary of matched opportunities.</p>
        <div className="mt-sp-4 flex flex-1 flex-col items-center justify-center rounded-md border border-border bg-background p-sp-5 text-center">
          <Settings className="h-10 w-10 text-muted-foreground/40" />
          <p className="mt-sp-3 text-lg font-medium text-foreground">Set preferences to generate a personalized digest.</p>
          <Link to="/settings">
            <Button variant="default" className="mt-sp-3">Go to Settings</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col px-sp-3 py-sp-4 mx-auto w-full max-w-4xl">
      <h1 className="text-3xl font-semibold text-foreground md:text-4xl">Digest</h1>
      <p className="mt-sp-1 text-base text-muted-foreground">Your daily summary of matched opportunities.</p>

      {!digest && (
        <div className="mt-sp-4 flex flex-1 flex-col items-center justify-center rounded-md border border-border bg-background p-sp-5 text-center">
          <Sparkles className="h-10 w-10 text-muted-foreground/40" />
          <p className="mt-sp-3 text-lg font-medium text-foreground">Ready to generate your digest</p>
          <p className="mt-sp-1 text-sm text-muted-foreground">Top 10 jobs matched to your preferences.</p>
          <Button variant="default" className="mt-sp-3" onClick={handleGenerate}>
            Generate Today's 9AM Digest (Simulated)
          </Button>
          <p className="mt-sp-2 text-xs text-muted-foreground/60">Demo Mode: Daily 9AM trigger simulated manually.</p>
        </div>
      )}

      {digest && (
        <>
          {/* Email-style newsletter card */}
          <div className="mt-sp-3 rounded-md border border-border bg-popover p-sp-4 shadow-sm">
            <div className="border-b border-border pb-sp-3 mb-sp-3">
              <h2 className="text-xl font-semibold text-foreground">Top 10 Jobs For You — 9AM Digest</h2>
              <p className="text-sm text-muted-foreground mt-1">{formatDate(digest.date)}</p>
            </div>

            {digest.entries.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-sp-5 text-center">
                <Mail className="h-10 w-10 text-muted-foreground/40" />
                <p className="mt-sp-3 text-lg font-medium text-foreground">No matching roles today.</p>
                <p className="mt-sp-1 text-sm text-muted-foreground">Check again tomorrow.</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {digest.entries.map((entry, idx) => (
                  <div key={entry.job.id} className="flex items-start justify-between gap-sp-2 py-sp-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-sp-2">
                        <span className="text-xs font-medium text-muted-foreground">{idx + 1}.</span>
                        <h3 className="text-base font-medium text-foreground leading-snug">{entry.job.title}</h3>
                        <span className={`rounded-md border px-2 py-0.5 text-xs font-semibold shrink-0 ${getScoreStyle(entry.matchScore)}`}>
                          {entry.matchScore}%
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5 ml-5">
                        {entry.job.company} · {entry.job.location} · {entry.job.experience === "Fresher" ? "Fresher" : `${entry.job.experience} yrs`}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" asChild className="shrink-0">
                      <a href={entry.job.applyUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" /> Apply
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t border-border mt-sp-3 pt-sp-3">
              <p className="text-xs text-muted-foreground text-center">This digest was generated based on your preferences.</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-sp-3 flex flex-wrap gap-sp-2">
            <Button variant="outline" onClick={handleCopy}>
              <Copy className="h-4 w-4" /> Copy Digest to Clipboard
            </Button>
            <Button variant="outline" onClick={handleEmailDraft}>
              <Mail className="h-4 w-4" /> Create Email Draft
            </Button>
          </div>

          <p className="mt-sp-2 text-xs text-muted-foreground/60">Demo Mode: Daily 9AM trigger simulated manually.</p>
        </>
      )}
    </div>
  );
};

export default DigestPage;
