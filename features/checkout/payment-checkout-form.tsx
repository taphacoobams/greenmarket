"use client";

import { LinkButton } from "@/components/shared/link-button";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { MOCK_PRODUCTS } from "@/mock/products";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useCartStore } from "@/store/cart-store";
import { useCheckoutDraftStore } from "@/store/checkout-draft-store";
import { useAuthStore } from "@/store/auth-store";
import { useOrderExtrasStore } from "@/store/order-extras-store";
import { paymentSchema, type PaymentValues } from "@/lib/validators";
import { formatCurrency } from "@/lib/format";
import { pricePerKg } from "@/lib/product-pricing";
import type { Order, OrderItem, TrackingStep, PaymentMethod } from "@/types";
import { toast } from "sonner";
import { loginHref } from "@/features/checkout/checkout-auth-gate";
import { CheckoutOrderSummary } from "@/features/checkout/checkout-order-summary";

const labels: Record<PaymentValues["paymentMethod"], string> = {
  wave: "Wave",
  orange_money: "Orange Money",
  card: "Carte bancaire",
  cod: "Paiement à la livraison",
};

export function PaymentCheckoutForm() {
  const router = useRouter();
  const draft = useCheckoutDraftStore((s) => s.draft);
  const clearDraft = useCheckoutDraftStore((s) => s.clear);
  const lines = useCartStore((s) => s.lines);
  const getTotals = useCartStore((s) => s.getTotals);
  const clearCart = useCartStore((s) => s.clear);
  const user = useAuthStore((s) => s.user);
  const addOrder = useOrderExtrasStore((s) => s.addOrder);
  const [progress, setProgress] = useState(0);
  /** Évite router.replace("/checkout") quand le draft est vidé après paiement réussi (sinon ça écrase router.push vers l’accueil). */
  const skipDraftRedirectRef = useRef(false);
  /** Redirection accueil après toast — annulée si l’utilisateur clique « Voir mes commandes ». */
  const postPayHomeRedirectRef = useRef<number | null>(null);

  const form = useForm<PaymentValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { paymentMethod: "wave" },
  });

  useEffect(() => {
    if (!draft && !skipDraftRedirectRef.current) {
      router.replace("/checkout");
    }
  }, [draft, router]);

  useEffect(
    () => () => {
      if (postPayHomeRedirectRef.current) {
        clearTimeout(postPayHomeRedirectRef.current);
        postPayHomeRedirectRef.current = null;
      }
    },
    [],
  );

  if (!draft) return null;

  const totals = getTotals();
  const fees: Record<(typeof draft)["deliveryMethod"], number> = {
    standard: 1000,
    express: 2500,
    slot: 1500,
  };
  const fee = fees[draft.deliveryMethod];
  const totalDue = totals.total + fee;

  function pay(values: PaymentValues) {
    if (!draft) return;
    if (!user) {
      toast.message("Connexion requise", { description: "Reconnectez-vous pour payer votre commande." });
      router.replace(loginHref("/checkout/payment"));
      return;
    }
    const d = draft;
    setProgress(35);
    const items: OrderItem[] = lines
      .map((line) => {
        const p = MOCK_PRODUCTS.find((x) => x.id === line.productId);
        if (!p) return null;
        return {
          productId: p.id,
          name: p.name,
          quantity: line.weightKg,
          unitPrice: pricePerKg(p),
          image: p.image,
        } satisfies OrderItem;
      })
      .filter(Boolean) as OrderItem[];

    const tracking: TrackingStep[] = [
      { id: "s1", label: "Commande reçue", description: "Paiement confirmé", done: true, at: new Date().toISOString() },
      { id: "s2", label: "Préparation", description: "Préparation de votre colis", done: false },
      { id: "s3", label: "En livraison", description: "Coursier en route — suivi sur la carte", done: false },
      { id: "s4", label: "Livrée", description: "Remise au client", done: false },
    ];

    const pm: PaymentMethod = values.paymentMethod;

    window.setTimeout(() => setProgress(78), 500);
    window.setTimeout(() => {
      const order: Order = {
        id: `GM-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
        userId: user?.id ?? "guest",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "processing",
        items,
        subtotal: totals.subtotal,
        deliveryFee: fee,
        discount: totals.discount,
        total: totalDue,
        paymentMethod: pm,
        deliveryMethod: d.deliveryMethod,
        address: d.address,
        phone: d.phone,
        trackingSteps: tracking,
      };

      skipDraftRedirectRef.current = true;
      addOrder(order);
      clearCart();
      clearDraft();
      setProgress(100);
      if (postPayHomeRedirectRef.current) {
        clearTimeout(postPayHomeRedirectRef.current);
      }
      toast.success("Commande enregistrée", {
        description: `Réf. ${order.id} · Total ${formatCurrency(totalDue)}. Va dans Mes commandes pour suivre la préparation, la livraison et le coursier.`,
        duration: 6000,
        action: {
          label: "Voir mes commandes",
          onClick: () => {
            if (postPayHomeRedirectRef.current) {
              clearTimeout(postPayHomeRedirectRef.current);
              postPayHomeRedirectRef.current = null;
            }
            router.push("/orders");
          },
        },
      });
      postPayHomeRedirectRef.current = window.setTimeout(() => {
        postPayHomeRedirectRef.current = null;
        router.push("/");
      }, 400);
    }, 1350);
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="grid gap-10 lg:grid-cols-[1fr_minmax(280px,380px)] lg:items-start">
        <form onSubmit={form.handleSubmit(pay)} className="flex flex-col gap-10">
          <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm space-y-2">
            <h2 className="text-xl font-semibold">Livraison</h2>
            <p className="text-sm text-muted-foreground">{draft.address}</p>
            <p className="text-sm">{draft.phone}</p>
            <p className="pt-2 text-xs text-muted-foreground">
              Montant total à payer indiqué dans le récapitulatif à droite (panier + livraison).
            </p>
          </div>

          <Controller
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <div className="space-y-3">
                <Label>Méthode de paiement</Label>
                <RadioGroup value={field.value} onValueChange={(v: PaymentValues["paymentMethod"]) => field.onChange(v)} className="grid gap-3 sm:grid-cols-2">
                  {(Object.keys(labels) as PaymentValues["paymentMethod"][]).map((method) => (
                    <Label
                      htmlFor={`pm-${method}`}
                      key={method}
                      className={`flex cursor-pointer items-center gap-3 rounded-2xl border border-border px-4 py-3 ${field.value === method ? "border-primary ring-2 ring-primary/35" : ""}`}
                    >
                      <RadioGroupItem value={method} id={`pm-${method}`} />
                      <span className="text-sm font-medium">{labels[method]}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            )}
          />

          <div className="space-y-2">
            <Progress value={progress} className="h-2 rounded-full" />
            <p className="text-xs text-muted-foreground">Traitement du paiement… {progress}%</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <LinkButton variant="outline" href="/checkout" className="rounded-2xl">
              Retour
            </LinkButton>
            <Button type="submit" className="rounded-2xl bg-primary hover:bg-brand-dark hover:text-white">
              Payer {formatCurrency(totalDue)}
            </Button>
          </div>
        </form>

        <CheckoutOrderSummary deliveryMethod={draft.deliveryMethod} />
      </div>
    </motion.div>
  );
}
