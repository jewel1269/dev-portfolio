import { ImageResponse } from "next/og";

export const alt = "Jewel Mia — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#0b0b0b",
          color: "#ededed",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "28px",
            letterSpacing: "6px",
            textTransform: "uppercase",
            color: "#8a8a8a",
          }}
        >
          <div style={{ width: "48px", height: "2px", background: "#c5ff4d" }} />
          <div>Software Engineer</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: "130px", fontWeight: 700, lineHeight: 1 }}>
            <div style={{ color: "#c5ff4d" }}>{"I'm"}</div>
            <div style={{ marginLeft: "30px" }}>Jewel Mia</div>
            <div style={{ color: "#c5ff4d" }}>.</div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "34px",
              color: "#8a8a8a",
              marginTop: "32px",
              maxWidth: "900px",
            }}
          >
            Scalable web platforms, mobile apps & AI-integrated products
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "26px",
            color: "#8a8a8a",
          }}
        >
          <div>Dhaka, Bangladesh</div>
          <div style={{ color: "#c5ff4d" }}>Available for projects</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
