"use client";

import { Check, ChevronDown, Minus, Plus } from "lucide-react";
import {
  Checkbox as CheckboxPrimitive,
  Select as SelectPrimitive,
  Slider as SliderPrimitive,
  ToggleGroup,
} from "radix-ui";
import { type ComponentProps, useId } from "react";
import { cn } from "@/lib/cn";
import { inputStyles } from "./field";

/* ───── Checkbox: 20×20, radius 4, black when checked ───── */

export function Checkbox({
  label,
  className,
  id,
  ...props
}: ComponentProps<typeof CheckboxPrimitive.Root> & { label?: string }) {
  const autoId = useId();
  const boxId = id ?? autoId;
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <CheckboxPrimitive.Root
        id={boxId}
        className="flex size-5 shrink-0 items-center justify-center rounded-sm border border-neutral-400 bg-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 data-[state=checked]:border-black data-[state=checked]:bg-black"
        {...props}
      >
        <CheckboxPrimitive.Indicator>
          <Check aria-hidden className="size-3.5 text-white" strokeWidth={3} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <label htmlFor={boxId} className="type-ui cursor-pointer text-black">
          {label}
        </label>
      )}
    </span>
  );
}

/* ───── Segmented control (Monatlich | Jährlich, Netto | Brutto) ───── */

export function Segmented<T extends string>({
  value,
  onValueChange,
  options,
  label,
  className,
}: {
  value: T;
  onValueChange: (value: T) => void;
  options: { value: T; label: string }[];
  label: string;
  className?: string;
}) {
  return (
    <ToggleGroup.Root
      type="single"
      value={value}
      onValueChange={(v) => v && onValueChange(v as T)}
      aria-label={label}
      className={cn(
        "inline-flex rounded-md border border-neutral-300 bg-white p-1",
        className,
      )}
    >
      {options.map((o) => (
        <ToggleGroup.Item
          key={o.value}
          value={o.value}
          className="h-9 rounded-sm px-3.5 font-medium font-ui text-[14px] text-neutral-700 transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-1 data-[state=on]:bg-black data-[state=on]:text-white"
        >
          {o.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}

/* ───── Select (Radix) ───── */

export function Select({
  value,
  onValueChange,
  options,
  placeholder = "Bitte wählen",
  id,
  className,
  ...aria
}: {
  value?: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  id?: string;
  className?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
}) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger
        id={id}
        className={cn(
          inputStyles,
          "flex items-center justify-between gap-2 text-left data-placeholder:text-neutral-500",
          className,
        )}
        {...aria}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon>
          <ChevronDown aria-hidden className="size-4" strokeWidth={1.75} />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={6}
          className="z-60 max-h-80 min-w-(--radix-select-trigger-width) overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg"
        >
          <SelectPrimitive.Viewport className="p-1">
            {options.map((o) => (
              <SelectPrimitive.Item
                key={o.value}
                value={o.value}
                className="relative flex h-10 cursor-pointer select-none items-center rounded-sm pr-3 pl-8 font-ui text-[15px] text-black outline-none data-highlighted:bg-neutral-100"
              >
                <SelectPrimitive.ItemIndicator className="absolute left-2.5">
                  <Check aria-hidden className="size-4" strokeWidth={2} />
                </SelectPrimitive.ItemIndicator>
                <SelectPrimitive.ItemText>{o.label}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

/* ───── Team-size slider with linked number stepper ───── */

export function RangeWithStepper({
  value,
  onValueChange,
  min = 1,
  max = 500,
  step = 1,
  label,
  unitLabel,
  className,
}: {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label: string;
  unitLabel: string;
  className?: string;
}) {
  const inputId = useId();
  const clamp = (n: number) => Math.min(max, Math.max(min, Math.round(n)));
  const stepperButton =
    "flex size-12 items-center justify-center text-black transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-black focus-visible:-outline-offset-2 disabled:text-neutral-400";

  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center",
        className,
      )}
    >
      <SliderPrimitive.Root
        value={[value]}
        onValueChange={([v]) => onValueChange(clamp(v ?? min))}
        min={min}
        max={max}
        step={step}
        aria-label={label}
        className="relative flex h-6 flex-1 touch-none select-none items-center"
      >
        <SliderPrimitive.Track className="relative h-1 grow overflow-hidden rounded-xs bg-neutral-200">
          <SliderPrimitive.Range className="absolute h-full bg-black" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block size-5 rounded-sm bg-black shadow-sm transition-shadow focus-visible:shadow-[0_0_0_4px_var(--color-brand)] focus-visible:outline-none" />
      </SliderPrimitive.Root>

      <div className="flex items-center">
        <div className="flex h-12 items-stretch overflow-hidden rounded-md border border-neutral-300 bg-white">
          <button
            type="button"
            className={stepperButton}
            onClick={() => onValueChange(clamp(value - step))}
            disabled={value <= min}
            aria-label={`${unitLabel}: eins weniger`}
          >
            <Minus aria-hidden className="size-4" strokeWidth={2} />
          </button>
          <input
            id={inputId}
            type="number"
            inputMode="numeric"
            min={min}
            max={max}
            value={value}
            onChange={(e) =>
              onValueChange(clamp(Number(e.target.value) || min))
            }
            aria-label={`${label} (${unitLabel})`}
            className="tabular w-16 border-neutral-300 border-x text-center font-ui font-semibold text-base text-black outline-none [appearance:textfield] focus-visible:bg-brand-50 [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            type="button"
            className={stepperButton}
            onClick={() => onValueChange(clamp(value + step))}
            disabled={value >= max}
            aria-label={`${unitLabel}: eins mehr`}
          >
            <Plus aria-hidden className="size-4" strokeWidth={2} />
          </button>
        </div>
        <span className="ml-3 type-ui text-neutral-700">{unitLabel}</span>
      </div>
    </div>
  );
}
