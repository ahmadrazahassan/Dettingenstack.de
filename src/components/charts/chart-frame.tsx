import type { ReactNode } from "react";
import { Table, TableScroll, Td, Th } from "@/components/ui/table";
import { formatDate } from "@/lib/format";

// Every chart sits in a frame with title, basis, source, date and an accessible data table (§9.9).
// The table is server-rendered, so it is in the HTML even before the chart hydrates.
export function ChartFrame({
  title,
  subtitle,
  source,
  date,
  table,
  legend,
  children,
}: {
  title: string;
  subtitle: string;
  source: string;
  date: string;
  table: {
    columns: string[];
    rows: (string | number)[][];
    numericFrom?: number;
  };
  legend?: { label: string; swatch: "black" | "yellow" | "grey" }[];
  children: ReactNode;
}) {
  const numericFrom = table.numericFrom ?? 1;
  return (
    <figure className="rounded-lg border border-neutral-200 bg-white p-5 lg:p-6">
      <figcaption>
        <p className="font-semibold font-ui text-[16px] text-black">{title}</p>
        <p className="type-ui-sm mt-1 text-neutral-600">{subtitle}</p>
        {legend && (
          <ul className="mt-3 flex flex-wrap gap-4">
            {legend.map((l) => (
              <li
                key={l.label}
                className="flex items-center gap-2 font-ui text-[13px] text-black"
              >
                <span
                  aria-hidden
                  className={
                    l.swatch === "black"
                      ? "size-3 rounded-xs bg-chart-1"
                      : l.swatch === "yellow"
                        ? "size-3 rounded-xs bg-chart-2 ring-1 ring-black ring-inset"
                        : "size-3 rounded-xs bg-chart-3"
                  }
                />
                {l.label}
              </li>
            ))}
          </ul>
        )}
      </figcaption>

      <div className="mt-5" aria-hidden>
        {children}
      </div>

      <p className="type-ui-sm mt-4 text-neutral-600">
        Quelle: {source} · Stand: {formatDate(date)}
      </p>

      <details className="mt-3">
        <summary className="cursor-pointer font-medium font-ui text-[14px] text-black underline underline-offset-2">
          Daten als Tabelle anzeigen
        </summary>
        <TableScroll label={`${title} – Daten`} className="mt-3">
          <Table>
            <thead>
              <tr>
                {table.columns.map((c, i) => (
                  <Th
                    key={c}
                    className={i >= numericFrom ? "text-right" : undefined}
                  >
                    {c}
                  </Th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row) => (
                <tr key={String(row[0])}>
                  {row.map((cell, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: cells are positional.
                    <Td key={i} numeric={i >= numericFrom}>
                      {cell}
                    </Td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </TableScroll>
      </details>
    </figure>
  );
}
