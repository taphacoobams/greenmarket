import Link from "next/link";
import {
  ArrowRight,
  Clock,
  HeartHandshake,
  Leaf,
  MapPin,
  ShieldCheck,
  Sprout,
  Truck,
  Users,
} from "lucide-react";
import { BRANDING } from "@/lib/branding";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const pillars = [
  {
    icon: Sprout,
    title: "Circuits courts",
    text: "Nous privilégions des producteurs et coopératives de la région de Dakar et des zones voisines dès que la saison le permet, pour réduire les intermédiaires et garder une trace claire sur l’origine affichée sur chaque fiche produit.",
  },
  {
    icon: Leaf,
    title: "Fraîcheur pilotée",
    text: "Récoltes et arrivées sont planifiées pour limiter le temps entre la coupe et votre cuisine : étiquetage des lots, contrôle visuel à la préparation et catégories stock « normal / bas / rupture » pour éviter les mauvaises surprises.",
  },
  {
    icon: Truck,
    title: "Logistique Dakar",
    text: "Tournées organisées pour le lendemain matin après une coupe des commandes à minuit (heure de Dakar). La zone couverte est explicitement limitée à Dakar pour tenir nos créneaux et la qualité à la dépose.",
  },
  {
    icon: ShieldCheck,
    title: "Paiement & confiance",
    text: "Wave, Orange Money, carte ou paiement à la livraison : vous choisissez le mode qui vous rassure. Les étapes de commande et le suivi vous gardent informés jusqu’à la remise du colis.",
  },
] as const;

const timeline = [
  {
    step: "1",
    title: "Vous composez",
    desc: "Au kilo ou au lot de référence, avec prix au kg affiché pour comparer facilement les fruits et légumes du catalogue.",
  },
  {
    step: "2",
    title: "Nous préparons",
    desc: "Pick contrôlé, pesées cohérentes avec votre panier et emballage adapté aux trajets urbains (chocs, chaleur).",
  },
  {
    step: "3",
    title: "Le coursier livre",
    desc: "Passage le lendemain matin selon la formule choisie ; vous pouvez suivre les grandes étapes depuis votre espace commandes.",
  },
] as const;

export default function AboutPage() {
  return (
    <div className="border-b border-border/60 bg-gradient-to-b from-brand-light/40 via-background to-background dark:from-primary/15 dark:to-background">
      <div className="mx-auto max-w-3xl px-4 pb-12 pt-[max(3.5rem,calc(2rem+env(safe-area-inset-top,0px)))] md:pb-16 md:pt-20 lg:px-8">
        <Badge className="mb-4 rounded-full border-primary/30 bg-background/80 px-3 py-1 text-xs font-semibold text-primary">
          À propos · {BRANDING.name}
        </Badge>
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-primary">Manifeste</p>
        <h1 className="mt-3 text-[2.15rem] font-bold leading-[1.12] tracking-tight text-foreground md:text-[2.75rem] md:leading-[1.08]">
          Rapprocher les meilleurs produits du champ des tables dakaroises, sans friction.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          {BRANDING.name} est une épicerie en ligne spécialisée fruits &amp; légumes : nous sélectionnons, préparons et livrons
          avec une obsession simple — que ce que vous recevez ressemble à ce que vous auriez choisi vous-même au marché, avec la
          commodité d’un clic et une promesse de délais claire pour Dakar.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button asChild size="lg" className="h-12 rounded-2xl bg-primary hover:bg-brand-dark hover:text-white">
            <Link href="/shop">
              Parcourir le catalogue
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 rounded-2xl border-border">
            <Link href="/contact">Nous écrire</Link>
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-16 px-4 pb-20 md:space-y-24 md:pb-28 lg:px-10">
        <section className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-14">
          <div className="space-y-5">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Notre mission</h2>
            <p className="leading-relaxed text-muted-foreground">
              Beaucoup de ménages à Dakar veulent manger plus de produits frais, mais manquent de temps pour les marchés, ou
              doutent de la qualité après plusieurs mains. Notre mission est de rendre cette fraîcheur accessible : prix lisibles,
              origine indiquée, délais annoncés et service client joignable lorsque quelque chose ne va pas.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Nous ne sommes pas un marketplace généraliste : la colonne vertébrale du catalogue reste les fruits et légumes, avec
              des promotions ponctuelles et une navigation pensée pour composer un panier équilibré rapidement.
            </p>
          </div>
          <Card className="rounded-[1.75rem] border-border/80 bg-card/90 p-6 shadow-sm md:p-8">
            <div className="flex items-start gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <Clock className="size-5" aria-hidden />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">La règle du lendemain matin</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Les commandes validées avant <strong className="text-foreground">minuit</strong> (heure de Dakar) partent en
                  préparation pour une livraison visée le <strong className="text-foreground">lendemain matin</strong>. Au-delà,
                  votre commande glisse sur le cycle suivant : nous affichons toujours cette logique sur l’accueil, au checkout et
                  dans la FAQ pour éviter toute ambiguïté.
                </p>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="flex items-start gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand-orange/15 text-brand-orange">
                <MapPin className="size-5" aria-hidden />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Une zone maîtrisée</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Nous livrons <strong className="text-foreground">uniquement à Dakar</strong>. Ce choix volontaire permet d’optimiser
                  les tournées, de limiter le temps porte-à-porte et de garder des produits sensibles (feuilles, baies, herbes)
                  dans des conditions correctes jusqu’à chez vous.
                </p>
              </div>
            </div>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Ce qui guide notre façon de travailler</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Quatre piliers qui structurent les décisions produit, les relations avec les fournisseurs et l’expérience sur le site — du
            clic au panier livré.
          </p>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {pillars.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <Card className="h-full rounded-[1.5rem] border-border/70 p-6 transition hover:border-primary/25 hover:shadow-md">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </Card>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-[2rem] border border-border/80 bg-muted/25 px-6 py-10 md:px-10 md:py-14">
          <div className="flex flex-wrap items-center gap-3">
            <Users className="size-8 text-primary" aria-hidden />
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Producteurs &amp; saisonnalité</h2>
          </div>
          <p className="mt-5 max-w-3xl leading-relaxed text-muted-foreground">
            Les disponibilités suivent les saisons sénégalaises et les flux importés lorsque le local ne suffit pas à tenir une gamme
            cohérente. Nous documentons l’<strong className="font-medium text-foreground">origine</strong> sur chaque produit (souvent
            Dakar ou régions voisines pour les circuits courts) pour que vous sachiez ce que vous mettez au menu.
          </p>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
            Les labels type <strong className="font-medium text-foreground">Bio</strong> ou <strong className="font-medium text-foreground">Promo</strong>{" "}
            permettent de filtrer vite ; les stocks « bas » vous signalent qu’il vaut mieux ne pas attendre si vous tenez à une variété
            précise.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">De votre panier à votre porte</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Un parcours pensé pour être lisible, même mobil : sélection au kilo, récap clair au checkout, puis préparation et expédition.
          </p>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {timeline.map(({ step, title, desc }) => (
              <li key={step}>
                <Card className="h-full rounded-[1.5rem] border-border/70 p-6">
                  <span className="inline-flex size-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {step}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                </Card>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Card className="rounded-[1.75rem] border-border/80 p-6 md:p-8">
            <HeartHandshake className="size-8 text-primary" aria-hidden />
            <h2 className="mt-4 text-xl font-bold md:text-2xl">Valeurs</h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li>
                <strong className="text-foreground">Transparence</strong> — prix au kg, origine, disponibilité : peu de promesses
                floues, beaucoup d’infos exploitables.
              </li>
              <li>
                <strong className="text-foreground">Respect du produit</strong> — manutention légère, emballages adaptés, refus de
                sur-promettre sur des stocks incertains.
              </li>
              <li>
                <strong className="text-foreground">Proximité client</strong> — compte, historique de commandes, favoris réservés aux
                membres connectés, FAQ et contact pour lever les doutes avant d’acheter.
              </li>
            </ul>
          </Card>
          <Card className="rounded-[1.75rem] border-primary/20 bg-brand-light/30 p-6 dark:bg-primary/10 md:p-8">
            <h2 className="text-xl font-bold md:text-2xl">Pour aller plus loin</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Vous voulez des précisions sur les livraisons, les paiements ou les données personnelles ? Nos pages dédiées complètent
              cette présentation.
            </p>
            <ul className="mt-6 flex flex-col gap-2 text-sm font-medium">
              <li>
                <Link href="/faq" className="text-primary underline-offset-4 hover:underline">
                  Questions fréquentes
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/cgu" className="text-primary underline-offset-4 hover:underline">
                  Conditions générales
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="text-primary underline-offset-4 hover:underline">
                  Mentions légales
                </Link>
              </li>
            </ul>
            <Button asChild className="mt-8 h-11 rounded-2xl bg-primary hover:bg-brand-dark hover:text-white">
              <Link href="/shop">Découvrir le catalogue</Link>
            </Button>
          </Card>
        </section>
      </div>
    </div>
  );
}
