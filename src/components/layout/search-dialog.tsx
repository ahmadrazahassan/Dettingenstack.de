"use client";

import { ArrowRight, Search, X } from "lucide-react";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { Dialog } from "radix-ui";
import { type KeyboardEvent, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { type SearchEntry, searchEntries, searchHref } from "@/lib/search";

// Other components (e.g. the hero search) open the dialog with: dispatchEvent(new CustomEvent(OPEN_SEARCH_EVENT, { detail: query }))
export const OPEN_SEARCH_EVENT = "dettingenstack:suche-oeffnen";

// Searches categories, software, comparisons, guides, tools and pages (§12.5). Enter without a
// highlighted result opens the full results page /suche.
export function SearchDialog({ index }: { index: SearchEntry[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(/mac|iphone|ipad/i.test(navigator.userAgent));
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = (e: Event) => {
      setQuery(String((e as CustomEvent<string>).detail ?? ""));
      setActiveIndex(0);
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_SEARCH_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_SEARCH_EVENT, onOpen);
    };
  }, []);

  const results = useMemo(() => {
    if (!query.trim())
      return index
        .filter((r) => r.group === "Kategorien" || r.group === "Vergleiche")
        .slice(0, 6);
    return searchEntries(index, query, 12);
  }, [query, index]);

  const go = (href: string) => {
    setOpen(false);
    setQuery("");
    router.push(href as Route);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const hit = results[activeIndex];
      if (hit) go(hit.href);
      else if (query.trim()) go(searchHref(query));
    }
  };

  const groups = [...new Set(results.map((r) => r.group))];

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setQuery("");
      }}
    >
      <Dialog.Trigger className="inline-flex h-10 items-center gap-2 rounded-md px-3 font-medium font-ui text-[15px] text-black transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-black">
        <Search aria-hidden className="size-[18px]" strokeWidth={1.75} />
        <span className="hidden sm:inline">Suchen</span>
        <kbd className="hidden h-6 items-center whitespace-nowrap rounded-sm border border-neutral-300 px-1.5 font-ui text-[12px] text-neutral-600 lg:inline-flex">
          {isMac ? "⌘ K" : "Strg K"}
        </kbd>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-70 bg-black/40 data-[state=open]:animate-[fade-in_150ms]" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed top-4 left-1/2 z-70 w-[calc(100vw-2rem)] max-w-[640px] -translate-x-1/2 overflow-hidden rounded-lg bg-white shadow-lg data-[state=open]:animate-[panel-in_200ms_var(--ease-brand)] sm:top-[12vh]"
        >
          <Dialog.Title className="sr-only">
            Dettingenstack durchsuchen
          </Dialog.Title>
          <div className="flex h-14 items-center gap-3 border-neutral-200 border-b px-4">
            <Search
              aria-hidden
              className="size-5 shrink-0 text-neutral-600"
              strokeWidth={1.75}
            />
            <input
              // biome-ignore lint/a11y/noAutofocus: the dialog exists to type a query.
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={onKeyDown}
              placeholder="Software, Kategorie oder Vergleich suchen …"
              aria-label="Suchbegriff"
              aria-controls="suchergebnisse"
              aria-activedescendant={
                results[activeIndex] ? `ergebnis-${activeIndex}` : undefined
              }
              className="h-full flex-1 bg-transparent font-ui text-[17px] text-black outline-none placeholder:text-neutral-500"
            />
            <Dialog.Close
              aria-label="Suche schließen"
              className="flex size-9 items-center justify-center rounded-md text-black hover:bg-neutral-100"
            >
              <X aria-hidden className="size-5" strokeWidth={1.75} />
            </Dialog.Close>
          </div>

          <div
            id="suchergebnisse"
            role="listbox"
            aria-label="Suchergebnisse"
            className="max-h-[60vh] overflow-y-auto p-2"
          >
            {results.length === 0 ? (
              <p className="type-body px-3 py-8 text-center text-neutral-700">
                Für „{query}“ haben wir nichts gefunden. Versuch es mit einem
                anderen Begriff.
              </p>
            ) : (
              groups.map((group) => (
                <div key={group} className="py-1">
                  <p className="type-eyebrow px-3 py-2">
                    {query ? group : "Vorschläge"}
                  </p>
                  {results.map((r, i) =>
                    r.group === group ? (
                      <button
                        key={r.href}
                        id={`ergebnis-${i}`}
                        type="button"
                        role="option"
                        aria-selected={i === activeIndex}
                        onMouseEnter={() => setActiveIndex(i)}
                        onClick={() => go(r.href)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left font-ui text-[15px] text-black",
                          i === activeIndex && "bg-neutral-100",
                        )}
                      >
                        {r.label}
                        <ArrowRight
                          aria-hidden
                          className="size-4 text-neutral-600"
                          strokeWidth={1.75}
                        />
                      </button>
                    ) : null,
                  )}
                </div>
              ))
            )}
          </div>
          <div className="flex items-center gap-4 border-neutral-200 border-t bg-neutral-50 px-4 py-2.5 type-ui-sm text-neutral-600">
            <span>↑ ↓ auswählen</span>
            <span>Enter öffnen</span>
            <span>Esc schließen</span>
            {query.trim() && (
              <button
                type="button"
                onClick={() => go(searchHref(query))}
                className="ml-auto font-medium text-black underline-offset-4 hover:underline"
              >
                Alle Ergebnisse
              </button>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
