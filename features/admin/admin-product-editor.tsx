"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Product } from "@/types";
import { useState } from "react";

export function AdminProductEditor({ product }: { product: Product }) {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(String(product.price));
  const [stock, setStock] = useState(String(product.stock));
  const [image, setImage] = useState(product.image);
  const [etiquette, setEtiquette] = useState(product.slug.replace(/-/g, ".").toUpperCase());

  const previewOk = image.startsWith("/") || image.startsWith("http");

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        <Button asChild variant="outline" size="sm" className="rounded-2xl gap-2">
          <Link href="/admin/products">
            <ArrowLeft className="size-4" aria-hidden />
            Retour aux produits
          </Link>
        </Button>
      </div>
      <h1 className="text-3xl font-bold">Modifier {product.name}</h1>
      <div className="space-y-5 rounded-[2rem] border border-border bg-card p-8">
        <div className="space-y-2">
          <Label htmlFor="n">Nom</Label>
          <Input id="n" className="rounded-2xl" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="desc">Description</Label>
          <Textarea
            id="desc"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="rounded-[1rem]"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="price">Prix (FCFA)</Label>
            <Input
              id="price"
              type="number"
              min={0}
              className="rounded-2xl"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stock">Stock (unités)</Label>
            <Input
              id="stock"
              type="number"
              min={0}
              className="rounded-2xl"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="etiq">Réf. étiquette (SKU)</Label>
          <Input
            id="etiq"
            className="rounded-2xl font-mono text-sm"
            value={etiquette}
            onChange={(e) => setEtiquette(e.target.value)}
            placeholder="Ex. TMT.CER.250"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="img">URL ou chemin image</Label>
          <Input
            id="img"
            className="rounded-2xl"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="/products/mon-produit.png"
          />
          {previewOk ? (
            <div className="relative mt-3 aspect-video max-h-48 w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-muted">
              {image.startsWith("/") ? (
                <Image src={image} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 320px" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element -- prévisualisation URL absolue hors optimisation Next
                <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
              )}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">Prévisualisation : chemin local (/…) ou URL complète.</p>
          )}
        </div>
        <Button
          className="w-full rounded-2xl bg-primary hover:bg-brand-dark hover:text-white"
          type="button"
          onClick={() => toast.success("Modifications enregistrées (démo locale)")}
        >
          Mettre à jour
        </Button>
      </div>
    </div>
  );
}
