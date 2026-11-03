"use client";

import { type ReactNode, useState } from "react";
import { cn } from "@/lib/cn";

// Topic tabs above the guide grid (§11.13). Cards are rendered on the server and passed in.
export function GuideFilter({
  topics,
  items,
}: {
  topics: readonly string[];
  items: { key: string; topic: string; card: ReactNode }[];
}) {
  const [active, setActive] = useState<string>("Alle");
  const tabs = ["Alle", ...topics];
  const visible =
    active === "Alle" ? items : items.filter((i) => i.topic === active);

  return (
    <>
      <div
        role="tablist"
        aria-label="Ratgeber nach Thema"
        className="flex gap-6 overflow-x-auto border-neutral-200 border-b"
      >
        {tabs.map((t) => {
          const count =
            t === "Alle"
              ? items.length
              : items.filter((i) => i.topic === t).length;
          return (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={active === t}
              onClick={() => setActive(t)}
              className={cn(
                "-mb-px shrink-0 border-b-2 py-3 font-medium font-ui text-[15px] transition-colors",
                active === t
                  ? "border-black text-black"
                  : "border-transparent text-neutral-600 hover:text-black",
              )}
            >
              {t} <span className="text-neutral-500">({count})</span>
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        aria-label={active}
        className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3"
      >
        {visible.map((i) => (
          <div key={i.key}>{i.card}</div>
        ))}
      </div>
    </>
  );
}
