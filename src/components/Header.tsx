"use client";
import { useEffect, useRef } from "react";

interface HeaderProps {
  onOpenCmd: () => void;
  onToast: (msg: string) => void;
}

const ACCENTS: [string, string][] = [
  ["#F5A623", "AMBER"],
  ["#5BB7F0", "CYAN"],
  ["#46D38A", "SIGNAL"],
  ["#C792EA", "MAGENTA"],
];

export default function Header({ onOpenCmd, onToast }: HeaderProps) {
  const hdrRef = useRef<HTMLElement>(null);
  const accentIdx = useRef(0);

  useEffect(() => {
    // Restore persisted theme after mount so server ("dark") and client markup match,
    // then diverge safely — this runs only on the client after hydration.
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      document.documentElement.setAttribute("data-theme", saved);
    }

    const handler = () => {
      hdrRef.current?.classList.toggle("scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleTheme = () => {
    const cur = document.documentElement.getAttribute("data-theme");
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    onToast(`DISPLAY // ${next.toUpperCase()} MODE`);
  };

  const handleCallsign = () => {
    accentIdx.current = (accentIdx.current + 1) % ACCENTS.length;
    const [color, name] = ACCENTS[accentIdx.current];
    const root = document.documentElement.style;
    root.setProperty("--accent", color);
    root.setProperty("--accent-glow", color + "4d");
    root.setProperty("--line-accent", color + "3a");
    onToast(`DISPLAY CHANNEL // ${name}`);
  };

  return (
    <header ref={hdrRef} id="hdr">
      <div
        className="callsign"
        id="callsign"
        onClick={handleCallsign}
        title="Switch display channel (accent color)"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleCallsign()}
        aria-label="Sairaghav Udayagiri — click to cycle accent color"
      >
        <span className="dot" aria-hidden="true" />
        <div>
          <b>Sairaghav Udayagiri</b>
          <br />
          <span className="tag mono">FULL-STACK · AI AUTOMATION</span>
        </div>
      </div>

      <nav className="top" aria-label="Primary navigation">
        <a href="#overview">Overview</a>
        <a href="#capabilities">Capabilities</a>
        <a href="#deployments">Deployments</a>
        <a href="#modules">Modules</a>
        <a href="#contact">Contact</a>
      </nav>

      <div className="hctl">
        <button
          className="menubtn mono"
          id="menubtn"
          onClick={onOpenCmd}
          aria-label="Open menu"
        >
          ☰ MENU
        </button>
        <div
          className="cmd-key"
          id="cmdopen"
          onClick={onOpenCmd}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onOpenCmd()}
          aria-label="Open command palette"
        >
          <span className="mono">⌘K</span>{" "}
          <span>Command</span>
        </div>
        <button
          className="btn-icon"
          id="themebtn"
          onClick={handleTheme}
          title="Toggle dark / light"
          aria-label="Toggle theme"
        >
          ◑
        </button>
      </div>
    </header>
  );
}
