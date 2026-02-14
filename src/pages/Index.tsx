import React, { useState } from "react";
import TopBar from "@/components/TopBar";
import ContextHeader from "@/components/ContextHeader";
import SecondaryPanel from "@/components/SecondaryPanel";
import ProofFooter from "@/components/ProofFooter";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [proofItems, setProofItems] = useState([
    { label: "UI Built", checked: false },
    { label: "Logic Working", checked: false },
    { label: "Test Passed", checked: false },
    { label: "Deployed", checked: false },
  ]);

  const handleToggle = (index: number) => {
    setProofItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, checked: !item.checked } : item))
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar
        projectName="KodNest Premium Build System"
        currentStep={1}
        totalSteps={6}
        status="in-progress"
      />

      <ContextHeader
        headline="Design System Foundation"
        subtext="Establish the visual language, component library, and interaction patterns that define the product experience."
      />

      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Primary Workspace */}
        <main className="flex-1 p-sp-4">
          <div className="prose-width">
            <h2 className="text-2xl font-semibold text-foreground mb-sp-3">Component Library</h2>

            {/* Buttons */}
            <section className="mb-sp-5">
              <h3 className="text-lg font-semibold text-foreground mb-sp-2">Buttons</h3>
              <div className="flex flex-wrap gap-sp-2">
                <Button variant="default">Primary Action</Button>
                <Button variant="outline">Secondary</Button>
                <Button variant="secondary">Tertiary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link Style</Button>
              </div>
              <div className="flex flex-wrap gap-sp-2 mt-sp-2">
                <Button variant="success" size="sm">Success</Button>
                <Button variant="warning" size="sm">Warning</Button>
                <Button variant="destructive" size="sm">Destructive</Button>
              </div>
              <div className="flex flex-wrap gap-sp-2 mt-sp-2">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </section>

            {/* Typography */}
            <section className="mb-sp-5">
              <h3 className="text-lg font-semibold text-foreground mb-sp-2">Typography</h3>
              <div className="space-y-sp-2">
                <h1 className="text-4xl font-bold">Heading One — Serif Display</h1>
                <h2 className="text-3xl font-semibold">Heading Two</h2>
                <h3 className="text-2xl font-semibold">Heading Three</h3>
                <h4 className="text-xl font-medium">Heading Four</h4>
                <p className="text-base text-foreground leading-relaxed">
                  Body text at 16px with generous line-height. Clean, readable, and professional.
                  Every paragraph stays within a comfortable reading width of 720 pixels maximum.
                </p>
                <p className="text-sm text-muted-foreground">
                  Muted secondary text for supporting information and metadata.
                </p>
              </div>
            </section>

            {/* Cards */}
            <section className="mb-sp-5">
              <h3 className="text-lg font-semibold text-foreground mb-sp-2">Cards</h3>
              <div className="grid gap-sp-3 sm:grid-cols-2">
                <div className="rounded-md border border-border bg-background p-sp-3">
                  <h4 className="text-base font-medium text-foreground">Standard Card</h4>
                  <p className="mt-sp-1 text-sm text-muted-foreground">
                    Subtle border, no drop shadow. Balanced padding using the spacing scale.
                  </p>
                </div>
                <div className="rounded-md border border-border bg-background p-sp-3">
                  <h4 className="text-base font-medium text-foreground">Content Card</h4>
                  <p className="mt-sp-1 text-sm text-muted-foreground">
                    Consistent radius and spacing. Every card follows the same visual rules.
                  </p>
                </div>
              </div>
            </section>

            {/* Inputs */}
            <section className="mb-sp-5">
              <h3 className="text-lg font-semibold text-foreground mb-sp-2">Form Inputs</h3>
              <div className="space-y-sp-2 max-w-sm">
                <div>
                  <label className="text-sm font-medium text-foreground mb-sp-1 block">Label</label>
                  <input
                    type="text"
                    placeholder="Enter value..."
                    className="w-full rounded-md border border-input bg-background px-sp-2 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all duration-[180ms]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-sp-1 block">Disabled</label>
                  <input
                    type="text"
                    placeholder="Not editable"
                    disabled
                    className="w-full rounded-md border border-input bg-muted px-sp-2 py-2 text-sm text-muted-foreground cursor-not-allowed"
                  />
                </div>
              </div>
            </section>

            {/* Color Palette */}
            <section className="mb-sp-5">
              <h3 className="text-lg font-semibold text-foreground mb-sp-2">Color Palette</h3>
              <div className="flex flex-wrap gap-sp-2">
                <div className="flex flex-col items-center gap-sp-1">
                  <div className="h-16 w-16 rounded-md bg-background border border-border" />
                  <span className="text-xs text-muted-foreground">Background</span>
                </div>
                <div className="flex flex-col items-center gap-sp-1">
                  <div className="h-16 w-16 rounded-md bg-foreground" />
                  <span className="text-xs text-muted-foreground">Foreground</span>
                </div>
                <div className="flex flex-col items-center gap-sp-1">
                  <div className="h-16 w-16 rounded-md bg-primary" />
                  <span className="text-xs text-muted-foreground">Primary</span>
                </div>
                <div className="flex flex-col items-center gap-sp-1">
                  <div className="h-16 w-16 rounded-md bg-success" />
                  <span className="text-xs text-muted-foreground">Success</span>
                </div>
                <div className="flex flex-col items-center gap-sp-1">
                  <div className="h-16 w-16 rounded-md bg-warning" />
                  <span className="text-xs text-muted-foreground">Warning</span>
                </div>
              </div>
            </section>

            {/* Spacing */}
            <section className="mb-sp-5">
              <h3 className="text-lg font-semibold text-foreground mb-sp-2">Spacing Scale</h3>
              <div className="space-y-sp-1">
                {[
                  { name: "sp-1", value: "8px" },
                  { name: "sp-2", value: "16px" },
                  { name: "sp-3", value: "24px" },
                  { name: "sp-4", value: "40px" },
                  { name: "sp-5", value: "64px" },
                ].map((s) => (
                  <div key={s.name} className="flex items-center gap-sp-2">
                    <span className="text-xs text-muted-foreground w-16">{s.name}</span>
                    <div className="bg-primary/20 rounded-sm" style={{ width: s.value, height: "8px" }} />
                    <span className="text-xs text-muted-foreground">{s.value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Error & Empty States */}
            <section className="mb-sp-5">
              <h3 className="text-lg font-semibold text-foreground mb-sp-2">States</h3>
              <div className="space-y-sp-2">
                <div className="rounded-md border border-destructive/30 bg-destructive/5 p-sp-3">
                  <p className="text-sm font-medium text-foreground">Something went wrong</p>
                  <p className="mt-sp-1 text-sm text-muted-foreground">
                    The build process couldn't complete. Try re-running the prompt with a simpler scope.
                  </p>
                </div>
                <div className="rounded-md border border-border bg-background p-sp-3 text-center">
                  <p className="text-sm font-medium text-foreground">No items yet</p>
                  <p className="mt-sp-1 text-sm text-muted-foreground">
                    Start by adding your first build step to get going.
                  </p>
                  <Button variant="default" size="sm" className="mt-sp-2">
                    Add First Step
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* Secondary Panel */}
        <div className="w-full lg:w-[30%] lg:min-w-[320px]">
          <SecondaryPanel
            stepTitle="Step 1: Foundation"
            stepDescription="Set up the core design tokens, typography, and spacing system. This forms the visual contract for every component."
            promptText={`Create a design system with:\n- Off-white background (#F7F6F3)\n- Deep red accent (#8B0000)\n- Serif headings, sans-serif body\n- 8/16/24/40/64 spacing scale`}
          />
        </div>
      </div>

      <ProofFooter items={proofItems} onToggle={handleToggle} />
    </div>
  );
};

export default Index;
