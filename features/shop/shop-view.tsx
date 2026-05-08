"use client";

import Image from "next/image";
import { type ReactNode, useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, RotateCcw, SearchIcon } from "lucide-react";
import { filterProducts, parseOptionalPositiveInt, parseProductSort, type ProductSort, PRODUCT_SORT_VALUES, getCatalogPriceRange } from "@/services/product-service";
import { MOCK_CATEGORIES } from "@/mock/categories";
import { ProductCard } from "@/components/shared/product-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getPaginationWindow } from "@/lib/pagination-window";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useDebounce } from "@/hooks/use-debounce";
import { stringifyShopListingHref } from "@/lib/catalog-listing-url";
import { PRODUCT_SORT_LABELS_FR } from "@/lib/catalog-sort-labels";
import { BRANDING } from "@/lib/branding";
import { cn } from "@/lib/utils";

const PAGE = 12;

export function ShopView() {
  const router = useRouter();
  const sp = useSearchParams();
  const [query, setQuery] = useState(sp.get("q") ?? "");
  const debounced = useDebounce(query, 250);
  const [cat, setCat] = useState(sp.get("cat") ?? "");
  const [promo, setPromo] = useState(sp.get("promo") === "1");
  const [bio, setBio] = useState(sp.get("bio") === "1");
  const catalogueRange = useMemo(() => getCatalogPriceRange(), []);
  const [sort, setSort] = useState<ProductSort>(() => parseProductSort(sp.get("sort")));
  const [priceMinStr, setPriceMinStr] = useState(() => sp.get("priceMin") ?? "");
  const [priceMaxStr, setPriceMaxStr] = useState(() => sp.get("priceMax") ?? "");
  const [page, setPage] = useState(1);
  const [mobileFilters, setMobileFilters] = useState(false);

  useEffect(() => {
    setQuery(sp.get("q") ?? "");
    setCat(sp.get("cat") ?? "");
    setPromo(sp.get("promo") === "1");
    setBio(sp.get("bio") === "1");
    setSort(parseProductSort(sp.get("sort")));
    setPriceMinStr(sp.get("priceMin") ?? "");
    setPriceMaxStr(sp.get("priceMax") ?? "");
  }, [sp]);

  const minPriceBound = parseOptionalPositiveInt(priceMinStr.trim() || undefined);
  const maxPriceBound = parseOptionalPositiveInt(priceMaxStr.trim() || undefined);

  const filtered = useMemo(
    () =>
      filterProducts({
        query: debounced || undefined,
        categorySlug: cat || undefined,
        onlyPromo: promo || undefined,
        onlyBio: bio || undefined,
        minPrice: minPriceBound,
        maxPrice: maxPriceBound,
        sort,
      }),
    [debounced, cat, promo, bio, minPriceBound, maxPriceBound, sort],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE));
  const effectivePage = Math.min(Math.max(page, 1), totalPages);

  useEffect(() => {
    setPage((p) => Math.min(Math.max(p, 1), totalPages));
  }, [filtered.length, totalPages]);

  const slice = filtered.slice((effectivePage - 1) * PAGE, effectivePage * PAGE);
  const pageItems = useMemo(() => getPaginationWindow(effectivePage, totalPages), [effectivePage, totalPages]);

  function shopHrefFrom(partial?: Partial<{ sort: ProductSort; priceMinStr: string; priceMaxStr: string }>) {
    return stringifyShopListingHref({
      q: query.trim(),
      cat,
      promo,
      bio,
      sort: partial?.sort ?? sort,
      priceMinStr: partial?.priceMinStr ?? priceMinStr,
      priceMaxStr: partial?.priceMaxStr ?? priceMaxStr,
    });
  }

  function applyUrl() {
    router.replace(shopHrefFrom());
  }

  function renderFilterPanel(suffix: "rail" | "sheet"): ReactNode {
    return (
    <div className="space-y-6 rounded-[1.5rem] border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Filtres</p>
        <Button
          type="button"
          variant="ghost"
          size="xs"
          onClick={() => {
            setQuery("");
            setCat("");
            setPromo(false);
            setBio(false);
            setSort("default");
            setPriceMinStr("");
            setPriceMaxStr("");
            setPage(1);
            router.replace("/shop");
          }}
        >
          <RotateCcw className="mr-2 size-3" /> Réinitialiser
        </Button>
      </div>
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="h-11 rounded-2xl pl-11"
          placeholder="Courgettes, Igname..."
          value={query}
          onChange={(e) => {
            setPage(1);
            setQuery(e.target.value);
          }}
          onBlur={applyUrl}
        />
      </div>
      <div className="grid gap-3 sm:gap-4">
        <div className="space-y-2">
          <Label htmlFor={`shop-sort-${suffix}`} className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Tri
          </Label>
          <select
            id={`shop-sort-${suffix}`}
            value={sort}
            onChange={(e) => {
              const next = parseProductSort(e.target.value);
              setSort(next);
              setPage(1);
              router.replace(shopHrefFrom({ sort: next }));
            }}
            className="h-11 w-full rounded-2xl border border-input bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
          >
            {PRODUCT_SORT_VALUES.map((v) => (
              <option key={v} value={v}>
                {PRODUCT_SORT_LABELS_FR[v]}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <div className="space-y-1.5">
            <Label htmlFor={`shop-pmin-${suffix}`} className="text-xs font-semibold text-muted-foreground">
              Prix min.
            </Label>
            <Input
              id={`shop-pmin-${suffix}`}
              inputMode="numeric"
              className="h-11 rounded-2xl"
              placeholder={`${catalogueRange.min}`}
              value={priceMinStr}
              onChange={(e) => {
                setPriceMinStr(e.target.value);
                setPage(1);
              }}
              onBlur={() => applyUrl()}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor={`shop-pmax-${suffix}`} className="text-xs font-semibold text-muted-foreground">
              Prix max.
            </Label>
            <Input
              id={`shop-pmax-${suffix}`}
              inputMode="numeric"
              className="h-11 rounded-2xl"
              placeholder={`${catalogueRange.max}`}
              value={priceMaxStr}
              onChange={(e) => {
                setPriceMaxStr(e.target.value);
                setPage(1);
              }}
              onBlur={() => applyUrl()}
            />
          </div>
          <p className="col-span-2 text-[0.7rem] text-muted-foreground">Montants en FCFA · encadrent le prix catalogue actuel.</p>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-semibold text-muted-foreground">Catégories</p>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => {
              setCat("");
              setPage(1);
              router.replace(
                stringifyShopListingHref({
                  q: query.trim(),
                  cat: "",
                  promo,
                  bio,
                  sort,
                  priceMinStr,
                  priceMaxStr,
                }),
              );
            }}
            className={`rounded-xl px-3 py-2 text-left text-sm ${!cat ? "bg-accent font-semibold" : "hover:bg-muted/60"}`}
          >
            Toutes
          </button>
          {MOCK_CATEGORIES.map((c) => (
            <button
              type="button"
              key={c.id}
              onClick={() => {
                const next = c.slug;
                setCat(next);
                setPage(1);
                router.replace(
                  stringifyShopListingHref({
                    q: query.trim(),
                    cat: next,
                    promo,
                    bio,
                    sort,
                    priceMinStr,
                    priceMaxStr,
                  }),
                );
              }}
              className={`flex items-center justify-between rounded-xl px-3 py-2 text-left text-sm ${
                cat === c.slug ? "bg-accent font-semibold" : "hover:bg-muted/60"
              }`}
            >
              {c.name}
              <Badge variant="outline" className="rounded-full text-[0.65rem] tabular-nums">
                {c.productCount}
              </Badge>
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Checkbox
            id={`promo-only-${suffix}`}
            checked={promo}
            onCheckedChange={(v) => {
              const next = Boolean(v);
              setPromo(next);
              setPage(1);
              router.replace(
                stringifyShopListingHref({
                  q: query.trim(),
                  cat,
                  promo: next,
                  bio,
                  sort,
                  priceMinStr,
                  priceMaxStr,
                }),
              );
            }}
          />
          <Label htmlFor={`promo-only-${suffix}`} className="text-sm leading-none font-medium select-none cursor-pointer">
            Promotions uniquement
          </Label>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox
            id={`bio-only-${suffix}`}
            checked={bio}
            onCheckedChange={(v) => {
              const next = Boolean(v);
              setBio(next);
              setPage(1);
              router.replace(
                stringifyShopListingHref({
                  q: query.trim(),
                  cat,
                  promo,
                  bio: next,
                  sort,
                  priceMinStr,
                  priceMaxStr,
                }),
              );
            }}
          />
          <Label htmlFor={`bio-only-${suffix}`} className="cursor-pointer select-none text-sm font-medium leading-none">
            Produits BIO
          </Label>
        </div>
      </div>
      <Button className="h-11 w-full rounded-2xl bg-primary hover:bg-brand-dark hover:text-white" onClick={() => applyUrl()} type="button">
        Appliquer
      </Button>
    </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-3 py-8 sm:px-4 md:flex md:gap-10 md:py-12 md:px-8 lg:px-10">
      <aside className="hidden w-[300px] shrink-0 xl:block">{renderFilterPanel("rail")}</aside>
      <div className="min-w-0 flex-1 space-y-8">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-dashed border-border pb-6 sm:pb-8">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Fresh catalog</p>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">Catalogue</h1>
            <p className="mt-2 max-w-xl text-muted-foreground">
              {filtered.length} produits · filtres instantanés — trouvez vite ce qu&apos;il vous faut.
            </p>
          </div>
          <div className="flex gap-3">
            <Sheet open={mobileFilters} onOpenChange={setMobileFilters}>
              <SheetTrigger
                type="button"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "rounded-2xl border-border xl:hidden",
                )}
              >
                <Filter className="mr-2 size-4" /> Filtres
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh] overflow-y-auto pb-24">
                {renderFilterPanel("sheet")}
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="space-y-3 xl:hidden">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">Tri & prix (FCFA)</p>
          <div className="grid gap-3 rounded-2xl border border-border/70 bg-muted/15 p-3 sm:p-4">
            <div className="space-y-1.5">
              <Label htmlFor="shop-sort-toolbar" className="sr-only">
                Critère de tri
              </Label>
              <select
                id="shop-sort-toolbar"
                value={sort}
                aria-label="Trier les produits"
                onChange={(e) => {
                  const next = parseProductSort(e.target.value);
                  setSort(next);
                  setPage(1);
                  router.replace(shopHrefFrom({ sort: next }));
                }}
                className="h-11 min-h-[2.75rem] w-full rounded-2xl border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {PRODUCT_SORT_VALUES.map((v) => (
                  <option key={v} value={v}>
                    {PRODUCT_SORT_LABELS_FR[v]}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input
                id="shop-toolbar-pmin"
                inputMode="numeric"
                aria-label="Prix minimum en FCFA"
                placeholder={`Min (${catalogueRange.min})`}
                className="h-11 min-h-[2.75rem] rounded-2xl"
                value={priceMinStr}
                onChange={(e) => {
                  setPriceMinStr(e.target.value);
                  setPage(1);
                }}
                onBlur={() => applyUrl()}
              />
              <Input
                id="shop-toolbar-pmax"
                inputMode="numeric"
                aria-label="Prix maximum en FCFA"
                placeholder={`Max (${catalogueRange.max})`}
                className="h-11 min-h-[2.75rem] rounded-2xl"
                value={priceMaxStr}
                onChange={(e) => {
                  setPriceMaxStr(e.target.value);
                  setPage(1);
                }}
                onBlur={() => applyUrl()}
              />
            </div>
          </div>
        </div>
        {slice.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-border py-24 text-center text-muted-foreground">
            <p>Rien sous ces filtres — ouvrez le rayon.</p>
            <Button className="mt-6 rounded-2xl" variant="outline" onClick={() => router.push("/shop")}>
              Réinitialiser
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {slice.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
        {totalPages > 1 && (
          <div className="space-y-2">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    text="Précédent"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage((p) => Math.max(1, p - 1));
                    }}
                  />
                </PaginationItem>
                {pageItems.map((item, i) =>
                  item === "ellipsis" ? (
                    <PaginationItem key={`ellipsis-${effectivePage}-${i}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={item}>
                      <PaginationLink
                        href="#"
                        isActive={effectivePage === item}
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(item);
                        }}
                      >
                        {item}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    text="Suivant"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage((p) => Math.min(totalPages, p + 1));
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            <p className="text-center text-sm text-muted-foreground tabular-nums sm:hidden">
              Page {effectivePage} / {totalPages}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function ShopViewFallback() {
  return (
    <div className="mx-auto max-w-7xl px-3 py-10 sm:px-4 md:px-8 lg:px-10">
      <div className="mb-8 flex flex-col items-center justify-center gap-2 md:mb-10">
        <div className="animate-pulse">
          <Image
            src={BRANDING.logo}
            alt={BRANDING.alt}
            width={176}
            height={64}
            className="h-12 w-auto max-w-[10rem] object-contain opacity-95"
          />
        </div>
        <p className="text-xs text-muted-foreground">Préparation du catalogue…</p>
      </div>
      <div className="grid gap-6 md:grid-cols-[280px_minmax(0,1fr)] md:gap-16">
        <div className="hidden flex-col gap-4 md:flex">
          <Skeleton className="h-40 rounded-[2rem]" />
          <Skeleton className="h-64 rounded-[2rem]" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[420px] rounded-[2rem]" />
          ))}
        </div>
      </div>
    </div>
  );
}
