/** Limite les redirections après login admin aux chemins sous `/admin`. */
export function sanitizeAdminNextHref(raw: string | undefined): string {
  if (!raw || !raw.startsWith("/")) return "/admin";
  if (!(raw === "/admin" || raw.startsWith("/admin/"))) return "/admin";
  return raw;
}

/** Cible après login admin depuis l’URL courante (pour `next`). */
export function adminReturnPathFromRoute(pathname: string): string {
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return pathname;
  return "/admin";
}
