import Image from "next/image";
import Link from "next/link";
import { MOCK_PROMOTIONS } from "@/mock/promotions";
import { filterProducts } from "@/services/product-service";
import { ProductCard } from "@/components/shared/product-card";
import { Button } from "@/components/ui/button";

export default function PromotionsPage() {
  const deals = filterProducts({ onlyPromo: true });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 lg:px-10">
      <div className="grid gap-8 lg:grid-cols-2">
        {MOCK_PROMOTIONS.map((p) => (
          <div key={p.id} className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-xl">
            <div className="relative h-56">
              <Image
                src={p.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm uppercase tracking-[0.3em] text-white/80">Campagne</p>
                <h2 className="text-3xl font-bold">{p.title}</h2>
                <p className="mt-2 max-w-md text-sm text-white/90">{p.description}</p>
                <p className="mt-4 font-mono text-lg">
                  Code <span className="rounded-lg bg-white/10 px-2 py-1">{p.code}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-16">
        <h3 className="text-2xl font-bold">Produits en promo</h3>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {deals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
      <div className="mt-16 text-center">
        <Button asChild className="rounded-2xl bg-primary hover:bg-brand-dark hover:text-white">
          <Link href="/shop">Continuer mes courses</Link>
        </Button>
      </div>
    </div>
  );
}
