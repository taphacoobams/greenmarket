import { PaymentCheckoutForm } from "@/features/checkout/payment-checkout-form";
import { CheckoutAuthGate } from "@/features/checkout/checkout-auth-gate";

export const metadata = { title: "Paiement" };

export default function PaymentPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 md:px-10">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-orange">Étape 2/2</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">Paiement</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Choisissez votre mode de paiement sécurisé. Les montants affichés incluent livraison et éventuelle remise promo.
      </p>
      <div className="mt-10">
        <CheckoutAuthGate fallbackPath="/checkout/payment">
          <PaymentCheckoutForm />
        </CheckoutAuthGate>
      </div>
    </div>
  );
}
