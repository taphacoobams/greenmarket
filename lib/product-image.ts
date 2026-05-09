/** Visuel temporaire tant que `public/products/<slug>.png` n’est pas généré. */
export const PRODUCT_IMAGE_PENDING_PLACEHOLDER = "/products/placeholder-photo-a-generer.svg";

export function resolveProductImagePath(imageSlug: string | null | undefined): string {
  if (imageSlug == null || String(imageSlug).trim() === "") {
    return PRODUCT_IMAGE_PENDING_PLACEHOLDER;
  }
  return `/products/${imageSlug}.png`;
}

export function isProductImagePending(imageSrc: string): boolean {
  return imageSrc === PRODUCT_IMAGE_PENDING_PLACEHOLDER;
}

/** Next/Image optimise mal certains SVG locaux — désactive l’optimisation dans ce cas. */
export function productImageNeedsUnoptimized(imageSrc: string): boolean {
  return /\.svg(\?|$)/i.test(imageSrc);
}
