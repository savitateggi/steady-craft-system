import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/saved", label: "Saved" },
  { to: "/digest", label: "Digest" },
  { to: "/settings", label: "Settings" },
  { to: "/proof", label: "Proof" },
];

const AppNavbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-sp-1 py-2 text-sm font-medium transition-colors duration-[180ms] ${
      isActive
        ? "text-primary border-b-2 border-primary"
        : "text-muted-foreground hover:text-foreground border-b-2 border-transparent"
    }`;

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-sp-3 py-sp-2">
        <NavLink to="/" className="text-sm font-semibold text-foreground tracking-tight font-serif-display">
          KodNest
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-sp-3">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="flex flex-col border-t border-border px-sp-3 pb-sp-2 md:hidden">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
};

export default AppNavbar;
