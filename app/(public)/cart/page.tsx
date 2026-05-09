"use client";

import Image from "next/image";
import Link from "next/link";
import { LinkButton } from "@/components/shared/link-button";
import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import { MOCK_PRODUCTS } from "@/mock/products";
import { MOCK_PROMOTIONS } from "@/mock/promotions";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";
import { formatCurrency } from "@/lib/format";
import { formatKgFr, isPieceProduct, lineSubtotalForWeight, unitRetailPrice } from "@/lib/product-pricing";
import { productImageNeedsUnoptimized } from "@/lib/product-image";
import { CartLineQuantityControls } from "@/features/cart/cart-line-quantity-controls";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginHref, useAuthPersistReady } from "@/features/checkout/checkout-auth-gate";

export default function CartPage() {
  const router = useRouter();
  const authReady = useAuthPersistReady();
  const user = useAuthStore((s) => s.user);
  const lines = useCartStore((s) => s.lines);
  const promoCode = useCartStore((s) => s.promoCode);
  const setPromoCode = useCartStore((s) => s.setPromoCode);
  const remove = useCartStore((s) => s.remove);
  const getTotals = useCartStore((s) => s.getTotals);
  const totals = useMemo(() => getTotals(), [lines, promoCode]);
  const [input, setInput] = useState(promoCode ?? "");

  const detail = lines
    .map((l) => ({ ...l, p: MOCK_PRODUCTS.find((x) => x.id === l.productId) }))
    .filter((x) => x.p);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 lg:px-10">
      <h1 className="text-4xl font-bold">Panier</h1>
      <p className="mt-2 text-muted-foreground">
        Ajustez les quantités : au kg (pas de 250&nbsp;g, minimum 250&nbsp;g) ou à la pièce selon le produit — prix au kg ou à la
        pièce affiché sur la fiche.
      </p>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_360px]">
        <div className="space-y-4">
          {detail.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-border px-10 py-20 text-center text-muted-foreground">
              Vide pour l&apos;instant.{" "}
              <Link className="font-semibold text-primary" href="/shop">
                Remplissez-le
              </Link>
              .
            </div>
          ) : (
            detail.map(({ p, weightKg, productId }) => (
              <div
                key={productId}
                className="flex flex-wrap gap-4 rounded-[1.75rem] border border-border bg-card p-4 shadow-sm"
              >
                <div className="relative size-28 overflow-hidden rounded-2xl bg-muted">
                  {p && (
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="112px"
                      className="object-cover"
                      unoptimized={productImageNeedsUnoptimized(p.image)}
                    />
                  )}
                </div>
                <div className="flex min-w-[200px] flex-1 flex-col gap-3">
                  {p && (
                    <>
                      <Link href={`/shop/${p.slug}`} className="text-lg font-semibold hover:underline">
                        {p.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {isPieceProduct(p)
                          ? `${formatCurrency(unitRetailPrice(p))} / pièce × ${Math.round(weightKg)} pièce(s)`
                          : `${formatCurrency(unitRetailPrice(p))} / kg × ${formatKgFr(weightKg)} kg`}
                      </p>
                    </>
                  )}
                  <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    {p && (
                      <CartLineQuantityControls productId={productId} product={p} weightKg={weightKg} className="min-w-0 flex-1" />
                    )}
                    <Button type="button" variant="ghost" size="xs" className="shrink-0 text-destructive" onClick={() => remove(productId)}>
                      <Trash2 className="mr-1 size-4" /> Supprimer
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 text-right font-semibold">
                  {p && <span>{formatCurrency(lineSubtotalForWeight(p, weightKg))}</span>}
                </div>
              </div>
            ))
          )}
        </div>
        <aside className="h-fit space-y-5 rounded-[1.75rem] border border-border bg-muted/40 p-6">
          <h2 className="text-lg font-bold">Synthèse</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sous-total</span>
              <span>{formatCurrency(totals.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Promo</span>
              <span>− {formatCurrency(totals.discount)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>À payer</span>
              <span>{formatCurrency(totals.total)}</span>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase text-muted-foreground">Code promo</label>
            <div className="mt-2 flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="GREEN10"
                className="rounded-xl"
              />
              <Button
                type="button"
                variant="outline"
                className="rounded-xl"
                onClick={() => {
                  setPromoCode(input.trim());
                  toast.success("Code promo appliqué", { description: input });
                }}
              >
                OK
              </Button>
            </div>
            <p className="mt-2 text-[0.7rem] text-muted-foreground">
              Codes disponibles :{" "}
              {MOCK_PROMOTIONS.map((x) => (
                <span key={x.code} className="mr-2 font-mono">
                  {x.code}
                </span>
              ))}
            </p>
          </div>
          <LinkButton variant="outline" href="/shop" size="lg" className="h-11 w-full rounded-2xl">
            Continuer
          </LinkButton>
          <Button
            type="button"
            variant="default"
            size="lg"
            className="h-11 w-full rounded-2xl bg-primary hover:bg-brand-dark hover:text-white"
            disabled={!authReady || detail.length === 0}
            onClick={() => {
              if (!authReady) return;
              if (!user) {
                toast.message("Connexion requise", { description: "Connectez-vous pour finaliser la commande." });
                router.push(loginHref("/checkout"));
                return;
              }
              router.push("/checkout");
            }}
          >
            Commander
          </Button>
        </aside>
      </div>
    </div>
  );
}
