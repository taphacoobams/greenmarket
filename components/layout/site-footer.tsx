import Link from "next/link";
import { BRANDING } from "@/lib/branding";
import { LogoMark } from "@/components/layout/logo";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/shop", label: "Catalogue" },
  { href: "/categories", label: "Catégories" },
  { href: "/promotions", label: "Promotions" },
  { href: "/about", label: "À propos" },
  { href: "/login", label: "Connexion" },
  { href: "/register", label: "Inscription" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy", label: "Confidentialité" },
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/cgu", label: "CGU" },
];

/** Liens réseaux — remplacez par vos URLs officielles. */
const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/greenmarket.sn",
    icon: "instagram",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@greenmarket.sn",
    icon: "tiktok",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/greenmarket.sn",
    icon: "facebook",
  },
] as const;

function SocialIcon({ name }: { name: (typeof socialLinks)[number]["icon"] }) {
  const cls = "size-5 shrink-0";
  if (name === "instagram") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    );
  }
  if (name === "facebook") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    );
  }
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/80 bg-muted/40 pb-[calc(6rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 md:grid-cols-3 md:px-8 lg:px-10">
        <div className="space-y-4">
          <Link href="/" className="inline-flex rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring/60">
            <LogoMark />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Chaîne courte, producteurs partenaires, contrôle qualité en chambre froide pour des légumes croquants.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">Navigation</p>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link className="hover:text-foreground" href={l.href}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <p className="text-sm font-semibold">Contact</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Support 7j/7 · +221 33 000 00 00
            <br />
            bonjour@greenmarket.sn
          </p>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Réseaux</p>
            <ul className="mt-3 flex flex-wrap gap-3">
              {socialLinks.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-2 rounded-2xl border border-border/80 bg-background/90 px-3 py-2 text-sm font-medium text-foreground shadow-sm transition",
                      "hover:border-primary/40 hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    <SocialIcon name={s.icon} />
                    <span>{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-border/60 px-4 py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 text-center text-[0.75rem] text-muted-foreground md:flex-row md:flex-wrap md:justify-center md:gap-x-2 md:gap-y-2 md:text-left">
          <p className="md:mr-2">
            © {new Date().getFullYear()} {BRANDING.name} — tous droits réservés.
          </p>
          <nav aria-label="Informations légales" className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
            {legalLinks.map((item, i) => (
              <span key={item.href} className="inline-flex items-center gap-x-1">
                {i > 0 ? <span aria-hidden className="text-border">|</span> : null}
                <Link href={item.href} className="underline-offset-4 hover:text-foreground hover:underline">
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
