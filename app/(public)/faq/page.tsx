import Link from "next/link";

export default function FAQPage() {
  const faqs = [
    { q: "Provenance et zone desservie ?", a: "Références affichées pour la zone Dakar. Le service de commande et de livraison n’est disponible qu’à Dakar." },
    { q: "Quand livrez-vous ?", a: "Toute commande validée avant minuit (heure de Dakar) est prévue pour livraison le lendemain à partir du matin. Le créneau précis dépend du mode choisi au checkout." },
    { q: "Paiements acceptés ?", a: "Wave, Orange Money, et carte bancaire." },
    { q: "Rétractation ?", a: "Annulation gratuite jusqu’à l’assignation du coursier à votre livraison." },
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 md:py-24">
      <h1 className="text-4xl font-bold">FAQ</h1>
      <div className="mt-12 space-y-8">
        {faqs.map((f) => (
          <article key={f.q} className="rounded-[1.5rem] border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold">{f.q}</h2>
            <p className="mt-3 text-muted-foreground">{f.a}</p>
          </article>
        ))}
      </div>
      <p className="mt-14 text-center text-muted-foreground">
        <Link className="text-primary underline" href="/contact">
          Contact équipe GREEN MARKET
        </Link>
      </p>
    </div>
  );
}
