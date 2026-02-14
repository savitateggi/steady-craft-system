import React from "react";

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-sp-3 py-sp-5">
      <h1 className="text-4xl font-bold text-foreground md:text-5xl">{title}</h1>
      <p className="mt-sp-2 text-base text-muted-foreground">
        This section will be built in the next step.
      </p>
    </div>
  );
};

export default PlaceholderPage;
