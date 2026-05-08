"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";
import { MOCK_USERS } from "@/mock/users";
import { DEMO_AVATAR_URL } from "@/lib/branding";

type AuthStore = {
  user: User | null;
  login: (email: string, password: string) => { ok: boolean; message?: string };
  register: (payload: { name: string; email: string; phone: string; password: string }) => void;
  logout: () => void;
  requestPasswordReset: (email: string) => void;
  completeReset: (password: string) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      login: (email, password) => {
        const normalized = email.trim().toLowerCase();
        const match =
          MOCK_USERS.find((u) => u.email.toLowerCase() === normalized) ?? null;

        if (match && (password === "demo" || password === "demo123")) {
          set({ user: match });
          return { ok: true };
        }

        // Allow any credentials to create ephemeral client session for UX demo.
        if (normalized.includes("@")) {
          set({
            user: {
              id: `u-demo-${normalized}`,
              name: normalized.split("@")[0],
              email: normalized,
              phone: "+221 77 555 66 77",
              avatarUrl: DEMO_AVATAR_URL,
              role: "client",
              address: "",
              city: "Dakar",
              createdAt: new Date().toISOString(),
            },
          });
          return { ok: true };
        }

        return { ok: false, message: "Email invalide" };
      },
      register: ({ name, email, phone, password }) => {
        void password;
        set({
          user: {
            id: `u-demo-${crypto.randomUUID()}`,
            name,
            email,
            phone: phone.trim(),
            avatarUrl: DEMO_AVATAR_URL,
            role: "client",
            city: "Dakar",
            createdAt: new Date().toISOString(),
          },
        });
      },
      logout: () => set({ user: null }),
      requestPasswordReset: (email) => {
        void email;
      },
      completeReset: (password) => {
        void password;
      },
    }),
    {
      name: "gm-auth",
      partialize: (s) => ({ user: s.user }),
    },
  ),
);

/** Accès au tableau de bord équipe (`/admin`). */
export function staffGuardRole(user: User | null): boolean {
  if (!user) return false;
  return user.role === "manager";
}
