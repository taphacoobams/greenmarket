"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Boxes,
  ClipboardList,
  LayoutDashboard,
  Megaphone,
  Menu,
  Users,
  Warehouse,
} from "lucide-react";
import { useAuthStore, staffGuardRole } from "@/store/auth-store";
import { adminReturnPathFromRoute } from "@/lib/sanitize-admin-next";
import { BRANDING } from "@/lib/branding";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";

const NAV = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/products", icon: Boxes, label: "Produits" },
  { href: "/admin/orders", icon: ClipboardList, label: "Commandes" },
  { href: "/admin/customers", icon: Users, label: "Clients" },
  { href: "/admin/categories", icon: Boxes, label: "Catégories" },
  { href: "/admin/promotions", icon: Megaphone, label: "Promotions" },
  { href: "/admin/stock", icon: Warehouse, label: "Stocks" },
];

function AdminNavLinks({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-1 flex-col gap-1">
      {NAV.map((item) => {
        const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex min-h-[2.75rem] items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-sidebar-foreground transition hover:bg-sidebar-accent",
              active && "bg-sidebar-accent text-sidebar-accent-foreground",
            )}
          >
            <item.icon className="size-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminChrome({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user);
  const pathname = usePathname();
  const router = useRouter();
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    setMobileNav(false);
  }, [pathname]);

  useEffect(() => {
    if (!staffGuardRole(user)) {
      const target = encodeURIComponent(adminReturnPathFromRoute(pathname));
      router.replace(`/admin/login?next=${target}`);
    }
  }, [user, router, pathname]);

  if (!staffGuardRole(user)) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 p-10">
        <div className="animate-pulse rounded-2xl bg-card px-8 py-6 shadow-inner ring-1 ring-border/70">
          <Image
            src={BRANDING.logo}
            alt={BRANDING.alt}
            width={200}
            height={72}
            className="h-14 w-auto max-w-[12rem] object-contain opacity-95"
          />
        </div>
        <p className="text-sm text-muted-foreground">Vérification des droits…</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh min-h-[100dvh] flex-col md:h-dvh md:max-h-dvh md:flex-row md:overflow-hidden">
      <aside className="hidden w-64 shrink-0 border-r border-border bg-sidebar p-4 pt-[calc(1rem+env(safe-area-inset-top,0px))] md:flex md:h-full md:max-h-full md:flex-col md:overflow-y-auto md:pb-8">
        <Link href="/" className="mb-1 text-sm font-bold tracking-tight text-sidebar-foreground hover:text-primary">
          ← Retour site
        </Link>
        <Link href="/admin" className="mb-6 mt-2 block shrink-0">
          <Image
            src={BRANDING.logo}
            alt={BRANDING.alt}
            width={260}
            height={96}
            className="h-11 w-auto max-w-[12.5rem] object-contain object-left"
          />
        </Link>
        <AdminNavLinks pathname={pathname} />
      </aside>

      <div className="flex min-h-0 flex-1 flex-col md:min-h-0 md:overflow-hidden">
        <header className="sticky top-0 z-40 flex shrink-0 items-center gap-3 border-b border-border bg-muted/30 px-[max(1rem,env(safe-area-inset-left))] pb-3 pt-[max(0.75rem,calc(env(safe-area-inset-top,0px)+0.75rem))] pr-[max(1rem,env(safe-area-inset-right))] backdrop-blur md:hidden">
          <Sheet open={mobileNav} onOpenChange={setMobileNav}>
            <SheetTrigger
              type="button"
              aria-label="Menu administration"
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "size-11 shrink-0 rounded-xl border-border",
              )}
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="left" className="flex w-[85vw] max-w-[20rem] flex-col gap-0 p-0 sm:w-[20rem]">
              <SheetHeader className="border-b border-border p-5 text-left">
                <Link href="/admin" className="mb-4 inline-flex" onClick={() => setMobileNav(false)}>
                  <Image
                    src={BRANDING.logo}
                    alt={BRANDING.alt}
                    width={240}
                    height={88}
                    className="h-10 w-auto max-w-[11rem] object-contain object-left"
                  />
                </Link>
                <SheetTitle className="text-lg">Administration</SheetTitle>
                <Link
                  href="/"
                  onClick={() => setMobileNav(false)}
                  className="mt-2 text-muted-foreground text-sm font-normal hover:text-foreground"
                >
                  ← Retour site
                </Link>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-4">
                <AdminNavLinks pathname={pathname} onNavigate={() => setMobileNav(false)} />
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/admin" className="min-w-0 shrink-0" aria-label={BRANDING.alt}>
            <Image
              src={BRANDING.logo}
              alt={BRANDING.alt}
              width={200}
              height={72}
              className="h-9 w-auto max-w-[7.75rem] object-contain md:hidden"
              priority={false}
            />
          </Link>
          <Link
            href="/"
            className="ml-auto shrink-0 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Site
          </Link>
        </header>

        <main className="min-h-0 flex-1 overflow-x-auto overflow-y-auto bg-muted/20 p-4 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] md:p-8">
          <div className="mx-auto w-full max-w-[min(100%,120rem)] min-w-0">{children}</div>
        </main>
      </div>
    </div>
  );
}
