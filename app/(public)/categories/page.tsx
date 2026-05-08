"use client";

import Link from "next/link";
import Image from "next/image";
import { MOCK_CATEGORIES } from "@/mock/categories";

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 lg:px-10">
      <h1 className="text-4xl font-bold">Catégories</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Parcourez nos rayons : fruits, légumes, circuits courts et meilleures saisonnalités du moment.
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {MOCK_CATEGORIES.map((c) => (
          <Link key={c.id} href={`/categories/${c.slug}`} className="group block overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm">
            <div className="relative aspect-[5/4]">
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-lg font-semibold">{c.name}</p>
                <p className="text-sm text-white/80">{c.productCount} références</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
