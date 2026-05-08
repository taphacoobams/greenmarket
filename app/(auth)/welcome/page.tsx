"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/layout/logo";

export default function WelcomePage() {
  return (
    <div className="flex w-full max-w-3xl flex-col gap-10">
      <LogoMark priority />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-6 md:grid-cols-2"
      >
        <div className="rounded-[2rem] border border-border bg-card/90 p-8 shadow-lg backdrop-blur">
          <Truck className="mb-4 size-10 text-primary" />
          <h1 className="text-2xl font-bold">Livraisons à Dakar</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Commandez avant minuit&nbsp;: vos courses peuvent être livrées dès le lendemain matin, avec étapes de préparation suivies dans
            l’app avant le passage coursier.
          </p>
        </div>
        <div className="rounded-[2rem] border border-border bg-card/90 p-8 shadow-lg backdrop-blur">
          <Sparkles className="mb-4 size-10 text-brand-orange" />
          <h2 className="text-2xl font-bold">Onboarding premium</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Créez votre compte en quelques étapes et profitez du catalogue complet.
          </p>
        </div>
      </motion.div>
      <div className="flex flex-wrap gap-3">
        <Button asChild className="h-12 rounded-2xl bg-primary hover:bg-brand-dark hover:text-white">
          <Link href="/register">Créer un compte</Link>
        </Button>
        <Button asChild variant="outline" className="h-12 rounded-2xl border-border">
          <Link href="/login">J&apos;ai déjà un compte</Link>
        </Button>
      </div>
    </div>
  );
}
