"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Leaf, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/auth-store";
import { useProfileTasteStore } from "@/store/profile-taste-store";
import { MOCK_PRODUCTS } from "@/mock/products";
import { getPersonalizedSuggestions } from "@/services/product-service";
import { ProductCard } from "@/components/shared/product-card";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const preferredProductIds = useProfileTasteStore((s) => s.preferredProductIds);
  const preferBio = useProfileTasteStore((s) => s.preferBio);
  const toggleProduct = useProfileTasteStore((s) => s.toggleProduct);
  const setPreferBio = useProfileTasteStore((s) => s.setPreferBio);
  const clearPreferences = useProfileTasteStore((s) => s.clearPreferences);

  const suggestions = useMemo(
    () =>
      getPersonalizedSuggestions(
        { preferredProductIds, preferBio },
        8,
      ),
    [preferredProductIds, preferBio],
  );

  const hasTastePrefs = preferredProductIds.length > 0 || preferBio;

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center text-muted-foreground">
        <p>Connectez-vous pour accéder à votre espace client.</p>
        <Link className="mt-6 inline-block rounded-2xl bg-primary px-6 py-3 text-white" href="/login">
          Connexion
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16 lg:px-8">
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
        <aside className="flex flex-col items-center gap-3 text-center lg:w-56 lg:shrink-0 lg:items-start lg:text-left">
          <Avatar className="size-28 ring-2 ring-primary/20">
            <AvatarImage src={user.avatarUrl} alt="" />
            <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <p className="mt-1 text-sm tabular-nums text-muted-foreground">
              {user.phone ? (
                <a href={`tel:${user.phone.replace(/\s/g, "")}`} className="text-foreground underline-offset-4 hover:underline">
                  {user.phone}
                </a>
              ) : (
                <span className="italic">Téléphone non renseigné</span>
              )}
            </p>
            <p className="text-xs capitalize text-muted-foreground">{user.role}</p>
          </div>
        </aside>

        <div className="min-w-0 flex-1 space-y-10">
          <section>
            <Separator className="mb-8 lg:hidden" />
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Livraison</h2>
            <p className="mt-3 text-muted-foreground">
              {user.address ?? "Aucune adresse enregistrée"}
              <br />
              {user.city}
            </p>
          </section>

          <section className="rounded-[1.75rem] border border-border/80 bg-card p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-5 text-primary" aria-hidden />
                  <h2 className="text-lg font-bold tracking-tight">Mes goûts & recommandations</h2>
                </div>
                <p className="max-w-xl text-sm text-muted-foreground">
                  Cochez les légumes que vous cuisinez souvent : nous les mettons en avant dans vos suggestions
                  ci-dessous (mock démo, sauvegardé sur cet appareil).
                </p>
              </div>
              <Button type="button" variant="outline" size="sm" className="rounded-xl shrink-0" onClick={() => clearPreferences()}>
                Réinitialiser
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {MOCK_PRODUCTS.map((prod) => {
                const on = preferredProductIds.includes(prod.id);
                return (
                  <button
                    key={prod.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggleProduct(prod.id)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-left text-sm font-medium transition",
                      on
                        ? "border-primary bg-primary/12 text-foreground shadow-inner"
                        : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:bg-accent",
                    )}
                  >
                    {prod.name}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-border/70 bg-muted/30 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <Leaf className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <Label htmlFor="prefer-bio" className="text-base font-semibold leading-none">
                    Prioriser le bio
                  </Label>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    Les suggestions ne montrent alors que des produits étiquetés bio (si disponibles).
                  </p>
                </div>
              </div>
              <Switch id="prefer-bio" checked={preferBio} onCheckedChange={setPreferBio} className="shrink-0" />
            </div>
          </section>

          <section>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Suggestions pour vous</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {hasTastePrefs
                    ? "Basé sur vos produits choisis, l’option bio et les tops du catalogue mock."
                    : "Choisissez au moins un produit ou activez le bio pour affiner ; sinon voici une sélection populaire."}
                </p>
              </div>
              <Button asChild variant="outline" className="rounded-2xl">
                <Link href="/shop">Tout le catalogue</Link>
              </Button>
            </div>

            {suggestions.length === 0 ? (
              <p className="mt-8 rounded-2xl border border-dashed border-border px-6 py-12 text-center text-sm text-muted-foreground">
                Aucun produit ne correspond à ces critères pour l’instant. Désactivez « Prioriser le bio » ou sélectionnez d’autres
                références.
              </p>
            ) : (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {suggestions.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}

            {hasTastePrefs ? (
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="text-xs font-medium text-muted-foreground">Actif :</span>
                {preferredProductIds.map((id) => {
                  const prod = MOCK_PRODUCTS.find((x) => x.id === id);
                  return prod ? (
                    <Badge key={id} variant="secondary" className="rounded-full">
                      {prod.name}
                    </Badge>
                  ) : null;
                })}
                {preferBio ? (
                  <Badge variant="outline" className="rounded-full border-primary/40">
                    Bio prioritaire
                  </Badge>
                ) : null}
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </div>
  );
}
