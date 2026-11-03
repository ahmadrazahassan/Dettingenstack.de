"use client";

import { ChevronDown, Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Route } from "next";
import { createContext, type ReactNode, use, useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/controls";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/cn";

type CompareItem = { slug: string; name: string };
type CompareContextValue = {
  items: CompareItem[];
  toggle: (item: CompareItem) => void;
  remove: (slug: string) => void;
  clear: () => void;
  has: (slug: string) => boolean;
};

const MAX = 4;
// sessionStorage is strictly necessary here: it only keeps the user's own selection (§10.10, § 25 TDDDG).
const STORAGE_KEY = "dettingenstack.vergleich";
const CompareContext = createContext<CompareContextValue | null>(null);

export function useCompare() {
  const ctx = use(CompareContext);
  if (!ctx) throw new Error("useCompare must be used inside <CompareProvider>");
  return ctx;
}

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CompareItem[]>([]);
  const toast = useToast();

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored) as CompareItem[]);
    } catch {
      // Storage blocked: the tray still works for this page view.
    }
  }, []);

  const persist = (next: CompareItem[]) => {
    setItems(next);
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  };

  const value: CompareContextValue = {
    items,
    has: (slug) => items.some((i) => i.slug === slug),
    remove: (slug) => persist(items.filter((i) => i.slug !== slug)),
    clear: () => persist([]),
    toggle: (item) => {
      if (items.some((i) => i.slug === item.slug)) {
        persist(items.filter((i) => i.slug !== item.slug));
      } else if (items.length >= MAX) {
        toast(
          "Du kannst bis zu vier Tools vergleichen. Entferne zuerst eines.",
        );
      } else {
        persist([...items, item]);
      }
    },
  };

  return (
    <CompareContext value={value}>
      {children}
      <CompareTray />
    </CompareContext>
  );
}

export function CompareToggle({
  slug,
  name,
  className,
}: CompareItem & { className?: string }) {
  const { has, toggle } = useCompare();
  return (
    <Checkbox
      className={className}
      label="Zum Vergleich hinzufügen"
      checked={has(slug)}
      onCheckedChange={() => toggle({ slug, name })}
    />
  );
}

function CompareTray() {
  const { items, remove, clear } = useCompare();
  const [collapsed, setCollapsed] = useState(false);
  const href =
    `/vergleichen?tools=${items.map((i) => i.slug).join(",")}` as Route;

  return (
    <AnimatePresence>
      {items.length > 0 && (
        <motion.aside
          aria-label="Vergleichsauswahl"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          className="fixed inset-x-0 bottom-0 z-45 border-neutral-200 border-t bg-white shadow-lg"
        >
          <div className="mx-auto flex max-w-page items-center gap-4 px-4 py-3 sm:px-6">
            <button
              type="button"
              onClick={() => setCollapsed((c) => !c)}
              aria-expanded={!collapsed}
              className="flex shrink-0 items-center gap-2 font-semibold font-ui text-[15px] text-black"
            >
              Vergleich ({items.length}/{MAX})
              <ChevronDown
                aria-hidden
                className={cn(
                  "size-4 transition-transform",
                  collapsed && "rotate-180",
                )}
                strokeWidth={2}
              />
            </button>

            {!collapsed && (
              <ul className="hidden flex-1 gap-2 md:flex">
                {Array.from({ length: MAX }, (_, i) => {
                  const item = items[i];
                  return item ? (
                    <motion.li
                      layout
                      key={item.slug}
                      className="flex h-12 min-w-0 flex-1 items-center justify-between gap-2 rounded-md border border-neutral-200 px-3"
                    >
                      <span className="truncate font-ui font-medium text-[14px] text-black">
                        {item.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => remove(item.slug)}
                        aria-label={`${item.name} aus dem Vergleich entfernen`}
                        className="flex size-7 shrink-0 items-center justify-center rounded-sm text-neutral-600 hover:bg-neutral-100 hover:text-black"
                      >
                        <X aria-hidden className="size-4" strokeWidth={2} />
                      </button>
                    </motion.li>
                  ) : (
                    <li
                      // biome-ignore lint/suspicious/noArrayIndexKey: empty slots have no identity.
                      key={`leer-${i}`}
                      className="flex h-12 flex-1 items-center justify-center gap-1.5 rounded-md border border-neutral-300 border-dashed font-ui text-[14px] text-neutral-600"
                    >
                      <Plus aria-hidden className="size-4" strokeWidth={1.75} />
                      Tool hinzufügen
                    </li>
                  );
                })}
              </ul>
            )}

            <div className="ml-auto flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={clear}
                className="hidden h-10 rounded-md px-3 font-medium font-ui text-[14px] text-black hover:bg-neutral-100 sm:block"
              >
                Auswahl löschen
              </button>
              <ButtonLink
                href={href}
                size="sm"
                aria-disabled={items.length < 2 || undefined}
                tabIndex={items.length < 2 ? -1 : undefined}
              >
                Vergleichen ({items.length})
              </ButtonLink>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
