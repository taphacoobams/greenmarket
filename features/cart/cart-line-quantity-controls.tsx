"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { formatKgFr, isPieceProduct, referenceWeightKg } from "@/lib/product-pricing";
import { useCartStore } from "@/store/cart-store";

const STEP_KG = 0.25;

export function CartLineQuantityControls({
  productId,
  product,
  weightKg,
  className,
}: {
  productId: string;
  product: Product;
  weightKg: number;
  className?: string;
}) {
  const addKg = useCartStore((s) => s.addKg);
  const piece = isPieceProduct(product);
  const step = piece ? 1 : STEP_KG;
  const refKg = referenceWeightKg(product);
  const lotsEquiv = weightKg / refKg;

  if (piece) {
    return (
      <div className={cn("flex flex-col gap-2.5", className)}>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">Quantité (pièces)</span>
          <div className="ml-auto inline-flex items-center rounded-full border bg-background px-0.5 shadow-inner">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-9 shrink-0 rounded-full"
              aria-label="Retirer une pièce"
              onClick={() => addKg(productId, -1)}
            >
              −
            </Button>
            <span className="min-w-[3rem] px-1 text-center text-sm font-bold tabular-nums">
              {Math.round(weightKg)} pièce{Math.round(weightKg) > 1 ? "s" : ""}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-9 shrink-0 rounded-full"
              aria-label="Ajouter une pièce"
              onClick={() => addKg(productId, 1)}
            >
              +
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
          Quantité (lots)
        </span>
        <span className="text-[0.65rem] text-muted-foreground">≈ {formatKgFr(refKg)} kg / lot</span>
        <div className="ml-auto inline-flex items-center rounded-full border bg-background px-0.5 shadow-inner">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-9 shrink-0 rounded-full"
            aria-label="Retirer un lot"
            onClick={() => addKg(productId, -refKg)}
          >
            −
          </Button>
          <span className="min-w-[2.75rem] px-1 text-center text-sm font-bold tabular-nums">
            {lotsEquiv.toLocaleString("fr-FR", { maximumFractionDigits: 1, minimumFractionDigits: 0 })}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-9 shrink-0 rounded-full"
            aria-label="Ajouter un lot"
            onClick={() => addKg(productId, refKg)}
          >
            +
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
          Poids (pas {STEP_KG * 1000} g)
        </span>
        <div className="ml-auto inline-flex items-center rounded-full border bg-background px-0.5 shadow-inner">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-9 shrink-0 rounded-full"
            aria-label={`Retirer ${STEP_KG * 1000} g`}
            onClick={() => addKg(productId, -STEP_KG)}
          >
            −
          </Button>
          <span className="min-w-[3.25rem] px-1 text-center text-sm font-bold tabular-nums">{formatKgFr(weightKg)} kg</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-9 shrink-0 rounded-full"
            aria-label={`Ajouter ${STEP_KG * 1000} g`}
            onClick={() => addKg(productId, STEP_KG)}
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
}
