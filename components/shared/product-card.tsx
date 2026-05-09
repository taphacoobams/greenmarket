"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/types";
import { formatCurrency } from "@/lib/format";
import {
  formatKgFr,
  isPieceProduct,
  oldPricePerKg,
  referenceWeightKg,
  retailUnitShort,
  unitRetailPrice,
} from "@/lib/product-pricing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import { ProductFavoriteButton } from "@/components/shared/product-favorite-button";
import { productImageNeedsUnoptimized } from "@/lib/product-image";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const addKg = useCartStore((s) => s.addKg);

  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      className={cn("h-full", className)}
    >
      <Card className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[0_18px_50px_-32px_rgb(17_24_39_/_0.35)]">
        <div className="relative aspect-[4/3] bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
            priority={false}
            unoptimized={productImageNeedsUnoptimized(product.image)}
          />
          <Link
            href={`/shop/${product.slug}`}
            className="absolute inset-0 z-10 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`Voir ${product.name}`}
          />
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {product.promo && (
              <Badge className="rounded-full bg-brand-orange text-white hover:bg-brand-orange">
                Promo
              </Badge>
            )}
            {product.bio && (
              <Badge variant="outline" className="rounded-full border-primary/40 bg-secondary/95">
                Bio
              </Badge>
            )}
            {product.availability === "low_stock" && (
              <Badge variant="destructive" className="rounded-full opacity-95">
                Stock bas
              </Badge>
            )}
          </div>
          <ProductFavoriteButton productId={product.id} className="absolute right-3 top-3 z-20" />
        </div>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[0.74rem] text-muted-foreground">
              <Star className="size-3.5 fill-brand-orange text-brand-orange" aria-hidden />
              <span>{product.rating.toFixed(1)}</span>
              <span>·</span>
              <span>{product.origin}</span>
            </div>
            <Link href={`/shop/${product.slug}`} className="block font-semibold leading-snug text-foreground">
              {product.name}
            </Link>
            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
          </div>
          <div className="mt-auto flex items-end justify-between gap-3 pt-2">
            <div>
              <p className="text-lg font-bold text-foreground">
                {formatCurrency(unitRetailPrice(product))}
                <span className="text-xs font-semibold text-muted-foreground">
                  {" "}
                  / {retailUnitShort(product)}
                </span>
              </p>
              {product.oldPrice != null && (
                <p className="text-xs text-muted-foreground line-through">
                  {formatCurrency(oldPricePerKg(product)!)} / {retailUnitShort(product)}
                </p>
              )}
              <p className="mt-1 text-[0.74rem] text-muted-foreground">
                {isPieceProduct(product) ? (
                  <>À la pièce · prix catalogue</>
                ) : (
                  <>
                    Lot réf. {formatKgFr(referenceWeightKg(product))} kg · {formatCurrency(product.price)}
                  </>
                )}
              </p>
            </div>
            <Button
              size="icon-sm"
              className="rounded-2xl bg-primary hover:bg-brand-dark hover:text-white"
              disabled={product.availability === "out_of_stock"}
              onClick={() =>
                addKg(product.id, isPieceProduct(product) ? 1 : referenceWeightKg(product))
              }
              aria-label={
                isPieceProduct(product)
                  ? "Ajouter 1 pièce au panier"
                  : `Ajouter ${formatKgFr(referenceWeightKg(product))} kg au panier`
              }
            >
              <ShoppingBag className="size-4" aria-hidden />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
