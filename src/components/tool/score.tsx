import { Tooltip } from "@/components/ui/disclosure";
import { cn } from "@/lib/cn";
import { formatScore, scoreLabel } from "@/lib/format";

const boxSizes = {
  sm: "size-10 text-[16px]",
  md: "size-14 text-[22px]",
  lg: "size-[88px] text-[36px]",
} as const;

// Black square, yellow numerals (§10.4). Editorial score only — never stars.
export function ScoreBox({
  score,
  size = "md",
  label = "below",
  className,
}: {
  score: number;
  size?: keyof typeof boxSizes;
  label?: "below" | "beside" | false;
  className?: string;
}) {
  const text = scoreLabel(score);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5",
        label === "below" && "flex-col gap-1.5",
        className,
      )}
    >
      <span
        role="img"
        aria-label={`Dettingenstack-Score ${formatScore(score)} von 10: ${text}`}
        className={cn(
          "tabular inline-flex shrink-0 items-center justify-center rounded-md bg-black font-bold font-display text-brand leading-none tracking-[-0.02em]",
          boxSizes[size],
        )}
      >
        {formatScore(score)}
      </span>
      {label && (
        <span
          aria-hidden
          className="font-medium font-ui text-[13px] text-black leading-4"
        >
          {text}
        </span>
      )}
    </span>
  );
}

export type BreakdownRow = {
  label: string;
  score: number; // 0–100
  weight?: number; // 0–1
  note?: string;
  average?: number; // category average, 0–100
};

// Six horizontal bars with optional category-average tick (§10.4).
export function ScoreBreakdown({
  rows,
  className,
}: {
  rows: BreakdownRow[];
  className?: string;
}) {
  return (
    <dl className={cn("flex flex-col gap-3.5", className)}>
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-[minmax(0,8.5rem)_1fr_2.5rem] items-center gap-3 sm:grid-cols-[minmax(0,12rem)_1fr_2.5rem] sm:gap-4"
        >
          <dt className="type-ui wrap-break-word text-black">
            {row.note ? (
              <Tooltip content={row.note}>
                <button
                  type="button"
                  className="cursor-help text-left underline decoration-neutral-300 decoration-dotted underline-offset-4"
                >
                  {row.label}
                </button>
              </Tooltip>
            ) : (
              row.label
            )}
            {row.weight != null && (
              <span className="block text-[13px] text-neutral-600 sm:ml-1.5 sm:inline">
                {Math.round(row.weight * 100)} %
              </span>
            )}
          </dt>
          <dd className="relative h-2 rounded-xs bg-neutral-100">
            <span
              className="absolute inset-y-0 left-0 rounded-xs bg-black"
              style={{ width: `${row.score}%` }}
            />
            {row.average != null && (
              <span
                title={`Ø Kategorie: ${formatScore(row.average)}`}
                className="-top-1 absolute h-4 w-0.5 bg-black"
                style={{ left: `${row.average}%` }}
              >
                <span className="sr-only">
                  Ø Kategorie: {formatScore(row.average)}
                </span>
              </span>
            )}
          </dd>
          <dd className="tabular text-right font-semibold font-ui text-[15px] text-black">
            <span className="sr-only">{row.label}: </span>
            {formatScore(row.score)}
          </dd>
        </div>
      ))}
    </dl>
  );
}
