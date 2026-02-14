import React from "react";

interface ProofItem {
  label: string;
  checked: boolean;
}

interface ProofFooterProps {
  items: ProofItem[];
  onToggle: (index: number) => void;
}

const ProofFooter: React.FC<ProofFooterProps> = ({ items, onToggle }) => {
  return (
    <footer className="border-t border-border px-sp-4 py-sp-3">
      <div className="flex flex-wrap items-center gap-sp-4">
        {items.map((item, i) => (
          <label
            key={i}
            className="flex items-center gap-sp-1 cursor-pointer select-none group"
          >
            <span
              onClick={() => onToggle(i)}
              className={`inline-flex h-5 w-5 items-center justify-center rounded-sm border transition-all duration-[180ms] ease-in-out ${
                item.checked
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-transparent hover:border-muted-foreground"
              }`}
            >
              {item.checked && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6L5 8.5L9.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </span>
            <span className="text-sm text-foreground group-hover:text-muted-foreground transition-colors duration-[180ms]">
              {item.label}
            </span>
          </label>
        ))}
      </div>
    </footer>
  );
};

export default ProofFooter;
