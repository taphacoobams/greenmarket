import Link from "next/link";
import { notFound } from "next/navigation";
import { MOCK_CATEGORIES } from "@/mock/categories";
import { filterProducts } from "@/services/product-service";
import { ProductCard } from "@/components/shared/product-card";

type Props = { params: Promise<{ slug: string }> };

export default async function CategoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const cat = MOCK_CATEGORIES.find((c) => c.slug === slug);
  if (!cat) notFound();
  const products = filterProducts({ categorySlug: slug });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 lg:px-10">
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Rayon</p>
        <h1 className="text-4xl font-bold">{cat.name}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{cat.description}</p>
        <Link href="/categories" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
          ← Toutes les catégories
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
