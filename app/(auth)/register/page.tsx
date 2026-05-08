"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/auth-store";
import { registerSchema, type RegisterValues } from "@/lib/validators";
import { AuthMarketingSplit } from "@/features/auth/auth-marketing-split";

export default function RegisterPage() {
  const router = useRouter();
  const registerFn = useAuthStore((s) => s.register);
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", phone: "", password: "", confirm: "" },
  });

  function onSubmit(values: RegisterValues) {
    registerFn(values);
    toast.success("Compte créé");
    router.push("/");
  }

  return (
    <AuthMarketingSplit variant="client-register">
      <div className="w-full max-w-md rounded-[2rem] border border-border bg-card p-8 shadow-xl">
        <h1 className="text-2xl font-bold tracking-tight">Inscription</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Vous pourrez tout de suite composer votre panier et suivre vos commandes.
        </p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-5">
          <div className="space-y-2">
            <Label htmlFor="name">Nom</Label>
            <Input id="name" className="rounded-2xl" {...form.register("name")} />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{String(form.formState.errors.name.message)}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" className="rounded-2xl" {...form.register("email")} />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{String(form.formState.errors.email.message)}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+221 77 …"
              className="rounded-2xl"
              {...form.register("phone")}
            />
            {form.formState.errors.phone && (
              <p className="text-sm text-destructive">{String(form.formState.errors.phone.message)}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" type="password" className="rounded-2xl" {...form.register("password")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm">Confirmation</Label>
            <Input id="confirm" type="password" className="rounded-2xl" {...form.register("confirm")} />
            {form.formState.errors.confirm && (
              <p className="text-sm text-destructive">{String(form.formState.errors.confirm.message)}</p>
            )}
          </div>
          <Button type="submit" className="h-11 rounded-2xl bg-primary hover:bg-brand-dark hover:text-white">
            Continuer
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Déjà un compte ?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Connexion
          </Link>
        </p>
      </div>
    </AuthMarketingSplit>
  );
}
