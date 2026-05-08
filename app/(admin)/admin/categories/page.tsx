import Image from "next/image";
import Link from "next/link";
import { MOCK_CATEGORIES } from "@/mock/categories";
import { MOCK_PRODUCTS } from "@/mock/products";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AdminCategoriesPage() {
  const rows = MOCK_CATEGORIES.map((c) => ({
    ...c,
    count: MOCK_PRODUCTS.filter((p) => p.categoryId === c.id).length,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Catégories</h1>
        <p className="text-muted-foreground">Rayons du catalogue et nombre de références par rayon.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {rows.map((c) => (
          <Card key={c.id} className="overflow-hidden rounded-[1.5rem] border border-border shadow-sm">
            <div className="relative aspect-[16/10] bg-muted">
              <Image src={c.image} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
            <div className="space-y-2 p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h2 className="text-lg font-semibold leading-tight">{c.name}</h2>
                <Badge variant="secondary" className="shrink-0 rounded-full">
                  {c.count} prod.
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3">{c.description}</p>
              <Link href={`/categories/${c.slug}`} className="inline-block text-sm font-medium text-primary underline-offset-4 hover:underline">
                Voir sur la vitrine
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
