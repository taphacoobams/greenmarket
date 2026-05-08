"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Bell,
  Heart,
  Menu,
  Percent,
  Search,
  Truck,
  User2,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { LogoMark } from "@/components/layout/logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth-store";
import { useCartStore } from "@/store/cart-store";
import { useNotificationStore } from "@/store/notification-store";
import { CartSheet } from "@/features/cart/cart-sheet";
import { loginHref } from "@/features/checkout/checkout-auth-gate";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";
import { MOCK_CATEGORIES } from "@/mock/categories";
import { MOCK_PRODUCTS } from "@/mock/products";
import { formatCurrency, formatDateFr } from "@/lib/format";
import { formatKgFr } from "@/lib/product-pricing";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMounted } from "@/hooks/use-mounted";

const nav = [
  { href: "/", label: "Accueil" },
  { href: "/shop", label: "Catalogue" },
  { href: "/categories", label: "Catégories" },
  { href: "/promotions", label: "Promos" },
  { href: "/about", label: "À propos" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const lines = useCartStore((s) => s.lines);
  const promoCode = useCartStore((s) => s.promoCode);
  const getTotals = useCartStore((s) => s.getTotals);
  const unread = useNotificationStore((s) => s.items.filter((n) => !n.read).length);
  const notificationItems = useNotificationStore((s) => s.items);
  const markNotificationRead = useNotificationStore((s) => s.markRead);
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const loginNext = useMemo(() => encodeURIComponent(pathname === "/login" ? "/" : pathname), [pathname]);
  const searchHref = useMemo(() => `/search?q=${encodeURIComponent(search)}`, [search]);

  const linesDetail = lines.map((l) => ({
    ...l,
    p: MOCK_PRODUCTS.find((x) => x.id === l.productId),
  }));

  const cartTotals = useMemo(() => getTotals(), [lines, promoCode, getTotals]);

  const notificationPreview = useMemo(
    () =>
      [...notificationItems].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ).slice(0, 5),
    [notificationItems],
  );

  const mounted = useMounted();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 pt-[env(safe-area-inset-top,0px)] backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 top-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-3 sm:gap-3 md:px-6 lg:px-10">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            type="button"
            aria-label="Menu"
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "shrink-0 rounded-2xl md:hidden border-border",
            )}
          >
            <Menu className="size-5" />
            <span className="sr-only">Menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="gap-0 p-0">
            <SheetHeader className="border-b border-border p-5 text-left">
              <SheetTitle className="text-lg">Explorer</SheetTitle>
              <p className="text-muted-foreground text-sm font-normal leading-relaxed">
                La fraîcheur du champ, depuis votre canapé.
              </p>
            </SheetHeader>
            <ScrollArea className="max-h-[75vh] p-4">
              <div className="flex flex-col gap-1">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "rounded-2xl px-4 py-2.5 text-sm font-semibold hover:bg-accent",
                      pathname === item.href && "bg-accent",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="mt-8 space-y-2">
                <p className="px-4 text-[0.7rem] font-bold uppercase tracking-wider text-muted-foreground">
                  Catégories
                </p>
                <div className="flex flex-col gap-1">
                  {MOCK_CATEGORIES.slice(0, 8).map((c) => (
                    <Link
                      key={c.id}
                      href={`/categories/${c.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-2xl px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>

        <Link href="/" className="shrink-0">
          <LogoMark priority />
        </Link>

        <Badge
          variant="secondary"
          className="mx-1 hidden h-11 items-center gap-1.5 rounded-full border border-primary/25 bg-secondary/90 px-3 text-[0.7rem] xl:inline-flex"
        >
          <Truck className="size-3.5 shrink-0 text-primary" aria-hidden /> Avant minuit → livré demain · Dakar
        </Badge>

        <div className="relative mx-auto hidden w-full max-w-xl flex-[2] lg:block">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tomates bio, Dakar…"
            className="h-12 rounded-[1rem] border-border bg-card pl-11 pr-[5.75rem]"
            onKeyDown={(e) => {
              if (e.key === "Enter") window.location.assign(searchHref);
            }}
          />
          <Button asChild variant="outline" size="xs" className="absolute right-2 top-1/2 inline-flex size-16 -translate-y-1/2 rounded-xl px-3">
            <Link href={searchHref}>OK</Link>
          </Button>
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-2xl"
            aria-label="Favoris"
            onClick={() => router.push(user ? "/favorites" : loginHref("/favorites"))}
          >
            <Heart className="size-5 text-rose-500" />
          </Button>
          <Button asChild variant="ghost" size="icon" className="hidden lg:inline-flex rounded-2xl" aria-label="Promotions">
            <Link href="/promotions">
              <Percent className="size-5 text-brand-orange" />
            </Link>
          </Button>
          <CartSheet linesDetail={linesDetail} cartCount={cartTotals.count} totals={cartTotals} />
          <Button asChild variant="ghost" size="icon" className="rounded-2xl lg:hidden" aria-label="Rechercher">
            <Link href="/search">
              <Search className="size-5" />
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger
              type="button"
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "relative rounded-2xl")}
              aria-label="Notifications"
            >
              <Bell className="size-5" />
              {unread > 0 && (
                <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-brand-orange ring-2 ring-background" />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[min(calc(100vw-1.5rem),22rem)] overflow-hidden p-0">
              <div className="border-b border-border/80 bg-muted/30 px-3 py-2">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="px-0 py-0 text-foreground">Notifications</DropdownMenuLabel>
                </DropdownMenuGroup>
                {unread > 0 && (
                  <p className="mt-0.5 text-[0.7rem] text-muted-foreground">
                    {unread} non lue{unread > 1 ? "s" : ""}
                  </p>
                )}
              </div>
              <ScrollArea className="max-h-[min(50vh,280px)]">
                <DropdownMenuGroup className="p-1">
                  {notificationPreview.length === 0 ? (
                    <p className="px-3 py-8 text-center text-sm text-muted-foreground">Aucune notification pour l’instant.</p>
                  ) : (
                    notificationPreview.map((n) => (
                      <DropdownMenuItem
                        key={n.id}
                        className="flex cursor-pointer flex-col items-start gap-0.5 rounded-xl px-3 py-2.5 text-left"
                        onClick={() => markNotificationRead(n.id)}
                      >
                        <span className={`line-clamp-1 w-full text-sm ${!n.read ? "font-semibold text-foreground" : "text-foreground"}`}>
                          {n.title}
                        </span>
                        <span className="line-clamp-2 w-full text-xs text-muted-foreground">{n.message}</span>
                        <span className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">
                          {formatDateFr(n.createdAt)}
                        </span>
                      </DropdownMenuItem>
                    ))
                  )}
                </DropdownMenuGroup>
              </ScrollArea>
              <DropdownMenuSeparator className="my-0" />
              <DropdownMenuGroup className="p-1">
                <DropdownMenuItem className="justify-center rounded-xl font-medium text-primary" onClick={() => router.push("/notifications")}>
                  Voir tout
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeToggle />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                type="button"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "h-11 gap-2 rounded-full border-border px-2",
                )}
                aria-label="Menu compte"
              >
                <Avatar className="size-8 shrink-0">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="hidden max-w-[7rem] truncate text-[0.8rem] font-semibold md:inline">{user.name.split(" ").at(0)}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[200px]">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => router.push("/profile")}>Profil</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/orders")}>Commandes</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/settings")}>Paramètres</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onSelect={() => logout()}>Déconnexion</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="rounded-2xl"
                aria-label="Connexion — mon compte"
                onClick={() => router.push(`/login?next=${loginNext}`)}
              >
                <User2 className="size-5" />
              </Button>
              <Button asChild size="sm" className="hidden rounded-xl sm:inline-flex bg-primary hover:bg-brand-dark hover:text-white">
                <Link href="/register">Inscription</Link>
              </Button>
            </>
          )}
          {mounted && (
            <Badge variant="outline" className="hidden shrink-0 items-center rounded-2xl border-border px-2.5 py-2 text-[0.7rem] xl:inline-flex">
              <span className="tabular-nums">{cartTotals.count} art.</span>
              <span className="mx-2 text-muted-foreground">·</span>
              <span className="tabular-nums">{formatKgFr(cartTotals.totalKg)} kg</span>
              <span className="mx-2 text-muted-foreground">·</span>
              <span className="tabular-nums">{formatCurrency(cartTotals.total)}</span>
            </Badge>
          )}
        </div>
      </div>

      <nav className="hidden border-t border-border/60 bg-muted/25 md:flex">
        <div className="mx-auto flex w-full max-w-7xl px-8 py-2.5 text-[0.9rem] font-medium lg:px-10">
          <div className="flex flex-wrap gap-8">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-muted-foreground transition hover:text-foreground py-2",
                  pathname === item.href && "border-b-[3px] border-primary text-foreground pb-px",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
