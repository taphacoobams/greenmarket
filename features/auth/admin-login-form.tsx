"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { BRANDING } from "@/lib/branding";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore, staffGuardRole } from "@/store/auth-store";
import { loginSchema, type LoginValues } from "@/lib/validators";

export function AdminLoginForm({ nextHref }: { nextHref: string }) {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const logout = useAuthStore((s) => s.logout);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(values: LoginValues) {
    const res = login(values.email, values.password);
    if (!res.ok) {
      toast.error(res.message ?? "Erreur");
      return;
    }
    const user = useAuthStore.getState().user;
    if (!staffGuardRole(user)) {
      logout();
      toast.error("Ce compte n’a pas accès à l’espace équipe. Utilisez la connexion client.");
      router.replace("/login");
      return;
    }
    toast.success("Connexion équipe réussie");
    router.replace(nextHref.startsWith("/") ? nextHref : "/admin");
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="w-full rounded-[2rem] border border-border bg-card p-8 shadow-xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">{BRANDING.name}</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">Connexion équipe</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Accès réservé au profil manager. Les comptes clients utilisent la{" "}
          <Link href="/login" className="font-semibold text-primary underline-offset-4 hover:underline">
            connexion acheteurs
          </Link>
          .
        </p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-5">
          <div className="space-y-2">
            <Label htmlFor="admin-email">Email professionnel</Label>
            <Input id="admin-email" type="email" className="rounded-2xl" {...form.register("email")} />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-password">Mot de passe</Label>
            <Input id="admin-password" type="password" className="rounded-2xl" {...form.register("password")} />
            {form.formState.errors.password && (
              <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
            )}
          </div>
          <Button type="submit" className="h-11 rounded-2xl bg-primary hover:bg-brand-dark hover:text-white">
            Accéder au tableau de bord
          </Button>
        </form>
        <div className="mt-8 flex justify-center gap-6 text-sm">
          <Link className="text-muted-foreground hover:text-foreground" href="/login">
            Espace clients
          </Link>
          <Link className="text-muted-foreground hover:text-foreground" href="/">
            Retour boutique
          </Link>
        </div>
      </div>
    </div>
  );
}
