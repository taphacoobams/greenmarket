import { AdminLoginForm } from "@/features/auth/admin-login-form";
import { sanitizeAdminNextHref } from "@/lib/sanitize-admin-next";

type Props = {
  searchParams: Promise<{ next?: string }>;
};

export const metadata = { title: "Connexion équipe" };

export default async function AdminLoginPage({ searchParams }: Props) {
  const sp = await searchParams;
  const nextHref = sanitizeAdminNextHref(sp.next);

  return <AdminLoginForm nextHref={nextHref} />;
}
