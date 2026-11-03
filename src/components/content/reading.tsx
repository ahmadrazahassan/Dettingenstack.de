"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { useActiveSection } from "@/lib/use-active-section";

/* ───── Sticky table of contents with scroll-spy ───── */

export function TableOfContents({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  const active = useActiveSection(ids, 140);

  return (
    <nav aria-label="Inhaltsverzeichnis" className="sticky top-28">
      <p className="type-eyebrow mb-3">Inhaltsverzeichnis</p>
      <ul className="flex flex-col border-neutral-200 border-l">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              className={cn(
                "-ml-px block border-l-2 py-1.5 pl-4 font-ui text-[14px] transition-colors",
                active === item.id
                  ? "border-black font-semibold text-black"
                  : "border-transparent text-neutral-600 hover:text-black",
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ───── 3px black reading progress under the header ───── */

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-16 z-40 h-[3px] lg:top-[72px]"
    >
      <div
        className="h-full origin-left bg-black"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
