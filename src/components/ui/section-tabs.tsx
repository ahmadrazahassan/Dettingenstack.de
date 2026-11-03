"use client";

import { ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useActiveSection } from "@/lib/use-active-section";

// Sticky anchor tabs with scroll-spy (§10.5). Anchors, not hidden panels: all content stays in the HTML.
export function SectionTabs({
  items,
  label = "Abschnitte",
  className,
}: {
  items: { id: string; label: string }[];
  label?: string;
  className?: string;
}) {
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  const active = useActiveSection(ids);
  const [canScroll, setCanScroll] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  // Keep the active tab visible inside the horizontally scrolling list (without moving the page).
  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>(`a[href="#${active}"]`);
    if (!list || !link) return;
    const left = link.offsetLeft - list.offsetLeft;
    const visible =
      left >= list.scrollLeft &&
      left + link.offsetWidth <= list.scrollLeft + list.clientWidth - 48;
    if (!visible)
      list.scrollTo({ left: Math.max(0, left - 16), behavior: "smooth" });
  }, [active]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const update = () =>
      setCanScroll(list.scrollLeft + list.clientWidth < list.scrollWidth - 4);
    update();
    list.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      list.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <nav
      aria-label={label}
      className={cn(
        "sticky top-16 z-40 border-neutral-200 border-b bg-white lg:top-[72px]",
        className,
      )}
    >
      <div className="relative mx-auto max-w-page px-4 sm:px-6">
        <ul
          ref={listRef}
          className="flex gap-7 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "location" : undefined}
                className={cn(
                  "-mb-px flex h-[52px] items-center whitespace-nowrap border-b-2 type-ui transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:-outline-offset-2",
                  active === item.id
                    ? "border-black text-black"
                    : "border-transparent text-neutral-600 hover:text-black",
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        {canScroll && (
          <button
            type="button"
            aria-label="Weitere Abschnitte anzeigen"
            onClick={() =>
              listRef.current?.scrollBy({ left: 200, behavior: "smooth" })
            }
            className="absolute top-0 right-0 flex h-[52px] w-12 items-center justify-center border-neutral-200 border-l bg-white text-black sm:right-6"
          >
            <ChevronRight aria-hidden className="size-4" strokeWidth={2} />
          </button>
        )}
      </div>
    </nav>
  );
}
