import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-sp-3 py-sp-5 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl prose-width">
        Stop Missing The Right Jobs.
      </h1>
      <p className="mt-sp-3 text-lg text-muted-foreground prose-width md:text-xl">
        Precision-matched job discovery delivered daily at 9AM.
      </p>
      <Button asChild size="lg" className="mt-sp-4">
        <Link to="/settings">Start Tracking</Link>
      </Button>
    </div>
  );
};

export default LandingPage;
