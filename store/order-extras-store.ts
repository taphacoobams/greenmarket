"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Order } from "@/types";

type OrderExtraStore = {
  extra: Order[];
  addOrder: (order: Order) => void;
};

export const useOrderExtrasStore = create<OrderExtraStore>()(
  persist(
    (set) => ({
      extra: [],
      addOrder: (order) => set((s) => ({ extra: [order, ...s.extra] })),
    }),
    { name: "gm-order-extras" },
  ),
);
