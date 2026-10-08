import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const size = { width: 128, height: 128 };
export const contentType = "image/png";

export default async function Icon() {
  const logo = await readFile(path.join(process.cwd(), "public/images/brand/sky-logo.png"));
  return new ImageResponse(<div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", background: "#071c35", borderRadius: 20 }}>
    {/* ImageResponse requires a native image element; artwork is displayed intact. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={`data:image/png;base64,${logo.toString("base64")}`} alt="" width={110} height={92} />
  </div>, size);
}
