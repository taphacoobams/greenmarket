"use client";

import Image from "next/image";
import Link from "next/link";
import { MOCK_PRODUCTS } from "@/mock/products";
import { useCartStore } from "@/store/cart-store";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/format";
import {
  formatKgFr,
  isPieceProduct,
  lineSubtotalForWeight,
  unitRetailPrice,
} from "@/lib/product-pricing";
import { productImageNeedsUnoptimized } from "@/lib/product-image";
import { useMounted } from "@/hooks/use-mounted";
import type { DeliveryMethod } from "@/types";

const DELIVERY_FEES_FCFA: Record<DeliveryMethod, number> = {
  standard: 1000,
  express: 2500,
  slot: 1500,
};

const DELIVERY_LABEL: Record<DeliveryMethod, string> = {
  standard: "Standard (lendemain matin)",
  express: "Express (avant 11 h)",
  slot: "Créneau au choix",
};

type Props = {
  deliveryMethod: DeliveryMethod;
  /** Masquer les lignes détaillées (ex. vue ultra compacte) */
  compact?: boolean;
};

export function CheckoutOrderSummary({ deliveryMethod, compact = false }: Props) {
  const lines = useCartStore((s) => s.lines);
  const promoCode = useCartStore((s) => s.promoCode);
  const getTotals = useCartStore((s) => s.getTotals);
  const mounted = useMounted();

  const fee = DELIVERY_FEES_FCFA[deliveryMethod];
  const totals = mounted ? getTotals() : { subtotal: 0, discount: 0, total: 0, count: 0, totalKg: 0 };
  const grandTotal = totals.total + fee;

  const rows = lines
    .map((l) => ({ ...l, p: MOCK_PRODUCTS.find((x) => x.id === l.productId) }))
    .filter((x): x is typeof x & { p: NonNullable<(typeof x)["p"]> } => Boolean(x.p));

  if (!mounted) {
    return (
      <Card className="rounded-[1.75rem] border-border p-6 shadow-sm">
        <p className="text-sm font-medium text-foreground">Récapitulatif</p>
        <p className="mt-4 text-sm text-muted-foreground">Synchronisation du panier…</p>
      </Card>
    );
  }

  if (rows.length === 0) {
    return (
      <Card className="rounded-[1.75rem] border-dashed border-border p-6 shadow-sm">
        <p className="text-sm font-medium text-foreground">Récapitulatif</p>
        <p className="mt-3 text-sm text-muted-foreground">
          Panier vide —{" "}
          <Link href="/shop" className="font-medium text-primary underline-offset-4 hover:underline">
            parcourir le catalogue
          </Link>
          .
        </p>
      </Card>
    );
  }

  return (
    <Card className="rounded-[1.75rem] border-border p-6 shadow-sm lg:sticky lg:top-24">
      <h2 className="text-lg font-semibold tracking-tight">Récapitulatif</h2>
      {!compact && (
        <ul className="mt-4 space-y-3">
          {rows.map(({ p, weightKg }) => (
            <li key={p.id} className="flex gap-3 text-sm">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-muted">
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover"
                  unoptimized={productImageNeedsUnoptimized(p.image)}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium leading-snug">{p.name}</p>
                <p className="text-muted-foreground">
                  {isPieceProduct(p)
                    ? `${Math.round(weightKg)} pièce(s) × ${formatCurrency(unitRetailPrice(p))}`
                    : `${formatKgFr(weightKg)} kg × ${formatCurrency(unitRetailPrice(p))} / kg`}
                </p>
                <p className="mt-0.5 font-semibold tabular-nums text-foreground">
                  {formatCurrency(lineSubtotalForWeight(p, weightKg))}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Separator className="my-5" />

      <dl className="space-y-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Sous-total</dt>
          <dd className="tabular-nums">{formatCurrency(totals.subtotal)}</dd>
        </div>
        {totals.discount > 0 ? (
          <div className="flex justify-between gap-4 text-primary">
            <dt>Promo {promoCode ? `(${promoCode})` : ""}</dt>
            <dd className="tabular-nums">−{formatCurrency(totals.discount)}</dd>
          </div>
        ) : null}
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Livraison</dt>
          <dd className="text-right">
            <span className="block text-xs text-muted-foreground">{DELIVERY_LABEL[deliveryMethod]}</span>
            <span className="tabular-nums">{formatCurrency(fee)}</span>
          </dd>
        </div>
        <Separator className="my-3" />
        <div className="flex justify-between gap-4 text-base font-semibold">
          <dt>Total</dt>
          <dd className="tabular-nums text-primary">{formatCurrency(grandTotal)}</dd>
        </div>
      </dl>
    </Card>
  );
}

export { DELIVERY_FEES_FCFA };
