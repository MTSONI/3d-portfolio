import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#141516",
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 999,
            background: "#c8f04a",
            boxShadow: "0 0 60px rgba(200,240,74,0.6)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
