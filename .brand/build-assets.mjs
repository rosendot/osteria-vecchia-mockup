// Renders Osteria Vecchia brand assets from the cropped emblem.
// Run from the repo root. sharp isn't installed here — borrow the vault's:
//   NODE_PATH="…/atlas-studio-internal/node_modules" node .brand/build-assets.mjs
//
// Source: .brand/_emblem-crop.png — the top-left "emblem/badge" cell cropped out
// of the Gemini logo sheet. This is a FULL-COLOUR mark (gold pasta nest, ember-
// red ring text, gold accents) already in the site palette, so — Case B in
// guides/mockup-logo-workflow.md — we keep its colours and only key the warm
// cream background out to transparency.
//
// The header is transparent over the hero and turns --color-dark on scroll; the
// footer is --color-dark. So the on-site mark never sits on cream — it needs to
// read on dark/photography, hence the pale disc.
import sharp from "sharp";

const SRC   = ".brand/_emblem-crop.png";
const BG     = { r: 245, g: 241, b: 232 };     // sampled background
const CREAM  = "#faf6f0";                       // site --color-cream
const DARK   = "#1a1208";                        // espresso black (header-scrolled / footer bg)
const EMBER  = "#b42318";
const GOLD   = "#d4a017";

// Case B colour key: alpha from distance-to-background, RGB kept from the art.
async function keyed(px) {
  const { data, info } = await sharp(SRC)
    .resize(px, px, { fit: "contain", background: CREAM })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const n = info.width * info.height;
  const rgb = Buffer.alloc(n * 3);
  const alpha = Buffer.alloc(n);
  const NEAR = 24;   // ≤ this from BG → transparent
  const FAR  = 58;   // ≥ this → opaque; between → soft edge
  for (let i = 0; i < n; i++) {
    const s = i * info.channels;
    const r = data[s], g = data[s + 1], b = data[s + 2];
    rgb[i * 3] = r; rgb[i * 3 + 1] = g; rgb[i * 3 + 2] = b;
    const d = Math.hypot(r - BG.r, g - BG.g, b - BG.b);
    alpha[i] = d <= NEAR ? 0 : d >= FAR ? 255 : Math.round(((d - NEAR) / (FAR - NEAR)) * 255);
  }
  return sharp(rgb, { raw: { width: info.width, height: info.height, channels: 3 } })
    .joinChannel(alpha, { raw: { width: info.width, height: info.height, channels: 1 } })
    .png()
    .toBuffer();
}

// Full-colour emblem on a pale disc — legible on the dark/transparent header.
async function discMark(px) {
  const inner = Math.round(px * 0.92);
  const pad = Math.round((px - inner) / 2);
  return sharp({ create: { width: px, height: px, channels: 4, background: CREAM } })
    .composite([{ input: await keyed(inner), left: pad, top: pad }])
    .png()
    .toBuffer();
}

// Opaque tile for apple-touch + OG.
async function tile(px, bg) {
  const inner = Math.round(px * 0.9);
  const pad = Math.round((px - inner) / 2);
  return sharp({ create: { width: px, height: px, channels: 4, background: bg } })
    .composite([{ input: await keyed(inner), left: pad, top: pad }])
    .png()
    .toBuffer();
}

const out = [];

// ── Favicons / PWA / Apple touch ──────────────────────────────────────────
await sharp(await keyed(64)).resize(32, 32).webp({ quality: 92 }).toFile("public/favicon-32.webp"); out.push("favicon-32.webp");
await sharp(await keyed(192)).webp({ quality: 90 }).toFile("public/icon-192.webp"); out.push("icon-192.webp");
await sharp(await keyed(512)).webp({ quality: 90 }).toFile("public/icon-512.webp"); out.push("icon-512.webp");
await sharp(await keyed(512)).png().toFile("public/icon-512.png"); out.push("icon-512.png");
await sharp(await tile(180, CREAM)).png().toFile("public/apple-touch-icon.png"); out.push("apple-touch-icon.png");

// ── On-site mark ──────────────────────────────────────────────────────────
// Osteria's ring is gold + ember, which keep enough contrast on the dark /
// scrolled header AND sit naturally over the hero when the header is
// transparent — so the TRANSPARENT emblem is the on-site mark (no disc, unlike
// Owlbear whose indigo ring needed one). A disc copy is kept for any light case.
await keyed(512).then((b) => sharp(b).png().toFile("public/emblem.png")); out.push("public/emblem.png");
await discMark(512).then((b) => sharp(b).png().toFile("public/emblem-disc.png")); out.push("public/emblem-disc.png");
await keyed(512).then((b) => sharp(b).png().toFile(".brand/emblem.png")); out.push(".brand/emblem.png");

// ── OG / social share card, 1200x630 ──────────────────────────────────────
const emblemForOg = await tile(240, CREAM);
const card = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="${CREAM}"/>
  <text x="404" y="212" font-family="Georgia, 'Times New Roman', serif" font-size="70" font-weight="700" fill="${DARK}">Osteria Vecchia</text>
  <text x="408" y="256" font-family="Helvetica, Arial, sans-serif" font-size="22" font-weight="600" letter-spacing="5" fill="${EMBER}">NORTH END · BOSTON</text>
  <text x="100" y="430" font-family="Georgia, 'Times New Roman', serif" font-size="34" fill="${DARK}">Handmade pasta, a family recipe, since another lifetime.</text>
  <rect x="100" y="500" width="1000" height="1.6" fill="${EMBER}" opacity=".35"/>
  <text x="100" y="546" font-family="Helvetica, Arial, sans-serif" font-size="20" font-weight="600" letter-spacing="3.2" fill="${EMBER}">FRESH PASTA DAILY · RESERVATIONS WELCOME</text>
  <text x="1100" y="546" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="20" font-weight="600" letter-spacing="3.2" fill="${GOLD}">CONCEPT BUILD</text>
</svg>`;
const cardBuf = await sharp(Buffer.from(card), { density: 150 }).resize(1200, 630).png().toBuffer();
const ogComposed = await sharp(cardBuf).composite([{ input: emblemForOg, left: 100, top: 92 }]).toBuffer();
await sharp(ogComposed).png().toFile("public/og-image.png"); out.push("og-image.png");
await sharp(ogComposed).webp({ quality: 88 }).toFile("public/og-image.webp"); out.push("og-image.webp");

console.log("wrote:", out.join(", "));
