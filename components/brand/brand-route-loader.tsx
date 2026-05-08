"use client";

import Image from "next/image";
import { BRANDING } from "@/lib/branding";
import { cn } from "@/lib/utils";

export function BrandRouteLoader({
  message = "Chargement…",
  className,
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={cn(
        "flex min-h-[min(520px,calc(100dvh-env(safe-area-inset-bottom)-8rem))] flex-col items-center justify-center gap-5 bg-background px-6 py-16",
        className,
      )}
    >
      <div className="animate-pulse">
        <Image
          src={BRANDING.logo}
          alt={BRANDING.alt}
          width={224}
          height={80}
          className="h-16 w-auto max-w-[min(224px,calc(100vw-3rem))] object-contain"
          sizes="224px"
        />
      </div>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
