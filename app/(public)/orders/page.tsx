"use client";

import Link from "next/link";
import { Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMergedOrders } from "@/hooks/use-merged-orders";
import { formatCurrency, formatDateTimeFr } from "@/lib/format";
import type { OrderStatus } from "@/types";

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "En attente",
  processing: "En préparation",
  shipped: "En livraison",
  delivered: "Livrée",
  cancelled: "Annulée",
};

export default function MyOrdersPage() {
  const orders = useMergedOrders();

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 md:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Mes commandes</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Historique de vos achats sur GREEN MARKET — dates, montants et lien de suivi lorsque disponible.
      </p>

      <div className="mt-10 space-y-4">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-[1.75rem] border border-dashed border-border bg-muted/30 px-8 py-16 text-center">
            <Package className="size-12 text-muted-foreground/70" aria-hidden />
            <div>
              <p className="font-semibold text-foreground">Aucune commande pour l&apos;instant</p>
              <p className="mt-1 text-sm text-muted-foreground">Parcourez le catalogue pour remplir votre panier.</p>
            </div>
            <Button asChild className="rounded-2xl bg-primary hover:bg-brand-dark hover:text-white">
              <Link href="/shop">Voir le catalogue</Link>
            </Button>
          </div>
        ) : (
          orders.map((o) => (
            <div key={o.id} className="rounded-[1.5rem] border border-border bg-card p-5 shadow-sm">
              <div className="flex min-w-0 flex-1 flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
                <div className="min-w-0 space-y-3">
                  <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-wide text-muted-foreground">Référence</p>
                    <p className="mt-1 font-mono text-sm font-semibold text-foreground">{o.id}</p>
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-wide text-muted-foreground">Passée le</p>
                    <p className="mt-1 text-sm text-foreground">{formatDateTimeFr(o.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-wide text-muted-foreground">Statut</p>
                    <Badge variant="outline" className="mt-1 rounded-full">
                      {STATUS_LABELS[o.status] ?? o.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col gap-3 border-t border-border pt-4 md:border-l md:border-t-0 md:pl-8 md:pt-0 md:text-right">
                  <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-wide text-muted-foreground md:text-right">
                      Montant total
                    </p>
                    <p className="mt-1 text-xl font-bold tabular-nums text-foreground">{formatCurrency(o.total)}</p>
                  </div>
                  <Link
                    className="text-sm font-medium text-primary underline-offset-4 hover:underline md:self-end"
                    href={`/orders/${o.id}/track`}
                  >
                    Suivre la livraison
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
