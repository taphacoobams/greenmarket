/**
 * Prompts IA (GPT Image, Midjourney, Flux…).
 * Exporter liste + prompts : npm run prompts:images (GPT Image, etc.)
 *
 * Style : photographie produit primeur premium, fond neutre ou bois clair,
 * lumière naturelle douce, pas de logo ni texte.
 */
export type ProductAiImagePrompt = {
  slugHint: string;
  promptFr: string;
  promptEn: string;
};

export const PRODUCT_AI_IMAGE_PROMPTS: ProductAiImagePrompt[] = [
  {
    slugHint: "tomates-grappe",
    promptFr:
      "Grappe de tomates rouges bien mûres encore attachées à la tige verte, quelques gouttelettes d’eau, plateau en bois clair, photo studio food minimaliste, netteté sur le fruit.",
    promptEn:
      "Cluster of ripe red tomatoes on the vine with green stem, water droplets, light wooden board, minimalist food photography, sharp focus on produce.",
  },
  {
    slugHint: "tomates-cerises",
    promptFr:
      "Bol de tomates cerises rouges brillantes vue du dessus, fond lin naturel, lumière matinale, style catalogue primeur bio.",
    promptEn:
      "Bowl filled with glossy red cherry tomatoes, top-down shot, natural linen backdrop, soft morning light, organic grocery catalogue look.",
  },
  {
    slugHint: "tomates-roma",
    promptFr:
      "Tomates Roma allongées rouge profond empilées proprement, fond flou crème, ombre douce, rendu marque fermière premium.",
    promptEn:
      "Stack of elongated Roma plum tomatoes, deep red, clean cream blurry background, soft shadow, premium farm brand aesthetic.",
  },
  {
    slugHint: "oignon-rouge",
    promptFr:
      "Oignons rouges entiers avec pelure satinée et racines fines, fond gris très clair, une demi coupe montrant les cercles violet–blanc.",
    promptEn:
      "Whole red onions with papery skins and roots, pale grey backdrop, half onion showing purple concentric rings.",
  },
  {
    slugHint: "carotte-bio",
    promptFr:
      "Botte de carottes bio avec fanes vertes encore fraîches, terre très légère sur la racine, planche vintage, champ flou.",
    promptEn:
      "Bunch of organic carrots with fresh leafy tops, faint soil traces, rustic wooden plank, shallow depth of field.",
  },
  {
    slugHint: "betterave-chioggia",
    promptFr:
      "Betterave chioggia coupée en deux montrant les rayures rose et blanc en spirale, couteau en arrière-plan flou.",
    promptEn:
      "Chioggia beet cut in half revealing pink and white concentric stripes, blurred knife in background, high detail.",
  },
  {
    slugHint: "chou-kale-violet",
    promptFr:
      "Feuilles de chou kale violet frisées en gros plan, textures veinées visibles, gouttelettes, ambiance marché fermier urbain.",
    promptEn:
      "Close-up of curly purple kale leaves showing veins and droplets, urban farmers market vibe.",
  },
  {
    slugHint: "brocoli-bio",
    promptFr:
      "Tête de brocoli bio vert intense, bouquets serrés, quelques mini feuilles, fond ardoise moderne.",
    promptEn:
      "Organic broccoli head with tight deep green florets and tiny leaves, modern dark slate backdrop.",
  },
  {
    slugHint: "laitue-iceberg",
    promptFr:
      "Laitue iceberg entière feuilles croustillantes verdoyantes, rosace vue trois-quarts sur comptoir pierre blanche.",
    promptEn:
      "Whole crisp iceberg lettuce head, three-quarter view on pale stone counter.",
  },
  {
    slugHint: "champignons-de-paris",
    promptFr:
      "Champignons de Paris blancs entiers et quelques entamés montrant la chair, petit panier osier, lumière douce latérale.",
    promptEn:
      "White button mushrooms whole and sliced showing flesh, small wicker basket, soft side light.",
  },
  {
    slugHint: "poivron-rouge",
    promptFr:
      "Poivron rouge luisant entier avec réflexions, une goutte d’eau, fond dégradé gris clair premium.",
    promptEn:
      "Shiny whole red bell pepper with one water bead, premium light grey gradient background.",
  },
  {
    slugHint: "poivron-vert",
    promptFr:
      "Poivron vert entier, peau satinée, rosée fine, composition packshot centrée.",
    promptEn:
      "Whole green bell pepper, satin skin, faint dew, centered commercial packshot.",
  },
  {
    slugHint: "piment-habanero",
    promptFr:
      "Petits piments habanero orange vif texturés dans un bol céramique, macro sans mains visibles.",
    promptEn:
      "Vivid orange habanero peppers macro detail in ceramic bowl, no hands in frame.",
  },
  {
    slugHint: "aubergine-noire",
    promptFr:
      "Aubergine noire brillante entière avec calice vert épineux, léger reflet studio, ombre douce.",
    promptEn:
      "Glossy whole black eggplant with green spiky calyx, subtle studio gloss, soft cast shadow.",
  },
  {
    slugHint: "gombo-frais",
    promptFr:
      "Gombos verts frais alignés, une coupe en rondelles montrant l’étoile, fond bois clair, cuisine ouest-africaine contemporaine sans texte.",
    promptEn:
      "Fresh green okra pods, one sliced into rounds showing star pattern, light wood, contemporary West African kitchen mood, no text.",
  },
  {
    slugHint: "pomme-de-terre-charlotte",
    promptFr:
      "Pommes de terre Charlotte jaune pâle petit calibre en tas sur toile de jute, légère terre de récolte.",
    promptEn:
      "Small pale yellow Charlotte potatoes piled on burlap with faint harvest soil.",
  },
  {
    slugHint: "patate-douce-orange",
    promptFr:
      "Patates douces orange forme allongée, peau lisse légèrement terreuse, composition diagonale dynamique.",
    promptEn:
      "Orange sweet potatoes elongated, smooth lightly earthy skin, dynamic diagonal styling.",
  },
  {
    slugHint: "igname-blanche",
    promptFr:
      "Gros tubercule d’igname blanche rugueux, coupe montrant chair blanche ferme, drap lin beige, aucun texte.",
    promptEn:
      "Large white yam tuber rough skin, cross section showing firm white flesh, beige linen, no typography.",
  },
  {
    slugHint: "manioc-frais",
    promptFr:
      "Racines de manioc brunes terreuses entières et un morceau pelé montrant chair blanche cassante.",
    promptEn:
      "Earthy brown cassava roots with one peeled chunk showing brittle white interior.",
  },
  {
    slugHint: "concombre-court-bio",
    promptFr:
      "Concombre court bio vert profond, tranches fines montrant grain fin et centre clair, fond blanc cassé.",
    promptEn:
      "Short organic cucumber deep green fine bumps thin slices revealing seeds pale center off-white backdrop.",
  },
  {
    slugHint: "butternut-rotie-ready",
    promptFr:
      "Courge butternut entière forme violon, une moitié montrant chair orange vif et cavité épépinée.",
    promptEn:
      "Whole violin-shaped butternut squash, half showing vivid orange flesh and seeded cavity scooped.",
  },
  {
    slugHint: "ail-violet",
    promptFr:
      "Tête d’ail violet à pelures striées, gousses éparses, fond ardoise, macro textures.",
    promptEn:
      "Purple garlic bulb with striped papery skin, loose cloves, slate background, macro textures.",
  },
  {
    slugHint: "basilic-genois",
    promptFr:
      "Pot de basilic feuilles vert brillant mouillées de rosée, pot terre cuite simple.",
    promptEn:
      "Basil plant in simple terracotta pot, glossy dewy leaves.",
  },
  {
    slugHint: "coriandre-fraiche",
    promptFr:
      "Botte de coriandre fraîche attaches ruban kraft sur marbre blanc léger mouvement d’éclaboussure d’eau.",
    promptEn:
      "Fresh cilantro bunch with kraft tie on white marble slight water splash frozen motion.",
  },
];
