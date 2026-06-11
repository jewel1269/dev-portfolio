import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0b0b",
          borderRadius: "7px",
          color: "#ededed",
          fontSize: "20px",
          fontWeight: 700,
          fontFamily: "sans-serif",
        }}
      >
        J<span style={{ color: "#c5ff4d" }}>.</span>
      </div>
    ),
    {
      ...size,
    }
  );
}
