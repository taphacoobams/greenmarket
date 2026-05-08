import type { Product, Review } from "@/types";
import { slugify } from "@/lib/slug";
import { MOCK_CATEGORIES } from "@/mock/categories";

/** Image (PNG) : par défaut `public/products/{slug}.png` ; sinon `imageSlug` si le fichier diffère du slug (ex. tomates-cerise). */
function productImageSrc(fileSlug: string): string {
  return `/products/${fileSlug}.png`;
}

function reviewsFor(slug: string): Review[] {
  const base = slug.replace(/-/g, " ");
  return [
    {
      id: `${slug}-r1`,
      author: "Aïssatou D.",
      rating: 5,
      comment: `Excellent ${base}, frais et bien emballé.`,
      date: "2026-04-12T10:00:00.000Z",
    },
    {
      id: `${slug}-r2`,
      author: "Moussa K.",
      rating: 4,
      comment: "Livraison rapide, qualité top pour le prix.",
      date: "2026-04-28T14:30:00.000Z",
    },
  ];
}

type Row = {
  name: string;
  categorySlug: string;
  price: number;
  oldPrice: number | null;
  stock: number;
  weightGrams: number;
  origin: string;
  description: string;
  rating: number;
  featured?: boolean;
  promo?: boolean;
  bio?: boolean;
  /** Si défini, nom de fichier image (sans .png) sous /products/{imageSlug}.png — peut différer du slug URL. */
  imageSlug?: string;
};

const rows: Row[] = [
  {
    name: "Tomates grappe",
    categorySlug: "tomates",
    price: 1200,
    oldPrice: 1500,
    stock: 80,
    weightGrams: 1000,
    origin: "Dakar",
    description: "Tomates juteuses, cueillies à maturité, parfaites pour sauces et salades.",
    rating: 4.8,
    featured: true,
    promo: true,
    bio: true,
  },
  {
    name: "Tomates cerises",
    categorySlug: "tomates",
    price: 2500,
    oldPrice: null,
    stock: 45,
    weightGrams: 500,
    origin: "Dakar",
    description: "Snack healthy, très sucrées, idéal apéritif veggie.",
    rating: 4.9,
    featured: true,
    bio: true,
    imageSlug: "tomates-cerise",
  },
  {
    name: "Tomates Roma",
    categorySlug: "tomates",
    price: 1350,
    oldPrice: 1600,
    stock: 60,
    weightGrams: 1000,
    origin: "Dakar",
    description: "Chair dense, peu de jus — la base du bon ragù maison.",
    rating: 4.6,
    promo: true,
    bio: false,
  },
  {
    name: "Oignon rouge",
    categorySlug: "legumes-racines",
    price: 800,
    oldPrice: 950,
    stock: 200,
    weightGrams: 1000,
    origin: "Dakar",
    description: "Bulbes fermes, goût doux après cuisson.",
    rating: 4.4,
    bio: false,
  },
  {
    name: "Carotte bio",
    categorySlug: "legumes-racines",
    price: 1100,
    oldPrice: 1300,
    stock: 90,
    weightGrams: 1000,
    origin: "Dakar",
    description: "Orange vif, croquant irrésistible, riche en bêta-carotène.",
    rating: 4.8,
    featured: true,
    bio: true,
    promo: true,
  },
  {
    name: "Betterave chioggia",
    categorySlug: "legumes-racines",
    price: 1600,
    oldPrice: null,
    stock: 35,
    weightGrams: 750,
    origin: "Dakar",
    description: "Motifs zebra dans la coupe — effet garanti.",
    rating: 4.7,
    bio: true,
  },
  {
    name: "Chou kale violet",
    categorySlug: "feuillus-salades",
    price: 1800,
    oldPrice: 2100,
    stock: 40,
    weightGrams: 500,
    origin: "Dakar",
    description: "Chips kale maison ou salade smoothie bowl.",
    rating: 4.8,
    featured: true,
    bio: true,
  },
  {
    name: "Brocoli bio",
    categorySlug: "feuillus-salades",
    price: 1900,
    oldPrice: null,
    stock: 48,
    weightGrams: 600,
    origin: "Dakar",
    description: "Florettes serrées, cuisson vapeur ou wok.",
    rating: 4.7,
    bio: true,
  },
  {
    name: "Laitue iceberg",
    categorySlug: "feuillus-salades",
    price: 600,
    oldPrice: null,
    stock: 100,
    weightGrams: 400,
    origin: "Dakar",
    description: "Croquant maximal pour burgers healthy.",
    rating: 4.2,
    bio: false,
  },
  {
    name: "Champignons de Paris",
    categorySlug: "feuillus-salades",
    price: 2200,
    oldPrice: null,
    stock: 42,
    weightGrams: 400,
    origin: "Dakar",
    description: "Cultivés localement sous châssis climatisés.",
    rating: 4.7,
    featured: true,
    bio: true,
  },
  {
    name: "Poivron rouge",
    categorySlug: "piments",
    price: 1400,
    oldPrice: 1700,
    stock: 65,
    weightGrams: 500,
    origin: "Dakar",
    description: "Très doux grillé ou farci.",
    rating: 4.6,
    featured: true,
    promo: true,
    bio: false,
  },
  {
    name: "Poivron vert",
    categorySlug: "piments",
    price: 1000,
    oldPrice: null,
    stock: 75,
    weightGrams: 500,
    origin: "Dakar",
    description: "Version plus herbacée, parfaite en julienne.",
    rating: 4.4,
    bio: false,
  },
  {
    name: "Piment habanero",
    categorySlug: "piments",
    price: 800,
    oldPrice: null,
    stock: 25,
    weightGrams: 150,
    origin: "Dakar",
    description: "Très fort — à manipuler avec précaution.",
    rating: 4.7,
    bio: false,
  },
  {
    name: "Aubergine noire",
    categorySlug: "saveurs-locales",
    price: 900,
    oldPrice: null,
    stock: 85,
    weightGrams: 800,
    origin: "Dakar",
    description: "Texture fondante pour mafé ou caviar d'aubergine.",
    rating: 4.6,
    bio: false,
  },
  {
    name: "Gombo frais",
    categorySlug: "saveurs-locales",
    price: 1100,
    oldPrice: null,
    stock: 65,
    weightGrams: 500,
    origin: "Dakar",
    description: "Base authentique des sauces sénégalaises.",
    rating: 4.9,
    featured: true,
    bio: true,
  },
  {
    name: "Pomme de terre Charlotte",
    categorySlug: "tubercules",
    price: 850,
    oldPrice: null,
    stock: 300,
    weightGrams: 2000,
    origin: "Dakar",
    description: "Tenue en salade et rissolée, peau fine.",
    rating: 4.5,
    featured: true,
    bio: false,
  },
  {
    name: "Patate douce orange",
    categorySlug: "tubercules",
    price: 950,
    oldPrice: 1100,
    stock: 120,
    weightGrams: 1500,
    origin: "Dakar",
    description: "Rôtie au four, naturellement sucrée.",
    rating: 4.9,
    promo: true,
    bio: true,
  },
  {
    name: "Igname blanche",
    categorySlug: "tubercules",
    price: 1300,
    oldPrice: null,
    stock: 70,
    weightGrams: 1500,
    origin: "Dakar",
    description: "Base des sauces traditionnelles, texture collante.",
    rating: 4.6,
    bio: false,
  },
  {
    name: "Manioc frais",
    categorySlug: "tubercules",
    price: 700,
    oldPrice: null,
    stock: 90,
    weightGrams: 1200,
    origin: "Dakar",
    description: "À cuire longuement, farine maison possible.",
    rating: 4.3,
    bio: false,
  },
  {
    name: "Concombre court bio",
    categorySlug: "courges-cucurbitaces",
    price: 950,
    oldPrice: null,
    stock: 42,
    weightGrams: 350,
    origin: "Dakar",
    description: "Grain fin, croquant glacé.",
    rating: 4.6,
    bio: true,
  },
  {
    name: "Butternut rôtie-ready",
    categorySlug: "courges-cucurbitaces",
    price: 1250,
    oldPrice: 1450,
    stock: 38,
    weightGrams: 1200,
    origin: "Dakar",
    description: "Chair orange, hummus et soupes glacées.",
    rating: 4.8,
    promo: true,
    bio: false,
  },
  {
    name: "Ail violet",
    categorySlug: "aromates",
    price: 1800,
    oldPrice: 2000,
    stock: 50,
    weightGrams: 250,
    origin: "Dakar",
    description: "Gousses compactes, arôme intense.",
    rating: 4.8,
    promo: true,
    bio: true,
  },
  {
    name: "Basilic génois",
    categorySlug: "aromates",
    price: 900,
    oldPrice: null,
    stock: 40,
    weightGrams: 80,
    origin: "Dakar",
    description: "Pesto artisanal garanti.",
    rating: 4.9,
    featured: true,
    promo: false,
    bio: true,
  },
  {
    name: "Coriandre fraîche",
    categorySlug: "aromates",
    price: 500,
    oldPrice: null,
    stock: 120,
    weightGrams: 100,
    origin: "Dakar",
    description: "Sachet géant pour marinades tacos.",
    rating: 4.5,
    bio: false,
  },
];

function categoryIdFromSlug(catSlug: string): string {
  const c = MOCK_CATEGORIES.find((x) => x.slug === catSlug);
  if (!c) throw new Error(`Unknown category slug ${catSlug}`);
  return c.id;
}

function availabilityFromStock(stock: number): Product["availability"] {
  if (stock <= 0) return "out_of_stock";
  if (stock < 15) return "low_stock";
  return "in_stock";
}

export const MOCK_PRODUCTS: Product[] = rows.map((row, index) => {
  const slug = slugify(row.name);
  const id = `pr-${slug}-${index}`;
  const stock =
    slug === "piment-habanero" && row.stock > 0 ? Math.min(row.stock, 24) : row.stock;

  const product: Product = {
    id,
    name: row.name,
    slug,
    description: row.description,
    categoryId: categoryIdFromSlug(row.categorySlug),
    price: row.price,
    oldPrice: row.oldPrice,
    stock,
    image: productImageSrc(row.imageSlug ?? slug),
    weightGrams: row.weightGrams,
    origin: row.origin,
    rating: row.rating,
    reviews: reviewsFor(slug),
    featured: row.featured ?? false,
    promo: row.promo ?? false,
    bio: row.bio ?? false,
    availability: availabilityFromStock(stock),
  };

  return product;
});

export function hydrateCategoryCounts(products: Product[]): void {
  const map = new Map<string, number>();
  for (const p of products) {
    map.set(p.categoryId, (map.get(p.categoryId) ?? 0) + 1);
  }
  for (const c of MOCK_CATEGORIES) {
    c.productCount = map.get(c.id) ?? 0;
  }
}

hydrateCategoryCounts(MOCK_PRODUCTS);
