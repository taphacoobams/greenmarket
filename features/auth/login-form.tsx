"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore, staffGuardRole } from "@/store/auth-store";
import { loginSchema, type LoginValues } from "@/lib/validators";
import { AuthMarketingSplit } from "@/features/auth/auth-marketing-split";

export function LoginForm({ nextHref }: { nextHref: string }) {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const form = useForm<LoginValues>({ resolver: zodResolver(loginSchema), defaultValues: { email: "", password: "" } });

  function onSubmit(values: LoginValues) {
    const res = login(values.email, values.password);
    if (!res.ok) {
      toast.error(res.message ?? "Erreur");
      return;
    }
    toast.success("Connexion réussie");
    const u = useAuthStore.getState().user;
    if (staffGuardRole(u)) {
      router.replace("/admin");
      return;
    }
    router.replace(nextHref.startsWith("/") ? nextHref : "/");
  }

  return (
    <AuthMarketingSplit variant="client-login">
      <div className="w-full max-w-md rounded-[2rem] border border-border bg-card p-8 shadow-xl">
        <h1 className="text-2xl font-bold tracking-tight">Connexion</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Entrez l&apos;email et le mot de passe associés à votre compte GREEN MARKET.
        </p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" className="rounded-2xl" {...form.register("email")} />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" type="password" className="rounded-2xl" {...form.register("password")} />
            {form.formState.errors.password && (
              <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
            )}
          </div>
          <Button type="submit" className="h-11 rounded-2xl bg-primary hover:bg-brand-dark hover:text-white">
            Se connecter
          </Button>
        </form>
        <div className="mt-6 flex justify-between text-sm">
          <Link className="text-primary hover:underline" href="/forgot-password">
            Mot de passe oublié
          </Link>
          <Link className="text-muted-foreground hover:text-foreground" href="/register">
            Inscription
          </Link>
        </div>
      </div>
    </AuthMarketingSplit>
  );
}
