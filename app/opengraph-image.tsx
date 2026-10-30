import { ImageResponse } from "next/og";

export const alt = "The Growth Lab — Meet Soni. Growth isn't accidental. It's engineered.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social preview: wordmark, headline and the three engine modules as rings. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(70% 80% at 78% 60%, #23241c 0%, #0c0c0d 70%)",
          color: "#ece5d2",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "monospace", fontSize: 22, letterSpacing: 4 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#c8f04a" }} />
          THE GROWTH LAB
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 82, lineHeight: 1 }}>
          <span>Growth isn&apos;t accidental.</span>
          <span style={{ color: "#c8f04a", fontStyle: "italic" }}>It&apos;s engineered.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <span style={{ fontFamily: "monospace", fontSize: 22, color: "#b9b2a1" }}>
            Meet Soni · Strategy · GTM · AI Automation · Execution
          </span>
          <div style={{ display: "flex", position: "relative", width: 220, height: 120 }}>
            <div style={{ position: "absolute", left: 0, top: 30, width: 90, height: 90, borderRadius: 999, border: "3px solid #ece5d2" }} />
            <div style={{ position: "absolute", left: 65, top: 0, width: 90, height: 90, borderRadius: 999, border: "3px solid #e0773c" }} />
            <div style={{ position: "absolute", left: 130, top: 30, width: 90, height: 90, borderRadius: 999, border: "3px solid #c8f04a" }} />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
