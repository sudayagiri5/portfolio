const CERTS = [
  "AWS Solutions Architect Associate",
  "Azure AI Engineer AI-102",
  "IBM RAG & Agentic AI",
  "Professional Scrum Master I",
];

export default function Credentials() {
  return (
    <section className="section" id="credentials" aria-labelledby="credentials-heading">
      <div className="eyebrow mono">
        <span className="n">05</span> CLEARANCE
      </div>
      <h2 className="title" id="credentials-heading" data-reveal>
        Education &amp; certifications
      </h2>
      <div className="creds">
        <div className="cell" data-reveal>
          <div className="cred-deg">M.S., Information Technology &amp; Management</div>
          <div className="cred-sch">Illinois Institute of Technology · Chicago, IL</div>
          <div className="cred-meta mono">
            <span>DEC 2025</span>
            <span className="stem">STEM DESIGNATED</span>
          </div>
          <div
            style={{ fontSize: 12, color: "var(--tx-1)", marginTop: 12, lineHeight: 1.55 }}
          >
            Coursework: Project Management for IT, IT Auditing, Process Engineering,
            Service-Oriented Architectures, Big Data Infrastructure
          </div>
        </div>

        <div className="cell" data-reveal>
          <div className="cred-deg">B.E., Electrical Engineering</div>
          <div className="cred-sch">RMD Engineering College · Chennai, India</div>
          <div className="cred-meta mono">
            <span>2021</span>
          </div>
        </div>

        <div className="certs" data-reveal aria-label="Certifications">
          <div className="lbl mono">CERTIFICATIONS</div>
          <div className="cert-list">
            {CERTS.map((c) => (
              <div key={c} className="cert">
                {c} <span className="ip">IN PROGRESS</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
