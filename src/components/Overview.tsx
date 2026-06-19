"use client";
import { useEffect, useRef } from "react";

interface StatCell {
  target: number;
  dec?: string;
  sfx: string;
  cap: string;
}

const STATS: StatCell[] = [
  { target: 5, sfx: "+", cap: "YEARS SHIPPING" },
  { target: 30, sfx: "+", cap: "APIS DESIGNED" },
  { target: 99, dec: ".9", sfx: "%", cap: "SERVICE UPTIME" },
];

export default function Overview() {
  const counted = useRef(false);

  useEffect(() => {
    const section = document.getElementById("overview");
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !counted.current) {
            counted.current = true;
            document.querySelectorAll<HTMLElement>(".sval").forEach((el) => {
              const t = parseInt(el.getAttribute("data-target") || "0", 10);
              const dec = el.getAttribute("data-dec") || "";
              let s = 0;
              const step = t / 40;
              const iv = setInterval(() => {
                s += step;
                if (s >= t) {
                  s = t;
                  clearInterval(iv);
                  el.textContent = t + dec;
                } else {
                  el.textContent = String(Math.floor(s));
                }
              }, 22);
            });
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" id="overview" aria-labelledby="overview-heading">
      <div className="eyebrow mono">
        <span className="n">01</span> OVERVIEW
      </div>
      <h2 className="title" id="overview-heading" data-reveal>
        The operator behind the systems
      </h2>
      <p className="lede" data-reveal>
        Five years across three regulated worlds, billing in telecom, enterprise platforms in
        healthcare, and payments at a top-10 bank, building production systems and owning them once
        they&apos;re live.
      </p>
      <div className="bento">
        <div className="cell span2 rows2" data-reveal>
          <div className="lbl mono">
            <span
              style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }}
              aria-hidden="true"
            />
            &nbsp;PROFILE
          </div>
          <p className="bio">
            I&apos;m a <b>senior full-stack engineer</b> on the team at <b>US Bank</b>, building
            online banking, payments, and loan origination for millions of customers. Before this I
            shipped enterprise platforms for a <b>global healthcare client</b> at Cognizant and{" "}
            <b>telecom billing systems</b> at Verizon, so regulated, high-stakes environments are
            home turf. I work the whole stack, <b>Java 17 / Spring Cloud</b> services and{" "}
            <b>React / Angular</b> front ends, on <b>AWS and Azure</b> with Kafka, Kubernetes, and
            Terraform. I like the unglamorous parts: the reconciliation job that saves finance a
            day, the pipeline that just doesn&apos;t fall over at 2 a.m. Lately I&apos;ve been
            building <b>agentic-AI and automation</b> on the same foundation, same reliability
            mindset, fewer humans in the loop.
          </p>
        </div>

        {STATS.map(({ target, dec, sfx, cap }) => (
          <div className="cell" key={cap} data-reveal>
            <div className="stat-num">
              <span
                className="sval"
                data-target={target}
                {...(dec ? { "data-dec": dec } : {})}
                aria-label={`${target}${dec ?? ""}${sfx}`}
              >
                0
              </span>
              <span className="sfx" aria-hidden="true">{sfx}</span>
            </div>
            <div className="stat-cap mono">{cap}</div>
          </div>
        ))}

        <div className="cell now" data-reveal>
          <div className="lbl mono">CURRENT POSTING</div>
          <b>US Bank</b>
          <span>Senior Full-Stack Engineer · Chicago</span>
        </div>
      </div>
    </section>
  );
}
