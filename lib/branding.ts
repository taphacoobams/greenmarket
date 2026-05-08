/**
 * Identité visuelle officielle Green Market — logo unique {@link BRANDING.logo}
 * sans recadrage ni filtre de couleur (couleurs d’origine du fichier PNG).
 */

export const BRANDING = {
  name: "Green Market",
  logo: "/logo.png",
  favicon: "/logo.png",
  alt: "Green Market Logo",
} as const;

/** Avatar définitif local (`public/avatars/avatar.png`) — tous les comptes mock & sessions démo. */
export const DEMO_AVATAR_URL = "/avatars/avatar.png" as const;

/** URL du logo pour e-mails ou intégrations externes (forcer un domaine absolu). */
export function absoluteLogoUrl(siteOrigin: string): string {
  const base = siteOrigin.trim().replace(/\/$/, "");
  return `${base}${BRANDING.logo}`;
}

/** Bloc `<img>` prêt pour e-mails HTML transactionnels (ligne sensible au XSS si `origin` vient du user). */
export function systemEmailLogoImgTag(siteOrigin: string): string {
  const esc = BRANDING.alt.replace(/"/g, "&quot;");
  return `<img src="${absoluteLogoUrl(siteOrigin)}" alt="${esc}" width="180" height="60" style="display:block;margin:0 auto 20px;height:auto;max-width:180px;width:100%;border:0;line-height:100%;outline:none;text-decoration:none;" />`;
}
