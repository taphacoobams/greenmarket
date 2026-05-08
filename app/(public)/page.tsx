import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { MOCK_CATEGORIES } from "@/mock/categories";
import { getFeaturedProducts, filterProducts } from "@/services/product-service";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shared/product-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function HomePage() {
  const featured = getFeaturedProducts(10);
  const promos = filterProducts({ onlyPromo: true }).slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-br from-brand-light via-background to-background pb-10 pt-[max(3rem,calc(2.5rem+env(safe-area-inset-top,0px)))] dark:from-primary/25 dark:to-background sm:pb-14 lg:pb-24 lg:pt-16">
        <div className="pointer-events-none absolute -right-28 top-0 size-[420px] rounded-full bg-primary/25 blur-[90px]" />
        <div className="pointer-events-none absolute bottom-[-30%] left-[-20%] size-[380px] rounded-full bg-brand-orange/25 blur-[100px]" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 min-[400px]:gap-14 md:flex-row md:items-center md:gap-16 lg:gap-24 md:px-8 lg:px-10">
          <div className="max-w-xl min-w-0 space-y-6 sm:space-y-8">
            <Badge className="w-fit rounded-full bg-gradient-to-r from-primary to-brand-orange px-3 py-1 text-xs font-semibold text-white hover:opacity-95">
              <Sparkles className="size-3" /> Dakar uniquement · commande avant minuit, livré demain matin
            </Badge>
            <div className="space-y-4">
              <h1 className="text-[1.65rem] font-bold leading-[1.12] tracking-tight text-foreground min-[400px]:text-3xl sm:text-5xl sm:leading-[1.05] lg:text-6xl xl:text-[3.5rem] xl:leading-[1.05]">
                Le marché des légumes,{" "}
                <span className="bg-gradient-to-r from-primary to-brand-dark bg-clip-text text-transparent dark:from-primary dark:to-primary">
                  friction zéro
                </span>
                .
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Produits saisonniers, circuits courts avec nos producteurs partenaires, paiement Wave et Orange Money, et livraison
                rapide jusqu&apos;à votre porte.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="h-12 rounded-2xl bg-primary hover:bg-brand-dark hover:text-white">
                <Link href="/shop">
                  Composer mon panier
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 rounded-2xl border-border">
                <Link href="/promotions">Voir les promotions</Link>
              </Button>
            </div>
            <dl className="grid grid-cols-3 gap-4 border-t border-dashed border-border/80 pt-6 text-[0.8rem] sm:text-[0.9rem]">
              <div className="space-y-1">
                <dt className="uppercase tracking-wide text-muted-foreground">SKU actifs</dt>
                <dd className="text-2xl font-bold tabular-nums text-foreground sm:text-3xl">24</dd>
              </div>
              <div className="space-y-1">
                <dt className="uppercase tracking-wide text-muted-foreground">Livraison</dt>
                <dd className="text-xl font-bold leading-tight tracking-tight text-foreground sm:text-2xl">Lendemain matin*</dd>
                <dd className="text-[0.65rem] font-normal uppercase tracking-wide text-muted-foreground sm:text-xs">
                  *Après coupe à minuit
                </dd>
              </div>
              <div className="space-y-1">
                <dt className="uppercase tracking-wide text-muted-foreground">Satisfaction</dt>
                <dd className="text-2xl font-bold tabular-nums text-foreground sm:text-3xl">4,8★</dd>
              </div>
            </dl>
          </div>
          <div className="relative mt-4 w-full max-w-xl md:mt-0">
            <div className="absolute right-6 top-6 z-10 rounded-full bg-card/90 px-4 py-2 text-xs font-semibold shadow-lg backdrop-blur">
              Panier moyen · 12 400 FCFA
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-border/80 bg-card shadow-[0_40px_120px_-40px_rgb(22_163_74_/_0.45)]">
              <Image
                src="/marketing/home-hero.png"
                alt="Légumes frais"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-4 py-16 md:px-8 lg:px-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Rayons</p>
            <h2 className="text-3xl font-bold tracking-tight">Catégories signature</h2>
          </div>
          <Button asChild variant="ghost" className="rounded-2xl text-primary">
            <Link href="/categories">Tout afficher</Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MOCK_CATEGORIES.slice(0, 4).map((c) => (
            <Link key={c.id} href={`/categories/${c.slug}`} className="group">
              <Card className="overflow-hidden rounded-[1.75rem] border-border/80 bg-card shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-xl">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-lg font-semibold">{c.name}</p>
                    <p className="text-sm text-white/80">{c.productCount} références</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border/70 bg-muted/30 py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 md:px-8 lg:flex-row lg:px-10">
          <div className="flex-1 space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">Sélection</p>
            <h3 className="text-3xl font-bold tracking-tight">Promotions · quantités limitées</h3>
            <p className="max-w-xl text-muted-foreground">
              Prix cassés sur une sélection de fruits et légumes — jusqu&apos;à épuisement du stock affiché.
            </p>
          </div>
          <div className="grid flex-[1.2] gap-6 sm:grid-cols-2">
            {promos.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 lg:px-10">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">À la une</p>
            <h3 className="text-3xl font-bold tracking-tight">Produits du moment</h3>
          </div>
          <Button asChild className="w-fit rounded-2xl bg-primary hover:bg-brand-dark hover:text-white">
            <Link href="/shop">
              catalogue complet <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
