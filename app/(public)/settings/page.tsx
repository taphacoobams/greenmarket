"use client";

import Link from "next/link";
import { Bell, Monitor, Moon, Palette, Shield, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { useMounted } from "@/hooks/use-mounted";

export default function SettingsPage() {
  const user = useAuthStore((s) => s.user);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useMounted();
  const effective = theme === "system" ? resolvedTheme : theme;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
      <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Préférences du compte, alertes et affichage — tout est local à cette démo.
      </p>

      <Tabs defaultValue="notifications" className="mt-10 w-full">
        <div className="-mx-1 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
          <TabsList
            variant="line"
            className="mb-8 inline-flex h-auto min-h-10 w-max max-w-none flex-nowrap gap-1 rounded-none bg-transparent p-0 px-1"
          >
            <TabsTrigger value="notifications" className="shrink-0 gap-1.5 rounded-xl px-3 py-2 data-active:after:opacity-100">
              <Bell className="size-4" aria-hidden />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="compte" className="shrink-0 gap-1.5 rounded-xl px-3 py-2">
              <User className="size-4" aria-hidden />
              Compte
            </TabsTrigger>
            <TabsTrigger value="securite" className="shrink-0 gap-1.5 rounded-xl px-3 py-2">
              <Shield className="size-4" aria-hidden />
              Sécurité
            </TabsTrigger>
            <TabsTrigger value="apparence" className="shrink-0 gap-1.5 rounded-xl px-3 py-2">
              <Palette className="size-4" aria-hidden />
              Apparence
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="notifications" className="space-y-4 outline-none">
          <div className="flex items-center justify-between gap-4 rounded-[1.25rem] border border-border bg-card p-4 shadow-sm">
            <div className="min-w-0 space-y-1">
              <Label htmlFor="notif-livraison">Notifications livraisons</Label>
              <p className="text-xs text-muted-foreground">
                Alerte lorsque le coursier est en route ou que le statut de commande change.
              </p>
            </div>
            <Switch id="notif-livraison" defaultChecked aria-label="Notifications livraisons" />
          </div>
          <div className="flex items-center justify-between gap-4 rounded-[1.25rem] border border-border bg-card p-4 shadow-sm">
            <div className="min-w-0 space-y-1">
              <Label htmlFor="notif-promo">Offres et actus</Label>
              <p className="text-xs text-muted-foreground">Newsletters, promos flash et nouveautés du catalogue.</p>
            </div>
            <Switch id="notif-promo" aria-label="Offres et actus" />
          </div>
          <div className="flex items-center justify-between gap-4 rounded-[1.25rem] border border-border bg-card p-4 shadow-sm">
            <div className="min-w-0 space-y-1">
              <Label htmlFor="notif-stock">Rappels stock bas (favoris)</Label>
              <p className="text-xs text-muted-foreground">
                Quand un produit en favoris passe en stock limité (fonctionnalité à brancher côté API).
              </p>
            </div>
            <Switch id="notif-stock" aria-label="Rappels stock favoris" />
          </div>
        </TabsContent>

        <TabsContent value="compte" className="space-y-6 outline-none">
          {user ? (
            <>
              <div className="rounded-[1.25rem] border border-border bg-card p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Connecté</p>
                <p className="mt-2 font-medium text-foreground">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="mt-1 text-sm tabular-nums text-muted-foreground">{user.phone}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/profile" className={cn(buttonVariants({ variant: "default" }), "rounded-2xl bg-primary hover:bg-brand-dark hover:text-white")}>
                  Modifier le profil &amp; goûts
                </Link>
                <Link href="/orders" className={cn(buttonVariants({ variant: "outline" }), "rounded-2xl")}>
                  Mes commandes
                </Link>
              </div>
            </>
          ) : (
            <div className="rounded-[1.25rem] border border-dashed border-border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
              <p>Connectez-vous pour lier ces réglages à votre compte.</p>
              <Button asChild className="mt-4 rounded-2xl bg-primary hover:bg-brand-dark hover:text-white">
                <Link href="/login?next=%2Fsettings">Connexion</Link>
              </Button>
            </div>
          )}
          <Separator />
          <div>
            <h3 className="text-sm font-semibold text-foreground">Langue</h3>
            <p className="mt-1 text-xs text-muted-foreground">Interface en français pour cette version démo.</p>
            <Button type="button" variant="outline" size="sm" className="mt-3 rounded-xl" disabled>
              Français (SN)
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="securite" className="space-y-6 outline-none">
          <div className="rounded-[1.25rem] border border-border bg-card p-5 shadow-sm">
            <h3 className="font-semibold text-foreground">Mot de passe</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Réinitialisez votre mot de passe depuis le flux dédié (e-mail de démo non envoyé en environnement mock).
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button asChild variant="outline" className="rounded-2xl">
                <Link href="/forgot-password">Mot de passe oublié</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-[1.25rem] border border-border bg-muted/40 p-5">
            <h3 className="font-semibold text-foreground">Double authentification</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              La 2FA et l’historique des sessions actives seront disponibles lors du branchement backend.
            </p>
            <Button type="button" variant="secondary" className="mt-4 rounded-2xl" disabled>
              Bientôt disponible
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="apparence" className="space-y-6 outline-none">
          <div className="rounded-[1.25rem] border border-border bg-card p-5 shadow-sm">
            <h3 className="font-semibold text-foreground">Thème d’affichage</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Identique au bouton lune / soleil dans l’en-tête — choisissez le rendu qui fatigue le moins vos yeux.
            </p>
            {!mounted ? (
              <div className="mt-4 h-11 w-full max-w-xs animate-pulse rounded-2xl bg-muted" />
            ) : (
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant={effective === "light" ? "default" : "outline"}
                  className={cn("rounded-2xl gap-2", effective === "light" && "bg-primary hover:bg-brand-dark hover:text-white")}
                  onClick={() => setTheme("light")}
                >
                  <Sun className="size-4" aria-hidden />
                  Clair
                </Button>
                <Button
                  type="button"
                  variant={effective === "dark" ? "default" : "outline"}
                  className={cn("rounded-2xl gap-2", effective === "dark" && "bg-primary hover:bg-brand-dark hover:text-white")}
                  onClick={() => setTheme("dark")}
                >
                  <Moon className="size-4" aria-hidden />
                  Sombre
                </Button>
                <Button
                  type="button"
                  variant={theme === "system" ? "default" : "outline"}
                  className={cn("rounded-2xl gap-2", theme === "system" && "bg-primary hover:bg-brand-dark hover:text-white")}
                  onClick={() => setTheme("system")}
                >
                  <Monitor className="size-4" aria-hidden />
                  Système
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
