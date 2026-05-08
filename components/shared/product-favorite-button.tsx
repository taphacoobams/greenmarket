"use client";

import { usePathname, useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useFavoriteStore } from "@/store/favorites-store";
import { loginHref } from "@/features/checkout/checkout-auth-gate";
import { cn } from "@/lib/utils";

export function ProductFavoriteButton({
  productId,
  className,
  variant = "card",
}: {
  productId: string;
  /** Positionnement absolu conseillé sur l’image (ex. `absolute right-3 top-3 z-20`). */
  className?: string;
  /** `hero` : bouton plus visible sur la grande photo fiche produit. */
  variant?: "card" | "hero";
}) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const toggleFav = useFavoriteStore((s) => s.toggle);
  const isFav = useFavoriteStore((s) => (user ? s.has(productId) : false));

  return (
    <button
      type="button"
      aria-label={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-background/70 bg-background/90 text-foreground shadow-sm backdrop-blur transition hover:bg-background",
        variant === "hero" ? "size-12 shadow-md" : "size-10",
        isFav ? "text-rose-500" : "text-muted-foreground",
        className,
      )}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!user) {
          router.push(loginHref(pathname || "/shop"));
          return;
        }
        toggleFav(productId);
      }}
    >
      <Heart
        className={variant === "hero" ? "size-5" : "size-[18px]"}
        fill={isFav ? "currentColor" : "none"}
        aria-hidden
      />
    </button>
  );
}
