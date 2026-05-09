"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { MOCK_PRODUCTS } from "@/mock/products";
import { formatCurrency } from "@/lib/format";
import { previewUnitRetailFcfa } from "@/lib/admin-product-preview";
import { productImageNeedsUnoptimized } from "@/lib/product-image";

const schema = z.object({
  name: z.string().min(2, "Nom trop court"),
  description: z.string().optional(),
  origin: z.string().min(1, "Origine requise"),
  saleUnit: z.enum(["kg", "piece"]),
  weightGrams: z.number().int().min(1, "≥ 1 g"),
  price: z.number().positive("Prix invalide"),
  oldPrice: z.number().positive().optional(),
  stock: z.number().int().min(0, "Stock ≥ 0"),
  image: z.string().min(1, "Image requise"),
  promo: z.boolean(),
  bio: z.boolean(),
  featured: z.boolean(),
  etiquette: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function AdminNewProductPage() {
  const router = useRouter();
  const seed = MOCK_PRODUCTS[0];

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      origin: "Dakar",
      saleUnit: "kg",
      weightGrams: 1000,
      price: 1000,
      oldPrice: undefined,
      stock: 50,
      image: seed?.image ?? "/products/tomates-grappe.png",
      promo: false,
      bio: false,
      featured: false,
      etiquette: "",
    },
  });

  const imageVal = form.watch("image");
  const saleUnit = form.watch("saleUnit");
  const weightGrams = form.watch("weightGrams");
  const price = form.watch("price");

  const previewRetail = useMemo(
    () => previewUnitRetailFcfa({ saleUnit, weightGrams: weightGrams ?? 1000, price: price ?? 0 }),
    [saleUnit, weightGrams, price],
  );

  const previewOk = typeof imageVal === "string" && (imageVal.startsWith("/") || imageVal.startsWith("http"));

  function onSubmit(v: FormValues) {
    toast.success(`Produit « ${v.name} » enregistré (démo — ${v.saleUnit === "kg" ? "kg" : "pièce"})`);
    router.push("/admin/products");
  }

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
        <h1 className="text-3xl font-bold">Nouveau produit</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Même logique que le catalogue public : <strong className="text-foreground">kg</strong> (lot de référence en grammes) ou{" "}
          <strong className="text-foreground">pièce</strong>. Catalogue sans rayons multiples — démo uniquement.
        </p>
      </div>
      <form className="space-y-5 rounded-[2rem] border border-border bg-card p-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label htmlFor="name">Nom</Label>
          <Input id="name" className="rounded-2xl" {...form.register("name")} />
          {form.formState.errors.name && (
            <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" rows={4} className="rounded-[1rem]" {...form.register("description")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="origin">Origine</Label>
          <Input id="origin" className="rounded-2xl" {...form.register("origin")} />
          {form.formState.errors.origin && (
            <p className="text-sm text-destructive">{form.formState.errors.origin.message}</p>
          )}
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="saleUnit">Unité de vente</Label>
          <select
            id="saleUnit"
            className="flex h-11 w-full rounded-2xl border border-input bg-background px-3 text-sm shadow-xs outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            {...form.register("saleUnit")}
          >
            <option value="kg">Au kilogramme</option>
            <option value="piece">À la pièce</option>
          </select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="weightGrams">Poids lot réf. (g)</Label>
            <Input
              id="weightGrams"
              type="number"
              className="rounded-2xl"
              disabled={saleUnit === "piece"}
              {...form.register("weightGrams", { valueAsNumber: true })}
            />
            {form.formState.errors.weightGrams && (
              <p className="text-sm text-destructive">{form.formState.errors.weightGrams.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Prix catalogue (FCFA)</Label>
            <Input id="price" type="number" className="rounded-2xl" {...form.register("price", { valueAsNumber: true })} />
            {form.formState.errors.price && (
              <p className="text-sm text-destructive">{form.formState.errors.price.message}</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-primary/20 bg-brand-light/30 px-4 py-3 text-sm dark:bg-primary/10">
          <p className="font-medium text-foreground">Prix affiché vitrine (aperçu)</p>
          <p className="mt-1 text-lg font-bold text-primary">
            {formatCurrency(previewRetail)} <span className="text-base font-semibold text-muted-foreground">/ {saleUnit === "piece" ? "pièce" : "kg"}</span>
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="oldPrice">Ancien prix (FCFA, optionnel)</Label>
          <Input
            id="oldPrice"
            type="number"
            className="rounded-2xl"
            {...form.register("oldPrice", {
              setValueAs: (v) => {
                if (v === "" || v == null) return undefined;
                const n = Number(v);
                return Number.isFinite(n) ? n : undefined;
              },
            })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock">Stock</Label>
          <Input id="stock" type="number" className="rounded-2xl" {...form.register("stock", { valueAsNumber: true })} />
          {form.formState.errors.stock && (
            <p className="text-sm text-destructive">{form.formState.errors.stock.message}</p>
          )}
        </div>

        <Separator />

        <div className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-muted/20 p-4">
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="featured">À la une</Label>
            <Controller
              control={form.control}
              name="featured"
              render={({ field }) => <Switch id="featured" checked={field.value} onCheckedChange={field.onChange} />}
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="promo">Promotion</Label>
            <Controller
              control={form.control}
              name="promo"
              render={({ field }) => <Switch id="promo" checked={field.value} onCheckedChange={field.onChange} />}
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="bio">Bio</Label>
            <Controller
              control={form.control}
              name="bio"
              render={({ field }) => <Switch id="bio" checked={field.value} onCheckedChange={field.onChange} />}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="etiquette">Réf. étiquette (SKU)</Label>
          <Input id="etiquette" className="rounded-2xl font-mono text-sm" {...form.register("etiquette")} placeholder="Ex. LEG.CRT.001" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">URL ou chemin image</Label>
          <Input id="image" className="rounded-2xl" {...form.register("image")} />
          {form.formState.errors.image && (
            <p className="text-sm text-destructive">{form.formState.errors.image.message}</p>
          )}
          {previewOk ? (
            <div className="relative mt-3 aspect-video max-h-48 w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-muted">
              {imageVal.startsWith("/") ? (
                <Image
                  src={imageVal}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 320px"
                  unoptimized={productImageNeedsUnoptimized(imageVal)}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageVal} alt="" className="absolute inset-0 h-full w-full object-cover" />
              )}
            </div>
          ) : null}
        </div>

        <Button type="submit" className="w-full rounded-2xl bg-primary hover:bg-brand-dark hover:text-white">
          Enregistrer
        </Button>
      </form>
    </div>
  );
}
