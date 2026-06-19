"use client";
import { useEffect, useRef, useState, useCallback } from "react";

interface Item {
  label: string;
  tag: string;
  act: () => void;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [sel, setSel] = useState(0);

  const go = useCallback(
    (hash: string) => {
      onClose();
      const el = document.querySelector(hash);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    },
    [onClose]
  );

  const items: Item[] = [
    { label: "Overview", tag: "01", act: () => go("#overview") },
    { label: "Capabilities", tag: "02", act: () => go("#capabilities") },
    { label: "Deployments", tag: "03", act: () => go("#deployments") },
    { label: "Modules", tag: "04", act: () => go("#modules") },
    { label: "Credentials", tag: "05", act: () => go("#credentials") },
    { label: "Contact", tag: "06", act: () => go("#contact") },
    {
      label: "Download résumé",
      tag: "CMD",
      act: () => {
        onClose();
        window.open("/resume.pdf", "_blank", "noopener,noreferrer");
      },
    },
    {
      label: "Toggle dark / light",
      tag: "CMD",
      act: () => {
        onClose();
        document.getElementById("themebtn")?.click();
      },
    },
    {
      label: "Open LinkedIn",
      tag: "LINK",
      act: () => {
        onClose();
        window.open(
          "https://linkedin.com/in/sairaghav-udayagiri-034366140",
          "_blank",
          "noopener,noreferrer"
        );
      },
    },
    {
      label: "Open GitHub",
      tag: "LINK",
      act: () => {
        onClose();
        window.open("https://github.com/sudayagiri5", "_blank", "noopener,noreferrer");
      },
    },
  ];

  const filtered = query
    ? items.filter((it) => it.label.toLowerCase().includes(query.toLowerCase()))
    : items;

  // Focus input when palette opens; state resets via key prop on the parent.
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSel((s) => Math.min(s + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSel((s) => Math.max(s - 1, 0));
      }
      if (e.key === "Enter" && filtered[sel]) {
        filtered[sel].act();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, filtered, sel, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="cmd"
      className="open"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div className="cmd-box">
        <div className="cmd-in">
          <span className="mono" aria-hidden="true">›</span>
          <input
            ref={inputRef}
            id="cmdinput"
            placeholder="Jump to a section or run a command…"
            autoComplete="off"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSel(0); }}
            aria-label="Search commands"
          />
        </div>
        <div className="cmd-list" id="cmdlist" role="listbox">
          {filtered.length === 0 ? (
            <div className="cmd-empty">
              No matches on this site.
              <br />
              <span className="mono">Try: Overview · Modules · Contact</span>
            </div>
          ) : (
            filtered.map((it, i) => (
              <div
                key={it.label}
                className={`cmd-item${i === sel ? " sel" : ""}`}
                onClick={it.act}
                role="option"
                aria-selected={i === sel}
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && it.act()}
              >
                <span>{it.label}</span>
                <span className="tag">{it.tag}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
