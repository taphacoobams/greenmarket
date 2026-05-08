import type { Notification } from "@/types";

export const MOCK_NOTIFICATIONS_SEED: Notification[] = [
  {
    id: "n1",
    title: "Commande en route",
    message: "Votre coursier GREEN MARKET a quitté le hub Almadies.",
    read: false,
    createdAt: "2026-05-07T08:05:00.000Z",
    type: "order",
  },
  {
    id: "n2",
    title: "Stock limité basilic",
    message: "Il reste quelques bouquets — ajoutez-le au panier.",
    read: false,
    createdAt: "2026-05-07T06:42:00.000Z",
    type: "promo",
  },
  {
    id: "n3",
    title: "Maintenance prévue",
    message: "L’application sera indisponible 30 min mercredi 03h.",
    read: true,
    createdAt: "2026-05-06T22:30:00.000Z",
    type: "system",
  },
];
