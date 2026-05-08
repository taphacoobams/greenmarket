/** JS-friendly design tokens (mirrors CSS variables in app/globals.css) */
export const colors = {
  primary: "#16A34A",
  primaryDark: "#166534",
  primaryLight: "#DCFCE7",
  accentOrange: "#F97316",
  background: "#F8FAFC",
  textDark: "#111827",
  textGray: "#6B7280",
  border: "#E5E7EB",
} as const;

export const radii = {
  card: "1rem",
  button: "0.75rem",
} as const;
