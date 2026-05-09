"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import type { Product } from "@/types";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/format";
import {
  clampLineWeight,
  formatKgFr,
  isPieceProduct,
  lineSubtotalForWeight,
  MIN_ORDER_KG,
  oldPricePerKg,
  referenceWeightKg,
  roundWeightKg,
  unitRetailPrice,
} from "@/lib/product-pricing";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const STEP = 0.25;

function PiecePurchaseFlow({ product }: { product: Product }) {
  const lines = useCartStore((s) => s.lines);
  const addKg = useCartStore((s) => s.addKg);
  const inCart = lines.find((l) => l.productId === product.id)?.weightKg ?? 0;

  const [pieces, setPieces] = useState(1);
  const lineTotal = useMemo(() => lineSubtotalForWeight(product, pieces), [product, pieces]);
  const pkg = unitRetailPrice(product);
  const oldPkg = oldPricePerKg(product);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-baseline gap-2">
        <p className="text-2xl font-bold text-primary sm:text-3xl">
          {formatCurrency(pkg)}
          <span className="text-base font-semibold text-muted-foreground"> / pièce</span>
        </p>
        {oldPkg != null && (
          <p className="text-sm text-muted-foreground line-through">{formatCurrency(oldPkg)} / pièce</p>
        )}
      </div>
      <p className="text-sm text-muted-foreground">
        Vente à la pièce — indiquez combien de têtes ou unités vous souhaitez.
      </p>

      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">Nombre de pièces</p>
        <div className="inline-flex items-center gap-1 rounded-2xl border border-border bg-background p-1 shadow-inner">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className="rounded-xl"
            aria-label="Retirer une pièce"
            onClick={() => setPieces((p) => Math.max(1, p - 1))}
            disabled={pieces <= 1}
          >
            <Minus className="size-4" />
          </Button>
          <Input
            type="number"
            inputMode="numeric"
            min={1}
            step={1}
            className="h-11 w-[4.25rem] rounded-xl text-center tabular-nums"
            value={pieces}
            onChange={(e) => {
              const v = Number.parseInt(e.target.value.replace(/\D/g, ""), 10);
              if (!Number.isFinite(v)) return;
              setPieces(Math.max(1, Math.min(9999, v)));
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className="rounded-xl"
            aria-label="Ajouter une pièce"
            onClick={() => setPieces((p) => Math.min(9999, p + 1))}
          >
            <Plus className="size-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-primary/20 bg-brand-light/40 px-4 py-3 text-sm dark:bg-primary/10">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-muted-foreground">Total pour cette sélection</span>
          <span className="text-lg font-bold text-primary">{formatCurrency(lineTotal)}</span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          <strong className="text-foreground">{pieces}</strong> pièce(s)
        </p>
        {inCart > 0 && (
          <p className="mt-2 border-t border-border/60 pt-2 text-muted-foreground">
            Déjà dans le panier&nbsp;: <strong className="text-foreground">{Math.round(inCart)} pièce(s)</strong>
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          className="h-11 flex-1 rounded-2xl bg-primary hover:bg-brand-dark hover:text-white sm:flex-none sm:px-8"
          disabled={product.availability === "out_of_stock"}
          onClick={() => {
            addKg(product.id, pieces);
            toast.success("Ajouté au panier", {
              description: `${pieces} pièce(s) · ${formatCurrency(lineTotal)}`,
            });
          }}
        >
          <ShoppingBag className="mr-2 size-4" aria-hidden />
          Ajouter au panier
        </Button>
        <Button type="button" variant="outline" className="h-11 rounded-2xl" asChild>
          <Link href="/cart">Voir le panier</Link>
        </Button>
      </div>
    </div>
  );
}

function KgPurchaseFlow({ product }: { product: Product }) {
  const lines = useCartStore((s) => s.lines);
  const addKg = useCartStore((s) => s.addKg);
  const inCart = lines.find((l) => l.productId === product.id)?.weightKg ?? 0;

  const refKg = referenceWeightKg(product);
  const [articleCount, setArticleCount] = useState(1);
  const [selectedKg, setSelectedKg] = useState(() => clampLineWeight(product, refKg));

  const pkg = unitRetailPrice(product);
  const oldPkg = oldPricePerKg(product);
  const lineTotal = useMemo(() => lineSubtotalForWeight(product, selectedKg), [product, selectedKg]);

  function setArticles(nextCount: number) {
    const c = Math.max(1, Math.min(9999, Math.floor(Math.abs(nextCount)) || 1));
    setArticleCount(c);
    setSelectedKg(clampLineWeight(product, roundWeightKg(c * refKg)));
  }

  function applyKg(next: number) {
    setSelectedKg(clampLineWeight(product, roundWeightKg(next)));
  }

  const nominalKg = roundWeightKg(articleCount * refKg);
  const isKgAdjusted = Math.abs(selectedKg - nominalKg) > 0.02;

  const equivLots = useMemo(() => {
    if (refKg <= 1e-9) return "—";
    return (selectedKg / refKg).toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  }, [selectedKg, refKg]);

  const ratioLots = refKg > 1e-9 ? selectedKg / refKg : 1;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-baseline gap-2">
        <p className="text-2xl font-bold text-primary sm:text-3xl">
          {formatCurrency(pkg)}
          <span className="text-base font-semibold text-muted-foreground"> / kg</span>
        </p>
        {oldPkg != null && (
          <p className="text-sm text-muted-foreground line-through">{formatCurrency(oldPkg)} / kg</p>
        )}
      </div>
      <p className="text-sm text-muted-foreground">
        Référence catalogue&nbsp;: <strong className="text-foreground">1 article</strong> ={" "}
        <strong className="text-foreground">{formatKgFr(refKg)} kg</strong> à{" "}
        <strong className="text-foreground">{formatCurrency(product.price)}</strong>
        {product.oldPrice != null ? (
          <>
            {" "}
            <span className="line-through opacity-80">{formatCurrency(product.oldPrice)}</span>
          </>
        ) : null}
        .
      </p>

      <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Nombre d&apos;articles</p>
          <p className="text-xs text-muted-foreground">
            Lots à la référence catalogue ({formatKgFr(refKg)} kg / article).
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-1 rounded-2xl border border-border bg-background p-1 shadow-inner">
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                className="rounded-xl"
                aria-label="Retirer un article"
                onClick={() => setArticles(articleCount - 1)}
                disabled={articleCount <= 1}
              >
                <Minus className="size-4" />
              </Button>
              <Input
                type="number"
                inputMode="numeric"
                min={1}
                step={1}
                className="h-11 w-[4.25rem] rounded-xl text-center tabular-nums"
                value={articleCount}
                onChange={(e) => {
                  const v = Number.parseInt(e.target.value.replace(/\D/g, ""), 10);
                  if (!Number.isFinite(v)) return;
                  setArticles(v);
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                className="rounded-xl"
                aria-label="Ajouter un article"
                onClick={() => setArticles(articleCount + 1)}
              >
                <Plus className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Poids total (kg)</p>
          <p className="text-xs text-muted-foreground">
            Par pas de {STEP.toLocaleString("fr-FR")} kg — min. {MIN_ORDER_KG} kg.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-1 rounded-2xl border border-border bg-background p-1 shadow-inner">
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                className="rounded-xl"
                aria-label="Retirer 250 g"
                onClick={() => applyKg(selectedKg - STEP)}
                disabled={selectedKg <= MIN_ORDER_KG + 1e-9}
              >
                <Minus className="size-4" />
              </Button>
              <Input
                type="number"
                inputMode="decimal"
                step={STEP}
                min={MIN_ORDER_KG}
                className="h-11 w-[5.5rem] rounded-xl text-center tabular-nums"
                value={Number.isFinite(selectedKg) ? selectedKg : MIN_ORDER_KG}
                onChange={(e) => {
                  const v = Number.parseFloat(e.target.value.replace(",", "."));
                  if (!Number.isFinite(v)) return;
                  applyKg(v);
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                className="rounded-xl"
                aria-label="Ajouter 250 g"
                onClick={() => applyKg(selectedKg + STEP)}
              >
                <Plus className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isKgAdjusted ? (
        <p className="text-xs text-muted-foreground">
          Poids différent de {articleCount} × lot réf. ({formatKgFr(nominalKg)} kg)&nbsp;: la facturation utilise{" "}
          <strong className="text-foreground">{formatKgFr(selectedKg)} kg</strong>.
        </p>
      ) : null}

      <p className="text-xs text-muted-foreground">
        Équivalent indicatif&nbsp;: <strong className="text-foreground">{equivLots}</strong> lot
        {ratioLots > 1.05 ? "s" : ""} réf. pour{" "}
        <strong className="text-foreground">{formatKgFr(selectedKg)} kg</strong>.
      </p>

      <div className="rounded-2xl border border-primary/20 bg-brand-light/40 px-4 py-3 text-sm dark:bg-primary/10">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-muted-foreground">Total pour cette sélection</span>
          <span className="text-lg font-bold text-primary">{formatCurrency(lineTotal)}</span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Repère&nbsp;: {articleCount} article{articleCount > 1 ? "s" : ""} catalogue · Poids commandé&nbsp;:{" "}
          <strong className="text-foreground">{formatKgFr(selectedKg)} kg</strong>
        </p>
        {inCart > 0 && (
          <p className="mt-2 border-t border-border/60 pt-2 text-muted-foreground">
            Déjà dans le panier&nbsp;: <strong className="text-foreground">{formatKgFr(inCart)} kg</strong>
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          className="h-11 flex-1 rounded-2xl bg-primary hover:bg-brand-dark hover:text-white sm:flex-none sm:px-8"
          disabled={product.availability === "out_of_stock"}
          onClick={() => {
            addKg(product.id, selectedKg);
            toast.success("Ajouté au panier", {
              description: `${articleCount} art. · ${formatKgFr(selectedKg)} kg · ${formatCurrency(lineTotal)}`,
            });
          }}
        >
          <ShoppingBag className="mr-2 size-4" aria-hidden />
          Ajouter au panier
        </Button>
        <Button type="button" variant="outline" className="h-11 rounded-2xl" asChild>
          <Link href="/cart">Voir le panier</Link>
        </Button>
      </div>
    </div>
  );
}

export function ProductPurchasePanel({ product }: { product: Product }) {
  return isPieceProduct(product) ? (
    <PiecePurchaseFlow product={product} />
  ) : (
    <KgPurchaseFlow product={product} />
  );
}
