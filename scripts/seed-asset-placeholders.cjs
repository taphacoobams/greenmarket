/**
 * Les PNG définitifs Green Market sont versionnés sous `public/` :
 *   marketing/home-hero.png
 *   promotions/promo-panier-fraicheur.png
 *   promotions/promo-livraison.png
 *   avatars/avatar.png
 *
 * Par défaut ce script ne fait rien (évite d'écraser les visuels finaux).
 * Régénérer des plaques couleur de secours uniquement si besoin :
 *   FORCE_PLACEHOLDERS=1 node scripts/seed-asset-placeholders.cjs
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function solidPng(outfile, w, h, rgb) {
  fs.mkdirSync(path.dirname(outfile), { recursive: true });
  await sharp({
    create: { width: w, height: h, channels: 3, background: rgb },
  })
    .png()
    .toFile(outfile);
}

const root = path.join(__dirname, "..", "public");

const jobs = [
  ["marketing/home-hero.png", 1200, 900, { r: 236, g: 253, b: 245 }],
  ["promotions/promo-panier-fraicheur.png", 1200, 630, { r: 220, g: 252, b: 231 }],
  ["promotions/promo-livraison.png", 1200, 630, { r: 255, g: 248, b: 240 }],
  ["avatars/avatar.png", 400, 400, { r: 236, g: 252, b: 238 }],
];

(async () => {
  if (process.env.FORCE_PLACEHOLDERS !== "1") {
    console.log(
      "[placeholders] Ignoré — les assets finaux sont dans public/ (voir lib/marketing-asset-image-prompts.ts). Utilisez FORCE_PLACEHOLDERS=1 pour régénérer des PNG unis.",
    );
    return;
  }
  for (const [rel, w, h, rgb] of jobs) {
    await solidPng(path.join(root, rel), w, h, rgb);
  }
  console.log("[placeholders] PNG unis écrits (marketing, promotions, avatar).");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
