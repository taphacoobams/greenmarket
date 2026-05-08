import type { Product } from "@/types";
import { MOCK_PRODUCTS } from "@/mock/products";
import { MOCK_CATEGORIES } from "@/mock/categories";

export const PRODUCT_SORT_VALUES = [
  "default",
  "price-asc",
  "price-desc",
  "name-asc",
  "rating-desc",
] as const;

export type ProductSort = (typeof PRODUCT_SORT_VALUES)[number];

export function parseProductSort(value: string | null | undefined): ProductSort {
  if (value && (PRODUCT_SORT_VALUES as readonly string[]).includes(value)) {
    return value as ProductSort;
  }
  return "default";
}

export function parseOptionalPositiveInt(raw: string | null | undefined): number | undefined {
  if (raw == null || raw === "") return undefined;
  const n = Math.round(Number(String(raw).trim().replace(/\s+/g, "").replace(",", ".")));
  if (!Number.isFinite(n) || n < 0) return undefined;
  return n;
}

/** Min/max `price` in the mocked catalogue — for placeholders and hints only. */
export function getCatalogPriceRange(): { min: number; max: number } {
  if (!MOCK_PRODUCTS.length) return { min: 0, max: 0 };
  let min = Infinity;
  let max = -Infinity;
  for (const p of MOCK_PRODUCTS) {
    if (p.price < min) min = p.price;
    if (p.price > max) max = p.price;
  }
  return { min, max };
}

function applySort(products: Product[], sort: ProductSort): Product[] {
  if (sort === "default") return products;
  const copy = [...products];
  switch (sort) {
    case "price-asc":
      copy.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      copy.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      copy.sort((a, b) => a.name.localeCompare(b.name, "fr", { sensitivity: "base" }));
      break;
    case "rating-desc":
      copy.sort((a, b) => b.rating - a.rating || a.name.localeCompare(b.name, "fr"));
      break;
    default:
      return products;
  }
  return copy;
}

export type ProductFilters = {
  query?: string;
  categorySlug?: string;
  onlyPromo?: boolean;
  onlyBio?: boolean;
  onlyFeatured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  sort?: ProductSort;
};

export function getProductBySlug(slug: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.slug === slug);
}

export function filterProducts(filters: ProductFilters): Product[] {
  let list = MOCK_PRODUCTS;
  if (filters.query) {
    const q = filters.query.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.origin.toLowerCase().includes(q),
    );
  }
  if (filters.categorySlug) {
    const cat = MOCK_CATEGORIES.find((c) => c.slug === filters.categorySlug);
    if (cat) list = list.filter((p) => p.categoryId === cat.id);
  }
  if (filters.onlyPromo) list = list.filter((p) => p.promo);
  if (filters.onlyBio) list = list.filter((p) => p.bio);
  if (filters.onlyFeatured) list = list.filter((p) => p.featured);

  let minP = filters.minPrice;
  let maxP = filters.maxPrice;
  if (minP != null && maxP != null && minP > maxP) [minP, maxP] = [maxP, minP];
  if (minP != null) list = list.filter((p) => p.price >= minP);
  if (maxP != null) list = list.filter((p) => p.price <= maxP);

  return applySort(list, filters.sort ?? "default");
}

export function getFeaturedProducts(limit = 8): Product[] {
  return MOCK_PRODUCTS.filter((p) => p.featured).slice(0, limit);
}

export type TastePreferences = {
  preferredCategoryIds: string[];
  preferBio: boolean;
};

function tasteScore(p: Product): number {
  let s = p.rating;
  if (p.featured) s += 0.35;
  if (p.promo) s += 0.2;
  return s;
}

/**
 * Suggestions catalogue selon familles choisies et option bio (mock).
 * Sans aucune préférence : mise en avant des produits featured puis note.
 */
export function getPersonalizedSuggestions(prefs: TastePreferences, limit = 8): Product[] {
  const ids = new Set(prefs.preferredCategoryIds);
  let pool = [...MOCK_PRODUCTS];
  if (prefs.preferBio) pool = pool.filter((p) => p.bio);

  const preferred = pool.filter((p) => ids.has(p.categoryId));
  const rest = pool.filter((p) => !ids.has(p.categoryId));

  preferred.sort((a, b) => tasteScore(b) - tasteScore(a));
  rest.sort((a, b) => tasteScore(b) - tasteScore(a));

  let ordered: Product[];
  if (ids.size === 0) {
    ordered = [...pool].sort((a, b) => tasteScore(b) - tasteScore(a));
  } else {
    ordered = [...preferred, ...rest];
  }

  return ordered.slice(0, limit);
}
