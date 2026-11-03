import { Check, Minus, Plus, X } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

// DataTable primitives (§10.8): Work Sans 15px, neutral-50 header, 56px rows, horizontal scroll.

// Labelled region so keyboard users can focus and scroll wide tables (WCAG 2.1.1).
export function TableScroll({
  className,
  label,
  ...props
}: ComponentProps<"section"> & { label: string }) {
  return (
    <section
      // biome-ignore lint/a11y/noNoninteractiveTabindex: a scrollable region must be focusable to scroll by keyboard.
      tabIndex={0}
      aria-label={label}
      className={cn(
        "relative overflow-x-auto rounded-lg border border-neutral-200 focus-visible:outline-2 focus-visible:outline-black",
        className,
      )}
      {...props}
    />
  );
}

export function Table({ className, ...props }: ComponentProps<"table">) {
  return (
    <table
      className={cn(
        "w-full border-collapse text-left font-ui text-[15px] text-neutral-800",
        className,
      )}
      {...props}
    />
  );
}

export function Th({
  className,
  scope = "col",
  ...props
}: ComponentProps<"th">) {
  return (
    <th
      scope={scope}
      className={cn(
        "h-12 border-neutral-200 border-b bg-neutral-50 px-4 font-semibold text-[14px] text-black",
        className,
      )}
      {...props}
    />
  );
}

export function Td({
  className,
  numeric,
  ...props
}: ComponentProps<"td"> & { numeric?: boolean }) {
  return (
    <td
      className={cn(
        "cell-wrap h-14 border-neutral-200 border-b px-4 align-middle",
        numeric && "tabular text-right",
        className,
      )}
      {...props}
    />
  );
}

// Group header row inside matrices.
export function GroupRow({
  label,
  colSpan,
}: {
  label: string;
  colSpan: number;
}) {
  return (
    <tr>
      <th
        scope="colgroup"
        colSpan={colSpan}
        className="h-10 border-neutral-200 border-b bg-neutral-50 px-4 font-semibold font-ui text-[13px] text-neutral-700 uppercase tracking-[0.06em]"
      >
        {label}
      </th>
    </tr>
  );
}

export type FeatureState = "ja" | "teilweise" | "addon" | "nein";

const featureLabels: Record<FeatureState, string> = {
  ja: "ja",
  teilweise: "teilweise",
  addon: "als Add-on",
  nein: "nein",
};

// ✓ / ◐ / + / ✕ with visible or visually hidden text — never colour alone.
export function FeatureStatus({
  state,
  showLabel = false,
}: {
  state: FeatureState;
  showLabel?: boolean;
}) {
  const label = featureLabels[state];
  const icon = {
    ja: <Check aria-hidden className="size-5 text-black" strokeWidth={2} />,
    teilweise: (
      <Minus aria-hidden className="size-5 text-black" strokeWidth={2} />
    ),
    addon: <Plus aria-hidden className="size-4 text-black" strokeWidth={2} />,
    nein: <X aria-hidden className="size-5 text-neutral-400" strokeWidth={2} />,
  }[state];

  const labelAlwaysVisible = state === "teilweise" || state === "addon";
  return (
    <span className="inline-flex items-center gap-1.5">
      {icon}
      <span
        className={cn(
          "type-ui-sm text-neutral-700",
          !(showLabel || labelAlwaysVisible) && "sr-only",
        )}
      >
        {label}
      </span>
    </span>
  );
}
