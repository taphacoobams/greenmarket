"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, ShoppingCart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";
import { useMounted } from "@/hooks/use-mounted";

const items = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/shop", label: "Shop", icon: LayoutGrid },
  { href: "/cart", label: "Panier", icon: ShoppingCart },
  { href: "/profile", label: "Compte", icon: User },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const count = useCartStore((s) => s.getTotals().count);
  const user = useAuthStore((s) => s.user);
  const mounted = useMounted();

  const navItems = useMemo(
    () =>
      items.map((it) =>
        it.href === "/profile"
          ? { ...it, href: user ? "/profile" : `/login?next=${encodeURIComponent("/profile")}` }
          : it,
      ),
    [user],
  );

  const authLike = /^\/(splash|welcome|login|register|forgot-password|reset-password)(\/|$)/;
  if (pathname.startsWith("/admin") || authLike.test(pathname)) return null;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-background/95 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-12px_40px_-24px_rgb(15_23_42_/_0.45)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-lg min-h-[3.25rem] items-stretch justify-around px-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex min-h-[3rem] min-w-0 flex-1 touch-manipulation flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-[0.65rem] font-semibold text-muted-foreground transition",
                active && "text-primary",
              )}
            >
              <span className="relative inline-flex size-9 items-center justify-center rounded-2xl bg-muted/60">
                <Icon className="size-5" />
                {href === "/cart" && mounted && count > 0 && (
                  <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-brand-orange text-[9px] font-bold text-white">
                    {count}
                  </span>
                )}
              </span>
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
