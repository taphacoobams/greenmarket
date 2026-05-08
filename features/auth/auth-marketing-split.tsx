import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, Leaf, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { BRANDING } from "@/lib/branding";
import { LogoMark } from "@/components/layout/logo";
import { cn } from "@/lib/utils";

export type AuthMarketingVariant = "client-login" | "client-register";

const COPY: Record<
  AuthMarketingVariant,
  { title: string; description: string; bullets: { icon: typeof Truck; text: string }[] }
> = {
  "client-login": {
    title: "Vos fruits & légumes frais sur Dakar",
    description:
      "Commandez jusqu’à minuit (heure de Dakar)&nbsp;: livraisons prévues dès le lendemain matin. Suivi simple du panier et des étapes jusqu’à la dépose.",
    bullets: [
      { icon: Truck, text: "Dakar uniquement — livraisons le lendemain après coupe à minuit" },
      { icon: BadgeCheck, text: "Produits suivis pour la fraîcheur du jour-j" },
      { icon: ShieldCheck, text: "Paiement mobile & acheteur protégé" },
    ],
  },
  "client-register": {
    title: "Rejoignez GREEN MARKET en quelques secondes",
    description:
      "Un compte pour enregistrer vos adresses, voir l’historique de commandes et débloquer des offres réservées aux membres.",
    bullets: [
      { icon: Sparkles, text: "Promos et fidélité personnalisées" },
      { icon: Truck, text: "Même règle de livraison : Dakar · commande avant minuit pour le lendemain" },
      { icon: BadgeCheck, text: "Compte prêt — commandes et adresses en un clic" },
    ],
  },
};

export function AuthMarketingSplit({
  variant,
  children,
  className,
}: {
  variant: AuthMarketingVariant;
  children: ReactNode;
  className?: string;
}) {
  const c = COPY[variant];

  return (
    <div
      className={cn(
        "flex w-full max-w-[min(960px,calc(100vw-2rem))] flex-col overflow-hidden lg:max-w-5xl lg:flex-row lg:rounded-[2rem] lg:border lg:border-border lg:bg-card lg:shadow-2xl",
        className,
      )}
    >
      <aside
        className={cn(
          "relative isolate hidden shrink-0 flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-dark via-primary to-brand lg:flex lg:w-[44%] lg:min-h-[520px] lg:max-w-none lg:p-10 xl:p-12",
          "before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.14),transparent_55%)]",
        )}
      >
        <div className="relative z-[1] space-y-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground/90 transition hover:text-primary-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden />
            <span>Boutique</span>
          </Link>
          <div>
            <div className="mb-8">
              <Link href="/" className="inline-block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-white/50">
                <LogoMark inverse size="md" priority />
              </Link>
            </div>
            <h2 className="font-heading text-2xl font-bold leading-snug tracking-tight text-primary-foreground xl:text-[1.65rem]">
              {c.title}
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/85">{c.description}</p>
          </div>
          <ul className="max-w-sm space-y-4">
            {c.bullets.map(({ icon: Icon, text }) => (
              <li key={text} className="flex gap-3 text-sm text-primary-foreground/90">
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
                  <Icon className="size-4" aria-hidden />
                </span>
                <span className="leading-snug">{text}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="relative z-[1] mt-10 flex items-center gap-2 text-xs text-primary-foreground/60">
          <Leaf className="size-3.5 opacity-80" aria-hidden />
          Fraîcheur locale · {BRANDING.name}
        </p>
      </aside>

      <div className="flex flex-1 flex-col justify-center lg:w-[56%] lg:bg-background lg:px-10 lg:py-12 xl:px-14">
        <div className="mx-auto w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
