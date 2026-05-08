"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getOrderById } from "@/services/order-service";
import { Progress } from "@/components/ui/progress";
import { useOrderExtrasStore } from "@/store/order-extras-store";
import { useEffect, useMemo, useState } from "react";
import type { OrderStatus } from "@/types";

export default function TrackingPage() {
  const { id } = useParams<{ id: string }>();
  const extra = useOrderExtrasStore((s) => s.extra);

  const order = useMemo(() => extra.find((o) => o.id === id) ?? getOrderById(id), [extra, id]);

  const [pulse, setPulse] = useState(62);

  useEffect(() => {
    const t = window.setInterval(() => setPulse((p) => (p >= 100 ? 32 : p + 7)), 4000);
    return () => window.clearInterval(t);
  }, []);

  if (!order) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <p className="text-muted-foreground">Commande introuvable.</p>
        <Link className="mt-6 inline-block rounded-2xl bg-primary px-6 py-3 text-white" href="/orders">
          Retour commandes
        </Link>
      </div>
    );
  }

  const idx = (["pending", "processing", "shipped", "delivered"] as OrderStatus[]).indexOf(
    order.status === "cancelled" ? "pending" : order.status,
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 md:px-8">
      <Link href="/orders" className="text-sm text-primary hover:underline">
        ← Mes commandes
      </Link>
      <h1 className="mt-6 text-3xl font-bold">Suivi livraison</h1>
      <p className="font-mono text-muted-foreground">{order.id}</p>
      <Progress value={(idx + 1) * 23 + (pulse % 17)} className="my-10 h-3 rounded-full" />

      <ol className="space-y-5">
        {order.trackingSteps.map((step) => (
          <li key={step.id} className="flex gap-4 rounded-2xl border border-border bg-card p-4">
            <div className={`mt-1 size-3 rounded-full ${step.done ? "bg-primary" : "bg-muted"}`} />
            <div>
              <p className="font-semibold">{step.label}</p>
              <p className="text-sm text-muted-foreground">{step.description}</p>
              {step.at && <p className="mt-1 text-xs text-muted-foreground">{step.at}</p>}
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-8 text-sm text-muted-foreground">
        La position du coursier s’affiche ici dès qu’il est en route.
      </p>
    </div>
  );
}
