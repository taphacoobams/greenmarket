"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ProfileTasteState = {
  /** IDs `MOCK_CATEGORIES` — familles de légumes préférées */
  preferredCategoryIds: string[];
  /** Prioriser les produits bio dans les suggestions */
  preferBio: boolean;
  toggleCategory: (categoryId: string) => void;
  setPreferBio: (value: boolean) => void;
  clearPreferences: () => void;
};

export const useProfileTasteStore = create<ProfileTasteState>()(
  persist(
    (set) => ({
      preferredCategoryIds: [],
      preferBio: false,
      toggleCategory: (categoryId) =>
        set((s) => {
          const has = s.preferredCategoryIds.includes(categoryId);
          return {
            preferredCategoryIds: has
              ? s.preferredCategoryIds.filter((id) => id !== categoryId)
              : [...s.preferredCategoryIds, categoryId],
          };
        }),
      setPreferBio: (value) => set({ preferBio: value }),
      clearPreferences: () => set({ preferredCategoryIds: [], preferBio: false }),
    }),
    { name: "gm-profile-taste" },
  ),
);
