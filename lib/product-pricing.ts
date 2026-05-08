import type { Product } from "@/types";

export const MIN_ORDER_KG = 0.25;

export function referenceWeightKg(product: Product): number {
  const kg = product.weightGrams / 1000;
  return kg > 0 ? kg : 1;
}

/** Prix indicatif au kg (CFA), déduit du prix du lot de référence `product.price`. */
export function pricePerKg(product: Product): number {
  return Math.round(product.price / referenceWeightKg(product));
}

export function oldPricePerKg(product: Product): number | null {
  if (product.oldPrice == null) return null;
  return Math.round(product.oldPrice / referenceWeightKg(product));
}

export function roundWeightKg(kg: number): number {
  return Math.round(kg * 1000) / 1000;
}

export function clampMinOrderKg(kg: number): number {
  return Math.max(MIN_ORDER_KG, roundWeightKg(kg));
}

export function lineSubtotalForWeight(product: Product, weightKg: number): number {
  return Math.round(pricePerKg(product) * weightKg);
}

export function formatKgFr(kg: number): string {
  return kg.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}
