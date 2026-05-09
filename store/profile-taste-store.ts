"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ProfileTasteState = {
  /** IDs `MOCK_PRODUCTS` — produits que vous cuisinez souvent */
  preferredProductIds: string[];
  preferBio: boolean;
  toggleProduct: (productId: string) => void;
  setPreferBio: (value: boolean) => void;
  clearPreferences: () => void;
};

export const useProfileTasteStore = create<ProfileTasteState>()(
  persist(
    (set) => ({
      preferredProductIds: [],
      preferBio: false,
      toggleProduct: (productId) =>
        set((s) => {
          const has = s.preferredProductIds.includes(productId);
          return {
            preferredProductIds: has
              ? s.preferredProductIds.filter((id) => id !== productId)
              : [...s.preferredProductIds, productId],
          };
        }),
      setPreferBio: (value) => set({ preferBio: value }),
      clearPreferences: () => set({ preferredProductIds: [], preferBio: false }),
    }),
    {
      name: "gm-profile-taste",
      version: 2,
      migrate: (persisted, version) => {
        type Old = { preferredCategoryIds?: string[]; preferredProductIds?: string[]; preferBio?: boolean };
        const p = persisted as Old;
        if (version >= 2 && p.preferredProductIds) return persisted as ProfileTasteState & object;
        return {
          preferredProductIds: [],
          preferBio: p.preferBio ?? false,
        } as ProfileTasteState & object;
      },
      partialize: (s) => ({
        preferredProductIds: s.preferredProductIds,
        preferBio: s.preferBio,
      }),
    },
  ),
);
