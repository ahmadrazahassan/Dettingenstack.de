import type { Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Avatar } from "@/components/ui/misc";
import { formatDate } from "@/lib/format";

/* ───── Byline: overlapping avatars, author + editor, meta row ───── */

type Person = { name: string; href: string; photo?: string };

export function Byline({
  author,
  editor,
  updatedAt,
  pricesCheckedAt,
  readingMinutes,
  method = "test",
  label,
}: {
  author: Person;
  editor: Person;
  updatedAt: string;
  pricesCheckedAt?: string;
  readingMinutes?: number;
  /** "analyse" = vendor information only; never claim a test that didn't happen. */
  method?: "test" | "analyse";
  /** Overrides „Getestet von“ / „Analysiert von“, e.g. „Geschrieben von“ for guides. */
  label?: string;
}) {
  const meta = [
    `Aktualisiert am ${formatDate(updatedAt)}`,
    pricesCheckedAt && `Preise geprüft am ${formatDate(pricesCheckedAt)}`,
    readingMinutes && `${readingMinutes} Min. Lesezeit`,
  ].filter(Boolean);
  const samePerson = author.name === editor.name;
  const personLink = (p: Person) => (
    <Link
      href={p.href as Route}
      className="font-semibold text-black underline underline-offset-2"
    >
      {p.name}
    </Link>
  );

  return (
    <div className="flex items-center gap-4">
      <span className="-space-x-3 flex shrink-0">
        <Avatar name={author.name} src={author.photo} />
        {!samePerson && <Avatar name={editor.name} src={editor.photo} />}
      </span>
      <div>
        <p className="font-ui text-[14px] text-neutral-800">
          {label ?? (method === "test" ? "Getestet von" : "Analysiert von")}{" "}
          {personLink(author)}
          {!samePerson && <> · Redaktion: {personLink(editor)}</>}
        </p>
        <p className="mt-0.5 font-ui text-[13px] text-neutral-600">
          {meta.join(" · ")}
        </p>
      </div>
    </div>
  );
}

/* ───── Citations [1] + source list ───── */

export type Source = {
  name: string;
  title: string;
  url: string;
  publishedAt?: string;
  accessedAt: string;
};

export function Cite({ n }: { n: number }) {
  return (
    <sup className="ml-0.5">
      <a
        href={`#quelle-${n}`}
        className="font-semibold font-ui text-[12px] text-black underline underline-offset-2"
      >
        [{n}]
      </a>
    </sup>
  );
}

export function Sources({ sources }: { sources: Source[] }) {
  return (
    <section
      aria-labelledby="quellen"
      className="border-neutral-200 border-t pt-6"
    >
      <h2 id="quellen" className="type-h4">
        Quellen
      </h2>
      <ol className="mt-4 flex flex-col gap-2.5">
        {sources.map((s, i) => (
          <li
            key={s.url}
            id={`quelle-${i + 1}`}
            className="type-small flex gap-3 text-neutral-700"
          >
            <span className="tabular w-6 shrink-0 font-semibold font-ui text-black">
              [{i + 1}]
            </span>
            <span>
              {s.name}:{" "}
              <a
                href={s.url}
                rel="noopener"
                className="text-black underline underline-offset-2"
              >
                {s.title}
              </a>
              {s.publishedAt && `, ${formatDate(s.publishedAt)}`}. Abgerufen am{" "}
              {formatDate(s.accessedAt)}.
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ───── Änderungsprotokoll ───── */

export function ChangeLog({
  entries,
}: {
  entries: { date: string; note: string }[];
}) {
  return (
    <details className="group rounded-md border border-neutral-200">
      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-semibold font-ui text-[15px] text-black [&::-webkit-details-marker]:hidden">
        Änderungsprotokoll
        <span
          aria-hidden
          className="text-xl transition-transform group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <ul className="flex flex-col gap-2 border-neutral-200 border-t px-5 py-4">
        {entries.map((e) => (
          <li
            key={`${e.date}-${e.note}`}
            className="type-small flex gap-4 text-neutral-800"
          >
            <span className="tabular shrink-0 font-ui text-neutral-600">
              {formatDate(e.date)}
            </span>
            {e.note}
          </li>
        ))}
      </ul>
    </details>
  );
}

/* ───── Screenshot figure in a minimal browser frame (square dots, never circles) ───── */

export function Figure({
  children,
  capturedAt,
  caption,
}: {
  children: ReactNode;
  capturedAt: string;
  caption: string;
}) {
  return (
    <figure>
      <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
        <div className="flex h-7 items-center gap-1.5 border-neutral-200 border-b bg-neutral-50 px-3">
          <span className="size-2 rounded-xs bg-neutral-300" />
          <span className="size-2 rounded-xs bg-neutral-300" />
          <span className="size-2 rounded-xs bg-neutral-300" />
        </div>
        {children}
      </div>
      <figcaption className="type-ui-sm mt-2.5 text-neutral-600">
        {caption} · Screenshot: Dettingenstack, aufgenommen am{" "}
        {formatDate(capturedAt)}
      </figcaption>
    </figure>
  );
}
