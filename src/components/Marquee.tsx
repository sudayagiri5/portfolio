const SKILLS =
  "JAVA 17 SPRING BOOT MICROSERVICES REACT ANGULAR NODE.JS PYTHON AWS AZURE KAFKA POSTGRESQL KUBERNETES TERRAFORM TYPESCRIPT GRAPHQL LANGCHAIN AGENTIC AI RAG";

export default function Marquee() {
  return (
    <div className="marquee mono" aria-hidden="true">
      <div className="marquee-track">
        <span>{SKILLS}</span>
        <span>{SKILLS}</span>
      </div>
    </div>
  );
}
