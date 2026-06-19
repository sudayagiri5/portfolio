"use client";
import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    document.querySelectorAll("[data-reveal]").forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${(i % 4) * 0.06}s`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
