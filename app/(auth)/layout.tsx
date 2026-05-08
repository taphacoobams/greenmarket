export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-dvh min-h-[100dvh] flex-col overflow-hidden bg-gradient-to-br from-brand-light via-background to-background dark:from-primary/15 dark:via-background dark:to-background">
      <div className="pointer-events-none absolute right-0 top-0 size-[480px] rounded-full bg-primary/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-20%] left-[-10%] size-[420px] rounded-full bg-brand-orange/20 blur-[110px]" />
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] pb-[max(3rem,calc(env(safe-area-inset-bottom,0px)+1.25rem))] pt-[max(3rem,calc(env(safe-area-inset-top,0px)+1.25rem))]">
        {children}
      </div>
    </div>
  );
}
