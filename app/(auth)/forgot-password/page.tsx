"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const request = useAuthStore((s) => s.requestPasswordReset);
  const [email, setEmail] = useState("");

  return (
    <div className="w-full max-w-md rounded-[2rem] border border-border bg-card p-8 shadow-xl">
      <h1 className="text-2xl font-bold">Mot de passe oublié</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Saisissez l&apos;email de votre compte : nous vous enverrons un lien de réinitialisation.
      </p>
      <div className="mt-8 flex flex-col gap-4">
        <div className="space-y-2">
          <Label htmlFor="e">Email</Label>
          <Input id="e" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-2xl" />
        </div>
        <Button
          type="button"
          className="rounded-2xl bg-primary hover:bg-brand-dark hover:text-white"
          onClick={() => {
            request(email);
            toast.success("Email envoyé", { description: "Consultez votre boîte de réception." });
          }}
        >
          Envoyer
        </Button>
      </div>
      <Link className="mt-6 block text-center text-sm text-primary hover:underline" href="/login">
        Retour connexion
      </Link>
    </div>
  );
}
