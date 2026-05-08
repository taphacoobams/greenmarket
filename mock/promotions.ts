import type { Promotion } from "@/types";

export const MOCK_PROMOTIONS: Promotion[] = [
  {
    id: "promo-1",
    title: "Panier fraîcheur -10%",
    description: "Réduction immédiate sur les paniers combos légumes.",
    code: "GREEN10",
    percentOff: 10,
    validUntil: "2026-12-31T23:59:59.000Z",
    image: "/promotions/promo-panier-fraicheur.png",
  },
  {
    id: "promo-2",
    title: "Frais de livraison offerts",
    description: "À partir de 15 000 FCFA, commandé avant minuit — livré le lendemain sur Dakar.",
    code: "RAPIDE",
    percentOff: 0,
    validUntil: "2026-08-31T23:59:59.000Z",
    image: "/promotions/promo-livraison.png",
  },
];
