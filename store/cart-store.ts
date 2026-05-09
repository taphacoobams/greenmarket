"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine } from "@/types";
import { MOCK_PRODUCTS } from "@/mock/products";
import { MOCK_PROMOTIONS } from "@/mock/promotions";
import {
  clampLineWeight,
  clampMinOrderKg,
  lineSubtotalForWeight,
  minOrderWeight,
  referenceWeightKg,
  roundLineWeight,
  roundWeightKg,
} from "@/lib/product-pricing";

type CartStore = {
  lines: CartLine[];
  promoCode: string | null;
  /** Ajoute un delta (kg ou nombre de pièces selon le produit). */
  addKg: (productId: string, deltaKg: number) => void;
  remove: (productId: string) => void;
  setLineWeightKg: (productId: string, weightKg: number) => void;
  clear: () => void;
  setPromoCode: (code: string | null) => void;
  getTotals: () => {
    subtotal: number;
    discount: number;
    total: number;
    /** Nombre de lignes produit (références distinctes). */
    count: number;
    /** Somme des kg (lignes au kg uniquement ; les pièces ne sont pas converties en kg ici). */
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
          const p = findProduct(productId);
          if (!p) return state;
          const next = [...state.lines];
          const idx = next.findIndex((l) => l.productId === productId);
          if (idx >= 0) {
            const merged = roundLineWeight(p, next[idx].weightKg + deltaKg);
            if (merged < minOrderWeight(p) - 1e-9) {
              return { lines: next.filter((l) => l.productId !== productId) };
            }
            next[idx] = { productId, weightKg: clampLineWeight(p, merged) };
            return { lines: next };
          }
          if (deltaKg >= minOrderWeight(p)) {
            next.push({ productId, weightKg: clampLineWeight(p, deltaKg) });
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
          const p = findProduct(productId);
          if (!p) return state;
          if (!Number.isFinite(weightKg) || weightKg < minOrderWeight(p) - 1e-9) {
            return { lines: state.lines.filter((l) => l.productId !== productId) };
          }
          const w = clampLineWeight(p, weightKg);
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
          if (p.saleUnit !== "piece") totalKg += line.weightKg;
        }
        let discount = 0;
        const promo = MOCK_PROMOTIONS.find(
          (x) => x.code.toLowerCase() === (promoCode ?? "").toLowerCase(),
        );
        if (promo && promo.percentOff > 0) {
          discount = Math.round((subtotal * promo.percentOff) / 100);
        }
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
      version: 3,
      migrate: (persisted, version) => {
        const state = persisted as {
          lines?: Array<{ productId: string; quantity?: number; weightKg?: number }>;
          promoCode?: string | null;
        };
        if (!state.lines) return persisted as CartStore & object;

        if (version < 2) {
          const lines: CartLine[] = state.lines.map((l) => {
            if (typeof l.weightKg === "number") {
              return { productId: l.productId, weightKg: clampMinOrderKg(l.weightKg) };
            }
            const p = findProduct(l.productId);
            const q = typeof l.quantity === "number" && l.quantity > 0 ? l.quantity : 1;
            const ref = p ? referenceWeightKg(p) : 1;
            return { productId: l.productId, weightKg: clampMinOrderKg(q * ref) };
          });
          state.lines = lines;
        }

        const reclamped: CartLine[] = state.lines.map((l) => {
          const p = findProduct(l.productId);
          if (!p || typeof l.weightKg !== "number") return l as CartLine;
          return { productId: l.productId, weightKg: clampLineWeight(p, l.weightKg) };
        });
        return { ...state, lines: reclamped };
      },
    },
  ),
);
