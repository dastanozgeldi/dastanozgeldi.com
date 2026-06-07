import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Dastan Ozgeldi — software engineer from Almaty, Kazakhstan, building rette.ai";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Superset of every glyph rendered below — passed as the `text` subset so
// Google Fonts returns a TTF (Satori can't parse the default woff2).
const GLYPHS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .,—·&:/-'@";

// Brand-logo glyph paths (24x24 viewBox): github, x, linkedin.
const SOCIAL_PATHS = [
  "M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z",
  "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z",
  "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z",
];

async function loadGoogleFont(family: string, weight: number) {
  const familyParam = family.replace(/ /g, "+");
  const url = `https://fonts.googleapis.com/css2?family=${familyParam}:wght@${weight}&text=${encodeURIComponent(
    GLYPHS
  )}`;
  const css = await (await fetch(url)).text();
  const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!src) throw new Error(`no usable font src for ${family} ${weight}`);
  const res = await fetch(src[1]);
  if (!res.ok) throw new Error(`font fetch failed: ${res.status}`);
  return res.arrayBuffer();
}

export default async function OpengraphImage() {
  // Avatar — read at build time and inlined so generation needs no network.
  let avatarSrc: string | undefined;
  try {
    const data = await readFile(join(process.cwd(), "public", "avatar.png"));
    avatarSrc = `data:image/png;base64,${data.toString("base64")}`;
  } catch {
    avatarSrc = undefined;
  }

  // Fonts — fall back to the default font if the network is unavailable.
  let fonts:
    | { name: string; data: ArrayBuffer; weight: 400 | 500 | 600; style: "normal" }[]
    | undefined;
  try {
    const [geist400, geist600, mono500] = await Promise.all([
      loadGoogleFont("Geist", 400),
      loadGoogleFont("Geist", 600),
      loadGoogleFont("Geist Mono", 500),
    ]);
    fonts = [
      { name: "Geist", data: geist400, weight: 400, style: "normal" },
      { name: "Geist", data: geist600, weight: 600, style: "normal" },
      { name: "Geist Mono", data: mono500, weight: 500, style: "normal" },
    ];
  } catch {
    fonts = undefined;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: "#1a1a1a",
          fontFamily: "Geist",
          letterSpacing: "-0.01em",
          padding: "64px 72px",
        }}
      >
        {/* top group: avatar/url + masthead, kept close together */}
        <div style={{ display: "flex", flexDirection: "column" }}>
        {/* top row: avatar + url */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: 4,
              background: "#2f6fed",
              borderRadius: 9999,
            }}
          >
            <div
              style={{
                display: "flex",
                padding: 3,
                background: "#ffffff",
                borderRadius: 9999,
              }}
            >
              {avatarSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatarSrc}
                  width={108}
                  height={108}
                  style={{ borderRadius: 9999 }}
                  alt=""
                />
              ) : (
                <div
                  style={{
                    width: 108,
                    height: 108,
                    borderRadius: 9999,
                    background: "#eceef2",
                  }}
                />
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Geist Mono",
              fontWeight: 500,
              fontSize: 24,
              color: "#9a9a9a",
            }}
          >
            dastanozgeldi.com
          </div>
        </div>

        {/* masthead: name + bio + now */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: 36 }}>
          <div
            style={{
              display: "flex",
              fontSize: 82,
              fontWeight: 600,
              letterSpacing: "-0.04em",
              lineHeight: 1.04,
            }}
          >
            dastan ozgeldi
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              color: "#6b6b6b",
              marginTop: 20,
            }}
          >
            software engineer from almaty, kazakhstan.
          </div>
          <div style={{ display: "flex", fontSize: 32, marginTop: 12 }}>
            <span>building&nbsp;</span>
            <span style={{ color: "#2f6fed" }}>rette.ai</span>
            <span>&nbsp;— ai for healthcare revenue cycle.</span>
          </div>
        </div>
        </div>

        {/* bottom: socials — same handle everywhere */}
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div style={{ display: "flex", gap: 10 }}>
            {SOCIAL_PATHS.map((d, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  width: 52,
                  height: 52,
                  border: "1px solid #e7e7e7",
                  borderRadius: 12,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width={26} height={26} viewBox="0 0 24 24" fill="#6b6b6b">
                  <path d={d} />
                </svg>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Geist Mono",
              fontWeight: 500,
              fontSize: 30,
              color: "#1a1a1a",
            }}
          >
            @dastanozgeldi
          </div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
