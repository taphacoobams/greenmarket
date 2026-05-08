import { MOCK_PRODUCTS } from "../mock/products";
import { MOCK_CATEGORIES } from "../mock/categories";
import { PRODUCT_AI_IMAGE_PROMPTS } from "../mock/product-ai-prompts";
import { CATEGORY_AI_IMAGE_PROMPTS } from "../mock/category-ai-prompts";

console.log(`
=== GREEN MARKET — manifest GPT Image ===

NOMMAGE (à respecter exactement pour les fichiers) :
• Produits  → public + chemin "image" du produit (souvent products/<slug>.png ; peut différer, ex. tomates-cerise.png pour /shop/tomates-cerises)
• Catégories → public/categories/<slug-rayon>.png
  slug = dernier segment de /categories/<slug>

Format conseillé : PNG carré ou 4:5, propre ecommerce, fond neutre, sans watermark ni typo.

`);

console.log("— PRODUITS (24)\n");
for (let i = 0; i < MOCK_PRODUCTS.length; i++) {
  const p = MOCK_PRODUCTS[i];
  const pr = PRODUCT_AI_IMAGE_PROMPTS[i];
  if (!pr) {
    console.error(`[!] Prompt manquant index ${i} (${p.name})`);
    process.exitCode = 1;
    continue;
  }
  if (pr.slugHint !== p.slug) {
    console.warn(`[!] Alignement slugHint / produit : ${pr.slugHint} vs ${p.slug}`);
  }
  console.log(`fichier → public${p.image}`);
  console.log(`prompt FR :\n${pr.promptFr}`);
  console.log(`prompt EN :\n${pr.promptEn}`);
  console.log("---");
}

console.log("\n— CATÉGORIES (8)\n");
for (const c of MOCK_CATEGORIES) {
  const cr = CATEGORY_AI_IMAGE_PROMPTS.find((x) => x.slug === c.slug);
  if (!cr) {
    console.error(`[!] Prompt catégorie manquant pour slug="${c.slug}"`);
    process.exitCode = 1;
    continue;
  }
  console.log(`fichier → public/categories/${c.slug}.png`);
  console.log(`rayon · ${c.name}`);
  console.log(`prompt FR :\n${cr.promptFr}`);
  console.log(`prompt EN :\n${cr.promptEn}`);
  console.log("---");
}
