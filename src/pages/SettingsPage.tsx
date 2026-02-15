import React, { useState, useEffect } from "react";
import { getPreferences, savePreferences, getDefaultPreferences, Preferences } from "@/lib/preferences";
import { allLocations, allModes, allExperiences } from "@/data/jobs";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SettingsPage: React.FC = () => {
  const [prefs, setPrefs] = useState<Preferences>(getDefaultPreferences);

  useEffect(() => {
    const saved = getPreferences();
    if (saved) setPrefs(saved);
  }, []);

  const update = <K extends keyof Preferences>(key: K, value: Preferences[K]) =>
    setPrefs((prev) => ({ ...prev, [key]: value }));

  const toggleArrayItem = (key: "preferredLocations" | "preferredModes", value: string) => {
    setPrefs((prev) => {
      const arr = prev[key];
      return { ...prev, [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] };
    });
  };

  const handleSave = () => {
    savePreferences(prefs);
    toast.success("Preferences saved");
  };

  return (
    <div className="flex flex-1 flex-col px-sp-3 py-sp-4 mx-auto w-full max-w-2xl">
      <h1 className="text-3xl font-semibold text-foreground md:text-4xl">Settings</h1>
      <p className="mt-sp-1 text-base text-muted-foreground">Define what kind of roles you want to track.</p>

      <div className="mt-sp-4 space-y-sp-3">
        {/* Role Keywords */}
        <fieldset>
          <label className="block text-sm font-medium text-foreground mb-sp-1">Role Keywords</label>
          <input
            type="text"
            placeholder="e.g. Frontend, SDE Intern, Backend"
            value={prefs.roleKeywords}
            onChange={(e) => update("roleKeywords", e.target.value)}
            className="w-full rounded-md border border-input bg-background px-sp-2 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all duration-[180ms]"
          />
          <p className="mt-1 text-xs text-muted-foreground">Comma-separated titles or keywords.</p>
        </fieldset>

        {/* Preferred Locations */}
        <fieldset>
          <label className="block text-sm font-medium text-foreground mb-sp-1">Preferred Locations</label>
          <div className="flex flex-wrap gap-sp-2">
            {allLocations.map((loc) => (
              <label key={loc} className="flex items-center gap-sp-1 cursor-pointer select-none">
                <Checkbox
                  checked={prefs.preferredLocations.includes(loc)}
                  onCheckedChange={() => toggleArrayItem("preferredLocations", loc)}
                />
                <span className="text-sm text-foreground">{loc}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Mode */}
        <fieldset>
          <label className="block text-sm font-medium text-foreground mb-sp-1">Work Mode</label>
          <div className="flex gap-sp-2">
            {allModes.map((mode) => (
              <label key={mode} className="flex items-center gap-sp-1 cursor-pointer select-none">
                <Checkbox
                  checked={prefs.preferredModes.includes(mode)}
                  onCheckedChange={() => toggleArrayItem("preferredModes", mode)}
                />
                <span className="text-sm text-foreground">{mode}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Experience Level */}
        <fieldset>
          <label className="block text-sm font-medium text-foreground mb-sp-1">Experience Level</label>
          <select
            value={prefs.experienceLevel}
            onChange={(e) => update("experienceLevel", e.target.value)}
            className="w-full rounded-md border border-input bg-background px-sp-2 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all duration-[180ms]"
          >
            <option value="">Select level</option>
            {allExperiences.map((exp) => (
              <option key={exp} value={exp}>{exp === "Fresher" ? "Fresher" : `${exp} yrs`}</option>
            ))}
          </select>
        </fieldset>

        {/* Skills */}
        <fieldset>
          <label className="block text-sm font-medium text-foreground mb-sp-1">Skills</label>
          <input
            type="text"
            placeholder="e.g. React, Python, Java, SQL"
            value={prefs.skills}
            onChange={(e) => update("skills", e.target.value)}
            className="w-full rounded-md border border-input bg-background px-sp-2 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all duration-[180ms]"
          />
          <p className="mt-1 text-xs text-muted-foreground">Comma-separated skills.</p>
        </fieldset>

        {/* Min Match Score */}
        <fieldset>
          <label className="block text-sm font-medium text-foreground mb-sp-1">
            Minimum Match Score: <span className="text-primary font-semibold">{prefs.minMatchScore}</span>
          </label>
          <Slider
            value={[prefs.minMatchScore]}
            onValueChange={([v]) => update("minMatchScore", v)}
            min={0}
            max={100}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0</span>
            <span>100</span>
          </div>
        </fieldset>

        <Button onClick={handleSave} className="w-full mt-sp-2">
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
