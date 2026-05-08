"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { RotateCcw, Search } from "lucide-react";
import {
  filterProducts,
  getCatalogPriceRange,
  parseOptionalPositiveInt,
  parseProductSort,
  PRODUCT_SORT_VALUES,
  type ProductSort,
} from "@/services/product-service";
import { ProductCard } from "@/components/shared/product-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { stringifySearchListingHref } from "@/lib/catalog-listing-url";
import { PRODUCT_SORT_LABELS_FR } from "@/lib/catalog-sort-labels";

export function SearchResults() {
  const router = useRouter();
  const sp = useSearchParams();

  const catalogueRange = useMemo(() => getCatalogPriceRange(), []);
  const [searchInput, setSearchInput] = useState("");
  const [sort, setSort] = useState<ProductSort>(() => parseProductSort(sp.get("sort")));
  const [priceMinStr, setPriceMinStr] = useState(() => sp.get("priceMin") ?? "");
  const [priceMaxStr, setPriceMaxStr] = useState(() => sp.get("priceMax") ?? "");

  useEffect(() => {
    setSearchInput(sp.get("q") ?? "");
    setSort(parseProductSort(sp.get("sort")));
    setPriceMinStr(sp.get("priceMin") ?? "");
    setPriceMaxStr(sp.get("priceMax") ?? "");
  }, [sp]);

  const qFilter = searchInput.trim();
  const minP = parseOptionalPositiveInt(priceMinStr.trim() || undefined);
  const maxP = parseOptionalPositiveInt(priceMaxStr.trim() || undefined);

  const list = useMemo(
    () =>
      filterProducts({
        query: qFilter || undefined,
        minPrice: minP,
        maxPrice: maxP,
        sort,
      }),
    [qFilter, minP, maxP, sort],
  );

  function currentHref(patch?: Partial<{ sort: ProductSort }>) {
    return stringifySearchListingHref({
      q: qFilter,
      sort: patch?.sort ?? sort,
      priceMinStr,
      priceMaxStr,
    });
  }

  function commitUrl() {
    router.replace(currentHref());
  }

  return (
    <div className="mx-auto max-w-7xl px-3 py-8 sm:px-4 md:px-8 md:py-12 lg:px-10">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Recherche</h1>
      <p className="mt-2 max-w-xl text-muted-foreground text-sm sm:text-base">
        Filtrez par prix et classez les résultats — les filtres peuvent être partagés dans l&apos;URL.
      </p>

      <div className="relative mt-6 max-w-xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="h-12 min-h-[3rem] rounded-2xl pl-11 text-base sm:text-sm"
          placeholder="Rechercher…"
          onKeyDown={(e) => {
            if (e.key === "Enter") router.replace(currentHref());
          }}
          onBlur={() => router.replace(currentHref())}
        />
      </div>

      <div className="mt-6 rounded-2xl border border-border/80 bg-muted/15 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Prix & tri
          </p>
          <Button
            type="button"
            variant="ghost"
            size="xs"
            className="shrink-0 rounded-xl text-muted-foreground"
            onClick={() => {
              setSort("default");
              setPriceMinStr("");
              setPriceMaxStr("");
              router.replace(
                stringifySearchListingHref({
                  q: searchInput.trim(),
                  sort: "default",
                  priceMinStr: "",
                  priceMaxStr: "",
                }),
              );
            }}
          >
            <RotateCcw className="mr-2 size-3" /> Réinitialiser tri &amp; prix
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          <div className="space-y-2 lg:col-span-5">
            <Label htmlFor="search-sort">Tri</Label>
            <select
              id="search-sort"
              value={sort}
              onChange={(e) => {
                const next = parseProductSort(e.target.value);
                setSort(next);
                router.replace(currentHref({ sort: next }));
              }}
              className="h-12 min-h-[2.75rem] w-full rounded-2xl border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {PRODUCT_SORT_VALUES.map((v) => (
                <option key={v} value={v}>
                  {PRODUCT_SORT_LABELS_FR[v]}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2 sm:col-span-1 lg:col-span-3">
            <Label htmlFor="search-pmin">Prix min. (FCFA)</Label>
            <Input
              id="search-pmin"
              inputMode="numeric"
              className="h-12 rounded-2xl"
              placeholder={String(catalogueRange.min)}
              value={priceMinStr}
              onChange={(e) => setPriceMinStr(e.target.value)}
              onBlur={() => commitUrl()}
            />
          </div>
          <div className="space-y-2 sm:col-span-1 lg:col-span-3">
            <Label htmlFor="search-pmax">Prix max. (FCFA)</Label>
            <Input
              id="search-pmax"
              inputMode="numeric"
              className="h-12 rounded-2xl"
              placeholder={String(catalogueRange.max)}
              value={priceMaxStr}
              onChange={(e) => setPriceMaxStr(e.target.value)}
              onBlur={() => commitUrl()}
            />
          </div>
        </div>
      </div>

      <p className="mt-8 text-muted-foreground text-sm">
        <span className="font-semibold text-foreground tabular-nums">{list.length}</span> résultat
        {list.length > 1 ? "s" : ""}
        {" · "}
        <span className="break-words">« {searchInput.trim() || "catalogue sans terme précis"} »</span>
      </p>

      {list.length === 0 ? (
        <div className="mt-10 rounded-[2rem] border border-dashed border-border px-6 py-20 text-center text-muted-foreground">
          <p>Aucun produit sous ces critères.</p>
          <Button type="button" className="mt-6 rounded-2xl" variant="outline" onClick={() => router.push("/search")}>
            Tout réinitialiser
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
