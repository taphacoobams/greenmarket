import type { Product } from "@/types";

export const MIN_ORDER_KG = 0.25;

export function isPieceProduct(product: Product): boolean {
  return product.saleUnit === "piece";
}

/** Poids de référence « lot catalogue » : 1 pièce pour vente à la pièce, sinon kg depuis weightGrams. */
export function referenceWeightKg(product: Product): number {
  if (product.saleUnit === "piece") return 1;
  const kg = product.weightGrams / 1000;
  return kg > 0 ? kg : 1;
}

/** Prix unitaire affiché : FCFA/kg pour vente au kg, FCFA/pièce pour vente à la pièce. */
export function unitRetailPrice(product: Product): number {
  if (product.saleUnit === "piece") return product.price;
  return Math.round(product.price / referenceWeightKg(product));
}

/** @deprecated utiliser `unitRetailPrice` — conservé pour compat imports existants. */
export function pricePerKg(product: Product): number {
  return unitRetailPrice(product);
}

export function oldPricePerKg(product: Product): number | null {
  if (product.oldPrice == null) return null;
  if (product.saleUnit === "piece") return product.oldPrice;
  return Math.round(product.oldPrice / referenceWeightKg(product));
}

export function roundWeightKg(kg: number): number {
  return Math.round(kg * 1000) / 1000;
}

export function minOrderWeight(product: Product): number {
  return product.saleUnit === "piece" ? 1 : MIN_ORDER_KG;
}

export function roundLineWeight(product: Product, kg: number): number {
  if (product.saleUnit === "piece") return Math.round(kg);
  return roundWeightKg(kg);
}

export function clampLineWeight(product: Product, kg: number): number {
  return Math.max(minOrderWeight(product), roundLineWeight(product, kg));
}

/** @deprecated utiliser clampLineWeight(product, kg) */
export function clampMinOrderKg(kg: number): number {
  return Math.max(MIN_ORDER_KG, roundWeightKg(kg));
}

export function lineSubtotalForWeight(product: Product, weightKg: number): number {
  return Math.round(unitRetailPrice(product) * weightKg);
}

export function formatKgFr(kg: number): string {
  return kg.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

export function retailUnitShort(product: Product): string {
  return product.saleUnit === "piece" ? "pièce" : "kg";
}
