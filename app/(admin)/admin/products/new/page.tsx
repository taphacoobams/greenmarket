"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MOCK_PRODUCTS } from "@/mock/products";

const schema = z.object({
  name: z.string().min(2, "Nom trop court"),
  description: z.string().optional(),
  price: z.number().positive("Prix invalide"),
  stock: z.number().int().min(0, "Stock ≥ 0"),
  image: z.string().min(1, "Image requise"),
  etiquette: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function AdminNewProductPage() {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      price: 1500,
      stock: 50,
      image: MOCK_PRODUCTS[0]?.image ?? "/products/tomates-grappe.png",
      etiquette: "",
    },
  });

  const imageVal = form.watch("image");
  const previewOk = typeof imageVal === "string" && (imageVal.startsWith("/") || imageVal.startsWith("http"));

  function onSubmit(v: FormValues) {
    toast.success(`Produit « ${v.name} » enregistré (démo)`);
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
      <h1 className="text-3xl font-bold">Nouveau produit</h1>
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
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="price">Prix FCFA</Label>
            <Input id="price" type="number" className="rounded-2xl" {...form.register("price", { valueAsNumber: true })} />
            {form.formState.errors.price && (
              <p className="text-sm text-destructive">{form.formState.errors.price.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="stock">Stock (unités)</Label>
            <Input id="stock" type="number" className="rounded-2xl" {...form.register("stock", { valueAsNumber: true })} />
            {form.formState.errors.stock && (
              <p className="text-sm text-destructive">{form.formState.errors.stock.message}</p>
            )}
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
                <Image src={imageVal} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 320px" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element -- prévisualisation URL absolue hors optimisation Next
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
