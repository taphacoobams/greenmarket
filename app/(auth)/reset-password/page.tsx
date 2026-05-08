"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/auth-store";

export default function ResetPasswordPage() {
  const router = useRouter();
  const completeReset = useAuthStore((s) => s.completeReset);
  const [password, setPassword] = useState("");

  return (
    <div className="w-full max-w-md rounded-[2rem] border border-border bg-card p-8 shadow-xl">
      <h1 className="text-2xl font-bold">Nouveau mot de passe</h1>
      <p className="mt-2 text-sm text-muted-foreground">Choisissez un mot de passe fort pour sécuriser votre compte.</p>
      <div className="mt-8 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="p">Mot de passe</Label>
          <Input id="p" type="password" className="rounded-2xl" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button
          type="button"
          className="w-full rounded-2xl bg-primary hover:bg-brand-dark hover:text-white"
          onClick={() => {
            completeReset(password);
            toast.success("Mot de passe mis à jour");
            router.push("/login");
          }}
        >
          Sauvegarder
        </Button>
      </div>
      <Link className="mt-6 block text-center text-sm text-primary hover:underline" href="/login">
        Connexion
      </Link>
    </div>
  );
}
