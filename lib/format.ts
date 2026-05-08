import { format as formatDate } from "date-fns";
import { fr } from "date-fns/locale";

export function formatCurrency(xof: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(xof) + " FCFA";
}

export function formatCompact(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "k";
  return String(n);
}

export function formatDateFr(iso: string, pattern = "d MMM yyyy"): string {
  return formatDate(new Date(iso), pattern, { locale: fr });
}

export function formatDateTimeFr(iso: string): string {
  return formatDate(new Date(iso), "d MMM yyyy 'à' HH:mm", { locale: fr });
}
