"use client";

import { create } from "zustand";
import type { DeliveryMethod } from "@/types";

export type CheckoutDraftState = {
  address: string;
  phone: string;
  deliveryMethod: DeliveryMethod;
};

type Store = {
  draft: CheckoutDraftState | null;
  setDraft: (d: CheckoutDraftState) => void;
  clear: () => void;
};

export const useCheckoutDraftStore = create<Store>((set) => ({
  draft: null,
  setDraft: (draft) => set({ draft }),
  clear: () => set({ draft: null }),
}));
