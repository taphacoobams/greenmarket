"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BRANDING } from "@/lib/branding";
import { LogoMark } from "@/components/layout/logo";

export default function SplashPage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="flex w-full max-w-md flex-col items-center gap-10 rounded-[2.5rem] border border-border/80 bg-card/90 p-10 text-center shadow-[0_40px_120px_-50px_rgb(22_163_74_/_0.45)] backdrop-blur-xl"
    >
      <LogoMark size="lg" className="scale-105" priority />
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-primary">{BRANDING.name}</p>
        <h1 className="text-3xl font-bold tracking-tight">Bienvenue sur {BRANDING.name}</h1>
        <p className="text-sm text-muted-foreground">Vos légumes verts, livrés en toute fraîcheur.</p>
      </div>
      <div className="flex w-full flex-col gap-3">
        <Button asChild className="h-12 rounded-2xl bg-primary hover:bg-brand-dark hover:text-white">
          <Link href="/welcome">Continuer</Link>
        </Button>
        <Button asChild variant="ghost" className="rounded-2xl">
          <Link href="/">Passer (accueil)</Link>
        </Button>
      </div>
    </motion.div>
  );
}
