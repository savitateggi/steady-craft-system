import React from "react";

const SettingsPage: React.FC = () => {
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
            placeholder="e.g. Frontend Engineer, Product Designer"
            className="w-full rounded-md border border-input bg-background px-sp-2 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all duration-[180ms]"
          />
          <p className="mt-1 text-xs text-muted-foreground">Comma-separated titles or keywords.</p>
        </fieldset>

        {/* Preferred Locations */}
        <fieldset>
          <label className="block text-sm font-medium text-foreground mb-sp-1">Preferred Locations</label>
          <input
            type="text"
            placeholder="e.g. Bangalore, Mumbai, Delhi"
            className="w-full rounded-md border border-input bg-background px-sp-2 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all duration-[180ms]"
          />
        </fieldset>

        {/* Mode */}
        <fieldset>
          <label className="block text-sm font-medium text-foreground mb-sp-1">Work Mode</label>
          <div className="flex gap-sp-2">
            {["Remote", "Hybrid", "Onsite"].map((mode) => (
              <label key={mode} className="flex items-center gap-sp-1 cursor-pointer select-none">
                <input
                  type="radio"
                  name="mode"
                  value={mode.toLowerCase()}
                  className="h-4 w-4 accent-primary"
                />
                <span className="text-sm text-foreground">{mode}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Experience Level */}
        <fieldset>
          <label className="block text-sm font-medium text-foreground mb-sp-1">Experience Level</label>
          <select className="w-full rounded-md border border-input bg-background px-sp-2 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all duration-[180ms]">
            <option value="">Select level</option>
            <option value="entry">Entry Level (0–2 yrs)</option>
            <option value="mid">Mid Level (3–5 yrs)</option>
            <option value="senior">Senior (6–10 yrs)</option>
            <option value="lead">Lead / Staff (10+ yrs)</option>
          </select>
        </fieldset>
      </div>
    </div>
  );
};

export default SettingsPage;
