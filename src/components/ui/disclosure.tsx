"use client";

import { Plus } from "lucide-react";
import {
  Accordion as AccordionPrimitive,
  Tabs as TabsPrimitive,
  Tooltip as TooltipPrimitive,
} from "radix-ui";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/* ───── Accordion: 1px dividers, Plus rotates to ×, 300ms height ───── */

export function Accordion({
  items,
  type = "multiple",
  className,
}: {
  items: { id: string; title: ReactNode; content: ReactNode }[];
  type?: "single" | "multiple";
  className?: string;
}) {
  const rootProps =
    type === "single"
      ? ({ type: "single", collapsible: true } as const)
      : ({ type: "multiple" } as const);

  return (
    <AccordionPrimitive.Root
      {...rootProps}
      className={cn("border-neutral-200 border-t", className)}
    >
      {items.map((item) => (
        <AccordionPrimitive.Item
          key={item.id}
          value={item.id}
          className="border-neutral-200 border-b"
        >
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-6 py-5 text-left font-semibold font-ui text-[17px] text-black focus-visible:outline-2 focus-visible:outline-black">
              {item.title}
              <Plus
                aria-hidden
                className="size-5 shrink-0 transition-transform duration-300 ease-brand group-data-[state=open]:rotate-45"
                strokeWidth={1.75}
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-[accordion-up_300ms_var(--ease-brand)] data-[state=open]:animate-[accordion-down_300ms_var(--ease-brand)]">
            <div className="type-body pb-6 text-neutral-800">
              {item.content}
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}

/* ───── Underline tabs (content switching, e.g. category filter on home) ───── */

export function Tabs({
  defaultValue,
  tabs,
  label,
  className,
}: {
  defaultValue: string;
  tabs: { value: string; label: string; content: ReactNode }[];
  label: string;
  className?: string;
}) {
  return (
    <TabsPrimitive.Root defaultValue={defaultValue} className={className}>
      <TabsPrimitive.List
        aria-label={label}
        className="flex gap-6 overflow-x-auto border-neutral-200 border-b [scrollbar-width:none]"
      >
        {tabs.map((t) => (
          <TabsPrimitive.Trigger
            key={t.value}
            value={t.value}
            className="-mb-px h-12 shrink-0 whitespace-nowrap border-transparent border-b-2 type-ui text-neutral-600 transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:-outline-offset-2 data-[state=active]:border-black data-[state=active]:text-black"
          >
            {t.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {tabs.map((t) => (
        <TabsPrimitive.Content
          key={t.value}
          value={t.value}
          className="pt-8 focus-visible:outline-none"
        >
          {t.content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
}

/* ───── Tooltip: black, white Work Sans 13px, radius 6 ───── */

export function TooltipProvider({ children }: { children: ReactNode }) {
  return (
    <TooltipPrimitive.Provider delayDuration={150}>
      {children}
    </TooltipPrimitive.Provider>
  );
}

export function Tooltip({
  content,
  children,
  side = "top",
}: {
  content: ReactNode;
  children: ReactNode;
  side?: ComponentProps<typeof TooltipPrimitive.Content>["side"];
}) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          sideOffset={6}
          className="z-70 max-w-[280px] rounded-md bg-black px-3 py-2 font-ui text-[13px] text-white leading-[18px] shadow-md"
        >
          {content}
          <TooltipPrimitive.Arrow
            className="fill-black"
            width={10}
            height={5}
          />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
