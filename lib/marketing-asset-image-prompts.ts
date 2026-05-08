/**
 * Visuels Green Market — **assets définitifs** (PNG locaux, pas de remote).
 *
 * Arborescence attendue (noms et extension exacts, sans modification côté React/Next) :
 *
 * ```
 * public/
 * ├── marketing/
 * │   └── home-hero.png              ← Hero homepage
 * ├── promotions/
 * │   ├── promo-panier-fraicheur.png ← Promo panier fraîcheur
 * │   └── promo-livraison.png        ← Promo livraison rapide
 * └── avatars/
 *     └── avatar.png                 ← Avatar utilisateur par défaut (démo)
 * ```
 *
 * Branding : grocery premium, légumes frais, bio africain moderne, verts naturels, UI e‑commerce actuelle.
 *
 * Référence code : `app/(public)/page.tsx` (hero), `mock/promotions.ts`, `lib/branding.ts` (`DEMO_AVATAR_URL`).
 */

import { DEMO_AVATAR_URL } from "@/lib/branding";

/** Clés internes alignées sur les dossiers `public/` (fichiers `.png` définitifs). */
export const PRIMARY_MARKETING_ASSET_KEYS = [
  "marketing/home-hero",
  "promotions/promo-panier-fraicheur",
  "promotions/promo-livraison",
  "avatars/avatar",
] as const;

export type PrimaryMarketingAssetKey = (typeof PRIMARY_MARKETING_ASSET_KEYS)[number];

export type MarketingAssetKey = PrimaryMarketingAssetKey;

type PromptEntry = { fichier: string; promptFr: string; promptEn: string };

/** Archive prompts IA — les fichiers finaux sont les PNG ci‑dessus dans `public/`. */
const PRIMARY_PROMPTS: Record<PrimaryMarketingAssetKey, PromptEntry> = {
  "marketing/home-hero": {
    fichier: "public/marketing/home-hero.png",
    promptFr:
      "Visuel héros marketplace primeur premium Afrique de l’Ouest / Dakar : nature morte très généreuse de légumes frais variés (tomates rouges, poivrons, salades, gombo), lumière matinale latérale douce sur bois clair naturel, fines gouttelettes, profondeur de champ maîtrisée, ambiance Green Market — fond neutre lumineux, aucun logo, aucune typographie, pas de mains, pas de marque identifiable. Export PNG large pour hero web.",
    promptEn:
      "Premium West African / Dakar grocery marketplace hero still life: abundant mixed fresh vegetables (red tomatoes, peppers, leafy greens, okra), soft golden morning sidelight on natural light wood, subtle dew drops, controlled depth of field — bright neutral background, no logos, no text, no hands, no identifiable brands. Large PNG for web hero.",
  },
  "promotions/promo-panier-fraicheur": {
    fichier: "public/promotions/promo-panier-fraicheur.png",
    promptFr:
      "Panier en osier ou cagette bois rempli de légumes colorés et savoureux (carottes, salade, tomates, herbes), ambiance promo « fraîcheur » — douce, joyeuse, fond clair unifié, angle 3/4, qualité catalogue e-commerce, aucun texte ni logo ni prix.",
    promptEn:
      "Wicker basket or wooden crate filled with colorful crisp vegetables (carrots, lettuce, tomatoes, herbs), cheerful fresh grocery promo mood — light clean background, 3/4 angle, e-commerce catalog quality, no text, logos, or prices.",
  },
  "promotions/promo-livraison": {
    fichier: "public/promotions/promo-livraison.png",
    promptFr:
      "Scène livraison courses vertes : sac kraft ou cabas réutilisable avec légumes qui dépassent (feuilles, radis, citron vert), plan propre sur plan de travail blanc, ombre douce, style app livraison premium Dakar, tons verts et blancs, aucun texte ni logo ni véhicule identifiable.",
    promptEn:
      "Green grocery delivery scene: kraft or reusable tote with vegetables peeking out (greens, radish, lime), clean white counter, soft shadow, premium food-delivery app aesthetic, green and white palette, no text, logos, or identifiable vehicles.",
  },
  "avatars/avatar": {
    fichier: `public${DEMO_AVATAR_URL}`,
    promptFr:
      "Avatar neutre unique pour app épicerie : silhouette ou portrait léger stylisé personne souriante, diversité, fond dégradé très léger vert menthe vers blanc, style flat premium (pas cartoon enfantin), aucun texte ni logo — carré 400×400 ou plus export PNG.",
    promptEn:
      "Single neutral avatar for grocery app: subtle stylized smiling person, inclusive, very subtle mint-to-white gradient background, modern flat premium look (not childish cartoon), no text or logos — square 400×400+ PNG export.",
  },
};

export const MARKETING_ASSET_IMAGE_PROMPTS: Record<MarketingAssetKey, PromptEntry> = PRIMARY_PROMPTS;

export function primaryMarketingAssetsOrdered(): Array<{ key: PrimaryMarketingAssetKey } & PromptEntry> {
  return PRIMARY_MARKETING_ASSET_KEYS.map((key) => ({
    key,
    ...MARKETING_ASSET_IMAGE_PROMPTS[key],
  }));
}
