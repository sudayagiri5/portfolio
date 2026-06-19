"use client";
import { useState, FormEvent } from "react";

interface ContactProps {
  onToast: (msg: string) => void;
}

export default function Contact({ onToast }: ContactProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; msg?: string }>({});
  const [sending, setSending] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const validate = () => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = "Name is required";
    if (!msg.trim()) e.msg = "Message is required";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Check email format";
    return e;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (honeypot) return; // bot trap

    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      onToast("TRANSMISSION // form will be active at deploy — keys not configured");
      return;
    }

    setSending(true);
    try {
      const emailjs = await import("@emailjs/browser");
      await emailjs.send(serviceId, templateId, { from_name: name, from_email: email, message: msg }, publicKey);
      onToast("TRANSMISSION // sent — I'll reply fast");
      setName(""); setEmail(""); setMsg("");
    } catch {
      onToast("TRANSMISSION // failed — try sairaghavuk@gmail.com");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="section" id="contact" aria-labelledby="contact-heading">
      <div className="eyebrow mono">
        <span className="n">06</span> OPEN CHANNEL
      </div>
      <h2 className="title" id="contact-heading" data-reveal>
        Let&apos;s talk
      </h2>
      <p className="lede" data-reveal>
        Open to senior full-stack, AI-engineering, and automation roles, anywhere in the US. Two
        weeks&apos; notice, and I reply fast.
      </p>
      <div className="wrap">
        <div className="id-card" data-reveal>
          <div className="id-top">
            <svg
              className="avatar-wrap"
              viewBox="0 0 96 96"
              fill="none"
              aria-label="Waving avatar of Sairaghav"
              role="img"
            >
              <circle
                className="av-ring"
                cx="48"
                cy="48"
                r="45"
                stroke="var(--accent)"
                strokeWidth="1.4"
                strokeDasharray="3 7"
                opacity=".45"
              />
              <circle cx="48" cy="48" r="37" fill="var(--bg-2)" stroke="var(--line)" strokeWidth="1" />
              <circle cx="48" cy="40" r="11" fill="var(--accent)" opacity=".92" />
              <path d="M27 70c2.4-12 10-18 21-18s18.6 6 21 18" fill="var(--accent)" opacity=".92" />
              <g className="av-hand">
                <circle cx="68" cy="40" r="6.4" fill="var(--accent)" />
                <rect x="64.5" y="40" width="7" height="13" rx="3.5" fill="var(--accent)" />
              </g>
              <g className="av-bubble">
                <rect x="62" y="14" width="26" height="17" rx="6" fill="var(--bg-1)" stroke="var(--accent)" strokeWidth="1.2" />
                <text x="75" y="26" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="var(--accent)" textAnchor="middle">hi</text>
              </g>
            </svg>
            <div>
              <b>Sairaghav Udayagiri</b>
              <span>Senior Full-Stack Engineer · AI Automation</span>
            </div>
          </div>
          <div className="channels">
            <a className="ch" href="mailto:sairaghavuk@gmail.com">
              <span>
                <span className="k mono">EMAIL</span>
                <br />
                sairaghavuk@gmail.com
              </span>
              <span aria-hidden="true">→</span>
            </a>
            <a
              className="ch"
              href="https://linkedin.com/in/sairaghav-udayagiri-034366140"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                <span className="k mono">LINKEDIN</span>
                <br />
                /sairaghav-udayagiri
              </span>
              <span aria-hidden="true">→</span>
            </a>
            <a
              className="ch"
              href="https://github.com/sudayagiri5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                <span className="k mono">GITHUB</span>
                <br />
                /sudayagiri5
              </span>
              <span aria-hidden="true">→</span>
            </a>
            <div className="ch">
              <span>
                <span className="k mono">LOCATION</span>
                <br />
                Chicago, IL · Open to Relocation
              </span>
              <span className="mono" style={{ color: "var(--online)" }} aria-hidden="true">●</span>
            </div>
          </div>
        </div>

        <form className="form" data-reveal onSubmit={handleSubmit} noValidate aria-label="Contact form">
          {/* Honeypot */}
          <div style={{ display: "none" }} aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <div className="fld">
            <label htmlFor="f-name" className="mono">NAME</label>
            <input
              id="f-name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-required="true"
              aria-describedby={errors.name ? "err-name" : undefined}
            />
            {errors.name && <span id="err-name" className="error-msg" role="alert">{errors.name}</span>}
          </div>

          <div className="fld">
            <label htmlFor="f-email" className="mono">EMAIL</label>
            <input
              id="f-email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby={errors.email ? "err-email" : undefined}
            />
            {errors.email && <span id="err-email" className="error-msg" role="alert">{errors.email}</span>}
          </div>

          <div className="fld">
            <label htmlFor="f-msg" className="mono">MESSAGE</label>
            <textarea
              id="f-msg"
              rows={4}
              placeholder="A line about the role…"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              aria-required="true"
              aria-describedby={errors.msg ? "err-msg" : undefined}
            />
            {errors.msg && <span id="err-msg" className="error-msg" role="alert">{errors.msg}</span>}
          </div>

          <button
            className="btn primary"
            id="sendbtn"
            type="submit"
            disabled={sending}
            style={{ alignSelf: "flex-start" }}
          >
            {sending ? "Sending…" : "Send transmission →"}
          </button>
        </form>
      </div>
    </section>
  );
}
