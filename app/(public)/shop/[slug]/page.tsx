import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Truck, Leaf, MapPin } from "lucide-react";
import { getProductBySlug } from "@/services/product-service";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { MOCK_CATEGORIES } from "@/mock/categories";
import { ProductPurchasePanel } from "@/features/shop/product-purchase-panel";
import { ProductFavoriteButton } from "@/components/shared/product-favorite-button";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return { title: "Produit introuvable" };
  return { title: p.name, description: p.description };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = MOCK_CATEGORIES.find((c) => c.id === product.categoryId);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12 md:px-8 lg:px-10">
      <nav
        className="mb-6 flex gap-2 overflow-x-auto pb-2 text-sm text-muted-foreground [-webkit-overflow-scrolling:touch] sm:mb-8 sm:flex-wrap sm:overflow-visible sm:pb-0"
        aria-label="Fil d'Ariane"
      >
        <Link href="/shop" className="shrink-0 hover:text-foreground">
          Catalogue
        </Link>
        <span className="shrink-0 opacity-70">/</span>
        {category && (
          <>
            <Link href={`/categories/${category.slug}`} className="shrink-0 hover:text-foreground">
              {category.name}
            </Link>
            <span className="shrink-0 opacity-70">/</span>
          </>
        )}
        <span className="min-w-0 break-words font-medium text-foreground">{product.name}</span>
      </nav>
      <div className="grid gap-8 min-[420px]:gap-10 lg:grid-cols-[1.1fr_minmax(0,1fr)]">
        <div className="relative aspect-square max-h-[85vh] w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-[0_40px_120px_-50px_rgb(15_23_42_/_0.45)] min-[520px]:rounded-[2rem] lg:rounded-[2.5rem]">
          <Image src={product.image} alt={product.name} fill priority className="object-cover" sizes="(min-width:1024px) 520px, 100vw" />
          <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-2 sm:left-6 sm:top-6">
            {product.promo && (
              <Badge className="rounded-full bg-brand-orange text-white hover:bg-brand-orange">Promo</Badge>
            )}
            {product.bio && (
              <Badge variant="outline" className="rounded-full border-primary/40 bg-background/95">
                Bio
              </Badge>
            )}
          </div>
          <ProductFavoriteButton
            productId={product.id}
            variant="hero"
            className="absolute right-3 top-3 z-20 sm:right-6 sm:top-6"
          />
        </div>
        <div className="min-w-0 space-y-6 sm:space-y-8">
          <div className="space-y-3">
            <div className="flex min-w-0 flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Star className="size-4 fill-brand-orange text-brand-orange" />
              <span className="font-semibold">{product.rating.toFixed(1)}</span>
              <Separator orientation="vertical" className="h-5" />
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4" /> {product.origin}
              </span>
            </div>
            <h1 className="break-words text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{product.name}</h1>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary" className="h-fit rounded-full px-3 py-2 text-[0.8rem] capitalize">
              {product.availability.replace("_", " ")}
            </Badge>
          </div>
          <Card className="flex flex-col gap-6 rounded-[1.75rem] border-border/80 p-6">
            <ProductPurchasePanel product={product} />
            <div className="flex flex-wrap items-center gap-4 border-t border-border/70 pt-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <Leaf className="size-4 text-primary" />
                {(product.weightGrams / 1000).toLocaleString("fr-FR", { maximumFractionDigits: 2 })} kg (réf.)
              </span>
              <span className="inline-flex items-center gap-2">
                <Truck className="size-4 text-primary" />
                Livraison le lendemain matin après commande avant 00&nbsp;h — Dakar.
              </span>
            </div>
          </Card>
          <div>
            <h2 className="mb-3 text-lg font-semibold">Avis clients</h2>
            <div className="space-y-3">
              {product.reviews.map((r) => (
                <Card key={r.id} className="rounded-2xl border-border/80 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold">{r.author}</span>
                    <span className="text-muted-foreground">{r.rating}★</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{r.comment}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
