import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "24px",
        padding: "20px",
        textAlign: "center",
        background: "var(--bg)",
        color: "var(--tx)",
      }}
    >
      <div className="mono" style={{ fontSize: "clamp(14px,3vw,18px)", color: "var(--accent)", letterSpacing: "0.2em" }}>
        S/U
      </div>
      <h1 style={{ fontSize: "clamp(60px,12vw,100px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1 }}>
        404
      </h1>
      <p style={{ color: "var(--tx-1)", fontSize: 15, maxWidth: 340, lineHeight: 1.6 }}>
        Sector not found. This page doesn&apos;t exist in the current deployment.
      </p>
      <Link
        href="/"
        className="btn primary"
        style={{ textDecoration: "none" }}
      >
        ← Return to base
      </Link>
    </main>
  );
}
