"use client";

import { ArrowRight } from "lucide-react";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import {
  type FormEvent,
  type KeyboardEvent,
  useId,
  useMemo,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { type SearchEntry, searchEntries, searchHref } from "@/lib/search";

// Large search field with attached square button (§11.1). Typing shows instant results;
// Enter opens the highlighted result, or the full results page /suche?q= when nothing is highlighted.
export function HeroSearch({
  index,
  initialQuery = "",
}: {
  index: SearchEntry[];
  initialQuery?: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const id = useId();
  const listId = `${id}-ergebnisse`;

  const results = useMemo(() => searchEntries(index, query, 6), [index, query]);
  const showList = open && query.trim().length > 0;

  const go = (href: string) => {
    setOpen(false);
    router.push(href as Route);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const hit = results[active];
    if (hit) go(hit.href);
    else if (query.trim()) go(searchHref(query));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, -1));
    } else if (e.key === "Escape") {
      setOpen(false);
      setActive(-1);
    }
  };

  return (
    <search className="relative">
      <form onSubmit={onSubmit} className="flex w-full">
        <label htmlFor={id} className="sr-only">
          Software, Kategorie oder Vergleich suchen
        </label>
        <input
          id={id}
          type="search"
          role="combobox"
          autoComplete="off"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={
            active >= 0 ? `${listId}-${active}` : undefined
          }
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(-1);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={onKeyDown}
          placeholder="Software, Kategorie oder Vergleich suchen …"
          className="h-14 min-w-0 flex-1 rounded-l-md border border-neutral-300 border-r-0 bg-white px-5 font-ui text-[17px] text-black outline-none placeholder:text-neutral-500 focus-visible:border-black focus-visible:shadow-[0_0_0_3px_var(--color-brand)] lg:h-16 [&::-webkit-search-cancel-button]:hidden"
        />
        <Button type="submit" size="lg" className="h-14 rounded-l-none lg:h-16">
          Suchen
        </Button>
      </form>

      {showList && (
        <div
          id={listId}
          role="listbox"
          aria-label="Sofort-Ergebnisse"
          className="absolute inset-x-0 top-full z-40 mt-2 overflow-hidden rounded-lg border border-neutral-200 bg-white p-2 shadow-lg"
        >
          {results.length === 0 ? (
            <p className="type-small px-3 py-4 text-neutral-700">
              Keine Sofort-Treffer für „{query.trim()}“. Mit Enter durchsuchst
              du alle Seiten.
            </p>
          ) : (
            results.map((r, i) => (
              <button
                key={r.href}
                id={`${listId}-${i}`}
                type="button"
                role="option"
                aria-selected={i === active}
                // mousedown instead of click: the input's blur would close the list first.
                onMouseDown={(e) => {
                  e.preventDefault();
                  go(r.href);
                }}
                onMouseEnter={() => setActive(i)}
                className={cn(
                  "flex w-full items-center justify-between gap-4 rounded-md px-3 py-2.5 text-left font-ui text-[15px] text-black",
                  i === active && "bg-neutral-100",
                )}
              >
                <span className="min-w-0 truncate">{r.label}</span>
                <span className="flex shrink-0 items-center gap-2 text-[13px] text-neutral-600">
                  {r.group}
                  <ArrowRight
                    aria-hidden
                    className="size-4"
                    strokeWidth={1.75}
                  />
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </search>
  );
}
