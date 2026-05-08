"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { BRANDING } from "@/lib/branding";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

const sizeHeights = {
  /** Barre nav dense, admin mobile */
  sm: "h-8 max-h-8 max-w-[7.5rem]",
  /** Défaut header / footer / auth */
  md: "h-10 max-h-10 max-w-[10.5rem]",
  /** Splash ou héros onboarding */
  lg: "h-28 max-h-28 sm:h-32 sm:max-h-32 max-w-[min(20rem,calc(100vw-2rem))]",
} as const;

export function LogoMark({
  className = "",
  inverse = false,
  size = "md",
  priority = false,
}: {
  className?: string;
  /** Fond sombre (colonne marketing auth) — relief sans modifier les couleurs du fichier. */
  inverse?: boolean;
  size?: keyof typeof sizeHeights;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "inline-flex max-w-full items-center rounded-xl",
        inverse && "drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]",
        className,
      )}
    >
      <Image
        src={BRANDING.logo}
        alt={BRANDING.alt}
        width={320}
        height={120}
        priority={priority}
        className={cn("w-auto object-contain object-left", sizeHeights[size])}
        sizes="(max-width: 768px) 160px, 200px"
      />
    </div>
  );
}

export function AnimatedLogoHero() {
  return (
    <MotionLink
      href="/"
      className="inline-flex rounded-2xl bg-card/85 px-3 py-2 shadow-[0_20px_50px_-28px_rgb(22_163_74_/_0.5)] backdrop-blur-sm ring-1 ring-border/60"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <LogoMark priority size="md" />
    </MotionLink>
  );
}
