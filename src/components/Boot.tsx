"use client";
import { useEffect, useRef } from "react";

const LINES = [
  "> initializing mission control",
  "> mounting subsystems ……… ok",
  "> establishing operator link … ok",
  "> all systems nominal",
];

export default function Boot() {
  const bootRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const boot = bootRef.current;
    const log = logRef.current;
    if (!boot) return;

    if (reduce) {
      boot.style.display = "none";
      return;
    }

    LINES.forEach((line, i) => {
      const d = document.createElement("div");
      d.textContent = line;
      d.style.animationDelay = `${i * 0.32}s`;
      log?.appendChild(d);
    });

    const end = () => {
      if (boot.classList.contains("done")) return;
      boot.classList.add("done");
    };

    const timer = setTimeout(end, 2000);
    document.addEventListener("keydown", end, { once: true });
    boot.addEventListener("click", end, { once: true });

    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", end);
    };
  }, []);

  return (
    <div id="boot" ref={bootRef} aria-hidden="true">
      <div className="boot-mark mono">S/U</div>
      <div className="boot-log mono" ref={logRef} />
      <div className="boot-bar">
        <i />
      </div>
      <div className="boot-hint mono">PRESS ANY KEY TO SKIP</div>
    </div>
  );
}
