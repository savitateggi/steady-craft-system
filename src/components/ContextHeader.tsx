import React from "react";

interface ContextHeaderProps {
  headline: string;
  subtext: string;
}

const ContextHeader: React.FC<ContextHeaderProps> = ({ headline, subtext }) => {
  return (
    <section className="border-b border-border px-sp-4 py-sp-4">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        {headline}
      </h1>
      <p className="mt-sp-1 text-base text-muted-foreground prose-width">
        {subtext}
      </p>
    </section>
  );
};

export default ContextHeader;
