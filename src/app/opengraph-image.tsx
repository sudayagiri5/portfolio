import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#0A0E16",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            right: -100,
            top: "50%",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245,166,35,0.25) 0%, transparent 60%)",
            transform: "translateY(-50%)",
          }}
        />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Status badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 13,
              color: "#9AA4B2",
              letterSpacing: "0.18em",
              fontFamily: "monospace",
              marginBottom: 8,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#46D38A",
              }}
            />
            ONLINE · AVAILABLE FOR NEW ROLES
          </div>
          {/* Name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#E7ECF3",
              lineHeight: 1,
              letterSpacing: "-0.025em",
            }}
          >
            Sairaghav Udayagiri
          </div>
          {/* Title */}
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: "#F5A623",
              letterSpacing: "-0.01em",
            }}
          >
            Senior Full-Stack Software Engineer
          </div>
          {/* Sub */}
          <div
            style={{
              fontSize: 18,
              color: "#9AA4B2",
              marginTop: 8,
              maxWidth: 680,
              lineHeight: 1.5,
            }}
          >
            Banking · Healthcare · Telecom · AI Automation · Chicago, IL
          </div>
          {/* Tags */}
          <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
            {["Java 17", "Spring Boot", "React", "AWS", "LangChain"].map((tag) => (
              <div
                key={tag}
                style={{
                  fontSize: 12,
                  padding: "6px 14px",
                  border: "1px solid rgba(245,166,35,0.3)",
                  borderRadius: 8,
                  color: "#9AA4B2",
                  fontFamily: "monospace",
                  letterSpacing: "0.08em",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
        {/* Bottom callsign */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            right: 80,
            fontFamily: "monospace",
            fontSize: 14,
            color: "rgba(245,166,35,0.6)",
            letterSpacing: "0.2em",
          }}
        >
          S/U · sairaghav.dev
        </div>
      </div>
    ),
    size
  );
}
