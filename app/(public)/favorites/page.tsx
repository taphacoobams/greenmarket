"use client";

import { MOCK_PRODUCTS } from "@/mock/products";
import { useFavoriteStore } from "@/store/favorites-store";
import { ProductCard } from "@/components/shared/product-card";
import { CheckoutAuthGate } from "@/features/checkout/checkout-auth-gate";

function FavoritesContent() {
  const ids = useFavoriteStore((s) => s.ids);
  const items = MOCK_PRODUCTS.filter((p) => ids.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-10">
      <h1 className="text-4xl font-bold">Favoris</h1>
      <p className="mt-2 text-muted-foreground">
        Vos produits enregistrés — visible uniquement lorsque vous êtes connecté.
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

export default function FavoritesPage() {
  return (
    <CheckoutAuthGate fallbackPath="/favorites">
      <FavoritesContent />
    </CheckoutAuthGate>
  );
}
