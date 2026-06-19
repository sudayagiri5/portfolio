"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import Boot from "@/components/Boot";
import Header from "@/components/Header";
import Rail from "@/components/Rail";
import Hud from "@/components/Hud";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Overview from "@/components/Overview";
import Capabilities from "@/components/Capabilities";
import MissionLog from "@/components/MissionLog";
import Modules from "@/components/Modules";
import Credentials from "@/components/Credentials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import Toast from "@/components/Toast";
import type { ToastHandle } from "@/components/Toast";
import CursorGlow from "@/components/CursorGlow";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  const toastRef = useRef<ToastHandle>(null);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [cmdOpenKey, setCmdOpenKey] = useState(0);

  const showToast = useCallback((msg: string) => {
    toastRef.current?.show(msg);
  }, []);

  const openCmd = useCallback(() => {
    setCmdOpen(true);
    setCmdOpenKey((k) => k + 1);
  }, []);
  const closeCmd = useCallback(() => setCmdOpen(false), []);

  // Cmd/Ctrl+K — toggle palette; increment key only when opening so component remounts with fresh state.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (!cmdOpen) setCmdOpenKey((k) => k + 1);
        setCmdOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [cmdOpen]);

  return (
    <>
      <Boot />
      <div className="bracket tl" aria-hidden="true" />
      <div className="bracket tr" aria-hidden="true" />
      <div className="bracket bl" aria-hidden="true" />
      <div className="bracket br" aria-hidden="true" />
      <div id="glow" aria-hidden="true" />
      <CursorGlow />
      <ScrollReveal />

      <Header onOpenCmd={openCmd} onToast={showToast} />
      <Rail />
      <Hud />

      <main id="main-content">
        <Hero />
        <Marquee />
        <Overview />
        <Capabilities />
        <MissionLog />
        <Modules />
        <Credentials />
        <Contact onToast={showToast} />
      </main>

      <Footer />
      <CommandPalette key={cmdOpenKey} isOpen={cmdOpen} onClose={closeCmd} />
      <Toast ref={toastRef} />
    </>
  );
}
