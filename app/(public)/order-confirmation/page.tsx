"use client";

import Link from "next/link";
import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { getOrderById } from "@/services/order-service";
import { useOrderExtrasStore } from "@/store/order-extras-store";
import { LinkButton } from "@/components/shared/link-button";
import type { OrderStatus } from "@/types";

function orderStatusLabel(status: OrderStatus): string {
  const map: Record<OrderStatus, string> = {
    pending: "En attente de confirmation",
    processing: "En préparation",
    shipped: "Expédiée",
    delivered: "Livrée",
    cancelled: "Annulée",
  };
  return map[status];
}

function Body() {
  const ref = useSearchParams().get("ref");
  const extra = useOrderExtrasStore((s) => s.extra);
  const order = useMemo(() => {
    if (!ref) return undefined;
    const fromExtra = extra.find((o) => o.id === ref);
    return fromExtra ?? getOrderById(ref);
  }, [extra, ref]);

  if (!order) {
    return (
      <div className="rounded-[2rem] border border-dashed p-12 text-center text-muted-foreground">
        Commande introuvable.{" "}
        <Link className="text-primary underline" href="/shop">
          Retour au shop
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-[2rem] border border-border bg-card p-10 shadow-lg">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Merci</p>
      <h1 className="text-3xl font-bold">Commande {order.id}</h1>
      <p className="text-muted-foreground">Statut : {orderStatusLabel(order.status)}</p>
      <div className="flex flex-wrap gap-3">
        <LinkButton href={`/orders/${order.id}/track`} variant="default" className="rounded-2xl bg-primary hover:bg-brand-dark hover:text-white">
          Suivre la livraison
        </LinkButton>
        <LinkButton href="/orders" variant="outline" className="rounded-2xl">
          Mes commandes
        </LinkButton>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-10">
      <Suspense fallback={<p className="text-muted-foreground">Chargement…</p>}>
        <Body />
      </Suspense>
    </div>
  );
}
