const MODULES = [
  {
    idx: "MOD-01",
    badge: "IN DEVELOPMENT",
    badgeClass: "",
    title: "AtlasAssist",
    desc: "An agentic RAG assistant that retrieves across private knowledge bases and reasons over them, built for grounded, citable answers.",
    tags: ["Python", "LangGraph", "pgvector", "MCP"],
    href: null,
  },
  {
    idx: "MOD-02",
    badge: "IN DEVELOPMENT",
    badgeClass: "",
    title: "FlowOps Commander",
    desc: "A multi-agent automation hub that orchestrates specialized agents to run end-to-end operational workflows from a single console.",
    tags: ["LangGraph", "FastAPI", "Node.js", "Postgres"],
    href: null,
  },
  {
    idx: "MOD-03",
    badge: "OPEN SOURCE",
    badgeClass: "",
    title: "ledger-recon",
    desc: "A runnable Spring Batch reference that reconciles an internal ledger against a bank statement, classifies every exception, and serves results over a REST API. Synthetic data, the patterns behind real financial-ops automation.",
    tags: ["Java 17", "Spring Batch", "Spring Data JPA", "REST"],
    href: "https://github.com/sudayagiri5/ledger-recon",
  },
];

export default function Modules() {
  return (
    <section className="section" id="modules" aria-labelledby="modules-heading">
      <div className="eyebrow mono">
        <span className="n">04</span> MODULES
      </div>
      <h2 className="title" id="modules-heading" data-reveal>
        What I&apos;m building
      </h2>
      <p className="lede" data-reveal>
        What I build when no one&apos;s assigning the tickets.
      </p>
      <div className="modules">
        {MODULES.map(({ idx, badge, badgeClass, title, desc, tags, href }) => {
          const inner = (
            <>
              <div className="top">
                <span className="idx mono">{idx}</span>
                <span className={`badge mono${badgeClass ? " " + badgeClass : ""}`}>{badge}</span>
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <div className="tags">
                {tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </>
          );

          return href ? (
            <a
              key={title}
              className="mod tilt"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
              aria-label={`${title} — view on GitHub`}
            >
              {inner}
            </a>
          ) : (
            <div key={title} className="mod tilt" data-reveal>
              {inner}
            </div>
          );
        })}
      </div>
    </section>
  );
}
