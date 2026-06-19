"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

const POSTINGS = [
  {
    co: "US BANK",
    rows: [
      ["ROLE", "Sr Full-Stack SW Eng", false],
      ["DOMAIN", "Banking · Fintech", false],
      ["SPAN", "Feb 2025 — Now", false],
      ["STACK", "Java · Spring · React", false],
      ["STATUS", "ACTIVE", true],
    ],
  },
  {
    co: "COGNIZANT",
    rows: [
      ["ROLE", "Software Engineer", false],
      ["DOMAIN", "Healthcare · Pharma", false],
      ["SPAN", "2021 — 2023", false],
      ["STACK", "Angular · React · Java", false],
      ["STATUS", "COMPLETE", false],
    ],
  },
  {
    co: "VERIZON",
    rows: [
      ["ROLE", "Jr Software Engineer", false],
      ["DOMAIN", "Telecom", false],
      ["SPAN", "2020 — 2021", false],
      ["STACK", "Java · Angular · Azure", false],
      ["STATUS", "COMPLETE", false],
    ],
  },
];

export default function Hero() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const coRef = useRef<HTMLSpanElement>(null);
  const ledsRef = useRef<HTMLSpanElement>(null);
  const tpRef = useRef<HTMLDivElement>(null);
  const curP = useRef(0);
  const autoRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const renderPosting = (i: number) => {
    const body = bodyRef.current;
    const co = coRef.current;
    const leds = ledsRef.current?.querySelectorAll("i");
    if (!body || !co || !leds) return;
    body.classList.add("swap");
    setTimeout(() => {
      co.textContent = `OPERATOR // ${POSTINGS[i].co}`;
      body.innerHTML = POSTINGS[i].rows
        .map(
          ([k, v, ok]) =>
            `<div class="cline"><span class="k mono">${k}</span><span class="v${ok ? " ok" : ""}">${v}</span></div>`
        )
        .join("");
      leds.forEach((l, idx) => l.classList.toggle("active", idx === i));
      body.classList.remove("swap");
    }, 180);
    curP.current = i;
  };

  const startAuto = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    autoRef.current = setInterval(() => {
      renderPosting((curP.current + 1) % 3);
    }, 7000);
  };

  const restartAuto = () => {
    clearInterval(autoRef.current);
    startAuto();
  };

  useEffect(() => {
    renderPosting(0);
    startAuto();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && tpRef.current) {
      for (let i = 0; i < 28; i++) {
        const b = document.createElement("i");
        b.style.animationDelay = `${Math.random() * 1.3}s`;
        b.style.height = `${4 + Math.random() * 26}px`;
        tpRef.current.appendChild(b);
      }
    }

    // LED click handlers — store refs for cleanup
    const leds = ledsRef.current?.querySelectorAll("i");
    const ledHandlers: Array<() => void> = [];
    leds?.forEach((l, idx) => {
      const handler = () => { renderPosting(idx); restartAuto(); };
      ledHandlers.push(handler);
      l.addEventListener("click", handler);
    });

    // Tilt on module cards
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (fine && !reduce) {
      document.querySelectorAll<HTMLElement>(".tilt").forEach((c) => {
        c.addEventListener("mousemove", (e) => {
          const r = c.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          c.style.transform = `perspective(800px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg) translateY(-3px)`;
        });
        c.addEventListener("mouseleave", () => { c.style.transform = ""; });
      });

      document.querySelectorAll<HTMLElement>(".magnetic").forEach((b) => {
        b.addEventListener("mousemove", (e) => {
          const r = b.getBoundingClientRect();
          const x = e.clientX - (r.left + r.width / 2);
          const y = e.clientY - (r.top + r.height / 2);
          b.style.transform = `translate(${x * 0.22}px,${y * 0.3}px)`;
        });
        b.addEventListener("mouseleave", () => { b.style.transform = ""; });
      });
    }

    // Bento cell glow
    if (fine) {
      document.querySelectorAll<HTMLElement>(".cell").forEach((c) => {
        c.addEventListener("mousemove", (e) => {
          const r = c.getBoundingClientRect();
          c.style.setProperty("--mx", `${e.clientX - r.left}px`);
          c.style.setProperty("--my", `${e.clientY - r.top}px`);
        });
      });
    }

    return () => {
      clearInterval(autoRef.current);
      leds?.forEach((l, i) => l.removeEventListener("click", ledHandlers[i]));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConsoleEnter = () => clearInterval(autoRef.current);
  const handleConsoleLeave = () => startAuto();

  return (
    <section id="hero" aria-labelledby="hero-heading">
      <div id="sweep" aria-hidden="true" />
      <div className="hero-grid">
        <div>
          <div className="status-tag mono" data-reveal title="Online — available for new roles">
            <span className="dot" aria-hidden="true" />
            ONLINE · AVAILABLE FOR NEW ROLES
          </div>
          <h1 id="hero-heading" data-reveal>
            Sairaghav
            <br />
            Udayagiri
            <span className="role">Senior Full-Stack Software Engineer</span>
          </h1>
          <p className="hero-sub" data-reveal>
            Five years across three regulated worlds, telecom at Verizon, healthcare software at Cognizant, and now banking at US Bank. I build systems that scale, automate the work that shouldn&apos;t be manual, and ship software that holds up under real load, then stay on to own it. Lately, teaching AI agents to handle the boring parts.
          </p>
          <div className="cta-row" data-reveal>
            <a
              className="btn primary magnetic"
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download résumé (PDF)"
            >
              ↓ Download résumé
            </a>
            <Link className="btn ghost magnetic" href="#modules">
              View systems →
            </Link>
          </div>
        </div>

        <div
          className="console"
          id="console"
          data-reveal
          onMouseEnter={handleConsoleEnter}
          onMouseLeave={handleConsoleLeave}
          aria-label="Operator console — employment history"
        >
          <div className="bar mono">
            <span ref={coRef} id="consoleco">OPERATOR // US BANK</span>
            <span className="leds" ref={ledsRef}>
              <i className="active" data-i="0" aria-label="US Bank" />
              <i data-i="1" aria-label="Cognizant" />
              <i data-i="2" aria-label="Verizon" />
            </span>
          </div>
          <div className="body" id="consolebody" ref={bodyRef} />
          <div className="hint mono" aria-hidden="true">◂ TAP DOTS TO SWITCH POSTING ▸</div>
          <div className="tpwrap" ref={tpRef} id="herotp" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
