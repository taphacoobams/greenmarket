/**
 * Prompts pour génération d’images (ex. GPT Image) — rayons GREEN MARKET.
 * Fichier attendu : public/categories/{slug}.png (slug = valeur `slug` dans mock/categories).
 */
export type CategoryAiImagePrompt = {
  slug: string;
  promptFr: string;
  promptEn: string;
};

export const CATEGORY_AI_IMAGE_PROMPTS: CategoryAiImagePrompt[] = [
  {
    slug: "tomates",
    promptFr:
      "Nature morte primeur premium : tomates rouges variées sur bois clair, lumière naturelle latérale, gouttelettes discrètes. Style catalogue bio haut de gamme, fond neutre, aucun logo ni texte.",
    promptEn:
      "Premium grocery still life: assorted ripe red tomatoes on light wood, soft natural sidelight, subtle water droplets. High-end organic market look, neutral background, no logos or typography.",
  },
  {
    slug: "legumes-racines",
    promptFr:
      "Composition légumes racines : carottes, navets ou betteraves encore terreuses, panier Osier hors champ, tableau chaleureux. Photo produit editorial, mise au point sélective.",
    promptEn:
      "Root vegetable arrangement: earthy carrots turnips beets, wicker basket hinted, warm editorial food shot, selective focus, no packaging text.",
  },
  {
    slug: "feuillus-salades",
    promptFr:
      "Gerbes de verts frais — laitues, kale, herbes croquantes sur marbre beige. Contraste verts vifs vs fond doux. Photographie luminance naturelle marché fermier urbain.",
    promptEn:
      "Fresh leafy greens bouquet—lettuce kale crisp greens on beige marble. Vivid greens against soft backdrop natural farmers market daylight, no labels.",
  },
  {
    slug: "courges-cucurbitaces",
    promptFr:
      "Courgettes, concombre et petite courge disposées en diagonale, textures satinées et vert émeraude. Style packshot élégant, ombre diffuse.",
    promptEn:
      "Zucchini cucumber and petite squash diagonal layout satin textures emerald greens elegant packshot diffuse shadow no words.",
  },
  {
    slug: "aromates",
    promptFr:
      "Plan rapproché ail, bouquets basilic coriandre dans petit mortarier terre cuite, rosée fine. Cuisine dakaroise contemporaine, aucun texte.",
    promptEn:
      "Macro garlic basil cilantro bundles beside terracotta mortar dew contemporary West African kitchen mood no typography.",
  },
  {
    slug: "piments",
    promptFr:
      "Arc-en-ciel de poivrons et quelques piments colorés assortis sur ardoise, reflets légers. Esthétique chaleur et saveur, pas de mains.",
    promptEn:
      "Bell peppers plus colorful chilies on slate light spicy vibrant palette editorial no hands no text.",
  },
  {
    slug: "tubercules",
    promptFr:
      "Tubercules variés pomme de terre patate douce manioc, disposition sur toile jute. Terroir sous-tropical élégant, tons terre et ocre.",
    promptEn:
      "Mixed tubers potatoes sweet potato cassava on burlap earth ochre premium harvest tableau no captions.",
  },
  {
    slug: "saveurs-locales",
    promptFr:
      "Nature morte marché ouest-africain : gombo, aubergine locale, verdure diffuse. Fin d’après-midi douce, aucun logo ni typographie.",
    promptEn:
      "West African market still okra local eggplant soft greens dusk light editorial mood no typography.",
  },
];
