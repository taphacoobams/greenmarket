/**
 * Aperçu cohérent avec `lib/product-pricing` pour les formulaires admin (sans objets `Product` complets).
 */
export function previewUnitRetailFcfa(options: {
  saleUnit: "kg" | "piece";
  weightGrams: number;
  price: number;
}): number {
  if (options.saleUnit === "piece") return Math.max(0, Math.round(options.price));
  const kg = options.weightGrams > 0 ? options.weightGrams / 1000 : 1;
  return Math.round(options.price / kg);
}
