import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Bell, TrendingUp, Briefcase } from "lucide-react";
import heroImage from "@/assets/hero-kodnest.png";

const LandingPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  // Subtle parallax on mouse move
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      el.style.setProperty("--mx", `${x * 12}px`);
      el.style.setProperty("--my", `${y * 12}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[calc(100vh-57px)] flex-1 items-center justify-center overflow-hidden px-sp-3 py-sp-5"
    >
      {/* Background layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* Mesh gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[hsl(40_20%_92%)]" />

        {/* Radial ambient lights */}
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(60% 50% at 20% 20%, hsl(0 100% 27% / 0.12), transparent 60%), radial-gradient(50% 50% at 80% 30%, hsl(20 80% 55% / 0.10), transparent 60%), radial-gradient(70% 60% at 50% 100%, hsl(0 100% 27% / 0.10), transparent 60%)",
          }}
        />

        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 80%)",
          }}
        />

        {/* Floating glow orbs */}
        <div
          className="absolute -left-32 top-10 h-[420px] w-[420px] rounded-full blur-3xl animate-blob"
          style={{ background: "radial-gradient(circle, hsl(0 100% 27% / 0.28), transparent 70%)" }}
        />
        <div
          className="absolute -right-24 top-1/3 h-[480px] w-[480px] rounded-full blur-3xl animate-blob-slow"
          style={{ background: "radial-gradient(circle, hsl(20 90% 55% / 0.20), transparent 70%)" }}
        />
        <div
          className="absolute bottom-[-120px] left-1/3 h-[520px] w-[520px] rounded-full blur-3xl animate-blob-slower"
          style={{ background: "radial-gradient(circle, hsl(340 70% 45% / 0.18), transparent 70%)" }}
        />

        {/* Light streaks */}
        <div className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-foreground/10 to-transparent" />
        <div className="absolute right-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-foreground/10 to-transparent" />

        {/* Particles */}
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute block h-1 w-1 rounded-full bg-foreground/30 animate-float"
            style={{
              top: `${(i * 53) % 100}%`,
              left: `${(i * 37) % 100}%`,
              animationDelay: `${(i % 6) * 0.6}s`,
              animationDuration: `${6 + (i % 5)}s`,
            }}
          />
        ))}
      </div>

      {/* Floating glass UI cards (parallax) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{ transform: "translate3d(var(--mx, 0), var(--my, 0), 0)" }}
      >
        {/* Match score chip — top left */}
        <div className="absolute left-[6%] top-[22%] animate-fade-in">
          <div className="flex items-center gap-2 rounded-full border border-white/40 bg-white/50 px-3 py-2 shadow-xl backdrop-blur-xl">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="text-xs">
              <div className="font-semibold text-foreground">94% Match</div>
              <div className="text-muted-foreground">Senior Frontend · Stripe</div>
            </div>
          </div>
        </div>

        {/* Analytics card — top right */}
        <div className="absolute right-[6%] top-[18%] animate-fade-in" style={{ animationDelay: "120ms" }}>
          <div className="w-[220px] rounded-xl border border-white/40 bg-white/55 p-3 shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                This Week
              </span>
              <TrendingUp className="h-3.5 w-3.5 text-success" />
            </div>
            <div className="mt-1 font-serif-display text-2xl text-foreground">+38%</div>
            <div className="text-xs text-muted-foreground">Relevant matches</div>
            <div className="mt-2 flex h-8 items-end gap-1">
              {[40, 65, 50, 80, 55, 90, 100].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-gradient-to-t from-primary/70 to-primary/30"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Notification — bottom left */}
        <div className="absolute bottom-[18%] left-[8%] animate-fade-in" style={{ animationDelay: "240ms" }}>
          <div className="flex w-[260px] items-start gap-3 rounded-xl border border-white/40 bg-white/55 p-3 shadow-xl backdrop-blur-xl">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Bell className="h-4 w-4" />
            </div>
            <div className="text-xs">
              <div className="font-semibold text-foreground">9:00 AM Digest ready</div>
              <div className="text-muted-foreground">10 new precision-matched roles</div>
            </div>
          </div>
        </div>

        {/* Job preview — bottom right */}
        <div className="absolute bottom-[14%] right-[7%] animate-fade-in" style={{ animationDelay: "360ms" }}>
          <div className="w-[240px] rounded-xl border border-white/40 bg-white/55 p-3 shadow-xl backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground/5">
                <Briefcase className="h-4 w-4 text-foreground" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-foreground">
                  Product Engineer
                </div>
                <div className="truncate text-[11px] text-muted-foreground">
                  Razorpay · Bengaluru · Remote
                </div>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {["React", "TS", "Node"].map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-foreground/5 px-2 py-0.5 text-[10px] text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center animate-fade-in">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur-md">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          AI-powered job intelligence
        </div>

        <h1 className="mt-sp-3 font-serif-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
          Stop Missing The
          <br />
          <span className="bg-gradient-to-r from-primary via-[hsl(350_70%_40%)] to-[hsl(20_80%_45%)] bg-clip-text text-transparent">
            Right Jobs.
          </span>
        </h1>

        <p className="mt-sp-3 max-w-xl text-base text-muted-foreground md:text-lg">
          Precision-matched job discovery delivered daily at 9AM.
        </p>

        <div className="mt-sp-4 flex flex-col items-center gap-sp-2 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="group relative h-12 overflow-hidden rounded-full px-7 shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.6)] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-10px_hsl(var(--primary)/0.7)]"
          >
            <Link to="/settings">
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-[hsl(350_70%_38%)] to-[hsl(15_75%_42%)]" />
              <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-[hsl(15_75%_45%)] via-[hsl(350_70%_42%)] to-primary" />
              <span className="relative z-10 flex items-center gap-2 text-primary-foreground">
                Start Tracking
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Button>

          <Button asChild variant="ghost" size="lg" className="h-12 rounded-full px-5 text-foreground/80">
            <Link to="/dashboard">See live demo</Link>
          </Button>
        </div>

        <div className="mt-sp-4 flex flex-wrap items-center justify-center gap-x-sp-3 gap-y-2 text-xs text-muted-foreground">
          <span>Trusted by engineers from</span>
          {["Stripe", "Razorpay", "Swiggy", "Zerodha", "CRED"].map((c) => (
            <span key={c} className="font-medium text-foreground/70">
              {c}
            </span>
          ))}
        </div>

        {/* Hero showcase image */}
        <div className="mt-sp-5 w-full animate-fade-in" style={{ animationDelay: "480ms" }}>
          <div className="relative mx-auto max-w-5xl rounded-2xl border border-white/40 bg-white/40 p-2 shadow-[0_30px_80px_-20px_hsl(var(--primary)/0.35)] backdrop-blur-xl">
            <img
              src={heroImage}
              alt="KodNest precision-matched job discovery dashboard preview"
              loading="lazy"
              className="w-full rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default LandingPage;
