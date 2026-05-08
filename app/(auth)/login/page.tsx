import { LoginForm } from "@/features/auth/login-form";

type Props = {
  searchParams: Promise<{ next?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const sp = await searchParams;
  return <LoginForm nextHref={sp.next ?? "/"} />;
}
