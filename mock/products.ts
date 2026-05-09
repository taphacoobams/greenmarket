import type { Product, Review } from "@/types";
import { slugify } from "@/lib/slug";
import { resolveProductImagePath } from "@/lib/product-image";

/** Identifiant catalogue unique (UI publique + admin). */
export const CATALOG_CATEGORY_ID = "cat-catalogue";

function reviewsFor(slug: string): Review[] {
  const base = slug.replace(/-/g, " ");
  return [
    {
      id: `${slug}-r1`,
      author: "Client GREEN MARKET",
      rating: 5,
      comment: `${base} frais, bien présenté.`,
      date: "2026-04-12T10:00:00.000Z",
    },
    {
      id: `${slug}-r2`,
      author: "Ndoffe Samb",
      rating: 5,
      comment: "Livraison rapide sur Dakar.",
      date: "2026-04-28T14:30:00.000Z",
    },
  ];
}

type Row = {
  name: string;
  price: number;
  saleUnit: "kg" | "piece";
  stock: number;
  /** Pour saleUnit kg : grammes du lot de référence (souvent 1000 g → prix au kg). Pour piece : ignoré pour le prix unitaire. */
  weightGrams: number;
  origin: string;
  description: string;
  rating: number;
  featured?: boolean;
  promo?: boolean;
  bio?: boolean;
  /** Fichier attendu : `public/products/<imageSlug>.png`. `null` = placeholder le temps de générer l’image. */
  imageSlug: string | null;
};

const rows: Row[] = [
  {
    name: "Tomate",
    price: 1000,
    saleUnit: "kg",
    stock: 120,
    weightGrams: 1000,
    origin: "Dakar",
    description: "Tomates fraîches du jour.",
    rating: 4.8,
    featured: true,
    imageSlug: "tomates-grappe",
  },
  {
    name: "Oignon",
    price: 500,
    saleUnit: "kg",
    stock: 200,
    weightGrams: 1000,
    origin: "Dakar",
    description: "Oignons pour vos sauces et grills.",
    rating: 4.6,
    featured: true,
    imageSlug: "oignon-rouge",
  },
  {
    name: "Choux",
    price: 1000,
    saleUnit: "piece",
    stock: 80,
    weightGrams: 1000,
    origin: "Dakar",
    description: "Vendu à la pièce.",
    rating: 4.7,
    imageSlug: "laitue-iceberg", // visuel laitue (ex-fiche salade), fichier laitue-iceberg.png
  },
  {
    name: "Carottes",
    price: 1000,
    saleUnit: "kg",
    stock: 90,
    weightGrams: 1000,
    origin: "Dakar",
    description: "Carottes croquantes.",
    rating: 4.8,
    featured: true,
    promo: true,
    imageSlug: "carotte-bio",
  },
  {
    name: "Poivron",
    price: 2000,
    saleUnit: "kg",
    stock: 55,
    weightGrams: 1000,
    origin: "Dakar",
    description: "Poivrons colorés.",
    rating: 4.7,
    imageSlug: "poivron-rouge",
  },
  {
    name: "Aubergines",
    price: 1000,
    saleUnit: "kg",
    stock: 70,
    weightGrams: 1000,
    origin: "Dakar",
    description: "Aubergines fermes.",
    rating: 4.6,
    imageSlug: "aubergine-noire",
  },
  {
    name: "Navets",
    price: 1000,
    saleUnit: "kg",
    stock: 40,
    weightGrams: 1000,
    origin: "Dakar",
    description: "Navets de saison.",
    rating: 4.5,
    imageSlug: "navets-blancs",
  },
  {
    name: "Pommes de terre",
    price: 500,
    saleUnit: "kg",
    stock: 150,
    weightGrams: 1000,
    origin: "Dakar",
    description: "Pommes de terre pour tout cuisiner.",
    rating: 4.7,
    featured: true,
    imageSlug: "pomme-de-terre-charlotte",
  },
  {
    name: "Piment",
    price: 2000,
    saleUnit: "kg",
    stock: 35,
    weightGrams: 1000,
    origin: "Dakar",
    description: "Piments selon arrivage.",
    rating: 4.9,
    imageSlug: "piment-habanero",
  },
  {
    name: "Patates douces",
    price: 1000,
    saleUnit: "kg",
    stock: 60,
    weightGrams: 1000,
    origin: "Dakar",
    description: "Patates douces orangées.",
    rating: 4.8,
    imageSlug: "patate-douce-orange",
  },
  {
    name: "Salade",
    price: 500,
    saleUnit: "piece",
    stock: 100,
    weightGrams: 1000,
    origin: "Dakar",
    description: "Salade vendue à la pièce.",
    rating: 4.7,
    promo: true,
    imageSlug: "salade-laitue-verte",
  },
  {
    name: "Ail",
    price: 4000,
    saleUnit: "kg",
    stock: 25,
    weightGrams: 1000,
    origin: "Dakar",
    description: "Ail violet aromatique.",
    rating: 4.8,
    imageSlug: "ail-violet",
  },
  {
    name: "Manioc",
    price: 500,
    saleUnit: "kg",
    stock: 85,
    weightGrams: 1000,
    origin: "Dakar",
    description: "Manioc frais.",
    rating: 4.6,
    imageSlug: "manioc-frais",
  },
];

function availabilityFromStock(stock: number): Product["availability"] {
  if (stock <= 0) return "out_of_stock";
  if (stock < 15) return "low_stock";
  return "in_stock";
}

export const MOCK_PRODUCTS: Product[] = rows.map((row, index) => {
  const slug = slugify(row.name);
  const id = `pr-${slug}-${index}`;
  const product: Product = {
    id,
    name: row.name,
    slug,
    description: row.description,
    categoryId: CATALOG_CATEGORY_ID,
    saleUnit: row.saleUnit,
    price: row.price,
    oldPrice: null,
    stock: row.stock,
    image: resolveProductImagePath(row.imageSlug),
    weightGrams: row.weightGrams,
    origin: row.origin,
    rating: row.rating,
    reviews: reviewsFor(slug),
    featured: row.featured ?? false,
    promo: row.promo ?? false,
    bio: row.bio ?? false,
    availability: availabilityFromStock(row.stock),
  };
  return product;
});

