import type { ReactNode } from "react";

export function LegalDocRoot({
  title,
  meta,
  children,
}: {
  title: string;
  meta?: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 pb-[max(5rem,env(safe-area-inset-bottom))] pt-[max(3.5rem,calc(env(safe-area-inset-top,0px)+2rem))] md:px-8 md:pb-28 md:pt-[max(4rem,calc(env(safe-area-inset-top,0px)+3rem))]">
      <h1 className="text-[1.75rem] font-bold tracking-tight text-foreground sm:text-4xl">{title}</h1>
      {meta ? <p className="mt-4 text-xs text-muted-foreground sm:text-sm">{meta}</p> : null}
      <div className="mt-10 space-y-10 text-sm leading-relaxed text-muted-foreground sm:text-base">{children}</div>
    </article>
  );
}

export function LegalDocSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
