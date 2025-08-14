import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Build-time OG image generator without custom font embedding.
 * Uses a pure SVG string rendered by Sharp, avoiding Satori font requirements.
 * Output:
 *  - public/og.jpg (1200x630, JPEG)
 *  - public/og.png (PNG fallback copy)
 */
async function generate() {
  const width = 1200;
  const height = 630;

  // Inline SVG (no external fonts). Generic system fonts let librsvg/Sharp pick defaults.
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M24 0H0V24" fill="none" stroke="rgba(17,17,17,0.06)" stroke-width="1"/>
    </pattern>
    <linearGradient id="accent" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#2cb4ff"/>
      <stop offset="100%" stop-color="#0b2234"/>
    </linearGradient>
  </defs>

  <rect width="100%" height="100%" fill="#ffffff"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>

  <g transform="translate(60, 120)">
    <text x="0" y="0" font-size="28" font-weight="800" fill="#2cb4ff" font-family="system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif">
      WithLia
    </text>
    <text x="0" y="72" font-size="70" font-weight="900" fill="#0b2234" font-family="system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif">
      Mindful AI-Powered
    </text>
    <text x="0" y="140" font-size="70" font-weight="900" fill="#0b2234" font-family="system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif">
      <tspan fill="#2cb4ff">Marketing</tspan> Ecosystem
    </text>

    <foreignObject x="0" y="190" width="${width - 120}" height="200">
      <div xmlns="http://www.w3.org/1999/xhtml"
           style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif;
                  font-size: 30px; line-height: 1.35; color: rgba(17,17,17,0.72);">
        Ecosystem marketing bertenaga AI: framework 7 hari, mentor, komunitas.
      </div>
    </foreignObject>
  </g>

  <rect x="${width - 60 - 80}" y="${height - 60 - 80}" width="80" height="80" rx="18" fill="url(#accent)"/>
  <circle cx="${width - 60 - 30}" cy="${height - 60 - 30}" r="10" fill="#ff6b35"/>
</svg>
  `.trim();

  const outDir = join(__dirname, "..", "public");
  const outPng = join(outDir, "og.png");
  const outJpg = join(outDir, "og.jpg");
  await mkdir(outDir, { recursive: true });

  // Render SVG to PNG then to JPEG
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

  // Save PNG copy (useful for debugging)
  await writeFile(outPng, pngBuffer);

  // Save optimized JPEG
  const jpg = await sharp(pngBuffer).jpeg({ quality: 86, progressive: true }).toBuffer();
  await writeFile(outJpg, jpg);

  // eslint-disable-next-line no-console
  console.log("OG image generated at public/og.jpg (and og.png)");
}

generate().catch((e) => {
  // eslint-disable-next-line no-console
  console.error("Failed to generate OG image:", e);
  process.exitCode = 1;
});