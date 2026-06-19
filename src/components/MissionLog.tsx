const ENTRIES = [
  {
    company: "US Bank",
    role: "Senior Full-Stack Software Engineer",
    meta: ["FEB 2025 — PRESENT", "CHICAGO, IL"],
    status: { label: "● ACTIVE", done: false },
    active: true,
    bullets: [
      "Build full-stack banking features, Java 17 / Spring Boot services with React front ends, across online banking, payments, and loan origination.",
      "Architect resilient Spring Cloud microservices (gateway, discovery, circuit breakers, tracing) holding 99.9% availability and sub-100ms responses.",
      "Run CI/CD on Jenkins and GitHub Actions with 90%+ coverage; Spring Batch jobs cut manual finance work by ~60%.",
    ],
  },
  {
    company: "Cognizant",
    role: "Software Engineer",
    meta: ["MAR 2021 — DEC 2023", "HYDERABAD, IN"],
    status: { label: "● COMPLETE", done: true },
    active: false,
    bullets: [
      "Delivered full-stack features on a business-critical platform for a global pharmaceutical client, Spring Boot services, Angular 12–16, and React.",
      "Owned L2 production support, ~8–10 incidents a sprint resolved under SLA with zero escalations; earned the Best Team Member Award.",
      "Held the quality line with TDD, automated test gates, and peer review across Jenkins and Docker.",
    ],
  },
  {
    company: "Verizon",
    role: "Junior Software Engineer",
    meta: ["JAN 2020 — MAR 2021", "HYDERABAD, IN"],
    status: { label: "● COMPLETE", done: true },
    active: false,
    bullets: [
      "Built telecom apps for customer management and billing with Java 11, Spring Boot, and Angular.",
      "Wrote Spring Batch pipelines for billing cycles and reconciliation; deployed on Azure via Azure DevOps.",
    ],
  },
];

export default function MissionLog() {
  return (
    <section className="section" id="deployments" aria-labelledby="deployments-heading">
      <div className="eyebrow mono">
        <span className="n">03</span> MISSION LOG
      </div>
      <h2 className="title" id="deployments-heading" data-reveal>
        Deployment history
      </h2>
      <p className="lede" data-reveal>
        Three industries, three postings, one operating principle: own what you ship.
      </p>
      <div className="log">
        {ENTRIES.map(({ company, role, meta, status, active, bullets }) => (
          <article key={company} className={`entry${active ? " active" : ""}`} data-reveal>
            <div className="node" aria-hidden="true" />
            <div className="head">
              <span className="co">{company}</span>
              <span className="ro">{role}</span>
            </div>
            <div className="meta mono">
              {meta.map((m) => (
                <span key={m}>{m}</span>
              ))}
              <span className={`st${status.done ? " done" : ""}`}>{status.label}</span>
            </div>
            <ul aria-label={`${company} responsibilities`}>
              {bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
