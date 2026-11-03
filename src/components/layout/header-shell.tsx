"use client";

import { type ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export function HeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-neutral-200 border-b bg-white transition-shadow duration-200",
        scrolled && "shadow-xs",
      )}
    >
      {children}
    </header>
  );
}
