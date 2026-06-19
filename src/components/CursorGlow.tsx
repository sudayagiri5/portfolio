"use client";
import { useEffect } from "react";

export default function CursorGlow() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const glow = document.getElementById("glow") as HTMLDivElement | null;
    if (!glow || !fine || reduce) return;

    glow.style.display = "block";
    let gx = 0, gy = 0, tx = 0, ty = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      glow.style.opacity = "0.85";
      if (!raf) loop();
    };

    const loop = () => {
      gx += (tx - gx) * 0.12;
      gy += (ty - gy) * 0.12;
      glow.style.transform = `translate(${gx}px,${gy}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
