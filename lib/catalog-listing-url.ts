import { parseOptionalPositiveInt, type ProductSort } from "@/services/product-service";

function appendPriceAndSort(qs: URLSearchParams, sort: ProductSort, priceMinStr: string, priceMaxStr: string) {
  if (sort !== "default") qs.set("sort", sort);
  const mi = parseOptionalPositiveInt(priceMinStr.trim() || undefined);
  const ma = parseOptionalPositiveInt(priceMaxStr.trim() || undefined);
  if (mi != null) qs.set("priceMin", String(mi));
  if (ma != null) qs.set("priceMax", String(ma));
}

export type ShopListingUrlState = {
  q: string;
  promo: boolean;
  bio: boolean;
  sort: ProductSort;
  priceMinStr: string;
  priceMaxStr: string;
};

export type SearchListingUrlState = {
  q: string;
  sort: ProductSort;
  priceMinStr: string;
  priceMaxStr: string;
};

export function stringifyShopListingHref(state: ShopListingUrlState): string {
  const qs = new URLSearchParams();
  if (state.q.trim()) qs.set("q", state.q.trim());
  if (state.promo) qs.set("promo", "1");
  if (state.bio) qs.set("bio", "1");
  appendPriceAndSort(qs, state.sort, state.priceMinStr, state.priceMaxStr);
  const s = qs.toString();
  return s ? `/shop?${s}` : "/shop";
}

export function stringifySearchListingHref(state: SearchListingUrlState): string {
  const qs = new URLSearchParams();
  if (state.q.trim()) qs.set("q", state.q.trim());
  appendPriceAndSort(qs, state.sort, state.priceMinStr, state.priceMaxStr);
  const s = qs.toString();
  return s ? `/search?${s}` : "/search";
}
