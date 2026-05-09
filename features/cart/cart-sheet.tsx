"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/format";
import { CartLineQuantityControls } from "@/features/cart/cart-line-quantity-controls";
import { formatKgFr, isPieceProduct, lineSubtotalForWeight, unitRetailPrice } from "@/lib/product-pricing";
import { productImageNeedsUnoptimized } from "@/lib/product-image";
import { useMounted } from "@/hooks/use-mounted";
import { toast } from "sonner";
import { loginHref, useAuthPersistReady } from "@/features/checkout/checkout-auth-gate";

type Line = {
  productId: string;
  weightKg: number;
  p?: Product;
};

export function CartSheet({
  linesDetail,
  cartCount,
  totals,
}: {
  linesDetail: Line[];
  cartCount: number;
  totals: { subtotal: number; discount: number; total: number };
}) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const authReady = useAuthPersistReady();
  const remove = useCartStore((s) => s.remove);
  const mounted = useMounted();
  const [open, setOpen] = useState(false);

  const closeCart = () => setOpen(false);

  function handleCommander() {
    closeCart();
    if (!authReady) return;
    if (!user) {
      toast.message("Connexion requise", { description: "Connectez-vous pour finaliser la commande." });
      router.push(loginHref("/checkout"));
      return;
    }
    router.push("/checkout");
  }

  /** Données persistées : aligner SSR et premier rendu client pour éviter erreurs d’hydratation. */
  const displayLines = mounted ? linesDetail : [];
  const displayTotals = mounted ? totals : { subtotal: 0, discount: 0, total: 0 };
  const showBadge = mounted && cartCount > 0;

  /** Panier : tirage depuis le bas mobile, colonne à droite dès md (tailwind). */
  const [cartSide, setCartSide] = useState<"bottom" | "right">("bottom");
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setCartSide(mq.matches ? "right" : "bottom");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        type="button"
        aria-label="Panier"
        className={cn(
          buttonVariants({ size: "icon", variant: "outline" }),
          "relative rounded-2xl border-border hover:bg-accent",
        )}
      >
        <ShoppingBag className="size-5" />
        {showBadge && (
          <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-brand-orange px-1 text-[10px] font-bold text-white shadow">
            {cartCount}
          </span>
        )}
      </SheetTrigger>
      <SheetContent
        side={cartSide}
        className={cn(
          "flex w-full flex-col gap-0 overflow-hidden px-0 pb-0 pt-0",
          cartSide === "right" && "h-full max-h-dvh max-w-md",
          cartSide === "bottom" &&
            "max-h-[min(92dvh,calc(100dvh-env(safe-area-inset-bottom)))] rounded-t-3xl border-x-0 pb-[max(env(safe-area-inset-bottom),0.75rem)]",
        )}
      >
        {cartSide === "bottom" && (
          <div
            aria-hidden
            className="mx-auto mt-3 mb-1 h-1.5 w-10 shrink-0 rounded-full bg-muted-foreground/30"
          />
        )}
        <SheetHeader className={cn("shrink-0 border-b border-border px-6 py-5", cartSide === "bottom" && "pt-4")}>
          <SheetTitle className="text-lg">Panier</SheetTitle>
          <p className="text-muted-foreground text-sm font-normal">
            Lots (portion catalogue) et pas 250&nbsp;g — prix au kg — total en CFA.
          </p>
        </SheetHeader>
        <ScrollArea
          className={
            cartSide === "right"
              ? "min-h-0 flex-1 px-4 pt-4"
              : "max-h-[calc(92dvh-13.5rem)] min-h-[10rem] px-4 pt-4"
          }
        >
          {displayLines.length === 0 ? (
            <div className="flex flex-col gap-3 rounded-3xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
              <p>Votre panier est léger comme une salade iceberg.</p>
              <Button asChild className="mx-auto rounded-2xl">
                <Link href="/shop" onClick={closeCart}>
                  Parcourir le catalogue
                </Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 pb-4">
              {displayLines.map((line) =>
                line.p ? (
                  <div
                    key={line.productId}
                    className="flex gap-3 rounded-[1.25rem] border border-border/70 bg-card p-3 shadow-sm"
                  >
                    <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-muted">
                      <Image
                        src={line.p.image}
                        alt={line.p.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                        unoptimized={productImageNeedsUnoptimized(line.p.image)}
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <Link
                        href={`/shop/${line.p.slug}`}
                        onClick={closeCart}
                        className="truncate font-semibold leading-snug hover:underline"
                      >
                        {line.p.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {isPieceProduct(line.p)
                          ? `${formatCurrency(unitRetailPrice(line.p))} / pièce × ${Math.round(line.weightKg)} pièce(s)`
                          : `${formatCurrency(unitRetailPrice(line.p))} / kg × ${formatKgFr(line.weightKg)} kg`}
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        {formatCurrency(lineSubtotalForWeight(line.p, line.weightKg))}
                      </p>
                      <div className="mt-auto flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                        <CartLineQuantityControls productId={line.productId} product={line.p} weightKg={line.weightKg} className="min-w-0 flex-1" />
                        <Button
                          variant="ghost"
                          size="xs"
                          className="shrink-0 self-start text-destructive sm:self-auto"
                          onClick={() => remove(line.productId)}
                        >
                          Retirer
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : null,
              )}
            </div>
          )}
        </ScrollArea>
        <div className="shrink-0 border-t border-border bg-muted/30 px-6 py-5">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sous-total</span>
              <span>{formatCurrency(displayTotals.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Promo</span>
              <span className={displayTotals.discount > 0 ? "text-primary" : ""}>
                −{formatCurrency(displayTotals.discount)}
              </span>
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>{formatCurrency(displayTotals.total)}</span>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-3">
            <Button
              type="button"
              className="h-11 w-full rounded-2xl bg-primary hover:bg-brand-dark hover:text-white"
              disabled={!authReady || displayLines.length === 0}
              onClick={handleCommander}
            >
              Commander
            </Button>
            <Button asChild variant="outline" className="h-11 w-full rounded-2xl">
              <Link href="/cart" onClick={closeCart}>
                Voir le panier
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
