"use client";

import { create } from "zustand";
import type { Notification } from "@/types";
import { MOCK_NOTIFICATIONS_SEED } from "@/mock/notifications";

type NotificationStore = {
  items: Notification[];
  pushLive: () => Notification;
  markRead: (id: string) => void;
  markAllRead: () => void;
  resetSeed: () => void;
};

const templates: Omit<Notification, "id" | "createdAt" | "read">[] = [
  {
    title: "Cueillette terminée",
    message: "Votre panier BIO vient de quitter nos serres climatisées.",
    type: "order",
  },
  {
    title: "Promotion flash",
    message: "-500 FCFA sur les agrumes pré-commande demain 8h.",
    type: "promo",
  },
  {
    title: "Centre ville",
    message: "Livré en 24 min — nouveau record GREEN MARKET.",
    type: "system",
  },
];

export const useNotificationStore = create<NotificationStore>((set) => ({
  items: MOCK_NOTIFICATIONS_SEED,
  pushLive: () => {
    const t = templates[Math.floor(Math.random() * templates.length)];
    const n: Notification = {
      id: `live-${typeof crypto !== "undefined" ? crypto.randomUUID() : String(Date.now())}`,
      ...t,
      read: false,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ items: [n, ...state.items] }));
    return n;
  },
  markRead: (id) => {
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? { ...item, read: true } : item)),
    }));
  },
  markAllRead: () => {
    set((state) => ({ items: state.items.map((item) => ({ ...item, read: true })) }));
  },
  resetSeed: () => set({ items: MOCK_NOTIFICATIONS_SEED }),
}));
