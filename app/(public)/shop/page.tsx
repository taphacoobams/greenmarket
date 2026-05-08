import { Suspense } from "react";
import { ShopView, ShopViewFallback } from "@/features/shop/shop-view";

export const metadata = {
  title: "Catalogue",
  description: "Catalogue fruits et légumes — service sur Dakar uniquement. Commande avant minuit, livraison dès le lendemain matin.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopViewFallback />}>
      <ShopView />
    </Suspense>
  );
}
