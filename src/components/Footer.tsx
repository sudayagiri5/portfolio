"use client";

export default function Footer() {
  const scrollTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer>
      <div className="foot-in mono">
        <span>© 2026 SAIRAGHAV UDAYAGIRI</span>
        <span>ALL RIGHTS RESERVED</span>
        <button className="totop" onClick={scrollTop} aria-label="Return to top">
          ▲ RETURN TO TOP
        </button>
      </div>
    </footer>
  );
}
