import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/format";

// Horizontal bars for shares in percent (§9.9): one series, 0–100 scale, value at the bar end.
// Server-rendered, no JS; the accessible table comes from the surrounding ChartFrame.
export function PercentBars({
  data,
  highlight,
}: {
  data: { label: string; value: number }[];
  highlight?: string;
}) {
  return (
    <ul className="flex flex-col gap-3">
      {data.map((d) => (
        <li
          key={d.label}
          className="grid grid-cols-[minmax(7rem,12rem)_1fr] items-center gap-3 font-ui text-[14px]"
        >
          <span className="text-neutral-800">{d.label}</span>
          <span className="flex items-center gap-2">
            <span className="h-6 flex-1 rounded-xs bg-neutral-100">
              <span
                className={cn(
                  "block h-full rounded-xs",
                  d.label === highlight
                    ? "bg-chart-2 ring-1 ring-black ring-inset"
                    : "bg-chart-1",
                )}
                style={{ width: `${Math.min(100, Math.max(0, d.value))}%` }}
              />
            </span>
            <span className="tabular w-12 text-right font-semibold text-black">
              {formatNumber(d.value)} %
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
