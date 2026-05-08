import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[65vh] max-w-xl flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.35em] text-primary">Erreur 404</p>
      <h1 className="text-4xl font-bold tracking-tight">Page introuvable</h1>
      <Button asChild className="rounded-2xl bg-primary hover:bg-brand-dark hover:text-white">
        <Link href="/">Retour accueil</Link>
      </Button>
    </div>
  );
}
