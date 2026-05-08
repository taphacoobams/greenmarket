"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

/** Hydratation du store auth persisté avant toute redirection. */
export function useAuthPersistReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const p = useAuthStore.persist;
    if (!p?.hasHydrated) {
      setReady(true);
      return;
    }
    if (p.hasHydrated()) {
      setReady(true);
      return;
    }
    return p.onFinishHydration(() => setReady(true));
  }, []);

  return ready;
}

/** Retour après connexion (chemins relatifs uniquement). */
export function loginHref(nextPath: string): string {
  const safe = nextPath.startsWith("/") ? nextPath : "/checkout";
  return `/login?next=${encodeURIComponent(safe)}`;
}

export function CheckoutAuthGate({
  children,
  fallbackPath = "/checkout",
}: {
  children: ReactNode;
  fallbackPath?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const nextTarget = pathname && pathname.startsWith("/") ? pathname : fallbackPath;
  const hydrated = useAuthPersistReady();

  useEffect(() => {
    if (!hydrated) return;
    if (!user) {
      router.replace(loginHref(nextTarget));
    }
  }, [hydrated, user, nextTarget, router]);

  if (!hydrated || !user) {
    return (
      <div className="mx-auto flex min-h-[40vh] max-w-xl flex-col items-center justify-center gap-3 px-6 py-16 text-center text-muted-foreground">
        <p className="text-sm font-medium text-foreground">Vérification de la session…</p>
        <p className="text-sm">{!hydrated ? "Un instant…" : "Redirection vers la connexion…"}</p>
      </div>
    );
  }

  return children;
}
