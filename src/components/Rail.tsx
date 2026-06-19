"use client";
import { useEffect } from "react";

const SECTIONS = [
  { id: "hero", num: "00", label: "HOME" },
  { id: "overview", num: "01", label: "OVERVIEW" },
  { id: "capabilities", num: "02", label: "SUBSYSTEMS" },
  { id: "deployments", num: "03", label: "MISSION LOG" },
  { id: "modules", num: "04", label: "MODULES" },
  { id: "credentials", num: "05", label: "CLEARANCE" },
  { id: "contact", num: "06", label: "OPEN CHANNEL" },
];

export default function Rail() {
  useEffect(() => {
    const links: Record<string, Element> = {};
    document.querySelectorAll(".rail a").forEach((a) => {
      const key = a.getAttribute("data-rail");
      if (key) links[key] = a;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            Object.values(links).forEach((l) => l.classList.remove("active"));
            if (links[e.target.id]) links[e.target.id].classList.add("active");
          }
        });
      },
      { threshold: 0.5 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="rail mono" id="rail" aria-label="Section navigation">
      {SECTIONS.map(({ id, num, label }) => (
        <a key={id} href={`#${id}`} data-rail={id} aria-label={label}>
          <span className="num">{num}</span>
          <span className="tick" aria-hidden="true" />
          <span className="label">{label}</span>
        </a>
      ))}
    </nav>
  );
}
