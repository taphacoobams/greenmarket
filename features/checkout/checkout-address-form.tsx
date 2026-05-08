"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { MOCK_PRODUCTS } from "@/mock/products";
import { useAuthStore } from "@/store/auth-store";
import { useCartStore } from "@/store/cart-store";
import { useCheckoutDraftStore } from "@/store/checkout-draft-store";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { checkoutAddressSchema, type CheckoutAddressValues } from "@/lib/validators";
import { formatKgFr } from "@/lib/product-pricing";

const deliveryLabels: Record<CheckoutAddressValues["deliveryMethod"], string> = {
  standard: "Lendemain matin · passage standard (1 000 FCFA)",
  express: "Lendemain · prioritaire avant 11 h (2 500 FCFA)",
  slot: "Lendemain · créneau au choix (1 500 FCFA)",
};

export function CheckoutAddressForm() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const lines = useCartStore((s) => s.lines);
  const setDraft = useCheckoutDraftStore((s) => s.setDraft);

  const form = useForm<CheckoutAddressValues>({
    resolver: zodResolver(checkoutAddressSchema),
    defaultValues: {
      address: user?.address ?? "Almadies, villa 12",
      phone: user?.phone ?? "+221 77 000 00 00",
      deliveryMethod: "standard",
    },
  });

  function onSubmit(values: CheckoutAddressValues) {
    setDraft(values);
    router.push("/checkout/payment");
  }

  const items = lines
    .map((l) => ({ ...l, p: MOCK_PRODUCTS.find((x) => x.id === l.productId) }))
    .filter((x) => x.p);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="rounded-2xl border border-primary/25 bg-brand-light/50 px-4 py-3 text-sm text-muted-foreground dark:bg-primary/15 dark:text-muted-foreground">
        Coupe des commandes à <strong className="text-foreground">minuit</strong> (Dakar)&nbsp;: expédition organisée pour le{" "}
        <strong className="text-foreground">lendemain matin</strong> dans la zone prévue lors du passage en livraison.
      </div>
      {items.length === 0 ? (
        <p className="rounded-2xl border border-dashed p-10 text-muted-foreground">
          Panier vide —{" "}
          <Link className="text-primary underline" href="/shop">
            retour shop
          </Link>
          .
        </p>
      ) : (
        <ul className="space-y-3 text-sm">
          {items.map(({ p, weightKg }) =>
            p ? (
              <li key={p.id} className="flex justify-between rounded-2xl border border-border bg-card px-4 py-3">
                <span>
                  {p.name} — {formatKgFr(weightKg)} kg
                </span>
              </li>
            ) : null,
          )}
        </ul>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="address">Adresse complète</Label>
          <Input id="address" className="rounded-2xl" {...form.register("address")} aria-invalid={!!form.formState.errors.address} />
          {form.formState.errors.address?.message ? (
            <p className="text-sm text-destructive">{String(form.formState.errors.address.message)}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input id="phone" className="rounded-2xl" {...form.register("phone")} aria-invalid={!!form.formState.errors.phone} />
          {form.formState.errors.phone?.message ? (
            <p className="text-sm text-destructive">{String(form.formState.errors.phone.message)}</p>
          ) : null}
        </div>
      </div>

      <Controller
        name="deliveryMethod"
        control={form.control}
        render={({ field }) => (
          <div className="space-y-3">
            <Label>Option de livraison</Label>
            <RadioGroup value={field.value} onValueChange={(v: CheckoutAddressValues["deliveryMethod"]) => field.onChange(v)} className="grid gap-3 md:grid-cols-3">
              {(["standard", "express", "slot"] as const).map((opt) => (
                <Label
                  key={opt}
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border border-border px-4 py-3 ${field.value === opt ? "border-primary ring-2 ring-primary/35" : ""}`}
                  htmlFor={opt}
                >
                  <RadioGroupItem value={opt} id={opt} />
                  <span className="text-sm">{deliveryLabels[opt]}</span>
                </Label>
              ))}
            </RadioGroup>
          </div>
        )}
      />

      <Button disabled={items.length === 0} type="submit" className="h-12 rounded-2xl bg-primary hover:bg-brand-dark hover:text-white">
        Continuer vers le paiement
      </Button>
    </form>
  );
}
