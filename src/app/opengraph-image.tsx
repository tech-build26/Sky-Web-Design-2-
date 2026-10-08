import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Skyriders — Access Beyond Limits. Rope access, inspection and maintenance in South Africa.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(path.join(process.cwd(), "public/images/brand/sky-logo.png"));
  return new ImageResponse(<div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "55px 72px", background: "#071c35", color: "white" }}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={`data:image/png;base64,${logo.toString("base64")}`} alt="" width={180} height={150} />
    <div style={{ display: "flex", fontSize: 84, fontWeight: 700, marginTop: 22, letterSpacing: -4 }}>ACCESS BEYOND</div>
    <div style={{ display: "flex", fontSize: 84, fontWeight: 700, color: "#64bfff", letterSpacing: -4 }}>LIMITS.</div>
    <div style={{ display: "flex", fontSize: 24, color: "#c5dcef", marginTop: 30 }}>Rope access · Inspection · Maintenance · South Africa</div>
  </div>, size);
}
