const SUBSYSTEMS = [
  {
    name: "Backend",
    status: "● ONLINE",
    chips: ["Java 17", "Spring Boot", "Spring Cloud", "Microservices", "REST", "GraphQL", "Kafka"],
  },
  {
    name: "Frontend",
    status: "● ONLINE",
    chips: ["React", "Redux", "TypeScript", "Angular", "Next.js", "Tailwind"],
  },
  {
    name: "Cloud & DevOps",
    status: "● ONLINE",
    chips: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform", "CI/CD"],
  },
  {
    name: "Data",
    status: "● ONLINE",
    chips: ["PostgreSQL", "Oracle", "Redis", "DynamoDB", "MongoDB"],
  },
  {
    name: "AI & Automation",
    status: "● ACTIVE BUILD",
    chips: ["GenAI", "LangChain", "LangGraph", "Agentic AI", "RAG", "MCP", "Python", "FastAPI"],
    span2: true,
  },
];

export default function Capabilities() {
  return (
    <section className="section" id="capabilities" aria-labelledby="capabilities-heading">
      <div className="eyebrow mono">
        <span className="n">02</span> SUBSYSTEMS
      </div>
      <h2 className="title" id="capabilities-heading" data-reveal>
        Capabilities, online
      </h2>
      <p className="lede" data-reveal>
        Five subsystems I run day to day, from the services under the hood to the AI layer on top.
      </p>
      <div className="subsys">
        {SUBSYSTEMS.map(({ name, status, chips, span2 }) => (
          <div key={name} className={`cell${span2 ? " span2" : ""}`} data-reveal>
            <h3>
              {name}
              <span className="stat mono">{status}</span>
            </h3>
            <div className="chips">
              {chips.map((chip) => (
                <span key={chip} className="chip">
                  {chip}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
