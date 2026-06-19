"use client";
import { useEffect, useRef } from "react";

export default function Hud() {
  const hudRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const barsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tick = () => {
      try {
        const t = new Intl.DateTimeFormat("en-US", {
          timeZone: "America/Chicago",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(new Date());
        if (clockRef.current) clockRef.current.textContent = t + " CST";
      } catch {
        if (clockRef.current)
          clockRef.current.textContent = new Date().toTimeString().slice(0, 8) + " CST";
      }
    };
    tick();
    const iv = setInterval(tick, 1000);

    if (!reduce && barsRef.current) {
      for (let i = 0; i < 14; i++) {
        const b = document.createElement("i");
        b.style.animationDelay = `${Math.random() * 1.2}s`;
        barsRef.current.appendChild(b);
      }
    }

    const hud = hudRef.current;
    const footer = document.querySelector("footer");
    let fo: IntersectionObserver | undefined;
    if (footer && hud) {
      fo = new IntersectionObserver(
        (es) => es.forEach((e) => hud.classList.toggle("faded", e.isIntersecting)),
        { threshold: 0.05 }
      );
      fo.observe(footer);
    }

    return () => {
      clearInterval(iv);
      fo?.disconnect();
    };
  }, []);

  return (
    <div className="hud mono" id="hud" ref={hudRef} aria-hidden="true">
      <div className="row" title="Everything is operating normally — available for new roles">
        <span
          style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--online)", boxShadow: "0 0 8px var(--online)", display: "inline-block" }}
        />
        {" "}ALL SYSTEMS NOMINAL
      </div>
      <div className="row">
        <span ref={clockRef} id="clock">--:--:-- CST</span>
      </div>
      <div className="row">
        THROUGHPUT <span className="bars" ref={barsRef} id="hudbars" />
      </div>
    </div>
  );
}
