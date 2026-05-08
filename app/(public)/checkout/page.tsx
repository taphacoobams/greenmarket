import { CheckoutAddressForm } from "@/features/checkout/checkout-address-form";
import { CheckoutAuthGate } from "@/features/checkout/checkout-auth-gate";

export const metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 md:px-10">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">Étape 1/2</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">Coordonnées & livraison</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Disponible sur Dakar : commandez avant 00&nbsp;h pour une livraison le lendemain à partir du matin (créneau selon votre
        choix ci‑dessous). Indiquez l’adresse et un téléphone joignable.
      </p>
      <div className="mt-10">
        <CheckoutAuthGate>
          <CheckoutAddressForm />
        </CheckoutAuthGate>
      </div>
    </div>
  );
}
