"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine } from "@/types";
import { MOCK_PRODUCTS } from "@/mock/products";
import { MOCK_PROMOTIONS } from "@/mock/promotions";
import {
  clampMinOrderKg,
  lineSubtotalForWeight,
  MIN_ORDER_KG,
  referenceWeightKg,
  roundWeightKg,
} from "@/lib/product-pricing";

type CartStore = {
  lines: CartLine[];
  promoCode: string | null;
  /** Ajoute un delta en kg (fusionne avec la ligne existante). */
  addKg: (productId: string, deltaKg: number) => void;
  remove: (productId: string) => void;
  /** Fixe le poids exact ; retire la ligne si en dessous du minimum (0,25 kg). */
  setLineWeightKg: (productId: string, weightKg: number) => void;
  clear: () => void;
  setPromoCode: (code: string | null) => void;
  getTotals: () => {
    subtotal: number;
    discount: number;
    total: number;
    /** Nombre de lignes produit (références distinctes). */
    count: number;
    /** Somme des kg du panier */
    totalKg: number;
  };
};

function findProduct(id: string) {
  return MOCK_PRODUCTS.find((p) => p.id === id);
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      lines: [],
      promoCode: null,
      addKg: (productId, deltaKg) => {
        if (!Number.isFinite(deltaKg) || deltaKg === 0) return;
        set((state) => {
          const next = [...state.lines];
          const idx = next.findIndex((l) => l.productId === productId);
          if (idx >= 0) {
            const merged = roundWeightKg(next[idx].weightKg + deltaKg);
            if (merged < MIN_ORDER_KG - 1e-9) {
              return { lines: next.filter((l) => l.productId !== productId) };
            }
            next[idx] = { productId, weightKg: clampMinOrderKg(merged) };
            return { lines: next };
          }
          if (deltaKg >= MIN_ORDER_KG) {
            next.push({ productId, weightKg: clampMinOrderKg(deltaKg) });
          }
          return { lines: next };
        });
      },
      remove: (productId) => {
        set((state) => ({
          lines: state.lines.filter((l) => l.productId !== productId),
        }));
      },
      setLineWeightKg: (productId, weightKg) => {
        set((state) => {
          if (!Number.isFinite(weightKg) || weightKg < MIN_ORDER_KG - 1e-9) {
            return { lines: state.lines.filter((l) => l.productId !== productId) };
          }
          const w = clampMinOrderKg(weightKg);
          const idx = state.lines.findIndex((l) => l.productId === productId);
          if (idx < 0) return { lines: [...state.lines, { productId, weightKg: w }] };
          const next = [...state.lines];
          next[idx] = { productId, weightKg: w };
          return { lines: next };
        });
      },
      clear: () => set({ lines: [], promoCode: null }),
      setPromoCode: (code) => set({ promoCode: code }),
      getTotals: () => {
        const { lines, promoCode } = get();
        let subtotal = 0;
        let totalKg = 0;
        for (const line of lines) {
          const p = findProduct(line.productId);
          if (!p) continue;
          subtotal += lineSubtotalForWeight(p, line.weightKg);
          totalKg += line.weightKg;
        }
        let discount = 0;
        const promo = MOCK_PROMOTIONS.find(
          (x) => x.code.toLowerCase() === (promoCode ?? "").toLowerCase(),
        );
        if (promo && promo.percentOff > 0) {
          discount = Math.round((subtotal * promo.percentOff) / 100);
        }
        /** Nombre de références distinctes dans le panier (lignes). */
        const count = lines.length;
        const totalKgRounded = roundWeightKg(totalKg);
        return {
          subtotal,
          discount,
          total: Math.max(subtotal - discount, 0),
          count,
          totalKg: totalKgRounded,
        };
      },
    }),
    {
      name: "gm-cart",
      version: 2,
      migrate: (persisted, version) => {
        const state = persisted as {
          lines?: Array<{ productId: string; quantity?: number; weightKg?: number }>;
          promoCode?: string | null;
        };
        if (!state.lines || version >= 2) return persisted as CartStore & object;
        const lines: CartLine[] = state.lines.map((l) => {
          if (typeof l.weightKg === "number") {
            return { productId: l.productId, weightKg: clampMinOrderKg(l.weightKg) };
          }
          const p = findProduct(l.productId);
          const q = typeof l.quantity === "number" && l.quantity > 0 ? l.quantity : 1;
          const ref = p ? referenceWeightKg(p) : 1;
          return { productId: l.productId, weightKg: clampMinOrderKg(q * ref) };
        });
        return { ...state, lines };
      },
    },
  ),
);
