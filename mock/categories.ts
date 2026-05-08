import type { Category } from "@/types";

/** Visuels (ex. PNG) : fichiers dans public/categories/{slug}.png */

export const MOCK_CATEGORIES: Category[] = [
  {
    id: "cat-tomates",
    name: "Tomates & assimilés",
    slug: "tomates",
    description: "Tomates cerises, tomates coeur de boeuf, sauces maison.",
    image: "/categories/tomates.png",
    productCount: 0,
  },
  {
    id: "cat-racines",
    name: "Légumes racines",
    slug: "legumes-racines",
    description: "Carottes, betteraves, navets — croquant et vitaminé.",
    image: "/categories/legumes-racines.png",
    productCount: 0,
  },
  {
    id: "cat-feuillus",
    name: "Feuillus & salades",
    slug: "feuillus-salades",
    description: "Salades croquantes, épinards, choux kale.",
    image: "/categories/feuillus-salades.png",
    productCount: 0,
  },
  {
    id: "cat-gren",
    name: "Gourdes & cucurbitacées",
    slug: "courges-cucurbitaces",
    description: "Courgettes, concombres, courges et potimarron.",
    image: "/categories/courges-cucurbitaces.png",
    productCount: 0,
  },
  {
    id: "cat-aromates",
    name: "Aromates",
    slug: "aromates",
    description: "Ail, basilic, coriandre pour sublimer vos plats.",
    image: "/categories/aromates.png",
    productCount: 0,
  },
  {
    id: "cat-epices",
    name: "Piments & chaleur",
    slug: "piments",
    description: "Piments doux ou toniques selon vos envies.",
    image: "/categories/piments.png",
    productCount: 0,
  },
  {
    id: "cat-tubercules",
    name: "Tubercules",
    slug: "tubercules",
    description: "Pommes de terre, ignames et patates douces.",
    image: "/categories/tubercules.png",
    productCount: 0,
  },
  {
    id: "cat-exotiques",
    name: "Saveurs locales",
    slug: "saveurs-locales",
    description: "Gombo, aubergines africaines, légumes de saison.",
    image: "/categories/saveurs-locales.png",
    productCount: 0,
  },
];
