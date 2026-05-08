import type { ProductSort } from "@/services/product-service";

export const PRODUCT_SORT_LABELS_FR: Record<ProductSort, string> = {
  default: "Par défaut",
  "price-asc": "Prix croissant",
  "price-desc": "Prix décroissant",
  "name-asc": "Nom (A → Z)",
  "rating-desc": "Mieux notés",
};
