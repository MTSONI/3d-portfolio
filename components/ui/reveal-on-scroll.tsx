"use client";

import { type FC, type ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  scale?: boolean;
}

export const RevealOnScroll: FC<RevealOnScrollProps> = ({
  children,
  className = "",
  delay = 0,
  scale = false,
}) => {
  const { ref, visible } = useInView(0.12);

  return (
    <div
      ref={ref}
      className={`${visible ? (scale ? "animate-reveal-scale" : "animate-reveal") : "opacity-0"} ${className}`}
      style={visible && delay > 0 ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
};
