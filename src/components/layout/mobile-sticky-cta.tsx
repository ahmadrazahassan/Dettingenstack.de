"use client";

import { type ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/cn";

// Mobile bottom bar on reviews and comparisons (§10.10). Appears once `afterId` has scrolled out
// of view, hides again while the footer is visible.
export function MobileStickyCTA({
  afterId,
  children,
}: {
  afterId: string;
  children: ReactNode;
}) {
  const [pastHero, setPastHero] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(afterId);
    const footer = document.getElementById("seitenende");
    const observers: IntersectionObserver[] = [];
    if (hero) {
      const o = new IntersectionObserver(([e]) =>
        setPastHero(!e?.isIntersecting && (e?.boundingClientRect.top ?? 0) < 0),
      );
      o.observe(hero);
      observers.push(o);
    }
    if (footer) {
      const o = new IntersectionObserver(([e]) =>
        setFooterVisible(Boolean(e?.isIntersecting)),
      );
      o.observe(footer);
      observers.push(o);
    }
    return () => {
      for (const o of observers) o.disconnect();
    };
  }, [afterId]);

  const visible = pastHero && !footerVisible;
  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-45 flex h-16 items-center gap-3 border-neutral-200 border-t bg-white px-4 shadow-lg transition-transform duration-300 ease-brand lg:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      {children}
    </div>
  );
}
