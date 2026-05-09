"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import type { Product } from "@/types";
import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/format";
import { formatKgFr } from "@/lib/product-pricing";
import { productImageNeedsUnoptimized } from "@/lib/product-image";
import { previewUnitRetailFcfa } from "@/lib/admin-product-preview";

export function AdminProductEditor({ product }: { product: Product }) {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [origin, setOrigin] = useState(product.origin);
  const [saleUnit, setSaleUnit] = useState<"kg" | "piece">(product.saleUnit);
  const [weightGrams, setWeightGrams] = useState(String(product.weightGrams));
  const [price, setPrice] = useState(String(product.price));
  const [oldPrice, setOldPrice] = useState(product.oldPrice != null ? String(product.oldPrice) : "");
  const [stock, setStock] = useState(String(product.stock));
  const [image, setImage] = useState(product.image);
  const [promo, setPromo] = useState(product.promo);
  const [bio, setBio] = useState(product.bio);
  const [featured, setFeatured] = useState(product.featured);
  const [etiquette, setEtiquette] = useState(product.slug.replace(/-/g, ".").toUpperCase());

  const previewOk = image.startsWith("/") || image.startsWith("http");

  const parsedWeight = Number.parseInt(weightGrams.replace(/\D/g, ""), 10);
  const parsedPrice = Number.parseFloat(price.replace(",", "."));
  const previewRetail = useMemo(() => {
    const wg = Number.isFinite(parsedWeight) && parsedWeight > 0 ? parsedWeight : 1000;
    const pr = Number.isFinite(parsedPrice) ? parsedPrice : 0;
    return previewUnitRetailFcfa({ saleUnit, weightGrams: wg, price: pr });
  }, [saleUnit, parsedWeight, parsedPrice]);

  const refKg =
    saleUnit === "piece" ? 1 : Number.isFinite(parsedWeight) && parsedWeight > 0 ? parsedWeight / 1000 : 1;

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
      <div>
        <h1 className="text-3xl font-bold">Modifier {product.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Aligné sur le catalogue vitrine : prix au <strong className="text-foreground">kg</strong> ou à la{" "}
          <strong className="text-foreground">pièce</strong>, lot de référence pour le calcul (mock démo — pas de persistance
          serveur).
        </p>
      </div>
      <div className="space-y-5 rounded-[2rem] border border-border bg-card p-8">
        <div className="space-y-2">
          <Label htmlFor="n">Nom</Label>
          <Input id="n" className="rounded-2xl" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug-ro">Slug URL (lecture seule)</Label>
          <Input id="slug-ro" readOnly className="rounded-2xl bg-muted font-mono text-sm" value={product.slug} />
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
        <div className="space-y-2">
          <Label htmlFor="origin">Origine</Label>
          <Input id="origin" className="rounded-2xl" value={origin} onChange={(e) => setOrigin(e.target.value)} />
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="unit">Unité de vente</Label>
          <select
            id="unit"
            className="flex h-11 w-full rounded-2xl border border-input bg-background px-3 text-sm shadow-xs outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            value={saleUnit}
            onChange={(e) => setSaleUnit(e.target.value as "kg" | "piece")}
          >
            <option value="kg">Au kilogramme (FCFA / kg affiché)</option>
            <option value="piece">À la pièce (FCFA / pièce)</option>
          </select>
          <p className="text-xs text-muted-foreground">
            {saleUnit === "kg"
              ? "Le prix catalogue ci-dessous correspond au montant du lot de référence (voir poids). Le client voit le prix au kg."
              : "Le prix catalogue est le prix pour une pièce (tête, botte, etc.)."}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="wg">Poids du lot de référence (g)</Label>
            <Input
              id="wg"
              type="number"
              min={1}
              step={1}
              className="rounded-2xl"
              value={weightGrams}
              onChange={(e) => setWeightGrams(e.target.value)}
              disabled={saleUnit === "piece"}
            />
            {saleUnit === "kg" ? (
              <p className="text-xs text-muted-foreground">
                Ex. 1000 pour un lot d&apos;1&nbsp;kg — prix affiché = prix lot ÷ {formatKgFr(refKg)}&nbsp;kg.
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">Pour la pièce, ce champ est ignoré pour le prix unitaire.</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Prix catalogue (FCFA)</Label>
            <Input
              id="price"
              type="number"
              min={0}
              className="rounded-2xl"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-primary/20 bg-brand-light/30 px-4 py-3 text-sm dark:bg-primary/10">
          <p className="font-medium text-foreground">Prix affiché côté client</p>
          <p className="mt-1 text-lg font-bold text-primary">
            {formatCurrency(previewRetail)}{" "}
            <span className="text-base font-semibold text-muted-foreground">
              / {saleUnit === "piece" ? "pièce" : "kg"}
            </span>
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="oldp">Ancien prix (FCFA, promo)</Label>
          <Input
            id="oldp"
            type="number"
            min={0}
            className="rounded-2xl"
            value={oldPrice}
            onChange={(e) => setOldPrice(e.target.value)}
            placeholder="Laisser vide si pas de barré"
          />
          <p className="text-xs text-muted-foreground">
            Sur la vitrine, l&apos;ancien prix suit la même unité (kg ou pièce) que le prix catalogue.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock">Stock (unités internes)</Label>
          <Input
            id="stock"
            type="number"
            min={0}
            className="rounded-2xl"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        <Separator />

        <div className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-muted/20 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <Label htmlFor="feat">À la une</Label>
              <p className="text-xs text-muted-foreground">Mis en avant sur l&apos;accueil</p>
            </div>
            <Switch id="feat" checked={featured} onCheckedChange={setFeatured} />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <Label htmlFor="promo">Promotion</Label>
              <p className="text-xs text-muted-foreground">Badge promo catalogue</p>
            </div>
            <Switch id="promo" checked={promo} onCheckedChange={setPromo} />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <Label htmlFor="bio">Bio</Label>
              <p className="text-xs text-muted-foreground">Étiquette bio</p>
            </div>
            <Switch id="bio" checked={bio} onCheckedChange={setBio} />
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
        <div className="rounded-xl border border-dashed border-border bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
          Rayon catalogue unique — pas de catégories séparées (identifiant interne{" "}
          <span className="font-mono text-foreground">{product.categoryId}</span>).
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
                <Image
                  src={image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 320px"
                  unoptimized={productImageNeedsUnoptimized(image)}
                />
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
